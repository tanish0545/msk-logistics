import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ImageRecoveryManager } from './components/common/ImageRecoveryManager';
import { RouteProgressIndicator } from './components/common/RouteProgressIndicator';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExportPackagingPage } from './pages/ExportPackagingPage';
import { ContainerStuffingPage } from './pages/ContainerStuffingPage';
import { CargoLashingPage } from './pages/CargoLashingPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ExportPackingSolutionsPage } from './pages/ExportPackingSolutionsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { QuoteRequestPage } from './pages/QuoteRequestPage';
import { ContactPage } from './pages/ContactPage';
import { ImportExportPage } from './pages/ImportExportPage';
import { ContainerGuidePage } from './pages/ContainerGuidePage';
import { WarehousePage } from './pages/WarehousePage';
import { VesselSchedulePage } from './pages/VesselSchedulePage';
import { OperationsPage } from './pages/OperationsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ClientsPage } from './pages/ClientsPage';
import { StaffPage } from './pages/StaffPage';
import { BranchesPage } from './pages/BranchesPage';
import { RoadTransportPage } from './pages/RoadTransportPage';
import { HazardousCargoPage } from './pages/HazardousCargoPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MskOrbitChatbot } from './components/orbit/MskOrbitChatbot';

// Scroll to top or anchor on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

// Subtle page entrance transition wrapper with robust opacity fallback
const PageEntranceWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="animate-page-entrance min-h-full opacity-100">
      {children}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackTitle="Application Error">
      <Router>
        <ScrollToTop />
        <RouteProgressIndicator />
        <ImageRecoveryManager />
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#343434] selection:bg-[#B62825] selection:text-white">
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary fallbackTitle="Page Load Error">
              <PageEntranceWrapper>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/export-packaging" element={<ExportPackagingPage />} />
                  <Route path="/services/container-stuffing" element={<ContainerStuffingPage />} />
                  <Route path="/services/cargo-lashing" element={<CargoLashingPage />} />
                  <Route path="/services/hazardous-cargo" element={<HazardousCargoPage />} />
                  <Route path="/hazardous-cargo" element={<HazardousCargoPage />} />
                  <Route path="/services/warehouse" element={<Navigate to="/warehouse" replace />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/export-packing-solutions" element={<ExportPackingSolutionsPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/import-export" element={<ImportExportPage />} />
                  <Route path="/container-guide" element={<ContainerGuidePage />} />
                  <Route path="/warehouse" element={<WarehousePage />} />
                  <Route path="/warehousing" element={<WarehousePage />} />
                  <Route path="/vessel-schedule" element={<VesselSchedulePage />} />
                  <Route path="/operations" element={<OperationsPage />} />
                  <Route path="/knowledge" element={<KnowledgePage />} />
                  <Route path="/company/clients" element={<ClientsPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/company/staff" element={<StaffPage />} />
                  <Route path="/staff" element={<StaffPage />} />
                  <Route path="/company/branches" element={<BranchesPage />} />
                  <Route path="/branches" element={<BranchesPage />} />
                  <Route path="/road" element={<RoadTransportPage />} />
                  <Route path="/road-transport" element={<RoadTransportPage />} />
                  <Route path="/road-fleet" element={<RoadTransportPage />} />
                  <Route path="/request-quote" element={<QuoteRequestPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </PageEntranceWrapper>
            </ErrorBoundary>
          </main>
          <Footer />
          <MskOrbitChatbot />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
