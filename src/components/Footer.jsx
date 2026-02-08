import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Stethoscope, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import pkFlag from '@/assets/pk.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 font-sans">
      <div className="container-base py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow shadow-primary/20">
                <Stethoscope className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Medixra</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-justify">
              Pakistan's leading B2B marketplace for new and refurbished medical equipment. Connecting healthcare providers with trusted vendors nationwide with transparency and efficiency.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-md bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Link Columns - Dense */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/products" className="hover:text-primary transition-colors duration-200 block">Browse Equipment</Link></li>
              <li><Link to="/vendors" className="hover:text-primary transition-colors duration-200 block">Find Vendors</Link></li>
              <li><Link to="/browse-specialty" className="hover:text-primary transition-colors duration-200 block">By Specialty</Link></li>
              <li><Link to="/add-listing" className="hover:text-primary transition-colors duration-200 block">Sell Equipment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-primary transition-colors duration-200 block">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors duration-200 block">How It Works</Link></li>
              <li><Link to="/vendor/register" className="hover:text-primary transition-colors duration-200 block">Become a Vendor</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors duration-200 block">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Contact Info - Dense */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-snug">123 Medical Tower, Clifton,<br />Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@medixra.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-900" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {currentYear} Medixra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
