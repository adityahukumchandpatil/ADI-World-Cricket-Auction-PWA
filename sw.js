const CACHE = 'adi-world-cricket-auction-v1';
const CORE = ['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(r => {
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return r;
  }).catch(()=>caches.match('./index.html'))));
});
