/* Adas Körper-Atlas – Grafik-Grundsystem
   Gemeinsame Verläufe, Filter (Schatten, Leuchten, Einfärben) und Zeichenhilfen für alle Grafiken.
   Der Platzhalter {P} wird pro Grafik durch ein eindeutiges Präfix ersetzt (svgString in app.js),
   damit mehrere Grafiken auf einer Seite sich nicht gegenseitig die IDs wegnehmen.
   Regel: Teile-Gruppen (class="part") tragen nie selbst ein filter-Attribut – das ist für die Markierung reserviert. */
(function (A) {
  'use strict';
  var G = A.G = {};
  A.diagramme = A.diagramme || {};
  var seq = 0;

  /* ---------- Grundbausteine ---------- */
  function uid(k) { return '{P}' + (k || 'u') + (++seq).toString(36); }
  function f(v) { return String(Math.round(v * 100) / 100); }
  function pt(p) { return f(p[0]) + ',' + f(p[1]); }
  function ext(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; if (b) for (k in b) o[k] = b[k]; return o; }
  function attrs(o) { var s = '', k; if (o) for (k in o) if (o[k] != null && o[k] !== false) s += ' ' + k + '="' + o[k] + '"'; return s; }
  function path(d, o) { return '<path d="' + d + '"' + attrs(o) + '/>'; }
  function ell(cx, cy, rx, ry, o) { return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '"' + attrs(o) + '/>'; }
  function circ(cx, cy, r, o) { return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '"' + attrs(o) + '/>'; }
  function rect(x, y, w, h, rx, o) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '"' + (rx ? ' rx="' + f(rx) + '"' : '') + attrs(o) + '/>'; }
  function g(inner, o) { return '<g' + attrs(o) + '>' + inner + '</g>'; }
  function text(x, y, t, o) { return '<text x="' + f(x) + '" y="' + f(y) + '"' + attrs(o) + '>' + t + '</text>'; }
  function part(id, inner, extra) { return '<g class="part" data-part="' + id + '"' + (extra || '') + '>' + inner + '</g>'; }
  function H(d, w) { return '<path class="hit" d="' + d + '" stroke-width="' + w + '"/>'; }
  function HR(x, y, w, h) { return '<rect class="hitr" x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '"/>'; }
  var DEFS = /<(clipPath|linearGradient|radialGradient|filter|mask|pattern|marker)\b[\s\S]*?<\/\1>/g;
  function mirror(frag, cx, strip) { return '<g transform="matrix(-1 0 0 1 ' + f(2 * (cx == null ? 150 : cx)) + ' 0)">' + (strip ? frag.replace(DEFS, '') : frag) + '</g>'; }
  // Spiegelbild: Definitionen (Clip, Verlauf) stehen nur einmal; der Spiegel benutzt sie im eigenen Koordinatensystem mit.
  function both(frag, cx) { return frag + mirror(frag, cx, true); }

  /* ---------- Kurven ---------- */
  function bez(P, t) {
    var u = 1 - t;
    return [u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
      u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]];
  }
  function bezD(P) { return 'M' + pt(P[0]) + ' C' + pt(P[1]) + ' ' + pt(P[2]) + ' ' + pt(P[3]); }
  // Bézier bei t teilen (de Casteljau) → [vorderer Teil, hinterer Teil]
  function bezSplit(P, t) {
    function l(a, b) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
    var a = l(P[0], P[1]), b = l(P[1], P[2]), c = l(P[2], P[3]), d = l(a, b), e = l(b, c), m = l(d, e);
    return [[P[0], a, d, m], [m, e, c, P[3]]];
  }
  // weiche Kurve durch Punkte (Catmull-Rom → Bézier)
  function smooth(pts, closed) {
    var n = pts.length, d = 'M' + pt(pts[0]), i;
    for (i = 0; i < n - 1 + (closed ? 1 : 0); i++) {
      var p0 = pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = pts[i % n], p2 = pts[(i + 1) % n], p3 = pts[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
      d += ' C' + pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]) + ' ' + pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]) + ' ' + pt(p2);
    }
    return d + (closed ? ' Z' : '');
  }
  // symmetrische Umrisse: linke Hälfte von der Mitte oben bis zur Mitte unten, rechts wird gespiegelt
  function sym(x0, y0, segs, cx) {
    cx = cx == null ? 150 : cx;
    var d = 'M' + f(x0) + ',' + f(y0), i;
    for (i = 0; i < segs.length; i++) d += ' C' + segs[i].map(f).join(',');
    for (i = segs.length - 1; i >= 0; i--) {
      var s = segs[i], p = i ? segs[i - 1].slice(4) : [x0, y0];
      d += ' C' + f(2 * cx - s[2]) + ',' + f(s[3]) + ' ' + f(2 * cx - s[0]) + ',' + f(s[1]) + ' ' + f(2 * cx - p[0]) + ',' + f(p[1]);
    }
    return d + ' Z';
  }
  // Ellipse als Pfad (für Löcher mit evenodd)
  function ellPath(cx, cy, rx, ry, rot) {
    var a = (rot || 0) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), k = 0.5523;
    function P(x, y) { return pt([cx + x * c - y * s, cy + x * s + y * c]); }
    return 'M' + P(rx, 0) + ' C' + P(rx, ry * k) + ' ' + P(rx * k, ry) + ' ' + P(0, ry) + ' C' + P(-rx * k, ry) + ' ' + P(-rx, ry * k) + ' ' + P(-rx, 0) +
      ' C' + P(-rx, -ry * k) + ' ' + P(-rx * k, -ry) + ' ' + P(0, -ry) + ' C' + P(rx * k, -ry) + ' ' + P(rx, -ry * k) + ' ' + P(rx, 0) + ' Z';
  }
  // gefüllte Form entlang einer Bézier-Kurve (Knochenschaft, Muskelbauch, Schlauch): Breite w0 → w1, bulge > 0 Bauch, < 0 Taille
  function limb(P, w0, w1, bulge) {
    var N = 12, L = [], R = [], ax = [], i;
    for (i = 0; i <= N; i++) {
      var t = i / N, p = bez(P, t), a = bez(P, Math.max(0, t - 0.02)), b = bez(P, Math.min(1, t + 0.02));
      var tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1, nx = -ty / l, ny = tx / l;
      var w = (w0 + (w1 - w0) * t) * (1 + (bulge || 0) * Math.sin(Math.PI * t)) / 2;
      L.push([p[0] + nx * w, p[1] + ny * w]); R.push([p[0] - nx * w, p[1] - ny * w]); ax.push(p);
    }
    var t0 = [ax[1][0] - ax[0][0], ax[1][1] - ax[0][1]], t1 = [ax[N][0] - ax[N - 1][0], ax[N][1] - ax[N - 1][1]];
    var l0 = Math.hypot(t0[0], t0[1]) || 1, l1 = Math.hypot(t1[0], t1[1]) || 1;
    var c1 = [ax[N][0] + t1[0] / l1 * w1 * 0.42, ax[N][1] + t1[1] / l1 * w1 * 0.42], c0 = [ax[0][0] - t0[0] / l0 * w0 * 0.42, ax[0][1] - t0[1] / l0 * w0 * 0.42];
    return { d: smooth(L.concat([c1], R.reverse(), [c0]), true), axis: ax };
  }
  // Band entlang beliebiger Punkte, Breite wf(s) mit s = 0…1 (Spirale, Darmschlinge)
  function ribbon(pts, wf) {
    var n = pts.length, L = [], R = [];
    for (var i = 0; i < n; i++) {
      var a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1, nx = -ty / l, ny = tx / l, w = wf(i / (n - 1)) / 2;
      L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); R.push([pts[i][0] - nx * w, pts[i][1] - ny * w]);
    }
    return smooth(L.concat(R.reverse()), true);
  }
  // reproduzierbarer Zufall (gleiches Bild bei jedem Laden)
  function rnd(seed) { var s = seed || 1; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function bbox(d) {
    var n = d.match(/-?\d*\.?\d+/g).map(Number), b = [1e9, 1e9, -1e9, -1e9];
    for (var i = 0; i + 1 < n.length; i += 2) { b[0] = Math.min(b[0], n[i]); b[1] = Math.min(b[1], n[i + 1]); b[2] = Math.max(b[2], n[i]); b[3] = Math.max(b[3], n[i + 1]); }
    return b;
  }

  /* ---------- Farben ---------- */
  var C = G.C = {
    bone: '#7B6648', boneB: '#9A8667', cart: '#7E99B2', mus: '#8A2A24', ten: '#A3927A', skin: '#B9876C', skinD: '#9E6E55',
    ink: '#1E2433', red: '#C62A3A', blue: '#3157B8'
  };
  // Röhren in Schichten: Umriss, Schatten, Mitte, Licht, Glanz
  var PAL = G.PAL = {
    bone: ['#7B6648', '#D3BF99', '#E8DCC2', '#F7F0E1', '#FFFFFF'],
    boneB: ['#A08D70', '#D2C5AC', '#DDD2BD', '#E8E0CF', '#F3EFE6'],
    cart: ['#7E99B2', '#BFD3E4', '#D8E6F1', '#EEF5FA', '#FFFFFF'],
    mus: ['#7E2622', '#C2443A', '#D85C4F', '#EC8677', '#FFC6BC'],
    ten: ['#A3927A', '#E3D7C1', '#EFE7D8', '#FAF6EE', '#FFFFFF'],
    art: ['#6E0D1B', '#B91C2C', '#D9333F', '#EE6B74', '#FFC2C6'],
    ven: ['#18295E', '#2B4DA6', '#406AC4', '#7194DC', '#C6D5F5'],
    si: ['#9A4B41', '#DE8C7C', '#EDA898', '#F7C9BE', '#FFEDE8'],
    col: ['#86502B', '#CC9161', '#DDAA7D', '#EECBA6', '#FBEBDA'],
    eso: ['#93463B', '#D9786A', '#E9978A', '#F6BFB4', '#FFE7E2'],
    nerve: ['#8E6A0C', '#E0B431', '#EFCB55', '#F8E191', '#FFF7D6'],
    air: ['#5B82A8', '#B3CDE6', '#CCDFF0', '#E5EFF8', '#FFFFFF'],
    sweat: ['#2E6DA6', '#69A9DE', '#86BDE8', '#B6D8F3', '#EAF5FF'],
    hair: ['#2B1A10', '#4A3022', '#5E3E2C', '#7C5640', '#A27E66'],
    teal: ['#0B5F57', '#139486', '#21AB9C', '#5CCDBF', '#C9F3EE'],
    lab: ['#5E4690', '#B19ADA', '#C7B5E8', '#E2D7F5', '#FFFFFF']
  };
  function pal(p) { return typeof p === 'string' ? PAL[p] : (p || PAL.bone); }
  // plastische Röhre aus Strichschichten (spiegelsicher: Licht von vorn)
  function tube(d, w, p, o) {
    p = pal(p);
    var s = '<g fill="none" stroke-linecap="round" stroke-linejoin="round"' + attrs(o) + '>' +
      '<path d="' + d + '" stroke="' + p[0] + '" stroke-width="' + f(w + 1.7) + '"/>' +
      '<path d="' + d + '" stroke="' + p[1] + '" stroke-width="' + f(w) + '"/>' +
      '<path d="' + d + '" stroke="' + p[2] + '" stroke-width="' + f(w * 0.7) + '"/>' +
      '<path d="' + d + '" stroke="' + p[3] + '" stroke-width="' + f(w * 0.38) + '"/>';
    if (w >= 2.6) s += '<path d="' + d + '" stroke="' + p[4] + '" stroke-opacity=".8" stroke-width="' + f(w * 0.12) + '"/>';
    return s + '</g>';
  }
  // Glanzlinie entlang einer Achse (Punkte aus limb)
  function shine(ax, w, op) {
    var a = ax.slice(2, ax.length - 2);
    return a.length > 1 ? path(smooth(a), { fill: 'none', stroke: '#FFFFFF', 'stroke-opacity': op || 0.55, 'stroke-width': f(w * 0.2), 'stroke-linecap': 'round' }) : '';
  }
  // Vereinigung: erst alle Umrisse, dann alle Füllungen – innen keine Kanten, außen eine saubere Kontur
  function union(pieces, stroke, sw) {
    var a = '', b = '';
    pieces.forEach(function (q) {
      var o = { fill: q.fill || 'url(#{P}gBoneR)' };
      var el = q.d ? function (oo) { return path(q.d, oo); } : function (oo) { return ell(q.e[0], q.e[1], q.e[2], q.e[3], ext(oo, q.e[4] ? { transform: 'rotate(' + q.e[4] + ' ' + f(q.e[0]) + ' ' + f(q.e[1]) + ')' } : null)); };
      a += el(ext(o, { stroke: stroke || C.bone, 'stroke-width': sw || 0.9, 'stroke-linejoin': 'round' }));
      b += el(o);
    });
    return a + b;
  }
  // Fasern (Muskel, Bindegewebe) – auf die Form zugeschnitten
  function fibers(d, o) {
    o = o || {};
    var id = uid('c'), b = bbox(d), lines = '', i;
    var cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2, R = Math.hypot(b[2] - b[0], b[3] - b[1]) / 2 + 2;
    if (o.focus) { // Fächer
      var n = o.n || 14;
      for (i = 0; i <= n; i++) {
        var a = (o.a0 + (o.a1 - o.a0) * i / n) * Math.PI / 180;
        lines += 'M' + pt(o.focus) + ' L' + pt([o.focus[0] + Math.cos(a) * (o.len || 2 * R), o.focus[1] + Math.sin(a) * (o.len || 2 * R)]) + ' ';
      }
    } else if (o.spindle) { // spindelförmig von Ursprung zu Ansatz
      var P0 = o.spindle[0], P1 = o.spindle[1], ux = P1[0] - P0[0], uy = P1[1] - P0[1], L = Math.hypot(ux, uy) || 1, nx = -uy / L, ny = ux / L, k = o.n || 7, hw = o.hw || 8;
      for (i = -k; i <= k; i++) {
        var q = i / k;
        lines += 'M' + pt([P0[0] + nx * q * hw * 0.15, P0[1] + ny * q * hw * 0.15]) + ' Q' + pt([(P0[0] + P1[0]) / 2 + nx * q * hw * 1.25, (P0[1] + P1[1]) / 2 + ny * q * hw * 1.25]) + ' ' + pt([P1[0] + nx * q * hw * 0.15, P1[1] + ny * q * hw * 0.15]) + ' ';
      }
    } else { // parallel
      var ang = (o.ang == null ? 90 : o.ang) * Math.PI / 180, ux2 = Math.cos(ang), uy2 = Math.sin(ang), gap = o.gap || 2.3;
      for (var t = -R; t <= R; t += gap) {
        var px = cx - uy2 * t, py = cy + ux2 * t;
        lines += 'M' + pt([px - ux2 * R, py - uy2 * R]) + ' L' + pt([px + ux2 * R, py + uy2 * R]) + ' ';
      }
    }
    return '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath>' +
      '<path d="' + lines + '" clip-path="url(#' + id + ')" fill="none" stroke="' + (o.col || '#FFD3C9') + '" stroke-opacity="' + (o.op || 0.5) + '" stroke-width="' + (o.w || 0.65) + '" stroke-linecap="round"/>';
  }
  // Muskel: Verlauf + Fasern + Kontur (+ optional Glanz)
  function muscle(d, fib, o) {
    o = o || {};
    return path(d, { fill: o.fill || 'url(#{P}gMus)' }) + fibers(d, fib) +
      (o.shade !== false ? fibers(d, { ang: (fib && fib.ang != null ? fib.ang : 90), gap: 4.6, col: '#7A1E1A', op: 0.18, w: 0.9, focus: fib && fib.focus, a0: fib && fib.a0, a1: fib && fib.a1, n: fib && fib.n ? Math.round(fib.n / 2) : null, spindle: fib && fib.spindle, hw: fib && fib.hw }) : '') +
      path(d, { fill: 'none', stroke: o.stroke || C.mus, 'stroke-width': o.sw || 0.85, 'stroke-linejoin': 'round' });
  }
  // weicher Lichtfleck hinter einer Figur / Bodenschatten
  function spot(cx, cy, rx, ry) { return ell(cx, cy, rx, ry, { class: 'bgx', fill: 'url(#{P}gSpot)' }); }
  function ground(cx, cy, rx, ry) { return ell(cx, cy, rx, ry, { class: 'bgx', fill: 'url(#{P}gGround)' }); }
  // Glanzlicht (weiße, weiche Ellipse)
  function gloss(cx, cy, rx, ry, rot, op) { return ell(cx, cy, rx, ry, { fill: 'url(#{P}gGloss)', opacity: op == null ? 0.8 : op, transform: rot ? 'rotate(' + rot + ' ' + f(cx) + ' ' + f(cy) + ')' : null }); }
  // Pfeilspitze als Pfad (ohne marker – sicher in allen Browsern)
  function arrowHead(x, y, ang, s, col) {
    var a = ang * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
    function P(px, py) { return pt([x + px * c - py * sn, y + px * sn + py * c]); }
    return path('M' + P(0, 0) + ' L' + P(-s, -s * 0.62) + ' Q' + P(-s * 0.72, 0) + ' ' + P(-s, s * 0.62) + ' Z', { fill: col });
  }

  /* ---------- Definitionen (pro Grafik einmal) ---------- */
  function stops(a) { return a.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join(''); }
  function lg(id, st, x1, y1, x2, y2) { return '<linearGradient id="{P}' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '">' + stops(st) + '</linearGradient>'; }
  function rg(id, st, cx, cy, r, fx, fy) { return '<radialGradient id="{P}' + id + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"' + (fx != null ? ' fx="' + fx + '" fy="' + fy + '"' : '') + '>' + stops(st) + '</radialGradient>'; }
  function cyl(id, a, b, c, vertical) { return lg(id, [[0, a], [0.24, b], [0.5, c], [0.76, b], [1, a]], 0, 0, vertical ? 0 : 1, vertical ? 1 : 0); }
  function hx(c) { return [parseInt(c.substr(1, 2), 16) / 255, parseInt(c.substr(3, 2), 16) / 255, parseInt(c.substr(5, 2), 16) / 255]; }
  function f3(v) { return String(Math.round(v * 1000) / 1000); }
  // Helligkeit → Farbverlauf (Licht und Schatten bleiben erhalten)
  function ramp(dark, light) {
    var a = hx(dark), b = hx(light), r = [];
    for (var i = 0; i < 3; i++) { var k = b[i] - a[i]; r.push(f3(k * 0.2126) + ' ' + f3(k * 0.7152) + ' ' + f3(k * 0.0722) + ' 0 ' + f3(a[i])); }
    return r.join(' ') + ' 0 0 0 1 0';
  }
  var BB = ' x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB"';
  function glowF(id, dark, light, glow, rad, blur) {
    return '<filter id="{P}' + id + '"' + BB + '>' +
      (dark ? '<feColorMatrix in="SourceGraphic" type="matrix" values="' + ramp(dark, light) + '" result="t"/>' : '') +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="' + f(rad || 1.5) + '" result="d"/><feGaussianBlur in="d" stdDeviation="' + f(blur || 2.6) + '" result="b"/>' +
      '<feFlood flood-color="' + glow + '"/><feComposite in2="b" operator="in" result="g"/>' +
      '<feMerge><feMergeNode in="g"/><feMergeNode in="g"/><feMergeNode in="' + (dark ? 't' : 'SourceGraphic') + '"/></feMerge></filter>';
  }
  function tintF(id, dark, light) {
    return '<filter id="{P}' + id + '" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="' + ramp(dark, light) + '"/></filter>';
  }
  G.TINT = { yellow: ['#A88300', '#FFF7BF'], violet: ['#3E1F7A', '#E9D9FF'], green: ['#1E6B2C', '#D6F7CF'], blue: ['#164C9A', '#D3E6FF'], red: ['#8A1414', '#FFC2BA'], stone: ['#6A645D', '#F4F1ED'] };

  var DEFCACHE = {};
  // k < 1: vergrößerter Ausschnitt – Leuchtrand entsprechend schmaler
  G.defs = function (k) {
    k = Math.round(Math.max(0.3, Math.min(1, k || 1)) * 100) / 100;
    if (DEFCACHE[k]) return DEFCACHE[k];
    var s = '';
    // Knochen
    s += lg('gBone', [[0, '#FFFDF7'], [0.5, '#F1E6CF'], [1, '#D6C29C']], 0, 0, 0, 1);
    s += lg('gBoneB', [[0, '#EDE5D5'], [1, '#C9B898']], 0, 0, 0, 1);
    s += cyl('gBoneH', '#C9B288', '#ECE1C9', '#FFFCF3');
    s += cyl('gBoneV', '#C9B288', '#ECE1C9', '#FFFCF3', true);
    s += rg('gBoneR', [[0, '#FFFFFB'], [0.55, '#F1E6CF'], [1, '#C8B086']], 0.5, 0.42, 0.62);
    s += rg('gFossa', [[0, '#C2AA7E', 0.75], [1, '#E9DCC0', 0]], 0.55, 0.45, 0.6);
    s += rg('gHole', [[0, '#21180F'], [0.6, '#433426'], [1, '#7A6447']], 0.5, 0.55, 0.6);
    s += lg('gTooth', [[0, '#FFFFFF'], [1, '#E2D8C4']], 0, 0, 0, 1);
    s += lg('gCart', [[0, '#F6FAFE'], [0.6, '#D7E5F1'], [1, '#B3C9DC']], 0, 0, 0, 1);
    s += cyl('gCartH', '#AFC6DA', '#DEEAF4', '#FBFDFF');
    s += rg('gDisc', [[0, '#FFB4A8'], [0.55, '#E4574D'], [1, '#A42F2A']], 0.5, 0.4, 0.65);
    // Muskel, Sehne
    s += rg('gMus', [[0, '#F7A08F'], [0.5, '#DB5B4D'], [1, '#A1322B']], 0.42, 0.38, 0.72);
    s += lg('gMusL', [[0, '#EF8D7D'], [1, '#B63E35']], 0, 0, 0, 1);
    s += lg('gTen', [[0, '#FFFDF8'], [1, '#E2D4BC']], 0, 0, 0, 1);
    // Haut, Figur
    s += lg('gSkin', [[0, '#FCE6D6'], [1, '#F0C6A8']], 0, 0, 0, 1);
    s += rg('gSkinR', [[0, '#FFEFE3'], [0.65, '#F8D6BF'], [1, '#EBB898']], 0.45, 0.4, 0.68);
    s += cyl('gSkinH', '#E8B898', '#F7D9C4', '#FEEBDD');
    s += lg('gHair', [[0, '#7A5238'], [1, '#4A3020']], 0, 0, 0, 1);
    s += lg('gShirt', [[0, '#5CCDBF'], [1, '#14897C']], 0, 0, 0, 1);
    s += lg('gShort', [[0, '#5B7FC7'], [1, '#2E4C8E']], 0, 0, 0, 1);
    s += lg('gShoe', [[0, '#FF8A5C'], [1, '#E0542A']], 0, 0, 0, 1);
    // Organe
    s += rg('gLung', [[0, '#FFE0E0'], [0.5, '#F6AEB0'], [1, '#CC6C76']], 0.45, 0.36, 0.72);
    s += rg('gHeart', [[0, '#FF8F84'], [0.5, '#D63B36'], [1, '#86191D']], 0.4, 0.34, 0.75);
    s += rg('gHeartB', [[0, '#A8C1F5'], [0.5, '#4F73CB'], [1, '#233C86']], 0.4, 0.34, 0.75);
    s += rg('gLiver', [[0, '#DC8A68'], [0.5, '#AD4F35'], [1, '#6C2C1D']], 0.42, 0.36, 0.72);
    s += rg('gGall', [[0, '#C9EA8C'], [1, '#5A9536']], 0.4, 0.35, 0.7);
    s += rg('gStom', [[0, '#FFD6C9'], [0.55, '#F29F8A'], [1, '#C0604D']], 0.42, 0.36, 0.72);
    s += rg('gKid', [[0, '#DD7B66'], [0.55, '#A9402F'], [1, '#6A2118']], 0.4, 0.36, 0.7);
    s += rg('gBlad', [[0, '#FFF6C4'], [0.55, '#F6D46C'], [1, '#C39727']], 0.42, 0.36, 0.72);
    s += rg('gBrain', [[0, '#FFEAEC'], [0.55, '#F5BCC3'], [1, '#D08591']], 0.42, 0.36, 0.72);
    s += rg('gCereb', [[0, '#F7C1C9'], [1, '#C46E7C']], 0.45, 0.35, 0.7);
    s += cyl('gEso', '#C66457', '#EE9C8D', '#FFCFC5');
    s += cyl('gTrach', '#97B4D3', '#D7E7F6', '#FFFFFF');
    s += lg('gAir', [[0, '#E9F3FC'], [1, '#B7D2EB']], 0, 0, 0, 1);
    s += rg('gAlv', [[0, '#FFF1F1'], [0.6, '#F7BDC0'], [1, '#D27A84']], 0.4, 0.35, 0.7);
    s += lg('gDia', [[0, '#E9A48E'], [1, '#B8634E']], 0, 0, 0, 1);
    s += lg('gBody', [[0, '#FDEFE6'], [1, '#F6DCCB']], 0, 0, 0, 1);
    // Haut-Schnitt
    s += lg('gHorn', [[0, '#F1C3A5'], [1, '#DDA07E']], 0, 0, 0, 1);
    s += lg('gEpi', [[0, '#F8D3BA'], [1, '#EDB394']], 0, 0, 0, 1);
    s += lg('gDer', [[0, '#FCE6DC'], [1, '#F2C7B9']], 0, 0, 0, 1);
    s += lg('gSub', [[0, '#FFF7E2'], [1, '#F5E2B2']], 0, 0, 0, 1);
    s += lg('gTop', [[0, '#FADCC6'], [1, '#EDB89A']], 0, 0, 1, 1);
    s += lg('gSide', [[0, '#D9A182'], [1, '#C48767']], 0, 0, 0, 1);
    s += rg('gFat', [[0, '#FFFBE6'], [0.6, '#F8DE8C'], [1, '#D9AE45']], 0.42, 0.36, 0.7);
    s += rg('gCorp', [[0, '#FFF7D4'], [0.6, '#F3D777'], [1, '#C79A26']], 0.42, 0.38, 0.7);
    s += rg('gSeb', [[0, '#FFF6C8'], [0.6, '#F2D57A'], [1, '#C9A13C']], 0.42, 0.38, 0.7);
    s += rg('gBulb', [[0, '#E3B394'], [0.6, '#B9805F'], [1, '#7E4C34']], 0.42, 0.38, 0.7);
    s += lg('gFol', [[0, '#F3C9AE'], [1, '#DDA585']], 0, 0, 1, 0);
    // Ohr, Gelenke
    s += lg('gTissue', [[0, '#FDEDE6'], [1, '#F5D5C8']], 0, 0, 0, 1);
    s += lg('gCav', [[0, '#EBD6C7'], [0.35, '#FBF1EA'], [1, '#FFFCF9']], 0, 0, 0, 1);
    s += cyl('gCanal', '#C88C72', '#E6B198', '#F7D7C6', true);
    s += rg('gDrum', [[0, '#FFF4F1'], [0.6, '#EFC9C3'], [1, '#C99089']], 0.45, 0.4, 0.7);
    s += rg('gLab', [[0, '#F3EDFC'], [0.55, '#CBB8EB'], [1, '#8A6DC1']], 0.45, 0.4, 0.72);
    s += rg('gJoint', [[0, '#9AF0E4'], [0.6, '#21AB9C'], [1, '#0B6A60']], 0.4, 0.35, 0.7);
    // Organe-Körper, Kreislauf
    s += cyl('gTorso', '#F2D2BE', '#FAE6D9', '#FEF3EB');
    s += lg('gCapRB', [[0, '#3F6CCB'], [0.5, '#8E4FA0'], [1, '#D23A4B']], 0, 0, 1, 0);
    s += rg('gLips', [[0, '#F59A9A'], [1, '#C8505A']], 0.45, 0.4, 0.7);
    s += rg('gCellR', [[0, '#FFB3B8'], [0.6, '#E0313F'], [1, '#9C1424']], 0.4, 0.35, 0.7);
    s += rg('gCellB', [[0, '#C3D2FA'], [0.6, '#4A6FD0'], [1, '#22398A']], 0.4, 0.35, 0.7);
    s += lg('gTile', [[0, '#FFF8F2'], [1, '#F7E2D3']], 0, 0, 0, 1);
    // Licht, Glas, Sonne
    s += rg('gSpot', [[0, '#E8F1FC', 1], [0.6, '#EFF5FC', 0.55], [1, '#F7FAFD', 0]], 0.5, 0.5, 0.5);
    s += rg('gGround', [[0, '#3A2A1C', 0.28], [1, '#3A2A1C', 0]], 0.5, 0.5, 0.5);
    s += rg('gGloss', [[0, '#FFFFFF', 0.95], [1, '#FFFFFF', 0]], 0.5, 0.5, 0.5);
    s += rg('gGlass', [[0, '#FFFFFF', 0.97], [0.8, '#F4F9FD', 0.95], [1, '#DDEBF6', 0.95]], 0.45, 0.4, 0.65);
    s += lg('gMetal', [[0, '#E9EEF4'], [0.45, '#9AA6B6'], [0.55, '#7C889A'], [1, '#D5DCE5']], 0, 0, 1, 1);
    s += rg('gSun', [[0, '#FFFBD6'], [0.45, '#FFD84A'], [1, '#F59E0B']], 0.42, 0.4, 0.65);
    s += rg('gSunGlow', [[0, '#FFE680', 0.8], [1, '#FFE680', 0]], 0.5, 0.5, 0.5);
    s += lg('gVitD', [[0, '#FFF6CC'], [1, '#FFCB45']], 0, 0, 0, 1);
    s += lg('gPanel', [[0, '#FFFFFF'], [1, '#F2F6FB']], 0, 0, 0, 1);
    // Filter: Schatten, Plastik, Markierung, Einfärben
    s += '<filter id="{P}sh" x="-12%" y="-8%" width="124%" height="122%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="2.4"/><feOffset dy="2.6" result="o"/>' +
      '<feFlood flood-color="#2B1D10" flood-opacity=".26"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    s += '<filter id="{P}shS" x="-30%" y="-30%" width="160%" height="170%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="1.1"/><feOffset dy="1.2" result="o"/>' +
      '<feFlood flood-color="#101828" flood-opacity=".35"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    s += '<filter id="{P}pf" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b"/>' +
      '<feOffset in="b" dy="-2" result="u"/><feComposite in="SourceAlpha" in2="u" operator="arithmetic" k2="1" k3="-1" result="rb"/><feFlood flood-color="#3A170A" flood-opacity=".3"/><feComposite in2="rb" operator="in" result="sd"/>' +
      '<feOffset in="b" dy="2" result="w"/><feComposite in="SourceAlpha" in2="w" operator="arithmetic" k2="1" k3="-1" result="rt"/><feFlood flood-color="#FFFFFF" flood-opacity=".5"/><feComposite in2="rt" operator="in" result="hi"/>' +
      '<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sd"/><feMergeNode in="hi"/></feMerge></filter>';
    s += '<filter id="{P}blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.6"/></filter>';
    s += glowF('hl', '#2E7A00', '#DEFF63', '#C6F43A', 1.5 * k, 2.6 * k);
    s += glowF('sel', '#0B3A8C', '#C4E6FF', '#53B6F5', 1.5 * k, 2.6 * k);
    s += glowF('bad', '#8A1018', '#FFCCCF', '#F87171', 1.5 * k, 2.6 * k);
    s += glowF('glow', null, null, '#D4F542', 2.2 * k, 3.2 * k);
    Object.keys(G.TINT).forEach(function (k) { s += tintF('t-' + k, G.TINT[k][0], G.TINT[k][1]); });
    return (DEFCACHE[k] = s);
  };

  G.uid = uid; G.f = f; G.pt = pt; G.ext = ext; G.attrs = attrs; G.path = path; G.ell = ell; G.circ = circ; G.rect = rect; G.g = g; G.text = text;
  G.part = part; G.H = H; G.HR = HR; G.mirror = mirror; G.both = both;
  G.bez = bez; G.bezD = bezD; G.bezSplit = bezSplit; G.ribbon = ribbon; G.rnd = rnd; G.smooth = smooth; G.sym = sym; G.ellPath = ellPath; G.limb = limb; G.bbox = bbox;
  G.tube = tube; G.shine = shine; G.union = union; G.fibers = fibers; G.muscle = muscle; G.spot = spot; G.ground = ground; G.gloss = gloss; G.arrowHead = arrowHead;
})(window.ATLAS = window.ATLAS || {});
