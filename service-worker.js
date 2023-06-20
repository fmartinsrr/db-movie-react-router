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

self.addEventListener("activate", event => {
	console.log("Service worker activated");
});
 
// We don't need to call the fetch.
// By design, without any return the service worker will fallback to the default behaviour.
self.addEventListener("fetch", event => {
	console.log("Service worker fetch");
});