// This code executes in its own worker or thread
self.addEventListener("install", event => {
	console.log("Service worker installed");
});

self.addEventListener("activate", event => {
	console.log("Service worker activated");
});
 
// We don't need to call the fetch.
// By design, without any return the service worker will fallback to the default behaviour.
self.addEventListener("fetch", event => {
	console.log("Service worker fetch");
});