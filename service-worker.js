
const CACHE_NAME = 'jungle-quest-v5-2';
const ASSETS = [
  '/index.html','/style.css','/app.js','/manifest.webmanifest',
  '/assets/jungle-bg.png',
  '/assets/animals/monkey.svg','/assets/animals/lion.svg','/assets/animals/elephant.svg',
  '/assets/animals/zebra.svg','/assets/animals/parrot.svg','/assets/animals/toucan.svg',
  '/assets/animals/snake.svg','/assets/animals/frog.svg','/assets/animals/hippo.svg',
  '/assets/icons/icon-48.png','/assets/icons/icon-72.png','/assets/icons/icon-96.png',
  '/assets/icons/icon-144.png','/assets/icons/icon-192.png','/assets/icons/icon-256.png','/assets/icons/icon-512.png',
  '/games/banana-count/index.html','/games/banana-count/game.js',
  '/games/memory/index.html','/games/memory/game.js',
  '/games/maze/index.html','/games/puzzle/index.html','/games/hide-seek/index.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(fetchRes => {
      const copy = fetchRes.clone();
      if (e.request.method === 'GET' && fetchRes.status === 200 && fetchRes.type === 'basic') {
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
      }
      return fetchRes;
    }).catch(() => caches.match('/index.html')))
  );
});
