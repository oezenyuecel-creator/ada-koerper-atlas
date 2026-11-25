/* Adas Körper-Atlas – anatomische SVG-Grafiken (selbst gezeichnet, schematisch).
   Jede Grafik: vb (viewBox), render() → SVG-Inhalt, parts: [{id, name, alt, info, mk: [[markerX, markerY, ankerX, ankerY], …], find, q}] */
(function (A) {
  'use strict';
  var D = A.diagramme = {};

  /* ---------- Hilfen ---------- */
  function T(d, w) { // Knochen-Röhre: Umriss + Füllung
    return '<path class="bo" d="' + d + '" stroke-width="' + (w + 2.4).toFixed(1) + '"/><path class="bi" d="' + d + '" stroke-width="' + w + '"/>';
  }
  function H(d, w) { return '<path class="hit" d="' + d + '" stroke-width="' + w + '"/>'; }
  function HR(x, y, w, h) { return '<rect class="hitr" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>'; }
  function E(cx, cy, rx, ry, c) { return '<ellipse class="' + (c || 'bf') + '" cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"/>'; }
  function P(d, c) { return '<path class="' + c + '" d="' + d + '"/>'; }
  function mirror(frag, cx) { return '<g transform="matrix(-1 0 0 1 ' + (2 * (cx || 150)) + ' 0)">' + frag + '</g>'; }
  function both(frag, cx) { return frag + mirror(frag, cx); }
  function part(id, inner, extra) { return '<g class="part" data-part="' + id + '"' + (extra || '') + '>' + inner + '</g>'; }
  A.svgHelpers = { T: T, H: H, E: E, P: P, mirror: mirror, both: both, part: part };

  /* ======================= SKELETT ======================= */
  D.skelett = {
    title: 'Skelett von vorne', vb: [0, 0, 300, 665], kap: 'skelett', lz: '1.5',
    render: function () {
      var s = '';
      // Schulterblatt (hinter den Rippen)
      s += part('schulterblatt', both(P('M101,163 Q114,157 128,160 L121,229 Q108,201 101,163 Z', 'bf bf2') + HR(96, 160, 16, 40)));
      // Becken
      var beckenL = P('M147,311 C129,299 106,297 97,311 C92,322 97,335 107,343 C113,348 116,356 118,363 C121,371 133,374 142,371 L147,365 C149,353 149,338 147,326 Z', 'bf') +
        E(131, 358, 7, 5, 'hole');
      s += part('becken', both(beckenL));
      // Wirbelsäule (vorne)
      var ws = '', i;
      for (i = 0; i < 7; i++) ws += '<rect class="bf" x="143.5" y="' + (123 + i * 4.3).toFixed(1) + '" width="13" height="3.4" rx="1.2"/>';
      for (i = 0; i < 12; i++) ws += '<rect class="bf" x="142.5" y="' + (154 + i * 7.7).toFixed(1) + '" width="15" height="6.6" rx="1.5"/>';
      for (i = 0; i < 5; i++) ws += '<rect class="bf" x="140.5" y="' + (249 + i * 11.2).toFixed(1) + '" width="19" height="9.6" rx="2"/>';
      ws += P('M139,306 L161,306 L157,334 L150,346 L143,334 Z', 'bf') + P('M141,313 L159,313 M142,320 L158,320 M144,327 L156,327 M146,334 L154,334', 'sk-l');
      ws += P('M147,347 L153,347 L151.5,357 L148.5,357 Z', 'bf');
      ws += HR(140, 122, 20, 236);
      s += part('wirbelsaeule', ws);
      // Rippen
      var R = [[160, 24, 9], [168, 33, 13], [177, 40, 16], [186, 45, 18], [196, 49, 19], [206, 51, 19], [218, 52, 19]];
      var rib = '', hit = '';
      R.forEach(function (r) {
        var ys = r[0], w = r[1], dr = r[2];
        var d = 'M143,' + ys + ' Q' + (150 - w * 0.62).toFixed(1) + ',' + (ys + dr * 0.15).toFixed(1) + ' ' + (150 - w) + ',' + (ys + dr) +
          ' Q' + (150 - w - 4) + ',' + (ys + dr - 7) + ' ' + (150 - w + 2) + ',' + (ys + dr - 13);
        rib += T(d, 2.8); hit += H(d, 7);
      });
      [[137, 238, 52, 13], [131, 245, 51, 11], [126, 251, 49, 9]].forEach(function (r) {
        var d = 'M' + r[0] + ',' + r[1] + ' Q' + (150 - r[2] * 0.75).toFixed(1) + ',' + (r[1] + r[3] * 0.4).toFixed(1) + ' ' + (150 - r[2]) + ',' + (r[1] + r[3]) +
          ' Q' + (150 - r[2] - 4) + ',' + (r[1] + r[3] - 7) + ' ' + (150 - r[2] + 2) + ',' + (r[1] + r[3] - 13);
        rib += T(d, 2.6); hit += H(d, 7);
      });
      rib += T('M104,266 Q99,268 96,259', 2.4) + T('M108,274 Q103,276 101,268', 2.2);
      rib += P('M146,236 L137,240 L131,246 L126,252 L122,257', 'cart');
      s += part('rippen', both(rib + hit));
      // Brustbein
      s += part('brustbein', P('M142,155 L158,155 L160,168 L157,231 L150,243 L143,231 L140,168 Z', 'bf'));
      // Schlüsselbein
      s += part('schluesselbein', both(T('M146,158 C134,151 118,158 100,151', 5) + H('M146,158 C134,151 118,158 100,151', 10)));
      // Schädel
      s += part('schaedel',
        P('M150,18 C126,18 113,36 113,60 C113,76 120,86 125,92 L125,104 C125,112 136,121 150,121 C164,121 175,112 175,104 L175,92 C180,86 187,76 187,60 C187,36 174,18 150,18 Z', 'bf') +
        E(137, 66, 9, 8, 'sk-d') + E(163, 66, 9, 8, 'sk-d') + P('M150,74 L145,86 L155,86 Z', 'sk-d') +
        P('M134,98 L166,98 M137,104 L163,104 M140,95 L140,107 M145,95 L145,107 M150,95 L150,107 M155,95 L155,107 M160,95 L160,107', 'sk-l') +
        P('M150,19 C146,30 153,40 147,52', 'sk-l'));
      // Arm (links gezeichnet, gespiegelt)
      s += part('oberarmknochen', both(E(100, 169, 8.5, 8.5) + T('M99,176 C97,210 93,250 89,283', 7.5) + E(89, 288, 10, 5) + H('M99,172 C97,210 93,250 89,286', 13)));
      s += part('elle', both(T('M93,294 C93,320 91,356 87,386', 4.2) + E(93, 293, 4, 4.5) + E(87, 388, 2.6, 2.6) + H('M93,292 C93,320 91,356 87,388', 9)));
      s += part('speiche', both(T('M84,296 C82,322 78,358 74,388', 4.6) + E(74, 390, 5, 3) + H('M84,296 C82,322 78,358 74,390', 9)));
      var carp = '';
      [[71.5, 395], [77, 395], [82.5, 395], [88, 395], [71, 401], [76.5, 401], [82, 401], [87.5, 401]].forEach(function (c) { carp += E(c[0], c[1], 2.8, 2.4); });
      s += part('handwurzel', both(carp + HR(66, 391, 27, 14)));
      s += part('mittelhand', both(T('M70,404 L62,419', 2.6) + T('M74,405 L72,428', 2.4) + T('M79.5,405 L79,430', 2.4) + T('M85,405 L86,428', 2.4) + T('M89.5,404 L92,425', 2.3) +
        HR(58, 405, 37, 24)));
      s += part('finger', both(
        T('M61,421 L57,430', 2.3) + T('M56.5,432 L54,439', 2.2) +
        T('M71.8,430.5 L71.2,439.5', 2.2) + T('M71.1,441.5 L70.8,447.5', 2.1) + T('M70.8,449.5 L70.6,454', 2) +
        T('M79,432.5 L79,442', 2.2) + T('M79,444 L79,450.5', 2.1) + T('M79,452.5 L79,457.5', 2) +
        T('M86.2,430.5 L86.6,439.5', 2.2) + T('M86.7,441.5 L87,447.5', 2.1) + T('M87,449.5 L87.2,454', 2) +
        T('M92.3,427.5 L93.2,434.5', 2.1) + T('M93.3,436.5 L93.8,441.5', 2) + T('M93.9,443.5 L94.2,447.5', 1.9) +
        HR(50, 429, 47, 31)));
      // Bein
      s += part('oberschenkelknochen', both(E(115, 355, 7.5, 7.5) + T('M113,358 L106,366', 7) + E(103, 366, 5, 6) + T('M107,368 C112,405 118,450 121,489', 8.5) + E(121, 494, 12, 6.5) +
        H('M110,362 C112,405 118,450 121,492', 15)));
      s += part('schienbein', both(E(123, 507, 12.5, 4.5) + T('M125,511 C126,540 126,570 127,598', 7.5) + E(130, 601, 4, 3.5) + H('M125,509 C126,540 126,570 128,600', 12)));
      s += part('wadenbein', both(E(110, 510, 3.5, 3) + T('M110,513 C110,545 111,575 113,600', 3.2) + E(113, 604, 3, 3.5) + H('M110,511 C110,545 111,575 113,603', 9)));
      s += part('kniescheibe', both(E(121, 497, 6.5, 7.5, 'bf bf3')));
      var tars = E(119, 615, 6, 3.5) + E(122, 609, 7.5, 4.5) + E(127, 616, 4, 2.8) + E(115, 620, 3.8, 3) + E(122, 622.5, 2.6, 2.6) + E(127, 623, 2.4, 2.4) + E(131.5, 622.5, 2.4, 2.4);
      s += part('fusswurzel', both(tars + HR(110, 604, 26, 21)));
      s += part('mittelfuss', both(T('M132,625 L136,642', 3.3) + T('M127.5,626 L129.5,644', 2.6) + T('M122.5,626 L123,644', 2.5) + T('M118,625 L116.5,642', 2.4) + T('M114,623 L110.5,639', 2.4) +
        HR(106, 625, 33, 19)));
      s += part('zehen', both(
        T('M136.5,644 L137.6,650.5', 3.1) + T('M137.8,652.5 L138.6,658', 2.9) +
        T('M129.8,646 L130.3,650.5', 2.3) + T('M130.4,652.3 L130.6,655.5', 2.1) + T('M130.7,657.2 L130.8,659.5', 2) +
        T('M123,646 L123.1,650.4', 2.3) + T('M123.1,652.2 L123.2,655.4', 2.1) + T('M123.2,657.1 L123.2,659.3', 2) +
        T('M116.3,644 L115.8,648.2', 2.2) + T('M115.7,650 L115.4,653', 2.1) + T('M115.3,654.7 L115.2,656.8', 1.9) +
        T('M110.2,641 L109.4,645', 2.1) + T('M109.3,646.8 L108.9,649.6', 2) + T('M108.8,651.2 L108.6,653.2', 1.8) +
        HR(104, 642, 38, 20)));
      return s;
    },
    parts: [
      { id: 'schaedel', name: 'Schädel', alt: ['Schaedel', 'Kopf'], info: 'schützt das Gehirn · Blatt: 25', mk: [[262, 40, 182, 50]], find: true },
      { id: 'schluesselbein', name: 'Schlüsselbein', info: 'vorne zwischen Brustbein und Schulter · 1 + 1', mk: [[262, 132, 196, 153]], find: true },
      { id: 'schulterblatt', name: 'Schulterblatt', info: 'flach, liegt hinten an der Schulter · 1 + 1', mk: [[28, 176, 113, 214]], find: false },
      { id: 'brustbein', name: 'Brustbein', info: 'Mitte vom Brustkorb · 1', mk: [[28, 214, 144, 205]], find: true },
      { id: 'rippen', name: 'Rippen', alt: ['Rippe'], info: '12 Paare, schützen Herz und Lunge · 12 + 12', mk: [[270, 194, 192, 204]], find: true },
      { id: 'wirbelsaeule', name: 'Wirbelsäule', alt: ['Wirbelsaeule'], info: 'viele Wirbel, hält uns aufrecht · Blatt: 33', mk: [[28, 282, 141, 285]], find: true },
      { id: 'becken', name: 'Becken', info: 'verbindet Wirbelsäule und Beine · Blatt: 3 + 3', mk: [[28, 318, 104, 322]], find: true },
      { id: 'oberarmknochen', name: 'Oberarmknochen', alt: ['Oberarm'], info: 'im Oberarm · 1 + 1', mk: [[270, 232, 205, 230]], find: true },
      { id: 'elle', name: 'Elle', info: 'Unterarm, Seite vom kleinen Finger, bildet die Ellenbogenspitze · 1 + 1', mk: [[272, 324, 207.6, 324]], find: true, fv: [40, 276, 84, 190] },
      { id: 'speiche', name: 'Speiche', info: 'Unterarm, Daumenseite · 1 + 1', mk: [[28, 350, 79, 350]], find: true, fv: [40, 276, 84, 190] },
      { id: 'handwurzel', name: 'Handwurzelknochen', alt: ['Handwurzel', 'Handwurzelknochen'], info: '8 kleine Knochen am Handgelenk · 8 + 8', mk: [[28, 398, 68, 398]], find: true, fv: [40, 276, 84, 190] },
      { id: 'mittelhand', name: 'Mittelhandknochen', alt: ['Mittelhand'], info: '5 Knochen in der Handfläche · 5 + 5', mk: [[272, 412, 227, 414]], find: true, fv: [40, 276, 84, 190] },
      { id: 'finger', name: 'Fingerknochen', alt: ['Finger'], info: '14 pro Hand · 14 + 14', mk: [[28, 446, 68, 446]], find: true, fv: [40, 276, 84, 190] },
      { id: 'oberschenkelknochen', name: 'Oberschenkelknochen', alt: ['Oberschenkel'], info: 'der größte Knochen · 1 + 1', mk: [[272, 456, 182, 456]], find: true },
      { id: 'kniescheibe', name: 'Kniescheibe', info: 'vorne am Knie · 1 + 1', mk: [[28, 497, 114, 497]], find: true, fv: [86, 466, 70, 148] },
      { id: 'schienbein', name: 'Schienbein', info: 'dicker Knochen vorne/innen am Unterschenkel · 1 + 1', mk: [[270, 560, 174, 560]], find: true, fv: [86, 466, 70, 148] },
      { id: 'wadenbein', name: 'Wadenbein', info: 'dünner Knochen außen am Unterschenkel · 1 + 1', mk: [[28, 560, 110, 560]], find: true, fv: [86, 466, 70, 148] },
      { id: 'fusswurzel', name: 'Fußwurzelknochen', alt: ['Fußwurzel', 'Fusswurzelknochen'], info: '7 Knochen, mit der Ferse · 7 + 7', mk: [[270, 612, 184, 612]], find: true, fv: [98, 594, 50, 70] },
      { id: 'mittelfuss', name: 'Mittelfußknochen', alt: ['Mittelfuß', 'Mittelfussknochen'], info: '5 Knochen · 5 + 5', mk: [[28, 634, 117, 634]], find: true, fv: [98, 594, 50, 70] },
      { id: 'zehen', name: 'Zehenknochen', alt: ['Zehen', 'Zehknochen'], info: '14 pro Fuß · 14 + 14', mk: [[270, 654, 170, 654]], find: true, fv: [98, 594, 50, 70] }
    ]
  };

  /* ======================= OHR ======================= */
  D.ohr = {
    title: 'Das Ohr (Schnitt)', vb: [0, 0, 320, 190], kap: 'skelett', lz: '1.3',
    render: function () {
      var s = '<rect class="ear-bg" x="0" y="20" width="320" height="160" rx="18"/>';
      s += part('ohrmuschel', P('M42,30 C10,42 8,122 38,160 C48,172 64,168 61,150 C58,130 46,120 52,95 C56,80 70,70 66,50 C63,36 54,28 42,30 Z', 'ear-skin'));
      s += part('gehoergang', P('M56,88 L150,90 L150,109 L56,109 Z', 'ear-canal'));
      s += '<rect class="ear-mid" x="155" y="58" width="52" height="84" rx="10"/>';
      s += part('trommelfell', E(152, 99, 3.5, 13, 'ear-drum') + HR(146, 84, 10, 30));
      s += part('hammer', P('M156,110 L160,88 C161,80 163,74 168,72 C173,71 175,77 171,82 L163,92 Z', 'bf') + HR(157, 66, 13, 32));
      s += part('amboss', P('M170,74 C176,68 186,70 188,78 L186,95 L182,95 L181,86 C178,88 172,86 170,80 Z', 'bf') + HR(170, 66, 19, 20));
      s += part('steigbuegel', T('M184,98 Q192,88 199,93', 2.2) + T('M184,102 Q192,112 199,107', 2.2) + E(200, 100, 2.4, 8.5) + E(183, 100, 2.8, 2.8) + HR(178, 88, 28, 26));
      s += part('innenohr',
        P('M206,92 C214,86 224,90 226,98', 'ear-in') +
        P('M244,128 m-22,0 a22,20 0 1,1 44,0 a22,20 0 1,1 -44,0 M244,128 m-13,0 a13,12 0 1,1 26,0 a13,12 0 1,1 -26,0 M244,128 m-5,0 a5,4.5 0 1,1 10,0', 'ear-coch') +
        P('M222,70 C214,46 236,34 244,56 M232,74 C238,48 262,50 256,74 M246,82 C266,70 274,88 258,96', 'ear-canals') + HR(206, 34, 78, 120));
      s += P('M266,128 C284,126 300,120 318,116', 'ear-nerve');
      s += '<g class="lbl"><text x="40" y="186" class="dtx">Außenohr</text><text x="160" y="154" class="dtx">Mittelohr</text><text x="236" y="186" class="dtx">Innenohr</text></g>';
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
        var f = (s - cum[lo]) / ((cum[hi] - cum[lo]) || 1);
        var x = sm[lo][0] + (sm[hi][0] - sm[lo][0]) * f, y = sm[lo][1] + (sm[hi][1] - sm[lo][1]) * f;
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
    var need = 0; segs.forEach(function (s) { need += s.h || s.disc || s.gap || 0; });
    var k = c.len / need, pos = 0;
    segs.forEach(function (s) {
      var L = (s.h || s.disc || s.gap || 0) * k;
      s.s0 = pos; s.s1 = pos + L; s.mid = pos + L / 2; s.L = L; pos += L;
    });
    SPINE = { c: c, segs: segs, k: k };
    return SPINE;
  }
  function vert(s, c, k) {
    var p = c.at(s.mid), bh = s.L, bw = s.w, sp = s.sp, slope = s.g === 'T' ? bh * 0.55 : (s.g === 'C' ? bh * 0.1 : 0);
    var body = '<rect class="vb" x="' + (-bw / 2).toFixed(1) + '" y="' + (-bh / 2).toFixed(1) + '" width="' + bw + '" height="' + bh.toFixed(1) + '" rx="2.2"/>';
    var proc = '<path class="vb vbp" d="M' + (-bw / 2) + ',' + (-bh * 0.3).toFixed(1) + ' L' + (-bw / 2 - sp) + ',' + (bh * 0.05 + slope).toFixed(1) + ' L' + (-bw / 2 - sp + 2.5) + ',' + (bh * 0.42 + slope).toFixed(1) + ' L' + (-bw / 2) + ',' + (bh * 0.32).toFixed(1) + ' Z"/>';
    return '<g transform="translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ') rotate(' + p.ang.toFixed(1) + ')">' + proc + body + '</g>';
  }
  function band(c, s0, s1, w0, w1, n) {
    // Normale (ty, -tx) zeigt nach vorne (rechts)
    var pts = [], q;
    for (q = 0; q <= n; q++) { var pp = c.at(s0 + (s1 - s0) * q / n), ww = (w0 + (w1 - w0) * q / n) / 2; pts.push([pp.x + pp.ty * ww, pp.y - pp.tx * ww]); }
    for (q = n; q >= 0; q--) { var p2 = c.at(s0 + (s1 - s0) * q / n), w2 = (w0 + (w1 - w0) * q / n) / 2; pts.push([p2.x - p2.ty * w2, p2.y + p2.tx * w2]); }
    return 'M' + pts.map(function (a) { return a[0].toFixed(1) + ',' + a[1].toFixed(1); }).join(' L') + ' Z';
  }
  D.wirbelsaeule = {
    title: 'Wirbelsäule von der Seite', vb: [0, 0, 240, 470], kap: 'wirbel', lz: '2.3',
    render: function () {
      var L = spineLayout(), c = L.c, s = '', groups = { C: '', T: '', L: '', disc: '' }, atlas = '', axis = '';
      var spans = { C: [1e9, 0], T: [1e9, 0], L: [1e9, 0] };
      L.segs.forEach(function (g) {
        if (g.disc) {
          var p = c.at(g.mid);
          groups.disc += '<g transform="translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ') rotate(' + p.ang.toFixed(1) + ')"><rect class="disc" x="' + (-g.w / 2 + 1).toFixed(1) + '" y="' + (-g.L / 2).toFixed(1) + '" width="' + (g.w - 2) + '" height="' + g.L.toFixed(1) + '" rx="1.5"/></g>';
        } else if (g.g === 'C' || g.g === 'T' || g.g === 'L') {
          var v = vert(g, c, L.k);
          if (g.g === 'C' && g.n === 1) atlas = v; else if (g.g === 'C' && g.n === 2) axis = v; else groups[g.g] += v;
          var yy = c.at(g.mid).y; spans[g.g][0] = Math.min(spans[g.g][0], yy); spans[g.g][1] = Math.max(spans[g.g][1], yy);
        }
      });
      var S = L.segs.filter(function (g) { return g.g === 'S'; })[0], K = L.segs.filter(function (g) { return g.g === 'K'; })[0];
      var sac = P(band(c, S.s0, S.s1, 28, 12, 12), 'vb vb2');
      for (var j = 1; j < 5; j++) { var pj = c.at(S.s0 + S.L * j / 5), wj = (28 - 16 * j / 5) / 2; sac += P('M' + (pj.x - pj.ty * wj).toFixed(1) + ',' + (pj.y + pj.tx * wj).toFixed(1) + ' L' + (pj.x + pj.ty * wj).toFixed(1) + ',' + (pj.y - pj.tx * wj).toFixed(1), 'vbl'); }
      var coc = '';
      for (j = 0; j < 4; j++) {
        var a0 = K.s0 + K.L * j / 4 + 0.6, a1 = K.s0 + K.L * (j + 1) / 4 - 0.6, w0 = 11 - j * 2.2, w1 = 11 - (j + 1) * 2.2;
        coc += P(band(c, a0, a1, w0, Math.max(w1, 3), 3), 'vb vb2');
      }
      // Klammern (ohne Text) rechts
      function br(y0, y1) { return '<path class="brk" d="M196,' + y0.toFixed(0) + ' h6 V' + y1.toFixed(0) + ' h-6"/>'; }
      var sy = c.at(S.mid).y, ky = c.at(K.mid).y;
      s += br(c.at(L.segs[0].s0).y, spans.C[1] + 4) + br(spans.T[0] - 4, spans.T[1] + 4) + br(spans.L[0] - 6, spans.L[1] + 6) + br(c.at(S.s0).y, c.at(S.s1).y) + br(c.at(K.s0).y, c.at(K.s1).y + 2);
      s += part('halswirbel', '<g class="part-rest">' + groups.C + '</g>' + part('atlas', atlas) + part('axis', axis) + HR(92, 10, 50, spans.C[1] - 4));
      s += part('brustwirbel', groups.T + HR(70, spans.T[0] - 6, 62, spans.T[1] - spans.T[0] + 12));
      s += part('lendenwirbel', groups.L + HR(86, spans.L[0] - 9, 60, spans.L[1] - spans.L[0] + 18));
      s += part('kreuzbein', sac);
      s += part('steissbein', coc + HR(86, c.at(K.s0).y - 2, 34, K.L + 6));
      s += part('bandscheiben', groups.disc);
      D.wirbelsaeule._y = { C: (spans.C[0] + spans.C[1]) / 2, T: (spans.T[0] + spans.T[1]) / 2, L: (spans.L[0] + spans.L[1]) / 2, S: sy, K: ky };
      return s;
    },
    parts: []
  };
  (function () { // Marker aus dem berechneten Verlauf
    var L = spineLayout(), c = L.c;
    function seg(g, n) { return L.segs.filter(function (x) { return x.g === g && (n == null || x.n === n); })[0]; }
    function ant(sg, dx) { var p = c.at(sg.mid); return [p.x + p.ty * (dx || 10), p.y - p.tx * (dx || 10)]; }
    function post(sg, dx) { var p = c.at(sg.mid); return [p.x - p.ty * dx, p.y + p.tx * dx]; }
    var c4 = ant(seg('C', 4), 8), t6 = ant(seg('T', 6), 10), l3 = ant(seg('L', 3), 13), sa = ant(seg('S'), 10), ko = ant(seg('K'), 4), at = post(seg('C', 1), 12), ax = post(seg('C', 2), 12);
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
        w += '<rect class="vb" x="112" y="' + y + '" width="72" height="46" rx="6"/>' +
          P('M112,' + (y + 10) + ' L94,' + (y + 12) + ' L50,' + (y + 32) + ' L56,' + (y + 42) + ' L100,' + (y + 30) + ' L112,' + (y + 34) + ' Z', 'vb vbp') +
          '<circle class="vbh" cx="102" cy="' + (y + 22) + '" r="5"/>';
        if (i < 2) b += '<rect class="disc" x="114" y="' + (y + 49) + '" width="68" height="20" rx="7"/>';
      }
      return part('wirbel', w) + part('bandscheibe', b);
    },
    parts: [
      { id: 'wirbel', name: 'Wirbel', alt: ['Wirbelknochen'], info: 'Knochen der Wirbelsäule', mk: [[212, 36, 184, 36]], find: true },
      { id: 'bandscheibe', name: 'Bandscheibe', alt: ['Bandscheiben'], info: 'Polster zwischen zwei Wirbeln', mk: [[212, 76, 182, 76]], find: true }
    ]
  };

  /* ======================= GELENKE AM KÖRPER ======================= */
  D.gelenkkoerper = {
    title: 'Gelenke am Körper', vb: [0, 0, 240, 430], kap: 'gelenke', lz: '3.3',
    render: function () {
      var body = '';
      body += P('M120,22 C102,22 90,36 90,54 C90,72 102,84 120,84 C138,84 150,72 150,54 C150,36 138,22 120,22 Z', 'kid-skin');
      body += P('M90,50 C90,30 104,18 120,18 C138,18 152,30 150,52 C146,40 136,34 120,34 C104,34 94,40 90,50 Z', 'kid-hair');
      body += '<circle class="kid-eye" cx="110" cy="54" r="2.4"/><circle class="kid-eye" cx="130" cy="54" r="2.4"/>' + P('M111,66 Q120,73 129,66', 'kid-line');
      body += P('M112,82 L128,82 L128,96 L112,96 Z', 'kid-skin');
      // Arme
      var arm = P('M86,104 C76,110 66,130 62,150 L56,184 L68,190 L74,160 C78,140 86,124 94,116 Z', 'kid-shirt') +
        P('M60,184 L52,246 L64,248 L70,190 Z', 'kid-skin') + P('M50,246 C44,252 44,266 50,272 L54,276 L58,270 L62,276 L64,268 L68,272 L68,256 L66,246 Z', 'kid-skin');
      body += both(arm, 120);
      body += P('M84,98 C96,92 144,92 156,98 L160,150 L156,230 L84,230 L80,150 Z', 'kid-shirt');
      // Beine
      var leg = P('M86,226 L118,226 L114,268 L88,268 Z', 'kid-short') + P('M90,266 L114,266 L110,322 L94,322 Z', 'kid-skin') + P('M94,320 L110,320 L108,398 L96,398 Z', 'kid-skin') + P('M96,396 L108,396 C108,404 104,412 84,414 C78,414 78,406 86,404 Z', 'kid-shoe');
      body += both(leg, 120);
      var s = '<g class="kid">' + body + '</g>';
      function J(cx, cy) { return '<circle class="jt" cx="' + cx + '" cy="' + cy + '" r="9"/><circle class="jt2" cx="' + cx + '" cy="' + cy + '" r="3.2"/>'; }
      s += part('schultergelenk', J(88, 108) + J(152, 108));
      s += part('ellenbogengelenk', J(63, 186) + J(177, 186));
      s += part('fingergelenk', J(57, 268) + J(183, 268));
      s += part('hueftgelenk', J(98, 234) + J(142, 234));
      s += part('kniegelenk', J(102, 322) + J(138, 322));
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
      var kg = '<rect class="bf" x="66" y="8" width="18" height="64" rx="4"/>' + P('M49,92 A26,26 0 0 1 101,92 L95,92 A20,20 0 0 0 55,92 Z', 'bf') +
        '<g class="kg-move"><rect class="bf" x="68" y="110" width="14" height="96" rx="4"/><circle class="bf bf3" cx="75" cy="94" r="18.5"/></g>' +
        '<path class="mv-arrow" d="M60,207 A31,8 0 1 0 90,207" marker-end="url(#mvhead)"/>';
      var sg = '<rect class="bf" x="217" y="8" width="16" height="66" rx="4"/><circle class="bf" cx="225" cy="84" r="13"/><circle cx="225" cy="84" r="3.2" fill="#8B7A5E"/>' +
        '<g class="sg-move">' + P('M240,80 C248,96 236,110 225,110 C212,110 204,98 208,84 L214,86 C212,96 218,103 225,103 C232,103 238,96 234,84 Z', 'bf bf3') +
        '<rect class="bf bf3" x="218" y="106" width="14" height="96" rx="4"/></g>' +
        '<path class="mv-arrow mv-one" d="M262,150 A40,40 0 0 0 232,196" marker-start="url(#mvhead)" marker-end="url(#mvhead)"/>';
      return part('kugelgelenk', kg + HR(14, 4, 122, 222)) + part('scharniergelenk', sg + HR(170, 4, 122, 222)) +
        '<defs><marker id="mvhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#0E8A7E"/></marker></defs>';
    },
    parts: [
      { id: 'kugelgelenk', name: 'Kugelgelenk', alt: ['Drehgelenk'], info: 'Kugel in einer Pfanne – Bewegung in alle Richtungen', mk: [[18, 40, 60, 92]], find: true },
      { id: 'scharniergelenk', name: 'Scharniergelenk', alt: ['Klappgelenk', 'Scharnier'], info: 'wie ein Türscharnier – nur beugen und strecken', mk: [[282, 40, 240, 86]], find: true }
    ]
  };

  /* ======================= MUSKELN ======================= */
  D.muskeln = {
    title: 'Muskeln von vorne und von hinten', vb: [0, 0, 440, 450], kap: 'muskeln', lz: '4.7',
    render: function () {
      function figure(x0, back) {
        var g = '';
        g += '<ellipse class="mu-skin" cx="' + (x0 - 22) + '" cy="50" rx="4" ry="7"/><ellipse class="mu-skin" cx="' + (x0 + 22) + '" cy="50" rx="4" ry="7"/>';
        g += E(x0, 48, 22, 27, 'mu-skin');
        if (back) g += P('M' + (x0 - 22) + ',46 C' + (x0 - 24) + ',20 ' + (x0 + 24) + ',20 ' + (x0 + 22) + ',46 C' + (x0 + 22) + ',62 ' + (x0 + 16) + ',72 ' + x0 + ',74 C' + (x0 - 16) + ',72 ' + (x0 - 22) + ',62 ' + (x0 - 22) + ',46 Z', 'mu-hair');
        else g += P('M' + (x0 - 22) + ',44 C' + (x0 - 22) + ',22 ' + (x0 + 22) + ',22 ' + (x0 + 22) + ',44 C' + (x0 + 14) + ',32 ' + (x0 - 14) + ',32 ' + (x0 - 22) + ',44 Z', 'mu-hair') +
          '<circle class="kid-eye" cx="' + (x0 - 8) + '" cy="48" r="1.7"/><circle class="kid-eye" cx="' + (x0 + 8) + '" cy="48" r="1.7"/>' + P('M' + (x0 - 5) + ',63 Q' + x0 + ',66 ' + (x0 + 5) + ',63', 'kid-line');
        g += P('M' + (x0 - 10) + ',72 L' + (x0 + 10) + ',72 L' + (x0 + 12) + ',90 L' + (x0 - 12) + ',90 Z', 'mu-skin');
        g += P('M' + (x0 - 44) + ',100 C' + (x0 - 36) + ',90 ' + (x0 - 18) + ',88 ' + (x0 - 10) + ',88 L' + (x0 + 10) + ',88 C' + (x0 + 18) + ',88 ' + (x0 + 36) + ',90 ' + (x0 + 44) + ',100 C' + (x0 + 50) + ',112 ' + (x0 + 48) + ',132 ' + (x0 + 44) + ',150 C' + (x0 + 40) + ',175 ' + (x0 + 38) + ',200 ' + (x0 + 38) + ',214 L' + (x0 - 38) + ',214 C' + (x0 - 38) + ',200 ' + (x0 - 40) + ',175 ' + (x0 - 44) + ',150 C' + (x0 - 48) + ',132 ' + (x0 - 50) + ',112 ' + (x0 - 44) + ',100 Z', 'mu-skin');
        // linker Arm (hängend)
        var armL = P('M' + (x0 - 46) + ',102 C' + (x0 - 56) + ',110 ' + (x0 - 60) + ',140 ' + (x0 - 60) + ',172 L' + (x0 - 46) + ',174 C' + (x0 - 44) + ',150 ' + (x0 - 40) + ',124 ' + (x0 - 34) + ',108 Z', 'mu-skin') +
          P('M' + (x0 - 60) + ',172 C' + (x0 - 64) + ',200 ' + (x0 - 66) + ',226 ' + (x0 - 66) + ',244 L' + (x0 - 54) + ',246 C' + (x0 - 52) + ',226 ' + (x0 - 48) + ',200 ' + (x0 - 46) + ',174 Z', 'mu-skin') +
          E(x0 - 60, 256, 7, 11, 'mu-skin');
        g += armL;
        if (back) g += mirror(armL, x0);
        else g += P('M' + (x0 + 40) + ',96 C' + (x0 + 54) + ',98 ' + (x0 + 72) + ',110 ' + (x0 + 84) + ',124 L' + (x0 + 74) + ',140 C' + (x0 + 62) + ',128 ' + (x0 + 48) + ',120 ' + (x0 + 36) + ',116 Z', 'mu-skin') +
          P('M' + (x0 + 74) + ',138 C' + (x0 + 72) + ',112 ' + (x0 + 74) + ',92 ' + (x0 + 76) + ',78 L' + (x0 + 90) + ',78 C' + (x0 + 90) + ',94 ' + (x0 + 90) + ',118 ' + (x0 + 86) + ',134 Z', 'mu-skin') + E(x0 + 83, 68, 9, 9, 'mu-skin');
        g += P('M' + (x0 - 38) + ',212 L' + (x0 + 38) + ',212 L' + (x0 + 42) + ',250 L' + (x0 + 4) + ',252 L' + x0 + ',240 L' + (x0 - 4) + ',252 L' + (x0 - 42) + ',250 Z', 'mu-short');
        var legL = P('M' + (x0 - 40) + ',250 L' + x0 + ',252 C' + (x0 - 2) + ',290 ' + (x0 - 6) + ',320 ' + (x0 - 8) + ',338 L' + (x0 - 32) + ',338 C' + (x0 - 36) + ',310 ' + (x0 - 40) + ',280 ' + (x0 - 40) + ',250 Z', 'mu-skin') +
          P('M' + (x0 - 32) + ',338 L' + (x0 - 8) + ',338 C' + (x0 - 8) + ',370 ' + (x0 - 10) + ',400 ' + (x0 - 12) + ',424 L' + (x0 - 26) + ',424 C' + (x0 - 30) + ',400 ' + (x0 - 32) + ',370 ' + (x0 - 32) + ',338 Z', 'mu-skin') +
          E(x0 - 20, 432, 13, 6, 'mu-skin');
        g += legL + mirror(legL, x0);
        return g;
      }
      var s = figure(110, false) + figure(330, true);
      // Gesicht
      s += part('gesichtsmuskeln',
        '<g class="part-rest">' + P('M92,36 C100,30 120,30 128,36 L126,42 C118,38 102,38 94,42 Z', 'mu') +
        '<circle class="mu-ring" cx="102" cy="48" r="5"/><circle class="mu-ring" cx="118" cy="48" r="5"/><ellipse class="mu-ring" cx="110" cy="64" rx="6.5" ry="3.6"/></g>' +
        part('kaumuskel', E(96, 59, 5, 7.5, 'mu') + E(124, 59, 5, 7.5, 'mu')));
      s += part('halsmuskeln', P('M100,74 L106,74 L113,89 L107,89 Z', 'mu') + P('M120,74 L114,74 L107,89 L113,89 Z', 'mu'));
      s += part('brustmuskel', P('M108,96 C96,94 78,98 72,108 C74,122 90,130 108,128 Z', 'mu') + P('M112,96 C124,94 142,98 148,108 C146,122 130,130 112,128 Z', 'mu'));
      var abs = '';
      [[98, 134, 14], [111, 134, 14], [98, 151, 14], [111, 151, 14], [98, 168, 16], [111, 168, 16]].forEach(function (r) { abs += '<rect class="mu" x="' + r[0] + '" y="' + r[1] + '" width="11" height="' + r[2] + '" rx="3"/>'; });
      abs += P('M98,187 L122,187 L118,207 L102,207 Z', 'mu') + P('M80,140 C86,152 92,172 94,200 L86,204 C82,180 78,160 76,146 Z', 'mu') + P('M140,140 C134,152 128,172 126,200 L134,204 C138,180 142,160 144,146 Z', 'mu');
      s += part('bauchmuskel', abs);
      s += part('armmuskeln',
        '<g class="part-rest">' + P('M66,100 C70,92 82,92 86,100 C82,110 72,118 64,118 C62,110 62,104 66,100 Z', 'mu') + P('M154,100 C150,92 138,92 134,100 C138,110 148,118 156,118 C158,110 158,104 154,100 Z', 'mu') +
        P('M62,118 C56,130 53,150 53,168 L61,168 C62,150 65,130 70,118 Z', 'mu') + P('M52,180 C49,200 48,220 48,236 L56,236 C57,220 59,200 61,180 Z', 'mu') +
        P('M188,132 C186,112 188,94 190,82 L196,84 C196,100 196,118 194,132 Z', 'mu') +
        P('M286,100 C290,92 302,92 306,100 C302,110 292,118 284,118 C282,110 282,104 286,100 Z', 'mu') + P('M374,100 C370,92 358,92 354,100 C358,110 368,118 376,118 C378,110 378,104 374,100 Z', 'mu') +
        P('M282,118 C276,132 273,150 273,168 L281,168 C282,150 285,132 290,118 Z', 'mu') + P('M378,118 C384,132 387,150 387,168 L379,168 C378,150 375,132 370,118 Z', 'mu') + '</g>' +
        part('bizeps', P('M152,104 C162,92 182,100 190,118 C178,114 164,112 152,110 Z', 'mu')));
      s += part('beinmuskeln',
        '<g class="part-rest">' + P('M86,344 C84,370 86,396 88,414 L94,414 C96,396 98,370 98,344 Z', 'mu') + P('M134,344 C136,370 134,396 132,414 L126,414 C124,396 122,370 122,344 Z', 'mu') +
        P('M296,262 C294,290 298,318 304,332 L320,332 C324,310 326,286 324,262 Z', 'mu') + P('M364,262 C366,290 362,318 356,332 L340,332 C336,310 334,286 336,262 Z', 'mu') + '</g>' +
        part('oberschenkelmuskel', P('M76,262 C74,290 78,318 84,332 L98,332 C102,310 106,286 104,262 Z', 'mu') + P('M144,262 C146,290 142,318 136,332 L122,332 C118,310 114,286 116,262 Z', 'mu')) +
        part('wadenmuskel', P('M298,346 C292,364 296,384 306,394 C314,384 318,366 318,346 Z', 'mu') + P('M362,346 C368,364 364,384 354,394 C346,384 342,366 342,346 Z', 'mu')));
      s += part('rueckenmuskel', P('M330,78 L360,98 L330,152 L300,98 Z', 'mu') + P('M300,110 C292,130 294,160 306,186 L326,190 L326,152 Z', 'mu') + P('M360,110 C368,130 366,160 354,186 L334,190 L334,152 Z', 'mu') +
        P('M318,160 L328,160 L328,210 L316,210 Z', 'mu') + P('M332,160 L342,160 L344,210 L332,210 Z', 'mu'));
      s += part('gesaessmuskel', P('M294,216 C288,236 298,252 326,252 L328,216 Z', 'mu') + P('M366,216 C372,236 362,252 334,252 L332,216 Z', 'mu'));
      s += '<g class="lbl"><text x="110" y="446" class="dtx" text-anchor="middle">von vorne</text><text x="330" y="446" class="dtx" text-anchor="middle">von hinten</text></g>';
      return s;
    },
    parts: [
      { id: 'kaumuskel', name: 'Kaumuskel', info: 'Wange/Kiefer – zum Kauen', mk: [[30, 40, 92, 60]], find: true },
      { id: 'brustmuskel', name: 'Brustmuskel', info: 'vorne auf der Brust', mk: [[30, 110, 88, 112]], find: true },
      { id: 'bauchmuskel', name: 'Bauchmuskel', alt: ['Bauchmuskeln'], info: 'aufrecht sitzen, Oberkörper beugen', mk: [[30, 162, 99, 162]], find: true },
      { id: 'oberschenkelmuskel', name: 'Oberschenkelmuskel', alt: ['Oberschenkelmuskeln'], info: 'vorne am Oberschenkel', mk: [[30, 296, 80, 296]], find: true },
      { id: 'bizeps', name: 'Armbeuger (Bizeps)', alt: ['Bizeps', 'Armbeuger'], info: 'beugt den Arm – wird dabei kürzer und dicker', mk: [[152, 74, 168, 103]], find: true },
      { id: 'rueckenmuskel', name: 'Rückenmuskel', alt: ['Rückenmuskeln', 'Rueckenmuskel'], info: 'hält den Rücken aufrecht', mk: [[412, 160, 358, 150]], find: true },
      { id: 'gesaessmuskel', name: 'Gesäßmuskel', alt: ['Gesäßmuskeln', 'Gesaessmuskel', 'Po-Muskel'], info: 'am Po – zum Aufstehen, Treppensteigen', mk: [[412, 234, 364, 234]], find: true },
      { id: 'wadenmuskel', name: 'Wadenmuskel', alt: ['Wade', 'Wadenmuskeln'], info: 'hinten am Unterschenkel – zum Laufen und Springen', mk: [[412, 370, 360, 370]], find: true },
      { id: 'gesichtsmuskeln', name: 'Gesichtsmuskeln', info: 'Gruppe: lachen, kauen (Malauftrag: gelb)', mk: [], find: false },
      { id: 'halsmuskeln', name: 'Halsmuskeln', info: 'Gruppe: Kopf bewegen (Malauftrag: lila)', mk: [], find: false },
      { id: 'armmuskeln', name: 'Armmuskeln', info: 'Gruppe: tragen und heben (Malauftrag: grün)', mk: [], find: false },
      { id: 'beinmuskeln', name: 'Beinmuskeln', info: 'Gruppe: laufen und springen (Malauftrag: rot)', mk: [], find: false }
    ]
  };

  /* ======================= ORGANE / VERDAUUNG (gemeinsamer Körper) ======================= */
  var BODY_ORG = P('M120,60 C118,32 138,14 160,14 C184,14 200,30 200,52 C200,58 198,62 202,68 C205,72 203,76 199,77 C199,82 198,86 194,88 C192,94 188,98 180,98 L174,100 L172,112 L134,112 L136,96 C126,90 120,76 120,60 Z', 'org-skin') +
    P('M134,112 C116,114 96,118 84,126 C78,132 76,142 76,156 L78,250 C78,300 80,340 84,380 L88,452 L212,452 L216,380 C220,340 222,300 222,250 L224,156 C224,142 222,132 216,126 C204,118 184,114 172,112 Z', 'org-skin') +
    both(P('M84,126 C66,130 58,146 56,170 L52,300 C50,340 48,380 46,420 C46,432 50,440 56,440 C62,440 64,430 64,420 C66,380 70,340 72,300 L76,196 Z', 'org-skin'), 150);
  function organSVG(mode) {
    var dig = mode === 'verdauung', s = BODY_ORG;
    var fadeA = dig ? ' style="opacity:.28"' : '';
    var eso = P('M158,100 C158,150 162,210 174,262', 'eso');
    if (!dig) s += part('speiseroehre', eso);
    var brain = P('M136,44 C136,26 152,18 168,20 C184,20 194,32 192,46 C192,56 186,62 176,62 C170,66 160,66 154,62 C146,64 138,58 136,50 Z', 'brain') +
      P('M146,36 C152,30 160,34 158,40 M164,26 C170,32 178,28 182,36 M150,50 C158,46 166,52 174,48 M178,44 C184,48 186,54 182,56', 'brain-l') +
      P('M150,62 C146,70 152,76 160,74 C166,72 168,66 164,62 Z', 'brain brain2') + P('M160,70 L166,70 L166,88 L161,88 Z', 'brain brain2');
    var trach = '<rect class="trach" x="146" y="100" width="8" height="50" rx="3"/>' + P('M146,106 h8 M146,112 h8 M146,118 h8 M146,124 h8 M146,130 h8 M146,136 h8 M146,142 h8', 'trach-l') + P('M150,150 L134,166 M150,150 L166,166', 'bronch');
    var lungs = P('M140,150 C128,142 108,150 100,170 C92,192 90,230 94,262 C110,268 130,266 142,258 C146,230 146,190 140,150 Z', 'lung') +
      P('M160,150 C172,142 192,150 200,170 C208,192 210,230 206,262 C194,266 180,264 170,258 C172,246 162,236 160,226 C160,200 160,176 160,150 Z', 'lung') +
      P('M134,166 L122,186 L112,210 M122,186 L130,212 M112,210 L104,236 M112,210 L120,240 M166,166 L178,188 L188,212 M178,188 L172,214 M188,212 L196,238', 'lung-l');
    var heart = P('M146,206 C144,192 158,184 168,190 C178,184 192,190 192,204 C192,224 182,238 176,248 C164,240 150,228 146,214 Z', 'heart') + P('M164,190 C164,176 180,174 182,186', 'heart-a');
    var liver = P('M92,272 C110,262 150,262 174,268 C180,274 174,282 164,286 C142,296 118,304 100,308 C90,300 88,284 92,272 Z', 'liver');
    var stom = P('M170,264 C182,252 210,258 214,280 C218,302 204,318 184,318 C168,318 158,312 152,304 L160,296 C166,302 176,306 186,302 C198,296 198,280 188,274 C182,270 176,272 168,270 Z', 'stom');
    var kidL = P('M96,310 C84,310 80,326 82,334 C84,346 92,354 100,352 C106,350 108,344 104,338 C102,334 102,330 105,326 C108,320 106,310 96,310 Z', 'kidn');
    var kidneys = kidL + '<g transform="matrix(-1 0 0 1 300 -4)">' + kidL + '</g>';
    var ureters = P('M104,340 C112,370 128,392 142,404 M196,336 C188,366 172,390 158,404', 'ureter');
    var colonD = 'M118,400 C110,400 108,388 108,376 L108,336 C108,326 114,322 124,322 L176,322 C188,322 192,328 192,338 L192,384 C192,398 186,404 176,406 C166,408 160,412 156,418';
    var colon = '<path class="colon-o" d="' + colonD + '"/><path class="colon-i" d="' + colonD + '"/><path class="colon-h" d="' + colonD + '"/>';
    var rectD = 'M156,416 C154,424 152,432 152,442';
    var rect = '<path class="colon-o" d="' + rectD + '" style="stroke-width:13"/><path class="colon-i" d="' + rectD + '" style="stroke-width:9.5"/>' + (dig ? '<circle class="anus" cx="152" cy="446" r="3"/>' : '');
    var siD = 'M170,328 C182,336 172,346 160,344 C146,342 132,340 130,352 C128,364 146,362 158,362 C174,362 178,374 168,380 C156,386 136,378 130,388 C124,400 140,404 152,402 C162,400 168,406 160,408 C148,410 132,406 120,400';
    var si = '<path class="si-o" d="' + siD + '"/><path class="si-i" d="' + siD + '"/>';
    var blad = P('M138,404 C136,394 164,394 162,404 C162,416 156,424 150,424 C144,424 138,416 138,404 Z', 'blad');
    if (!dig) {
      s += part('gehirn', brain) + '<g class="part" data-part="luftroehre">' + trach + '</g>' + part('lunge', lungs) + part('herz', heart) +
        P('M90,270 C110,256 136,254 150,256 C164,254 190,256 210,270', 'dia-l') +
        part('leber', liver) + part('magen', stom) + ureters + part('nieren', kidneys) +
        part('darm', part('dickdarm', colon + rect) + part('duenndarm', si)) + part('blase', blad);
    } else {
      s += '<g' + fadeA + '>' + brain + trach + lungs + heart + '</g>';
      s += part('mund', E(193, 81, 6, 3.6, 'mouth') + P('M190,82 C178,84 166,88 160,100', 'eso eso2') + HR(182, 72, 22, 18));
      s += part('speiseroehre', P('M158,100 C158,150 162,210 174,262', 'eso eso2') + H('M158,100 C158,150 162,210 174,262', 12));
      s += part('leber', liver + P('M150,292 C156,300 158,306 160,312', 'bile'));
      s += part('magen', stom);
      s += part('dickdarm', colon);
      s += part('duenndarm', si);
      s += part('enddarm', rect + HR(144, 412, 20, 40));
    }
    return s;
  }
  D.organe = {
    title: 'Unsere Organe', vb: [0, 0, 300, 462], kap: 'organe', lz: '5.1',
    render: function () { return organSVG('organe'); },
    parts: [
      { id: 'gehirn', name: 'Gehirn', info: 'steuert den Körper, Denken und Gedächtnis', mk: [[262, 24, 182, 34]], find: true },
      { id: 'lunge', name: 'Lunge', alt: ['Lungen', 'Lungenflügel'], info: 'zwei Lungenflügel – Sauerstoff ins Blut', mk: [[24, 196, 100, 206]], find: true },
      { id: 'herz', name: 'Herz', info: 'Muskel, pumpt das Blut', mk: [[272, 206, 186, 212]], find: true },
      { id: 'leber', name: 'Leber', info: 'säubert das Blut, speichert Zucker und Vitamine', mk: [[24, 280, 98, 288]], find: true },
      { id: 'magen', name: 'Magen', info: 'knetet das Essen zu Brei', mk: [[272, 290, 202, 292]], find: true },
      { id: 'nieren', name: 'Nieren', alt: ['Niere'], info: 'filtern das Blut, bilden Urin (liegen hinten)', mk: [[24, 334, 86, 332]], find: true },
      { id: 'darm', name: 'Darm', alt: ['Dünndarm', 'Dickdarm', 'Gedärm'], info: 'Dünndarm und Dickdarm', mk: [[272, 356, 192, 356]], find: true },
      { id: 'blase', name: 'Blase', alt: ['Harnblase'], info: 'sammelt den Urin', mk: [[24, 420, 140, 412]], find: true },
      { id: 'luftroehre', name: 'Luftröhre', alt: ['Luftroehre'], info: 'führt die Luft zur Lunge', mk: [[272, 128, 154, 128]], find: false, q: false },
      { id: 'duenndarm', name: 'Dünndarm', alt: ['Duenndarm'], info: 'Nährstoffe gehen ins Blut', mk: [], find: false, q: false },
      { id: 'dickdarm', name: 'Dickdarm', info: 'Wasser und Mineralstoffe werden entzogen', mk: [], find: false, q: false },
      { id: 'speiseroehre', name: 'Speiseröhre', alt: ['Speiseroehre'], info: 'führt das Essen in den Magen (liegt hinter Luftröhre und Herz)', mk: [], find: false, q: false }
    ]
  };
  D.verdauung = {
    title: 'Der Weg der Nahrung', vb: [0, 0, 300, 462], kap: 'verdauung', lz: '8.1',
    render: function () { return organSVG('verdauung'); },
    parts: [
      { id: 'mund', name: 'Mund', info: 'zerkauen und mit Speichel mischen', mk: [[262, 66, 196, 81]], find: true },
      { id: 'speiseroehre', name: 'Speiseröhre', alt: ['Speiseroehre'], info: 'Schlauch vom Mund zum Magen', mk: [[262, 150, 162, 160]], find: true },
      { id: 'magen', name: 'Magen', info: 'kneten + Magensäure → Brei', mk: [[272, 284, 202, 290]], find: true },
      { id: 'leber', name: 'Leber', info: 'liegt daneben, hilft mit Gallensaft – das Essen geht nicht hindurch', mk: [[24, 280, 98, 288]], find: true },
      { id: 'duenndarm', name: 'Dünndarm', alt: ['Duenndarm'], info: 'Nährstoffe gehen ins Blut', mk: [[24, 360, 132, 360]], find: true },
      { id: 'dickdarm', name: 'Dickdarm', info: 'Wasser und Mineralstoffe werden entzogen', mk: [[272, 350, 192, 350]], find: true },
      { id: 'enddarm', name: 'Enddarm und After', alt: ['Enddarm', 'After', 'Enddarm/After'], info: 'Reste werden ausgeschieden', mk: [[272, 436, 156, 432]], find: true }
    ],
    bananaPath: 'M195,81 C178,84 166,88 160,100 C158,150 162,210 174,264 C190,276 200,296 186,308 C176,316 166,316 160,312 C166,318 172,324 170,328 C182,336 172,346 160,344 C146,342 132,340 130,352 C128,364 146,362 158,362 C174,362 178,374 168,380 C156,386 136,378 130,388 C124,400 140,404 152,402 C162,400 168,406 160,408 C148,410 132,406 118,400 C110,400 108,388 108,376 L108,336 C108,326 114,322 124,322 L176,322 C188,322 192,328 192,338 L192,384 C192,398 186,404 176,406 C166,408 160,412 156,418 C154,424 152,434 152,446',
    stations: [[0, 'mund'], [0.11, 'speiseroehre'], [0.2, 'magen'], [0.27, 'duenndarm'], [0.57, 'dickdarm'], [0.92, 'enddarm'], [1, 'enddarm']]
  };

  /* ======================= ATEMWEG ======================= */
  D.atemweg = {
    title: 'Der Weg der Luft', vb: [0, 0, 340, 372], kap: 'atmung', lz: '7.1',
    render: function () {
      var s = '';
      s += P('M80,70 C78,36 104,12 136,12 C168,12 188,32 190,52 C190,58 188,62 196,74 C200,80 196,84 190,84 C190,88 188,92 186,94 C188,100 186,106 180,108 C176,112 170,114 164,114 L162,140 L104,140 L106,116 C90,108 80,92 80,70 Z', 'org-skin');
      s += P('M104,140 C80,144 50,152 36,168 C30,176 28,190 28,210 L28,372 M162,140 C190,144 230,152 244,168 C250,176 252,190 252,210 L252,372', 'skin-line');
      s += '<g class="air-in"><path class="air" d="M232,64 L206,70"/></g><g class="air-out"><path class="air air2" d="M204,76 L232,84"/></g>';
      s += part('mundnase', P('M150,60 C160,56 180,58 190,68 C186,72 176,74 160,74 C152,74 148,68 150,60 Z', 'airway') + P('M152,88 C162,84 178,84 186,88 C180,94 166,96 156,95 Z', 'airway') +
        P('M146,64 C140,80 140,100 144,124 L152,124 C150,106 150,88 154,72 Z', 'airway'));
      var th = '';
      th += P('M130,174 C110,164 80,178 72,212 C64,248 62,292 70,322 C92,330 120,328 138,318 C142,282 142,222 130,174 Z', 'lung lung-lt');
      th += P('M168,174 C188,164 218,178 226,212 C234,248 234,292 226,320 C206,326 186,324 172,316 C174,302 164,292 162,278 C162,242 162,208 168,174 Z', 'lung lung-lt');
      var tree = P('M120,240 L104,262 L92,290 M104,262 L112,292 M92,290 L84,312 M92,290 L98,314 M112,292 L106,316 M112,292 L122,312 M120,240 L96,236 L82,250 M96,236 L86,220 M120,240 L126,272 L132,300', 'tree') +
        P('M178,240 L196,262 L208,290 M196,262 L188,292 M208,290 L216,312 M208,290 L202,314 M188,292 L194,316 M188,292 L178,312 M178,240 L202,236 L216,250 M202,236 L212,220 M178,240 L172,272 L168,300', 'tree');
      var alv = '';
      [[84, 312], [98, 314], [106, 316], [122, 312], [82, 250], [86, 220], [132, 300], [216, 312], [202, 314], [194, 316], [178, 312], [216, 250], [212, 220], [168, 300]].forEach(function (p) {
        alv += '<circle class="alv" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/><circle class="alv" cx="' + (p[0] + 4) + '" cy="' + (p[1] + 3) + '" r="2.8"/><circle class="alv" cx="' + (p[0] - 3) + '" cy="' + (p[1] + 4) + '" r="2.6"/>';
      });
      th += part('kleinebronchien', tree + H('M120,240 L104,262 L92,290 M178,240 L196,262 L208,290 M120,240 L126,272 M178,240 L172,272', 10));
      th += part('lungenblaeschen', alv + '<g class="mag">' + P('M214,300 L250,290', 'mag-l') + '<circle class="mag-c" cx="290" cy="278" r="42"/>' +
        '<circle class="alv alv-b" cx="280" cy="258" r="10"/><circle class="alv alv-b" cx="297" cy="254" r="9"/><circle class="alv alv-b" cx="299" cy="270" r="9.5"/><circle class="alv alv-b" cx="282" cy="274" r="9"/>' +
        P('M252,294 C262,300 276,302 290,300', 'cap-b') + P('M290,300 C302,298 314,292 324,282', 'cap-r') +
        '<path class="o2" d="M282,282 L282,293" marker-end="url(#gaO)"/><path class="co2" d="M300,295 L300,284" marker-end="url(#gaC)"/>' +
        '<text class="gtx gtx-o" x="262" y="290">O₂</text><text class="gtx gtx-c" x="304" y="306">CO₂</text>' +
        P('M318,312 L334,332', 'mag-h') + '</g>' +
        '<defs><marker id="gaO" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#C0392B"/></marker>' +
        '<marker id="gaC" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2F5DB8"/></marker></defs>');
      th += part('hauptbronchien', '<path class="br-o" d="M149,212 L120,240 M149,212 L178,240"/><path class="br-i" d="M149,212 L120,240 M149,212 L178,240"/>');
      s += '<g class="thorax">' + part('lunge', th.replace(/^/, '')) + '</g>';
      s += part('luftroehre', '<rect class="trach" x="144" y="122" width="10" height="92" rx="3"/>' + P('M144,130 h10 M144,138 h10 M144,146 h10 M144,154 h10 M144,162 h10 M144,170 h10 M144,178 h10 M144,186 h10 M144,194 h10 M144,202 h10', 'trach-l'));
      s += '<g class="dia">' + part('zwerchfell', P('M64,332 C96,314 130,310 149,314 C168,310 202,314 234,332 L234,338 C202,320 168,316 149,320 C130,316 96,320 64,338 Z', 'diaf') + H('M64,335 C96,317 130,313 149,317 C168,313 202,317 234,335', 14)) + '</g>';
      return s;
    },
    parts: [
      { id: 'mundnase', name: 'Mund und Nase', alt: ['Nase', 'Mund', 'Mund/Nase', 'Nase und Mund', 'Nasenhöhle'], info: '(1) hier kommt die Luft hinein', mk: [[232, 52, 178, 66], [232, 100, 176, 92]], find: true },
      { id: 'luftroehre', name: 'Luftröhre', alt: ['Luftroehre'], info: '(2) führt zur Brust', mk: [[266, 150, 154, 170]], find: true },
      { id: 'hauptbronchien', name: 'Hauptbronchien', alt: ['zwei Hauptbronchien', 'Hauptbronchie', 'Bronchien'], info: '(3) die zwei großen Äste', mk: [[266, 210, 166, 228], [266, 210, 132, 228]], find: true },
      { id: 'kleinebronchien', name: 'kleine Bronchien', alt: ['kleine Bronchien', 'Bronchiolen', 'Bronchien'], info: '(4) viele kleine Zweige', mk: [[24, 272, 96, 272]], find: true },
      { id: 'lungenblaeschen', name: 'Lungenbläschen', alt: ['Lungenblaeschen', 'Lungenbläschen'], info: '(5) hier findet der Gasaustausch statt', mk: [[300, 212, 292, 236]], find: true },
      { id: 'zwerchfell', name: 'Zwerchfell', info: 'Atemmuskel unter der Lunge', mk: [[266, 350, 200, 320]], find: true },
      { id: 'lunge', name: 'Lunge', alt: ['Lungenflügel'], info: 'zwei Lungenflügel', mk: [[24, 196, 78, 200]], find: false }
    ]
  };

  /* ======================= BLUTKREISLAUF ======================= */
  D.kreislauf = {
    title: 'Der Blutkreislauf', vb: [0, 0, 340, 430], kap: 'blut', lz: '6.3', hl: 'glow',
    render: function () {
      var s = '<defs><marker id="arR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2.1" markerHeight="2.1" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#C21F3A"/></marker>' +
        '<marker id="arB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2.1" markerHeight="2.1" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2F5DB8"/></marker></defs>';
      var lungL = P('M162,30 C140,18 100,28 96,62 C94,88 106,106 128,108 C150,110 162,96 162,80 Z', 'lung');
      var lungs = lungL + mirror(lungL, 170) + P('M106,60 C120,52 140,56 156,64 M104,80 C120,74 140,78 156,86 M234,60 C220,52 200,56 184,64 M236,80 C220,74 200,78 184,86', 'capnet');
      var heartL = P('M170,180 C156,168 132,178 136,198 C140,224 156,242 170,256 Z', 'h-right');
      var heartR = P('M170,180 C184,168 208,178 204,198 C200,224 184,242 170,256 Z', 'h-left');
      var la = 'M158,184 C150,152 130,142 128,112', lv = 'M212,112 C212,142 192,152 182,184', ar = 'M190,238 C214,262 236,292 232,330', ve = 'M108,330 C104,292 130,264 150,240';
      function vessel(id, d, cls, mk) { return part(id, '<path class="ves ' + cls + '" d="' + d + '" marker-end="url(#' + mk + ')"/>' + H(d, 16)); }
      s += part('lungenkreislauf', vessel('lungenarterie', la, 'v-blue', 'arB') + part('lunge', lungs) + vessel('lungenvene', lv, 'v-red', 'arR'));
      s += part('herz', heartL + heartR + P('M170,182 L170,252', 'septum'));
      s += part('koerperkreislauf', vessel('arterie', ar, 'v-red', 'arR') +
        part('koerper', '<rect class="body-box" x="88" y="330" width="164" height="72" rx="16"/>' + P('M110,356 C140,346 200,366 232,352 M110,372 C140,362 200,382 232,368', 'capnet') +
          '<text class="dtx lbl" x="170" y="394" text-anchor="middle">Organe und Muskeln</text>') +
        vessel('vene', ve, 'v-blue', 'arB'));
      function dots(d, col, n, dur) { var o = ''; for (var i = 0; i < n; i++) o += '<circle class="flow" r="3.6" fill="' + col + '"><animateMotion dur="' + dur + 's" begin="-' + (i * dur / n).toFixed(2) + 's" repeatCount="indefinite" path="' + d + '"/></circle>'; return o; }
      s += '<g class="flows">' + dots(la, '#9DB4EE', 3, 2.4) + dots(lv, '#FF9AA5', 3, 2.4) + dots(ar, '#FF9AA5', 4, 2.8) + dots(ve, '#9DB4EE', 4, 2.8) + '</g>';
      s += '<g class="lbl"><text class="dtx" x="170" y="140" text-anchor="middle">Lungenkreislauf</text><text class="dtx" x="170" y="300" text-anchor="middle">Körperkreislauf</text></g>';
      return s;
    },
    parts: [
      { id: 'herz', name: 'Herz', info: 'die Pumpe in der Mitte', mk: [[300, 214, 190, 206]], find: true },
      { id: 'lunge', name: 'Lunge', info: 'hier bekommt das Blut Sauerstoff', mk: [[300, 64, 236, 70]], find: true },
      { id: 'koerper', name: 'Körper (Organe und Muskeln)', alt: ['Körper', 'Organe', 'Muskeln'], info: 'hier wird der Sauerstoff abgegeben', mk: [[300, 380, 252, 380]], find: true },
      { id: 'arterie', name: 'Arterie', alt: ['Arterien', 'Schlagader'], info: 'vom Herzen weg – im Körper sauerstoffreich (rot)', mk: [[300, 280, 222, 280]], find: true },
      { id: 'vene', name: 'Vene', alt: ['Venen'], info: 'zum Herzen hin – im Körper sauerstoffarm (blau)', mk: [[34, 280, 116, 280]], find: true },
      { id: 'lungenarterie', name: 'Lungenarterie', info: 'Extra: vom Herzen zur Lunge – sauerstoffarm (blau)', mk: [[34, 150, 142, 148]], find: false },
      { id: 'lungenvene', name: 'Lungenvene', info: 'Extra: von der Lunge zum Herzen – sauerstoffreich (rot)', mk: [[300, 150, 198, 148]], find: false },
      { id: 'lungenkreislauf', name: 'Lungenkreislauf', info: 'Herz → Lunge → Herz', mk: [], find: false },
      { id: 'koerperkreislauf', name: 'Körperkreislauf', alt: ['Koerperkreislauf'], info: 'Herz → Körper → Herz', mk: [], find: false }
    ]
  };

  /* ======================= HAUT ======================= */
  D.haut = {
    title: 'Die Haut (Schnitt)', vb: [0, 0, 380, 300], kap: 'haut', lz: '9.9',
    render: function () {
      var s = '';
      var top = P('M60,64 L82,44 C110,40 140,48 170,44 C200,40 240,48 270,44 C300,40 330,46 352,44 L330,64 Z', 'sk-top');
      var wave = '', x;
      for (x = 60; x + 24 <= 330; x += 24) wave += ' Q' + (x + 12) + ',84 ' + (x + 24) + ',96';
      wave += ' L330,96';
      var fat = '';
      [214, 236, 258, 278].forEach(function (y, r) { for (x = 72 + (r % 2) * 12; x < 322; x += 25) fat += '<ellipse class="fat" cx="' + x + '" cy="' + y + '" rx="11.5" ry="' + (r === 3 ? 6 : 9) + '"/>'; });
      s += part('unterhaut', '<g class="part-rest"><rect class="sk-sub" x="60" y="196" width="270" height="88"/></g>' + part('fettpolster', fat));
      s += part('oberhaut', '<g class="part-rest"><rect class="sk-epi" x="60" y="64" width="270" height="34"/></g>' +
        part('hornschicht', '<rect class="sk-horn" x="60" y="64" width="270" height="6"/>' + P('M72,67 h8 M96,66 h8 M128,67 h8 M168,66 h8 M210,67 h8 M246,66 h8 M290,67 h8', 'sk-scale')));
      s += part('lederhaut', P('M60,196 L60,96' + wave + ' L330,196 Z', 'sk-der') + P('M80,130 C110,124 140,136 170,128 M200,150 C230,142 260,156 300,146 M90,170 C120,164 150,176 180,168', 'sk-fib'));
      s += top;
      // Blutgefäße
      s += part('blutgefaesse', P('M60,176 C110,172 150,180 200,174 C250,168 300,178 330,172', 'vr') + P('M60,166 C110,160 160,168 210,162 C260,156 300,166 330,160', 'vbl2') +
        P('M180,174 C176,140 174,110 184,102 C194,110 192,140 188,168', 'vr vthin') + P('M262,170 C258,140 258,110 266,102 C274,110 274,140 270,164', 'vbl2 vthin') +
        P('M60,246 C120,240 200,252 330,244', 'vr vthick') + P('M60,256 C130,250 210,262 330,254', 'vbl2 vthick') +
        H('M60,176 C110,172 150,180 200,174 C250,168 300,178 330,172 M60,166 C110,160 160,168 210,162 C260,156 300,166 330,160 M180,174 C176,140 174,110 184,102 M262,170 C258,140 258,110 266,102', 8));
      // Sinneskörperchen + Nerv
      s += part('sinneskoerperchen', P('M214,108 C220,150 200,190 182,220 M180,234 C172,252 168,270 166,284', 'nerve') +
        '<ellipse class="corp" cx="214" cy="104" rx="4" ry="6.5"/>' + P('M211,100 h6 M211,104 h6 M211,108 h6', 'corp-l') +
        '<ellipse class="corp" cx="180" cy="226" rx="11" ry="7.5"/><ellipse class="corp-r" cx="180" cy="226" rx="7" ry="4.5"/><ellipse class="corp-r" cx="180" cy="226" rx="3" ry="2"/>' + HR(166, 216, 28, 20) + HR(206, 94, 16, 22));
      // Haare mit Wurzel, Muskel, Talgdrüse
      function hair(x0, xb, yb, mx, my, sx, sy, len) {
        var fol = '<g class="hairrot hr-' + x0 + '">' + P('M' + (x0 - 5) + ',64 L' + (x0 + 5) + ',64 L' + (xb + 6) + ',' + (yb - 4) + ' C' + (xb + 6) + ',' + (yb + 4) + ' ' + (xb - 6) + ',' + (yb + 6) + ' ' + (xb - 7) + ',' + (yb - 2) + ' Z', 'fol') +
          E(xb, yb, 8, 7, 'bulb') + P('M' + xb + ',' + (yb - 4) + ' L' + x0 + ',66', 'shaft') + '</g>';
        var mus = P('M' + (mx - 3) + ',' + (my + 2) + ' L' + (mx + 3) + ',' + (my - 3) + ' L' + (sx + 4) + ',98 L' + (sx - 4) + ',98 Z', 'amus');
        var gl = '<circle class="seb" cx="' + (mx + 6) + '" cy="' + (my - 30) + '" r="5"/><circle class="seb" cx="' + (mx + 12) + '" cy="' + (my - 36) + '" r="4.6"/><circle class="seb" cx="' + (mx + 12) + '" cy="' + (my - 24) + '" r="4.6"/>';
        var shaftOut = '<g class="hairrot hr-' + x0 + '">' + P('M' + x0 + ',66 C' + (x0 + 4) + ',50 ' + (x0 + 14) + ',30 ' + (x0 + len) + ',' + sy, 'shaft shaft-out') + '</g>';
        return { fol: fol, mus: mus, gl: gl, out: shaftOut };
      }
      var h1 = hair(136, 110, 186, 122, 142, 158, 14, 30), h2 = hair(236, 212, 188, 222, 144, 258, 16, 28);
      s += part('haarwurzel', h1.fol + h2.fol);
      s += part('talgdruese', h1.gl + h2.gl);
      s += part('haarmuskel', '<g class="amus-g amus-1">' + h1.mus + '</g><g class="amus-g amus-2">' + h2.mus + '</g>');
      s += part('haar', h1.out + h2.out + P('M96,52 C100,38 108,26 120,18', 'shaft shaft-out') + HR(90, 6, 190, 50));
      // Schweißdrüse
      s += part('schweissdruese', P('M282,190 C276,180 296,174 298,184 C300,196 280,200 284,190 C288,180 304,186 300,196 C296,204 280,202 280,194', 'sweat') +
        P('M292,182 C288,166 296,156 290,140 C284,124 296,114 290,100 C286,88 294,74 292,64', 'sweat sweat-d') + E(292, 62, 3, 1.6, 'pore') + HR(274, 60, 34, 146));
      s += '<g class="drops"><circle class="drop" cx="292" cy="56" r="3"/><circle class="drop d2" cx="300" cy="50" r="2.4"/><circle class="drop d3" cx="285" cy="48" r="2.2"/></g>';
      s += P('M48,64 h-6 V95 h6 M48,98 h-6 V195 h6 M48,198 h-6 V284 h6', 'brk');
      return s;
    },
    parts: [
      { id: 'haar', name: 'Haar', alt: ['Haare'], info: 'wächst durch Ober- und Lederhaut', mk: [[24, 22, 108, 34]], find: true },
      { id: 'hornschicht', name: 'Hornschicht', info: 'äußerste Schicht der Oberhaut – Schuppenpanzer', mk: [[366, 72, 322, 67]], find: true },
      { id: 'oberhaut', name: 'Oberhaut', info: 'oberste Schicht, wird ständig erneuert', mk: [[24, 82, 62, 82]], find: true, zone: [60, 64, 330, 97] },
      { id: 'talgdruese', name: 'Talgdrüse', alt: ['Talgdrüsen', 'Talgdruese'], info: 'bildet Talg (fettet Haut und Haare)', mk: [[24, 114, 131, 112]], find: true },
      { id: 'lederhaut', name: 'Lederhaut', info: 'mittlere Schicht mit Blutgefäßen, Drüsen, Haarwurzeln', mk: [[24, 148, 62, 148]], find: true, zone: [60, 97, 330, 196] },
      { id: 'haarwurzel', name: 'Haarwurzel', alt: ['Haarwurzeln'], info: 'in der Lederhaut befestigt', mk: [[24, 186, 103, 186]], find: true },
      { id: 'unterhaut', name: 'Unterhaut', info: 'unterste Schicht mit Fettpolstern', mk: [[24, 240, 62, 240]], find: true, zone: [60, 196, 330, 284] },
      { id: 'haarmuskel', name: 'Haarmuskel', alt: ['Haarmuskeln'], info: 'lässt die Haare aufstehen (Gänsehaut)', mk: [[366, 110, 246, 112]], find: true },
      { id: 'blutgefaesse', name: 'Blutgefäße', alt: ['Blutgefaesse', 'Blutgefäß', 'Adern'], info: 'versorgen die Haut, regeln die Temperatur', mk: [[366, 172, 322, 172]], find: true },
      { id: 'schweissdruese', name: 'Schweißdrüse', alt: ['Schweißdrüsen', 'Schweissdruese'], info: 'bildet Schweiß zum Abkühlen', mk: [[366, 196, 300, 192]], find: true },
      { id: 'sinneskoerperchen', name: 'Sinneskörperchen', alt: ['Sinneszellen', 'Sinneskoerperchen', 'Nerv'], info: 'damit spüren wir Druck, Schmerz, Wärme, Kälte', mk: [[366, 226, 184, 226]], find: true },
      { id: 'fettpolster', name: 'Fettpolster', alt: ['Fett'], info: 'Stoßdämpfer, schützt vor Kälte und Hitze', mk: [[366, 270, 309, 279]], find: true }
    ]
  };

  /* ======================= INFO-GRAFIKEN (ohne Quiz) ======================= */
  D.reizweg = {
    title: 'Vom Reiz zum Gehirn', vb: [0, 0, 560, 170], kap: 'wahrnehmung', noQuiz: true,
    render: function () {
      var s = '';
      s += part('reiz', P('M30,120 C30,90 44,70 64,70 C84,70 96,88 96,112 L96,150 L30,150 Z', 'org-skin') + P('M62,24 L66,64', 'needle') + P('M66,64 l-4,-6 M66,64 l5,-5 M66,64 l-7,1 M66,64 l7,2', 'burst'));
      s += part('sinneskoerperchen', '<rect class="sk-der" x="140" y="80" width="100" height="56" rx="8"/><rect class="sk-epi" x="140" y="80" width="100" height="12" rx="6"/><ellipse class="corp" cx="190" cy="108" rx="9" ry="12"/>' + P('M186,102 h8 M186,108 h8 M186,114 h8', 'corp-l'));
      s += part('nerv', '<path class="nerve nerve-big" d="M199,112 C260,112 300,60 360,64 C400,66 410,92 440,94"/>' +
        '<circle class="flow" r="4.5" fill="#F4B400"><animateMotion dur="1.8s" repeatCount="indefinite" path="M199,112 C260,112 300,60 360,64 C400,66 410,92 440,94"/></circle>');
      s += part('gehirn', P('M446,94 C440,70 458,48 482,48 C498,40 524,46 532,62 C548,66 552,92 538,104 C536,122 512,128 498,120 C484,130 458,124 456,110 C446,108 444,100 446,94 Z', 'brain') +
        P('M462,74 C472,66 482,72 480,80 M494,58 C502,66 512,62 516,70 M470,98 C482,92 492,100 504,94 M516,84 C524,88 528,96 522,100', 'brain-l') + '<text class="dtx" x="500" y="158" text-anchor="middle">„Aua, spitz!“</text>');
      s += '<g class="lbl"><text class="dtx" x="62" y="168" text-anchor="middle">Reiz</text><text class="dtx" x="190" y="158" text-anchor="middle">Sinneskörperchen</text><text class="dtx" x="320" y="104" text-anchor="middle">Nerven</text><text class="dtx" x="500" y="24" text-anchor="middle">Gehirn</text></g>';
      return s;
    },
    parts: [
      { id: 'reiz', name: 'Reiz (z. B. Nadelstich)', info: 'etwas berührt die Haut', mk: [], find: false },
      { id: 'sinneskoerperchen', name: 'Sinneskörperchen', info: 'nehmen den Reiz auf', mk: [], find: false },
      { id: 'nerv', name: 'Nerven', info: 'leiten die Nachricht weiter', mk: [], find: false },
      { id: 'gehirn', name: 'Gehirn', info: 'erkennt, was du spürst', mk: [], find: false }
    ]
  };

  D.dichte = {
    title: 'Sinneskörperchen sind unterschiedlich verteilt', vb: [0, 0, 380, 236], kap: 'wahrnehmung', noQuiz: true,
    render: function () {
      var s = '';
      var hand = P('M60,226 L58,150 C56,140 44,120 34,104 C28,94 38,86 46,94 L64,118 L62,48 C62,38 76,38 76,48 L78,108 L82,34 C82,24 96,24 96,34 L96,108 L100,42 C100,32 114,32 114,42 L112,112 L118,62 C118,52 132,52 132,62 L126,150 C124,180 118,200 116,226 Z', 'org-skin');
      var dots = '', seed = 7;
      function r() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      [[69, 52], [89, 40], [107, 48], [125, 66], [40, 100]].forEach(function (c) { for (var i = 0; i < 9; i++) dots += '<circle class="den" cx="' + (c[0] - 5 + r() * 10).toFixed(1) + '" cy="' + (c[1] - 3 + r() * 10).toFixed(1) + '" r="1.6"/>'; });
      for (var i = 0; i < 14; i++) dots += '<circle class="den" cx="' + (66 + r() * 50).toFixed(1) + '" cy="' + (80 + r() * 60).toFixed(1) + '" r="1.6"/>';
      for (i = 0; i < 8; i++) dots += '<circle class="den" cx="' + (66 + r() * 46).toFixed(1) + '" cy="' + (150 + r() * 66).toFixed(1) + '" r="1.6"/>';
      var back = P('M228,226 C222,190 220,150 222,110 C224,84 236,66 260,60 L276,44 L300,44 L316,60 C340,66 352,84 354,110 C356,150 354,190 348,226 Z', 'org-skin') + P('M288,64 L288,220', 'skin-line');
      var bdots = '';
      [[250, 100], [326, 96], [270, 140], [306, 150], [246, 190], [330, 196], [288, 120], [262, 208], [314, 214]].forEach(function (p) { bdots += '<circle class="den" cx="' + p[0] + '" cy="' + p[1] + '" r="1.8"/>'; });
      s += hand + dots + back + bdots;
      s += '<g class="lbl"><text class="dtx" x="80" y="18" text-anchor="middle">Fingerspitzen: sehr viele</text><text class="dtx" x="288" y="30" text-anchor="middle">Rücken: wenige</text></g>';
      return s;
    },
    parts: []
  };

  D.vitamind = {
    title: 'Von der Sonne zum Knochen', vb: [0, 0, 560, 140], kap: 'sonne', noQuiz: true,
    render: function () {
      var s = '';
      var rays = '';
      for (var a = 0; a < 360; a += 45) { var rad = a * Math.PI / 180; rays += 'M' + (60 + Math.cos(rad) * 30).toFixed(1) + ',' + (60 + Math.sin(rad) * 30).toFixed(1) + ' L' + (60 + Math.cos(rad) * 42).toFixed(1) + ',' + (60 + Math.sin(rad) * 42).toFixed(1) + ' '; }
      s += '<defs><marker id="vdA" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#9AA5B4"/></marker></defs>';
      s += '<circle class="sun" cx="60" cy="60" r="24"/>' + P(rays, 'sun-r') + '<text class="dtx" x="60" y="124" text-anchor="middle">Sonne (UV-B)</text>';
      s += '<path class="arrowline" d="M112,60 L160,60" marker-end="url(#vdA)"/>';
      s += '<rect class="sk-epi" x="172" y="36" width="86" height="16" rx="6"/><rect class="sk-der" x="172" y="52" width="86" height="34" rx="6"/><text class="dtx" x="215" y="124" text-anchor="middle">Haut bildet Vorstufe</text>';
      s += '<path class="arrowline" d="M266,60 L314,60" marker-end="url(#vdA)"/>';
      s += '<rect class="vitd" x="326" y="42" width="70" height="36" rx="18"/><text class="vitd-t" x="361" y="66" text-anchor="middle">Vitamin D</text><text class="dtx" x="361" y="124" text-anchor="middle">Vitamin D</text>';
      s += '<path class="arrowline" d="M404,60 L448,60" marker-end="url(#vdA)"/>';
      s += P('M466,48 C458,38 470,30 478,40 L520,62 C530,54 542,62 534,72 C542,80 530,90 522,80 L480,58 C470,68 458,60 466,48 Z', 'bf');
      s += '<text class="dtx" x="500" y="124" text-anchor="middle">Knochenaufbau</text>';
      return s;
    },
    parts: []
  };
})(window.ATLAS = window.ATLAS || {});
