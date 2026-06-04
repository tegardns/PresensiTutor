const CACHE_NAME = "presensi-tutor-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png"
];

// Install Event - Caching basic resources and skipping wait for instant activation
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event - Cleaning old caches and claiming clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event - Network First for document navigation & APIs, Cache First for static assets
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Network First for document navigation / index.html / APIs
  if (
    event.request.mode === "navigate" ||
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname.includes("/api/")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If valid static response, cache it for offline fallback
          if (response.status === 200 && !url.pathname.includes("/api/")) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First for static assets (js bundles, css, images)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  }
});

// ==========================================
// PUSH NOTIFICATIONS (REAL-TIME STATUS BAR)
// ==========================================

// Push Event - Listen to VAPID push server and display notification in system status bar
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "Notifikasi AISaka", body: event.data.text() };
    }
  }

  const title = data.title || "Notifikasi AISaka";
  const options = {
    body: data.body || "Anda menerima pesan baru.",
    icon: "/pwa-icon-192.png",
    badge: "/pwa-icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Event - Handle taps on status bar notification to focus or open PWA app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const urlToOpen = event.notification.data.url || "/";
      
      // Focus if window is already open
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window otherwise
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
