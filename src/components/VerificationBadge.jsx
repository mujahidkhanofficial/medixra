import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const VerificationBadge = ({ status, showText = true, className = "" }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Verified':
        return {
          icon: ShieldCheck,
          text: 'Verified Vendor',
          color: 'text-gold-600',
          bg: 'bg-gold-100',
          border: 'border-gold-200'
        };
      case 'Pending':
        return {
          icon: Clock,
          text: 'Verification Pending',
          color: 'text-sage-600',
          bg: 'bg-sage-100',
          border: 'border-sage-200'
        };
      case 'Rejected':
        return {
          icon: ShieldAlert,
          text: 'Verification Rejected',
          color: 'text-red-600',
          bg: 'bg-red-100',
          border: 'border-red-200'
        };
      default:
        return {
          icon: Shield,
          text: 'Unverified',
          color: 'text-charcoal-500',
          bg: 'bg-charcoal-100',
          border: 'border-charcoal-200'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.bg} ${config.border}`,
        className
      )}
      title={`Vendor Status: ${status}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      {showText && (
        <span className={`text-xs font-medium ${config.color}`}>
          {config.text}
        </span>
      )}
    </div>
  );
};

export default VerificationBadge;