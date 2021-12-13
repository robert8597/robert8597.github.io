
const serviceworker_version = 7.0


const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    //"/tabelle.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})





const expectedCaches = ["dev-coffee-site-v1"];

self.addEventListener('install', event => {
  console.log('V2 installing…'+"Service worker version="+serviceworker_version);
  caches.delete("dev-coffee-site-v1");
  console.log("old cache deleted");
  // cache a horse SVG into a new cache, static-v2
  caches.open(staticDevCoffee).then(cache => {
    cache.addAll(assets)
})
  
});

self.addEventListener('message', function(event) {
  event.ports[0].postMessage({'test': 'This is my response.'});
});

self.addEventListener('activate', event => {
  console.log("Service worker version="+serviceworker_version);
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the horse SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/horse.svg'));
  }
});


