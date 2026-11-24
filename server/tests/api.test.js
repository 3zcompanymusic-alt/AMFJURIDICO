import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ExcelJS from 'exceljs';
import {
  validateAndSanitizeConsultaGeneral,
  validateAndSanitizePostulacion,
} from '../../shared/validators.js';
import { createApp } from '../app.js';
import { UnauthorizedError } from '../src/shared/errors/AppError.js';

const MOCK_GOOGLE_TOKENS = {
  'google-id-token-super': { googleSub: 'google-sub-super-1001' },
  'google-id-token-admin2': { googleSub: 'google-sub-admin-2002' },
  'google-id-token-super2': { googleSub: 'google-sub-super-3003' },
  'google-id-token-intruder': { googleSub: 'google-sub-intruder-9999' },
};

async function mockGoogleVerifier(idToken) {
  const match = MOCK_GOOGLE_TOKENS[idToken];
  if (!match) {
    throw new UnauthorizedError('Token de Google simulado inválido.');
  }
  return match;
}

function createTempStorePath() {
  return path.join(
    os.tmpdir(),
    `amf-test-store-${Date.now()}-${Math.random().toString(16).slice(2)}.json`,
  );
}

async function startTestApp() {
  const storePath = createTempStorePath();
  process.env.LOCAL_DEV_STORE_PATH = storePath;
  process.env.ADMIN_BOOTSTRAP_CODE = 'MASTER-TEST-CODE-2026';
  process.env.AUTH_JWT_SECRET = 'test-jwt-secret-super-secure-32-chars-minimum';
  process.env.GOOGLE_CLIENT_ID = 'test-google-client.apps.googleusercontent.com';
  process.env.DISABLE_RATE_LIMIT = 'true';
  delete process.env.DATABASE_URL;

  const app = createApp({ googleVerifier: mockGoogleVerifier });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  return {
    baseUrl: `http://127.0.0.1:${port}`,
    storePath,
    async close() {
      await new Promise((resolve) => server.close(resolve));
      if (fs.existsSync(storePath)) {
        fs.unlinkSync(storePath);
      }
    },
  };
}

test('Validadores compartidos: postulación aniversario y consulta general', () => {
  const okAniv = validateAndSanitizePostulacion({
    nombrePostulante: '  Laura Gómez  ',
    celularWhatsapp: '301 330 2160',
    quienNecesita: 'Yo.',
    nombrePersona: '',
    ocurrioBogota: 'Sí.',
    situacionActual: 'Está libre, pero tiene un proceso penal.',
    relatoCaso: 'Necesito orientación por citación de Fiscalía en Bogotá.',
    aceptaDatos: true,
  });
  assert.deepEqual(okAniv.errors, {});
  assert.equal(okAniv.sanitized.nombrePersona, null);

  const badAniv = validateAndSanitizePostulacion({
    nombrePostulante: 'Laura 123',
    celularWhatsapp: '301234',
    nombrePersona: 'Carlos 99',
    quienNecesita: 'Un familiar.',
    aceptaDatos: false,
  });
  assert.ok(badAniv.errors.nombrePostulante);
  assert.ok(badAniv.errors.celularWhatsapp);
  assert.ok(badAniv.errors.nombrePersona);
  assert.ok(badAniv.errors.aceptaDatos);

  const badPhoneLetters = validateAndSanitizePostulacion({
    nombrePostulante: 'Laura Gómez',
    celularWhatsapp: '301abc1234',
    quienNecesita: 'Yo.',
    ocurrioBogota: 'Sí.',
    situacionActual: 'No sé.',
    relatoCaso: 'Necesito orientación jurídica en Bogotá.',
    aceptaDatos: true,
  });
  assert.ok(badPhoneLetters.errors.celularWhatsapp);

  const badPhoneEleven = validateAndSanitizePostulacion({
    nombrePostulante: 'Laura Gómez',
    celularWhatsapp: '30123456789',
    quienNecesita: 'Yo.',
    ocurrioBogota: 'Sí.',
    situacionActual: 'No sé.',
    relatoCaso: 'Necesito orientación jurídica en Bogotá.',
    aceptaDatos: true,
  });
  assert.ok(badPhoneEleven.errors.celularWhatsapp);

  const okPlus57 = validateAndSanitizePostulacion({
    nombrePostulante: 'Laura Gómez',
    celularWhatsapp: '+57 301 330 2160',
    quienNecesita: 'Yo.',
    ocurrioBogota: 'Sí.',
    situacionActual: 'No sé.',
    relatoCaso: 'Necesito orientación jurídica en Bogotá.',
    aceptaDatos: true,
  });
  assert.deepEqual(okPlus57.errors, {});

  const okCons = validateAndSanitizeConsultaGeneral({
    origenFormulario: 'formulario_general',
    nombre: 'Carlos Ruiz',
    telefono: '3101234567',
    email: 'carlos@ejemplo.com',
    ciudad: 'Cali',
    necesidad: 'Defensa Penal (24/7)',
    detalles: 'Requiero asesoría urgente por audiencia.',
    aceptaDatos: true,
  });
  assert.deepEqual(okCons.errors, {});

  const badCons = validateAndSanitizeConsultaGeneral({
    origenFormulario: 'formulario_general',
    nombre: 'Carlos 2',
    telefono: '1234567',
    email: 'carlos@ejemplo',
    ciudad: 'Bogotá 12',
    detalles: '1234567890',
    aceptaDatos: true,
  });
  assert.ok(badCons.errors.nombre);
  assert.ok(badCons.errors.telefono);
  assert.ok(badCons.errors.email);
  assert.ok(badCons.errors.ciudad);
  assert.ok(badCons.errors.detalles);
});

test('Flujo completo E2E: Auth Google ID (sin correos/contraseñas), invitaciones, formularios y exportación XLSX/CSV', async () => {
  const ctx = await startTestApp();
  try {
    // 1. Acceso no autenticado bloqueado
    const unauth = await fetch(`${ctx.baseUrl}/api/admin/formularios/aniversario`);
    assert.equal(unauth.status, 401);

    // 2. Config pública indica bootstrap pendiente
    const cfgRes = await fetch(`${ctx.baseUrl}/api/auth/config`);
    assert.equal(cfgRes.status, 200);
    const cfgJson = await cfgRes.json();
    assert.equal(cfgJson.data.requiresBootstrap, true);

    // 3. Primer admin inicia con Google -> requiere código maestro
    const g1 = await fetch(`${ctx.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'google-id-token-super' }),
    });
    assert.equal(g1.status, 200);
    const g1Data = (await g1.json()).data;
    assert.equal(g1Data.status, 'REGISTRATION_REQUIRED');
    assert.equal(g1Data.requiresBootstrap, true);

    // 4. Código maestro incorrecto falla con 403
    const badBoot = await fetch(`${ctx.baseUrl}/api/auth/bootstrap-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: g1Data.onboardingToken,
        bootstrapCode: 'WRONG-CODE',
        nombreInterno: 'Socio Director',
      }),
    });
    assert.equal(badBoot.status, 403);

    // 5. Código maestro correcto crea Super Admin
    const okBoot = await fetch(`${ctx.baseUrl}/api/auth/bootstrap-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: g1Data.onboardingToken,
        bootstrapCode: 'MASTER-TEST-CODE-2026',
        nombreInterno: 'Socio Director',
      }),
    });
    assert.equal(okBoot.status, 201);
    const superCookie = okBoot.headers.get('set-cookie');
    assert.ok(superCookie && superCookie.includes('amf_admin_session='));
    const okBootJson = await okBoot.json();
    const superToken = okBootJson.data.accessToken;
    assert.equal(okBootJson.data.user.rol, 'super_admin');
    assert.equal(okBootJson.data.user.esFundador, true);

    // 6. Segundo intento de bootstrap falla con 409 (código quemado/bloqueado permanentemente)
    const cfgAfterBoot = await (await fetch(`${ctx.baseUrl}/api/auth/config`)).json();
    assert.equal(cfgAfterBoot.data.requiresBootstrap, false);
    assert.equal(cfgAfterBoot.data.bootstrapLocked, true);

    const intruderLogin = await fetch(`${ctx.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'google-id-token-intruder' }),
    });
    const intruderOnboarding = (await intruderLogin.json()).data;
    assert.equal(intruderOnboarding.requiresBootstrap, false);

    const secondBoot = await fetch(`${ctx.baseUrl}/api/auth/bootstrap-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: intruderOnboarding.onboardingToken,
        bootstrapCode: 'MASTER-TEST-CODE-2026',
        nombreInterno: 'Intruso',
      }),
    });
    assert.equal(secondBoot.status, 409);

    // 7. Super Admin genera código de invitación para segundo abogado
    const invRes = await fetch(`${ctx.baseUrl}/api/admin/users/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superToken}`,
      },
      body: JSON.stringify({
        etiquetaUsuario: 'Abogado Penal Cali',
        rolAsignado: 'admin',
        expiraEnHoras: 24,
      }),
    });
    assert.equal(invRes.status, 201);
    const inviteData = (await invRes.json()).data;
    assert.ok(inviteData.codigoPlano);
    assert.ok(inviteData.codigoPlano.startsWith('AMF-'));

    // 8. Segundo usuario inicia con Google y reclama código de invitación
    const g2 = await fetch(`${ctx.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'google-id-token-admin2' }),
    });
    const g2Data = (await g2.json()).data;
    assert.equal(g2Data.status, 'REGISTRATION_REQUIRED');

    const regRes = await fetch(`${ctx.baseUrl}/api/auth/register-with-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: g2Data.onboardingToken,
        invitationCode: inviteData.codigoPlano,
      }),
    });
    assert.equal(regRes.status, 201);
    const admin2Token = (await regRes.json()).data.accessToken;

    // 9. Reutilizar el código usado falla con 400
    const reuseRes = await fetch(`${ctx.baseUrl}/api/auth/register-with-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: intruderOnboarding.onboardingToken,
        invitationCode: inviteData.codigoPlano,
      }),
    });
    assert.equal(reuseRes.status, 400);

    // 10. Verificar que NO se guardó ningún email ni contraseña y que bootstrap quedó bloqueado
    const rawStore = JSON.parse(fs.readFileSync(ctx.storePath, 'utf8'));
    assert.equal(rawStore.sistemaConfiguracion.bootstrapAdmin.consumido, true);
    assert.equal(rawStore.usuariosAdmin.length, 2);
    for (const u of rawStore.usuariosAdmin) {
      assert.equal('email' in u, false);
      assert.equal('password' in u, false);
      assert.equal('password_hash' in u, false);
    }
    assert.equal('codigo_plano' in rawStore.codigosInvitacion[0], false);

    // 10b. Traspaso al dueño final: crear segundo Super Admin y borrar al inicial,
    // manteniendo el bootstrap maestro bloqueado de forma permanente.
    const invSuperRes = await fetch(`${ctx.baseUrl}/api/admin/users/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superToken}`,
      },
      body: JSON.stringify({
        etiquetaUsuario: 'Dueño Final AMF',
        rolAsignado: 'super_admin',
        expiraEnHoras: 24,
      }),
    });
    const invSuperData = (await invSuperRes.json()).data;
    const gSuper2 = await (await fetch(`${ctx.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'google-id-token-super2' }),
    })).json();
    const super2Auth = await (await fetch(`${ctx.baseUrl}/api/auth/register-with-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: gSuper2.data.onboardingToken,
        invitationCode: invSuperData.codigoPlano,
      }),
    })).json();
    const super2Token = super2Auth.data.accessToken;
    const super2Id = super2Auth.data.user.id;

    // No puede eliminarse a sí mismo
    const trySelfDelete = await fetch(`${ctx.baseUrl}/api/admin/users/users/${super2Id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${super2Token}` },
    });
    assert.equal(trySelfDelete.status, 400);

    // El dueño final (segundo super_admin) SÍ puede eliminar al admin inicial/fundador
    const founderId = okBootJson.data.user.id;
    const deleteFounder = await fetch(`${ctx.baseUrl}/api/admin/users/users/${founderId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${super2Token}` },
    });
    assert.equal(deleteFounder.status, 200);

    // El token del fundador eliminado deja de funcionar inmediatamente
    const founderMe = await fetch(`${ctx.baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${superToken}` },
    });
    assert.equal(founderMe.status, 401);

    // Tras borrar al fundador, la compuerta ADMIN_BOOTSTRAP_CODE sigue destruida para siempre
    const cfgAfterFounderDeleted = await (await fetch(`${ctx.baseUrl}/api/auth/config`)).json();
    assert.equal(cfgAfterFounderDeleted.data.requiresBootstrap, false);
    assert.equal(cfgAfterFounderDeleted.data.bootstrapLocked, true);

    const tryRebootstrap = await fetch(`${ctx.baseUrl}/api/auth/bootstrap-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboardingToken: intruderOnboarding.onboardingToken,
        bootstrapCode: 'MASTER-TEST-CODE-2026',
        nombreInterno: 'Re-intruso',
      }),
    });
    assert.equal(tryRebootstrap.status, 409);

    // No se puede eliminar al último Super Admin activo restante
    const tryDeleteLastSuper = await fetch(`${ctx.baseUrl}/api/admin/users/users/${super2Id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(tryDeleteLastSuper.status, 403);

    // 11. Admin regular NO puede acceder a gestión de usuarios (403)
    const admin2UsersDenied = await fetch(`${ctx.baseUrl}/api/admin/users/users`, {
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(admin2UsersDenied.status, 403);

    // 12. Envío público de formulario Aniversario (incluyendo payload con posible fórmula Excel en relato)
    const postAniv = await fetch(`${ctx.baseUrl}/api/formularios/aniversario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombrePostulante: 'Laura Gómez',
        celularWhatsapp: '3013302160',
        quienNecesita: 'Un familiar.',
        nombrePersona: 'Carlos Gómez',
        ocurrioBogota: 'Sí.',
        situacionActual: 'La capturaron hace poco.',
        relatoCaso: '=HYPERLINK("http://malicioso","Audiencia urgente en Bogotá")',
        aceptaDatos: true,
      }),
    });
    assert.equal(postAniv.status, 201);
    const createdAniv = (await postAniv.json()).data;

    const patchBeneficio = await fetch(`${ctx.baseUrl}/api/formularios/aniversario/beneficio`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: createdAniv.id,
        submissionToken: createdAniv.submissionToken,
        decision: 'quiero_asesoria',
      }),
    });
    assert.equal(patchBeneficio.status, 200);

    // 13. Envío público de formulario general y compliance
    const postGeneral = await fetch(`${ctx.baseUrl}/api/formularios/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origenFormulario: 'formulario_general',
        nombre: 'Sofía Mendoza',
        telefono: '3124567890',
        email: 'sofia@cliente.co',
        ciudad: 'Bogotá',
        necesidad: 'Planes y Suscripción Fuerza Pública',
        institucion: 'Policía Nacional',
        planInteres: 'Fortaleza ($79.900/mes)',
        detalles: 'Deseo afiliarme al plan Fortaleza.',
        aceptaDatos: true,
      }),
    });
    assert.equal(postGeneral.status, 201);

    const postCompliance = await fetch(`${ctx.baseUrl}/api/formularios/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origenFormulario: 'diagnostico_compliance',
        empresaRazonSocial: 'Logística Andina S.A.S.',
        empresaSector: 'Transporte',
        empresaTamano: '50 - 200 empleados',
        nombre: 'Andrés Mejía',
        telefono: '3159876543',
        detalles: 'Diagnóstico Circular 100-000020.',
        aceptaDatos: true,
      }),
    });
    assert.equal(postCompliance.status, 201);

    // 14. Admin2 lista, actualiza revisión y exporta CSV + XLSX
    const listAniv = await fetch(`${ctx.baseUrl}/api/admin/formularios/aniversario`, {
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(listAniv.status, 200);
    const listAnivJson = await listAniv.json();
    assert.equal(listAnivJson.data.items.length, 1);

    const updateRev = await fetch(
      `${ctx.baseUrl}/api/admin/formularios/aniversario/${createdAniv.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin2Token}`,
        },
        body: JSON.stringify({
          estadoRevision: 'en_revision',
          notasAdmin: 'Caso revisado por equipo Bogotá.',
        }),
      },
    );
    assert.equal(updateRev.status, 200);

    // Export CSV con protección contra formula injection
    const csvRes = await fetch(`${ctx.baseUrl}/api/admin/export?tipo=todos&formato=csv`, {
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(csvRes.status, 200);
    const csvText = await csvRes.text();
    assert.ok(csvText.includes('Aniversario Bogotá'));
    assert.ok(csvText.includes('Consultas Generales') || csvText.includes('Consulta General'));
    assert.ok(csvText.includes("'=HYPERLINK("));

    // Export XLSX multi-hoja verificable con ExcelJS
    const xlsxRes = await fetch(`${ctx.baseUrl}/api/admin/export?tipo=todos&formato=xlsx`, {
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(xlsxRes.status, 200);
    const xlsxBuf = Buffer.from(await xlsxRes.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(xlsxBuf);
    assert.equal(workbook.worksheets.length, 2);
    assert.equal(workbook.worksheets[0].name, 'Aniversario Bogotá');
    assert.equal(workbook.worksheets[1].name, 'Consultas Generales');
    assert.equal(workbook.worksheets[0].rowCount, 2); // header + 1 row
    assert.equal(workbook.worksheets[1].rowCount, 3); // header + 2 rows

    // 14b. Eliminación de registros recibidos (requiere auth y borra correctamente)
    const unauthDel = await fetch(
      `${ctx.baseUrl}/api/admin/formularios/aniversario/${createdAniv.id}`,
      { method: 'DELETE' },
    );
    assert.equal(unauthDel.status, 401);

    const delAniv = await fetch(
      `${ctx.baseUrl}/api/admin/formularios/aniversario/${createdAniv.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin2Token}` },
      },
    );
    assert.equal(delAniv.status, 200);

    const delAnivAgain = await fetch(
      `${ctx.baseUrl}/api/admin/formularios/aniversario/${createdAniv.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin2Token}` },
      },
    );
    assert.equal(delAnivAgain.status, 404);

    const listAnivAfterDel = await (
      await fetch(`${ctx.baseUrl}/api/admin/formularios/aniversario`, {
        headers: { Authorization: `Bearer ${admin2Token}` },
      })
    ).json();
    assert.equal(listAnivAfterDel.data.items.length, 0);

    const createdGeneral = (await postGeneral.json()).data;
    const delCons = await fetch(
      `${ctx.baseUrl}/api/admin/formularios/consultas/${createdGeneral.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin2Token}` },
      },
    );
    assert.equal(delCons.status, 200);

    const listConsAfterDel = await (
      await fetch(`${ctx.baseUrl}/api/admin/formularios/consultas`, {
        headers: { Authorization: `Bearer ${admin2Token}` },
      })
    ).json();
    assert.equal(listConsAfterDel.data.items.length, 1);

    // 15. Dueño final (super2) desactiva a Admin2 y su token deja de funcionar inmediatamente
    const usersListRes = await fetch(`${ctx.baseUrl}/api/admin/users/users`, {
      headers: { Authorization: `Bearer ${super2Token}` },
    });
    assert.equal(usersListRes.status, 200);
    const usersList = (await usersListRes.json()).data;
    const admin2Row = usersList.find((u) => u.nombreInterno === 'Abogado Penal Cali');

    const disableRes = await fetch(`${ctx.baseUrl}/api/admin/users/users/${admin2Row.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${super2Token}`,
      },
      body: JSON.stringify({ activo: false }),
    });
    assert.equal(disableRes.status, 200);

    const admin2Blocked = await fetch(`${ctx.baseUrl}/api/admin/formularios/resumen`, {
      headers: { Authorization: `Bearer ${admin2Token}` },
    });
    assert.equal(admin2Blocked.status, 403);
  } finally {
    await ctx.close();
  }
});
