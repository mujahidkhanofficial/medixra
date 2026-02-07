
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Mail, Phone, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { authAPI } from '@/services/api';
import { useSEO } from '@/hooks/useSEO';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email'); // 'email' or 'whatsapp'
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const seo = useSEO({
    title: "Reset Your Password | Medixra",
    description: "Securely reset your Medixra password using your email or WhatsApp number.",
    canonicalUrl: "https://medixra.com/forgot-password"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
    } else {
      // WhatsApp validation: digits only, 10-15 chars
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(identifier.replace(/[^0-9]/g, ''))) {
        toast({
          title: "Invalid Number",
          description: "Please enter a valid WhatsApp number (10-15 digits).",
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = authAPI.forgotPassword(identifier, method);
      
      if (result.success) {
        setStep(2);
        toast({
          title: "Instructions Sent",
          description: "Please check your inbox or WhatsApp messages."
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    const result = authAPI.resendResetInstructions(identifier, method);
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: "Resent Successfully",
        description: "A new reset link has been sent."
      });
    }
  };

  return (
    <>
      {seo}

      <div className="forgot-password-page">
        <div className="fp-card">
          {step === 1 ? (
            <>
              <div className="fp-header">
                <h1>Reset Your Password</h1>
                <p>Enter your contact details to receive reset instructions.</p>
              </div>

              <div className="fp-methods">
                <button 
                  className={`fp-method-btn ${method === 'email' ? 'active' : ''}`}
                  onClick={() => { setMethod('email'); setIdentifier(''); }}
                >
                  Email Address
                </button>
                <button 
                  className={`fp-method-btn ${method === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => { setMethod('whatsapp'); setIdentifier(''); }}
                >
                  WhatsApp Number
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="fp-input-group">
                  <div className="relative">
                    {method === 'email' ? (
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    ) : (
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    )}
                    <input
                      type={method === 'email' ? 'email' : 'tel'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={method === 'email' ? "name@example.com" : "03001234567"}
                      className="fp-input pl-10"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="fp-submit-btn" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </form>

              <div className="fp-footer">
                <Link to="/login" className="fp-link flex items-center justify-center gap-2">
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="fp-success">
              <div className="fp-success-icon">
                <CheckCircle size={32} />
              </div>
              <div className="fp-header">
                <h1>Check Your {method === 'email' ? 'Inbox' : 'WhatsApp'}</h1>
                <p>We've sent password reset instructions to:</p>
                <p className="font-semibold text-gray-900 mt-2">{identifier}</p>
              </div>
              
              <Link to="/login" className="fp-submit-btn text-decoration-none">
                Back to Login
              </Link>

              <p className="fp-resend">
                Didn't receive it?{' '}
                <button onClick={handleResend} disabled={isLoading}>
                  {isLoading ? 'Resending...' : 'Resend'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
