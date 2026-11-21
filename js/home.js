/* =====================================================================
   HOME — the lotus (hero anchor + opening bloom) and the practice petals.
   Loaded on index.html only, before js/maximal.js (which seats Shreya on
   the lotus it builds here: `.mx-lotus__seat`).

   Opening sequence (first visit only, ~5 s, skippable, replayable):
     0.0  dusk: the world is dark, a closed bud rises from the water
     0.5  outer petals unfold → middle ring → front ring; halo + world light up
     2.3  the golden pod opens
     3.3  Shreya appears, seated on the lotus, typing   (event mx:reveal)
     3.9  the lotus glides from centre stage into its hero position
     5.1  nav, copy and the rest of the page arrive    (event mx:intro-done)
   The hero IS the last frame: same lotus element, same Shreya.
   ===================================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = document.querySelector('.mx-lotus');
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ------------------------------------------------ 1. the lotus (SVG) */
  if (stage) {
    var art = stage.querySelector('.mx-lotus__art');
    /* petals: [angle°, length, width, x offset]; base sits at (x, 96) */
    var RINGS = {
      back:  { g: 'lpB', p: [[-84, 190, 92], [-63, 215, 92], [-42, 235, 94], [-21, 250, 96], [0, 258, 98], [21, 250, 96], [42, 235, 94], [63, 215, 92], [84, 190, 92]] },
      mid:   { g: 'lpM', p: [[-72, 160, 84], [-48, 178, 86], [-24, 192, 88], [0, 198, 88], [24, 192, 88], [48, 178, 86], [72, 160, 84]] },
      front: { g: 'lpF', p: [[-102, 150, 70, -6], [-78, 136, 74, -4], [-46, 104, 78, -6], [-22, 40, 62, -12], [22, 40, 62, 12], [46, 104, 78, 6], [78, 136, 74, 4], [102, 150, 70, 6]] }
    };
    var petalPath = 'M0 0C-55 -22 -52 -72 0 -100C52 -72 55 -22 0 0Z';
    var veins = '<path d="M0 -6V-90M0 -14C-14 -32 -16 -54 -8 -80M0 -14C14 -32 16 -54 8 -80" fill="none" stroke="rgba(255,240,200,.55)" stroke-width="1" vector-effect="non-scaling-stroke"/>' +
                '<circle cx="0" cy="-34" r="2.4" fill="#F2C94C"/><circle cx="0" cy="-52" r="2" fill="#F2C94C"/><circle cx="0" cy="-68" r="1.6" fill="#F2C94C"/>';
    function grad(id, a, b, c) {
      return '<linearGradient id="' + id + '" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="' + a + '"/><stop offset=".55" stop-color="' + b + '"/><stop offset="1" stop-color="' + c + '"/></linearGradient>';
    }
    function petalDef(id, g) {
      return '<g id="' + id + '"><path d="' + petalPath + '" fill="url(#' + g + ')" stroke="#2A0A14" stroke-width="2.4" vector-effect="non-scaling-stroke"/>' +
             '<path d="' + petalPath + '" fill="none" stroke="#F2A007" stroke-width="1" vector-effect="non-scaling-stroke" transform="scale(.9)"/>' + veins + '</g>';
    }
    function ring(name) {
      var r = RINGS[name], out = '';
      r.p.forEach(function (p) {
        out += '<g class="lp" data-a="' + p[0] + '" data-l="' + p[1] + '" data-w="' + p[2] + '" data-x="' + (p[3] || 0) + '"><use href="#' + r.g + '-p"/></g>';
      });
      return out;
    }
    var stamens = '';
    for (var i = 0; i < 23; i++) {
      var a = -82 + i * (164 / 22), rad = a * Math.PI / 180, r1 = 42, r2 = 62 + (i % 2) * 8;
      stamens += '<line x1="' + (Math.sin(rad) * r1).toFixed(1) + '" y1="' + (84 - Math.cos(rad) * r1 * .55).toFixed(1) + '" x2="' + (Math.sin(rad) * r2).toFixed(1) + '" y2="' + (84 - Math.cos(rad) * r2 * .62).toFixed(1) + '" stroke="#F2B600" stroke-width="3" stroke-linecap="round"/>' +
                  '<circle cx="' + (Math.sin(rad) * r2).toFixed(1) + '" cy="' + (84 - Math.cos(rad) * r2 * .62).toFixed(1) + '" r="3.6" fill="#FFE88A" stroke="#7A4A00" stroke-width=".8"/>';
    }
    var defs = '<defs>' +
      grad('lpB', '#5E0B32', '#A81F56', '#E27B9F') + grad('lpM', '#8E1450', '#D9467F', '#F7C1D6') + grad('lpF', '#A81A4E', '#EE6390', '#FFE3EA') +
      '<radialGradient id="lpPad" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#2E9A6C"/><stop offset="1" stop-color="#0A4A33"/></radialGradient>' +
      petalDef('lpB-p', 'lpB') + petalDef('lpM-p', 'lpM') + petalDef('lpF-p', 'lpF') + '</defs>';
    var pads =
      '<g class="lp-water">' +
      '<ellipse class="lp-ripple" cx="0" cy="168" rx="250" ry="26" fill="none" stroke="rgba(246,239,221,.28)" stroke-width="1.5"/>' +
      '<ellipse class="lp-ripple r2" cx="0" cy="168" rx="250" ry="26" fill="none" stroke="rgba(246,239,221,.22)" stroke-width="1.5"/>' +
      '<path d="M-20 150C-60 128 -250 126 -290 160C-260 196 -60 196 -20 174L-70 160Z" fill="url(#lpPad)" stroke="#06301F" stroke-width="2"/>' +
      '<path d="M20 150C60 128 250 126 290 160C260 196 60 196 20 174L70 160Z" fill="url(#lpPad)" stroke="#06301F" stroke-width="2"/>' +
      '<path d="M-70 160L-270 158M-70 160L-230 136M-70 160L-230 184M-70 160L-150 130M-70 160L-150 190M70 160L270 158M70 160L230 136M70 160L230 184M70 160L150 130M70 160L150 190" stroke="rgba(127,224,180,.35)" stroke-width="1.2"/>' +
      '</g>';
    var pod = '<g class="lp-pod">' + stamens +
      '<ellipse cx="0" cy="86" rx="66" ry="17" fill="#E5A024" stroke="#2A0A14" stroke-width="2"/>' +
      '<ellipse cx="0" cy="83" rx="50" ry="9" fill="#F7C35B"/>' +
      '<g fill="#8C5A2B"><circle cx="-30" cy="86" r="2.6"/><circle cx="-12" cy="88" r="2.6"/><circle cx="8" cy="88" r="2.6"/><circle cx="26" cy="86" r="2.6"/><circle cx="-20" cy="81" r="2.2"/><circle cx="18" cy="81" r="2.2"/></g></g>';
    var halo = '<svg class="mx-lotus__halo" viewBox="-300 -300 600 600" aria-hidden="true">';
    for (i = 0; i < 48; i++) halo += '<path d="M-5 -120L0 -290L5 -120Z" transform="rotate(' + (i * 7.5) + ')" fill="' + (i % 2 ? '#F2A007' : '#F2E527') + '" opacity="' + (i % 2 ? .55 : .35) + '"/>';
    halo += '<circle r="128" fill="none" stroke="#F2A007" stroke-width="2" stroke-dasharray="2 7"/><circle r="104" fill="rgba(242,160,7,.10)"/></svg>';

    art.innerHTML = halo +
      '<svg class="mx-lotus__back" viewBox="-300 -300 600 500" aria-hidden="true">' + defs + pads +
        '<g class="lp-ring lp-ring--back">' + ring('back') + '</g><g class="lp-ring lp-ring--mid">' + ring('mid') + '</g>' + pod + '</svg>' +
      '<span class="mx-lotus__seat"></span>' +
      '<svg class="mx-lotus__front" viewBox="-300 -300 600 500" aria-hidden="true">' +
        '<g class="lp-ring lp-ring--front">' + ring('front') + '</g></svg>';
    /* the front ring reuses the petal defs from the back svg (same document) */

    var petals = { back: [], mid: [], front: [] };
    ['back', 'mid', 'front'].forEach(function (n) {
      art.querySelectorAll('.lp-ring--' + n + ' .lp').forEach(function (g) {
        petals[n].push({ g: g, a: +g.dataset.a, l: +g.dataset.l, w: +g.dataset.w, x: +g.dataset.x });
      });
    });
    var podEl = art.querySelector('.lp-pod'), haloEl = art.querySelector('.mx-lotus__halo');
    /* f: 0 = closed bud, 1 = open. Petals swing out from near-vertical and grow. */
    var setRing = function (n, f) {
      petals[n].forEach(function (p) {
        var ang = p.a * (.05 + .95 * f), L = p.l * (.56 + .44 * f) / 100, W = p.w * (.62 + .38 * f) / 100;
        p.g.setAttribute('transform', 'translate(' + (p.x * f) + ' 96) rotate(' + ang.toFixed(2) + ') scale(' + W.toFixed(3) + ' ' + L.toFixed(3) + ')');
      });
    };
    var setBloom = function (b, m, fr, pd, h) {
      setRing('back', b); setRing('mid', m); setRing('front', fr);
      podEl.style.opacity = pd; podEl.setAttribute('transform', 'translate(0 ' + ((1 - pd) * 18).toFixed(1) + ') scale(1 ' + (.6 + .4 * pd).toFixed(3) + ')');
      haloEl.style.opacity = h;
    };
    setBloom(1, 1, 1, 1, 1);
  }

  /* ------------------------------------------------ 2. the opening bloom */
  var dusk = null, playing = false;
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function back(t) { var c = 1.25; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }   // a little overshoot, like a petal settling
  function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }

  function retrigger() {               // replay the hero copy's entrance once it's uncovered
    document.querySelectorAll('.hero .lines, .hero .rise, .hero .wipe').forEach(function (el) {
      el.classList.remove('is-in'); void el.offsetWidth;
      requestAnimationFrame(function () { el.classList.add('is-in'); });
    });
  }
  function intro(opts) {
    if (!stage || playing) return;
    playing = true;
    try { localStorage.setItem('kz-lotus-seen', '1'); } catch (_) {}
    window.scrollTo({ top: 0, behavior: "instant" });
    root.classList.add('mx-intro'); root.classList.remove('mx-intro-out');
    if (!dusk) { dusk = document.createElement('div'); dusk.className = 'mx-dusk'; dusk.setAttribute('aria-hidden', 'true'); document.body.appendChild(dusk); }
    var skipBtn = document.querySelector('.mx-skip');
    if (skipBtn) { skipBtn.hidden = false; skipBtn.focus({ preventScroll: true }); }
    document.dispatchEvent(new CustomEvent('mx:intro-start'));

    /* centre stage: same element, moved and enlarged (FLIP back to the hero later) */
    stage.style.transition = 'none'; stage.style.transform = 'none';
    var r = stage.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var k = Math.min(vw * .9 / r.width, vh * .86 / r.height, 1.7);
    var dx = vw / 2 - (r.left + r.width / 2), dy = vh * .5 - (r.top + r.height / 2);
    stage.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) scale(' + k.toFixed(3) + ')';
    var float = stage.querySelector('.mx-lotus__float');

    var t0 = performance.now(), revealed = false, flipped = false, skipAt = -1;
    var T_REVEAL = 3300, T_FLIP = 3900, T_DONE = 5150;
    function frame(now) {
      var t = now - t0;
      if (skipAt >= 0 && t < T_FLIP) { t0 -= (T_FLIP - t); t = T_FLIP; }
      var b = back(seg(t, 500, 2300)), m = back(seg(t, 950, 2750)), f = back(seg(t, 1450, 3150)), pd = ease(seg(t, 2300, 3000));
      setBloom(b, m, f, pd, ease(seg(t, 1300, 3100)));
      var rise = ease(seg(t, 0, 900));
      float.style.opacity = rise; float.style.translate = '0 ' + ((1 - rise) * 46).toFixed(1) + 'px';
      dusk.style.opacity = (1 - ease(seg(t, 700, 3600)) * .9 - (t > T_FLIP ? .1 * seg(t, T_FLIP, T_DONE) : 0)).toFixed(3);
      if (!revealed && t >= T_REVEAL) { revealed = true; document.dispatchEvent(new CustomEvent('mx:reveal')); }
      if (!flipped && t >= T_FLIP) {
        flipped = true;
        var dur = skipAt >= 0 ? 700 : 1250;
        stage.style.transition = 'transform ' + dur + 'ms cubic-bezier(.22,1,.36,1)';
        stage.style.transform = 'none';
        root.classList.add('mx-intro-out');           // nav, copy and page start arriving
        setTimeout(retrigger, skipAt >= 0 ? 150 : 420);
        if (skipAt >= 0) { t0 -= (T_DONE - T_FLIP - dur); }
      }
      if (t >= T_DONE) return finish();
      requestAnimationFrame(frame);
    }
    function finish() {
      setBloom(1, 1, 1, 1, 1); float.style.opacity = ''; float.style.translate = '';
      root.classList.remove('mx-intro', 'mx-intro-out');
      if (dusk) dusk.style.opacity = '0';
      if (skipBtn) skipBtn.hidden = true;
      stage.style.transition = ''; stage.style.transform = '';
      playing = false;
      document.removeEventListener('keydown', onKey);
      document.dispatchEvent(new CustomEvent('mx:intro-done'));
    }
    function onKey(e) { if (e.key === 'Escape') skipAt = 1; }
    document.addEventListener('keydown', onKey);
    if (skipBtn) skipBtn.onclick = function () { skipAt = 1; };
    if (opts && opts.instant) skipAt = 1;
    setBloom(0, 0, 0, 0, 0); float.style.opacity = 0; dusk.style.opacity = 1;
    requestAnimationFrame(frame);
  }

  if (stage) {
    if (root.classList.contains('mx-intro')) {
      if (REDUCED) root.classList.remove('mx-intro');
      else requestAnimationFrame(function () { intro(); });   // after maximal.js has registered its listeners
    }
    document.querySelectorAll('[data-replay-intro]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (REDUCED) { document.dispatchEvent(new CustomEvent('mx:say', { detail: ['hearts', 'Namaste!', 2000] })); return; }
        intro();
      });
    });
  }

  /* ------------------------------------------------ 3. the practice petals
     An accessible tablist; the dial's petals are a pointer shortcut. */
  var pr = document.querySelector('.pr');
  if (pr) {
    var tabs = [].slice.call(pr.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var dial = pr.querySelector('.pr-dial');
    var current = -1;
    var show = function (i, focus, quiet) {
      if (i === current) return;
      current = i;
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) {
        p.hidden = k !== i;
        if (k === i) { p.classList.remove('is-in'); void p.offsetWidth; p.classList.add('is-in'); }
      });
      if (dial) dial.setAttribute('data-active', i);
      pr.setAttribute('data-theme', panels[i].getAttribute('data-theme'));
      if (focus) tabs[i].focus();
      var line = tabs[i].getAttribute('data-shreya');
      if (line && !quiet) document.dispatchEvent(new CustomEvent('mx:say', { detail: line.split('|').concat([2200]) }));
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        if (e.key === 'Home') j = 0; if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); show(j, true); }
      });
    });
    if (dial) dial.querySelectorAll('[data-i]').forEach(function (p) {
      p.addEventListener('click', function () { show(+p.getAttribute('data-i')); });
    });
    pr.querySelectorAll('[data-next-petal]').forEach(function (b) {
      b.addEventListener('click', function () { show((current + 1) % tabs.length, true); });
    });
    show(0, false, true);
  }
})();
