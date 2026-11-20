/* MATRiCE 4T · Neoonkontroll — teenusetöötaja: ainult oma failid, kolmandaid osapooli ei puhverdata */
const C="m4t-neoon-2026.11.20-3",FILES=["./","index.html","app.js","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return; /* Open-Meteo läheb otse võrku, mitte puhvrisse */
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==="navigate"?caches.match("index.html"):Response.error())));
});