import { ADMIN_ROLES } from '../../../../shared/constants.js';
import {
  nextLocalId,
  readLocalStore,
  writeLocalStore,
} from '../../database/localStore.js';
import {
  ensureSchema,
  getPool,
  isLocalDevFallbackEnabled,
  withTransaction,
} from '../../database/pool.js';
import { ConflictError, NotFoundError, ValidationError } from '../../shared/errors/AppError.js';

export const adminUsersRepository = {
  async isBootstrapConsumed() {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      return Boolean(store.sistemaConfiguracion?.bootstrapAdmin?.consumido) ||
        store.usuariosAdmin.length > 0;
    }
    await ensureSchema();
    const res = await getPool().query(
      `SELECT (
         EXISTS (SELECT 1 FROM sistema_configuracion WHERE clave = 'bootstrap_admin')
         OR EXISTS (SELECT 1 FROM usuarios_admin)
       ) AS consumed`,
    );
    return Boolean(res.rows[0]?.consumed);
  },

  async countAdmins() {
    if (isLocalDevFallbackEnabled()) {
      return readLocalStore().usuariosAdmin.length;
    }
    await ensureSchema();
    const res = await getPool().query('SELECT COUNT(*)::int AS total FROM usuarios_admin');
    return res.rows[0].total;
  },

  async countActiveSuperAdmins() {
    if (isLocalDevFallbackEnabled()) {
      return readLocalStore().usuariosAdmin.filter(
        (u) => u.rol === ADMIN_ROLES.SUPER_ADMIN && u.activo === true,
      ).length;
    }
    await ensureSchema();
    const res = await getPool().query(
      "SELECT COUNT(*)::int AS total FROM usuarios_admin WHERE rol = 'super_admin' AND activo = TRUE",
    );
    return res.rows[0].total;
  },

  async findById(id) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      return store.usuariosAdmin.find((u) => Number(u.id) === Number(id)) || null;
    }
    await ensureSchema();
    const res = await getPool().query(
      `SELECT id, google_sub, nombre_interno, rol, es_fundador, activo, creado_por_admin_id,
              ultimo_acceso_at, created_at, updated_at
       FROM usuarios_admin
       WHERE id = $1`,
      [id],
    );
    return res.rows[0] || null;
  },

  async findByGoogleSub(googleSub) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      return store.usuariosAdmin.find((u) => u.google_sub === googleSub) || null;
    }
    await ensureSchema();
    const res = await getPool().query(
      `SELECT id, google_sub, nombre_interno, rol, es_fundador, activo, creado_por_admin_id,
              ultimo_acceso_at, created_at, updated_at
       FROM usuarios_admin
       WHERE google_sub = $1`,
      [googleSub],
    );
    return res.rows[0] || null;
  },

  async touchLastLogin(id) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.usuariosAdmin.findIndex((u) => Number(u.id) === Number(id));
      if (idx !== -1) {
        const now = new Date().toISOString();
        store.usuariosAdmin[idx].ultimo_acceso_at = now;
        store.usuariosAdmin[idx].updated_at = now;
        writeLocalStore(store);
      }
      return;
    }
    await ensureSchema();
    await getPool().query(
      'UPDATE usuarios_admin SET ultimo_acceso_at = NOW(), updated_at = NOW() WHERE id = $1',
      [id],
    );
  },

  async createBootstrapAdmin({ googleSub, nombreInterno }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      if (store.sistemaConfiguracion?.bootstrapAdmin?.consumido || store.usuariosAdmin.length > 0) {
        throw new ConflictError(
          'El código maestro inicial ya fue usado y quedó bloqueado de forma permanente.',
        );
      }
      const now = new Date().toISOString();
      const created = {
        id: nextLocalId(store.usuariosAdmin),
        google_sub: googleSub,
        nombre_interno: nombreInterno,
        rol: ADMIN_ROLES.SUPER_ADMIN,
        es_fundador: true,
        activo: true,
        creado_por_admin_id: null,
        ultimo_acceso_at: now,
        created_at: now,
        updated_at: now,
      };
      store.usuariosAdmin.push(created);
      store.sistemaConfiguracion = {
        ...store.sistemaConfiguracion,
        bootstrapAdmin: {
          consumido: true,
          bloqueado: true,
          adminInicialId: created.id,
          consumidoAt: now,
        },
      };
      writeLocalStore(store);
      return created;
    }

    return withTransaction(async (client) => {
      // Lock exclusivo transaccional para garantizar un único bootstrap inicial concurrente
      await client.query('SELECT pg_advisory_xact_lock(884201)');
      const lockCheck = await client.query(
        `SELECT (
           EXISTS (SELECT 1 FROM sistema_configuracion WHERE clave = 'bootstrap_admin')
           OR EXISTS (SELECT 1 FROM usuarios_admin)
         ) AS consumed`,
      );
      if (lockCheck.rows[0]?.consumed) {
        throw new ConflictError(
          'El código maestro inicial ya fue usado y quedó bloqueado de forma permanente.',
        );
      }

      const insertRes = await client.query(
        `INSERT INTO usuarios_admin (google_sub, nombre_interno, rol, es_fundador, activo, ultimo_acceso_at)
         VALUES ($1, $2, 'super_admin', TRUE, TRUE, NOW())
         RETURNING id, google_sub, nombre_interno, rol, es_fundador, activo, creado_por_admin_id,
                   ultimo_acceso_at, created_at, updated_at`,
        [googleSub, nombreInterno],
      );
      const createdAdmin = insertRes.rows[0];

      await client.query(
        `INSERT INTO sistema_configuracion (clave, valor, bloqueado)
         VALUES (
           'bootstrap_admin',
           jsonb_build_object('consumido', TRUE, 'adminInicialId', $1::bigint, 'consumidoAt', NOW()),
           TRUE
         )`,
        [createdAdmin.id],
      );

      return createdAdmin;
    });
  },

  async claimInvitationAndCreateAdmin({ codigoHash, googleSub }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      if (store.usuariosAdmin.some((u) => u.google_sub === googleSub)) {
        throw new ConflictError('Esta cuenta de Google ya está registrada como administrador.');
      }
      const invIdx = store.codigosInvitacion.findIndex((c) => c.codigo_hash === codigoHash);
      if (invIdx === -1) {
        throw new ValidationError('El código de invitación es inválido.');
      }
      const invite = store.codigosInvitacion[invIdx];
      if (invite.revocado) {
        throw new ValidationError('Este código de invitación fue revocado.');
      }
      if (invite.usado_at) {
        throw new ValidationError('Este código de invitación ya fue utilizado.');
      }
      if (new Date(invite.expira_at).getTime() <= Date.now()) {
        throw new ValidationError('Este código de invitación ha expirado.');
      }

      const now = new Date().toISOString();
      const created = {
        id: nextLocalId(store.usuariosAdmin),
        google_sub: googleSub,
        nombre_interno: invite.etiqueta_usuario,
        rol: invite.rol_asignado,
        es_fundador: false,
        activo: true,
        creado_por_admin_id: invite.creado_por_admin_id,
        ultimo_acceso_at: now,
        created_at: now,
        updated_at: now,
      };
      store.usuariosAdmin.push(created);
      store.codigosInvitacion[invIdx].usado_at = now;
      store.codigosInvitacion[invIdx].usado_por_admin_id = created.id;
      writeLocalStore(store);
      return created;
    }

    return withTransaction(async (client) => {
      const existing = await client.query(
        'SELECT id FROM usuarios_admin WHERE google_sub = $1',
        [googleSub],
      );
      if (existing.rowCount > 0) {
        throw new ConflictError('Esta cuenta de Google ya está registrada como administrador.');
      }

      const invRes = await client.query(
        `SELECT id, etiqueta_usuario, rol_asignado, creado_por_admin_id,
                expira_at, usado_at, revocado
         FROM codigos_invitacion
         WHERE codigo_hash = $1
         FOR UPDATE`,
        [codigoHash],
      );

      if (invRes.rowCount === 0) {
        throw new ValidationError('El código de invitación es inválido.');
      }

      const invite = invRes.rows[0];
      if (invite.revocado) {
        throw new ValidationError('Este código de invitación fue revocado.');
      }
      if (invite.usado_at) {
        throw new ValidationError('Este código de invitación ya fue utilizado.');
      }
      if (new Date(invite.expira_at).getTime() <= Date.now()) {
        throw new ValidationError('Este código de invitación ha expirado.');
      }

      const userRes = await client.query(
        `INSERT INTO usuarios_admin (
           google_sub, nombre_interno, rol, es_fundador, activo, creado_por_admin_id, ultimo_acceso_at
         )
         VALUES ($1, $2, $3, FALSE, TRUE, $4, NOW())
         RETURNING id, google_sub, nombre_interno, rol, es_fundador, activo, creado_por_admin_id,
                   ultimo_acceso_at, created_at, updated_at`,
        [googleSub, invite.etiqueta_usuario, invite.rol_asignado, invite.creado_por_admin_id],
      );
      const createdUser = userRes.rows[0];

      await client.query(
        `UPDATE codigos_invitacion
         SET usado_at = NOW(), usado_por_admin_id = $1
         WHERE id = $2`,
        [createdUser.id, invite.id],
      );

      return createdUser;
    });
  },

  async listAdmins() {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const byId = new Map(store.usuariosAdmin.map((u) => [Number(u.id), u.nombre_interno]));
      return [...store.usuariosAdmin]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((u) => ({
          ...u,
          creado_por_nombre: u.creado_por_admin_id ? byId.get(Number(u.creado_por_admin_id)) || null : null,
        }));
    }

    await ensureSchema();
    const res = await getPool().query(
      `SELECT u.id, u.nombre_interno, u.rol, u.es_fundador, u.activo, u.creado_por_admin_id,
              creator.nombre_interno AS creado_por_nombre,
              u.ultimo_acceso_at, u.created_at, u.updated_at
       FROM usuarios_admin u
       LEFT JOIN usuarios_admin creator ON creator.id = u.creado_por_admin_id
       ORDER BY u.created_at DESC`,
    );
    return res.rows;
  },

  async updateAdmin(id, updates) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.usuariosAdmin.findIndex((u) => Number(u.id) === Number(id));
      if (idx === -1) return null;
      if (updates.activo !== undefined) store.usuariosAdmin[idx].activo = updates.activo;
      if (updates.rol !== undefined) store.usuariosAdmin[idx].rol = updates.rol;
      store.usuariosAdmin[idx].updated_at = new Date().toISOString();
      writeLocalStore(store);
      return store.usuariosAdmin[idx];
    }

    await ensureSchema();
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    if (updates.activo !== undefined) {
      setClauses.push(`activo = $${paramIndex++}`);
      values.push(updates.activo);
    }
    if (updates.rol !== undefined) {
      setClauses.push(`rol = $${paramIndex++}`);
      values.push(updates.rol);
    }

    setClauses.push('updated_at = NOW()');
    values.push(id);

    const res = await getPool().query(
      `UPDATE usuarios_admin
       SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, nombre_interno, rol, es_fundador, activo, creado_por_admin_id,
                 ultimo_acceso_at, created_at, updated_at`,
      values,
    );
    return res.rows[0] || null;
  },

  async deleteAdmin(id) {
    const targetId = Number(id);
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.usuariosAdmin.findIndex((u) => Number(u.id) === targetId);
      if (idx === -1) return null;

      const target = store.usuariosAdmin[idx];
      const remainingActiveSupers = store.usuariosAdmin.filter(
        (u) => Number(u.id) !== targetId && u.rol === ADMIN_ROLES.SUPER_ADMIN && u.activo === true,
      ).length;
      if (remainingActiveSupers < 1) {
        throw new ConflictError(
          'Debe permanecer al menos un Super Administrador activo en el sistema.',
        );
      }

      store.usuariosAdmin.splice(idx, 1);
      for (const u of store.usuariosAdmin) {
        if (Number(u.creado_por_admin_id) === targetId) u.creado_por_admin_id = null;
      }
      for (const inv of store.codigosInvitacion) {
        if (Number(inv.creado_por_admin_id) === targetId) inv.creado_por_admin_id = null;
        if (Number(inv.usado_por_admin_id) === targetId) inv.usado_por_admin_id = null;
      }
      for (const p of store.postulacionesAniversario) {
        if (Number(p.revisado_por_admin_id) === targetId) p.revisado_por_admin_id = null;
      }
      for (const c of store.consultasGenerales) {
        if (Number(c.revisado_por_admin_id) === targetId) c.revisado_por_admin_id = null;
      }
      writeLocalStore(store);
      return target;
    }

    return withTransaction(async (client) => {
      await client.query('SELECT pg_advisory_xact_lock(884202)');
      const targetRes = await client.query(
        `SELECT id, nombre_interno, rol, es_fundador, activo
         FROM usuarios_admin
         WHERE id = $1
         FOR UPDATE`,
        [targetId],
      );
      if (targetRes.rowCount === 0) return null;

      const remainingRes = await client.query(
        `SELECT COUNT(*)::int AS total
         FROM usuarios_admin
         WHERE id <> $1 AND rol = 'super_admin' AND activo = TRUE`,
        [targetId],
      );
      if ((remainingRes.rows[0]?.total ?? 0) < 1) {
        throw new ConflictError(
          'Debe permanecer al menos un Super Administrador activo en el sistema.',
        );
      }

      const deleted = await client.query(
        `DELETE FROM usuarios_admin
         WHERE id = $1
         RETURNING id, nombre_interno, rol, es_fundador, activo`,
        [targetId],
      );
      return deleted.rows[0] || null;
    });
  },

  async createInvitation({
    codigoHash,
    codigoPreview,
    etiquetaUsuario,
    rolAsignado,
    creadoPorAdminId,
    expiraAt,
  }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const now = new Date().toISOString();
      const creator = store.usuariosAdmin.find((u) => Number(u.id) === Number(creadoPorAdminId));
      const record = {
        id: nextLocalId(store.codigosInvitacion),
        codigo_hash: codigoHash,
        codigo_preview: codigoPreview,
        etiqueta_usuario: etiquetaUsuario,
        rol_asignado: rolAsignado,
        creado_por_admin_id: Number(creadoPorAdminId),
        creado_por_nombre: creator?.nombre_interno || null,
        usado_por_admin_id: null,
        usado_por_nombre: null,
        expira_at: expiraAt.toISOString(),
        usado_at: null,
        revocado: false,
        created_at: now,
      };
      store.codigosInvitacion.push(record);
      writeLocalStore(store);
      return record;
    }

    await ensureSchema();
    const res = await getPool().query(
      `INSERT INTO codigos_invitacion (
         codigo_hash, codigo_preview, etiqueta_usuario, rol_asignado,
         creado_por_admin_id, expira_at
       )
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, codigo_preview, etiqueta_usuario, rol_asignado,
                 creado_por_admin_id, usado_por_admin_id, expira_at,
                 usado_at, revocado, created_at`,
      [codigoHash, codigoPreview, etiquetaUsuario, rolAsignado, creadoPorAdminId, expiraAt],
    );
    return res.rows[0];
  },

  async listInvitations() {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const byId = new Map(store.usuariosAdmin.map((u) => [Number(u.id), u.nombre_interno]));
      return [...store.codigosInvitacion]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((c) => ({
          ...c,
          creado_por_nombre: byId.get(Number(c.creado_por_admin_id)) || null,
          usado_por_nombre: c.usado_por_admin_id
            ? byId.get(Number(c.usado_por_admin_id)) || null
            : null,
        }));
    }

    await ensureSchema();
    const res = await getPool().query(
      `SELECT c.id, c.codigo_preview, c.etiqueta_usuario, c.rol_asignado,
              c.creado_por_admin_id, creator.nombre_interno AS creado_por_nombre,
              c.usado_por_admin_id, consumer.nombre_interno AS usado_por_nombre,
              c.expira_at, c.usado_at, c.revocado, c.created_at
       FROM codigos_invitacion c
       LEFT JOIN usuarios_admin creator ON creator.id = c.creado_por_admin_id
       LEFT JOIN usuarios_admin consumer ON consumer.id = c.usado_por_admin_id
       ORDER BY c.created_at DESC`,
    );
    return res.rows;
  },

  async revokeInvitation(id) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.codigosInvitacion.findIndex((c) => Number(c.id) === Number(id));
      if (idx === -1) throw new NotFoundError('Código de invitación no encontrado.');
      if (store.codigosInvitacion[idx].usado_at) {
        throw new ConflictError('No se puede revocar un código que ya fue utilizado.');
      }
      store.codigosInvitacion[idx].revocado = true;
      writeLocalStore(store);
      return store.codigosInvitacion[idx];
    }

    await ensureSchema();
    const res = await getPool().query(
      `UPDATE codigos_invitacion
       SET revocado = TRUE
       WHERE id = $1 AND usado_at IS NULL
       RETURNING id, codigo_preview, etiqueta_usuario, rol_asignado,
                 creado_por_admin_id, usado_por_admin_id, expira_at,
                 usado_at, revocado, created_at`,
      [id],
    );
    if (res.rowCount === 0) {
      const check = await getPool().query('SELECT id, usado_at FROM codigos_invitacion WHERE id = $1', [id]);
      if (check.rowCount === 0) throw new NotFoundError('Código de invitación no encontrado.');
      throw new ConflictError('No se puede revocar un código que ya fue utilizado.');
    }
    return res.rows[0];
  },
};
