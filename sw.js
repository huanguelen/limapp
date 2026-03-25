const CACHE = 'lima-v52';
const STATIC = ['/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()) // take control of all open tabs immediately
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip cross-origin requests — let the browser handle them directly
  if (url.origin !== self.location.origin) return;

  // HTML pages: network only, offline fallback
  if (e.request.mode === 'navigate' ||
      url.pathname === '/' ||
      url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match('/index.html').then(r => r || new Response('Offline', { status: 503 })))
    );
    return;
  }

  // Images/icons: cache first (they don't change often)
  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(
      caches.match(e.request).then(hit => hit ||
        fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
      )
    );
    return;
  }

  // Everything else (same-origin): network first, cache fallback
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .catch(() => caches.match(e.request).then(r => r || new Response('Offline', { status: 503 })))
  );
});

// Tell all open tabs to reload when SW updates
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
