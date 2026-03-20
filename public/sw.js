const CACHE_NAME = 'sandeli-menu-cache-v2'

const APP_SHELL = [
  '/',
  '/index.html',
  '/assets/logo.png',
  '/assets/logoIOS.png',
  '/assets/brand-board.jpeg',
  '/site.webmanifest',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

const isNavigating = (request) =>
  request.mode === 'navigate' || request.destination === 'document'

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(request.url)
  if (requestUrl.origin !== self.location.origin) {
    return
  }

  // Navigation must prefer network to avoid stale UI after deploys.
  if (isNavigating(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone))
            .catch(() => undefined)

          return networkResponse
        })
        .catch(() =>
          caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse
            return caches.match('/index.html')
          }),
        ),
    )
    return
  }

  // Static files can be cache-first for speed.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((networkResponse) => {
        const responseClone = networkResponse.clone()
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(request, responseClone))
          .catch(() => undefined)

        return networkResponse
      })
    }),
  )
})
