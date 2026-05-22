const CACHE = 'uy-inv-v2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/uy-inventori/'));
});
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || 'Uy Inventori', {
    body: d.body || '', icon: '/uy-inventori/icon.png', tag: d.tag || 'notif', renotify: true
  }));
});
