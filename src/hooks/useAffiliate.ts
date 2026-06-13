import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAffiliate() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref') || params.get('affiliate');

    if (ref) {
      // Store affiliate ID in localStorage for 30 days (standard cookie duration)
      const affiliateData = {
        id: ref,
        timestamp: Date.now()
      };
      localStorage.setItem('affiliate_id', JSON.stringify(affiliateData));
      console.log('Affiliate ID captured:', ref);
    }
  }, [location]);

  const getAffiliateId = () => {
    const stored = localStorage.getItem('affiliate_id');
    if (!stored) return null;

    try {
      const data = JSON.parse(stored);
      // Check if it's older than 30 days (30 * 24 * 60 * 60 * 1000)
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp > thirtyDays) {
        localStorage.removeItem('affiliate_id');
        return null;
      }
      return data.id;
    } catch (e) {
      return null;
    }
  };

  return { getAffiliateId };
}
