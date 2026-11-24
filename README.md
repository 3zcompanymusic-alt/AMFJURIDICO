# AMF Firma Legal S.A.S. — Plataforma Unificada (Frontend + Backend Modular)

Plataforma web corporativa de **AMF Firma Legal S.A.S.** con integración de formularios persistidos en **PostgreSQL (Neon)**, panel administrativo protegido **100% con Google ID (sin contraseñas ni correos almacenados)** y exportación a **Excel (`.xlsx`) y CSV**.

---

## Arquitectura (Monolito Modular)

```text
├── database/
│   └── schema.sql                 # Tablas PostgreSQL (Neon): usuarios_admin, codigos_invitacion,
│                                  # postulaciones_aniversario, consultas_generales
├── shared/
│   ├── constants.js               # Roles, estados de revisión y listas de opciones compartidas
│   └── validators.js              # Validación y sanitización compartida Frontend + Backend
├── server/                        # Backend Express (Monolito Modular)
│   ├── index.js                   # Arranque HTTP y apagado controlado
│   ├── app.js                     # Middleware global (Helmet, CORS, Cookies, JSON, Errores)
│   ├── tests/api.test.js          # Pruebas automatizadas E2E (auth, formularios, exportación)
│   └── src/
│       ├── config/env.js          # Variables de entorno tipadas
│       ├── database/              # Pool PostgreSQL (Neon) + fallback JSON solo para dev local
│       ├── shared/                # AppError, crypto/JWT, CORS, rate-limiters
│       └── modules/
│           ├── health/            # GET /api/health
│           ├── auth/              # Google OAuth ID Token, JWT HttpOnly, Bootstrap e Invitaciones
│           ├── adminUsers/        # Gestión de administradores y códigos de registro
│           ├── forms/             # Captura pública y gestión admin de todos los formularios
│           └── export/            # Exportación Excel (.xlsx) y CSV (UTF-8 BOM + anti-fórmulas)
└── src/                           # Frontend React + Vite
    ├── pages/Formulario.jsx       # /formulario (Consulta general -> BD + WhatsApp)
    ├── pages/ComplianceCorporativo.jsx # /compliance-penal-corporativo#diagnostico -> BD + WhatsApp
    ├── pages/AnniversaryFlow.jsx  # /aniversario-bogota (Formulario 1 Año en Bogotá)
    ├── pages/AdminLogin.jsx       # /admin/login (Google Sign-In + Bootstrap/Invitación)
    └── pages/AdminDashboard.jsx   # /admin (Tablas, filtros, seguimiento, usuarios y exportación)
```

---

## Autenticación 100% Google ID (Sin Correos ni Contraseñas)

1. El frontend obtiene el **ID Token** mediante Google Identity Services (`VITE_GOOGLE_CLIENT_ID`).
2. El backend verifica el token criptográficamente con `google-auth-library` (`GOOGLE_CLIENT_ID`), extrae **únicamente `sub` (Google ID)** y descarta el correo y demás datos de perfil.
3. **Administrador inicial (Bootstrap irrevocable y Fundador indestructible):** mientras no exista registro en `sistema_configuracion` (`clave = 'bootstrap_admin'`) ni en `usuarios_admin`, el primer usuario que inicie con Google en `/admin/login` ingresa `ADMIN_BOOTSTRAP_CODE` y su alias interno para vincularse como `super_admin` fundador (`es_fundador = TRUE`). En la misma transacción:
   * Se sella `sistema_configuracion ('bootstrap_admin')` con un trigger PostgreSQL `BEFORE UPDATE OR DELETE` que impide modificar o borrar el bloqueo.
   * El código `ADMIN_BOOTSTRAP_CODE` queda inutilizable para siempre en el backend (cualquier intento posterior devuelve `409 Conflict`, aunque la variable siga definida en Render; igualmente puedes eliminarla de Render tras activar tu cuenta).
   * Un segundo trigger PostgreSQL protege la fila del fundador (`es_fundador = TRUE`) contra eliminación, desactivación o degradación de rol.
4. **Nuevos administradores:** un `super_admin` genera códigos de invitación de un solo uso desde `/admin` (se guarda únicamente el hash SHA-256 en BD) con el alias interno del colaborador.

---

## Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno y editar si usarás Neon/Google localmente
cp .env.example .env

# 3. (Opcional si conectas DATABASE_URL) Inicializar esquema en PostgreSQL/Neon
npm run db:init

# 4. Ejecutar Frontend (puerto 3000 con proxy /api) + Backend (puerto 4000)
npm run dev
```

Pruebas y compilación:

```bash
npm test
npm run build
```

---

## Despliegue en Producción (Cloudflare Pages + Render + Neon)

### 1. Base de Datos en Neon
1. Crea un proyecto gratuito en Neon y copia el Connection String (`?sslmode=require`).
2. Ejecuta `database/schema.sql` en el SQL Editor de Neon (o usa `npm run db:init`).

### 2. Backend API en Render (`api.amfjuridico.com`)
* Crea un **Web Service** conectado al repositorio (usa `render.yaml`).
* Build command: `npm install` · Start command: `npm start`
* Variables de entorno en Render:
  * `NODE_ENV=production`
  * `SERVE_STATIC=false`
  * `DATABASE_URL=<tu-connection-string-neon>`
  * `ALLOWED_ORIGINS=https://amfjuridico.com,https://www.amfjuridico.com`
  * `GOOGLE_CLIENT_ID=<tu-oauth-client-id.apps.googleusercontent.com>`
  * `AUTH_JWT_SECRET=<secreto-aleatorio-de-minimo-32-caracteres>`
  * `ADMIN_BOOTSTRAP_CODE=<codigo-secreto-inicial-unico>`
  * `COOKIE_DOMAIN=.amfjuridico.com`
  * `COOKIE_SAME_SITE=lax`
* En Cloudflare DNS, apunta `api` (`CNAME`) hacia tu servicio `.onrender.com` en modo **Solo DNS (nube gris)** hasta que Render verifique el SSL; luego puedes activar el proxy si lo deseas con SSL/TLS en modo **Full**.

### 3. Frontend en Cloudflare Pages (`amfjuridico.com`)
* Build command: `npm run build` · Build output directory: `dist`
* Variables de entorno en Cloudflare Pages:
  * `VITE_BASE_PATH=/`
  * `VITE_API_URL=https://api.amfjuridico.com`
  * `VITE_GOOGLE_CLIENT_ID=<tu-oauth-client-id.apps.googleusercontent.com>`

### 4. Google Cloud Console (OAuth 2.0)
* Crea un **Client ID para aplicación web** y agrega en **Orígenes autorizados de JavaScript**:
  * `https://amfjuridico.com`
  * `https://www.amfjuridico.com`
  * `http://localhost:3000` *(solo para desarrollo local)*
