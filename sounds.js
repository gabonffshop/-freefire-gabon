/* =========================================================
   🎧 SONS FREE FIRE & MYTHIQUES  —  GabonFFShop
   =========================================================

   POUR AJOUTER UN SON : copie un bloc { ... }, colle-le à la
   suite dans la liste SOUNDS ci-dessous, puis change :

     name      -> le nom affiché
     file      -> le nom EXACT du fichier audio (mp3, m4a...)
     cover     -> le nom EXACT de l'image de couverture
     category  -> "Mythique", "Free Fire" ... (les filtres se
                  créent tout seuls)
     duration  -> facultatif, ex "0:17" ou "1:03" (sinon elle
                  est lue automatiquement dans le fichier)

   Options facultatives :
     description -> une petite phrase sous le nom
     download    -> false pour cacher le bouton Télécharger
   ========================================================= */

const FF_COVER = "IMG_1733.jpeg";   /* même image pour tous les sons "Free Fire" */

const SOUNDS = [

    {
        name: "Tum Tum Sahur",
        file: "AUDIO-2026-09-27-20-22-59.m4a",
        cover: "IMG_1731.jpeg",
        category: "Mythique",
        duration: "0:17"
    },

    {
        name: "Free Fire Lobby - Original",
        file: "01. Free Fire Lobby - Original.mp3",
        cover: FF_COVER,
        category: "Free Fire",
        duration: "1:03"
    },

    {
        name: "Free Fire Lobby - World Cup I",
        file: "04. Free Fire Lobby - World Cup I.mp3",
        cover: FF_COVER,
        category: "Free Fire",
        duration: "1:10"
    },

    {
        name: "Free Fire - Let the Battle Begin",
        file: "07. Free Fire - Let the Battle Begin.mp3",
        cover: FF_COVER,
        category: "Free Fire",
        duration: "0:24"
    },

    {
        name: "Free Fire - Death Uprising",
        file: "09. Free Fire - Death Uprising.mp3",
        cover: FF_COVER,
        category: "Free Fire",
        duration: "0:33"
    },

    {
        name: "Free Fire - Booyah !",
        file: "08. Free Fire - Booyah!.mp3",
        cover: FF_COVER,
        category: "Free Fire",
        duration: "0:10"
    }

];

/* couleurs par catégorie (facultatif, sinon orange Free Fire) */

const SOUND_ACCENTS = {
    "mythique": "#b46bff",
    "free fire": "#ff7a1a"
};


/* =========================================================
   CODE DU LECTEUR  (pas besoin d'y toucher)
   ========================================================= */

(function () {

    "use strict";

    var listEl = document.getElementById("sound-list");

    if (!listEl) return;   /* la rubrique n'est pas dans la page */

    /* ---------- outils ---------- */

    function $(id) { return document.getElementById(id); }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function norm(s) {
        return String(s).toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function parseDuration(v) {
        if (typeof v === "number") return v;
        if (!v) return 0;
        var p = String(v).split(":").map(Number);
        if (p.some(isNaN)) return 0;
        if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
        if (p.length === 2) return p[0] * 60 + p[1];
        return p[0];
    }

    function fmt(t) {
        if (!isFinite(t) || t < 0) t = 0;
        t = Math.floor(t);
        var m = Math.floor(t / 60), s = t % 60;
        return m + ":" + (s < 10 ? "0" : "") + s;
    }

    function hexToRgb(hex) {
        var m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
        if (!m) return "255,101,0";
        var n = parseInt(m[1], 16);
        return ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255);
    }

    function ext(file) {
        var m = /\.([a-z0-9]+)$/i.exec(file);
        return m ? m[1].toLowerCase() : "mp3";
    }

    function mime(file) {
        var e = ext(file);
        return e === "png" ? "image/png" : e === "webp" ? "image/webp" : "image/jpeg";
    }

    function toast(msg) {
        if (typeof showToast === "function") showToast(msg);
    }

    /* ---------- données ---------- */

    var tracks = SOUNDS.map(function (s, i) {

        var accent = s.accent ||
            SOUND_ACCENTS[norm(s.category || "")] || "#ff6500";

        var base = String(s.name).replace(/[\\\/:*?"<>|]+/g, "").trim() || "son";

        return {
            id: i,
            name: s.name,
            category: s.category || "Sons",
            description: s.description || "",
            secs: parseDuration(s.duration),
            src: encodeURI(s.file),
            cover: s.cover ? encodeURI(s.cover) : "",
            accent: accent,
            rgb: hexToRgb(accent),
            download: s.download !== false,
            dlName: base + "." + ext(s.file)
        };

    });

    /* ---------- état ---------- */

    var audio = new Audio();
    audio.preload = "metadata";

    var current = -1;          /* id du son chargé */
    var query = "";
    var category = "all";
    var queue = tracks.map(function (t) { return t.id; });   /* liste visible */
    var seeking = false;

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) document.documentElement.classList.add("ios");

    /* ---------- éléments ---------- */

    var searchEl = $("sound-search"),
        searchWrap = searchEl ? searchEl.closest(".sound-search") : null,
        clearBtn = $("sound-search-clear"),
        filtersEl = $("sound-filters"),
        countEl = $("sound-count"),
        emptyEl = $("sound-empty"),

        player = $("sound-player"),
        spBg = $("sp-bg"),
        spCover = $("sp-cover"),
        spCoverImg = $("sp-cover-img"),
        spTitle = $("sp-title"),
        spCat = $("sp-cat"),
        spSeek = $("sp-seek"),
        spCur = $("sp-cur"),
        spDur = $("sp-dur"),
        spPlay = $("sp-play"),
        spPrev = $("sp-prev"),
        spNext = $("sp-next"),
        spMin = $("sp-min"),
        spVol = $("sp-vol"),
        spMute = $("sp-mute"),
        spDl = $("sp-dl"),

        mini = $("sound-mini"),
        smOpen = $("sm-open"),
        smCoverImg = $("sm-cover-img"),
        smTitle = $("sm-title"),
        smCat = $("sm-cat"),
        smPlay = $("sm-play"),
        smClose = $("sm-close"),
        smFill = $("sm-line-fill"),

        navSounds = $("nav-sounds");

    /* ---------- rendu de la liste ---------- */

    var ICON_PLAY = '<svg class="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
    var ICON_PAUSE = '<svg class="i-pause" viewBox="0 0 24 24"><rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/></svg>';
    var ICON_DL = '<svg viewBox="0 0 24 24"><path d="M12 4v11"/><path d="m7.5 11 4.5 4.5 4.5-4.5"/><path d="M5 19.5h14"/></svg>';

    function cardHTML(t, n) {

        var dl = t.download
            ? '<a class="sound-btn sound-dl" href="' + t.src + '" download="' + esc(t.dlName) + '">' +
              ICON_DL + '<span>Télécharger</span></a>'
            : "";

        return '' +
        '<article class="sound-card" data-id="' + t.id + '" style="--accent:' + t.accent +
            ';--accent-rgb:' + t.rgb + ';--i:' + n + '">' +

            '<div class="sound-cover" data-play="' + t.id + '">' +
                (t.cover ? '<img src="' + t.cover + '" alt="" loading="lazy">' : "") +
                '<span class="sound-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
            '</div>' +

            '<div class="sound-head">' +
                '<div class="sound-top">' +
                    '<span class="sound-cat">' + esc(t.category) + '</span>' +
                    '<span class="sound-len">' + fmt(t.secs) + '</span>' +
                '</div>' +
                '<h3 class="sound-name">' + esc(t.name) + '</h3>' +
                (t.description ? '<p class="sound-desc">' + esc(t.description) + '</p>' : "") +
            '</div>' +

            '<div class="sound-progress">' +
                '<div class="sound-bar"><span class="sound-bar-fill"></span></div>' +
                '<div class="sound-times">' +
                    '<span class="t-cur">0:00</span>' +
                    '<span class="t-rem">-' + fmt(t.secs) + '</span>' +
                '</div>' +
            '</div>' +

            '<div class="sound-actions' + (t.download ? "" : " single") + '">' +
                '<button class="sound-btn sound-play" type="button" data-play="' + t.id + '">' +
                    ICON_PLAY + ICON_PAUSE +
                    '<span class="l-play">Écouter</span><span class="l-pause">Pause</span>' +
                '</button>' +
                dl +
            '</div>' +

        '</article>';
    }

    function visibleTracks() {
        var q = norm(query.trim());
        return tracks.filter(function (t) {
            var okCat = category === "all" || norm(t.category) === category;
            var okQ = !q || norm(t.name).indexOf(q) !== -1 ||
                norm(t.category).indexOf(q) !== -1;
            return okCat && okQ;
        });
    }

    function renderList() {

        var vis = visibleTracks();

        queue = vis.map(function (t) { return t.id; });

        listEl.innerHTML = vis.map(cardHTML).join("");

        countEl.textContent = vis.length + (vis.length > 1 ? " sons" : " son");

        emptyEl.classList.toggle("show", vis.length === 0);

        paint();
    }

    function renderFilters() {

        var cats = [];

        tracks.forEach(function (t) {
            var k = norm(t.category);
            if (!cats.some(function (c) { return c.key === k; })) {
                cats.push({ key: k, label: t.category });
            }
        });

        if (cats.length < 2) {
            filtersEl.style.display = "none";
            return;
        }

        filtersEl.innerHTML =
            '<button type="button" class="sound-chip active" data-cat="all">Tous</button>' +
            cats.map(function (c) {
                return '<button type="button" class="sound-chip" data-cat="' +
                    esc(c.key) + '">' + esc(c.label) + '</button>';
            }).join("");
    }

    /* ---------- affichage de l'état (cartes + lecteurs) ---------- */

    function curTrack() { return current > -1 ? tracks[current] : null; }

    function duration() {
        var t = curTrack();
        if (isFinite(audio.duration) && audio.duration > 0) return audio.duration;
        return t ? t.secs : 0;
    }

    function setRange(el, ratio) {
        var pct = Math.max(0, Math.min(1, ratio || 0)) * 100;
        el.style.setProperty("--p", pct + "%");
    }

    function paint() {

        var playing = !audio.paused && !audio.ended && current > -1;

        var cards = listEl.querySelectorAll(".sound-card");

        Array.prototype.forEach.call(cards, function (card) {

            var id = Number(card.getAttribute("data-id"));
            var on = id === current;

            card.classList.toggle("active", on);
            card.classList.toggle("playing", on && playing);

            var t = tracks[id];
            var cur = on ? audio.currentTime : 0;
            var dur = on ? duration() : t.secs;

            card.querySelector(".sound-bar-fill").style.width =
                (dur ? Math.min(100, cur / dur * 100) : 0) + "%";

            card.querySelector(".t-cur").textContent = fmt(cur);
            card.querySelector(".t-rem").textContent = "-" + fmt(Math.max(0, dur - cur));
            card.querySelector(".sound-len").textContent = fmt(dur);

        });

        player.classList.toggle("playing", playing);
        mini.classList.toggle("playing", playing);

        if (navSounds) navSounds.classList.toggle("now-playing", playing);

        if (spMute) {
            spMute.parentNode.classList.toggle("muted", audio.muted || audio.volume === 0);
        }
    }

    function paintProgress() {

        var dur = duration();
        var cur = audio.currentTime || 0;
        var ratio = dur ? cur / dur : 0;

        if (!seeking) {
            spSeek.value = Math.round(ratio * 1000);
            setRange(spSeek, ratio);
            spCur.textContent = fmt(cur);
        }

        spDur.textContent = fmt(dur);
        smFill.style.width = (ratio * 100) + "%";

        var card = listEl.querySelector('.sound-card[data-id="' + current + '"]');

        if (card) {
            card.querySelector(".sound-bar-fill").style.width = (ratio * 100) + "%";
            card.querySelector(".t-cur").textContent = fmt(cur);
            card.querySelector(".t-rem").textContent = "-" + fmt(Math.max(0, dur - cur));
        }
    }

    function setCoverImg(img, wrap, src) {

        wrap.classList.remove("no-cover");

        if (!src) {
            img.removeAttribute("src");
            wrap.classList.add("no-cover");
            return;
        }

        img.onerror = function () { wrap.classList.add("no-cover"); };
        img.src = src;
    }

    function showTrack(t) {

        var accent = t.accent, rgb = t.rgb;

        [player, mini].forEach(function (el) {
            el.style.setProperty("--accent", accent);
            el.style.setProperty("--accent-rgb", rgb);
        });

        spTitle.textContent = t.name;
        spCat.textContent = t.category;
        smTitle.textContent = t.name;
        smCat.textContent = t.category;

        setCoverImg(spCoverImg, spCover, t.cover);
        setCoverImg(smCoverImg, smCoverImg.parentNode, t.cover);

        spBg.style.backgroundImage = t.cover ? 'url("' + t.cover + '")' : "none";

        if (t.download) {
            spDl.classList.remove("hidden");
            spDl.href = t.src;
            spDl.setAttribute("download", t.dlName);
        } else {
            spDl.classList.add("hidden");
        }

        spDur.textContent = fmt(t.secs);
        spCur.textContent = "0:00";
        spSeek.value = 0;
        setRange(spSeek, 0);
        smFill.style.width = "0%";

        setMediaSession(t);
    }

    /* ---------- lecture ---------- */

    function load(id) {

        var t = tracks[id];
        if (!t) return false;

        current = id;

        audio.src = t.src;
        audio.load();

        showTrack(t);
        document.body.classList.add("player-on");
        mini.classList.add("show");

        return true;
    }

    function play() {

        var p = audio.play();

        if (p && typeof p.catch === "function") {
            p.catch(function (err) {
                if (err && err.name === "AbortError") return;
                toast("Lecture impossible (fichier introuvable ?)");
                paint();
            });
        }
    }

    function togglePlay() {
        if (current === -1) return;
        if (audio.paused) play(); else audio.pause();
    }

    function playTrack(id, openFull) {

        if (id === current) {

            if (audio.paused) {
                play();
                if (openFull) openPlayer();
            } else {
                audio.pause();
            }

            return;
        }

        if (!load(id)) return;

        play();

        if (openFull) openPlayer();
    }

    function neighbor(dir) {

        var list = queue.length ? queue :
            tracks.map(function (t) { return t.id; });

        var i = list.indexOf(current);

        if (i === -1) i = dir > 0 ? -1 : 0;

        return list[(i + dir + list.length) % list.length];
    }

    function next() {
        var id = neighbor(1);
        if (id === current && audio.paused === false) { audio.currentTime = 0; return; }
        load(id); play();
    }

    function prev() {
        if (audio.currentTime > 3) { audio.currentTime = 0; return; }
        load(neighbor(-1)); play();
    }

    function stopAll() {

        audio.pause();
        audio.removeAttribute("src");
        audio.load();

        current = -1;

        mini.classList.remove("show");
        document.body.classList.remove("player-on");

        closePlayer();
        paint();

        if ("mediaSession" in navigator) {
            try { navigator.mediaSession.metadata = null; } catch (e) { }
        }
    }

    /* ---------- lecteur plein écran ---------- */

    function openPlayer() {
        if (current === -1) return;
        player.classList.add("open");
        player.setAttribute("aria-hidden", "false");
        document.body.classList.add("sp-open");
    }

    function closePlayer() {
        player.classList.remove("open");
        player.setAttribute("aria-hidden", "true");
        document.body.classList.remove("sp-open");
    }

    /* ---------- écran de verrouillage / notifications ---------- */

    function setMediaSession(t) {

        if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;

        try {

            var art = t.cover
                ? [{ src: new URL(t.cover, location.href).href, sizes: "512x512", type: mime(t.cover) }]
                : [];

            navigator.mediaSession.metadata = new MediaMetadata({
                title: t.name,
                artist: t.category,
                album: "Free Fire Store Gabon",
                artwork: art
            });

        } catch (e) { }
    }

    function initMediaSession() {

        if (!("mediaSession" in navigator)) return;

        function set(action, fn) {
            try { navigator.mediaSession.setActionHandler(action, fn); } catch (e) { }
        }

        set("play", function () { play(); });
        set("pause", function () { audio.pause(); });
        set("previoustrack", prev);
        set("nexttrack", next);
        set("seekto", function (d) {
            if (d && typeof d.seekTime === "number") audio.currentTime = d.seekTime;
        });
    }

    /* ---------- événements audio ---------- */

    audio.addEventListener("play", paint);
    audio.addEventListener("playing", paint);
    audio.addEventListener("pause", paint);

    audio.addEventListener("timeupdate", paintProgress);

    audio.addEventListener("loadedmetadata", function () {

        var t = curTrack();

        if (t && isFinite(audio.duration) && audio.duration > 0) {
            t.secs = Math.round(audio.duration);
        }

        paint();
        paintProgress();
    });

    audio.addEventListener("ended", function () {

        if (queue.length > 1) {
            next();
        } else {
            audio.currentTime = 0;
            paint();
            paintProgress();
        }
    });

    audio.addEventListener("error", function () {

        if (current === -1) return;

        toast("Impossible de lire ce son (fichier introuvable ?)");
        paint();
    });

    audio.addEventListener("volumechange", function () {

        if (!spVol) return;

        var v = audio.muted ? 0 : audio.volume;

        spVol.value = Math.round(v * 100);
        setRange(spVol, v);

        paint();
    });

    /* ---------- interactions ---------- */

    /* liste : écouter / pause / clic sur la couverture / barre */

    listEl.addEventListener("click", function (e) {

        var trigger = e.target.closest("[data-play]");

        if (trigger) {
            playTrack(Number(trigger.getAttribute("data-play")), true);
            return;
        }

        var bar = e.target.closest(".sound-bar");

        if (bar) {

            var card = bar.closest(".sound-card");

            if (Number(card.getAttribute("data-id")) !== current) return;

            var rect = bar.getBoundingClientRect();
            var ratio = (e.clientX - rect.left) / rect.width;

            if (duration()) audio.currentTime = Math.max(0, Math.min(1, ratio)) * duration();
        }
    });

    /* couvertures cassées -> petit fond avec 🎧 */

    listEl.addEventListener("error", function (e) {

        if (e.target.tagName === "IMG") {
            e.target.closest(".sound-cover").classList.add("no-cover");
            e.target.remove();
        }

    }, true);

    /* recherche */

    if (searchEl) {

        searchEl.addEventListener("input", function () {
            query = searchEl.value;
            searchWrap.classList.toggle("has-text", !!query);
            renderList();
        });

        clearBtn.addEventListener("click", function () {
            searchEl.value = "";
            query = "";
            searchWrap.classList.remove("has-text");
            renderList();
            searchEl.focus();
        });
    }

    /* filtres */

    filtersEl.addEventListener("click", function (e) {

        var chip = e.target.closest(".sound-chip");
        if (!chip) return;

        category = chip.getAttribute("data-cat");

        Array.prototype.forEach.call(
            filtersEl.querySelectorAll(".sound-chip"),
            function (c) { c.classList.toggle("active", c === chip); }
        );

        renderList();
    });

    /* lecteur plein écran */

    spPlay.addEventListener("click", togglePlay);
    spPrev.addEventListener("click", prev);
    spNext.addEventListener("click", next);
    spMin.addEventListener("click", closePlayer);

    smPlay.addEventListener("click", togglePlay);
    smOpen.addEventListener("click", openPlayer);
    smClose.addEventListener("click", stopAll);

    spSeek.addEventListener("input", function () {

        seeking = true;

        var ratio = spSeek.value / 1000;

        setRange(spSeek, ratio);
        spCur.textContent = fmt(ratio * duration());
    });

    spSeek.addEventListener("change", function () {

        if (duration()) audio.currentTime = (spSeek.value / 1000) * duration();

        seeking = false;
    });

    if (spVol) {

        spVol.addEventListener("input", function () {

            var v = spVol.value / 100;

            audio.muted = false;
            audio.volume = v;

            setRange(spVol, v);
        });

        setRange(spVol, 1);
    }

    if (spMute) {

        spMute.addEventListener("click", function () {
            audio.muted = !audio.muted;
        });
    }

    /* touche Échap : réduit le lecteur */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && player.classList.contains("open")) closePlayer();
    });

    /* ---------- démarrage ---------- */

    initMediaSession();
    renderFilters();
    renderList();

})();
