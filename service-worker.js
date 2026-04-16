const CACHE_NAME = "reittherapie-auto-" + new Date().getTime();

const urlsToCache = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // sofort aktiv
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      )
    )
  );
});
