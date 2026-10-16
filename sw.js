// 監聽來自伺服器的 Push (推播) 事件
self.addEventListener('push', function(event) {
  // 設定預設的通知內容
  let data = { 
    title: 'MoDay 提醒', 
    body: '有新的提醒通知！', 
    url: 'https://a3335237.github.io/MoDay/' 
  };

  // 如果推播有傳送自訂資料，就解析它
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('推播資料解析失敗', e);
    }
  }

  // 通知卡片的外觀設定
  const options = {
    body: data.body,
    icon: '墨鏡鼴鼠活力健身秀.png', // 手機通知上顯示的小圖示
    badge: '墨鏡鼴鼠活力健身秀.png', // Android 狀態列上的單色小圖示
    vibrate: [200, 100, 200],      // 手機震動節奏
    data: { url: data.url }        // 點擊通知時要讀取的網址資料
  };

  // 喚醒手機並顯示通知
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 監聽使用者點擊通知的事件
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // 點擊後自動關閉通知卡片
  
  // 點擊後打開 MoDay 網頁
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});