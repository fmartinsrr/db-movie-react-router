// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;

// By including the favicon we will prevent an error for this asset.
const PRE_CACHED_RESOURCES = [
	"offline.html",
	"offline.css"
];

const CACHE_NAME = "offline_v1";

// This code executes in its own worker or thread
self.addEventListener("install", event => {
	console.log("Service worker installed");
  async function preCacheResources() {
    // Open the app's cache.
    const cache = await caches.open(CACHE_NAME);
    // Cache the new static resources.
    // Use the DevTools to check the cache.
    cache.addAll(PRE_CACHED_RESOURCES);
  }

  // Asks the browser to wait for the task in the promise to resolve (fulfilled or failed)
  // before terminating the service worker process.
  event.waitUntil(preCacheResources());
});

// Use this event to clean up outdated caches.
self.addEventListener("activate", event => {
	console.log("Service worker activated");
  async function deleteOldCaches() {
    // List all caches by their names.
    const names = await caches.keys();
    await Promise.all(names.map(name => {
      if (name !== CACHE_NAME) {
        // If a cache's name is the current name, delete it.
        return caches.delete(name);
      }
    }));
  }

  // Asks the browser to wait for the task in the promise to resolve (fulfilled or failed)
  // before terminating the service worker process.
  event.waitUntil(deleteOldCaches());
});
 
// We don't need to call the fetch.
// By design, without any return the service worker will fallback to the default behaviour.

self.addEventListener("fetch", event => {
	console.log("Service worker fetch - Serving offline page");
  async function navigateOrDisplayOfflinePage() {
    try {
      // Try to load the page from the network.
      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      // The network call failed, the device is offline.
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match("offline.html");
      return cachedResponse;
    }
  }

  // Only call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith(navigateOrDisplayOfflinePage());
  }
});