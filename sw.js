/* ═══════════════════════════════════════════════════════════════
   Speedometer PWA — Service Worker
   © Manik Roy 2026. All Rights Reserved.
   ═══════════════════════════════════════════════════════════════ */

const CACHE_NAME   = 'speedometer-v4';
const FONT_CACHE   = 'speedometer-fonts-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

const FONT_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/',
];

/* ── Install: pre-cache all core assets ──────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: clean up old caches ───────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== FONT_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: network-first for navigation, cache-first for assets */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts — cache first, then network
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // Same-origin assets — cache first, fallback to network
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        }).catch(() => {
          // Offline fallback — serve index.html for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
    return;
  }

  // Everything else — network with fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

/* ── Background sync message handler ────────────────────────── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
