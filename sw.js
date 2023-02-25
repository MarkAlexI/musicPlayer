const cName = "player-pwa",
cFiles = [
  "./dist/index.html",
  "./dist/main.css",
  "./dist/main.js",
  "./dist/4674f8ded773cb03e824.eot",
  "./dist/5e7382c63da0098d634a.ttf",
  "./dist/83bebaf37c09c7e1c3ee.woff",
  "./dist/cff684e59ffb052d72cb.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cName)
    .then((cache) => {
      return cache.addAll(cFiles);
    })
    .catch((err) => {
      console.error(err);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((res) => {
      return res || fetch(event.request);
    })
  );
});
