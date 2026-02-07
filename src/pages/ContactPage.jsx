
import React, { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import './ContactPage.css';

const ContactPage = () => {
  useSEO({
    title: "Contact Medixra | Support for Medical Equipment Marketplace Users",
    description: "Get in touch with the Medixra team for questions about listings, vendors or using the marketplace. Reach us via email or WhatsApp.",
    canonicalUrl: "https://medixra.com/contact"
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="container-base">
        <div className="text-center mb-12">
          <h1>Get in Touch</h1>
          <p className="text-gray-600">Have questions about buying or selling? We're here to help.</p>
        </div>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label className="contact-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="input-base" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="input-base" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  className="input-base" 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">Message</label>
                <textarea 
                  name="message"
                  className="input-base" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-card">
            <h2 className="text-white mb-8">Contact Information</h2>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Mail size={24} />
              </div>
              <div className="contact-info-text">
                <h4>Email Us</h4>
                <p>support@medixra.pk</p>
                <p>sales@medixra.pk</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone size={24} />
              </div>
              <div className="contact-info-text">
                <h4>WhatsApp / Phone</h4>
                <p>+92 300 1234567</p>
                <p>+92 21 31234567</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-info-text">
                <h4>Office Location</h4>
                <p>Technology Park, Shahrah-e-Faisal</p>
                <p>Karachi, Pakistan</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Clock size={24} />
              </div>
              <div className="contact-info-text">
                <h4>Business Hours</h4>
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
