'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFoundTracker() {
  const pathname = usePathname();
  const reportedRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullPath = window.location.pathname + window.location.search;
      if (reportedRef.current === fullPath) return;
      reportedRef.current = fullPath;

      const payload = JSON.stringify({
        path: fullPath,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent || 'unknown',
        timestamp: new Date().toISOString(),
      });

      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('/api/log-404', blob);
        }
      } catch (e) {
        // fallback
      }

      // Always also dispatch async fetch to guarantee reception
      fetch('/api/log-404', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}