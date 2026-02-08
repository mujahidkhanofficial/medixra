import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  Stethoscope,
  HelpCircle,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const MainNavigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'vendor') return '/vendor/dashboard';
    if (user.role === 'doctor') return '/doctor/dashboard';
    return '/buyer/dashboard';
  };

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/products", icon: ShoppingBag, label: "Products" },
    { to: "/vendors", icon: Building2, label: "Vendors" },
    { to: "/browse-specialty", icon: Stethoscope, label: "Specialties" },
    { to: "/how-it-works", icon: HelpCircle, label: "How It Works" }
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar - Branding & Flag (Solid Dark) */}
      <div className="bg-slate-900 text-slate-300">
        <div className="container-base flex h-9 items-center justify-between text-[11px] font-bold tracking-wider uppercase">
          <span className="opacity-90">Pakistan's Premier Medical Marketplace</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <span role="img" aria-label="Pakistan Flag">🇵🇰</span> Nationwide Delivery
            </span>
            <Separator orientation="vertical" className="h-3 bg-slate-700" />
            <Link to="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="container-base flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mr-8 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm group-hover:bg-primary/90 transition-colors">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-primary transition-colors">
              Medixra
            </span>
          </Link>

          {/* Desktop Navigation (Dense & Clean) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button variant="ghost" className="text-slate-600 hover:text-primary hover:bg-primary/5 font-bold text-sm tracking-wide h-9 px-4">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                  </Link>
                  <Link to="/vendor/register">
                    <Button variant="outline" size="sm" className="hidden lg:inline-flex">
                      Become a Vendor
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to={getDashboardLink()}>
                    <Button variant="outline" size="sm">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 pl-4 border-l">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{user?.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2 text-muted-foreground hover:text-destructive">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="text-left border-b pb-4 mb-4">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      Medixra
                    </SheetTitle>
                    <SheetDescription>
                      Medical Equipment Marketplace
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col gap-1 py-2">
                    {isAuthenticated && (
                      <div className="mb-6 flex items-center gap-3 rounded-lg border p-3 bg-muted/30">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col space-y-1">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Menu</h4>
                      {navItems.map((item) => (
                        <Link key={item.to} to={item.to} onClick={closeMenu}>
                          <Button variant="ghost" className="w-full justify-start font-normal h-10">
                            <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-2">
                      {!isAuthenticated ? (
                        <>
                          <Link to="/login" onClick={closeMenu}>
                            <Button variant="outline" className="w-full justify-start">
                              <LogIn className="mr-2 h-4 w-4" />
                              Log In
                            </Button>
                          </Link>
                          <Link to="/signup" onClick={closeMenu}>
                            <Button className="w-full justify-start">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Sign Up
                            </Button>
                          </Link>
                          <div className="mt-2">
                            <Link to="/vendor/register" onClick={closeMenu}>
                              <Button variant="secondary" className="w-full">
                                Become a Vendor
                              </Button>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to={getDashboardLink()} onClick={closeMenu}>
                            <Button variant="default" className="w-full justify-start">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Go to Dashboard
                            </Button>
                          </Link>
                          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
