/* Adas Körper-Atlas – Skelett, Ohr, Wirbelsäule, Gelenke (plastisch gezeichnet) */
(function (A) {
  'use strict';
  var G = A.G, D = A.diagramme, C = G.C;
  var part = G.part, H = G.H, HR = G.HR, both = G.both, path = G.path, ell = G.ell, rect = G.rect, g = G.g, f = G.f, pt = G.pt;
  var tube = G.tube, union = G.union, limb = G.limb, shine = G.shine, sym = G.sym, bez = G.bez, bezD = G.bezD;

  /* ---------- Knochen-Bausteine ---------- */
  function knob(cx, cy, rx, ry, rot) { return { e: [cx, cy, rx, ry, rot || 0] }; }
  function shaft(P, w0, w1, bulge) { var L = limb(P, w0, w1, bulge == null ? -0.1 : bulge); return { d: L.d, fill: 'url(#{P}gBoneH)', axis: L.axis, w: Math.min(w0, w1) }; }
  function bone(pieces) { var s = union(pieces); pieces.forEach(function (q) { if (q.axis) s += shine(q.axis, q.w); }); return s; }
  var BF = { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 0.95, 'stroke-linejoin': 'round' };
  var BFH = { fill: 'url(#{P}gBoneH)', stroke: C.bone, 'stroke-width': 0.9, 'stroke-linejoin': 'round' };
  function seg(a, b) { return 'M' + pt(a) + ' L' + pt(b); }
  function line(d, col, w, op) { return path(d, { fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: op == null ? 1 : op }); }

  /* ======================= SKELETT ======================= */
  function skull() {
    var cran = sym(150, 13, [[131, 13, 113, 27, 111.5, 50], [110.5, 61, 112.5, 70, 116.5, 76], [114, 79, 112, 83, 113, 88], [114, 93, 118.5, 96.5, 123, 97.5], [125.5, 100, 129, 102.5, 135, 103], [140, 103.5, 145, 103.5, 150, 103.5]]);
    var jaw = sym(150, 106.5, [[144, 106.5, 137, 106, 131.5, 106.5], [127.5, 105, 125.5, 101.5, 124.5, 97], [123.5, 94, 122.5, 92, 121, 91], [119, 94, 118, 101, 118.5, 108], [119, 114, 120.5, 118, 124.5, 120.5], [132, 125.5, 141, 127.5, 150, 127.5]]);
    var s = path(jaw, BF);
    s += path(cran, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 1, 'stroke-linejoin': 'round' });
    s += G.gloss(138, 33, 15, 8, -18, 0.6);
    // Schläfen, Wangenknochen, Naht
    var half = line('M113,58 C113,68 115,74 118.5,79', '#B49B70', 3, 0.3) + line('M115.5,82 C119,86.5 124,89 130.5,88.5', '#BFA67C', 2.2, 0.55) + G.gloss(121.5, 84, 5, 2.2, -18, 0.55) +
      path('M124,61 C126,55 140,54 146,58 C149,62 148.5,73 145,77.5 C140,82 128,81 125,77 C122,73 122,66 124,61 Z', { fill: 'url(#{P}gHole)', stroke: '#8C7754', 'stroke-width': 0.9 }) +
      line('M127.5,76.5 C131.5,79.6 139,80 143.5,76.6', '#A68E66', 1, 0.75) + line('M123.2,59 C127,52.4 140,51.4 147,56.4', '#FFFFFF', 1.6, 0.75) +
      ell(137.5, 118.4, 1.1, 0.8, { fill: 'url(#{P}gHole)' }) + line('M121,98 C124,106 126,113 125.5,119', '#C9B28A', 1.4, 0.5);
    var UT = [[148.1, 3.6], [144.3, 3.6], [140.6, 3.4], [137.2, 3.2], [134.1, 3]], teeth = '';
    UT.forEach(function (t, i) {
      teeth += rect(t[0] - t[1] / 2, 99.6, t[1], i < 2 ? 6 : 5.4, 1.2, { fill: 'url(#{P}gTooth)', stroke: '#A8977A', 'stroke-width': 0.5 });
      teeth += rect(t[0] - t[1] / 2 + 0.15, 105.4, t[1] - 0.3, i < 2 ? 5 : 4.6, 1.1, { fill: 'url(#{P}gTooth)', stroke: '#A8977A', 'stroke-width': 0.5 });
    });
    s += both(half + teeth);
    s += path('M150,79.5 C147,81.5 143,88 143.5,93 C144,96.5 147.5,97 150,95.5 C152.5,97 156,96.5 156.5,93 C157,88 153,81.5 150,79.5 Z', { fill: 'url(#{P}gHole)', stroke: '#8C7754', 'stroke-width': 0.9 });
    s += line('M150,85 L150,95', '#A8916A', 1.1) + path('M147,77.5 C147.6,72 152.4,72 153,77.5 L150,80 Z', { fill: 'url(#{P}gBone)', stroke: '#9C8762', 'stroke-width': 0.6 });
    s += line('M117,36 C121,33 123,35 127,31 C131,28 134,30 138,27 C142,25 146,26.5 150,25 C154,26.5 158,25 162,27 C166,30 169,28 173,31 C177,35 179,33 183,36', '#B19A72', 0.8, 0.9);
    return s;
  }
  function vbody(cx, cy, w, h) { // Wirbelkörper von vorn: leicht taillierte Form
    var a = w / 2, b = h / 2, i = w * 0.07;
    return 'M' + f(cx - a) + ',' + f(cy - b + 0.8) + ' Q' + f(cx - a) + ',' + f(cy - b) + ' ' + f(cx - a + 1) + ',' + f(cy - b) + ' L' + f(cx + a - 1) + ',' + f(cy - b) +
      ' Q' + f(cx + a) + ',' + f(cy - b) + ' ' + f(cx + a) + ',' + f(cy - b + 0.8) + ' C' + f(cx + a - i) + ',' + f(cy - b * 0.3) + ' ' + f(cx + a - i) + ',' + f(cy + b * 0.3) + ' ' + f(cx + a) + ',' + f(cy + b - 0.8) +
      ' Q' + f(cx + a) + ',' + f(cy + b) + ' ' + f(cx + a - 1) + ',' + f(cy + b) + ' L' + f(cx - a + 1) + ',' + f(cy + b) + ' Q' + f(cx - a) + ',' + f(cy + b) + ' ' + f(cx - a) + ',' + f(cy + b - 0.8) +
      ' C' + f(cx - a + i) + ',' + f(cy + b * 0.3) + ' ' + f(cx - a + i) + ',' + f(cy - b * 0.3) + ' ' + f(cx - a) + ',' + f(cy - b + 0.8) + ' Z';
  }
  function spineFront() {
    var V = [], k;
    for (k = 0; k < 7; k++) V.push([119 + 5.4 * k, 12 + 0.3 * k, 4.2, 19.5 + 0.4 * k]);
    for (k = 0; k < 12; k++) V.push([157.5 + 7.75 * k, 15 + 0.4 * k, 6.4, 25 + 0.3 * k]);
    [33, 36, 39, 37, 35].forEach(function (W, j) { V.push([252.5 + 11.4 * j, 20 + 0.8 * j, 9.4, W]); });
    var proc = '', disc = '', body = '';
    V.forEach(function (v, i) {
      var cy = v[0], w = v[1], h = v[2], W = v[3];
      proc += rect(150 - W / 2, cy - h * 0.34, W, h * 0.44, h * 0.22, BF);
      body += path(vbody(150, cy, w, h), BFH);
      var nx = V[i + 1];
      if (nx) { var top = cy + h / 2, bot = nx[0] - nx[2] / 2; if (bot - top > 0.4) disc += rect(150 - (w + nx[1]) / 4 + 0.4, top - 0.3, (w + nx[1]) / 2 - 0.8, bot - top + 0.6, 0.6, { fill: '#DCE8F2', stroke: C.cart, 'stroke-width': 0.5 }); }
    });
    var sac = sym(150, 304.3, [[141, 303.8, 134, 304.2, 128.5, 306.6], [128, 314, 131, 322, 134.5, 330], [138, 337, 143, 342.5, 147, 345.5], [148.2, 346.4, 149, 346.6, 150, 346.6]]);
    var sacS = path(sac, BF), ridges = '';
    [[313, 9.6, 2.3, 1.7], [321.5, 8.6, 2.1, 1.6], [329.5, 7.2, 1.9, 1.45], [337, 5.3, 1.5, 1.2]].forEach(function (r) {
      sacS += ell(150 - r[1], r[0], r[2], r[3], { fill: 'url(#{P}gHole)' }) + ell(150 + r[1], r[0], r[2], r[3], { fill: 'url(#{P}gHole)' });
    });
    [[317.3, 7.2], [325.6, 6], [333.4, 4.6]].forEach(function (r) { ridges += line('M' + f(150 - r[1]) + ',' + r[0] + ' L' + f(150 + r[1]) + ',' + r[0], '#BCA57C', 1, 0.8) + line('M' + f(150 - r[1]) + ',' + f(r[0] + 1) + ' L' + f(150 + r[1]) + ',' + f(r[0] + 1), '#FFFFFF', 0.8, 0.6); });
    sacS += ridges + G.gloss(150, 308.5, 10, 2.4, 0, 0.6);
    var coc = '';
    [[348.6, 8, 3.1], [351.8, 6.4, 2.7], [354.6, 4.8, 2.4], [356.9, 3.4, 2]].forEach(function (c) { coc += rect(150 - c[1] / 2, c[0] - c[2] / 2, c[1], c[2], c[2] / 2, BF); });
    return proc + disc + body + sacS + coc + HR(140, 115, 20, 245);
  }
  var RIBS = [ // [x seitlich, y seitlich, x Knorpelgrenze, y Knorpelgrenze, Ansatz am Brustbein]
    [125, 163, 133, 167.5, [143, 161]], [115, 171, 130, 180.5, [143.5, 171.5]], [109, 181, 127.5, 193.5, [144, 182.5]], [105.5, 192, 125.5, 206, [144.2, 194]],
    [104, 203, 123.5, 218.5, [144.5, 205.5]], [103.5, 214.5, 121.5, 230.5, [145, 217]], [103.5, 226, 119.5, 242.5, [145.5, 228.5]],
    [104.5, 237, 116.5, 252.5, null], [106.5, 247, 113.5, 260.5, null], [109.5, 256, 111.5, 267.5, null]
  ];
  function ribBack(r) { var xL = r[0], yL = r[1]; return [[143.5, yL - 9], [143.5 - (143.5 - xL) * 0.45, yL - 12.5], [xL + 1.2, yL - 7], [xL, yL]]; }
  function ribsBack() {
    var s = '';
    RIBS.forEach(function (r) { s += tube(bezD(ribBack(r)), 3, 'boneB'); });
    s += tube('M144,258.5 C134,257.5 120,262 112.5,270', 2.6, 'boneB') + tube('M145,266.5 C137,266 127,270 121.5,277', 2.4, 'boneB');
    return g(s, { opacity: 0.9 });
  }
  function ribsFront() {
    var ant = '', cart = '', hit = '', CP = [];
    RIBS.forEach(function (r, i) {
      var xL = r[0], yL = r[1], xJ = r[2], yJ = r[3], bk = G.bezSplit(ribBack(r), 0.72)[1];
      var d = 'C' + f(xL - 1.2) + ',' + f(yL + (yJ - yL) * 0.6) + ' ' + f(xJ - (xJ - xL) * 0.32) + ',' + f(yJ + 0.6) + ' ' + f(xJ) + ',' + f(yJ);
      ant += tube(bezD(bk) + ' ' + d, i === 0 ? 3.8 : 3.2); hit += H('M' + f(xL) + ',' + f(yL) + ' ' + d, 7);
      var S = r[4] || bez(CP[i - 1], 0.32);
      var P = [[xJ, yJ], [xJ + (S[0] - xJ) * 0.42, yJ - (yJ - S[1]) * 0.12], [S[0] - (S[0] - xJ) * 0.3, S[1] + (yJ - S[1]) * 0.28], S];
      CP.push(P);
      cart += tube(bezD(P), i === 0 ? 3.4 : 2.6, 'cart'); hit += H(bezD(P), 6);
    });
    return cart + ant + hit;
  }
  function phal(list) { return list.map(function (p) { return tube(seg([p[0], p[1]], [p[2], p[3]]), p[4]); }).join(''); }
  function bones(list, head) {
    return list.map(function (m) { return tube(seg(m[0], m[1]), m[2]) + (head ? ell(m[1][0], m[1][1], m[2] * 0.62, m[2] * 0.62, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.6 }) : ''); }).join('');
  }
  function smallBones(list) {
    return list.map(function (c) { return ell(c[0], c[1], c[2], c[3], { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.7, transform: c[4] ? 'rotate(' + c[4] + ' ' + c[0] + ' ' + c[1] + ')' : null }); }).join('');
  }

  D.skelett = {
    title: 'Skelett von vorne', vb: [0, 0, 300, 665], kap: 'skelett', lz: '1.5',
    render: function () {
      var k = '';
      k += part('schulterblatt', both(path('M101,151.5 C106,148.5 112,149.5 116.5,152.5 C121.5,155 126.5,157 131,158.5 C129.5,181 126.5,206 122.5,229 C116.5,214 110.5,196 106.5,180.5 C104.5,176 103.4,171 103.6,166 C103.8,161 102.6,156 101,151.5 Z',
        { fill: 'url(#{P}gBoneB)', stroke: C.boneB, 'stroke-width': 0.9, 'stroke-linejoin': 'round' }) + tube('M112.5,155.5 C109.5,158.5 108.6,162.6 110.4,165.4', 2.6, 'boneB') + HR(96, 160, 16, 40)));
      k += part('rippen', both(ribsBack()));
      var pelv = path('M130,301 C126,292 118,286 110,287 C102,288 96,297 95,307 C94.5,313 95.5,317 97,320 C98.5,324 99,327 100,331 C101,336 103,341 105,345 C102,353 103,363 107,370 C110,376 113,381 117,384 C121,388 129,389 134,386 C139,383 144,380 147,377.5 L147,359 C141,357 132,354 125,351 C123,343 124,331 126,322 C127.5,315 129,308 130,301 Z ' + G.ellPath(132.5, 367, 6.6, 9, -22),
        G.ext(BF, { 'fill-rule': 'evenodd' })) +
        path('M128,304 C124,296 116,292 108.5,294 C102,296 99,304 100,312 C101,320 106,328 113,333 C118,336 122.5,336 124.5,331 C125.5,322 126.5,312 128,304 Z', { fill: 'url(#{P}gFossa)' }) +
        path('M104.8,353 C105.2,344.5 113,340.5 120,343 C123.5,344.3 125.5,346.8 126.2,349 C122,345.5 116,345 111,347.5 C108.5,349 106.5,351 104.8,353 Z', { fill: '#6E5A40', opacity: 0.45 }) +
        path(G.ellPath(132.5, 367, 6.6, 9, -22), { fill: 'none', stroke: '#9C8660', 'stroke-width': 1.5, opacity: 0.55 }) +
        line('M99.5,299 C104,291 114,287.5 124,292', '#FFFFFF', 1.6, 0.75);
      k += part('becken', both(pelv) + rect(147, 359, 6, 18.5, 2.4, { fill: 'url(#{P}gCart)', stroke: C.cart, 'stroke-width': 0.8 }));
      k += part('wirbelsaeule', spineFront());
      k += part('rippen', both(ribsFront()));
      k += part('brustbein',
        path('M140,156.5 C143,154.5 146.5,155.8 150,155.8 C153.5,155.8 157,154.5 160,156.5 C160.6,161 159.8,165 158.6,169 C158,172 157.6,175 157.6,177.5 L142.4,177.5 C142.4,175 142,172 141.4,169 C140.2,165 139.4,161 140,156.5 Z', BFH) +
        path('M142.6,179 L157.4,179 C158.6,190 158.8,205 158.2,218 C157.8,224 157,229 156,231.5 L144,231.5 C143,229 142.2,224 141.8,218 C141.2,205 141.4,190 142.6,179 Z', BFH) +
        path('M145.2,232.5 L154.8,232.5 C154.5,237 152.5,242 150,245 C147.5,242 145.5,237 145.2,232.5 Z', BFH) + G.gloss(150, 198, 2.6, 15, 0, 0.5));
      var clav = 'M144.5,158 C134,151.5 119,159.5 102,150.8';
      k += part('schluesselbein', both(tube(clav, 4.8) + H(clav, 10)));
      k += part('schaedel', skull());
      // Arm (links gezeichnet, gespiegelt)
      k += part('oberarmknochen', both(bone([shaft([[100, 175], [99.2, 205], [95.5, 245], [91, 279]], 7.4, 6.6), knob(101, 168, 8.2, 8.2), knob(95.2, 171.5, 4.2, 5),
        { d: 'M82.4,282.5 C82.8,278.6 86.8,277 90.8,277.3 C95,277.6 98.8,279.4 99.6,282.6 C100.2,285.6 99,288.6 96.8,290 C95.2,291 93.6,290.6 92.4,289.8 C91.4,290.8 89.8,291.4 88.2,290.8 C86.4,291.8 84,291.4 83,289.4 C82.2,287.4 82.2,284.6 82.4,282.5 Z' }]) +
        H('M100,170 C99.2,205 95.5,245 91,284', 13)));
      k += part('elle', both(bone([shaft([[94, 293], [93.6, 320], [91.2, 356], [87.6, 384]], 5.4, 3.2, -0.05),
        { d: 'M89.8,291.2 C90.6,288.6 94,287.8 96.6,289 C98.2,290 98.4,292.6 97.6,294.6 C96.6,297 94.8,298.4 92.8,298.2 C90.8,298 89.4,296 89.4,294 C89.4,293 89.5,292 89.8,291.2 Z' },
        knob(87.4, 386.4, 2.9, 2.9), knob(89.7, 388.2, 1.3, 1.9)]) + H('M93.6,292 C93.6,320 91.2,356 87.6,388', 8)));
      k += part('speiche', both(bone([shaft([[84.4, 298.5], [83, 324], [79.2, 358], [75.2, 384.5]], 3.8, 5.6, -0.08), knob(84.6, 295.3, 4.3, 2.6, -4),
        { d: 'M68.4,385.6 C69,382.4 73,381.4 77.2,382 C80.6,382.6 82.2,384.6 81.8,387.2 C81.4,389.6 79,391 75.6,391.2 C72,391.4 69.4,390.6 68.5,388.8 C68.1,387.8 68.2,386.6 68.4,385.6 Z' }]) +
        H('M84.4,296 C83,324 79.2,358 75.2,390', 8)));
      k += part('handwurzel', both(smallBones([[71.2, 394.6, 3.5, 2.3, -25], [76.6, 393.8, 3, 2.5], [81.8, 394.4, 2.8, 2.3, 10], [86.6, 395.6, 2, 2], [69.6, 400.4, 3, 2.6, 25], [74.4, 401, 2.5, 2.6], [79.4, 401.2, 2.8, 3.2], [84.8, 400.6, 3, 2.9, -10]]) + HR(66, 391, 27, 14)));
      k += part('mittelhand', both(bones([[[68.6, 403.6], [62, 418.5], 2.9], [[73.8, 404.8], [72.2, 427.6], 2.6], [[79.2, 405.2], [79, 429.6], 2.6], [[84.6, 404.8], [85.8, 427.6], 2.5], [[89.2, 403.8], [91.6, 424.8], 2.4]], true) + HR(58, 405, 37, 24)));
      k += part('finger', both(phal([[61.2, 420.8, 57.2, 430, 2.4], [56.6, 432, 54.2, 439, 2.2],
        [71.9, 430.4, 71.3, 439.4, 2.3], [71.2, 441.4, 70.9, 447.4, 2.1], [70.85, 449.4, 70.65, 453.8, 1.9],
        [79, 432.5, 79, 442, 2.3], [79, 444, 79, 450.5, 2.1], [79, 452.5, 79, 457.4, 1.9],
        [86.2, 430.4, 86.6, 439.4, 2.3], [86.7, 441.4, 87, 447.4, 2.1], [87.05, 449.4, 87.2, 453.8, 1.9],
        [92.2, 427.4, 93.1, 434.4, 2.2], [93.25, 436.4, 93.7, 441.4, 2], [93.8, 443.4, 94.1, 447.4, 1.8]]) + HR(50, 429, 47, 31)));
      // Bein
      k += part('fusswurzel', both(smallBones([[122.2, 607.4, 7.6, 4.4], [117.6, 613.6, 6, 3.8, -8], [126.6, 614.4, 4.3, 2.8, 8], [114.6, 619.6, 3.9, 3], [122, 621.8, 2.7, 2.5], [126.9, 622.4, 2.4, 2.4], [131.7, 622, 2.6, 2.5]]) + HR(110, 604, 26, 21)));
      k += part('mittelfuss', both(bones([[[131.8, 624.6], [136, 641.8], 3.4], [[127.4, 625.4], [129.6, 643.8], 2.6], [[122.6, 625.6], [123.1, 643.8], 2.5], [[118, 624.8], [116.5, 641.8], 2.4], [[114, 622.8], [110.5, 638.8], 2.4]], true) + HR(106, 625, 33, 19)));
      k += part('zehen', both(phal([[136.5, 644.6, 137.6, 650.5, 3.1], [137.8, 652.5, 138.6, 658, 2.9],
        [129.8, 646.2, 130.3, 650.5, 2.3], [130.4, 652.3, 130.6, 655.5, 2.1], [130.7, 657.2, 130.8, 659.5, 2],
        [123, 646.2, 123.1, 650.4, 2.3], [123.1, 652.2, 123.2, 655.4, 2.1], [123.2, 657.1, 123.2, 659.3, 2],
        [116.3, 644.2, 115.8, 648.2, 2.2], [115.7, 650, 115.4, 653, 2.1], [115.3, 654.7, 115.2, 656.8, 1.9],
        [110.2, 641.2, 109.4, 645, 2.1], [109.3, 646.8, 108.9, 649.6, 2], [108.8, 651.2, 108.6, 653.2, 1.8]]) + HR(104, 642, 38, 20)));
      k += part('oberschenkelknochen', both(bone([shaft([[106.4, 369], [110, 405], [116.5, 450], [120.8, 484]], 8.6, 8.2, -0.08), shaft([[115, 356], [111.8, 359.5], [108.8, 363], [106.4, 368]], 6.6, 8.2, 0),
        knob(115.2, 355, 7.6, 7.6), knob(103.8, 366.4, 5.3, 6.2, -12), knob(112.9, 378.2, 2.4, 2.8),
        { d: 'M111.6,483.6 C112,479.6 116,478.4 121,478.6 C126,478.8 130.4,480 131,484 C131.6,488 130.6,492.6 127.6,494.6 C125.6,496 123.4,495.4 121.6,494 C119.6,495.4 116.8,496.2 114.6,494.6 C112.2,492.8 111.2,488 111.6,483.6 Z' }]) +
        H('M110,362 C112,405 117,450 121,492', 15)));
      k += part('wadenbein', both(bone([shaft([[110.6, 512.5], [110.2, 545], [111, 575], [112.8, 598]], 3.2, 3, -0.06), knob(110.4, 510.2, 3.4, 3.1), knob(113, 603, 3.1, 4.4, -6)]) + H('M110.4,510 C110.2,545 111,575 113,604', 8)));
      k += part('schienbein', both(bone([shaft([[123.4, 511], [125.2, 540], [126.2, 572], [127.6, 594]], 7.6, 5.6, -0.08),
        { d: 'M110.8,505.6 C111.2,501.4 117,500.2 123,500.6 C129.4,501 135,502.2 135.4,505.8 C135.6,509 132.4,511.2 129.2,512.2 L117.6,512.2 C114,511.4 110.6,509.2 110.8,505.6 Z' },
        { d: 'M121.6,594.8 C122,592.2 125,591.2 128.2,591.4 C131.4,591.6 133.6,593 133.8,596 C134,599.4 133,603.2 130.6,604.8 C128.6,606 126.4,605.2 125,603.6 C123.4,602.6 121.6,601.4 121.4,599 C121.2,597.6 121.4,596 121.6,594.8 Z' }]) +
        G.gloss(124.4, 516.5, 1.8, 3.2, 0, 0.6) + H('M124,507 C125.2,540 126.2,572 128,600', 11)));
      k += part('kniescheibe', both(path('M114.6,491.6 C115.6,487.6 126.4,487.6 127.4,491.6 C128.4,496.4 125,503.6 121,504.8 C117,503.6 113.6,496.4 114.6,491.6 Z',
        { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.95 }) + G.gloss(119.6, 493.2, 3, 2.2, -20, 0.75)));
      return G.spot(150, 330, 160, 345) + G.ground(150, 652, 64, 9) + g(k, { class: 'shw', filter: 'url(#{P}sh)' });
    },
    parts: [
      { id: 'schaedel', name: 'Schädel', alt: ['Schaedel', 'Kopf'], info: 'schützt das Gehirn · Blatt: 25', mk: [[262, 40, 182, 50]], find: true },
      { id: 'schluesselbein', name: 'Schlüsselbein', info: 'vorne zwischen Brustbein und Schulter · 1 + 1', mk: [[262, 132, 196, 153]], find: true },
      { id: 'schulterblatt', name: 'Schulterblatt', info: 'flach, liegt hinten an der Schulter · 1 + 1', mk: [[28, 176, 120, 213]], find: false },
      { id: 'brustbein', name: 'Brustbein', info: 'Mitte vom Brustkorb · 1', mk: [[28, 214, 144, 205]], find: true },
      { id: 'rippen', name: 'Rippen', alt: ['Rippe'], info: '12 Paare, schützen Herz und Lunge · 12 + 12', mk: [[270, 194, 192, 199]], find: true },
      { id: 'wirbelsaeule', name: 'Wirbelsäule', alt: ['Wirbelsaeule'], info: 'viele Wirbel, hält uns aufrecht · Blatt: 33', mk: [[28, 282, 141, 285]], find: true },
      { id: 'becken', name: 'Becken', info: 'verbindet Wirbelsäule und Beine · Blatt: 3 + 3', mk: [[28, 318, 104, 322]], find: true },
      { id: 'oberarmknochen', name: 'Oberarmknochen', alt: ['Oberarm'], info: 'im Oberarm · 1 + 1', mk: [[270, 232, 205, 230]], find: true },
      { id: 'elle', name: 'Elle', info: 'Unterarm, Seite vom kleinen Finger, bildet die Ellenbogenspitze · 1 + 1', mk: [[272, 324, 207.6, 324]], find: true, fv: [40, 276, 84, 190] },
      { id: 'speiche', name: 'Speiche', info: 'Unterarm, Daumenseite · 1 + 1', mk: [[28, 350, 79, 350]], find: true, fv: [40, 276, 84, 190] },
      { id: 'handwurzel', name: 'Handwurzelknochen', alt: ['Handwurzel', 'Handwurzelknochen'], info: '8 kleine Knochen am Handgelenk · 8 + 8', mk: [[28, 398, 68, 398]], find: true, fv: [40, 276, 84, 190] },
      { id: 'mittelhand', name: 'Mittelhandknochen', alt: ['Mittelhand'], info: '5 Knochen in der Handfläche · 5 + 5', mk: [[272, 412, 227, 414]], find: true, fv: [40, 276, 84, 190] },
      { id: 'finger', name: 'Fingerknochen', alt: ['Finger'], info: '14 pro Hand · 14 + 14', mk: [[28, 446, 68, 446]], find: true, fv: [40, 276, 84, 190] },
      { id: 'oberschenkelknochen', name: 'Oberschenkelknochen', alt: ['Oberschenkel'], info: 'der größte Knochen · 1 + 1', mk: [[272, 456, 182, 456]], find: true },
      { id: 'kniescheibe', name: 'Kniescheibe', info: 'vorne am Knie · 1 + 1', mk: [[28, 497, 115.5, 497]], find: true, fv: [86, 466, 70, 148] },
      { id: 'schienbein', name: 'Schienbein', info: 'dicker Knochen vorne/innen am Unterschenkel · 1 + 1', mk: [[270, 560, 174, 560]], find: true, fv: [86, 466, 70, 148] },
      { id: 'wadenbein', name: 'Wadenbein', info: 'dünner Knochen außen am Unterschenkel · 1 + 1', mk: [[28, 560, 110.5, 560]], find: true, fv: [86, 466, 70, 148] },
      { id: 'fusswurzel', name: 'Fußwurzelknochen', alt: ['Fußwurzel', 'Fusswurzelknochen'], info: '7 Knochen, mit der Ferse · 7 + 7', mk: [[270, 612, 184, 612]], find: true, fv: [98, 594, 50, 70] },
      { id: 'mittelfuss', name: 'Mittelfußknochen', alt: ['Mittelfuß', 'Mittelfussknochen'], info: '5 Knochen · 5 + 5', mk: [[28, 634, 117, 634]], find: true, fv: [98, 594, 50, 70] },
      { id: 'zehen', name: 'Zehenknochen', alt: ['Zehen', 'Zehknochen'], info: '14 pro Fuß · 14 + 14', mk: [[270, 654, 170, 654]], find: true, fv: [98, 594, 50, 70] }
    ]
  };

  function bracket(x0, x1, y, t) {
    return line('M' + f(x0) + ',' + f(y - 3.5) + ' L' + f(x0) + ',' + f(y) + ' L' + f(x1) + ',' + f(y) + ' L' + f(x1) + ',' + f(y - 3.5), '#B3A797', 1.2) + G.text((x0 + x1) / 2, y + 10.5, t, { class: 'dtx', 'text-anchor': 'middle' });
  }

  /* ======================= OHR ======================= */
  D.ohr = {
    title: 'Das Ohr (Schnitt)', vb: [0, 0, 320, 198], kap: 'skelett', lz: '1.3',
    render: function () {
      var s = '', i;
      var boneD = 'M138,20 L302,20 Q320,20 320,38 L320,162 Q320,180 302,180 L152,180 C140,160 130,140 126,118 C123,100 126,84 130,66 C133,48 136,32 138,20 Z';
      var cavD = 'M155,58 C161,52 197,52 204,58 C210,64 210,136 204,142 C197,148 161,148 155,142 C150,136 150,64 155,58 Z';
      s += path('M56,20 L302,20 Q320,20 320,38 L320,162 Q320,180 302,180 L56,180 Z', { fill: 'url(#{P}gTissue)' });
      var cid = G.uid('c'), r = G.rnd(11), dots = '';
      for (i = 0; i < 130; i++) dots += ell(128 + r() * 192, 22 + r() * 156, 1.3 + r() * 2.2, 0.9 + r() * 1.5, { fill: '#C4AD84', opacity: 0.3 });
      s += path(boneD, { fill: 'url(#{P}gBone)' }) + '<clipPath id="' + cid + '"><path d="' + boneD + '"/></clipPath>' + g(dots, { 'clip-path': 'url(#' + cid + ')' }) + path(boneD, { fill: 'none', stroke: '#C7B08A', 'stroke-width': 1.2 });
      s += rect(51, 20, 7, 160, 0, { fill: 'url(#{P}gEpi)' }) + line('M51,20 L51,180', C.skin, 1.1);
      s += tube('M178,146 C183,156 189,166 196,178', 5, 'eso', { opacity: 0.6 });
      s += path(cavD, { fill: 'url(#{P}gCav)', stroke: '#D5BBA5', 'stroke-width': 1 });
      // Außenohr
      s += part('ohrmuschel', path('M57,44 C49,29 23,28 15,50 C9,68 10,104 16,124 C20,140 24,160 37,164 C47,167 55,159 57,150 Z', { fill: 'url(#{P}gSkinR)', stroke: C.skin, 'stroke-width': 1.1, 'stroke-linejoin': 'round' }) +
        line('M51,42 C41,34 25,38 21,56 C17,73 18,101 23,119', '#C98A6D', 2.4, 0.85) + line('M53,40.5 C43,31.5 27,34.5 23.5,52', '#FFFFFF', 1.2, 0.6) + line('M45,56 C35,60 29,74 31,89', '#D29C80', 1.8, 0.8) +
        path('M57,84 C47,79 36,84 32,96 C30,106 36,116 46,117 C51,117 54,115 57,113 Z', { fill: '#DFA285', opacity: 0.8 }) + G.gloss(31, 62, 4.5, 12, 10, 0.45) + G.gloss(31, 147, 5, 6, 0, 0.4));
      var hairs = '';
      [[60, 87.8, 62, 92], [64.5, 87.4, 66, 91.4], [69, 87.2, 70.4, 90.8], [61, 110.6, 63, 106.6], [66, 110.8, 67.4, 107]].forEach(function (h) { hairs += line('M' + h[0] + ',' + h[1] + ' L' + h[2] + ',' + h[3], '#9C6E58', 0.6, 0.9); });
      s += part('gehoergang', path('M54,86.5 C82,85.5 116,86.5 151,88.5 L151,110.5 C116,112 82,112.5 54,111.5 Z', { fill: 'url(#{P}gCav)' }) +
        line('M54,87.6 C82,86.6 116,87.6 151,89.6', '#E3AD92', 3.2) + line('M54,110.4 C82,111.4 116,110.9 151,109.4', '#E3AD92', 3.2) +
        line('M54,86 C82,85 116,86 151,88', '#B97A60', 1) + line('M54,112 C82,113 116,112.5 151,111', '#B97A60', 1) + hairs);
      s += part('trommelfell', ell(151.6, 99.5, 2.7, 13.4, { fill: 'url(#{P}gDrum)', stroke: '#9A6A62', 'stroke-width': 0.8, transform: 'rotate(-8 151.6 99.5)' }) + path('M151.6,101.5 L153.4,107 L150.6,107.2 Z', { fill: '#FFFFFF', opacity: 0.7 }) + HR(146, 84, 10, 30));
      // Gehörknöchelchen
      var oss = part('hammer', path('M152.6,109.6 C153.4,101 155.2,93 158.2,86.2 C160.2,81.4 161.4,77.4 163.6,73.6 C166,69.8 171.6,69.8 173.2,73.8 C174.6,77.8 171.8,81.8 168.2,83.8 C165.2,85.8 162.8,89 160.8,94 C158.8,99 156.8,104.6 155.8,109.8 Z',
        { fill: 'url(#{P}gBoneH)', stroke: C.bone, 'stroke-width': 0.8, 'stroke-linejoin': 'round' }) + G.gloss(166.6, 74.6, 3, 2.2, 0, 0.85) + HR(157, 66, 13, 32)) +
        part('amboss', path('M170.4,72.2 C172.8,67 181,66.8 185.6,70.4 C188.6,72.8 189.2,76.2 187,77.6 L182.6,77.2 C183.6,82.4 184.2,88.2 183.6,94.4 C183.4,96.8 181,97.8 179.8,95.6 C179,91 178.6,86 177.8,81.6 C175,82.6 171.4,80.2 170.4,76.6 Z',
          { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 0.8, 'stroke-linejoin': 'round' }) + ell(181.6, 97.4, 1.8, 1.8, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.6 }) + G.gloss(178, 71.8, 4, 1.8, 0, 0.85) + HR(170, 66, 19, 20)) +
        part('steigbuegel', tube('M185,96.6 Q193,88.6 199.6,92.4', 2.2) + tube('M185,102.6 Q193,110.4 199.6,106.6', 2.2) + ell(200.6, 99.6, 2.2, 8.4, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.7 }) +
          ell(183.8, 99.6, 2.6, 2.6, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.7 }) + HR(178, 88, 28, 26));
      s += g(oss, { filter: 'url(#{P}shS)' });
      // Innenohr mit Hörnerv
      s += tube('M218,97 C244,96 272,110 300,124 C306,127 312,128 319,128', 2.6, 'nerve') + tube('M249,134 C268,132 292,126 319,121', 3.8, 'nerve');
      var LF = { fill: 'url(#{P}gLab)', stroke: '#5E4690', 'stroke-width': 0.8 };
      var lab = tube('M209,91 C200,69 210,43 228,44 C246,45 247,69 223,89', 4.2, 'lab') + tube('M222,89 C232,62 266,58 269,80 C271,99 249,103 226,98', 4.2, 'lab') + tube('M221,104 C237,114 262,111 263,98 C264,87 246,87 228,95', 4, 'lab');
      lab += ell(209.6, 89.4, 3.4, 2.8, LF) + ell(223, 90.6, 3.4, 2.8, LF) + ell(226.4, 97.6, 3, 2.6, LF) + ell(214, 100, 8, 12, LF) + G.gloss(212, 95, 3, 5, 0, 0.6);
      var cc = [249, 134], th0 = Math.atan2(114 - 134, 222 - 249), sp = [];
      for (i = 0; i <= 72; i++) { var t = i / 72, a = th0 + t * 2.4 * 2 * Math.PI, rr = 22 * (1 - 0.8 * t); sp.push([cc[0] + Math.cos(a) * rr, cc[1] + Math.sin(a) * rr]); }
      lab += tube('M216,108 C221,114 226,119 ' + pt(sp[0]), 7, 'lab');
      lab += path(G.ribbon(sp, function (t) { return 8.8 - 6.2 * t; }), G.ext(LF, { 'stroke-linejoin': 'round' })) + path(G.smooth(sp.slice(1, 66)), { fill: 'none', stroke: '#FFFFFF', 'stroke-opacity': 0.55, 'stroke-width': 1.3, 'stroke-linecap': 'round' });
      s += part('innenohr', lab + ell(249, 134, 25, 24, { class: 'hitr' }) + HR(204, 38, 70, 74));
      s += '<g class="lbl">' + bracket(10, 149, 186, 'Außenohr') + bracket(153, 207, 186, 'Mittelohr') + bracket(211, 300, 186, 'Innenohr') + '</g>';
      return s;
    },
    parts: [
      { id: 'ohrmuschel', name: 'Ohrmuschel', info: 'fängt den Schall ein', mk: [[24, 48, 36, 70]], find: true },
      { id: 'gehoergang', name: 'Gehörgang', alt: ['Gehoergang'], info: 'führt zum Trommelfell', mk: [[100, 76, 100, 92]], find: true },
      { id: 'trommelfell', name: 'Trommelfell', info: 'dünnes Häutchen, schwingt beim Hören', mk: [[140, 134, 151, 106]], find: true },
      { id: 'hammer', name: 'Hammer', info: 'Gehörknöchelchen', mk: [[150, 40, 165, 74]], find: false },
      { id: 'amboss', name: 'Amboss', info: 'Gehörknöchelchen', mk: [[186, 40, 181, 72]], find: false },
      { id: 'steigbuegel', name: 'Steigbügel', alt: ['Steigbuegel'], info: 'kleinster Knochen des Körpers (Mittelohr)', mk: [[214, 168, 192, 108]], find: true, fv: [130, 46, 100, 100] },
      { id: 'innenohr', name: 'Innenohr (Schnecke)', alt: ['Innenohr', 'Schnecke'], info: 'wandelt Schall in Nervensignale um', mk: [[300, 160, 262, 140]], find: true }
    ]
  };

  /* ======================= WIRBELSÄULE (Seitenansicht) ======================= */
  function crSample(pts, steps) {
    var out = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      for (var k = 0; k < steps; k++) {
        var t = k / steps, t2 = t * t, t3 = t2 * t;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
        ]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
  function makeCurve(pts) {
    var sm = crSample(pts, 40), cum = [0];
    for (var i = 1; i < sm.length; i++) cum.push(cum[i - 1] + Math.hypot(sm[i][0] - sm[i - 1][0], sm[i][1] - sm[i - 1][1]));
    return {
      len: cum[cum.length - 1],
      at: function (s) {
        s = Math.max(0, Math.min(this.len - 0.01, s));
        var lo = 0, hi = cum.length - 1;
        while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (cum[mid] <= s) lo = mid; else hi = mid; }
        var q = (s - cum[lo]) / ((cum[hi] - cum[lo]) || 1);
        var x = sm[lo][0] + (sm[hi][0] - sm[lo][0]) * q, y = sm[lo][1] + (sm[hi][1] - sm[lo][1]) * q;
        var tx = sm[hi][0] - sm[lo][0], ty = sm[hi][1] - sm[lo][1], l = Math.hypot(tx, ty) || 1;
        return { x: x, y: y, tx: tx / l, ty: ty / l, ang: Math.atan2(-(tx / l), ty / l) * 180 / Math.PI };
      }
    };
  }
  var SPINE = null;
  function spineLayout() {
    if (SPINE) return SPINE;
    var c = makeCurve([[116, 18], [126, 52], [120, 92], [98, 176], [106, 262], [124, 312], [118, 358], [98, 402], [102, 440], [114, 456]]);
    var segs = [], i;
    segs.push({ g: 'C', n: 1, h: 9, w: 18, sp: 9 }); segs.push({ gap: 2 });
    segs.push({ g: 'C', n: 2, h: 11, w: 16, sp: 13 });
    for (i = 3; i <= 7; i++) { segs.push({ disc: 2.6, w: 15 }); segs.push({ g: 'C', n: i, h: 9, w: 16, sp: 12 }); }
    for (i = 1; i <= 12; i++) { segs.push({ disc: 3, w: 19 }); segs.push({ g: 'T', n: i, h: 11.5, w: 20, sp: 16 }); }
    for (i = 1; i <= 5; i++) { segs.push({ disc: 4.4, w: 25 }); segs.push({ g: 'L', n: i, h: 16, w: 26, sp: 15 }); }
    segs.push({ disc: 4.4, w: 24 });
    segs.push({ g: 'S', h: 58 }); segs.push({ gap: 2 }); segs.push({ g: 'K', h: 24 });
    var need = 0; segs.forEach(function (q) { need += q.h || q.disc || q.gap || 0; });
    var k = c.len / need, pos = 0;
    segs.forEach(function (q) { var L = (q.h || q.disc || q.gap || 0) * k; q.s0 = pos; q.s1 = pos + L; q.mid = pos + L / 2; q.L = L; pos += L; });
    SPINE = { c: c, segs: segs, k: k };
    return SPINE;
  }
  function rot(p, inner) { return '<g transform="translate(' + f(p.x) + ',' + f(p.y) + ') rotate(' + f(p.ang) + ')">' + inner + '</g>'; }
  function vert(sg, c) {
    var p = c.at(sg.mid), h = sg.L, bw = sg.w, a = bw / 2, R = sg.g, n = sg.n, s;
    var spn = R === 'C' ? (n === 7 ? 11 : 7.5) : (R === 'T' ? 13.5 : 12.5), dy = R === 'T' ? h * 1.0 : (R === 'C' ? h * 0.2 : h * 0.06), tall = R === 'L' ? 0.4 : 0.22;
    var pts = [[-a + 0.5, -h * 0.34], [-a - 2.4, -h * 0.58], [-a - 5, -h * 0.36], [-a - 5 - spn, -h * tall + dy], [-a - 4 - spn, h * tall + dy], [-a - 4.6, h * 0.48], [-a - 2, h * 0.7], [-a + 0.5, h * 0.12]];
    var BHF = { fill: 'url(#{P}gBoneH)', stroke: C.bone, 'stroke-width': 0.8 };
    if (R === 'C' && n === 1) { // Atlas: Ring ohne Wirbelkörper
      s = tube('M' + f(-a + 2) + ',0 L' + f(-a - 9) + ',0', 3) + ell(-a - 9.4, 0, 2.2, 2.6, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.7 }) +
        rect(-a + 3, -h * 0.45, bw - 7, h * 0.9, 2, BHF) + ell(a - 1.6, 0, 2.4, h * 0.42, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.7 });
    } else {
      s = path(G.smooth(pts, true), { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 0.8, 'stroke-linejoin': 'round' });
      if (R === 'C' && n === 2) s += path('M-2.6,' + f(-h / 2 + 0.5) + ' L-2.2,' + f(-h / 2 - 5) + ' Q0,' + f(-h / 2 - 7.5) + ' 2.2,' + f(-h / 2 - 5) + ' L2.6,' + f(-h / 2 + 0.5) + ' Z', BHF);
      s += rect(-a, -h / 2, bw, h, Math.min(2.6, h * 0.24), G.ext(BHF, { 'stroke-width': 0.85 })) + line('M' + f(-a + 1.4) + ',' + f(-h / 2 + 0.9) + ' L' + f(a - 1.4) + ',' + f(-h / 2 + 0.9), '#FFFFFF', 0.9, 0.75);
      if (R === 'T') s += ell(-a + 2.2, -h * 0.28, 1.6, 1.2, { fill: '#C4AD82' });
    }
    return rot(p, s);
  }
  function band(c, s0, s1, w0, w1, n) { // Normale (ty, -tx) zeigt nach vorne (rechts)
    var pts = [], q;
    for (q = 0; q <= n; q++) { var pp = c.at(s0 + (s1 - s0) * q / n), ww = (w0 + (w1 - w0) * q / n) / 2; pts.push([pp.x + pp.ty * ww, pp.y - pp.tx * ww]); }
    for (q = n; q >= 0; q--) { var p2 = c.at(s0 + (s1 - s0) * q / n), w2 = (w0 + (w1 - w0) * q / n) / 2; pts.push([p2.x - p2.ty * w2, p2.y + p2.tx * w2]); }
    return 'M' + pts.map(pt).join(' L') + ' Z';
  }
  D.wirbelsaeule = {
    title: 'Wirbelsäule von der Seite', vb: [0, 0, 240, 470], kap: 'wirbel', lz: '2.3',
    render: function () {
      var L = spineLayout(), c = L.c, s = '', groups = { C: '', T: '', L: '', disc: '' }, atlas = '', axis = '';
      var spans = { C: [1e9, 0], T: [1e9, 0], L: [1e9, 0] };
      L.segs.forEach(function (q) {
        if (q.disc) {
          groups.disc += rot(c.at(q.mid), rect(-q.w / 2 + 1, -q.L / 2, q.w - 2, q.L, 1.4, { class: 'disc', fill: 'url(#{P}gDisc)', stroke: '#8E2A25', 'stroke-width': 0.6 }) +
            ell(1.5, 0, q.w * 0.2, Math.max(0.5, q.L * 0.22), { fill: '#FFFFFF', opacity: 0.35 }));
        } else if (q.g === 'C' || q.g === 'T' || q.g === 'L') {
          var v = vert(q, c);
          if (q.g === 'C' && q.n === 1) atlas = v; else if (q.g === 'C' && q.n === 2) axis = v; else groups[q.g] += v;
          var yy = c.at(q.mid).y; spans[q.g][0] = Math.min(spans[q.g][0], yy); spans[q.g][1] = Math.max(spans[q.g][1], yy);
        }
      });
      var S = L.segs.filter(function (q) { return q.g === 'S'; })[0], K = L.segs.filter(function (q) { return q.g === 'K'; })[0], j;
      var sac = path(band(c, S.s0, S.s1, 28, 12, 14), { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 0.85, 'stroke-linejoin': 'round' });
      for (j = 1; j < 5; j++) {
        var pj = c.at(S.s0 + S.L * j / 5), wj = (28 - 16 * j / 5) / 2;
        sac += line('M' + f(pj.x - pj.ty * wj + 1) + ',' + f(pj.y + pj.tx * wj) + ' L' + f(pj.x + pj.ty * wj - 1) + ',' + f(pj.y - pj.tx * wj), '#B8A078', 1, 0.9);
        var pm = c.at(S.s0 + S.L * (j - 0.5) / 5), wm = (28 - 16 * (j - 0.5) / 5) / 2 - 3;
        sac += ell(pm.x - pm.ty * wm, pm.y + pm.tx * wm, 1.3, 1.6, { fill: 'url(#{P}gHole)' });
      }
      var coc = '';
      for (j = 0; j < 4; j++) {
        var a0 = K.s0 + K.L * j / 4 + 0.6, a1 = K.s0 + K.L * (j + 1) / 4 - 0.6, w0 = 11 - j * 2.2, w1 = 11 - (j + 1) * 2.2;
        coc += path(band(c, a0, a1, w0, Math.max(w1, 3), 3), { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 0.8, 'stroke-linejoin': 'round' });
      }
      function br(y0, y1) { return '<path class="brk" d="M196,' + f(y0) + ' h6 V' + f(y1) + ' h-6"/>'; }
      var brs = br(c.at(L.segs[0].s0).y, spans.C[1] + 4) + br(spans.T[0] - 4, spans.T[1] + 4) + br(spans.L[0] - 6, spans.L[1] + 6) + br(c.at(S.s0).y, c.at(S.s1).y) + br(c.at(K.s0).y, c.at(K.s1).y + 2);
      s += part('halswirbel', '<g class="part-rest">' + groups.C + '</g>' + HR(92, 10, 50, spans.C[1] - 4) + part('atlas', atlas) + part('axis', axis));
      s += part('brustwirbel', groups.T + HR(70, spans.T[0] - 6, 62, spans.T[1] - spans.T[0] + 12));
      s += part('lendenwirbel', groups.L + HR(86, spans.L[0] - 9, 60, spans.L[1] - spans.L[0] + 18));
      s += part('kreuzbein', sac);
      s += part('steissbein', coc + HR(86, c.at(K.s0).y - 2, 34, K.L + 6));
      s += part('bandscheiben', groups.disc);
      return G.spot(112, 240, 110, 235) + g(s, { class: 'shw', filter: 'url(#{P}sh)' }) + brs;
    },
    parts: []
  };
  (function () { // Marker aus dem berechneten Verlauf
    var L = spineLayout(), c = L.c;
    function sg(gr, n) { return L.segs.filter(function (x) { return x.g === gr && (n == null || x.n === n); })[0]; }
    function ant(q, dx) { var p = c.at(q.mid); return [p.x + p.ty * (dx || 10), p.y - p.tx * (dx || 10)]; }
    function post(q, dx) { var p = c.at(q.mid); return [p.x - p.ty * dx, p.y + p.tx * dx]; }
    var c4 = ant(sg('C', 4), 8), t6 = ant(sg('T', 6), 10), l3 = ant(sg('L', 3), 13), sa = ant(sg('S'), 10), ko = ant(sg('K'), 4), at = post(sg('C', 1), 12), ax = post(sg('C', 2), 12);
    var discs = L.segs.filter(function (x) { return x.disc; }), dl = discs[discs.length - 3], dp = c.at(dl.mid), dpt = [dp.x - dp.ty * 9, dp.y + dp.tx * 9];
    D.wirbelsaeule.parts = [
      { id: 'halswirbel', name: 'Halswirbel', alt: ['Halswirbelsäule', 'Halswirbelsaeule'], info: '7 Halswirbel – tragen und bewegen den Kopf', mk: [[222, c4[1], c4[0], c4[1]]], find: true },
      { id: 'atlas', name: 'Atlas', info: '1. Halswirbel – trägt den Kopf', mk: [[30, at[1] - 4, at[0], at[1]]], find: false },
      { id: 'axis', name: 'Axis', info: '2. Halswirbel – um ihn dreht sich der Kopf', mk: [[30, ax[1] + 14, ax[0], ax[1]]], find: false },
      { id: 'brustwirbel', name: 'Brustwirbel', alt: ['Brustwirbelsäule'], info: '12 Brustwirbel – an ihnen hängen die Rippen', mk: [[222, t6[1], t6[0], t6[1]]], find: true },
      { id: 'lendenwirbel', name: 'Lendenwirbel', alt: ['Lendenwirbelsäule'], info: '5 Lendenwirbel – die dicksten Wirbel', mk: [[222, l3[1], l3[0], l3[1]]], find: true },
      { id: 'kreuzbein', name: 'Kreuzbein', info: '5 verwachsene Wirbel', mk: [[222, sa[1], sa[0], sa[1]]], find: true },
      { id: 'steissbein', name: 'Steißbein', alt: ['Steissbein'], info: '4–5 verkümmerte Wirbel (meist 4)', mk: [[222, ko[1] + 6, ko[0], ko[1]]], find: true },
      { id: 'bandscheiben', name: 'Bandscheiben', alt: ['Bandscheibe'], info: 'weiche Polster zwischen den Wirbeln', mk: [[30, dpt[1], dpt[0], dpt[1]]], find: false }
    ];
  })();

  /* ======================= WIRBEL-AUSSCHNITT ======================= */
  D.wirbelausschnitt = {
    title: 'Wirbel und Bandscheibe', vb: [0, 0, 230, 228], kap: 'wirbel', lz: '2.1',
    render: function () {
      var w = '', b = '';
      for (var i = 0; i < 3; i++) {
        var y = 14 + i * 72;
        w += path(G.smooth([[113, y + 8], [104, y + 3], [92, y + 9], [57, y + 26], [50, y + 33], [55, y + 41], [92, y + 34], [104, y + 45], [113, y + 38]], true), { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
          G.gloss(80, y + 25, 14, 2.6, -24, 0.55) +
          rect(112, y, 72, 46, 7, { fill: 'url(#{P}gBoneH)', stroke: C.bone, 'stroke-width': 1.1 }) +
          line('M119,' + (y + 2.2) + ' L177,' + (y + 2.2), '#FFFFFF', 1.6, 0.85) + line('M119,' + (y + 43.8) + ' L177,' + (y + 43.8), '#B59D74', 1.3, 0.55) + G.gloss(134, y + 23, 4, 15, 0, 0.5);
        if (i < 2) {
          var yd = y + 49;
          b += rect(114, yd, 68, 20, 7, { class: 'disc', fill: 'url(#{P}gDisc)', stroke: '#8E2A25', 'stroke-width': 0.9 }) +
            line('M120,' + (yd + 5) + ' Q148,' + (yd + 1.5) + ' 176,' + (yd + 5), '#B23A32', 0.8, 0.55) + line('M120,' + (yd + 15) + ' Q148,' + (yd + 18.5) + ' 176,' + (yd + 15), '#B23A32', 0.8, 0.55) +
            ell(148, yd + 10, 15, 4.6, { fill: '#FFD2CA', opacity: 0.85 }) + G.gloss(143, yd + 8.6, 8, 1.8, 0, 0.8);
        }
      }
      return G.spot(130, 114, 112, 112) + g(part('wirbel', w) + part('bandscheibe', b), { class: 'shw', filter: 'url(#{P}sh)' });
    },
    parts: [
      { id: 'wirbel', name: 'Wirbel', alt: ['Wirbelknochen'], info: 'Knochen der Wirbelsäule', mk: [[212, 36, 182, 36]], find: true },
      { id: 'bandscheibe', name: 'Bandscheibe', alt: ['Bandscheiben'], info: 'Polster zwischen zwei Wirbeln', mk: [[212, 76, 180, 76]], find: true }
    ]
  };

  /* ======================= GELENKE AM KÖRPER ======================= */
  var SKH = { fill: 'url(#{P}gSkinH)', stroke: C.skin, 'stroke-width': 1, 'stroke-linejoin': 'round' };
  function kidFace(cx, cy) {
    return both(ell(cx - 8.5, cy + 3, 3, 3.6, { fill: '#2A2230' }) + G.circ(cx - 7.4, cy + 1.6, 1.1, { fill: '#FFFFFF' }) + line('M' + f(cx - 12) + ',' + f(cy - 5) + ' Q' + f(cx - 8.5) + ',' + f(cy - 7.5) + ' ' + f(cx - 5) + ',' + f(cy - 5.5), '#5A3A28', 1.4) +
      ell(cx - 15, cy + 11, 5, 3, { fill: '#F49C94', opacity: 0.5 }), cx) +
      line('M' + f(cx - 9) + ',' + f(cy + 14) + ' Q' + f(cx) + ',' + f(cy + 21) + ' ' + f(cx + 9) + ',' + f(cy + 14), '#7A3B2E', 2) + line('M' + f(cx - 1.6) + ',' + f(cy + 7) + ' Q' + f(cx) + ',' + f(cy + 9) + ' ' + f(cx + 1.6) + ',' + f(cy + 7), '#C98A6D', 1.2);
  }
  function joint(cx, cy) {
    return G.circ(cx, cy, 12.5, { fill: '#21AB9C', opacity: 0.2 }) + G.circ(cx, cy, 8.4, { fill: '#FFFFFF', stroke: '#139486', 'stroke-width': 2.2, filter: 'url(#{P}shS)' }) + G.circ(cx, cy, 4, { fill: 'url(#{P}gJoint)' });
  }
  D.gelenkkoerper = {
    title: 'Gelenke am Körper', vb: [0, 0, 240, 430], kap: 'gelenke', lz: '3.3',
    render: function () {
      var legL = path(G.limb([[100, 232], [101, 262], [102, 292], [102, 322]], 25, 18, 0.03).d, SKH) + path(G.limb([[102, 320], [102, 346], [102, 372], [102, 397]], 16.5, 12, 0.08).d, SKH) +
        rect(94.5, 386, 15, 13, 3, { fill: '#FFFFFF', stroke: '#CFCFCF', 'stroke-width': 0.8 }) + line('M95,390.5 L109.5,390.5', '#21AB9C', 1.6) +
        path('M93,397 L110.5,397 C112.5,403 111.5,409.5 107,412 L83,412.6 C76.6,412.6 75.8,405.6 81.4,403.2 L93,400.6 Z', { fill: 'url(#{P}gShoe)', stroke: '#B8401C', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }) +
        path('M76.6,409.8 L111.2,409.2 C110.8,412.4 108.4,414.8 105.4,414.8 L82,415 C78.6,415 76.8,412.8 76.6,409.8 Z', { fill: '#FFFFFF', stroke: '#C9C9C9', 'stroke-width': 0.7 }) + G.gloss(100, 401, 5, 1.6, 0, 0.6);
      var armL = path(G.limb([[90, 106], [80, 132], [70, 160], [63, 186]], 17.5, 13.5, 0.04).d, SKH) + path(G.limb([[63, 186], [60, 206], [57, 226], [54.5, 246]], 13.5, 10.5, 0.02).d, SKH) +
        path('M46.5,244 C44,252 44,263 46.5,270.5 C48.5,276.5 52.5,279.5 56.5,279.5 C60.5,279.5 63.5,276 64.5,271 C65.5,265 65.5,256 63.5,248 Z', SKH) +
        path('M61.5,251 C66.5,250.5 69,254.5 67,259 C65.5,262 62.5,262.5 61,260 Z', SKH) + line('M50.5,271 L50.5,277 M54.5,272.5 L54.5,279 M58.5,272 L58.5,278.5', '#D39C80', 0.9, 0.8);
      var sleeve = path('M85,98.5 C74,101 66,111 62.5,124 L59.5,135.5 C66,139 72.5,141 79,141.5 L84.5,128 C87,120 91,113 96,108 Z', { fill: 'url(#{P}gShirt)', stroke: '#0E7268', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }) +
        line('M60.5,133 C66.5,136.5 72.5,138.5 79,139', '#0E7268', 1.4, 0.6);
      var body = both(legL, 120) +
        path('M83,222 L157,222 L161.5,266 C151,270.5 133,271.5 125,268.5 L120,248 L115,268.5 C107,271.5 89,270.5 78.5,266 Z', { fill: 'url(#{P}gShort)', stroke: '#22397A', 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        rect(83, 222, 74, 7.5, 2, { fill: '#2B4A8C' }) + line('M120,231 L120,246', '#22397A', 1, 0.7) +
        both(armL, 120) +
        path('M86,98 C98,92 142,92 154,98 C160,104 162,116 160,132 L157,170 C156,196 157,214 158,230 L82,230 C83,214 84,196 83,170 L80,132 C78,116 80,104 86,98 Z', { fill: 'url(#{P}gShirt)', stroke: '#0E7268', 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        both(sleeve, 120) + path('M108,95.5 C112,102 128,102 132,95.5', { fill: 'none', stroke: '#0E7268', 'stroke-width': 2.4, 'stroke-linecap': 'round' }) +
        path('M120,140 L123.6,147.6 L131.8,148.6 L125.8,154.2 L127.4,162.4 L120,158.4 L112.6,162.4 L114.2,154.2 L108.2,148.6 L116.4,147.6 Z', { fill: '#FFD34D', stroke: '#E0A800', 'stroke-width': 0.8, 'stroke-linejoin': 'round' }) +
        G.gloss(100, 120, 8, 20, 10, 0.25) +
        rect(111, 78, 18, 20, 7, SKH) + both(ell(89, 58, 5.5, 7.5, SKH), 120) +
        ell(120, 54, 31, 32, { fill: 'url(#{P}gSkinR)', stroke: C.skin, 'stroke-width': 1.1 }) +
        path('M88,54 C85,29 101,15 121,15 C142,15 157,29 153,54 C150,43 143,36 134,33.5 C127,40 115,42 102,37.5 C95,41 90,47 88,54 Z', { fill: 'url(#{P}gHair)', stroke: '#3A2418', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }) +
        G.gloss(112, 24, 10, 3.4, -12, 0.45) + kidFace(120, 55);
      var s = G.spot(120, 220, 118, 215) + G.ground(120, 414, 66, 7) + g(body, { class: 'shw', filter: 'url(#{P}sh)' });
      s += part('schultergelenk', joint(88, 108) + joint(152, 108));
      s += part('ellenbogengelenk', joint(63, 186) + joint(177, 186));
      s += part('fingergelenk', joint(57, 268) + joint(183, 268));
      s += part('hueftgelenk', joint(98, 234) + joint(142, 234));
      s += part('kniegelenk', joint(102, 322) + joint(138, 322));
      return s;
    },
    parts: [
      { id: 'schultergelenk', name: 'Schultergelenk', alt: ['Schulter'], info: 'Kugelgelenk – Arm kreisen', mk: [[214, 92, 160, 104]], find: true, typ: 'kugel' },
      { id: 'ellenbogengelenk', name: 'Ellenbogengelenk', alt: ['Ellenbogen', 'Ellbogen'], info: 'Scharniergelenk – beugen und strecken', mk: [[216, 180, 186, 186]], find: true, typ: 'scharnier' },
      { id: 'fingergelenk', name: 'Fingergelenk', alt: ['Finger', 'Fingergelenke'], info: 'Scharniergelenk', mk: [[218, 270, 192, 268]], find: true, typ: 'scharnier' },
      { id: 'hueftgelenk', name: 'Hüftgelenk', alt: ['Hüfte', 'Huefte', 'Hueftgelenk'], info: 'Kugelgelenk – Bein kreisen', mk: [[22, 234, 89, 234]], find: true, typ: 'kugel' },
      { id: 'kniegelenk', name: 'Kniegelenk', alt: ['Knie'], info: 'Scharniergelenk (vereinfacht)', mk: [[22, 322, 93, 322]], find: true, typ: 'scharnier' }
    ]
  };

  /* ======================= GELENKARTEN (Schema) ======================= */
  D.gelenkarten = {
    title: 'Kugelgelenk und Scharniergelenk', vb: [0, 0, 300, 230], kap: 'gelenke', lz: '3.4',
    render: function () {
      var BH = { fill: 'url(#{P}gBoneH)', stroke: C.bone, 'stroke-width': 1 }, TEAL = '#0E8A7E';
      function arc(d, a0, a1) { return path(d, { fill: 'none', stroke: TEAL, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-dasharray': '5 4' }) + (a0 ? G.arrowHead(a0[0], a0[1], a0[2], 6, TEAL) : '') + (a1 ? G.arrowHead(a1[0], a1[1], a1[2], 6, TEAL) : ''); }
      // Kugelgelenk: Kugel in einer Pfanne
      var kg = rect(64, 6, 22, 60, 6, BH) + G.gloss(71, 32, 2.4, 17, 0, 0.5);
      var kgMove = '<g class="kg-move">' + rect(67, 108, 16, 98, 5, BH) + G.gloss(72, 154, 2, 32, 0, 0.5) + path('M67.5,116 C67.5,108 70.5,104 75,104 C79.5,104 82.5,108 82.5,116 Z', BH) +
        G.circ(75, 94, 18.5, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 1 }) + path('M58.4,88 A18,18 0 0 1 91.6,88', { fill: 'none', stroke: '#BCD6EA', 'stroke-width': 3, 'stroke-linecap': 'round' }) +
        G.gloss(68.5, 86, 6.5, 4, -30, 0.95) + '</g>';
      var cup = path('M46,95 C46,73 59,63 75,63 C91,63 104,73 104,95 L97.5,95 C97.5,79 88,70.5 75,70.5 C62,70.5 52.5,79 52.5,95 Z', { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        path('M53.6,94 C53.6,80 62.6,71.6 75,71.6 C87.4,71.6 96.4,80 96.4,94', { fill: 'none', stroke: '#BCD6EA', 'stroke-width': 2.2 }) + G.gloss(62, 70, 7, 1.8, -28, 0.7);
      kg += kgMove + cup + arc('M56,207 A19,6 0 1 0 94,207', null, [94, 207, -70]);
      // Scharniergelenk: Rolle in einer Mulde
      var sg = rect(215, 6, 20, 62, 6, BH) + G.gloss(222, 32, 2.4, 17, 0, 0.5) + path('M215,60 L235,60 L238,74 L212,74 Z', BH) +
        G.circ(225, 84, 13, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 1 }) + G.circ(225, 84, 4, { fill: 'url(#{P}gMetal)', stroke: '#4A5568', 'stroke-width': 0.8 }) + G.gloss(220, 78, 4, 2.6, -30, 0.9);
      var sgMove = '<g class="sg-move">' + path('M207,82 C206,98 214,110 225,110 C236,110 244,98 243,82 L236.5,84 C237,95 232,103 225,103 C218,103 213,95 213.5,84 Z', { fill: 'url(#{P}gBone)', stroke: C.bone, 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        path('M214.6,85 C214.4,95 219,101.8 225,101.8 C231,101.8 235.6,95 235.4,85', { fill: 'none', stroke: '#BCD6EA', 'stroke-width': 2.2 }) +
        rect(218, 106, 14, 98, 5, BH) + G.gloss(222.5, 154, 2, 32, 0, 0.5) + '</g>';
      sg += sgMove + arc('M244.1,192.3 A110,110 0 0 0 288.1,174.1', [244.1, 192.3, 170], [288.1, 174.1, -35]);
      return G.spot(150, 110, 150, 115) + part('kugelgelenk', g(kg, { class: 'shw', filter: 'url(#{P}sh)' }) + HR(14, 4, 122, 222)) + part('scharniergelenk', g(sg, { class: 'shw', filter: 'url(#{P}sh)' }) + HR(170, 4, 122, 222));
    },
    parts: [
      { id: 'kugelgelenk', name: 'Kugelgelenk', alt: ['Drehgelenk'], info: 'Kugel in einer Pfanne – Bewegung in alle Richtungen', mk: [[18, 40, 60, 92]], find: true },
      { id: 'scharniergelenk', name: 'Scharniergelenk', alt: ['Klappgelenk', 'Scharnier'], info: 'wie ein Türscharnier – nur beugen und strecken', mk: [[282, 40, 240, 86]], find: true }
    ]
  };
})(window.ATLAS = window.ATLAS || {});
