
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  UserPlus, 
  Upload, 
  DollarSign, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle,
  ShoppingBag,
  FileText
} from 'lucide-react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const seo = useSEO({
    title: "How Medixra Works – Medical Equipment Marketplace in Pakistan",
    description: "Learn how Medixra connects medical equipment buyers and vendors in Pakistan. Understand listing, contacting via WhatsApp, and responsibilities of each party.",
    canonicalUrl: "https://medixra.com/how-it-works",
    ogTitle: "How Medixra Works – Medical Equipment Marketplace in Pakistan",
    ogDescription: "Guide to using Medixra: The medical equipment marketplace for Pakistan.",
    ogImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    ogType: "article"
  });

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const buyerSteps = [
    {
      icon: Search,
      title: "1. Search Equipment",
      description: "Browse thousands of listings by specialty, category, or keyword to find exactly what you need."
    },
    {
      icon: FileText,
      title: "2. Review Details",
      description: "Check technical specifications, condition (New/Used/Refurbished), and photos provided by the seller."
    },
    {
      icon: MessageCircle,
      title: "3. Contact Seller",
      description: "Click the WhatsApp button to chat directly with the vendor. No middlemen, no delays."
    },
    {
      icon: Truck,
      title: "4. Deal & Delivery",
      description: "Negotiate price, inspect the item (if possible), and arrange delivery directly with the seller."
    }
  ];

  const vendorSteps = [
    {
      icon: UserPlus,
      title: "1. Create Account",
      description: "Sign up as a vendor for free. Complete your profile to build trust with potential buyers."
    },
    {
      icon: Upload,
      title: "2. Post Listings",
      description: "Upload high-quality photos and detailed descriptions of your medical equipment."
    },
    {
      icon: MessageCircle,
      title: "3. Receive Inquiries",
      description: "Get direct messages from doctors and hospital administrators via WhatsApp."
    },
    {
      icon: DollarSign,
      title: "4. Sell & Grow",
      description: "Close deals directly. We don't charge commissions on your sales."
    }
  ];

  const faqs = [
    {
      question: "Is it free to join Medixra?",
      answer: "Yes! Creating an account for both buyers and vendors is completely free. We aim to connect the medical community without barriers."
    },
    {
      question: "Does Medixra charge a commission on sales?",
      answer: "No. Medixra is a connection platform. We do not take a commission on any sales made between buyers and sellers."
    },
    {
      question: "How do I contact a seller?",
      answer: "Every listing has a 'Contact via WhatsApp' button. Clicking this will open a direct chat with the seller on WhatsApp."
    },
    {
      question: "Does Medixra handle shipping and delivery?",
      answer: "No. Shipping and delivery terms must be negotiated and arranged directly between the buyer and the seller."
    },
    {
      question: "How can I trust a vendor?",
      answer: "Look for the 'Verified' badge on vendor profiles. We also recommend meeting in person to inspect expensive equipment before payment."
    },
    {
      question: "Can I sell used or refurbished equipment?",
      answer: "Absolutely. There is a high demand for quality used and refurbished medical equipment. Just mark the condition clearly in your listing."
    },
    {
      question: "How long does my listing stay active?",
      answer: "Your listing remains active until you mark it as sold or delete it from your dashboard."
    },
    {
      question: "What if I encounter a suspicious listing?",
      answer: "Please report any suspicious activity to our support team immediately via the Contact Us page."
    }
  ];

  return (
    <div className="how-it-works-page">
      {seo}

      {/* Hero Section */}
      <section className="hiw-hero">
        <div className="hiw-container">
          <h1>How Medixra Works</h1>
          <p>The simplest way to buy and sell medical equipment in Pakistan. Whether you're a doctor, hospital administrator, or equipment supplier, we make the process seamless.</p>
        </div>
      </section>

      <div className="hiw-container">
        
        {/* For Buyers Section */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">For Buyers</h2>
          <p className="hiw-section-subtitle">Find the right equipment for your clinic or hospital in 4 simple steps.</p>
          
          <div className="steps-wrapper">
            {buyerSteps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon-box">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Vendors Section */}
        <section className="hiw-section vendor-section">
          <h2 className="hiw-section-title">For Vendors</h2>
          <p className="hiw-section-subtitle">Expand your reach and sell to healthcare professionals nationwide.</p>
          
          <div className="steps-wrapper">
            {vendorSteps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon-box">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fees & Hosting Section */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">Fees & Hosting</h2>
          <p className="hiw-section-subtitle">Transparent pricing to help your business grow.</p>
          
          <div className="fees-grid">
            <div className="fee-card highlight">
              <h3>Vendor Registration</h3>
              <div className="fee-price">Free <span>/ Forever</span></div>
              <p>Create your profile, upload logo, and get verified without paying a rupee.</p>
            </div>
            
            <div className="fee-card">
              <h3>Listing Fees</h3>
              <div className="fee-price">Free <span>/ 1st Year</span></div>
              <p>Post unlimited products for free during our promotional launch period.</p>
            </div>
            
            <div className="fee-card">
              <h3>Sales Commission</h3>
              <div className="fee-price">0% <span>/ Always</span></div>
              <p>We don't take a cut. You keep 100% of the sale price you negotiate.</p>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">Safety Tips</h2>
          <p className="hiw-section-subtitle">How to stay safe while trading on Medixra.</p>
          
          <div className="safety-grid">
            <div className="safety-card">
              <ShieldCheck className="safety-icon" size={24} />
              <div className="safety-content">
                <h4>Verify Before Paying</h4>
                <p>Never transfer large sums of money without verifying the vendor or seeing the equipment in person if possible.</p>
              </div>
            </div>
            
            <div className="safety-card">
              <CheckCircle className="safety-icon" size={24} />
              <div className="safety-content">
                <h4>Check Product Condition</h4>
                <p>Ask for live video calls or recent dated photos to verify the current condition of used equipment.</p>
              </div>
            </div>
            
            <div className="safety-card">
              <MessageCircle className="safety-icon" size={24} />
              <div className="safety-content">
                <h4>Keep Communication Clear</h4>
                <p>Use WhatsApp for records of negotiation, price agreement, and warranty terms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className={`accordion-header ${openFaqIndex === index ? 'active' : ''}`} 
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <ChevronDown className="accordion-icon" size={20} />
                </button>
                <div className={`accordion-content ${openFaqIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="hiw-cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join Pakistan's fastest-growing medical equipment marketplace today.</p>
          
          <div className="cta-buttons">
            <Link to="/add-listing" className="btn-hiw-primary">
              <Upload size={20} /> Post a Listing
            </Link>
            <Link to="/products" className="btn-hiw-secondary">
              <ShoppingBag size={20} /> Browse Listings
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksPage;
