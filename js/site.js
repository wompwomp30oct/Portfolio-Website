/* =====================================================================
   KAGAZ & CHIAROSCURO — shared behaviour
   Everything here is progressive: without JS the pages still read,
   the motion classes simply never arm (see `.js` gate in kagaz.css).
   ===================================================================== */

/* ---- edit these once; every [data-email] / [data-social] fills from here */
var SITE = {
  name: 'Shreya Tiwari',
  email: 'hello@yourname.in',              // TODO: replace with the real address
  instagram: 'https://instagram.com/',      // TODO
  pinterest: 'https://pinterest.com/',      // TODO
  behance: 'https://behance.net/'           // TODO
};

(function () {
  'use strict';

  var doc = document.documentElement;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WORKS = window.WORKS || [];
  var SERIES = window.SERIES || {};

  /* ------------------------------------------------------------ helpers */
  var DEVA = '०१२३४५६७८९';
  function deva(n, pad) {
    var s = String(n); if (pad) while (s.length < pad) s = '0' + s;
    return s.replace(/\d/g, function (d) { return DEVA[d]; });
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(d, long) {
    if (!d) return 'n.d.';
    var p = d.split('-');
    return long ? (+p[2]) + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0] : p[2] + '.' + p[1] + '.' + p[0].slice(2);
  }
  function deva_date(d) {
    if (!d) return '';
    var p = d.split('-'); return deva(p[2]) + ' ' + deva(p[1]) + ' ' + deva(p[0].slice(2));
  }
  function img(slug) { return 'assets/img/' + slug + '.jpg'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function bySlug(s) { for (var i = 0; i < WORKS.length; i++) if (WORKS[i].slug === s) return WORKS[i]; return null; }
  function ratio(w, h) {
    var r = w / h;
    var known = [[1, '1:1'], [3 / 4, '3:4'], [4 / 3, '4:3'], [9 / 16, '9:16'], [16 / 9, '16:9'], [3 / 2, '3:2'], [2 / 3, '2:3'], [4 / 5, '4:5'], [5 / 3, '5:3']];
    var best = known[0], diff = 9;
    known.forEach(function (k) { var d = Math.abs(k[0] - r); if (d < diff) { diff = d; best = k; } });
    return diff < .04 ? best[1] : r.toFixed(2) + ':1';
  }
  function idx(n) { return '<span class="idx"><span class="deva">' + deva(n, 2) + '</span><span>/ ' + pad2(n) + '</span></span>'; }
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* expose for inline page scripts */
  window.KZ = { deva: deva, fmtDate: fmtDate, img: img, idx: idx, bySlug: bySlug };

  /* ------------------------------------------- duotone SVG filter (§10) */
  /* maps luminance onto Courtyard Emerald (#0D261F) → Kagaz Cream (#F4EFE1) */
  var svg = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="duo-courtyard" color-interpolation-filters="sRGB">' +
    '<feColorMatrix type="matrix" values=".1926 .6480 .0654 0 .051  .1675 .5636 .0569 0 .149  .1616 .5436 .0549 0 .122  0 0 0 1 0"/>' +
    '<feComponentTransfer><feFuncR type="gamma" exponent="1.15"/><feFuncG type="gamma" exponent="1.15"/><feFuncB type="gamma" exponent="1.15"/></feComponentTransfer></filter></svg>';
  document.body.insertAdjacentHTML('afterbegin', svg);

  /* ------------------------------------------------- site-wide config */
  $$('[data-email]').forEach(function (el) {
    if (el.tagName === 'A') el.href = 'mailto:' + SITE.email;
    var t = $('[data-email-text]', el) || (el.hasAttribute('data-email-text') ? el : null);
    if (t) t.textContent = SITE.email;
  });
  $$('[data-social]').forEach(function (a) { var k = a.getAttribute('data-social'); if (SITE[k]) a.href = SITE[k]; });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $$('[data-count]').forEach(function (el) {
    var k = el.getAttribute('data-count');
    var n = k === 'all' ? WORKS.length : WORKS.filter(function (w) { return w.series === k; }).length;
    el.textContent = el.hasAttribute('data-deva') ? deva(n, 2) : pad2(n);
  });

  /* copy-to-clipboard on the big email button (still a mailto without JS) */
  $$('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (!navigator.clipboard) return;
      e.preventDefault();
      navigator.clipboard.writeText(SITE.email).then(function () {
        var note = $('.copy-note');
        if (note) { note.textContent = '● Copied to clipboard — or use your mail app'; setTimeout(function () { note.textContent = ''; }, 3200); }
      }, function () { location.href = 'mailto:' + SITE.email; });
    });
  });

  /* --------------------------------------------------------------- nav */
  var toggle = $('.nav__toggle'), sheet = $('.sheet');
  function setSheet(open) {
    if (!toggle || !sheet) return;
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelector('.lbl').textContent = open ? 'Close' : 'Index';
    sheet.classList.toggle('is-open', open);
    sheet.toggleAttribute('inert', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && sheet) {
    sheet.setAttribute('inert', '');
    toggle.addEventListener('click', function () { setSheet(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setSheet(false); });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (m) { if (m.matches) setSheet(false); });
  }

  /* ---------------------------------------------------------- IST clock */
  var clocks = $$('[data-ist]');
  if (clocks.length) {
    var tick = function () {
      var t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
      clocks.forEach(function (c) { c.textContent = t + ' IST'; });
    };
    tick(); setInterval(tick, 1000);
  }

  /* ================================================== RENDERERS (data) */

  function card(w, opts) {
    opts = opts || {};
    var s = SERIES[w.series] || {};
    return '<a class="card" href="plate.html?w=' + w.slug + '" data-series="' + w.series + '">' +
      '<div class="mat' + (opts.duo ? ' duo' : '') + '"><div class="mat__win wipe"' + (opts.ratio ? ' style="aspect-ratio:' + opts.ratio + '"' : ' style="aspect-ratio:' + w.w + '/' + w.h + '"') + '>' +
      '<img src="' + img(w.slug) + '" alt="' + esc(w.title) + ' — ' + esc(w.note) + '" loading="lazy" decoding="async" width="' + w.w + '" height="' + w.h + '"></div></div>' +
      '<div class="card__meta"><span class="card__title">' + esc(w.title) + '</span>' + idx(w.n) +
      '<span class="card__sub mono-s">' + esc(s.name || '') + ' · ' + fmtDate(w.date) + '</span></div></a>';
  }

  function ledgerRows(list) {
    return list.map(function (w) {
      var s = SERIES[w.series] || {};
      return '<tr data-series="' + w.series + '">' +
        '<td class="l-date">' + fmtDate(w.date) + '</td>' +
        '<td class="l-thumb"><img src="' + img(w.slug) + '" alt="" loading="lazy"></td>' +
        '<td class="l-title"><a href="plate.html?w=' + w.slug + '">' + esc(w.title) + '</a><div class="mono-s muted" style="margin-top:6px">' + deva(w.n, 2) + ' / ' + pad2(w.n) + '</div></td>' +
        '<td class="l-series mono-s">' + esc(s.name || '') + '</td></tr>';
    }).join('');
  }

  /* ---- homepage: series index thumbs, film strip, year ledger */
  $$('[data-series-thumbs]').forEach(function (el) {
    var k = el.getAttribute('data-series-thumbs');
    el.innerHTML = WORKS.filter(function (w) { return w.series === k; }).slice(-3).map(function (w) {
      return '<span><img src="' + img(w.slug) + '" alt="" loading="lazy"></span>';
    }).join('');
  });

  var film = $('[data-film]');
  if (film) {
    var k = film.getAttribute('data-film');
    film.innerHTML = WORKS.filter(function (w) { return w.series === k; }).map(function (w) {
      return '<a class="film__frame" href="plate.html?w=' + w.slug + '"><figure>' +
        '<div class="mat duo"><div class="mat__win"><img src="' + img(w.slug) + '" alt="' + esc(w.title) + '" loading="lazy" draggable="false"></div></div>' +
        '<figcaption class="mono-s"><span>' + esc(w.title) + '</span><span>' + deva(w.n, 2) + ' · ' + fmtDate(w.date) + '</span></figcaption></figure></a>';
    }).join('');
    initFilm(film);
  }

  var years = $('[data-years]');
  if (years) {
    var groups = {};
    WORKS.forEach(function (w) { var y = w.date ? w.date.slice(0, 4) : 'n.d.'; (groups[y] = groups[y] || []).push(w); });
    years.innerHTML = Object.keys(groups).sort(function (a, b) { return a === 'n.d.' ? 1 : b === 'n.d.' ? -1 : b - a; }).map(function (y) {
      var g = groups[y];
      return '<div class="year rise"><span class="year__y">' + (y === 'n.d.' ? 'Undated' : y) + '</span>' +
        '<span class="mono muted">' + deva(g.length, 2) + ' / ' + pad2(g.length) + ' plates</span>' +
        '<span class="year__list">' + g.map(function (w) { return '<a href="plate.html?w=' + w.slug + '">' + esc(w.title) + '</a>'; }).join('') + '</span>' +
        '<a class="link" href="archive.html">Ledger <span class="arr">→</span></a></div>';
    }).join('');
  }

  /* ---- archive page */
  var masonry = $('[data-archive]');
  if (masonry) {
    var holder = document.createElement('div');
    holder.innerHTML = WORKS.map(function (w) { return card(w); }).join('');
    var cards = $$('.card', holder);

    /* shortest-column placement from known aspect ratios: no measuring,
       and plates still read left→right in archive order */
    var colsFor = function () { var vw = window.innerWidth; return vw < 768 ? 2 : vw < 1100 ? 3 : 4; };
    var lastCols = 0;
    var layout = function (force) {
      var n = colsFor();
      if (n === lastCols && !force) return;
      lastCols = n;
      var cols = [], hts = [];
      for (var c = 0; c < n; c++) { var d = document.createElement('div'); d.className = 'm-col'; cols.push(d); hts.push(0); }
      cards.forEach(function (el) {
        if (el.hidden) { cols[0].appendChild(el); return; }
        var w = bySlug(el.getAttribute('href').split('w=')[1]);
        var k = hts.indexOf(Math.min.apply(null, hts));
        cols[k].appendChild(el);
        hts[k] += w.h / w.w + .28;               // image + caption block, in column widths
      });
      masonry.innerHTML = '';
      cols.forEach(function (d) { masonry.appendChild(d); });
    };
    var rT; window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { layout(false); }, 150); });

    var ledgerBody = $('[data-ledger]');
    if (ledgerBody) ledgerBody.innerHTML = ledgerRows(WORKS);

    var bar = $('.filters');
    var keys = ['all'].concat(Object.keys(SERIES));
    bar.innerHTML = keys.map(function (k) {
      var n = k === 'all' ? WORKS.length : WORKS.filter(function (w) { return w.series === k; }).length;
      return '<button type="button" data-filter="' + k + '" aria-pressed="false">' + (k === 'all' ? 'All' : SERIES[k].name) + ' <span class="c">' + pad2(n) + '</span></button>';
    }).join('');

    var status = $('[data-filter-status]');
    var apply = function (k, push) {
      if (keys.indexOf(k) < 0) k = 'all';
      $$('button', bar).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === k); });
      var shown = 0;
      cards.concat($$('tr', ledgerBody || document.createElement('tbody'))).forEach(function (el) {
        var on = k === 'all' || el.getAttribute('data-series') === k;
        el.hidden = !on; if (on && el.classList.contains('card')) shown++;
      });
      layout(true);
      var desc = $('[data-series-desc]');
      if (desc) {
        desc.innerHTML = k === 'all'
          ? 'Everything, oldest dated plate first. Undated pieces sit at the end.'
          : '<span class="deva" style="color:var(--accent-sindoor);font-size:1.3em">' + SERIES[k].deva + '</span> <span class="mono-s muted">' + esc(SERIES[k].gloss) + '</span><br>' + esc(SERIES[k].desc);
      }
      if (status) status.textContent = shown + ' plates shown';
      if (push) history.replaceState(null, '', k === 'all' ? location.pathname : '#' + k);
      armReveals(masonry);
    };
    bar.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) apply(b.getAttribute('data-filter'), true); });
    apply((location.hash || '#all').slice(1), false);
    window.addEventListener('hashchange', function () { apply(location.hash.slice(1), false); });

    var vt = $('.view-toggle');
    if (vt) vt.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var v = b.getAttribute('data-view');
      $$('button', vt).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      $('[data-view-grid]').hidden = v !== 'grid';
      $('[data-view-ledger]').hidden = v !== 'ledger';
      try { localStorage.setItem('kz-view', v); } catch (_) {}
    });
    try { var saved = localStorage.getItem('kz-view'); if (saved === 'ledger') $('[data-view="ledger"]', vt).click(); } catch (_) {}
  }

  /* ---- plate (case study) page */
  var cs = $('[data-plate]');
  if (cs) {
    var slug = new URLSearchParams(location.search).get('w');
    var w = bySlug(slug) || WORKS[WORKS.length - 3];
    var s = SERIES[w.series];
    var i = WORKS.indexOf(w);
    var prev = WORKS[(i - 1 + WORKS.length) % WORKS.length], next = WORKS[(i + 1) % WORKS.length];
    var wide = w.w / w.h > 1.25;

    document.title = w.title + ' — Plate ' + pad2(w.n) + ' · ' + SITE.name;
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', w.note);

    $('[data-cs-crumbs]').innerHTML =
      '<a class="mono-s" href="archive.html">← The Archive</a>' +
      '<span class="mono-s"><a href="archive.html#' + w.series + '">' + esc(s.name) + '</a> · Plate ' + deva(w.n, 2) + ' / ' + pad2(w.n) + ' of ' + pad2(WORKS.length) + '</span>';

    var media = $('[data-cs-media]');
    if (wide) media.classList.add('is-wide');
    /* the frame narrows until the whole plate fits one screen, so tall
       plates never letterbox and never need scrolling to see whole */
    var fit = 'max-width:calc((100svh - var(--nav-h) - 190px) * ' + (w.w / w.h).toFixed(4) + ' + 40px)';
    media.innerHTML = '<div class="mat mat--shadow" style="' + fit + '"><div class="mat__win wipe" style="aspect-ratio:' + w.w + '/' + w.h + '">' +
      '<img src="' + img(w.slug) + '" alt="' + esc(w.title) + ' — ' + esc(w.note) + '" width="' + w.w + '" height="' + w.h + '"></div>' +
      (w.date ? '<span class="stamp cs-stamp" lang="hi" aria-hidden="true">' + deva_date(w.date) + '</span>' : '') +
      '<div class="mat__cap mono-s"><span>' + esc(w.title) + '</span><span>' + fmtDate(w.date, true) + '</span></div></div>';

    $('[data-cs-side]').innerHTML =
      '<div class="cs-side__head">' +
        '<span class="idx idx--big"><span class="deva">' + deva(w.n, 2) + '</span><span>/ ' + pad2(w.n) + '</span></span>' +
        '<h1 class="brutal">' + esc(w.title) + '</h1>' +
        '<p class="lede">' + esc(w.note) + '</p>' +
      '</div><div class="cs-side__body">' +
        '<dl class="spec">' +
          '<dt>Date</dt><dd>' + fmtDate(w.date, true) + (w.date ? ' <span class="deva" style="color:var(--accent-haldi);margin-left:6px">' + deva_date(w.date) + '</span>' : '') + '</dd>' +
          '<dt>Series</dt><dd><a href="archive.html#' + w.series + '" style="text-decoration:none">' + esc(s.name) + '</a> <span class="deva" style="color:var(--accent-haldi)">' + s.deva + '</span></dd>' +
          '<dt>Format</dt><dd>' + ratio(w.w, w.h) + ' · ' + w.w + ' × ' + w.h + ' px</dd>' +
          '<dt>Medium</dt><dd>Phone edit, Picsart</dd>' +
        '</dl>' +
        '<div class="tags">' + w.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>';

    /* detail strips: the same image cropped into 3:1 film-strip bands */
    var strips = $('[data-cs-strips]');
    strips.innerHTML = ['18%', '52%', '84%'].map(function (pos, k) {
      return '<figure class="mat"><div class="mat__win wipe"><img src="' + img(w.slug) + '" alt="" loading="lazy" style="object-position:50% ' + pos + '"></div>' +
        '<figcaption class="mat__cap mono-s"><span>Detail ' + deva(k + 1, 2) + ' / ' + pad2(k + 1) + '</span><span>Crop at ' + pos + '</span></figcaption></figure>';
    }).join('');
    $('[data-cs-series]').innerHTML = '<span class="deva" style="color:var(--accent-sindoor);font-size:1.6rem">' + s.deva + '</span><br><span class="mono-s muted">' + esc(s.gloss) + '</span>';
    $('[data-cs-series-desc]').textContent = s.desc;

    $('[data-cs-pn]').innerHTML =
      '<a href="plate.html?w=' + prev.slug + '"><span class="mono-s muted">← Previous · ' + deva(prev.n, 2) + ' / ' + pad2(prev.n) + '</span><span class="display-s">' + esc(prev.title) + '</span></a>' +
      '<a href="plate.html?w=' + next.slug + '"><span class="mono-s muted">Next · ' + deva(next.n, 2) + ' / ' + pad2(next.n) + ' →</span><span class="display-s">' + esc(next.title) + '</span></a>';

    var rel = WORKS.filter(function (x) { return x.series === w.series && x !== w; }).slice(0, 3);
    $('[data-cs-related]').innerHTML = rel.map(function (x) { return card(x, { duo: true, ratio: '4/5' }); }).join('');
    $('[data-cs-related-title]').textContent = 'More ' + s.name;
  }

  /* ======================================================= FILM STRIP */
  function initFilm(track) {
    var wrap = track.closest('[data-film-wrap]') || document;
    var step = function () { var f = $('.film__frame', track); return f ? f.getBoundingClientRect().width + 18 : 300; };
    $$('[data-film-prev]', wrap).forEach(function (b) { b.addEventListener('click', function () { track.scrollBy({ left: -step() * 2, behavior: REDUCED ? 'auto' : 'smooth' }); }); });
    $$('[data-film-next]', wrap).forEach(function (b) { b.addEventListener('click', function () { track.scrollBy({ left: step() * 2, behavior: REDUCED ? 'auto' : 'smooth' }); }); });

    /* mouse drag-to-scroll; touch and trackpads already scroll natively */
    var down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-drag'); }
      track.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () { down = false; track.classList.remove('is-drag'); });
    track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  /* ========================================================== MOTION */
  /* A fully clipped .wipe has zero visible area, and IntersectionObserver
     honours the target's own clip-path — so wipes are watched through
     their parent and revealed when that enters the viewport. */
  var watched = new Map();
  var io = ('IntersectionObserver' in window) && !REDUCED ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      (watched.get(en.target) || []).forEach(function (el) { el.classList.add('is-in'); });
      watched.delete(en.target); io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;

  function armReveals(root) {
    $$('.wipe:not(.is-in), .rise:not(.is-in), .lines:not(.is-in)', root).forEach(function (el) {
      if (!io || el.offsetParent === null) { el.classList.add('is-in'); return; }
      var t = el.classList.contains('wipe') ? el.parentElement : el;
      if (!watched.has(t)) { watched.set(t, []); io.observe(t); }
      if (watched.get(t).indexOf(el) < 0) watched.get(t).push(el);
    });
  }
  doc.classList.add('js');
  armReveals(document);

  /* subtle 10–15% parallax on matted photography only (§12) */
  var px = $$('[data-parallax]');
  if (px.length && !REDUCED) {
    var ticking = false;
    var run = function () {
      var vh = window.innerHeight;
      px.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var amt = parseFloat(el.getAttribute('data-parallax')) || .12;
        var c = (r.top + r.height / 2 - vh / 2) / vh;      // −1 … 1 around viewport centre
        el.style.transform = 'translate3d(0,' + (c * amt * -100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* ---- page turn: a Kagaz sheet covers the old page, lifts off the new */
  var curtain = $('.curtain');
  /* lift on the second frame so the wipe animates; the timer is the
     safety net for background/throttled tabs where rAF never fires */
  var ready = function () { doc.classList.add('is-ready'); };
  requestAnimationFrame(function () { requestAnimationFrame(ready); });
  setTimeout(ready, 120);
  window.addEventListener('pageshow', function (e) { if (e.persisted) { doc.classList.remove('is-leaving'); doc.classList.add('is-ready'); } });
  if (curtain && !REDUCED) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
      var href = a.getAttribute('href');
      if (!/\.html(\?|#|$)/.test(href) || /^https?:/.test(href)) return;
      var url = new URL(a.href, location.href);
      if (url.pathname === location.pathname && url.search === location.search) return;   // same doc (hash only)
      e.preventDefault();
      var lbl = $('.curtain__label', curtain);
      if (lbl) {
        var m = url.search.match(/w=([^&]+)/), w = m && bySlug(m[1]);
        lbl.innerHTML = w ? '<span class="deva">' + deva(w.n, 2) + '</span><span class="mono">Plate ' + pad2(w.n) + ' · ' + esc(w.title) + '</span>'
                          : '<span class="deva">श्रे</span><span class="mono">Turning the page…</span>';
      }
      doc.classList.add('is-leaving');
      setTimeout(function () { location.href = a.href; }, 400);
    });
  }
})();
