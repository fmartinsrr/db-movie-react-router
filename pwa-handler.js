// Checks for support
if ('serviceWorker' in navigator) {
  // Register the service worker file
  navigator.serviceWorker.register("./service-worker.js");
}