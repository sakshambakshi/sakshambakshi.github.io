const cacheName = "v1"
const cacheAssets = [
    "index.html",
    "about.html",
    "/css/style.css",
    "/js/main.js"
]
self.addEventListener("install" ,  (e)=>{
    // //Call Installed Event
    console.log("SW: Installed")
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
            console.log("Service Worker: Caching Files")
            cache.addAll(cacheAssets)
        })
        .then(()=>{self.skipWaiting()})
    )
})

self.addEventListener("activate" , function(e){
    // //Call Activate Event
    console.log("sw activated")
    // Remove unwanted cache

    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all( cacheNames.map(cache =>{
            
            if(cache != cacheName){
                console.log("Clearing Cache "+cache)
                return caches.delete(cache)
            }
        }))
    )
    )
})

self.addEventListener("fetch" , (evt)=>{
    
    evt.respondWith(fetch(evt.request).catch(()=>{caches.match(evt.request)}))
})






