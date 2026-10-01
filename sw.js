/* Service worker : réseau d'abord, pour que tes mises à jour s'affichent toujours */

const CACHE = "ff-store-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {

    const req = event.request;

    if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

    // on ne met pas en cache les vidéos et les sons (trop lourds)
    if (/\.(mp4|mp3|m4a|ogg|wav)$/i.test(req.url)) return;

    event.respondWith(
        fetch(req)
            .then(res => {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put(req, copy));
                return res;
            })
            .catch(() => caches.match(req))
    );
});
