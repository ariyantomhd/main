import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_NEXT_API_URL || 'https://api.themavia.com';

export default function BlogAdBanner() {
  const [adSettings, setAdSettings] = useState({
    isActive: true,
    htmlContent: '<a href="https://example.com" target="_blank">\n  <img \n    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" \n    alt="Advertisement" \n    className="ad-image"\n  />\n  <div className="ad-overlay">\n    <p>Your Ad Here</p>\n  </div>\n</a>',
    cssContent: '.ad-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  opacity: 0.6;\n}\n.ad-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ad-overlay p {\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #475569;\n}',
    width: '100%',
    height: '120px'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicSettings = async () => {
      try {
        const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
        // Attempt to fetch public settings if it exists, otherwise it might fall back
        const response = await fetch(`${cleanBaseUrl}/api/v1/settings`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.blogAdBanner) {
            setAdSettings((prev) => ({ ...prev, ...data.blogAdBanner }));
          }
        }
      } catch (err) {
        console.warn('Could not fetch public settings for Ad Banner, using default', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublicSettings();
  }, []);

  if (isLoading || !adSettings.isActive) {
    return null; // hide if loading or inactive
  }

  return (
    <div className="w-full my-12 flex flex-col items-center">
      <span className="text-slate-400 text-xs mb-2">- Advertisement -</span>
      <div 
        className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
        style={{ width: adSettings.width || '100%', maxWidth: '896px', height: adSettings.height || '120px' }}
      >
        {/* Inject Custom CSS */}
        {adSettings.cssContent && (
          <style dangerouslySetInnerHTML={{ __html: adSettings.cssContent }} />
        )}
        
        {/* Inject Custom HTML */}
        {adSettings.htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: adSettings.htmlContent }} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
