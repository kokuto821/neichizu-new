/**
 * 地図タイルをキャッシュするためのService Worker
 * このService Workerは、指定されたURL（地理院地図のタイル）からマップタイルをキャッシュし、
 * オフライン時に地図を表示できるようにします。
 */
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('cyberjapandata.gsi.go.jp')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((res) => {
          const cacheRes = res.clone();
          caches
            .open('map-tiles')
            .then((cache) => cache.put(event.request, cacheRes));
          return res;
        });
      })
    );
  }
});
