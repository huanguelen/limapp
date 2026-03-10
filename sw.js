const CACHE = 'lima-v33';
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

  // NEVER cache: HTML pages, Firebase, Google APIs
  if (e.request.mode === 'navigate' ||
      url.pathname === '/' ||
      url.pathname === '/index.html' ||
      url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic') ||
      url.hostname.includes('google-analytics')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Images/icons: cache first (they don't change often)
  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(
      caches.match(e.request).then(hit => hit ||
        fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
      )
    );
    return;
  }

  // Everything else: network first, cache fallback
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
  );
});

// Tell all open tabs to reload when SW updates
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
