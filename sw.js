/* MATRiCE 4T · Neoonkontroll — teenusetöötaja.
   Võrk enne, puhver varuks: uus versioon jõuab kohe kohale, ilma võrguta töötab viimane laaditud versioon.
   Ainult oma failid; kolmandaid osapooli (Open-Meteo) ei puhverdata. */
const C="m4t-neoon-2026.11.21-9",FILES=["./","index.html","zones.js","app.js","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))));
});
