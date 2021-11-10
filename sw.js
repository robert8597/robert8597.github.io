function getUserMedia(constraints) {
  // if Promise-based API is available, use it
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
    
  // otherwise try falling back to old, possibly prefixed API...
  var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
  if (legacyApi) {
    // ...and promisify it
    return new Promise(function (resolve, reject) {
      legacyApi.bind(navigator)(constraints, resolve, reject);
    });
  }
}

function getStream (type) {
  if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {};
  constraints[type] = true;
  
  getUserMedia(constraints)
    .then(function (stream) {
      var mediaControl = document.querySelector(type);
      
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      
      mediaControl.play();
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });

const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

self.addEventListener("install", installEvent => {
  console.log(installEvent);
  installEvent.waitUntil(
    caches
      .open(staticDevCoffee)
      .then(cache => {
        cache.addAll(assets);
      })
      .catch(console.log)
  );
});

self.addEventListener("fetch", event => {
  // console.log(event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(res => {
        return res || fetch(event.request);
      })
      .catch(console.log)
  );
}
);}
