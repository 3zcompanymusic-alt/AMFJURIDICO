import {
  nextLocalId,
  readLocalStore,
  writeLocalStore,
} from '../../database/localStore.js';
import {
  ensureSchema,
  getPool,
  isLocalDevFallbackEnabled,
} from '../../database/pool.js';
import {
  generateOpaqueToken,
  generatePublicCode,
} from '../../shared/utils/crypto.js';

function matchesDateRange(isoDate, dateFrom, dateTo) {
  const datePart = String(isoDate || '').slice(0, 10);
  if (dateFrom && datePart < dateFrom) return false;
  if (dateTo && datePart > dateTo) return false;
  return true;
}

function buildSqlDateFilter(clauses, values, columnName, dateFrom, dateTo) {
  if (dateFrom) {
    values.push(dateFrom);
    clauses.push(`${columnName} >= ($${values.length}::date)`);
  }
  if (dateTo) {
    values.push(dateTo);
    clauses.push(`${columnName} < ($${values.length}::date + INTERVAL '1 day')`);
  }
}

export const formsRepository = {
  async createAniversario(sanitized, metadata = {}) {
    const codigoPostulacion = generatePublicCode('AMF');
    const submissionToken = generateOpaqueToken(24);

    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const id = nextLocalId(store.postulacionesAniversario);
      const nowIso = new Date().toISOString();

      store.postulacionesAniversario.push({
        id,
        codigo_postulacion: codigoPostulacion,
        submission_token: submissionToken,
        nombre_postulante: sanitized.nombrePostulante,
        celular_whatsapp: sanitized.celularWhatsapp,
        quien_necesita: sanitized.quienNecesita,
        nombre_persona_afectada: sanitized.nombrePersona,
        ocurrio_en_bogota: sanitized.ocurrioBogota,
        situacion_actual: sanitized.situacionActual,
        relato_caso: sanitized.relatoCaso,
        acepta_tratamiento_datos: sanitized.aceptaDatos,
        fecha_autorizacion_datos: nowIso,
        decision_beneficio: 'pendiente',
        fecha_decision_beneficio: null,
        estado_revision: 'recibido',
        notas_admin: null,
        revisado_por_admin_id: null,
        origen_registro: 'web_aniversario_bogota',
        ip_origen: metadata.ipOrigen || null,
        user_agent: metadata.userAgent || null,
        created_at: nowIso,
        updated_at: nowIso,
      });
      writeLocalStore(store);

      return { id, codigoPostulacion, submissionToken, createdAt: nowIso };
    }

    await ensureSchema();
    const res = await getPool().query(
      `INSERT INTO postulaciones_aniversario (
         codigo_postulacion, submission_token, nombre_postulante, celular_whatsapp,
         quien_necesita, nombre_persona_afectada, ocurrio_en_bogota, situacion_actual,
         relato_caso, acepta_tratamiento_datos, ip_origen, user_agent
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id, codigo_postulacion, created_at`,
      [
        codigoPostulacion,
        submissionToken,
        sanitized.nombrePostulante,
        sanitized.celularWhatsapp,
        sanitized.quienNecesita,
        sanitized.nombrePersona,
        sanitized.ocurrioBogota,
        sanitized.situacionActual,
        sanitized.relatoCaso,
        sanitized.aceptaDatos,
        metadata.ipOrigen || null,
        metadata.userAgent || null,
      ],
    );
    const row = res.rows[0];
    return {
      id: Number(row.id),
      codigoPostulacion: row.codigo_postulacion,
      submissionToken,
      createdAt: row.created_at,
    };
  },

  async updateAniversarioBeneficio({ id, submissionToken, decision }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.postulacionesAniversario.findIndex(
        (r) => Number(r.id) === Number(id) && r.submission_token === submissionToken,
      );
      if (idx === -1) return null;

      const nowIso = new Date().toISOString();
      store.postulacionesAniversario[idx].decision_beneficio = decision;
      store.postulacionesAniversario[idx].fecha_decision_beneficio = nowIso;
      store.postulacionesAniversario[idx].updated_at = nowIso;
      writeLocalStore(store);

      return {
        id: Number(store.postulacionesAniversario[idx].id),
        codigoPostulacion: store.postulacionesAniversario[idx].codigo_postulacion,
        decisionBeneficio: decision,
        updatedAt: nowIso,
      };
    }

    await ensureSchema();
    const res = await getPool().query(
      `UPDATE postulaciones_aniversario
       SET decision_beneficio = $1,
           fecha_decision_beneficio = NOW(),
           updated_at = NOW()
       WHERE id = $2 AND submission_token = $3
       RETURNING id, codigo_postulacion, decision_beneficio, updated_at`,
      [decision, id, submissionToken],
    );
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return {
      id: Number(row.id),
      codigoPostulacion: row.codigo_postulacion,
      decisionBeneficio: row.decision_beneficio,
      updatedAt: row.updated_at,
    };
  },

  async createConsultaGeneral(sanitized, metadata = {}) {
    const codigoConsulta = generatePublicCode('CON');

    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const id = nextLocalId(store.consultasGenerales);
      const nowIso = new Date().toISOString();

      store.consultasGenerales.push({
        id,
        codigo_consulta: codigoConsulta,
        origen_formulario: sanitized.origenFormulario,
        nombre_completo: sanitized.nombre,
        telefono_whatsapp: sanitized.telefono,
        correo_electronico: sanitized.email,
        ciudad: sanitized.ciudad,
        necesidad_servicio: sanitized.necesidad,
        institucion_fuerza_publica: sanitized.institucion,
        plan_interes: sanitized.planInteres,
        situacion_penal: sanitized.situacionPenal,
        audiencia_proxima: sanitized.audienciaProxima,
        urgencia: sanitized.urgencia,
        empresa_razon_social: sanitized.empresaRazonSocial,
        empresa_sector: sanitized.empresaSector,
        empresa_tamano: sanitized.empresaTamano,
        detalles_caso: sanitized.detalles,
        acepta_tratamiento_datos: sanitized.aceptaDatos,
        fecha_autorizacion_datos: nowIso,
        estado_revision: 'recibido',
        notas_admin: null,
        revisado_por_admin_id: null,
        ip_origen: metadata.ipOrigen || null,
        user_agent: metadata.userAgent || null,
        created_at: nowIso,
        updated_at: nowIso,
      });
      writeLocalStore(store);

      return { id, codigoConsulta, createdAt: nowIso };
    }

    await ensureSchema();
    const res = await getPool().query(
      `INSERT INTO consultas_generales (
         codigo_consulta, origen_formulario, nombre_completo, telefono_whatsapp,
         correo_electronico, ciudad, necesidad_servicio, institucion_fuerza_publica,
         plan_interes, situacion_penal, audiencia_proxima, urgencia,
         empresa_razon_social, empresa_sector, empresa_tamano, detalles_caso,
         acepta_tratamiento_datos, ip_origen, user_agent
       )
       VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
       )
       RETURNING id, codigo_consulta, created_at`,
      [
        codigoConsulta,
        sanitized.origenFormulario,
        sanitized.nombre,
        sanitized.telefono,
        sanitized.email,
        sanitized.ciudad,
        sanitized.necesidad,
        sanitized.institucion,
        sanitized.planInteres,
        sanitized.situacionPenal,
        sanitized.audienciaProxima,
        sanitized.urgencia,
        sanitized.empresaRazonSocial,
        sanitized.empresaSector,
        sanitized.empresaTamano,
        sanitized.detalles,
        sanitized.aceptaDatos,
        metadata.ipOrigen || null,
        metadata.userAgent || null,
      ],
    );
    const row = res.rows[0];
    return {
      id: Number(row.id),
      codigoConsulta: row.codigo_consulta,
      createdAt: row.created_at,
    };
  },

  async listAniversario(filters, { paginate = true } = {}) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const adminsById = new Map(
        store.usuariosAdmin.map((u) => [Number(u.id), u.nombre_interno]),
      );

      let rows = [...store.postulacionesAniversario];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        rows = rows.filter((r) =>
          [
            r.codigo_postulacion,
            r.nombre_postulante,
            r.celular_whatsapp,
            r.nombre_persona_afectada,
            r.relato_caso,
          ]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(q)),
        );
      }
      if (filters.estadoRevision) {
        rows = rows.filter((r) => r.estado_revision === filters.estadoRevision);
      }
      if (filters.ocurrioBogota) {
        rows = rows.filter((r) => r.ocurrio_en_bogota === filters.ocurrioBogota);
      }
      if (filters.situacionActual) {
        rows = rows.filter((r) => r.situacion_actual === filters.situacionActual);
      }
      if (filters.decisionBeneficio) {
        rows = rows.filter((r) => r.decision_beneficio === filters.decisionBeneficio);
      }
      rows = rows.filter((r) => matchesDateRange(r.created_at, filters.dateFrom, filters.dateTo));

      rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const total = rows.length;
      const sliced = paginate
        ? rows.slice((filters.page - 1) * filters.pageSize, filters.page * filters.pageSize)
        : rows;

      return {
        items: sliced.map((r) => ({
          ...r,
          revisado_por_nombre: r.revisado_por_admin_id
            ? adminsById.get(Number(r.revisado_por_admin_id)) || null
            : null,
        })),
        total,
      };
    }

    await ensureSchema();
    const clauses = [];
    const values = [];

    if (filters.search) {
      values.push(`%${filters.search}%`);
      const p = `$${values.length}`;
      clauses.push(
        `(p.codigo_postulacion ILIKE ${p} OR p.nombre_postulante ILIKE ${p} OR p.celular_whatsapp ILIKE ${p} OR COALESCE(p.nombre_persona_afectada, '') ILIKE ${p} OR p.relato_caso ILIKE ${p})`,
      );
    }
    if (filters.estadoRevision) {
      values.push(filters.estadoRevision);
      clauses.push(`p.estado_revision = $${values.length}`);
    }
    if (filters.ocurrioBogota) {
      values.push(filters.ocurrioBogota);
      clauses.push(`p.ocurrio_en_bogota = $${values.length}`);
    }
    if (filters.situacionActual) {
      values.push(filters.situacionActual);
      clauses.push(`p.situacion_actual = $${values.length}`);
    }
    if (filters.decisionBeneficio) {
      values.push(filters.decisionBeneficio);
      clauses.push(`p.decision_beneficio = $${values.length}`);
    }
    buildSqlDateFilter(clauses, values, 'p.created_at', filters.dateFrom, filters.dateTo);

    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const countRes = await getPool().query(
      `SELECT COUNT(*)::int AS total FROM postulaciones_aniversario p ${whereSql}`,
      values,
    );

    const limitOffsetSql = paginate
      ? `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
      : '';
    const listValues = paginate
      ? [...values, filters.pageSize, (filters.page - 1) * filters.pageSize]
      : values;

    const listRes = await getPool().query(
      `SELECT p.*, adm.nombre_interno AS revisado_por_nombre
       FROM postulaciones_aniversario p
       LEFT JOIN usuarios_admin adm ON adm.id = p.revisado_por_admin_id
       ${whereSql}
       ORDER BY p.created_at DESC
       ${limitOffsetSql}`,
      listValues,
    );

    return {
      items: listRes.rows,
      total: countRes.rows[0].total,
    };
  },

  async updateAniversarioReview(id, { estadoRevision, notasAdmin, revisadoPorAdminId }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.postulacionesAniversario.findIndex((r) => Number(r.id) === Number(id));
      if (idx === -1) return null;
      if (estadoRevision !== undefined) {
        store.postulacionesAniversario[idx].estado_revision = estadoRevision;
      }
      if (notasAdmin !== undefined) {
        store.postulacionesAniversario[idx].notas_admin = notasAdmin;
      }
      store.postulacionesAniversario[idx].revisado_por_admin_id = revisadoPorAdminId;
      store.postulacionesAniversario[idx].updated_at = new Date().toISOString();
      writeLocalStore(store);

      const reviewer = store.usuariosAdmin.find(
        (u) => Number(u.id) === Number(revisadoPorAdminId),
      );
      return {
        ...store.postulacionesAniversario[idx],
        revisado_por_nombre: reviewer?.nombre_interno || null,
      };
    }

    await ensureSchema();
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    if (estadoRevision !== undefined) {
      setClauses.push(`estado_revision = $${paramIndex++}`);
      values.push(estadoRevision);
    }
    if (notasAdmin !== undefined) {
      setClauses.push(`notas_admin = $${paramIndex++}`);
      values.push(notasAdmin);
    }
    setClauses.push(`revisado_por_admin_id = $${paramIndex++}`);
    values.push(revisadoPorAdminId);
    setClauses.push('updated_at = NOW()');
    values.push(id);

    const res = await getPool().query(
      `UPDATE postulaciones_aniversario
       SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values,
    );
    if (res.rowCount === 0) return null;

    const full = await getPool().query(
      `SELECT p.*, adm.nombre_interno AS revisado_por_nombre
       FROM postulaciones_aniversario p
       LEFT JOIN usuarios_admin adm ON adm.id = p.revisado_por_admin_id
       WHERE p.id = $1`,
      [id],
    );
    return full.rows[0];
  },

  async deleteAniversario(id) {
    const targetId = Number(id);
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.postulacionesAniversario.findIndex((r) => Number(r.id) === targetId);
      if (idx === -1) return null;
      const [removed] = store.postulacionesAniversario.splice(idx, 1);
      writeLocalStore(store);
      return {
        id: Number(removed.id),
        codigoPostulacion: removed.codigo_postulacion,
      };
    }

    await ensureSchema();
    const res = await getPool().query(
      `DELETE FROM postulaciones_aniversario
       WHERE id = $1
       RETURNING id, codigo_postulacion`,
      [targetId],
    );
    if (res.rowCount === 0) return null;
    return {
      id: Number(res.rows[0].id),
      codigoPostulacion: res.rows[0].codigo_postulacion,
    };
  },

  async listConsultasGenerales(filters, { paginate = true } = {}) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const adminsById = new Map(
        store.usuariosAdmin.map((u) => [Number(u.id), u.nombre_interno]),
      );

      let rows = [...store.consultasGenerales];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        rows = rows.filter((r) =>
          [
            r.codigo_consulta,
            r.nombre_completo,
            r.telefono_whatsapp,
            r.correo_electronico,
            r.ciudad,
            r.empresa_razon_social,
            r.necesidad_servicio,
            r.detalles_caso,
          ]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(q)),
        );
      }
      if (filters.estadoRevision) {
        rows = rows.filter((r) => r.estado_revision === filters.estadoRevision);
      }
      if (filters.origenFormulario) {
        rows = rows.filter((r) => r.origen_formulario === filters.origenFormulario);
      }
      if (filters.necesidadServicio) {
        rows = rows.filter((r) => r.necesidad_servicio === filters.necesidadServicio);
      }
      rows = rows.filter((r) => matchesDateRange(r.created_at, filters.dateFrom, filters.dateTo));

      rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const total = rows.length;
      const sliced = paginate
        ? rows.slice((filters.page - 1) * filters.pageSize, filters.page * filters.pageSize)
        : rows;

      return {
        items: sliced.map((r) => ({
          ...r,
          revisado_por_nombre: r.revisado_por_admin_id
            ? adminsById.get(Number(r.revisado_por_admin_id)) || null
            : null,
        })),
        total,
      };
    }

    await ensureSchema();
    const clauses = [];
    const values = [];

    if (filters.search) {
      values.push(`%${filters.search}%`);
      const p = `$${values.length}`;
      clauses.push(
        `(c.codigo_consulta ILIKE ${p} OR c.nombre_completo ILIKE ${p} OR c.telefono_whatsapp ILIKE ${p} OR COALESCE(c.correo_electronico, '') ILIKE ${p} OR COALESCE(c.ciudad, '') ILIKE ${p} OR COALESCE(c.empresa_razon_social, '') ILIKE ${p} OR c.necesidad_servicio ILIKE ${p} OR c.detalles_caso ILIKE ${p})`,
      );
    }
    if (filters.estadoRevision) {
      values.push(filters.estadoRevision);
      clauses.push(`c.estado_revision = $${values.length}`);
    }
    if (filters.origenFormulario) {
      values.push(filters.origenFormulario);
      clauses.push(`c.origen_formulario = $${values.length}`);
    }
    if (filters.necesidadServicio) {
      values.push(filters.necesidadServicio);
      clauses.push(`c.necesidad_servicio = $${values.length}`);
    }
    buildSqlDateFilter(clauses, values, 'c.created_at', filters.dateFrom, filters.dateTo);

    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const countRes = await getPool().query(
      `SELECT COUNT(*)::int AS total FROM consultas_generales c ${whereSql}`,
      values,
    );

    const limitOffsetSql = paginate
      ? `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
      : '';
    const listValues = paginate
      ? [...values, filters.pageSize, (filters.page - 1) * filters.pageSize]
      : values;

    const listRes = await getPool().query(
      `SELECT c.*, adm.nombre_interno AS revisado_por_nombre
       FROM consultas_generales c
       LEFT JOIN usuarios_admin adm ON adm.id = c.revisado_por_admin_id
       ${whereSql}
       ORDER BY c.created_at DESC
       ${limitOffsetSql}`,
      listValues,
    );

    return {
      items: listRes.rows,
      total: countRes.rows[0].total,
    };
  },

  async updateConsultaReview(id, { estadoRevision, notasAdmin, revisadoPorAdminId }) {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.consultasGenerales.findIndex((r) => Number(r.id) === Number(id));
      if (idx === -1) return null;
      if (estadoRevision !== undefined) {
        store.consultasGenerales[idx].estado_revision = estadoRevision;
      }
      if (notasAdmin !== undefined) {
        store.consultasGenerales[idx].notas_admin = notasAdmin;
      }
      store.consultasGenerales[idx].revisado_por_admin_id = revisadoPorAdminId;
      store.consultasGenerales[idx].updated_at = new Date().toISOString();
      writeLocalStore(store);

      const reviewer = store.usuariosAdmin.find(
        (u) => Number(u.id) === Number(revisadoPorAdminId),
      );
      return {
        ...store.consultasGenerales[idx],
        revisado_por_nombre: reviewer?.nombre_interno || null,
      };
    }

    await ensureSchema();
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    if (estadoRevision !== undefined) {
      setClauses.push(`estado_revision = $${paramIndex++}`);
      values.push(estadoRevision);
    }
    if (notasAdmin !== undefined) {
      setClauses.push(`notas_admin = $${paramIndex++}`);
      values.push(notasAdmin);
    }
    setClauses.push(`revisado_por_admin_id = $${paramIndex++}`);
    values.push(revisadoPorAdminId);
    setClauses.push('updated_at = NOW()');
    values.push(id);

    const res = await getPool().query(
      `UPDATE consultas_generales
       SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values,
    );
    if (res.rowCount === 0) return null;

    const full = await getPool().query(
      `SELECT c.*, adm.nombre_interno AS revisado_por_nombre
       FROM consultas_generales c
       LEFT JOIN usuarios_admin adm ON adm.id = c.revisado_por_admin_id
       WHERE c.id = $1`,
      [id],
    );
    return full.rows[0];
  },

  async deleteConsultaGeneral(id) {
    const targetId = Number(id);
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const idx = store.consultasGenerales.findIndex((r) => Number(r.id) === targetId);
      if (idx === -1) return null;
      const [removed] = store.consultasGenerales.splice(idx, 1);
      writeLocalStore(store);
      return {
        id: Number(removed.id),
        codigoConsulta: removed.codigo_consulta,
      };
    }

    await ensureSchema();
    const res = await getPool().query(
      `DELETE FROM consultas_generales
       WHERE id = $1
       RETURNING id, codigo_consulta`,
      [targetId],
    );
    if (res.rowCount === 0) return null;
    return {
      id: Number(res.rows[0].id),
      codigoConsulta: res.rows[0].codigo_consulta,
    };
  },

  async getDashboardSummary() {
    if (isLocalDevFallbackEnabled()) {
      const store = readLocalStore();
      const aniv = store.postulacionesAniversario;
      const cons = store.consultasGenerales;
      return {
        aniversario: {
          total: aniv.length,
          pendientesRevision: aniv.filter((r) => r.estado_revision === 'recibido').length,
          quieroAsesoria: aniv.filter((r) => r.decision_beneficio === 'quiero_asesoria').length,
          enBogotaSi: aniv.filter((r) => r.ocurrio_en_bogota === 'Sí.').length,
        },
        consultas: {
          total: cons.length,
          pendientesRevision: cons.filter((r) => r.estado_revision === 'recibido').length,
          general: cons.filter((r) => r.origen_formulario === 'formulario_general').length,
          compliance: cons.filter((r) => r.origen_formulario === 'diagnostico_compliance').length,
        },
      };
    }

    await ensureSchema();
    const [anivRes, consRes] = await Promise.all([
      getPool().query(`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE estado_revision = 'recibido')::int AS pendientes_revision,
          COUNT(*) FILTER (WHERE decision_beneficio = 'quiero_asesoria')::int AS quiero_asesoria,
          COUNT(*) FILTER (WHERE ocurrio_en_bogota = 'Sí.')::int AS en_bogota_si
        FROM postulaciones_aniversario
      `),
      getPool().query(`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE estado_revision = 'recibido')::int AS pendientes_revision,
          COUNT(*) FILTER (WHERE origen_formulario = 'formulario_general')::int AS general,
          COUNT(*) FILTER (WHERE origen_formulario = 'diagnostico_compliance')::int AS compliance
        FROM consultas_generales
      `),
    ]);

    const a = anivRes.rows[0];
    const c = consRes.rows[0];
    return {
      aniversario: {
        total: a.total,
        pendientesRevision: a.pendientes_revision,
        quieroAsesoria: a.quiero_asesoria,
        enBogotaSi: a.en_bogota_si,
      },
      consultas: {
        total: c.total,
        pendientesRevision: c.pendientes_revision,
        general: c.general,
        compliance: c.compliance,
      },
    };
  },
};
