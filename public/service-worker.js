// This is the service worker script that will handle push notifications

self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/logo192.png',
    badge: '/logo192.png',
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  // You can define custom behavior when a notification is clicked
  // For example, open a specific URL:
  // clients.openWindow('https://example.com');
});
