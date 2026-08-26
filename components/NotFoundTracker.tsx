'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const missingUrl = pathname || window.location.pathname;
      const payload = JSON.stringify({
        path: missingUrl,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
      });

      // Use non-blocking beacon if available, fallback to fetch
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/log-404', payload);
      } else {
        fetch('/api/log-404', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    }
  }, [pathname]);

  return null;
}