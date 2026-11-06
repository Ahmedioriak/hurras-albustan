// حُرّاس البستان — تشغيل بدون إنترنت. الصفحة والإعدادات: الشبكة أولاً (عشان التحديثات توصل فوراً)، والباقي من الكاش.
const V = 'hurras-v1';
const CORE = ['./', './index.html', './firebase-config.js', './manifest.webmanifest',
  './icons/icon-32.png', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-192.png', './icons/icon-maskable-512.png', './lib/peerjs.min.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!same && !fonts) return; // online play traffic (PeerJS, Firebase) goes straight to the network
  const fresh = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/firebase-config.js') || url.pathname.endsWith('/');
  if (fresh) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(V).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(V).then((c) => c.put(req, cp)); }
    return r;
  })));
});
