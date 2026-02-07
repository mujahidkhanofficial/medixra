
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, X, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { authAPI } from '@/services/api';
import { useSEO } from '@/hooks/useSEO';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const seo = useSEO({
    title: "Reset Your Password | Medixra",
    description: "Securely reset your Medixra password using your email or WhatsApp number.",
    canonicalUrl: "https://medixra.com/reset-password"
  });

  // Validate token on mount
  useEffect(() => {
    const checkToken = async () => {
      const result = authAPI.validateResetToken(token);
      if (result.success) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        toast({
          title: "Invalid Link",
          description: result.error,
          variant: "destructive"
        });
      }
      setLoading(false);
    };
    checkToken();
  }, [token, toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password Strength Logic
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(formData.password);
  const strengthClass = strength === 0 ? '' : strength === 1 ? 'strength-weak' : strength === 2 ? 'strength-fair' : 'strength-good';
  const strengthText = strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : 'Strong';

  const isPasswordValid = strength === 3;
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid || !doPasswordsMatch) return;

    setIsSubmitting(true);
    const result = authAPI.resetPassword(token, formData.password);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      toast({
        title: "Success",
        description: "Your password has been reset successfully."
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="reset-page">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="reset-page">
        <div className="rp-card text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Invalid or Expired Link</h1>
          <p className="text-gray-600 mb-8">The password reset link you used is invalid or has expired.</p>
          <Link to="/forgot-password" class="rp-submit-btn flex items-center justify-center text-white no-underline">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="reset-page">
        <div className="rp-card text-center">
          <div className="fp-success-icon">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Password Reset Successful</h1>
          <p className="text-gray-600 mb-8">Your password has been updated. You can now log in with your new credentials.</p>
          <Link to="/login" className="rp-submit-btn flex items-center justify-center text-white no-underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {seo}

      <div className="reset-page">
        <div className="rp-card">
          <div className="rp-header">
            <h1>Create New Password</h1>
            <p>Please choose a strong password for your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rp-input-group">
              <label className="rp-label">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rp-input pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className={`strength-meter ${strengthClass}`}>
                <div className="strength-bars">
                  <div className="strength-bar bar-1"></div>
                  <div className="strength-bar bar-2"></div>
                  <div className="strength-bar bar-3"></div>
                </div>
                <span className={`strength-text text-${strengthText.toLowerCase()}`}>{strengthText}</span>
              </div>

              <ul className="validation-list">
                <li className={`validation-item ${formData.password.length >= 8 ? 'valid' : ''}`}>
                  {formData.password.length >= 8 ? <Check size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  At least 8 characters
                </li>
                <li className={`validation-item ${/[A-Z]/.test(formData.password) ? 'valid' : ''}`}>
                  {/[A-Z]/.test(formData.password) ? <Check size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  One uppercase letter
                </li>
                <li className={`validation-item ${/[0-9]/.test(formData.password) ? 'valid' : ''}`}>
                  {/[0-9]/.test(formData.password) ? <Check size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  One number
                </li>
              </ul>
            </div>

            <div className="rp-input-group">
              <label className="rp-label">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rp-input"
                  placeholder="Confirm new password"
                />
              </div>
              {formData.confirmPassword && !doPasswordsMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <button 
              type="submit" 
              className="rp-submit-btn" 
              disabled={!isPasswordValid || !doPasswordsMatch || isSubmitting}
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
