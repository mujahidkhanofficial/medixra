
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    if (!termsAccepted) {
        toast({
            title: 'Terms Required',
            description: 'Please agree to the Terms & Conditions to login.',
            variant: 'destructive'
        });
        return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Logged in successfully'
      });
      
      // Redirect based on role
      if (result.user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (result.user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - MedEquip Marketplace</title>
        <meta name="description" content="Login to your MedEquip account to access medical equipment marketplace" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
        <Button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mt-12 sm:mt-0"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block p-3 bg-[var(--color-bg-light)] rounded-full mb-4 border border-[var(--color-border)]"
              >
                <LogIn className="w-8 h-8 text-[var(--color-primary)]" />
              </motion.div>
              <h1 className="text-3xl font-bold text-[var(--color-text-heading)]">Welcome Back</h1>
              <p className="text-[var(--color-text-body)] mt-2">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-heading)] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-gray-900"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-heading)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-gray-900"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[var(--color-primary)] hover:underline font-medium"
                  style={{ marginTop: '12px', display: 'inline-block' }}
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-start gap-2 mt-4">
                  <input 
                      type="checkbox" 
                      id="terms" 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <Link to="/terms" className="text-teal-600 hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
                  </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.01]"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[var(--color-text-body)]">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
