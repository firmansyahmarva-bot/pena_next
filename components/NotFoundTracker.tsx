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

      const payload = {
        path: fullPath,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent || 'unknown',
        timestamp: new Date().toISOString(),
      };

      // 1. Client-Side Persistent LocalStorage Tracker
      try {
        const stored = localStorage.getItem('pena_404_audit_history');
        const list = stored ? JSON.parse(stored) : [];
        const existing = list.find((item: any) => item.path === fullPath);
        if (existing) {
          existing.hits += 1;
          existing.last_seen = payload.timestamp;
        } else {
          list.unshift({ ...payload, hits: 1 });
        }
        localStorage.setItem('pena_404_audit_history', JSON.stringify(list.slice(0, 100)));
      } catch {
        // ignore
      }

      // 2. Beacon & Fetch Dispatch to Server
      const payloadStr = JSON.stringify(payload);
      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([payloadStr], { type: 'application/json' });
          navigator.sendBeacon('/api/log-404', blob);
        }
      } catch {
        // fallback
      }

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