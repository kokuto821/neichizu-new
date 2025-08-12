/**
 * Service Worker for caching map tiles
 * This service worker caches map tiles from the specified URL
 * and serves them from the cache when available.
 */
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('cyberjapandata.gsi.go.jp')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((res) => {
          const cacheRes = res.clone();
          caches.open('map-tiles').then((cache) => cache.put(event.request, cacheRes));
          return res;
        });
      })
    );
  }
});