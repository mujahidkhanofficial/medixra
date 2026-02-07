import React from 'react';
import { Factory, Ship, Truck, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

const VendorTypeBadge = ({ type, className = "", showIcon = true, showLabel = true }) => {
  if (!type) return null;

  const getConfig = () => {
    switch (type) {
      case 'Manufacturer':
        return {
          icon: Factory,
          styles: 'bg-gold-50 text-olive-900 border-gold-200 hover:bg-gold-100',
          iconColor: 'text-olive-700'
        };
      case 'Importer':
        return {
          icon: Ship,
          styles: 'bg-olive-50 text-olive-900 border-olive-200 hover:bg-olive-100',
          iconColor: 'text-olive-700'
        };
      case 'Distributor':
        return {
          icon: Truck,
          styles: 'bg-white text-charcoal-700 border-olive-200 hover:bg-cream-50',
          iconColor: 'text-olive-600'
        };
      case 'Service Provider':
        return {
          icon: Wrench,
          styles: 'bg-charcoal-50 text-charcoal-800 border-charcoal-200 hover:bg-charcoal-100',
          iconColor: 'text-charcoal-600'
        };
      default:
        return {
          icon: Factory,
          styles: 'bg-gray-100 text-gray-800 border-gray-200',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors ${config.styles}`,
        className
      )}
      title={`Vendor Type: ${type}`}
    >
      {showIcon && <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />}
      {showLabel && <span>{type}</span>}
    </div>
  );
};

export default VendorTypeBadge;