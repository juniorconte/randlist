var cacheName = 'randlist-v1';
var cacheList = ['./index.html','./images/shuffle-32.png','./images/shuffle-64.png','./images/shuffle-128.png', './images/shuffle-256.png', './scripts/scripts.js', './scripts/vendor.js', './styles/main.css', './styles/vendor.css'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.open(cacheName).then(function (cache) {
      return cache.match(e.request).then(function (matching) {
        return matching || Promise.reject('no-match');
      });
    })
  );
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
     return fetch(e.request).then(function (response) {
       return cache.put(e.request, response);
     });
   })
 );
});
