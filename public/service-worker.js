// service-worker.js

// Cache name
const CACHE_NAME = 'rising-sun-cache-v1';

// Files to cache
const urlsToCache = [
  // '/',
  // '/index.html',
  // '/service-worker.js'
  // '/styles.css',
  // '/script.js',
  // Add other static assets you want to cache
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch assets from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // If not in cache, fetch from network
        return fetch(event.request);
      })
  );
});
