import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Code2, User, Briefcase, Send, Quote, BookOpen, Settings, Save, X, Plus, Trash2, Menu } from 'lucide-react';
import { cn } from './lib/utils';
import { PortfolioData } from './types/portfolio';
import { DEFAULT_DATA } from './data';
import { loadPortfolioData, savePortfolioData, subscribeToPortfolioData } from './lib/firestore';

// Components
import CursedBackground from './components/CursedBackground';
import SukunaMark from './components/SukunaMark';
import CursedCursor from './components/CursedCursor';
import AdminPanel from './components/AdminPanel';
import DomainAuthModal from './components/DomainAuthModal';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
import Journal from './components/sections/Journal';
import Contact from './components/sections/Contact';

export default function App() {
  const [theme, setTheme] = useState<'gojo' | 'sukuna'>('gojo');
  const [mounted, setMounted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // ADMIN STATE
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);


  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Check if user is already admin in this session
    const adminStatus = sessionStorage.getItem('jjk_admin_active');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
    
    // Load initial data from Firestore
    loadPortfolioData().then(saved => {
      if (saved) {
        setData(saved);
      } else {
        // If no data in Firestore yet, initialize it
        savePortfolioData(DEFAULT_DATA);
      }
    }).catch(console.error);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToPortfolioData((updatedData) => {
      setData(updatedData);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // RESTORE URL CHECK for easier access
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' && !isAdmin) {
      setShowAuthModal(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [theme]);

  // Global "tenkai" keyword listener
  useEffect(() => {
    let buffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.endsWith('tenkai')) {
        setShowAuthModal(true);
        buffer = '';
      }
      if (buffer.length > 10) buffer = buffer.slice(-10);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAuthSuccess = () => {
    setIsAdmin(true);
    setShowAdminPanel(true);
    setShowAuthModal(false);
    sessionStorage.setItem('jjk_admin_active', 'true');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'gojo' ? 'sukuna' : 'gojo');
  };

  const handleDoubleClick = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
  }, []);

  useEffect(() => {
    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, [handleDoubleClick]);

  const saveData = async (updated: PortfolioData) => {
    setData(updated);
    try {
      await savePortfolioData(updated);
    } catch (e) {
      console.error('Failed to save to Firestore:', e);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen font-sans selection:bg-accent selection:text-bg cursor-none">
      <CursedCursor theme={theme} />
      <CursedBackground theme={theme} />
      <SukunaMark theme={theme} />
      
      {/* Domain Expansion Flash */}
      <motion.div 
        className="domain-flash"
        animate={{ opacity: flash ? 0.1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Admin Toggle (Visible only if unlocked) */}
      {isAdmin && (
        <button 
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-accent text-bg rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform animate-pulse"
        >
          <Settings size={24} />
        </button>
      )}

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {showAdminPanel && (
          <AdminPanel 
            data={data} 
            onSave={saveData} 
            onClose={() => setShowAdminPanel(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthModal && (
          <DomainAuthModal
            onSuccess={handleAuthSuccess}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-500",
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-border/50 py-4" : "bg-transparent py-8"
      )}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display uppercase tracking-widest text-text flex items-center gap-1"
        >
          dev<span className="text-accent drop-shadow-[0_0_10px_var(--accent)]">🔥</span>russ
        </motion.div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-[0.8rem] font-sans font-bold uppercase tracking-[0.2em]">
            {['About', 'Skills', 'Experience', 'Projects', 'Journal', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-text hover:text-accent transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-bg transition-all duration-500 bg-bg/50 backdrop-blur-sm"
          >
            {theme === 'gojo' ? <Moon size={18} className="text-text" /> : <Sun size={18} className="text-text" />}
          </button>

          <button 
            onClick={() => setShowMobileMenu(true)}
            className="w-10 h-10 flex md:hidden items-center justify-center border border-border bg-bg/50 backdrop-blur-sm hover:text-accent transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-2xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-2xl font-display uppercase tracking-widest text-text">
                dev<span className="text-accent">🔥</span>russ
              </div>
              <button onClick={() => setShowMobileMenu(false)} className="text-text hover:text-accent">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Journal', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setShowMobileMenu(false)}
                  className="text-4xl font-display uppercase tracking-tighter hover:text-accent transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-border/50">
              <p className="text-[0.6rem] uppercase tracking-[0.4em] opacity-40 mb-8">System Status: Active</p>
              <div className="flex gap-6">
                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-accent"
                >
                  {theme === 'gojo' ? <Moon size={16} /> : <Sun size={16} />}
                  Switch Domain
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* SECTIONS */}
      <Hero data={data.hero} theme={theme} />
      <About data={data.about} theme={theme} />
      <Skills data={data.skills} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Testimonials data={data.testimonials} />
      <Journal data={data.journal} />
      <Contact data={data.contact} />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-display uppercase tracking-widest text-text flex items-center gap-1">
            dev<span className="text-accent drop-shadow-[0_0_10px_var(--accent)]">🔥</span>russ
          </div>
          <div className="text-[0.6rem] opacity-40 font-sans uppercase tracking-[0.2em] text-center">
            © 2025 Russell Mutamba. All techniques reserved.
          </div>
          <div className="font-japanese text-sm tracking-[0.3em] opacity-40 flex items-center gap-4">
            <span>呪術師 · 開発者</span>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="hover:text-accent transition-all duration-300 cursor-pointer opacity-20 hover:opacity-100 hover:scale-125"
              title="Domain Access"
            >
              闇
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
