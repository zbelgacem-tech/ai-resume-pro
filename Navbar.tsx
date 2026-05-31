import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg-light)]/95 dark:bg-[var(--color-primary-dark)]/95 shadow-sm backdrop-blur-[16px]'
            : 'bg-[var(--color-bg-light)]/90 dark:bg-[var(--color-primary-dark)]/90 backdrop-blur-[16px]'
        } border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]`}
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl font-bold gradient-text shrink-0">
            AI Resume Pro
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-[15px] font-medium transition-colors duration-200 hover:text-[var(--color-primary-blue)] ${
                  location.pathname === link.href
                    ? 'text-[var(--color-primary-blue)] font-semibold'
                    : 'text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown size={14} className="text-[var(--color-text-gray)]" />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-xl shadow-elevated border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                        <p className="font-heading font-semibold text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{user?.name}</p>
                        <p className="text-xs text-[var(--color-text-gray)]">{user?.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <Shield size={16} />
                          Admin Panel
                        </Link>
                      )}
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <User size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-heading font-medium text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:text-[var(--color-primary-blue)] transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/register">
                  <Button className="rounded-full px-6 py-2.5 gradient-primary text-white font-heading font-medium text-sm hover:shadow-glow-blue transition-all duration-200 hover:scale-[1.02]">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-primary-dark)] transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-display text-3xl text-[var(--color-text-light)] hover:text-[var(--color-primary-blue)] transition-all duration-300 ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleTheme}
              className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--color-text-light)] border border-[var(--color-border-dark)]"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link to="/dashboard" className="font-heading text-lg text-[var(--color-text-light)] hover:text-[var(--color-primary-blue)]">
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="font-heading text-lg text-[var(--color-error)]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link to="/login" className="font-heading text-xl text-[var(--color-text-light)]">
                Sign In
              </Link>
              <Link to="/register">
                <Button className="rounded-full px-8 py-3 gradient-primary text-white font-heading font-medium text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
