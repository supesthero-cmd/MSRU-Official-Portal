import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import { bootstrapCMS } from './services/bootstrap';
import { Loader2 } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Attempt to bootstrap the CMS (Create tables/Seed data) if they don't exist
      await bootstrapCMS();
      setIsInitializing(false);
    };
    init();
  }, []);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-paper text-ink">
        <Loader2 className="animate-spin mb-4" size={48} />
        <h2 className="font-display text-xl tracking-widest">INITIALIZING SYSTEM</h2>
        <p className="text-sm text-ink/50 mt-2 font-mono">Connecting to Directus & Synchronizing Schema...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-paper font-sans text-ink selection:bg-cinnabar selection:text-paper">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;