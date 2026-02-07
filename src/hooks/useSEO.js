
import React from 'react';
import { Helmet } from 'react-helmet';

export const useSEO = ({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  canonicalUrl, 
  ogType = 'website' 
}) => {
  const defaultImage = 'https://images.unsplash.com/photo-1580281657702-257584239a55';
  const siteName = 'Medixra';
  const defaultTitle = 'Medixra – Medical Equipment Marketplace in Pakistan';
  const defaultDescription = 'Pakistan\'s dedicated medical equipment marketplace. Buy and sell new, used and refurbished hospital equipment, instruments and devices.';

  return React.createElement(Helmet, null,
    // Basic Metadata
    React.createElement('title', null, title || defaultTitle),
    React.createElement('meta', { name: 'description', content: description || defaultDescription }),
    canonicalUrl && React.createElement('link', { rel: 'canonical', href: canonicalUrl }),
    
    // Open Graph
    React.createElement('meta', { property: 'og:title', content: ogTitle || title || defaultTitle }),
    React.createElement('meta', { property: 'og:description', content: ogDescription || description || defaultDescription }),
    React.createElement('meta', { property: 'og:image', content: ogImage || defaultImage }),
    React.createElement('meta', { property: 'og:url', content: canonicalUrl || 'https://medixra.com' }),
    React.createElement('meta', { property: 'og:type', content: ogType }),
    React.createElement('meta', { property: 'og:site_name', content: siteName }),
    
    // Twitter Card
    React.createElement('meta', { name: 'twitter:card', content: 'summary_large_image' }),
    React.createElement('meta', { name: 'twitter:title', content: ogTitle || title || defaultTitle }),
    React.createElement('meta', { name: 'twitter:description', content: ogDescription || description || defaultDescription }),
    React.createElement('meta', { name: 'twitter:image', content: ogImage || defaultImage })
  );
};
