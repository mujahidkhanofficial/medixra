
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import ProductListingPage from '@/pages/ProductListingPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import VendorRegistrationPage from '@/pages/VendorRegistrationPage';
import VendorOnboarding from '@/pages/VendorOnboarding';
import VendorDashboard from '@/pages/VendorDashboard';
import DoctorDashboard from '@/pages/DoctorDashboard';
import BuyerDashboard from '@/pages/BuyerDashboard';
import CategoryManagement from '@/pages/CategoryManagement';
import AdminVerificationDashboard from '@/pages/AdminVerificationDashboard';
import AddListingPage from '@/pages/AddListingPage';
import BrowseSpecialtyPage from '@/pages/BrowseSpecialtyPage';
import BrowseCategoryPage from '@/pages/BrowseCategoryPage';
import ListingDetailPage from '@/pages/ListingDetailPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import VendorRegisterPage from '@/pages/VendorRegisterPage';
import VendorsListPage from '@/pages/VendorsListPage';
import AboutPage from '@/pages/AboutPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ContactPage from '@/pages/ContactPage';
import SafetyCompliancePage from '@/pages/SafetyCompliancePage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <MainNavigation />
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/vendor-registration" element={<VendorRegistrationPage />} />
              <Route path="/add-listing" element={<AddListingPage />} />

              {/* New Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/safety-compliance" element={<SafetyCompliancePage />} />

              {/* Browse Routes */}
              <Route path="/browse-specialty" element={<BrowseSpecialtyPage />} />
              <Route path="/browse-category" element={<BrowseCategoryPage />} />
              <Route path="/listing/:id" element={<ListingDetailPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />

              {/* Vendor Routes */}
              <Route path="/vendor/register" element={<VendorRegisterPage />} />
              <Route path="/vendors" element={<VendorsListPage />} />

              {/* Protected Routes */}
              <Route
                path="/vendor/onboarding"
                element={
                  <ProtectedRoute allowedRoles={['vendor']}>
                    <VendorOnboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['vendor']}>
                    <VendorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute allowedRoles={['vendor']}>
                    <CategoryManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/verification"
                element={
                  <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                    <AdminVerificationDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buyer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <BuyerDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
