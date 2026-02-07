import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verificationAPI } from '@/services/api';
import VerificationBadge from '@/components/VerificationBadge';
import { useToast } from '@/components/ui/use-toast';

const AdminVerificationDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [adminComment, setAdminComment] = useState('');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = () => {
    setVendors(verificationAPI.getAllVendors());
  };

  const handleStatusUpdate = (status) => {
    if (!selectedVendor) return;
    verificationAPI.updateStatus(selectedVendor.id, status, adminComment);
    toast({ title: `Vendor ${status === 'Verified' ? 'Approved' : 'Rejected'}` });
    setAdminComment('');
    setSelectedVendor(null);
    loadVendors();
  };

  const filteredVendors = vendors.filter(v => {
    const matchesFilter = filter === 'All' || v.verification.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         v.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Admin - Verification Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-olive-800">Verification Requests</h1>
              <p className="text-charcoal-600">Review and verify vendor documents</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-olive-300 rounded-lg focus:ring-2 focus:ring-olive-500 bg-white text-charcoal-900"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Vendors List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-olive-200 overflow-hidden h-[calc(100vh-200px)] overflow-y-auto">
              {filteredVendors.map(vendor => (
                <div
                  key={vendor.id}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`p-4 border-b border-olive-100 cursor-pointer hover:bg-cream-50 transition-colors ${selectedVendor?.id === vendor.id ? 'bg-sage-50 border-l-4 border-l-sage-500' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-charcoal-900">{vendor.name}</h3>
                    <VerificationBadge status={vendor.verification.status} showText={false} />
                  </div>
                  <p className="text-sm text-charcoal-500 truncate">{vendor.email}</p>
                  <div className="mt-2 text-xs text-charcoal-400">
                    {vendor.verification.documents?.length || 0} documents submitted
                  </div>
                </div>
              ))}
              {filteredVendors.length === 0 && (
                <div className="p-8 text-center text-charcoal-500">
                  No vendors found
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-2">
              {selectedVendor ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg border border-olive-200 p-6"
                >
                  <div className="flex justify-between items-start mb-6 border-b border-olive-100 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-1">{selectedVendor.name}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-charcoal-500">{selectedVendor.email}</span>
                        <VerificationBadge status={selectedVendor.verification.status} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-olive-600" /> Submitted Documents
                      </h3>
                      {selectedVendor.verification.documents?.length > 0 ? (
                        <div className="grid gap-3">
                          {selectedVendor.verification.documents.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-olive-100">
                              <span className="font-medium text-charcoal-700">{doc.name}</span>
                              <Button variant="outline" size="sm" onClick={() => window.open(doc.url, '_blank')} className="border-olive-600 text-olive-600 hover:bg-olive-50">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-charcoal-500 italic">No documents submitted yet.</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-olive-600" /> History
                      </h3>
                      <div className="space-y-3 max-h-40 overflow-y-auto">
                        {selectedVendor.verification.history?.map((h, i) => (
                          <div key={i} className="text-sm border-l-2 border-olive-200 pl-3 py-1">
                            <div className="flex justify-between">
                              <span className="font-medium text-charcoal-900">{h.status}</span>
                              <span className="text-charcoal-500">{new Date(h.date).toLocaleDateString()}</span>
                            </div>
                            {h.comment && <p className="text-charcoal-600 mt-1">{h.comment}</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-cream-50 rounded-lg p-4 border border-olive-200">
                      <h3 className="font-semibold text-charcoal-900 mb-3">Admin Action</h3>
                      <textarea
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                        placeholder="Add a comment for the vendor..."
                        className="w-full p-3 border border-olive-300 rounded-lg mb-4 bg-white focus:ring-olive-500"
                        rows="3"
                      />
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleStatusUpdate('Verified')}
                          className="flex-1 bg-gold-500 hover:bg-gold-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Verification
                        </Button>
                        <Button 
                          onClick={() => handleStatusUpdate('Rejected')}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-olive-200 p-8 text-center h-full flex flex-col items-center justify-center text-charcoal-500">
                  <FileText className="w-16 h-16 mb-4 text-charcoal-300" />
                  <p className="text-lg">Select a vendor to review details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminVerificationDashboard;