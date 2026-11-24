-- =============================================================================
-- AMF FIRMA LEGAL S.A.S.
-- Esquema PostgreSQL (Neon) Unificado:
--   1. sistema_configuracion (candado inmutable del bootstrap inicial)
--   2. usuarios_admin (100% Google Sub ID — SIN correos ni contraseñas)
--   3. codigos_invitacion (códigos de un solo uso para registrar nuevos admins)
--   4. postulaciones_aniversario (Formulario campaña 1 Año en Bogotá)
--   5. consultas_generales (Formulario general /formulario y diagnóstico compliance)
-- =============================================================================

CREATE TABLE IF NOT EXISTS sistema_configuracion (
  clave VARCHAR(64) PRIMARY KEY,
  valor JSONB NOT NULL,
  bloqueado BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usuarios_admin (
  id BIGSERIAL PRIMARY KEY,
  google_sub VARCHAR(64) NOT NULL UNIQUE,
  nombre_interno VARCHAR(120) NOT NULL,
  rol VARCHAR(30) NOT NULL DEFAULT 'admin'
    CHECK (rol IN ('super_admin', 'admin')),
  es_fundador BOOLEAN NOT NULL DEFAULT FALSE,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL,
  ultimo_acceso_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE usuarios_admin
  ADD COLUMN IF NOT EXISTS es_fundador BOOLEAN NOT NULL DEFAULT FALSE;

CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_admin_single_founder
  ON usuarios_admin (es_fundador)
  WHERE es_fundador = TRUE;

CREATE INDEX IF NOT EXISTS idx_usuarios_admin_rol_activo
  ON usuarios_admin (rol, activo);

-- Trigger PostgreSQL: hace inmutable el registro de bootstrap consumido
CREATE OR REPLACE FUNCTION fn_lock_bootstrap_config()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.clave = 'bootstrap_admin' AND OLD.bloqueado = TRUE THEN
    RAISE EXCEPTION 'El bloqueo de bootstrap inicial es inmutable y no puede modificarse ni eliminarse.';
  END IF;
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lock_bootstrap_config ON sistema_configuracion;
CREATE TRIGGER trg_lock_bootstrap_config
  BEFORE UPDATE OR DELETE ON sistema_configuracion
  FOR EACH ROW
  EXECUTE FUNCTION fn_lock_bootstrap_config();

-- Limpiar trigger antiguo si existió en despliegues previos:
-- El bootstrap queda bloqueado de forma permanente, pero el admin inicial sí puede
-- eliminarse o modificarse cuando ya exista otro Super Administrador activo.
DROP TRIGGER IF EXISTS trg_protect_founder_admin ON usuarios_admin;
DROP FUNCTION IF EXISTS fn_protect_founder_admin();

CREATE TABLE IF NOT EXISTS codigos_invitacion (
  id BIGSERIAL PRIMARY KEY,
  codigo_hash VARCHAR(128) NOT NULL UNIQUE,
  codigo_preview VARCHAR(24) NOT NULL,
  etiqueta_usuario VARCHAR(120) NOT NULL,
  rol_asignado VARCHAR(30) NOT NULL DEFAULT 'admin'
    CHECK (rol_asignado IN ('super_admin', 'admin')),
  creado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL,
  usado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL,
  expira_at TIMESTAMPTZ NOT NULL,
  usado_at TIMESTAMPTZ,
  revocado BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE codigos_invitacion
  ALTER COLUMN creado_por_admin_id DROP NOT NULL;
ALTER TABLE codigos_invitacion
  DROP CONSTRAINT IF EXISTS codigos_invitacion_creado_por_admin_id_fkey;
ALTER TABLE codigos_invitacion
  ADD CONSTRAINT codigos_invitacion_creado_por_admin_id_fkey
  FOREIGN KEY (creado_por_admin_id) REFERENCES usuarios_admin(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_codigos_invitacion_estado
  ON codigos_invitacion (revocado, usado_at, expira_at DESC);

CREATE TABLE IF NOT EXISTS postulaciones_aniversario (
  id BIGSERIAL PRIMARY KEY,
  codigo_postulacion VARCHAR(24) NOT NULL UNIQUE,
  submission_token VARCHAR(64) NOT NULL,

  -- Sección: Cuéntanos sobre ti
  nombre_postulante VARCHAR(150) NOT NULL,
  celular_whatsapp VARCHAR(30) NOT NULL,
  quien_necesita VARCHAR(40) NOT NULL
    CHECK (quien_necesita IN ('Yo.', 'Un familiar.', 'Un amigo o conocido.')),
  nombre_persona_afectada VARCHAR(150),

  -- Sección: Cuéntanos sobre el caso
  ocurrio_en_bogota VARCHAR(30) NOT NULL
    CHECK (ocurrio_en_bogota IN ('Sí.', 'No.', 'No estoy seguro.')),
  situacion_actual VARCHAR(60) NOT NULL
    CHECK (
      situacion_actual IN (
        'La capturaron hace poco.',
        'Está en la cárcel.',
        'Está libre, pero tiene un proceso penal.',
        'Un juez ya la condenó.',
        'No sé.'
      )
    ),
  relato_caso TEXT NOT NULL,

  -- Autorización Ley 1581 de 2012
  acepta_tratamiento_datos BOOLEAN NOT NULL DEFAULT FALSE
    CHECK (acepta_tratamiento_datos = TRUE),
  fecha_autorizacion_datos TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Seguimiento pantalla de beneficio ($60.000 / 60% descuento)
  decision_beneficio VARCHAR(30) NOT NULL DEFAULT 'pendiente'
    CHECK (decision_beneficio IN ('pendiente', 'quiero_asesoria', 'no_gracias')),
  fecha_decision_beneficio TIMESTAMPTZ,

  -- Metadatos operativos y revisión interna AMF
  estado_revision VARCHAR(30) NOT NULL DEFAULT 'recibido',
  notas_admin TEXT,
  revisado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL,
  origen_registro VARCHAR(40) NOT NULL DEFAULT 'web_aniversario_bogota',
  ip_origen VARCHAR(64),
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migraciones idempotentes si la tabla postulaciones_aniversario ya existía previamente
ALTER TABLE postulaciones_aniversario
  ADD COLUMN IF NOT EXISTS notas_admin TEXT;
ALTER TABLE postulaciones_aniversario
  ADD COLUMN IF NOT EXISTS revisado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_postulaciones_created_at
  ON postulaciones_aniversario (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_postulaciones_bogota_situacion
  ON postulaciones_aniversario (ocurrio_en_bogota, situacion_actual);

CREATE INDEX IF NOT EXISTS idx_postulaciones_decision
  ON postulaciones_aniversario (decision_beneficio);

CREATE INDEX IF NOT EXISTS idx_postulaciones_estado_revision
  ON postulaciones_aniversario (estado_revision);

CREATE TABLE IF NOT EXISTS consultas_generales (
  id BIGSERIAL PRIMARY KEY,
  codigo_consulta VARCHAR(24) NOT NULL UNIQUE,
  origen_formulario VARCHAR(40) NOT NULL DEFAULT 'formulario_general'
    CHECK (origen_formulario IN ('formulario_general', 'diagnostico_compliance')),

  nombre_completo VARCHAR(150) NOT NULL,
  telefono_whatsapp VARCHAR(30) NOT NULL,
  correo_electronico VARCHAR(160),
  ciudad VARCHAR(100),

  necesidad_servicio VARCHAR(120) NOT NULL,
  institucion_fuerza_publica VARCHAR(120),
  plan_interes VARCHAR(120),
  situacion_penal VARCHAR(120),
  audiencia_proxima VARCHAR(80),
  urgencia VARCHAR(80),

  empresa_razon_social VARCHAR(150),
  empresa_sector VARCHAR(120),
  empresa_tamano VARCHAR(80),

  detalles_caso TEXT NOT NULL,

  acepta_tratamiento_datos BOOLEAN NOT NULL DEFAULT FALSE
    CHECK (acepta_tratamiento_datos = TRUE),
  fecha_autorizacion_datos TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  estado_revision VARCHAR(30) NOT NULL DEFAULT 'recibido',
  notas_admin TEXT,
  revisado_por_admin_id BIGINT REFERENCES usuarios_admin(id) ON DELETE SET NULL,
  ip_origen VARCHAR(64),
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultas_created_at
  ON consultas_generales (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_consultas_origen_estado
  ON consultas_generales (origen_formulario, estado_revision);
