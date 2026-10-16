self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'MoDay 提醒', body: '該量體重或喝水囉！' };
  const options = {
    body: data.body,
    icon: '墨鏡鼴鼠活力健身秀.png',
    badge: '墨鏡鼴鼠活力健身秀.png'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./test good - 複製.html'));
});