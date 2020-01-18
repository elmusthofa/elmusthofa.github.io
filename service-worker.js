importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat');
} else {
    console.log('Workbox gagal dimuat');
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './index.html', revision: '1' },
    { url: './detail-team.html', revision: '1' },
    { url: './pages/home.html', revision: '1' },
    { url: './pages/saved.html', revision: '1' },
    { url: './css/materialize.min.css', revision: '1' },
    { url: './js/materialize.min.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/api.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './js/register-sw.js', revision: '1' },
    { url: './images/icon.png', revision: '1' },
    { url: './manifest.json', revision: '1' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-app',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ]
    })
);

self.addEventListener("push", function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: './images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});