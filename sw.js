const cName = "player-pwa-v1",
cFiles = [
  "./",
  "./dist/index.html",
  "./dist/main.css",
  "./dist/main.js",
  "./dist/4674f8ded773cb03e824.eot",
  "./dist/5e7382c63da0098d634a.ttf",
  "./dist/83bebaf37c09c7e1c3ee.woff",
  "./dist/cff684e59ffb052d72cb.woff2",
  "./android-chrome-192x192.png",
  "./android-chrome-512x512.png"
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cName);
    await cache.addAll(cFiles);
    console.log('Service worker has been installed');
});

self.addEventListener("fetch", (event) => {
  console.log(`Trying to fetch ${event.request.url}`);
  event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

self.addEventListener('activate', async (event) => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async (key) => {
        if (cName !== key) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});