/* =====================================================================
   MAXIMAL WORLD + SHREYA — shared by every page with <body class="mx">.
   Builds its own markup (SVG symbols, the world layer, the rug and
   Shreya), so a page only needs css/maximal.css, this file, and any
   torans / friezes it wants between sections:
     <div class="mx-toran" aria-hidden="true"><div class="mx-toran__rope" data-ledge></div></div>
     <div class="mx-frieze" aria-hidden="true" data-ledge><div class="mx-frieze__run"></div></div>
   Give Shreya a line when something scrolls into view with
     data-shreya-says="hearts|My favourites"
   (kinds: type, think, hearts, surprised, headphones, thumbs).
   ===================================================================== */
(function () {
  'use strict';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqMobile = window.matchMedia('(max-width: 767px)');
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  /* ------------------------------------------------ 0. markup
     Symbols + world go first in <body> (behind everything); the rug and
     Shreya go last (above content, below the nav). */
  var MARKUP = {
 "defs": "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\" focusable=\"false\"><defs><symbol id=\"mx-mari\" viewBox=\"-10 -10 20 20\"><g fill=\"#E46A0C\" stroke=\"#7A3300\" stroke-width=\".35\"><circle cx=\"0\" cy=\"-6.3\" r=\"3\"/><circle cx=\"3.15\" cy=\"-5.46\" r=\"3\"/><circle cx=\"5.46\" cy=\"-3.15\" r=\"3\"/><circle cx=\"6.3\" cy=\"0\" r=\"3\"/><circle cx=\"5.46\" cy=\"3.15\" r=\"3\"/><circle cx=\"3.15\" cy=\"5.46\" r=\"3\"/><circle cx=\"0\" cy=\"6.3\" r=\"3\"/><circle cx=\"-3.15\" cy=\"5.46\" r=\"3\"/><circle cx=\"-5.46\" cy=\"3.15\" r=\"3\"/><circle cx=\"-6.3\" cy=\"0\" r=\"3\"/><circle cx=\"-5.46\" cy=\"-3.15\" r=\"3\"/><circle cx=\"-3.15\" cy=\"-5.46\" r=\"3\"/></g><g fill=\"#F7A21B\" stroke=\"#9A4A00\" stroke-width=\".3\"><circle cx=\"0\" cy=\"-3.5\" r=\"2.5\"/><circle cx=\"3.03\" cy=\"-1.75\" r=\"2.5\"/><circle cx=\"3.03\" cy=\"1.75\" r=\"2.5\"/><circle cx=\"0\" cy=\"3.5\" r=\"2.5\"/><circle cx=\"-3.03\" cy=\"1.75\" r=\"2.5\"/><circle cx=\"-3.03\" cy=\"-1.75\" r=\"2.5\"/></g><circle r=\"2.3\" fill=\"#FFC93C\" stroke=\"#9A4A00\" stroke-width=\".3\"/></symbol><symbol id=\"mx-mari-y\" viewBox=\"-10 -10 20 20\"><g fill=\"#F2B600\" stroke=\"#7A5200\" stroke-width=\".35\"><circle cx=\"0\" cy=\"-6.3\" r=\"3\"/><circle cx=\"3.15\" cy=\"-5.46\" r=\"3\"/><circle cx=\"5.46\" cy=\"-3.15\" r=\"3\"/><circle cx=\"6.3\" cy=\"0\" r=\"3\"/><circle cx=\"5.46\" cy=\"3.15\" r=\"3\"/><circle cx=\"3.15\" cy=\"5.46\" r=\"3\"/><circle cx=\"0\" cy=\"6.3\" r=\"3\"/><circle cx=\"-3.15\" cy=\"5.46\" r=\"3\"/><circle cx=\"-5.46\" cy=\"3.15\" r=\"3\"/><circle cx=\"-6.3\" cy=\"0\" r=\"3\"/><circle cx=\"-5.46\" cy=\"-3.15\" r=\"3\"/><circle cx=\"-3.15\" cy=\"-5.46\" r=\"3\"/></g><g fill=\"#FFD84D\" stroke=\"#9A6A00\" stroke-width=\".3\"><circle cx=\"0\" cy=\"-3.5\" r=\"2.5\"/><circle cx=\"3.03\" cy=\"-1.75\" r=\"2.5\"/><circle cx=\"3.03\" cy=\"1.75\" r=\"2.5\"/><circle cx=\"0\" cy=\"3.5\" r=\"2.5\"/><circle cx=\"-3.03\" cy=\"1.75\" r=\"2.5\"/><circle cx=\"-3.03\" cy=\"-1.75\" r=\"2.5\"/></g><circle r=\"2.3\" fill=\"#FFF0A8\" stroke=\"#9A6A00\" stroke-width=\".3\"/></symbol><symbol id=\"mx-leaf\" viewBox=\"0 0 16 34\"><path d=\"M8 0 C15 8 15 22 8 34 C1 22 1 8 8 0Z\" fill=\"#167A55\" stroke=\"#08402C\" stroke-width=\".8\"/><path d=\"M8 2 V31\" stroke=\"#0A4A33\" stroke-width=\".8\"/></symbol><symbol id=\"mx-petal\" viewBox=\"0 0 10 16\"><path d=\"M5 0 C10 4 10 11 5 16 C0 11 0 4 5 0Z\" fill=\"currentColor\" stroke=\"rgba(0,0,0,.35)\" stroke-width=\".5\"/></symbol></defs></svg>",
 "world": "<div class=\"mx-world\" aria-hidden=\"true\"><div class=\"mx-paisley\"><div class=\"mx-paisley__tile\"></div></div><div class=\"mx-glow\"></div><div class=\"mx-kite\"><svg viewBox=\"0 0 80 120\"><path d=\"M40 4 L70 40 L40 82 L10 40Z\" fill=\"#C2187A\" stroke=\"#141210\" stroke-width=\"1.6\"/><path d=\"M40 4 L70 40 L40 40Z\" fill=\"#F2A007\"/><path d=\"M10 40 L40 40 L40 82Z\" fill=\"#1F4FA8\"/><path d=\"M40 4 V82 M10 40 H70\" stroke=\"#141210\" stroke-width=\"1.2\"/><path d=\"M40 82 l-7 10 h14z\" fill=\"#D92B1C\" stroke=\"#141210\" stroke-width=\"1\"/><path d=\"M40 92 C 30 102 46 108 34 118 S 10 150 -40 170\" fill=\"none\" stroke=\"#F6EFDD\" stroke-width=\"1\" opacity=\".85\"/></svg></div><div class=\"mx-vignette\"></div></div>",
 "rug": "<div class=\"mx-rug\" aria-hidden=\"true\"><svg viewBox=\"0 0 60 18\"><path d=\"M3 4 H57 L55 14 H5Z\" fill=\"#B3122E\" stroke=\"#141210\" stroke-width=\"1.2\"/><path d=\"M8 6.5 H52 L51 11.5 H9Z\" fill=\"none\" stroke=\"#F2A007\" stroke-width=\"1.2\"/><path d=\"M15 9 l3-2.2 3 2.2-3 2.2z M27 9 l3-2.2 3 2.2-3 2.2z M39 9 l3-2.2 3 2.2-3 2.2z\" fill=\"#1F4FA8\"/><path d=\"M5 14 v3 M9 14 v3 M13 14 v3 M17 14 v3 M21 14 v3 M25 14 v3 M29 14 v3 M33 14 v3 M37 14 v3 M41 14 v3 M45 14 v3 M49 14 v3 M53 14 v3\" stroke=\"#F6EFDD\" stroke-width=\"1\"/></svg></div>",
 "shreya": "<div class=\"mx-shreya\" aria-hidden=\"false\"><canvas class=\"mx-shreya__cv\" aria-hidden=\"true\"></canvas><button class=\"mx-shreya__btn\" type=\"button\" aria-label=\"Shreya, the little guide of this site. Press to say hello.\"></button><div class=\"mx-shreya__bubble\" aria-hidden=\"true\"><canvas width=\"144\" height=\"144\"></canvas><span class=\"mx-shreya__say\"></span></div></div>"
};
  if (!document.querySelector('.mx-world')) {
    document.body.insertAdjacentHTML('afterbegin', MARKUP.defs + MARKUP.world);
    document.body.insertAdjacentHTML('beforeend', MARKUP.rug + MARKUP.shreya);
  }
  var world = document.querySelector('.mx-world');
  var kite = document.querySelector('.mx-kite');
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var PAL = ['#D92B1C', '#F2A007', '#0F6B4F', '#1F4FA8', '#C2187A', '#F6EFDD', '#8C5A2B'];

  /* ------------------------------------------------ 1. the drawn world
     The collage that was attached as a design reference is no longer
     rendered anywhere (it used to appear as torn cut-outs and as the
     elephant frieze). Everything left is drawn: paisley texture,
     rangoli medallions, marigolds, kite.
     fx/fy = place in a virtual field 1.8 viewports tall; d = parallax
     depth; m = also shown on mobile. */
  var MEDS = [
    { fx: .14, fy: .28, s: 380, d: .12, t: 160, o: .55, m: 1 },
    { fx: .84, fy: .56, s: 460, d: .10, t: 210, o: .5, rev: 1 },
    { fx: .47, fy: .96, s: 300, d: .16, t: 130, o: .55, m: 1 },
    { fx: .60, fy: .12, s: 220, d: .20, t: 110, o: .6, rev: 1, m: 1 },
    { fx: .92, fy: .18, s: 180, d: .26, t: 90,  o: .55 },
    { fx: .06, fy: .70, s: 240, d: .22, t: 120, o: .5, rev: 1 },
    { fx: .30, fy: .48, s: 140, d: .30, t: 80,  o: .45, m: 1 }
  ];

  var mobile = mqMobile.matches;
  var scale = mobile ? .62 : 1;
  var placed = [];          // everything that parallaxes: {el, fx, fy, w, h, d}

  function rangoli(seed) {
    var c = function (i) { return PAL[(seed + i) % 6]; };
    var g = '', i, a;
    for (i = 0; i < 24; i++) { a = i * 15; g += '<ellipse cx="0" cy="-82" rx="7" ry="15" transform="rotate(' + a + ')" fill="' + c(0) + '" stroke="#2a0a10" stroke-width="1"/>'; }
    for (i = 0; i < 32; i++) { a = i * 11.25; g += '<circle cx="0" cy="-64" r="2.6" transform="rotate(' + a + ')" fill="' + c(5) + '"/>'; }
    for (i = 0; i < 16; i++) { a = i * 22.5; g += '<path d="M0 -58 C8 -48 8 -40 0 -32 C-8 -40 -8 -48 0 -58Z" transform="rotate(' + a + ')" fill="' + c(1) + '" stroke="#2a0a10" stroke-width="1"/>'; }
    for (i = 0; i < 12; i++) { a = i * 30; g += '<path d="M0 -30 L6 -22 L0 -14 L-6 -22Z" transform="rotate(' + a + ')" fill="' + c(2) + '"/>'; }
    g += '<circle r="12" fill="' + c(3) + '" stroke="' + c(5) + '" stroke-width="3"/><circle r="4" fill="' + c(1) + '"/>';
    return '<svg viewBox="-100 -100 200 200"><circle r="96" fill="none" stroke="' + c(4) + '" stroke-width="2" stroke-dasharray="2 5"/>' + g + '</svg>';
  }

  function buildWorld() {
    var frag = document.createDocumentFragment();
    MEDS.forEach(function (m, k) {
      if (mobile && !m.m) return;
      var s = m.s * scale, el = document.createElement('div');
      el.className = 'mx-med' + (m.rev ? ' rev' : '');
      el.style.cssText = 'width:' + s + 'px;height:' + s + 'px;opacity:' + m.o + ';--d:' + m.t + 's';
      el.innerHTML = rangoli(k * 2);
      frag.appendChild(el);
      placed.push({ el: el, fx: m.fx, fy: m.fy, w: s, h: s, d: m.d });
    });
    var n = mobile ? 7 : 15;
    for (var i = 0; i < n; i++) {
      var flower = i % 3 !== 2, el = document.createElement('div'), sz = flower ? rand(18, 34) : rand(10, 16);
      el.className = 'mx-fall';
      el.style.cssText = '--x:' + rand(0, 100).toFixed(1) + '%;--s:' + sz.toFixed(0) + 'px;--d:' + rand(18, 32).toFixed(1) + 's;--dl:-' + rand(0, 32).toFixed(1) + 's;--sw:' + rand(20, 70).toFixed(0) + 'px;--sd:' + rand(6, 14).toFixed(1) + 's;color:' + ['#D92B1C', '#C2187A', '#F2A007'][i % 3];
      el.innerHTML = '<svg viewBox="' + (flower ? '-10 -10 20 20' : '0 0 10 16') + '"><use href="#' + (flower ? (i % 2 ? 'mx-mari' : 'mx-mari-y') : 'mx-petal') + '"/></svg>';
      frag.appendChild(el);
    }
    world.insertBefore(frag, kite);
  }

  /* toran strings: alternate long and short so the hem scallops */
  function buildTorans() {
    document.querySelectorAll('.mx-toran').forEach(function (t) {
      t.querySelectorAll('.mx-toran__str, .mx-toran__leaf').forEach(function (e) { e.remove(); });
      var W = t.clientWidth, gap = mobile ? 40 : 52, n = Math.ceil(W / gap) + 1, html = '';
      for (var i = 0; i < n; i++) {
        var x = i * gap - 11, beads = (i % 2 ? 3 : 5) - (mobile ? 1 : 0), H = beads * 17 + 40, svg = '';
        svg += '<path d="M11 0 V' + (beads * 17 + 4) + '" stroke="#6B1D1D" stroke-width="1"/>';
        for (var b = 0; b < beads; b++) svg += '<use href="#' + ((b + i) % 3 ? 'mx-mari' : 'mx-mari-y') + '" x="1" y="' + (2 + b * 17) + '" width="20" height="20"/>';
        svg += '<use href="#mx-leaf" x="4" y="' + (beads * 17 + 4) + '" width="14" height="30"/>';
        html += '<div class="mx-toran__str" style="left:' + x + 'px;--d:' + rand(3.2, 5.2).toFixed(2) + 's;--dl:-' + rand(0, 4).toFixed(2) + 's;--a:' + rand(3, 6).toFixed(1) + 'deg"><svg viewBox="0 0 22 ' + H + '" height="' + H + '">' + svg + '</svg></div>';
        html += '<div class="mx-toran__leaf" style="left:' + (x + gap / 2 + 3) + 'px;--d:' + rand(4, 6).toFixed(2) + 's;--dl:-' + rand(0, 4).toFixed(2) + 's;--a:9deg"><svg viewBox="0 0 16 34" width="16" height="34"><use href="#mx-leaf"/></svg></div>';
      }
      t.insertAdjacentHTML('beforeend', html);
    });
    document.querySelectorAll('.mx-frieze').forEach(function (f) {
      f.style.setProperty('--tw', (120 * f.clientHeight / 76).toFixed(2) + 'px');   // drawn tile is 120 × 76
    });
  }

  /* -------- one loop for scroll + cursor parallax, only when needed */
  var tx = 0, ty = 0, px = 0, py = 0, wTick = false, paisley = document.querySelector('.mx-paisley');
  function placeWorld() {
    var vw = window.innerWidth, vh = window.innerHeight, F = vh * 1.8, pad = (F - vh) / 2, sy = window.scrollY;
    px += (tx - px) * .08; py += (ty - py) * .08;
    placed.forEach(function (o) {
      var y = o.fy * F - sy * o.d;
      y = ((y + pad) % F + F) % F - pad - o.h / 2 + py * o.d * 26;
      var x = o.fx * vw - o.w / 2 + px * o.d * 42;
      o.x = x + o.w / 2; o.y = y + o.h / 2;
      o.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    });
    paisley.style.transform = 'translate3d(' + (px * -10).toFixed(1) + 'px,' + (-(sy * .05) % 654 + py * -7).toFixed(1) + 'px,0)';
    wTick = Math.abs(tx - px) > .002 || Math.abs(ty - py) > .002;
    if (wTick) requestAnimationFrame(placeWorld);
  }
  function kickWorld() { if (!wTick) { wTick = true; requestAnimationFrame(placeWorld); } }

  buildWorld(); buildTorans();
  if (REDUCED) { placeWorld(); }
  else {
    window.addEventListener('scroll', kickWorld, { passive: true });
    if (FINE) window.addEventListener('pointermove', function (e) {
      tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1; kickWorld();
    }, { passive: true });
    kickWorld();
    /* the kite crosses every half-minute or so */
    var flyKite = function () {
      kite.classList.remove('fly'); void kite.offsetWidth;
      kite.style.setProperty('--ky', rand(6, 34).toFixed(0) + 'vh');
      kite.style.setProperty('--kd', rand(22, 32).toFixed(0) + 's');
      kite.classList.add('fly');
      setTimeout(flyKite, rand(34000, 52000));
    };
    setTimeout(flyKite, 6000);
  }
  var rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT);
    rT = setTimeout(function () {
      if (mqMobile.matches !== mobile) {                                 // density differs per layout: rebuild
        mobile = mqMobile.matches; scale = mobile ? .62 : 1;
        placed.forEach(function (o) { o.el.remove(); }); placed = [];
        world.querySelectorAll('.mx-fall').forEach(function (e) { e.remove(); });
        buildWorld();
      }
      buildTorans(); kickWorld();
    }, 200);
  });

  /* -------- sheets settle in as they arrive */
  if (!REDUCED && 'IntersectionObserver' in window) {
    var sheets = document.querySelectorAll('.mx .section:not(.on-dark):not(.wrap) > .wrap, .mx .phead > .wrap, .mx .wrap.section');
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); so.unobserve(e.target); } });
    }, { threshold: .04 });
    sheets.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top < window.innerHeight) return;                // already on screen: leave as is
      s.classList.add('mx-sheet'); so.observe(s);
    });
  }

  /* =================================================== 2. SHREYA
     One character, one controller. Exactly one *activity* is in charge
     at any moment; a new request only takes over if it outranks the
     current one:
        5 dragging  >  4 interacting (click)  >  3 scroll-running
        >  2 autonomous (walk, run, dance, work, sit, stretch, wave…)
        >  1 idle
     Every activity is a small object with step(dt) → true when done,
     and an optional after() naming what follows. The render loop owns
     position and drawing; nothing else moves her.

     Sprite sheet (assets/maximal/shreya-sprites-keyed.webp), 4 × 279px
     columns, rows measured on the sheet:
       row 0  idle (front; frames 2–3 blink)     row 5  run: ready · dash · stride · skid
       row 1  typing at a keyboard (waist-up)    row 6  hearts        (bubble)
       row 2  thinking, hand on chin (waist-up)  row 7  surprised     (bubble + shocked face)
       row 3  jump: crouch · peace-sign · arms up · land
       row 4  stand · startled · cheeks puffed · dizzy
       row 8  headphones (bust)                  row 9  thumbs up     (frame 3 has a watermark: unused)
     The sheet has no walk cycle, no sitting pose and no laptop, so:
       walking  = the stride frame with a step bounce (slower than running)
       sitting  = waist-up rows behind a drawn prop: a laptop lid on her
                  keyboard, a low chowki table, or a bolster cushion; on the
                  lotus the front petals hide the crop instead
       shocked  = her standing frame with the surprised face from row 7,
                  scaled to match (the face rows are ~15% larger)        */
  var CW = 279;
  function fr(c, y0, y1, base, ex) { var o = { sx: c * CW, sy: y0, sh: y1 - y0, base: base }; if (ex) for (var k in ex) o[k] = ex[k]; return o; }
  var four = [0, 1, 2, 3];
  var FR = {
    idle:  four.map(function (c) { return fr(c, 0, 255, 249); }),
    jump:  [fr(0, 648, 886, 882), fr(1, 648, 886, 882), fr(2, 648, 890, 884), fr(3, 648, 886, 881)],
    misc:  [fr(0, 884, 1110, 1104), fr(1, 884, 1110, 1104), fr(2, 890, 1099, 1098), fr(3, 890, 1110, 1098)],
    run:   [fr(0, 1110, 1295, 1294), fr(1, 1110, 1295, 1294), fr(2, 1099, 1295, 1294), fr(3, 1110, 1295, 1293)],
    work:  four.map(function (c) { return fr(c, 255, 451, 450, { seated: 'table', laptop: 1 }); }),
    think: four.map(function (c) { return fr(c, 456, 648, 647, { seated: 'cushion' }); }),
    music: four.map(function (c) { return fr(c, 1629, 1806, 1803, { seated: 'cushion', k: .87 }); }),
    shock: [0, 1, 2].map(function (j) { return fr(0, 0, 255, 249, { head: j }); })
  };
  var BUST = {            // speech-bubble portraits: row band, frames, ms per frame, loop
    type:       { y0: 255,  y1: 456,  n: 4, ms: 140, loop: true },
    think:      { y0: 456,  y1: 648,  n: 4, ms: 300, loop: false },
    hearts:     { y0: 1295, y1: 1432, n: 4, ms: 170, loop: true },
    surprised:  { y0: 1432, y1: 1629, n: 4, ms: 210, loop: false },
    headphones: { y0: 1629, y1: 1806, n: 4, ms: 320, loop: true },
    thumbs:     { y0: 1806, y1: 2000, n: 3, ms: 220, loop: false }
  };

  var host = document.querySelector('.mx-shreya'), cv = host.querySelector('.mx-shreya__cv'), ctx = cv.getContext('2d');
  var btn = host.querySelector('.mx-shreya__btn'), bub = host.querySelector('.mx-shreya__bubble');
  var bcv = bub.querySelector('canvas'), bctx = bcv.getContext('2d'), sayEl = bub.querySelector('.mx-shreya__say');
  var rug = document.querySelector('.mx-rug');
  var SEAT = document.querySelector('.mx-lotus__seat');          // home page only
  var img = new Image();
  var s, BW, BH, FOOT, charH, charW, navH, dpr, SEAT_K = 1.3;
  var st = { x: 0, y: 0, face: 1, pose: FR.idle[0], pin: null, air: false, shake: 0, lift: 0, tilt: 0, bob: 0 };
  var act = null, lastPose = null, bubble = null, bubbleTimer = 0, ready = false, introHold = false;

  btn.setAttribute('aria-label', 'Shreya, the little guide of this site. Press Enter to surprise her, or use the arrow keys to move her.');

  function layout() {
    var vwNow = document.documentElement.clientWidth;
    s = vwNow >= 1100 ? .42 : vwNow >= 768 ? .36 : .3;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    FOOT = Math.round(6 + 26 * s);                     // room under her feet for seat props
    BW = Math.round(CW * s); BH = Math.round(258 * s) + FOOT;
    charH = 234 * s; charW = 108 * s;
    SEAT_K = vwNow >= 1100 ? 1.8 : vwNow >= 768 ? 1.7 : 1.55;   // she is the hero's focal point
    navH = (document.querySelector('.nav') || { offsetHeight: 64 }).offsetHeight;
    host.style.width = BW + 'px'; host.style.height = BH + 'px';
    host.style.transformOrigin = '50% ' + (BH - FOOT) + 'px';
    if (cv.width !== BW * dpr || cv.height !== BH * dpr) { cv.width = BW * dpr; cv.height = BH * dpr; lastPose = null; }
    rug.style.width = (64 * s / .38) + 'px'; rug.style.height = (19 * s / .38) + 'px';
  }
  var vw = function () { return document.documentElement.clientWidth; };
  var vh = function () { return window.innerHeight; };
  var minY = function () { return navH + charH * .92 + 6; };
  var maxY = function () { return vh() - 6; };
  var laneY = function () { return clamp(vh() * .86, minY(), maxY()); };
  function keepIn() { st.x = clamp(st.x, charW * .5, vw() - charW * .5); st.y = clamp(st.y, minY(), maxY()); }

  /* ---------------- drawing (canvas redraws only when the pose changes) */
  function block(c, P, ox, oy, x, y, w, h, col) { c.fillStyle = col; c.fillRect(Math.round(ox + x * P), Math.round(oy + y * P), Math.ceil(w * P), Math.ceil(h * P)); }
  function drawLaptop(c, ox, oy, k) {            // lid standing on the far edge of her keyboard
    var P = 4 * k;
    for (var r = 0; r < 13; r++) {
      var sh = Math.floor(r / 3), edge = r === 0 || r === 12;
      block(c, P, ox, oy, sh, r, 17, 1, edge ? '#141210' : '#8E1B2B');
      block(c, P, ox, oy, sh, r, 1, 1, '#141210'); block(c, P, ox, oy, 16 + sh, r, 1, 1, '#141210');
    }
    block(c, P, ox, oy, 2, 1, 14, 1, '#B3243A');                 // highlight
    block(c, P, ox, oy, 9, 4, 2, 1, '#F2A007'); block(c, P, ox, oy, 8, 5, 4, 1, '#F2A007');
    block(c, P, ox, oy, 7, 6, 6, 1, '#E46A0C'); block(c, P, ox, oy, 9, 7, 2, 1, '#F6EFDD');   // lotus sticker
  }
  function drawTable(c, cx, by, k) {             // low wooden chowki in front of her
    var P = 4 * k, w = 44, ox = cx - w * P / 2, oy = by - 9 * P;
    block(c, P, ox, oy, 0, 0, w, 1, '#141210');
    block(c, P, ox, oy, 0, 1, w, 2, '#8C5A2B'); block(c, P, ox, oy, 1, 1, w - 2, 1, '#B07A3E');
    block(c, P, ox, oy, 0, 3, w, 1, '#141210');
    block(c, P, ox, oy, 2, 4, w - 4, 3, '#5A2E14');
    for (var i = 4; i < w - 4; i += 4) { block(c, P, ox, oy, i, 5, 1, 1, '#F2A007'); }
    block(c, P, ox, oy, 2, 7, w - 4, 1, '#141210');
    block(c, P, ox, oy, 2, 7, 3, 2, '#3A1C0C'); block(c, P, ox, oy, w - 5, 7, 3, 2, '#3A1C0C');
  }
  function drawCushion(c, cx, by, k) {           // round bolster (gol takiya)
    var P = 4 * k, w = 40, ox = cx - w * P / 2, oy = by - 8 * P;
    block(c, P, ox, oy, 2, 0, w - 4, 1, '#141210'); block(c, P, ox, oy, 1, 1, w - 2, 6, '#141210');
    block(c, P, ox, oy, 2, 1, w - 4, 6, '#E5A024'); block(c, P, ox, oy, 3, 1, w - 6, 1, '#F7C35B');
    for (var i = 5; i < w - 4; i += 6) block(c, P, ox, oy, i, 1, 2, 6, '#C2187A');
    block(c, P, ox, oy, 2, 7, w - 4, 1, '#141210');
    block(c, P, ox, oy, 0, 3, 1, 3, '#D92B1C'); block(c, P, ox, oy, w - 1, 3, 1, 3, '#D92B1C');   // tassels
  }
  function draw(f) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (!img.complete || !img.naturalWidth) return;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    var onLotus = st.pin === 'lotus', prop = onLotus ? null : f.seated;
    var ground = prop === 'table' ? 24 : prop === 'cushion' ? 18 : 0;   // sheet px from crop line down to the floor
    var k = s * dpr * (f.k || 1), groundY = (BH - FOOT) * dpr;
    var x0 = (BW * dpr - CW * k) / 2, dy = groundY - (f.base + ground - f.sy) * k;
    if (f.head !== undefined) {
      ctx.drawImage(img, f.sx, f.sy, CW, f.sh, x0, dy, CW * k, f.sh * k);
      ctx.clearRect(x0 + 76 * k, dy, 124 * k, 101 * k);           // lift her own head off…
      var hk = .85, sx = f.head * CW + 55, dw = 165 * hk * k, dh = 104 * hk * k;
      ctx.drawImage(img, sx, 1433, 165, 104, x0 + 136 * k - dw / 2, dy + 14 * k, dw, dh);   // …and give her the shocked one
    } else {
      ctx.drawImage(img, f.sx, f.sy, CW, f.sh, x0, dy, CW * k, f.sh * k);
    }
    if (f.laptop) drawLaptop(ctx, x0 + 140 * k, dy + 95 * k, k);
    var by = dy + (f.base + ground - f.sy) * k, cx = x0 + 136 * k;
    if (prop === 'table') drawTable(ctx, cx + 14 * k, by, k);
    if (prop === 'cushion') drawCushion(ctx, cx, by, k);
  }
  function drawBust(kind, i) {
    var b = BUST[kind], h = b.y1 - b.y0, sx = i * CW + 40, k = Math.min(144 / 200, 144 / h);
    bctx.clearRect(0, 0, 144, 144);
    bctx.imageSmoothingQuality = 'high';
    bctx.drawImage(img, sx, b.y0, 200, h, (144 - 200 * k) / 2, 144 - h * k, 200 * k, h * k);
  }

  /* ---------------- places: free (fixed to the screen), lotus, rope */
  function seatRect() { var r = SEAT.getBoundingClientRect(); return { x: r.left, y: r.top }; }
  function seatVisible() {
    if (!SEAT) return false;
    var r = seatRect(); return r.y > minY() && r.y < vh() - 30 && r.x > 0 && r.x < vw();
  }
  function seatOnLotus() {
    if (!SEAT) return;
    SEAT.appendChild(host); st.pin = 'lotus'; st.air = false; st.tilt = 0; st.face = 1; lastPose = null;
    host.classList.add('is-seated');
  }
  function unseat() {
    if (st.pin !== 'lotus') return;
    var r = seatRect(); st.x = r.x; st.y = r.y;
    document.body.appendChild(host); host.classList.remove('is-seated'); st.pin = null; lastPose = null;
    keepIn();
  }
  function ledgeY(el) { return el.getBoundingClientRect().top + 1; }
  function ledgeOk(el) { var y = ledgeY(el); return y > minY() && y < maxY(); }
  function findLedge() {
    var best = null, bd = 1e9;
    document.querySelectorAll('[data-ledge]').forEach(function (el) {
      if (!ledgeOk(el)) return;
      var d = Math.abs(ledgeY(el) - st.y); if (d < bd) { bd = d; best = el; }
    });
    return best;
  }

  /* never settle on top of words, links, buttons or pictures */
  var CONTENT = /^(P|H1|H2|H3|H4|A|BUTTON|IMG|LI|DD|DT|EM|B|INPUT|FIGCAPTION|TD|TH|SPAN|LABEL)$/;
  function clearAt(x, y) {
    if (y < minY() - 2 || y > maxY() + 2 || x < charW * .4 || x > vw() - charW * .4) return false;
    var pts = [[x, y - charH * .2], [x, y - charH * .6], [x - charW * .45, y - charH * .4], [x + charW * .45, y - charH * .4], [x, y - charH * .95]];
    for (var i = 0; i < pts.length; i++) {
      var els = document.elementsFromPoint(pts[i][0], pts[i][1]);
      for (var j = 0; j < els.length; j++) {
        if (els[j].closest('.mx-shreya, .mx-world, .mx-rug, .mx-toran, .mx-frieze, .mx-lotus, .mx-pix')) continue;
        if (CONTENT.test(els[j].tagName)) return false;
      }
    }
    return true;
  }
  function restSpot() {                       // nearest clear place, same height first
    if (clearAt(st.x, st.y)) return { x: st.x, y: st.y };
    for (var d = 50; d < 520; d += 50) for (var sg = -1; sg <= 1; sg += 2) {
      var x = st.x + d * sg; if (clearAt(x, st.y)) return { x: x, y: st.y };
    }
    for (var n = 0; n < 14; n++) {
      var p = { x: rand(charW, vw() - charW), y: rand(minY() + (maxY() - minY()) * .35, maxY()) };
      if (clearAt(p.x, p.y)) return p;
    }
    return null;
  }

  /* ---------------- speech bubbles (portraits from the sheet) */
  function say(kind, text, ms) {
    if (!BUST[kind]) return;
    bubble = { kind: kind, t: 0, i: -1 };
    sayEl.textContent = text;
    bub.classList.add('on');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { bub.classList.remove('on'); setTimeout(function () { if (!bub.classList.contains('on')) bubble = null; }, 300); }, ms || 2400);
  }
  var CHATTER = [['type', 'Editing…'], ['think', 'Hmm…'], ['headphones', '♪ ♪'], ['hearts', 'Namaste!'], ['type', 'One more task'], ['think', 'What next?']];
  function chatter() { var l = CHATTER[Math.floor(Math.random() * CHATTER.length)]; say(l[0], l[1], 2600); }

  /* ---------------- little pixel icons that float up while she works */
  var PIX = [
    '<rect x="1" y="4" width="2" height="2"/><rect x="3" y="6" width="2" height="2"/><rect x="5" y="4" width="2" height="2"/><rect x="7" y="2" width="2" height="2"/>',      // tick
    '<rect x="1" y="2" width="2" height="2"/><rect x="5" y="2" width="2" height="2"/><rect x="0" y="3" width="8" height="2"/><rect x="1" y="5" width="6" height="1"/><rect x="2" y="6" width="4" height="1"/><rect x="3" y="7" width="2" height="1"/>', // heart
    '<rect x="3" y="0" width="2" height="8"/><rect x="0" y="3" width="8" height="2"/><rect x="2" y="2" width="4" height="4"/>',     // sparkle
    '<rect x="0" y="3" width="1" height="2"/><rect x="1" y="2" width="1" height="1"/><rect x="1" y="5" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="7" y="3" width="1" height="2"/><rect x="3" y="1" width="1" height="6"/>' // </>
  ];
  var PIXC = ['#F2E527', '#F7A21B', '#F6EFDD', '#7FE0B4'];
  function pixel() {
    var i = Math.floor(Math.random() * PIX.length), el = document.createElement('span');
    el.className = 'mx-pix';
    el.style.cssText = 'left:' + (BW * .62 + rand(-10, 10)) + 'px;top:' + (BH * .38) + 'px;color:' + PIXC[i] + ';--dx:' + rand(-14, 14).toFixed(0) + 'px';
    el.innerHTML = '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" fill="currentColor">' + PIX[i] + '</svg>';
    host.appendChild(el);
    setTimeout(el.remove.bind(el), 1700);
  }

  /* ---------------- activities */
  function A(name, state, pri, step, after) { return { name: name, state: state, pri: pri, t: 0, step: step, after: after }; }

  function Idle(ms, look) {
    var next = rand(1200, 2600), bl = -1, flip = rand(900, 1700);
    return A('idle', 'idle', 1, function (dt) {
      this.t += dt; var t = this.t;
      if (look && t > flip) { st.face *= -1; flip = t + rand(800, 1600); }
      if (bl < 0 && t > next) bl = t;
      if (bl >= 0) {
        var e = t - bl;
        st.pose = e < 70 ? FR.idle[2] : e < 150 ? FR.idle[3] : e < 210 ? FR.idle[2] : FR.idle[0];
        if (e >= 210) { bl = -1; next = t + rand(1600, 3600); }
      } else st.pose = (t % 9000) > 7600 ? FR.idle[1] : FR.idle[0];
      if (t >= ms) { st.face = 1; return true; }
    });
  }
  function Move(toX, running, then) {        // walk (stride + step bounce) or run along her current height
    var phase = running ? 0 : 1, pt = 0;
    return A(running ? 'run' : 'walk', running ? 'running' : 'walking', 2, function (dt) {
      this.t += dt; pt += dt;
      var dir = toX > st.x ? 1 : -1; st.face = dir;
      if (phase === 0) { st.pose = FR.run[0]; if (pt > 90) { phase = 1; pt = 0; } return; }
      if (phase === 2) { st.pose = FR.run[3]; if (pt > 150) { st.face = 1; st.bob = 0; return true; } return; }
      var sp = (running ? 270 : 90) * s / .38, dx = sp * dt / 1000;
      if (Math.abs(toX - st.x) <= dx) { st.x = toX; if (running) { phase = 2; pt = 0; return; } st.bob = 0; st.face = 1; return true; }
      st.x += dir * dx;
      if (running) { st.pose = FR.run[1 + Math.floor(this.t / 110) % 2]; st.bob = 0; }
      else { st.pose = FR.run[2]; st.bob = -Math.abs(Math.sin(this.t / 170 * Math.PI)) * 3; st.tilt = Math.sin(this.t / 170 * Math.PI) * 2; }
    }, then);
  }
  function Hop(toX, toY, then, quick) {      // toY may be a function (a moving rope or seat)
    var x1, y1, Y = typeof toY === 'function' ? toY : function () { return toY; }, dur, H, phase = 0, pt = 0;
    return A('hop', 'walking', 2, function (dt) {
      this.t += dt; pt += dt;
      if (phase === 0) {
        if (pt === dt) { x1 = st.x; y1 = st.y; if (Math.abs(toX - x1) > 6) st.face = toX > x1 ? 1 : -1; }
        st.pose = FR.jump[0];
        if (pt > (quick ? 60 : 110)) {
          var dist = Math.hypot(toX - x1, Y() - y1);
          dur = clamp(300 + dist * 1.2, 360, 760); H = 30 + Math.min(110, dist * .22) + Math.max(0, (y1 - Y()) * .22);
          phase = 1; pt = 0; st.air = true;
        }
        return;
      }
      if (phase === 1) {
        var p = Math.min(1, pt / dur);
        st.x = x1 + (toX - x1) * p; st.y = y1 + (Y() - y1) * p - H * 4 * p * (1 - p);
        st.pose = p < .38 ? FR.jump[1] : p < .7 ? FR.jump[2] : FR.jump[1];
        if (p >= 1) { st.air = false; st.x = toX; st.y = Y(); phase = 2; pt = 0; }
        return;
      }
      st.pose = FR.jump[3];
      if (pt > 150) { st.face = 1; return true; }
    }, then);
  }
  function Work(ms) {                        // typing, laptop open; on the lotus or at a little table
    var nextPix = rand(700, 1400);
    return A('work', 'working', 2, function (dt) {
      this.t += dt; st.face = 1;
      st.pose = FR.work[Math.floor(this.t / 150) % 4];
      if (this.t > nextPix) { pixel(); nextPix = this.t + rand(1100, 2100); }
      if (this.t >= ms) return true;
    });
  }
  function Sit(ms, kind) {                   // a break: thinking, or headphones on
    var f = kind === 'music' ? FR.music : FR.think, per = kind === 'music' ? 340 : 420;
    if (Math.random() < .5) setTimeout(function () { say(kind === 'music' ? 'headphones' : 'think', kind === 'music' ? '♪ break ♪' : 'Hmm…', 2400); }, 400);
    return A('sit', 'sitting', 2, function (dt) {
      this.t += dt; st.face = 1;
      var i = Math.floor(this.t / per); st.pose = f[kind === 'music' ? i % 4 : Math.min(i, 3) === 3 ? 3 : i % 4];
      if (this.t >= ms) return true;
    });
  }
  function Dance(ms) {                       // jump-row poses on the beat, turning every two beats
    var seq = [FR.jump[1], FR.jump[2], FR.jump[1], FR.misc[0]];
    return A('dance', 'dancing', 2, function (dt) {
      this.t += dt;
      var beat = Math.floor(this.t / 340), ph = (this.t % 340) / 340;
      st.pose = seq[beat % 4];
      st.lift = beat % 4 === 1 ? -Math.sin(ph * Math.PI) * 10 : -Math.sin(ph * Math.PI) * 3;
      st.face = Math.floor(beat / 2) % 2 ? -1 : 1;
      if (this.t >= ms) { st.lift = 0; st.face = 1; return true; }
    });
  }
  function Pose(frame, ms, name, state, line) {   // stretch (arms up), wave (peace sign), dizzy, puffed…
    if (line) say(line[0], line[1], ms + 600);
    return A(name, state || 'idle', 2, function (dt) {
      this.t += dt; st.face = 1; st.pose = frame;
      if (this.t >= ms) return true;
    });
  }
  function Seq(list, name, pri) {            // run factories one after another (each made when its turn comes)
    var i = -1, cur = null;
    return A(name || 'seq', 'walking', pri || 2, function (dt) {
      if (!cur || cur.step(dt)) {
        do { i++; if (i >= list.length) return true; cur = list[i](); } while (!cur);
        this.state = cur.state;
      }
    });
  }

  function Scroll() {                        // she runs with you: down → right, up → left, wraps at the edges
    var phase = 0, pt = 0;
    return A('scroll', 'running', 3, function (dt) {
      this.t += dt; var now = performance.now();
      if (phase === 0) {
        if (now - lastScrollAt > 260) { phase = 1; pt = 0; st.pose = FR.run[3]; st.bob = 0; return; }
        var dir = scrollV >= 0 ? 1 : -1, mag = Math.abs(scrollV);
        var sp = clamp(mag * .3, 70, 460) * s / .38;
        st.face = dir; st.x += dir * sp * dt / 1000;
        if (st.x > vw() + charW) st.x = -charW; else if (st.x < -charW) st.x = vw() + charW;
        st.y += (laneY() - st.y) * Math.min(1, dt / 240);
        if (sp < 170 * s / .38) { st.pose = FR.run[2]; st.bob = -Math.abs(Math.sin(this.t / 170 * Math.PI)) * 3; }
        else { st.pose = FR.run[1 + Math.floor(this.t / 105) % 2]; st.bob = 0; }
        return;
      }
      pt += dt;
      if (pt > 170) { st.face = 1; justScrolled = true; return true; }
    });
  }
  function Drag() {
    return A('drag', 'dragging', 5, function (dt) {
      this.t += dt; st.pose = FR.misc[1];
      st.tilt += (clamp(dragVX * .025, -16, 16) - st.tilt) * Math.min(1, dt / 90);
      dragVX *= .85;
      return false;                          // only a drop ends it
    });
  }
  function Shock(resume) {                   // she turns to you: gasp → wide eyes → "!"
    return A('shock', 'interacting', 4, function (dt) {
      this.t += dt; var t = this.t;
      st.face = 1; st.tilt = 0;
      st.pose = FR.shock[t < 170 ? 0 : t < 380 ? 1 : 2];
      st.lift = REDUCED ? 0 : t < 260 ? -Math.sin(t / 260 * Math.PI) * 9 : 0;
      st.shake = !REDUCED && t < 320 ? 3 : 0;
      if (t >= 1250) { st.shake = 0; st.lift = 0; return true; }
    }, resume);
  }

  /* what she was doing before a click, so she can go back to it */
  function resumeOf(a) {
    if (!a) return null;
    if (a.name === 'work') return function () { return Work(rand(6000, 12000)); };
    if (a.name === 'sit') return function () { return Sit(rand(4000, 7000), Math.random() < .5 ? 'music' : 'think'); };
    if (a.name === 'dance') return function () { return Dance(2000); };
    return null;
  }

  /* ---------------- the autonomous chooser (weighted, unhurried) */
  var justScrolled = false, lastLotus = 0, lastKite = 0;
  function pick(opts) {
    var sum = 0, i; for (i = 0; i < opts.length; i++) sum += opts[i][0];
    var r = Math.random() * sum;
    for (i = 0; i < opts.length; i++) { r -= opts[i][0]; if (r <= 0) return opts[i][1](); }
    return opts[0][1]();
  }
  function goRest(then) {                    // relocate to a clear spot, then do `then`
    var p = restSpot();
    if (!p) return then();
    if (Math.abs(p.y - st.y) < 8) return Seq([function () { return Move(p.x, Math.abs(p.x - st.x) > 260); }, then]);
    return Seq([function () { return Hop(p.x, p.y); }, then]);
  }
  function choose() {
    if (REDUCED) return A("still", "idle", 1, function () { return false; });   // holds whatever pose she has
    if (justScrolled) { justScrolled = false; return Idle(rand(1400, 2200), true); }
    if (st.pin === 'lotus') {
      return pick([
        [58, function () { return Work(rand(9000, 16000)); }],
        [10, function () { return Sit(rand(4000, 6500), 'think'); }],
        [8,  function () { return Pose(FR.jump[2], 1100, 'stretch', 'idle'); }],
        [7,  function () { return Pose(FR.jump[1], 1300, 'wave', 'interacting', ['hearts', 'Hi!']); }],
        [9,  function () { return Idle(rand(2000, 3200), true); }],
        [8,  function () { unseat(); lastLotus = performance.now(); return goRest(function () { return Idle(rand(1500, 2500), true); }); }]
      ]);
    }
    if (st.pin) {                            // on a rope
      if (!ledgeOk(st.pin)) { st.pin = null; return goRest(function () { return Idle(1500, true); }); }
      return pick([
        [40, function () { return Move(rand(charW, vw() - charW), Math.random() < .3); }],
        [30, function () { return Idle(rand(1800, 3600), true); }],
        [12, function () { return Dance(2400); }],
        [18, function () { st.pin = null; return goRest(function () { return Idle(1500); }); }]
      ]);
    }
    if (st.x < charW * .4 || st.x > vw() - charW * .4) return Move(clamp(st.x, charW * 1.5, vw() - charW * 1.5), false);
    if (!clearAt(st.x, st.y) && Math.random() < .8) return goRest(function () { return Idle(rand(1600, 2600)); });
    var opts = [
      [22, function () { return Idle(rand(2200, 4800), Math.random() < .5); }],
      [16, function () { return Move(clamp(st.x + rand(-320, 320), charW, vw() - charW), false); }],
      [6,  function () { var x = st.x < vw() / 2 ? vw() - charW * 1.5 : charW * 1.5; return Move(x, true); }],
      [9,  function () { return Dance(rand(2600, 3800)); }],
      [12, function () { return goRest(function () { return Work(rand(7000, 12000)); }); }],
      [9,  function () { return goRest(function () { return Sit(rand(4500, 8000), Math.random() < .5 ? 'music' : 'think'); }); }],
      [5,  function () { return Pose(FR.jump[2], 1100, 'stretch', 'idle'); }],
      [4,  function () { return Pose(FR.jump[1], 1300, 'wave', 'interacting', ['hearts', 'Hello!']); }],
      [6,  function () { return goRest(function () { return Idle(1800, true); }); }],
      [4,  function () { chatter(); return Idle(2400); }]
    ];
    var L = findLedge();
    if (L) opts.push([8, function () { var y = function () { return ledgeY(L); }; return Seq([function () { return Hop(clamp(st.x + rand(-80, 80), charW, vw() - charW), y); }, function () { st.pin = L; return Idle(rand(1600, 2800), true); }]); }]);
    if (seatVisible() && performance.now() - lastLotus > 25000) opts.push([30, function () {
      return Seq([function () { return Hop(seatRect().x, function () { return seatRect().y; }); }, function () { seatOnLotus(); return Work(rand(10000, 18000)); }], 'to-lotus');
    }]);
    var kr = kite && kite.classList.contains('fly') ? kite.getBoundingClientRect() : null;
    if (kr && performance.now() - lastKite > 30000 && Math.abs(kr.left + kr.width / 2 - st.x) < 300) opts.push([25, function () {
      lastKite = performance.now(); st.face = kr.left > st.x ? 1 : -1; say('surprised', 'Patang!', 2200); return Pose(FR.jump[1], 1400, 'notice', 'idle');
    }]);
    return pick(opts);
  }

  /* ---------------- input: drag, click (shock), keyboard, scroll */
  var down = null, dragOff = { x: 0, y: 0 }, dragVX = 0, lastDragX = 0, clicks = [];
  function begin(a) { act = a; if (a) a.t = 0; }
  btn.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || !ready) return;
    e.preventDefault();                                     // no text selection, no native drag
    try { btn.setPointerCapture(e.pointerId); } catch (_) {}
    down = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
  });
  btn.addEventListener('pointermove', function (e) {
    if (!down || e.pointerId !== down.id) return;
    if (!down.moved) {
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) < 6) return;   // still a click
      down.moved = true;
      var k = st.pin === 'lotus' ? SEAT_K : 1;                             // seated she is drawn larger…
      unseat(); if (st.pin) st.pin = null;
      st.air = false; st.lift = 0; st.bob = 0; st.shake = 0;
      dragOff = { x: (down.x - st.x) / k, y: (down.y - st.y) / k };       // …so keep the same body part under the cursor
      lastDragX = e.clientX; dragVX = 0;
      document.documentElement.classList.add('mx-dragging');
      begin(Drag());
    }
    dragVX = (e.clientX - lastDragX) * 6 + dragVX * .4; lastDragX = e.clientX;
    st.x = e.clientX - dragOff.x; st.y = e.clientY - dragOff.y; keepIn();
    place();                                                   // paint now, not next frame
  });
  function endPointer(e) {
    if (!down || e.pointerId !== down.id) return;
    var dragged = down.moved; down = null;
    if (dragged) {                                             // she stays exactly where she's dropped
      document.documentElement.classList.remove('mx-dragging');
      st.tilt = 0;
      begin(Seq([function () { return Pose(FR.jump[3], 180, 'land', 'idle'); }, function () { return Idle(rand(3500, 6000), true); }], 'dropped', 1));
      save();
    } else if (e.type === 'pointerup') shock();
  }
  btn.addEventListener('pointerup', endPointer);
  btn.addEventListener('pointercancel', endPointer);
  btn.addEventListener('lostpointercapture', function (e) { if (down && down.moved) endPointer({ pointerId: e.pointerId, type: 'pointercancel' }); });
  btn.addEventListener('click', function (e) { if (e.detail === 0) shock(); });   // keyboard Enter / Space
  btn.addEventListener('keydown', function (e) {                   // move her without dragging
    var d = e.shiftKey ? 80 : 24, k = e.key;
    if (!/^Arrow/.test(k) || !ready) return;
    e.preventDefault(); unseat(); if (st.pin) st.pin = null;
    if (k === 'ArrowLeft') st.x -= d; if (k === 'ArrowRight') st.x += d;
    if (k === 'ArrowUp') st.y -= d; if (k === 'ArrowDown') st.y += d;
    keepIn(); st.face = k === 'ArrowLeft' ? -1 : 1; st.pose = FR.run[2];
    begin(Idle(rand(4000, 6000))); save();
  });
  function shock() {
    if (!ready) return;
    var now = performance.now();
    clicks = clicks.filter(function (t) { return now - t < 2600; }); clicks.push(now);
    burst();
    if (clicks.length >= 4) { clicks = []; say('surprised', 'Okay, okay!', 2000); begin(Pose(FR.misc[2], 1300, 'puff', 'interacting')); act.pri = 4; return; }
    var resume = act && act.pri === 4 ? act.after : resumeOf(act);
    begin(Shock(resume));
  }

  var lastSY = window.scrollY, lastST = performance.now(), scrollV = 0, lastScrollAt = 0, leaveAcc = 0;
  window.addEventListener('scroll', function () {
    var now = performance.now(), y = window.scrollY, dy = y - lastSY, dt = Math.max(16, now - lastST);
    lastSY = y; lastST = now;
    scrollV = scrollV * .55 + (dy / dt * 1000) * .45; lastScrollAt = now;
    if (!ready || REDUCED || introHold || !dy) return;
    if (act && act.pri > 3) return;                            // dragging or reacting wins
    if (st.pin === 'lotus') {                                  // a nudge isn't enough to leave the lotus
      leaveAcc += Math.abs(dy);
      if (leaveAcc < 160 && seatVisible()) return;
      leaveAcc = 0; unseat(); lastLotus = now;
      begin(Seq([function () { return Hop(st.x, laneY(), null, true); }, Scroll], 'leave-lotus', 3));
      return;
    }
    if (st.pin) st.pin = null;
    if (!act || (act.name !== 'scroll' && act.name !== 'leave-lotus')) begin(Scroll());
  }, { passive: true });

  /* ---------------- render loop: one writer for position and pose */
  var last = 0, rugX = 0, rugY = 0;
  function place() {
    if (st.pin === 'lotus') {
      host.style.transform = 'translate(-50%,' + (-(BH - FOOT)) + 'px) scale(' + SEAT_K + ')';
      var r = seatRect(); st.x = r.x; st.y = r.y;
    } else {
      if (st.pin && !st.air) st.y = ledgeY(st.pin);
      var jx = st.shake ? (Math.random() - .5) * st.shake : 0;
      host.style.transform = 'translate3d(' + (st.x - BW / 2 + jx).toFixed(1) + 'px,' + (st.y - (BH - FOOT) + st.lift + st.bob).toFixed(1) + 'px,0) rotate(' + st.tilt.toFixed(2) + 'deg)';
    }
    cv.style.transform = st.face < 0 ? 'scaleX(-1)' : '';
  }
  function loop(ts) {
    var dt = Math.min(50, ts - (last || ts)); last = ts;
    if (ready && !introHold) {
      if (!act || act.step(dt)) {
        var next = act && act.after ? act.after() : null;
        if (act && act.name === 'drag') next = null;
        st.lift = 0; st.bob = 0; if (!act || act.name !== 'drag') st.tilt = 0;
        begin(next || choose());
      }
    } else if (act) act.step(dt);
    if (st.pin && st.pin !== 'lotus' && !st.air && !ledgeOk(st.pin) && act && act.pri < 3) { st.pin = null; begin(goRest(function () { return Idle(1500, true); })); }
    place();
    if (st.pose !== lastPose) { draw(st.pose); lastPose = st.pose; }
    /* the rug: her magic mat whenever she rests or strolls in open space */
    var onRug = !st.pin && !st.air && act && /idle|walking|working|sitting|dancing|interacting/.test(act.state) && act.name !== 'scroll';
    rug.classList.toggle('on', !!onRug && !introHold);
    rugX += (st.x - rugX) * .18; rugY += (st.y - rugY) * .18;
    rug.style.transform = 'translate3d(' + (rugX - rug.offsetWidth / 2).toFixed(1) + 'px,' + (rugY - rug.offsetHeight * .4).toFixed(1) + 'px,0)';
    if (bubble) {
      bubble.t += dt;
      var b = BUST[bubble.kind], i = Math.floor(bubble.t / b.ms);
      i = b.loop ? i % b.n : Math.min(i, b.n - 1);
      if (i !== bubble.i) { drawBust(bubble.kind, i); bubble.i = i; }
      var bw = 86, left = st.pin === 'lotus' ? (BW - bw) / 2 + st.x - BW / 2 : clamp(st.x - bw / 2, 6, vw() - bw - 6);
      bub.style.left = (left - (st.x - BW / 2)) + 'px';
      bub.style.bottom = (charH + 14) + 'px'; bub.style.top = 'auto';
      bub.style.setProperty('--tail', clamp(st.x - left, 14, bw - 14) + 'px');
    }
    requestAnimationFrame(loop);
  }

  function burst() {
    for (var i = 0; i < 8; i++) {
      var p = document.createElement('div'), a = i / 8 * Math.PI * 2 + rand(-.3, .3), d = rand(40, 80);
      var cx = st.x - 7, cy = st.y - charH * .6;
      p.className = 'mx-burst';
      p.style.cssText = 'transform:translate3d(' + cx + 'px,' + cy + 'px,0);--bx:' + (cx + Math.cos(a) * d).toFixed(0) + 'px;--by:' + (cy + Math.sin(a) * d).toFixed(0) + 'px;--br:' + rand(-200, 200).toFixed(0) + 'deg;color:' + PAL[i % 5];
      p.innerHTML = '<svg viewBox="' + (i % 2 ? '-10 -10 20 20' : '0 0 10 16') + '" width="14" height="14"><use href="#' + (i % 2 ? 'mx-mari' : 'mx-petal') + '"/></svg>';
      document.body.appendChild(p);
      setTimeout(p.remove.bind(p), 950);
    }
  }

  /* ---------------- the page talks to her */
  var emailBtn = document.querySelector('.email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('pointerenter', function () { say('hearts', 'Say hi!', 2000); });
    emailBtn.addEventListener('click', function () { setTimeout(function () { say('thumbs', 'Got it!', 2000); }, 150); });
  }
  if ('IntersectionObserver' in window) {           // data-shreya-says="kind|text", once each
    var lo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var l = (e.target.getAttribute('data-shreya-says') || '').split('|'); lo.unobserve(e.target);
        if (l.length === 2 && !bubble && ready) say(l[0], l[1], 2600);
      });
    }, { threshold: .6 });
    document.querySelectorAll('[data-shreya-says]').forEach(function (el) { lo.observe(el); });
  }
  document.addEventListener('mx:say', function (e) { if (e.detail && ready) say(e.detail[0], e.detail[1], e.detail[2] || 2400); });

  /* ---------------- she keeps her place between pages */
  function save() {
    try { sessionStorage.setItem('kz-shreya', JSON.stringify({ x: st.x / vw(), y: st.y / vh(), lotus: st.pin === 'lotus', t: Date.now() })); } catch (_) {}
  }
  function saved() {
    try { var v = JSON.parse(sessionStorage.getItem('kz-shreya') || 'null'); return v && Date.now() - v.t < 30 * 60000 ? v : null; } catch (_) { return null; }
  }
  window.addEventListener('pagehide', save);

  /* ---------------- the lotus intro hands her over (see js/home.js) */
  document.addEventListener('mx:intro-start', function () {
    introHold = true; ready = true;
    seatOnLotus(); host.classList.add('is-hidden'); bub.classList.remove('on');
    begin(Work(1e9));
  });
  document.addEventListener('mx:reveal', function () {
    host.classList.remove('is-hidden'); host.classList.add('is-pop');
    setTimeout(function () { host.classList.remove('is-pop'); }, 900);
  });
  document.addEventListener('mx:intro-done', function () {
    introHold = false; host.classList.remove('is-hidden');
    if (st.pin !== 'lotus') seatOnLotus();
    begin(Work(rand(9000, 14000)));
    setTimeout(function () { say('hearts', 'Namaste!', 2400); }, 500);
  });

  /* ---------------- start */
  img.onload = function () {
    layout();
    var sv = saved();
    if (document.documentElement.classList.contains('mx-intro') && SEAT) {
      introHold = true; seatOnLotus(); host.classList.add('is-hidden'); begin(Work(1e9));
    } else if (SEAT && (!sv || sv.lotus || window.scrollY < 40)) {
      seatOnLotus(); begin(REDUCED ? choose() : Work(rand(9000, 14000)));
      if (REDUCED) st.pose = FR.work[0];
    } else if (sv) {
      st.x = sv.x * vw(); st.y = sv.y * vh(); keepIn();
      begin(Idle(rand(1600, 2600), true));
    } else {                                                  // arrives running in from the right
      st.x = vw() + charW; st.y = laneY(); keepIn(); st.x = vw() + charW;
      begin(REDUCED ? null : Seq([function () { return Move(vw() * .78, true); }, function () { return Pose(FR.jump[1], 1200, 'wave', 'interacting', ['hearts', 'Namaste!']); }], 'arrive'));
      if (REDUCED) { st.x = vw() - charW; begin(choose()); }
    }
    rugX = st.x; rugY = st.y;
    ready = true;
    if (REDUCED && st.pin === 'lotus') st.pose = FR.work[0];
    requestAnimationFrame(loop);
  };
  /* read-only status, handy for debugging: MXShreya.status() */
  window.MXShreya = { status: function () { return { activity: act && act.name, state: act && act.state, x: Math.round(st.x), y: Math.round(st.y), place: st.pin === 'lotus' ? 'lotus' : st.pin ? 'rope' : 'free' }; } };
  img.src = 'assets/maximal/shreya-sprites-keyed.webp';
  window.addEventListener('resize', function () { layout(); lastPose = null; if (st.pin !== 'lotus') keepIn(); });
})();
