var C='gastos-v2';
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html','icon-180.png','icon-192.png','manifest.json'])}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
if(e.request.method==='POST'&&new URL(e.request.url).pathname.endsWith('/compartir')){e.respondWith(e.request.formData().then(function(fd){var f=fd.get('foto');return caches.open('compartido').then(function(c){return f?c.put('img-compartida',new Response(f,{headers:{'Content-Type':f.type||'image/jpeg'}})):null}).then(function(){return Response.redirect('./?compartido=1',303)})}));return}
if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html')})}))});
