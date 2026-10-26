import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExportPackagingPage } from './pages/ExportPackagingPage';
import { ContainerStuffingPage } from './pages/ContainerStuffingPage';
import { CargoLashingPage } from './pages/CargoLashingPage';
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
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

// Subtle page entrance transition wrapper (short fade + 6px vertical lift)
const PageEntranceWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="animate-page-entrance">
      {children}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#343434] selection:bg-[#B62825] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <PageEntranceWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/export-packaging" element={<ExportPackagingPage />} />
              <Route path="/services/container-stuffing" element={<ContainerStuffingPage />} />
              <Route path="/services/cargo-lashing" element={<CargoLashingPage />} />
              <Route path="/export-packing-solutions" element={<ExportPackingSolutionsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/import-export" element={<ImportExportPage />} />
              <Route path="/container-guide" element={<ContainerGuidePage />} />
              <Route path="/warehouse" element={<WarehousePage />} />
              <Route path="/warehousing" element={<WarehousePage />} />
              <Route path="/vessel-schedule" element={<VesselSchedulePage />} />
              <Route path="/operations" element={<OperationsPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/request-quote" element={<QuoteRequestPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageEntranceWrapper>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
