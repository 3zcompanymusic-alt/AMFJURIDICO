import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  ClipboardList,
  Copy,
  Download,
  ExternalLink,
  FileSpreadsheet,
  KeyRound,
  Loader2,
  LogOut,
  Menu,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import {
  OCURRIO_BOGOTA_OPTIONS,
  REVIEW_STATUSES,
  SITUACION_ACTUAL_OPTIONS,
} from '../../shared/constants';
import { getAssetUrl } from '../config/siteConfig';
import { adminApi } from '../services/adminApi';
import './Admin.css';

const logoCrema = getAssetUrl('/assets/logos/Sin Fondo/AMF FIRMA LEGAL CREMA .png');

function formatDateCo(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d);
}

const INITIAL_ANIV_FILTERS = {
  search: '',
  estadoRevision: '',
  ocurrioBogota: '',
  situacionActual: '',
  dateFrom: '',
  dateTo: '',
  page: 1,
};

const INITIAL_CONS_FILTERS = {
  search: '',
  origenFormulario: '',
  estadoRevision: '',
  dateFrom: '',
  dateTo: '',
  page: 1,
};

const INITIAL_EXPORT_FILTERS = {
  estadoRevision: '',
  origenFormulario: '',
  dateFrom: '',
  dateTo: '',
};

const SECTION_META = {
  registros: {
    title: 'Registros de Formularios',
    subtitle: 'Consulta, filtra y gestiona los casos recibidos desde la web.',
  },
  exportar: {
    title: 'Exportar Información',
    subtitle: 'Descarga reportes consolidados o por formulario en Excel (.xlsx) y CSV.',
  },
  usuarios: {
    title: 'Gestión de Usuarios',
    subtitle: 'Administra accesos autorizados y genera códigos de invitación.',
  },
};

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [bootLoading, setBootLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('registros'); // 'registros' | 'exportar' | 'usuarios'
  const [recordsTab, setRecordsTab] = useState('aniversario'); // 'aniversario' | 'consultas'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [globalError, setGlobalError] = useState('');
  const [summary, setSummary] = useState(null);

  // Estado Aniversario
  const [anivFilters, setAnivFilters] = useState(INITIAL_ANIV_FILTERS);
  const [anivData, setAnivData] = useState({
    items: [],
    pagination: { page: 1, totalPages: 1, total: 0 },
  });
  const [anivLoading, setAnivLoading] = useState(false);

  // Estado Consultas Generales
  const [consFilters, setConsFilters] = useState(INITIAL_CONS_FILTERS);
  const [consData, setConsData] = useState({
    items: [],
    pagination: { page: 1, totalPages: 1, total: 0 },
  });
  const [consLoading, setConsLoading] = useState(false);

  // Modal detalle / revisión
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [reviewEstado, setReviewEstado] = useState('recibido');
  const [reviewNotas, setReviewNotas] = useState('');
  const [savingReview, setSavingReview] = useState(false);

  // Exportación
  const [exportFilters, setExportFilters] = useState(INITIAL_EXPORT_FILTERS);
  const [exportingKey, setExportingKey] = useState('');

  // Usuarios e Invitaciones (super_admin)
  const [adminUsers, setAdminUsers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    etiquetaUsuario: '',
    rolAsignado: 'admin',
    expiraEnHoras: 72,
  });
  const [generatedCodeBanner, setGeneratedCodeBanner] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await adminApi.getFormsSummary();
      setSummary(data);
    } catch {
      // ignore non-critical summary refresh error
    }
  }, []);

  const fetchAniversario = useCallback(async (filtersToUse) => {
    setAnivLoading(true);
    setGlobalError('');
    try {
      const data = await adminApi.listAniversario({ ...filtersToUse, pageSize: 25 });
      setAnivData(data);
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setAnivLoading(false);
    }
  }, []);

  const fetchConsultas = useCallback(async (filtersToUse) => {
    setConsLoading(true);
    setGlobalError('');
    try {
      const data = await adminApi.listConsultas({ ...filtersToUse, pageSize: 25 });
      setConsData(data);
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setConsLoading(false);
    }
  }, []);

  const fetchAdminUsersModule = useCallback(async () => {
    setUsersLoading(true);
    setGlobalError('');
    try {
      const [users, codes] = await Promise.all([
        adminApi.listUsers(),
        adminApi.listInvitations(),
      ]);
      setAdminUsers(users);
      setInvitations(codes);
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await adminApi.getMe();
        if (!active) return;
        setCurrentUser(me.user);
        await Promise.all([
          fetchSummary(),
          fetchAniversario(INITIAL_ANIV_FILTERS),
          fetchConsultas(INITIAL_CONS_FILTERS),
        ]);
      } catch {
        if (active) navigate('/admin/login', { replace: true });
      } finally {
        if (active) setBootLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [navigate, fetchSummary, fetchAniversario, fetchConsultas]);

  useEffect(() => {
    if (activeSection === 'usuarios' && currentUser?.rol === 'super_admin') {
      fetchAdminUsersModule();
    }
  }, [activeSection, currentUser, fetchAdminUsersModule]);

  const handleSelectSection = (sectionKey) => {
    setActiveSection(sectionKey);
    setSidebarOpen(false);
  };

  const handleRefreshSection = async () => {
    await fetchSummary();
    if (activeSection === 'registros') {
      await Promise.all([fetchAniversario(anivFilters), fetchConsultas(consFilters)]);
    } else if (activeSection === 'usuarios' && currentUser?.rol === 'super_admin') {
      await fetchAdminUsersModule();
    }
  };

  const handleLogout = async () => {
    await adminApi.logout();
    navigate('/admin/login', { replace: true });
  };

  const openDetailModal = (kind, row) => {
    setSelectedRecord({ kind, row });
    setReviewEstado(row.estadoRevision);
    setReviewNotas(row.notasAdmin || '');
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (!selectedRecord || savingReview) return;
    setSavingReview(true);
    setGlobalError('');
    try {
      if (selectedRecord.kind === 'aniversario') {
        await adminApi.updateAniversarioReview(selectedRecord.row.id, {
          estadoRevision: reviewEstado,
          notasAdmin: reviewNotas,
        });
        await fetchAniversario(anivFilters);
      } else {
        await adminApi.updateConsultaReview(selectedRecord.row.id, {
          estadoRevision: reviewEstado,
          notasAdmin: reviewNotas,
        });
        await fetchConsultas(consFilters);
      }
      await fetchSummary();
      setSelectedRecord(null);
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setSavingReview(false);
    }
  };

  const handleExport = async (tipo, formato, customFilters = null) => {
    const key = `${tipo}-${formato}`;
    setExportingKey(key);
    setGlobalError('');
    try {
      const extraFilters =
        customFilters ??
        (tipo === 'aniversario'
          ? anivFilters
          : tipo === 'consultas'
            ? consFilters
            : {});
      await adminApi.downloadExport({ tipo, formato, ...extraFilters });
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setExportingKey('');
    }
  };

  const handleCreateInvitation = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setCopiedCode(false);
    try {
      const created = await adminApi.createInvitation({
        etiquetaUsuario: inviteForm.etiquetaUsuario,
        rolAsignado: inviteForm.rolAsignado,
        expiraEnHoras: Number(inviteForm.expiraEnHoras),
      });
      setGeneratedCodeBanner(created);
      setInviteForm({ etiquetaUsuario: '', rolAsignado: 'admin', expiraEnHoras: 72 });
      await fetchAdminUsersModule();
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  const handleToggleUserActive = async (userRow) => {
    setGlobalError('');
    try {
      await adminApi.updateUser(userRow.id, { activo: !userRow.activo });
      await fetchAdminUsersModule();
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  const handleChangeUserRole = async (userRow, nextRole) => {
    if (nextRole === userRow.rol) return;
    setGlobalError('');
    try {
      await adminApi.updateUser(userRow.id, { rol: nextRole });
      await fetchAdminUsersModule();
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  const handleDeleteUser = async (userRow) => {
    const confirmed = window.confirm(
      `¿Eliminar definitivamente al administrador "${userRow.nombreInterno}"? Esta acción revoca su acceso de inmediato.`,
    );
    if (!confirmed) return;
    setGlobalError('');
    try {
      await adminApi.deleteUser(userRow.id);
      await fetchAdminUsersModule();
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  const handleRevokeInvite = async (inviteId) => {
    setGlobalError('');
    try {
      await adminApi.revokeInvitation(inviteId);
      await fetchAdminUsersModule();
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  if (bootLoading) {
    return (
      <div className="admin-auth-page">
        <div style={{ color: 'var(--color-paper)', textAlign: 'center' }}>
          <Loader2 size={36} className="aniv-spin" style={{ margin: '0 auto 0.75rem auto' }} />
          <p>Cargando panel administrativo...</p>
        </div>
      </div>
    );
  }

  const totalRegistros =
    (summary?.aniversario?.total ?? 0) + (summary?.consultas?.total ?? 0);
  const currentSectionMeta = SECTION_META[activeSection] || SECTION_META.registros;

  return (
    <div className="admin-workspace">
      <Helmet>
        <title>Panel Administrativo | AMF Firma Legal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <img src={logoCrema} alt="AMF Firma Legal" className="admin-sidebar-logo" />
            <span className="admin-sidebar-sub">Portal Administrativo</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
            className="admin-sidebar-close"
          >
            <X size={17} />
          </button>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Menú del panel administrativo">
          <div className="admin-sidebar-section-label">Gestión</div>

          <button
            type="button"
            onClick={() => handleSelectSection('registros')}
            className={`admin-sidebar-btn ${activeSection === 'registros' ? 'is-active' : ''}`}
          >
            <span className="admin-sidebar-btn-left">
              <ClipboardList size={18} />
              <span>Ver Registros</span>
            </span>
            <span className="admin-sidebar-count">{totalRegistros}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSection('exportar')}
            className={`admin-sidebar-btn ${activeSection === 'exportar' ? 'is-active' : ''}`}
          >
            <span className="admin-sidebar-btn-left">
              <FileSpreadsheet size={18} />
              <span>Exportar</span>
            </span>
          </button>

          {currentUser?.rol === 'super_admin' && (
            <button
              type="button"
              onClick={() => handleSelectSection('usuarios')}
              className={`admin-sidebar-btn ${activeSection === 'usuarios' ? 'is-active' : ''}`}
            >
              <span className="admin-sidebar-btn-left">
                <Users size={18} />
                <span>Gestión de Usuarios</span>
              </span>
            </button>
          )}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user-box">
            <div className="admin-sidebar-user-name" title={currentUser?.nombreInterno}>
              <ShieldCheck size={15} className="text-gold" style={{ flexShrink: 0 }} />
              <span>{currentUser?.nombreInterno}</span>
            </div>
            <span className="admin-role-tag">
              {currentUser?.rol === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>

          <div className="admin-sidebar-footer-actions">
            <Link to="/" className="btn btn-outline-light admin-btn-sm">
              <ExternalLink size={14} />
              <span>Sitio Web</span>
            </Link>
            <button type="button" onClick={handleLogout} className="btn btn-gold admin-btn-sm">
              <LogOut size={14} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-content-area">
        <header className="admin-content-header">
          <div className="admin-header-left">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú lateral"
              className="admin-mobile-menu-btn"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="admin-page-title">{currentSectionMeta.title}</h1>
              <p className="admin-page-subtitle">{currentSectionMeta.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefreshSection}
            className="btn btn-outline-wine admin-btn-sm"
          >
            <RefreshCw size={14} />
            <span>Actualizar</span>
          </button>
        </header>

        <main className="admin-content-body">
          {globalError && (
            <div className="admin-alert-error" style={{ marginBottom: '1.25rem' }} role="alert">
              <AlertCircle size={18} />
              <span>{globalError}</span>
            </div>
          )}

          {/* ================================================================
              SECCIÓN 1: VER REGISTROS
              ================================================================ */}
          {activeSection === 'registros' && (
            <>
              <section className="admin-kpi-grid" aria-label="Resumen de registros">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-label">Aniversario Bogotá</div>
                  <div className="admin-kpi-value">{summary?.aniversario?.total ?? 0}</div>
                  <div className="admin-kpi-meta">
                    {summary?.aniversario?.pendientesRevision ?? 0} pendientes ·{' '}
                    {summary?.aniversario?.quieroAsesoria ?? 0} solicitan asesoría $60k
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-label">Consultas Generales &amp; Compliance</div>
                  <div className="admin-kpi-value">{summary?.consultas?.total ?? 0}</div>
                  <div className="admin-kpi-meta">
                    {summary?.consultas?.general ?? 0} general ·{' '}
                    {summary?.consultas?.compliance ?? 0} compliance
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-label">Total Consolidado</div>
                  <div className="admin-kpi-value">{totalRegistros}</div>
                  <div className="admin-kpi-meta">
                    En Bogotá (Aniv.): {summary?.aniversario?.enBogotaSi ?? 0}
                  </div>
                </div>
              </section>

              <div className="admin-subtabs" role="tablist" aria-label="Tipo de formulario">
                <button
                  type="button"
                  role="tab"
                  aria-selected={recordsTab === 'aniversario'}
                  onClick={() => setRecordsTab('aniversario')}
                  className={`admin-subtab-btn ${recordsTab === 'aniversario' ? 'is-active' : ''}`}
                >
                  Aniversario Bogotá ({anivData.pagination.total})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={recordsTab === 'consultas'}
                  onClick={() => setRecordsTab('consultas')}
                  className={`admin-subtab-btn ${recordsTab === 'consultas' ? 'is-active' : ''}`}
                >
                  Consultas Generales &amp; Compliance ({consData.pagination.total})
                </button>
              </div>

              {recordsTab === 'aniversario' && (
                <section className="admin-panel-card">
                  <div className="admin-filters-grid">
                    <input
                      type="text"
                      placeholder="Buscar por código, nombre, celular o relato..."
                      value={anivFilters.search}
                      onChange={(e) =>
                        setAnivFilters({ ...anivFilters, search: e.target.value, page: 1 })
                      }
                      className="admin-input"
                    />
                    <select
                      value={anivFilters.estadoRevision}
                      onChange={(e) =>
                        setAnivFilters({ ...anivFilters, estadoRevision: e.target.value, page: 1 })
                      }
                      className="admin-select"
                    >
                      <option value="">Todos los estados</option>
                      {REVIEW_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <select
                      value={anivFilters.ocurrioBogota}
                      onChange={(e) =>
                        setAnivFilters({ ...anivFilters, ocurrioBogota: e.target.value, page: 1 })
                      }
                      className="admin-select"
                    >
                      <option value="">¿Ocurrió en Bogotá? (Todos)</option>
                      {OCURRIO_BOGOTA_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <select
                      value={anivFilters.situacionActual}
                      onChange={(e) =>
                        setAnivFilters({ ...anivFilters, situacionActual: e.target.value, page: 1 })
                      }
                      className="admin-select"
                    >
                      <option value="">Todas las situaciones</option>
                      {SITUACION_ACTUAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => fetchAniversario(anivFilters)}
                        className="btn btn-primary admin-btn-sm"
                      >
                        <RefreshCw size={14} />
                        <span>Filtrar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAnivFilters(INITIAL_ANIV_FILTERS);
                          fetchAniversario(INITIAL_ANIV_FILTERS);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Fecha</th>
                          <th>Postulante</th>
                          <th>WhatsApp</th>
                          <th>¿Bogotá?</th>
                          <th>Situación</th>
                          <th>Beneficio 60%</th>
                          <th>Estado</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {anivLoading ? (
                          <tr>
                            <td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>
                              Cargando postulaciones...
                            </td>
                          </tr>
                        ) : anivData.items.length === 0 ? (
                          <tr>
                            <td
                              colSpan={9}
                              style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}
                            >
                              No hay postulaciones con los filtros actuales.
                            </td>
                          </tr>
                        ) : (
                          anivData.items.map((row) => (
                            <tr key={row.id}>
                              <td><strong>{row.codigoPostulacion}</strong></td>
                              <td style={{ whiteSpace: 'nowrap' }}>{formatDateCo(row.createdAt)}</td>
                              <td>
                                <div><strong>{row.nombrePostulante}</strong></div>
                                {row.nombrePersonaAfectada && (
                                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                    Afectado: {row.nombrePersonaAfectada}
                                  </div>
                                )}
                              </td>
                              <td style={{ whiteSpace: 'nowrap' }}>{row.celularWhatsapp}</td>
                              <td>{row.ocurrioEnBogota}</td>
                              <td>{row.situacionActual}</td>
                              <td>
                                <span className={`admin-status-badge admin-status--${row.decisionBeneficio}`}>
                                  {row.decisionBeneficio}
                                </span>
                              </td>
                              <td>
                                <span className={`admin-status-badge admin-status--${row.estadoRevision}`}>
                                  {row.estadoRevision}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => openDetailModal('aniversario', row)}
                                  className="btn btn-outline-wine admin-btn-sm"
                                >
                                  Ver / Gestionar
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="admin-pagination">
                    <span>
                      Página {anivData.pagination.page} de {anivData.pagination.totalPages} ·{' '}
                      {anivData.pagination.total} registros
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        disabled={anivFilters.page <= 1}
                        onClick={() => {
                          const next = { ...anivFilters, page: anivFilters.page - 1 };
                          setAnivFilters(next);
                          fetchAniversario(next);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        disabled={anivFilters.page >= anivData.pagination.totalPages}
                        onClick={() => {
                          const next = { ...anivFilters, page: anivFilters.page + 1 };
                          setAnivFilters(next);
                          fetchAniversario(next);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {recordsTab === 'consultas' && (
                <section className="admin-panel-card">
                  <div className="admin-filters-grid">
                    <input
                      type="text"
                      placeholder="Buscar por código, nombre, correo, empresa..."
                      value={consFilters.search}
                      onChange={(e) =>
                        setConsFilters({ ...consFilters, search: e.target.value, page: 1 })
                      }
                      className="admin-input"
                    />
                    <select
                      value={consFilters.origenFormulario}
                      onChange={(e) =>
                        setConsFilters({ ...consFilters, origenFormulario: e.target.value, page: 1 })
                      }
                      className="admin-select"
                    >
                      <option value="">Todos los orígenes</option>
                      <option value="formulario_general">Formulario General (/formulario)</option>
                      <option value="diagnostico_compliance">Diagnóstico Compliance</option>
                    </select>
                    <select
                      value={consFilters.estadoRevision}
                      onChange={(e) =>
                        setConsFilters({ ...consFilters, estadoRevision: e.target.value, page: 1 })
                      }
                      className="admin-select"
                    >
                      <option value="">Todos los estados</option>
                      {REVIEW_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => fetchConsultas(consFilters)}
                        className="btn btn-primary admin-btn-sm"
                      >
                        <RefreshCw size={14} />
                        <span>Filtrar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConsFilters(INITIAL_CONS_FILTERS);
                          fetchConsultas(INITIAL_CONS_FILTERS);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Fecha</th>
                          <th>Origen</th>
                          <th>Nombre / Empresa</th>
                          <th>WhatsApp</th>
                          <th>Servicio / Necesidad</th>
                          <th>Estado</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consLoading ? (
                          <tr>
                            <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                              Cargando consultas...
                            </td>
                          </tr>
                        ) : consData.items.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}
                            >
                              No hay consultas registradas con los filtros actuales.
                            </td>
                          </tr>
                        ) : (
                          consData.items.map((row) => (
                            <tr key={row.id}>
                              <td><strong>{row.codigoConsulta}</strong></td>
                              <td style={{ whiteSpace: 'nowrap' }}>{formatDateCo(row.createdAt)}</td>
                              <td>
                                {row.origenFormulario === 'diagnostico_compliance'
                                  ? 'Compliance'
                                  : 'General'}
                              </td>
                              <td>
                                <div><strong>{row.nombreCompleto}</strong></div>
                                {row.empresaRazonSocial && (
                                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                    {row.empresaRazonSocial}
                                  </div>
                                )}
                              </td>
                              <td style={{ whiteSpace: 'nowrap' }}>{row.telefonoWhatsapp}</td>
                              <td>{row.necesidadServicio}</td>
                              <td>
                                <span className={`admin-status-badge admin-status--${row.estadoRevision}`}>
                                  {row.estadoRevision}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => openDetailModal('consulta', row)}
                                  className="btn btn-outline-wine admin-btn-sm"
                                >
                                  Ver / Gestionar
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="admin-pagination">
                    <span>
                      Página {consData.pagination.page} de {consData.pagination.totalPages} ·{' '}
                      {consData.pagination.total} registros
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        disabled={consFilters.page <= 1}
                        onClick={() => {
                          const next = { ...consFilters, page: consFilters.page - 1 };
                          setConsFilters(next);
                          fetchConsultas(next);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        disabled={consFilters.page >= consData.pagination.totalPages}
                        onClick={() => {
                          const next = { ...consFilters, page: consFilters.page + 1 };
                          setConsFilters(next);
                          fetchConsultas(next);
                        }}
                        className="btn btn-outline-wine admin-btn-sm"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {/* ================================================================
              SECCIÓN 2: EXPORTAR
              ================================================================ */}
          {activeSection === 'exportar' && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="admin-panel-card">
                <h2 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)', marginBottom: '0.75rem' }}>
                  Filtros opcionales para la exportación
                </h2>
                <div className="admin-filters-grid" style={{ marginBottom: 0 }}>
                  <div>
                    <label className="admin-detail-label" htmlFor="exportDateFrom">
                      Desde fecha
                    </label>
                    <input
                      id="exportDateFrom"
                      type="date"
                      value={exportFilters.dateFrom}
                      onChange={(e) => setExportFilters({ ...exportFilters, dateFrom: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-detail-label" htmlFor="exportDateTo">
                      Hasta fecha
                    </label>
                    <input
                      id="exportDateTo"
                      type="date"
                      value={exportFilters.dateTo}
                      onChange={(e) => setExportFilters({ ...exportFilters, dateTo: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-detail-label" htmlFor="exportEstado">
                      Estado de revisión
                    </label>
                    <select
                      id="exportEstado"
                      value={exportFilters.estadoRevision}
                      onChange={(e) =>
                        setExportFilters({ ...exportFilters, estadoRevision: e.target.value })
                      }
                      className="admin-select"
                    >
                      <option value="">Todos los estados</option>
                      {REVIEW_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setExportFilters(INITIAL_EXPORT_FILTERS)}
                      className="btn btn-outline-wine admin-btn-sm"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-export-grid">
                <div className="admin-export-card admin-export-card--featured">
                  <div>
                    <span className="badge badge-wine" style={{ marginBottom: '0.75rem' }}>
                      Recomendado
                    </span>
                    <h3 className="text-serif" style={{ fontSize: '1.3rem', color: 'var(--color-wine)', marginBottom: '0.4rem' }}>
                      Todos los Formularios
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Libro Excel multi-hoja (Aniversario Bogotá + Consultas Generales y Compliance) o CSV unificado con {totalRegistros} registros totales.
                    </p>
                  </div>
                  <div className="admin-export-actions">
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('todos', 'xlsx', exportFilters)}
                      className="btn btn-primary admin-btn-sm"
                    >
                      <FileSpreadsheet size={15} />
                      <span>{exportingKey === 'todos-xlsx' ? 'Generando...' : 'Descargar Excel (.xlsx)'}</span>
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('todos', 'csv', exportFilters)}
                      className="btn btn-outline-wine admin-btn-sm"
                    >
                      <Download size={15} />
                      <span>{exportingKey === 'todos-csv' ? 'Generando...' : 'Descargar CSV'}</span>
                    </button>
                  </div>
                </div>

                <div className="admin-export-card">
                  <div>
                    <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.4rem' }}>
                      Aniversario Bogotá
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Postulaciones de la campaña 1 Año en Bogotá ({summary?.aniversario?.total ?? 0} registros) con relato completo y estado de revisión.
                    </p>
                  </div>
                  <div className="admin-export-actions">
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('aniversario', 'xlsx', exportFilters)}
                      className="btn btn-gold admin-btn-sm"
                    >
                      <FileSpreadsheet size={15} />
                      <span>{exportingKey === 'aniversario-xlsx' ? 'Generando...' : 'Excel (.xlsx)'}</span>
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('aniversario', 'csv', exportFilters)}
                      className="btn btn-outline-wine admin-btn-sm"
                    >
                      <Download size={15} />
                      <span>{exportingKey === 'aniversario-csv' ? 'Generando...' : 'CSV'}</span>
                    </button>
                  </div>
                </div>

                <div className="admin-export-card">
                  <div>
                    <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.4rem' }}>
                      Consultas &amp; Compliance
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Solicitudes del formulario principal y diagnósticos empresariales ({summary?.consultas?.total ?? 0} registros).
                    </p>
                  </div>
                  <div className="admin-export-actions">
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('consultas', 'xlsx', exportFilters)}
                      className="btn btn-gold admin-btn-sm"
                    >
                      <FileSpreadsheet size={15} />
                      <span>{exportingKey === 'consultas-xlsx' ? 'Generando...' : 'Excel (.xlsx)'}</span>
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(exportingKey)}
                      onClick={() => handleExport('consultas', 'csv', exportFilters)}
                      className="btn btn-outline-wine admin-btn-sm"
                    >
                      <Download size={15} />
                      <span>{exportingKey === 'consultas-csv' ? 'Generando...' : 'CSV'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================================================================
              SECCIÓN 3: GESTIÓN DE USUARIOS (SUPER ADMIN)
              ================================================================ */}
          {activeSection === 'usuarios' && currentUser?.rol === 'super_admin' && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="admin-panel-card">
                <h2 className="text-serif" style={{ fontSize: '1.3rem', color: 'var(--color-wine)', marginBottom: '0.35rem' }}>
                  Generar Código de Registro
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  Crea un código de un solo uso para invitar a otro abogado o al propietario final. Al entrar con su cuenta de Google e ingresar el código, quedará habilitado con el rol asignado.
                </p>

                {generatedCodeBanner?.codigoPlano && (
                  <div className="admin-invite-code-banner">
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#065F46', fontWeight: 700 }}>
                        Código generado para: {generatedCodeBanner.etiquetaUsuario} (cópialo ahora, solo se muestra una vez)
                      </div>
                      <div className="admin-invite-code-mono">{generatedCodeBanner.codigoPlano}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(generatedCodeBanner.codigoPlano);
                        setCopiedCode(true);
                      }}
                      className="btn btn-primary admin-btn-sm"
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedCode ? 'Copiado' : 'Copiar código'}</span>
                    </button>
                  </div>
                )}

                <form
                  onSubmit={handleCreateInvitation}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.85rem',
                    alignItems: 'end',
                  }}
                >
                  <div>
                    <label className="admin-detail-label" htmlFor="etiquetaUsuario">
                      Nombre / Alias Interno *
                    </label>
                    <input
                      id="etiquetaUsuario"
                      type="text"
                      required
                      value={inviteForm.etiquetaUsuario}
                      onChange={(e) => setInviteForm({ ...inviteForm, etiquetaUsuario: e.target.value })}
                      placeholder="Ej. Dra. Camila Torres - Penal"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-detail-label" htmlFor="rolAsignado">
                      Rol Asignado
                    </label>
                    <select
                      id="rolAsignado"
                      value={inviteForm.rolAsignado}
                      onChange={(e) => setInviteForm({ ...inviteForm, rolAsignado: e.target.value })}
                      className="admin-select"
                    >
                      <option value="admin">Admin (Ver y exportar formularios)</option>
                      <option value="super_admin">Super Admin (Gestión total)</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-detail-label" htmlFor="expiraEnHoras">
                      Vigencia
                    </label>
                    <select
                      id="expiraEnHoras"
                      value={inviteForm.expiraEnHoras}
                      onChange={(e) => setInviteForm({ ...inviteForm, expiraEnHoras: Number(e.target.value) })}
                      className="admin-select"
                    >
                      <option value={24}>24 horas</option>
                      <option value={72}>72 horas (3 días)</option>
                      <option value={168}>168 horas (7 días)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-gold admin-btn-sm">
                    <KeyRound size={15} />
                    <span>Generar Código</span>
                  </button>
                </form>
              </div>

              <div className="admin-panel-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <h3 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)', margin: 0 }}>
                    Administradores Vinculados
                  </h3>
                  <span className="admin-status-badge admin-status--activo">
                    <ShieldCheck size={13} style={{ marginRight: '4px' }} />
                    Activación inicial bloqueada
                  </span>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Alias / Nombre Interno</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Último Acceso</th>
                        <th>Creado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersLoading ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '1.5rem' }}>
                            Cargando...
                          </td>
                        </tr>
                      ) : (
                        adminUsers.map((u) => (
                          <tr key={u.id}>
                            <td>#{u.id}</td>
                            <td>
                              <strong>{u.nombreInterno}</strong>
                              {u.esFundador && (
                                <span
                                  style={{
                                    marginLeft: '0.5rem',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    backgroundColor: 'var(--color-gold)',
                                    color: '#1E0004',
                                    padding: '0.12rem 0.5rem',
                                    borderRadius: '9999px',
                                  }}
                                >
                                  Inicial
                                </span>
                              )}
                            </td>
                            <td>
                              {Number(u.id) === Number(currentUser.id) ? (
                                <span>{u.rol}</span>
                              ) : (
                                <select
                                  aria-label={`Rol de ${u.nombreInterno}`}
                                  value={u.rol}
                                  onChange={(e) => handleChangeUserRole(u, e.target.value)}
                                  className="admin-select"
                                  style={{ minWidth: '130px', padding: '0.3rem 0.5rem', fontSize: '0.82rem' }}
                                >
                                  <option value="admin">admin</option>
                                  <option value="super_admin">super_admin</option>
                                </select>
                              )}
                            </td>
                            <td>
                              <span
                                className={`admin-status-badge ${
                                  u.activo ? 'admin-status--activo' : 'admin-status--inactivo'
                                }`}
                              >
                                {u.activo ? 'activo' : 'inactivo'}
                              </span>
                            </td>
                            <td>{formatDateCo(u.ultimoAccesoAt)}</td>
                            <td>{formatDateCo(u.createdAt)}</td>
                            <td>
                              {Number(u.id) === Number(currentUser.id) ? (
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                  Sesión actual
                                </span>
                              ) : (
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleUserActive(u)}
                                    className="btn btn-outline-wine admin-btn-sm"
                                  >
                                    {u.activo ? 'Desactivar' : 'Activar'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(u)}
                                    className="btn btn-outline-wine admin-btn-sm"
                                    style={{ borderColor: '#DC2626', color: '#B91C1C' }}
                                    title="Eliminar usuario administrador"
                                  >
                                    <Trash2 size={14} />
                                    <span>Eliminar</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-panel-card">
                <h3 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)', marginBottom: '1rem' }}>
                  Historial de Códigos de Invitación
                </h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Código (Enmascarado)</th>
                        <th>Etiqueta Destinatario</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Expira</th>
                        <th>Usado Por</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitations.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-text-muted)' }}
                          >
                            Aún no has generado códigos de invitación.
                          </td>
                        </tr>
                      ) : (
                        invitations.map((inv) => (
                          <tr key={inv.id}>
                            <td><code>{inv.codigoPreview}</code></td>
                            <td><strong>{inv.etiquetaUsuario}</strong></td>
                            <td>{inv.rolAsignado}</td>
                            <td>
                              <span className={`admin-status-badge admin-status--${inv.estado}`}>
                                {inv.estado}
                              </span>
                            </td>
                            <td>{formatDateCo(inv.expiraAt)}</td>
                            <td>{inv.usadoPorNombre || '—'}</td>
                            <td>
                              {inv.estado === 'activo' && (
                                <button
                                  type="button"
                                  onClick={() => handleRevokeInvite(inv.id)}
                                  className="btn btn-outline-wine admin-btn-sm"
                                >
                                  Revocar
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* MODAL DE DETALLE Y REVISIÓN */}
      {selectedRecord && (
        <div
          className="admin-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedRecord(null)}
        >
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-gold)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedRecord.kind === 'aniversario'
                    ? 'Postulación Aniversario Bogotá'
                    : 'Consulta General / Compliance'}
                </span>
                <h3 className="text-serif" style={{ margin: 0, color: '#FFFFFF' }}>
                  {selectedRecord.kind === 'aniversario'
                    ? selectedRecord.row.codigoPostulacion
                    : selectedRecord.row.codigoConsulta}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Cerrar"
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  border: 'none',
                  color: '#FFF',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {selectedRecord.kind === 'aniversario' ? (
                <>
                  <div className="admin-detail-grid">
                    <div>
                      <div className="admin-detail-label">Postulante</div>
                      <div>{selectedRecord.row.nombrePostulante}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">WhatsApp</div>
                      <div>{selectedRecord.row.celularWhatsapp}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">¿Quién necesita?</div>
                      <div>{selectedRecord.row.quienNecesita}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Persona afectada</div>
                      <div>{selectedRecord.row.nombrePersonaAfectada || 'Mismo postulante'}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">¿Ocurrió en Bogotá?</div>
                      <div>{selectedRecord.row.ocurrioEnBogota}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Situación actual</div>
                      <div>{selectedRecord.row.situacionActual}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Decisión Beneficio 60%</div>
                      <div>{selectedRecord.row.decisionBeneficio}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Fecha de registro</div>
                      <div>{formatDateCo(selectedRecord.row.createdAt)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="admin-detail-label" style={{ marginBottom: '0.35rem' }}>
                      Relato del caso
                    </div>
                    <div className="admin-detail-story">{selectedRecord.row.relatoCaso}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-detail-grid">
                    <div>
                      <div className="admin-detail-label">Nombre / Contacto</div>
                      <div>{selectedRecord.row.nombreCompleto}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">WhatsApp</div>
                      <div>{selectedRecord.row.telefonoWhatsapp}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Correo electrónico</div>
                      <div>{selectedRecord.row.correoElectronico || '—'}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Ciudad</div>
                      <div>{selectedRecord.row.ciudad || '—'}</div>
                    </div>
                    <div>
                      <div className="admin-detail-label">Servicio / Necesidad</div>
                      <div>{selectedRecord.row.necesidadServicio}</div>
                    </div>
                    {selectedRecord.row.institucionFuerzaPublica && (
                      <div>
                        <div className="admin-detail-label">Institución</div>
                        <div>{selectedRecord.row.institucionFuerzaPublica}</div>
                      </div>
                    )}
                    {selectedRecord.row.planInteres && (
                      <div>
                        <div className="admin-detail-label">Plan de interés</div>
                        <div>{selectedRecord.row.planInteres}</div>
                      </div>
                    )}
                    {selectedRecord.row.situacionPenal && (
                      <div>
                        <div className="admin-detail-label">Situación penal</div>
                        <div>{selectedRecord.row.situacionPenal}</div>
                      </div>
                    )}
                    {selectedRecord.row.empresaRazonSocial && (
                      <div>
                        <div className="admin-detail-label">Empresa</div>
                        <div>
                          {selectedRecord.row.empresaRazonSocial} ({selectedRecord.row.empresaSector || 'General'})
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="admin-detail-label" style={{ marginBottom: '0.35rem' }}>
                      Detalles de la consulta
                    </div>
                    <div className="admin-detail-story">{selectedRecord.row.detallesCaso}</div>
                  </div>
                </>
              )}

              <form
                onSubmit={handleSaveReview}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '1rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <label className="admin-detail-label" htmlFor="reviewEstado">
                      Estado de Revisión
                    </label>
                    <select
                      id="reviewEstado"
                      value={reviewEstado}
                      onChange={(e) => setReviewEstado(e.target.value)}
                      className="admin-select"
                    >
                      {REVIEW_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="admin-detail-label">Última revisión por</div>
                    <div style={{ paddingTop: '0.5rem', fontSize: '0.88rem' }}>
                      {selectedRecord.row.revisadoPorNombre || 'Sin revisar aún'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="admin-detail-label" htmlFor="reviewNotas">
                    Notas Internas (Abogados AMF)
                  </label>
                  <textarea
                    id="reviewNotas"
                    rows={3}
                    value={reviewNotas}
                    onChange={(e) => setReviewNotas(e.target.value)}
                    placeholder="Observaciones internas del seguimiento o contacto..."
                    className="admin-textarea"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedRecord(null)}
                    className="btn btn-outline-wine admin-btn-sm"
                  >
                    Cancelar
                  </button>
                  <button type="submit" disabled={savingReview} className="btn btn-gold admin-btn-sm">
                    {savingReview ? 'Guardando...' : 'Guardar Seguimiento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
