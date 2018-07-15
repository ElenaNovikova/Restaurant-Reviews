// The recent cache
const recentCache = 'review-cache-v1';
// Assets urls to be cached
const assetsToCache = [
    './',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './css/styles.css',
    './css/responsive.css',
    'index.html',
    'restaurant.html?id=1',
    'restaurant.html?id=2',
    'restaurant.html?id=3',
    'restaurant.html?id=4',
    'restaurant.html?id=5',
    'restaurant.html?id=6',
    'restaurant.html?id=7',
    'restaurant.html?id=8',
    'restaurant.html?id=9',
    'restaurant.html?id=10',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './img/food256.png',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css',
    'https://fonts.googleapis.com/css?family=Ubuntu:500'
];

// Service worker install event and caching while installing
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(recentCache)
            .then( (cache) => {
                return cache.addAll(assetsToCache);
            })
    );
});

// Activating event and deleting older caches during the process
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then( (cacheNames) => {
                return Promise.all(
                    cacheNames.filter(function (cacheName) {
                        return cacheName.startsWith('review-') && cacheName != recentCache;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            })
    );
});

// Fetch event and respond with cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
