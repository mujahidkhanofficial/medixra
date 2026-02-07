
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ShoppingBag, LogIn, UserPlus, LogOut, LayoutDashboard, User, Menu, X, Stethoscope, HelpCircle, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const MainNavigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'vendor') return '/vendor/dashboard';
    if (user.role === 'doctor') return '/doctor/dashboard';
    return '/buyer/dashboard';
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      {/* Branding Header - Top Bar */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <Link to="/" className="flex items-center gap-2 text-decoration-none">
              <span className="text-xl md:text-2xl font-bold text-[var(--color-primary)] tracking-wide">
                Medixra
              </span>
            </Link>
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl" role="img" aria-label="Pakistan Flag">🇵🇰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { to: "/", icon: Home, label: "Home" },
                { to: "/products", icon: ShoppingBag, label: "Products" },
                { to: "/vendors", icon: Building2, label: "Vendors" },
                { to: "/browse-specialty", icon: Stethoscope, label: "Specialties" },
                { to: "/how-it-works", icon: HelpCircle, label: "How It Works" }
              ].map((item) => (
                <Link key={item.to} to={item.to}>
                  <Button 
                    variant="ghost" 
                    className="text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-light)] font-medium text-base h-10 px-3"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Spacer for mobile layout alignment if needed */}
            <div className="lg:hidden"></div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/vendor/register">
                    <Button variant="ghost" className="text-[var(--color-text-body)] hover:text-[var(--color-primary)] font-medium">
                      Register as Vendor
                    </Button>
                  </Link>
                  <div className="h-6 w-px bg-[var(--color-border)] mx-1"></div>
                  <Link to="/login">
                    <Button variant="ghost" className="text-[var(--color-text-body)] hover:text-[var(--color-primary)] font-medium">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-none shadow-sm font-semibold px-6">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to={getDashboardLink()}>
                    <Button variant="ghost" className="text-[var(--color-text-body)] hover:text-[var(--color-primary)] font-medium">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 ml-2 pl-2 border-l border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[var(--color-bg-light)] rounded-full flex items-center justify-center border border-[var(--color-border)]">
                        <User className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--color-text-heading)] hidden xl:block">{user.name}</span>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[var(--color-text-body)] p-2 focus:outline-none hover:bg-[var(--color-bg-light)] rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-[var(--color-border)] overflow-hidden absolute w-full shadow-xl"
            >
              <div className="px-4 py-6 space-y-2">
                {[
                  { to: "/", icon: Home, label: "Home" },
                  { to: "/products", icon: ShoppingBag, label: "Browse Products" },
                  { to: "/vendors", icon: Building2, label: "Browse Vendors" },
                  { to: "/browse-specialty", icon: Stethoscope, label: "Browse Specialties" },
                  { to: "/how-it-works", icon: HelpCircle, label: "How It Works" }
                ].map((item) => (
                  <Link key={item.to} to={item.to} onClick={closeMenu} className="block">
                    <Button variant="ghost" className="w-full justify-start text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-light)] h-12 text-base font-medium">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                ))}

                <div className="h-px bg-[var(--color-border)] my-4" />

                {!isAuthenticated ? (
                  <>
                    <Link to="/vendor/register" onClick={closeMenu} className="block">
                      <Button variant="ghost" className="w-full justify-start text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-light)] h-12 text-base font-medium">
                        <Building2 className="w-5 h-5 mr-3" />
                        Register as Vendor
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Link to="/login" onClick={closeMenu}>
                        <Button variant="outline" className="w-full justify-center border-[var(--color-border)] text-[var(--color-text-body)] hover:text-[var(--color-primary)] h-12 text-base font-medium">
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={closeMenu}>
                        <Button className="w-full justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white h-12 text-base font-bold shadow-md">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-4 bg-[var(--color-bg-light)] rounded-xl flex items-center gap-3 mb-2 border border-[var(--color-border)]">
                      <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Signed in as</span>
                          <span className="text-base font-bold text-[var(--color-text-heading)] truncate max-w-[200px]">{user.name}</span>
                      </div>
                    </div>

                    <Link to={getDashboardLink()} onClick={closeMenu} className="block">
                      <Button variant="ghost" className="w-full justify-start text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-light)] h-12 text-base font-medium">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                      </Button>
                    </Link>
                    
                    <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 h-12 text-base font-medium">
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default MainNavigation;
