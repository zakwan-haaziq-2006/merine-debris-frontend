import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Radio, Compass, Waves, ShieldCheck, Activity, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ANALYZE', path: '/analyze' },
    { label: 'REPORTS', path: '/reports' },
    { label: 'MAP', path: '/map' },
  ];

  const isRouteActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#031422]/90 backdrop-blur-md border-b border-[#67D9E8]/20 shadow-2xl py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#031B2E] border border-[#67D9E8]/40 shadow-[0_0_15px_rgba(103,217,232,0.25)] group-hover:border-[#67D9E8] transition-colors">
            <Radio className="w-5 h-5 text-[#67D9E8] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#67D9E8] ring-4 ring-[#031422]"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-widest text-white font-display">
              DEEPSEA <span className="text-[#67D9E8]">AI</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8EA9C1] uppercase font-mono -mt-1">
              Marine Sonar Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center space-x-1 p-1 rounded-full bg-[#031B2E]/70 border border-[#67D9E8]/20 backdrop-blur-md">
            {navItems.map((item) => {
              const active = isRouteActive(item.path);
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-[#67D9E8] text-[#031B2E] font-bold shadow-[0_0_15px_rgba(103,217,232,0.5)]'
                      : 'text-[#8EA9C1] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Real-time Acoustic Link Telemetry Badge */}
          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#020b14]/70 border border-[#67D9E8]/20 font-mono text-[11px] text-[#8EA9C1]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-white font-semibold">TOWFISH LINK:</span>
            <span className="text-[#67D9E8]">ONLINE 400kHz</span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg bg-[#031B2E] border border-[#67D9E8]/30 text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#67D9E8]" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#031422]/98 border-b border-[#67D9E8]/20 backdrop-blur-xl px-6 py-6 space-y-3">
          {navItems.map((item) => {
            const active = isRouteActive(item.path);
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full block px-4 py-3 rounded-lg text-sm font-bold tracking-wider transition-colors ${
                  active
                    ? 'bg-[#67D9E8] text-[#031B2E]'
                    : 'text-[#8EA9C1] hover:text-white hover:bg-[#031B2E]'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8EA9C1]">
            <span>SYSTEM: EDGE-TECH 4200</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ACTIVE
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
