import React, { useEffect } from 'react';

/**
 * Global Image & Viewport Recovery Manager.
 * 
 * Handles:
 * 1. Tab switching (visibilitychange: hidden -> visible).
 * 2. Long idle sessions (focus & pageshow).
 * 3. Browser Back/Forward navigation with bfcache (pageshow with e.persisted).
 * 4. Stale Vite dynamic chunk import failures after Vercel deployments.
 */
export const ImageRecoveryManager: React.FC = () => {
  useEffect(() => {
    // 1. Image & Viewport Audit Function
    const recoverImagesAndViewport = () => {
      try {
        const images = Array.from(document.images);
        for (const img of images) {
          // If the image is complete but naturalWidth is 0, it lost its decoded backing store
          if (img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:')) {
            const currentSrc = img.src;
            img.src = '';
            img.src = currentSrc;
          } else if (img.complete && img.naturalWidth > 0) {
            // Force browser to re-rasterize GPU backing texture if evicted
            if (typeof img.decode === 'function') {
              img.decode().catch(() => {});
            }
          }
        }

        // Audit any ScrollReveal elements in viewport
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const revealElements = document.querySelectorAll('.scroll-reveal:not(.is-revealed)');
        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight + 80 && rect.bottom >= -80) {
            el.classList.add('is-revealed');
          }
        });

        // Nudge layout so any IntersectionObservers re-evaluate smoothly
        window.dispatchEvent(new Event('resize'));
      } catch {
        // Silently prevent recovery execution errors
      }
    };

    // 2. Visibility Change Handler (Tab Switch / Minimize / Restore)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Give browser compositor a brief frame to resume
        requestAnimationFrame(() => {
          recoverImagesAndViewport();
        });
      }
    };

    // 3. Page Show Handler (Handles bfcache / back-forward navigation)
    const handlePageShow = (_event: PageTransitionEvent) => {
      requestAnimationFrame(() => {
        recoverImagesAndViewport();
      });
    };

    // 4. Focus Handler (Returning to window after long session)
    const handleWindowFocus = () => {
      recoverImagesAndViewport();
    };

    // 5. Global Stale Chunk / Deployment Recovery Listener
    const handleChunkError = (event: ErrorEvent) => {
      const msg = event?.message || '';
      if (
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('error loading dynamically imported module') ||
        msg.includes('Loading chunk') ||
        msg.includes('ChunkLoadError')
      ) {
        const now = Date.now();
        const lastReload = Number(sessionStorage.getItem('msk_chunk_recovery_time') || '0');
        // Prevent infinite reload loops: allow max 1 reload per 30 seconds
        if (now - lastReload > 30000) {
          sessionStorage.setItem('msk_chunk_recovery_time', String(now));
          window.location.reload();
        }
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason?.message || String(event?.reason || '');
      if (
        reason.includes('Failed to fetch dynamically imported module') ||
        reason.includes('error loading dynamically imported module') ||
        reason.includes('Loading chunk') ||
        reason.includes('ChunkLoadError')
      ) {
        const now = Date.now();
        const lastReload = Number(sessionStorage.getItem('msk_chunk_recovery_time') || '0');
        if (now - lastReload > 30000) {
          sessionStorage.setItem('msk_chunk_recovery_time', String(now));
          window.location.reload();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};
