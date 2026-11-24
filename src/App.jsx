import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { FuerzaPublica } from './pages/FuerzaPublica';
import { Planes } from './pages/Planes';
import { DerechoPenal } from './pages/DerechoPenal';
import { ComplianceCorporativo } from './pages/ComplianceCorporativo';
import { CentroJuridico } from './pages/CentroJuridico';
import { ArticuloDetalle } from './pages/ArticuloDetalle';
import { LocalCity } from './pages/LocalCity';
import { OtrosServicios } from './pages/OtrosServicios';
import { Clientes } from './pages/Clientes';
import { Equipo } from './pages/Equipo';
import { Ubicaciones } from './pages/Ubicaciones';
import { Formulario } from './pages/Formulario';
import { AnniversaryFlow } from './pages/AnniversaryFlow';
import { Privacidad } from './pages/Privacidad';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-paper)' }}>
      <Navbar />
      <div className="page-content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Trípode Comercial Canónico y Alias Retrocompatibles */}
          <Route path="/suscripcion-juridica-fuerza-publica" element={<FuerzaPublica />} />
          <Route path="/fuerza-publica" element={<FuerzaPublica />} />
          <Route path="/planes" element={<Planes />} />

          <Route path="/defensa-penal" element={<DerechoPenal />} />
          <Route path="/derecho-penal" element={<DerechoPenal />} />

          <Route path="/compliance-penal-corporativo" element={<ComplianceCorporativo />} />

          {/* Centro Jurídico & Artículos */}
          <Route path="/centro-juridico" element={<CentroJuridico />} />
          <Route path="/centro-juridico/:slug" element={<ArticuloDetalle />} />

          {/* SEO Local Ciudades */}
          <Route path="/bogota" element={<LocalCity cityKey="bogota" />} />
          <Route path="/cali" element={<LocalCity cityKey="cali" />} />
          <Route path="/medellin" element={<LocalCity cityKey="medellin" />} />

          {/* Secciones Institucionales y Formularios */}
          <Route path="/otros-servicios" element={<OtrosServicios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/ubicaciones" element={<Ubicaciones />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/aniversario-bogota" element={<AnniversaryFlow />} />
          <Route path="/aniversario" element={<Navigate to="/aniversario-bogota" replace />} />
          <Route path="/privacidad" element={<Privacidad />} />

          {/* 404 — ruta catch-all real */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
