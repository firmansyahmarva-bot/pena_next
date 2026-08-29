'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFoundTracker() {
  const pathname = usePathname();
  const reportedRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fullPath = window.location.pathname + window.location.search;
    if (reportedRef.current === fullPath) return;
    reportedRef.current = fullPath;

    const payload = {
      path: fullPath,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent || 'unknown',
      timestamp: new Date().toISOString(),
    };

    const payloadStr = JSON.stringify(payload);
    let beaconSent = false;

    // Use sendBeacon; use fetch only if beacon fails or returns false
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      try {
        const blob = new Blob([payloadStr], { type: 'application/json' });
        beaconSent = navigator.sendBeacon('/api/log-404', blob);
      } catch {
        beaconSent = false;
      }
    }

    if (!beaconSent) {
      fetch('/api/log-404', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payloadStr,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
