//First  make sure service worker are supported in the browser
if("serviceWorker" in navigator){
  window.addEventListener("load" , function(){
    navigator
    .serviceWorker
    .register("../sw_cached_sites.js")
    .then(reg => {console.log("sw registered")})
    .catch(err => {console.log("sw error occured")})
  })
}