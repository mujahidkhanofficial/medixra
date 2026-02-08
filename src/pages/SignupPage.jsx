import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowLeft, ShieldCheck, Stethoscope } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useSEO } from '@/hooks/useSEO';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' // Default role
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const seo = useSEO({
    title: "Sign Up - Medixra",
    description: "Create a new account on Medixra Marketplace to buy or sell medical equipment.",
    canonicalUrl: "https://medixra.com/signup"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the Terms & Conditions to sign up.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Account created successfully'
      });
      navigate('/login');
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {seo}

      {/* Left Side: Branding (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] opacity-30 -mr-24 -mt-24 pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Medixra</span>
          </Link>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Join the Future of <br />
              <span className="text-white/80">Healthcare Supply.</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Connect directly with verified vendors, access transparent pricing, and equip your facility with confidence.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">Verified Vendors</div>
              <div className="text-sm text-primary-foreground/80">Every seller is vetted for quality compliance.</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">Community First</div>
              <div className="text-sm text-primary-foreground/80">Join 500+ hospitals and clinics in Pakistan.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 lg:top-8 lg:left-8 gap-2 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
            <p className="text-muted-foreground">
              Start buying or selling medical equipment today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. Ali Khan"
                    className="pl-10 h-11"
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@hospital.com"
                    className="pl-10 h-11"
                    required
                  />
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="******"
                      className="pl-10 h-11"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="******"
                      className="pl-10 h-11"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-muted/40 rounded-xl border border-muted">
                <Label htmlFor="role" className="font-bold">I want to...</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div
                    className={`cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-2 transition-all ${formData.role === 'buyer'
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-input hover:bg-muted'
                      }`}
                    onClick={() => handleChange({ target: { name: 'role', value: 'buyer' } })}
                  >
                    <Stethoscope className="w-5 h-5" />
                    <span className="text-sm font-bold">Buy Equipment</span>
                  </div>
                  <div
                    className={`cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-2 transition-all ${formData.role === 'vendor'
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-input hover:bg-muted'
                      }`}
                    onClick={() => handleChange({ target: { name: 'role', value: 'vendor' } })}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-bold">Sell Equipment</span>
                  </div>
                </div>
                {/* Hidden Select to maintain form logic if needed, but UI handled above */}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 mt-1 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-normal"
              >
                I agree to the <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </label>
            </div>

            <Button type="submit" className="w-full h-11 font-bold text-base shadow-lg shadow-primary/20" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <UserPlus className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
