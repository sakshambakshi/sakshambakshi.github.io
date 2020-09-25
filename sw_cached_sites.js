const cacheName = "v2"

self.addEventListener("install", (e) => {
    // //Call Installed Event
    console.log("SW: Installed")
    // debugger

})

self.addEventListener("activate", function (e) {
    // //Call Activate Event
    console.log("sw activated")
    // Remove unwanted cache
    // debugger
    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {

            if (cache != cacheName) {
                console.log("Clearing Cache " + cache)
                return caches.delete(cache)
            }
        }))
        )
    )
})

self.addEventListener("fetch", (evt) => {
    // debugger
    evt.respondWith(
        fetch(evt.request).then(res => {
            const resClone = res.clone()
            caches
                .open(cacheName)
                .then(cache => {
                    console.log("Service Worker: Caching Response")
                    cache.put(evt.request, resClone)
                })
            return res;   
        })
        .catch((err)=>{
            //If connection drop
            caches.match(evt.request).then(res => res)
        })
    )
})






