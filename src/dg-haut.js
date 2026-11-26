/* Adas Körper-Atlas – Haut im 3D-Schnitt und Infografiken (Reizweg, Dichte, Vitamin D) */
(function (A) {
  'use strict';
  var G = A.G, D = A.diagramme, C = G.C;
  var part = G.part, H = G.H, HR = G.HR, path = G.path, ell = G.ell, rect = G.rect, g = G.g, f = G.f, tube = G.tube, gloss = G.gloss, circ = G.circ;
  function line(d, col, w, op, o) { return path(d, G.ext({ fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: op == null ? 1 : op }, o)); }
  function poly(pts, o) { return path('M' + pts.map(G.pt).join(' L') + ' Z', o); }

  /* ======================= HAUT ======================= */
  D.haut = {
    title: 'Die Haut (Schnitt)', vb: [0, 0, 380, 300], kap: 'haut', lz: '9.9',
    render: function () {
      var s = G.spot(200, 170, 190, 140) + G.ground(196, 288, 150, 7), x, i;
      var wave = '';
      for (x = 60; x + 24 <= 330; x += 24) wave += ' Q' + (x + 12) + ',84 ' + (x + 24) + ',96';
      wave += ' L330,96';
      // Unterhaut mit Fettpolstern
      var fat = '';
      [214, 236, 258, 278].forEach(function (y, r) {
        for (x = 72 + (r % 2) * 12; x < 322; x += 25) {
          var ry = r === 3 ? 6 : 9;
          fat += ell(x, y, 11.5, ry, { fill: 'url(#{P}gFat)', stroke: '#C9A243', 'stroke-width': 0.8 }) + gloss(x - 3.5, y - ry * 0.4, 4, ry * 0.3, -15, 0.7);
        }
      });
      s += part('unterhaut', '<g class="part-rest">' + rect(60, 196, 270, 88, 0, { fill: 'url(#{P}gSub)', stroke: '#C9A54A', 'stroke-width': 0.9 }) +
        poly([[330, 196], [352, 176], [352, 264], [330, 284]], { fill: '#E9D29A', stroke: '#C9A54A', 'stroke-width': 0.9 }) + '</g>' + part('fettpolster', fat));
      // Oberhaut mit Hornschicht
      var cells = '';
      for (x = 66; x < 328; x += 7) cells += ell(x, 76 + ((x / 7) % 2) * 3, 2.6, 1.6, { fill: '#E9A986', opacity: 0.45 });
      s += part('oberhaut', '<g class="part-rest">' + rect(60, 64, 270, 34, 0, { fill: 'url(#{P}gEpi)', stroke: '#A0705A', 'stroke-width': 0.9 }) + cells +
        poly([[330, 64], [352, 44], [352, 77], [330, 97]], { fill: '#E2A381', stroke: '#A0705A', 'stroke-width': 0.9 }) + '</g>' +
        part('hornschicht', rect(60, 64, 270, 6.5, 0, { fill: 'url(#{P}gHorn)' }) + poly([[330, 64], [352, 44], [352, 50.5], [330, 70.5]], { fill: '#CF8E6C' }) +
          line('M72,67.5 h8 M96,66.6 h8 M128,67.5 h8 M168,66.6 h8 M210,67.5 h8 M246,66.6 h8 M290,67.5 h8', '#B9785A', 0.9, 0.9)));
      // Lederhaut mit Bindegewebsfasern
      s += part('lederhaut', path('M60,196 L60,96' + wave + ' L330,196 Z', { fill: 'url(#{P}gDer)', stroke: '#C99686', 'stroke-width': 0.9 }) +
        poly([[330, 97], [352, 77], [352, 176], [330, 196]], { fill: '#E6B5A4', stroke: '#C99686', 'stroke-width': 0.9 }) +
        line('M72,128 C100,120 128,134 158,126 C188,118 214,132 244,124 M196,150 C226,142 256,156 300,146 M76,170 C108,164 140,176 172,168 M240,186 C262,180 290,190 320,184 M84,148 C104,142 120,152 138,146', '#EDB9A8', 1.3, 0.9) +
        line('M72,128 C100,120 128,134 158,126 C188,118 214,132 244,124 M196,150 C226,142 256,156 300,146 M76,170 C108,164 140,176 172,168', '#FFFFFF', 0.6, 0.6, { transform: 'translate(0,-1.2)' }));
      // Oberfläche (Oberseite des Blocks) mit Poren und Hautlinien
      s += poly([[60, 64], [82, 44], [352, 44], [330, 64]], { fill: 'url(#{P}gTop)', stroke: '#A0705A', 'stroke-width': 1 }) +
        line('M96,58 L120,50 M140,60 L170,49 M190,58 L214,50 M232,61 L262,49 M282,58 L306,50 M110,61 L128,55 M250,56 L270,52 M300,61 L322,53', '#D9A085', 0.8, 0.8) +
        [[118, 55], [160, 57], [205, 53], [250, 58], [276, 51], [318, 57]].map(function (p) { return ell(p[0], p[1], 1.3, 0.7, { fill: '#B97A5E' }); }).join('');
      // Blutgefäße
      var V1 = 'M60,176 C110,172 150,180 200,174 C250,168 300,178 330,172', V2 = 'M60,166 C110,160 160,168 210,162 C260,156 300,166 330,160';
      s += part('blutgefaesse', tube(V2, 2.8, 'ven') + tube(V1, 2.8, 'art') + tube('M180,174 C176,140 174,110 184,102 C194,110 192,140 188,168', 1.6, 'art') + tube('M262,170 C258,140 258,110 266,102 C274,110 274,140 270,164', 1.6, 'ven') +
        tube('M60,256 C130,250 210,262 330,254', 4.6, 'ven') + tube('M60,246 C120,240 200,252 330,244', 4.6, 'art') +
        H(V1 + ' ' + V2 + ' M180,174 C176,140 174,110 184,102 M262,170 C258,140 258,110 266,102', 8));
      // Sinneskörperchen und Nerv
      s += part('sinneskoerperchen', tube('M214,110 C220,150 200,190 182,220 M180,234 C172,252 168,270 166,284', 2.2, 'nerve') +
        ell(214, 104, 4.2, 6.6, { fill: 'url(#{P}gCorp)', stroke: '#A8801E', 'stroke-width': 0.8 }) + line('M210.6,100.4 h7 M210.2,104 h7.6 M210.6,107.6 h7', '#A8801E', 0.7, 0.8) +
        ell(180, 226, 11.5, 8, { fill: 'url(#{P}gCorp)', stroke: '#A8801E', 'stroke-width': 0.9 }) + ell(180, 226, 7.6, 5, { fill: 'none', stroke: '#B8902C', 'stroke-width': 0.8 }) +
        ell(180, 226, 3.6, 2.4, { fill: '#F6E08C', stroke: '#B8902C', 'stroke-width': 0.7 }) + gloss(176, 222, 4, 2, -15, 0.7) + HR(166, 216, 28, 20) + HR(206, 94, 16, 22));
      // Haare mit Wurzel, Muskel, Talgdrüse
      function hair(x0, xb, yb, mx, my, sx, sy, len) {
        var fol = '<g class="hairrot hr-' + x0 + '">' +
          path('M' + (x0 - 5) + ',64 L' + (x0 + 5) + ',64 L' + (xb + 6) + ',' + (yb - 4) + ' C' + (xb + 6) + ',' + (yb + 4) + ' ' + (xb - 6) + ',' + (yb + 6) + ' ' + (xb - 7) + ',' + (yb - 2) + ' Z', { fill: 'url(#{P}gFol)', stroke: '#A0705A', 'stroke-width': 0.8 }) +
          tube('M' + xb + ',' + (yb - 4) + ' L' + x0 + ',66', 2.4, 'hair') +
          ell(xb, yb, 8, 7, { fill: 'url(#{P}gBulb)', stroke: '#7E4C34', 'stroke-width': 0.8 }) + path('M' + (xb - 3) + ',' + (yb + 6.4) + ' Q' + xb + ',' + (yb + 1) + ' ' + (xb + 3) + ',' + (yb + 6.4) + ' Z', { fill: '#F2A79A', stroke: '#C9786A', 'stroke-width': 0.6 }) +
          gloss(xb - 2.6, yb - 2.6, 2.6, 1.6, -20, 0.6) + '</g>';
        var mus = G.muscle('M' + (mx - 3) + ',' + (my + 2) + ' L' + (mx + 3) + ',' + (my - 3) + ' L' + (sx + 4) + ',98 L' + (sx - 4) + ',98 Z', { ang: Math.atan2(98 - my, sx - mx) * 180 / Math.PI, gap: 1.4 }, { sw: 0.7 });
        var gl = circ(mx + 6, my - 30, 5, { fill: 'url(#{P}gSeb)', stroke: '#B89536', 'stroke-width': 0.8 }) + circ(mx + 12, my - 36, 4.6, { fill: 'url(#{P}gSeb)', stroke: '#B89536', 'stroke-width': 0.8 }) +
          circ(mx + 12, my - 24, 4.6, { fill: 'url(#{P}gSeb)', stroke: '#B89536', 'stroke-width': 0.8 }) + gloss(mx + 10, my - 33, 2, 1.4, 0, 0.7);
        var out = '<g class="hairrot hr-' + x0 + '">' + tube('M' + x0 + ',66 C' + (x0 + 4) + ',50 ' + (x0 + 14) + ',30 ' + (x0 + len) + ',' + sy, 2.6, 'hair') + '</g>';
        return { fol: fol, mus: mus, gl: gl, out: out };
      }
      var h1 = hair(136, 110, 186, 122, 142, 158, 14, 30), h2 = hair(236, 212, 188, 222, 144, 258, 16, 28);
      s += part('haarwurzel', h1.fol + h2.fol);
      s += part('talgdruese', h1.gl + h2.gl);
      s += part('haarmuskel', '<g class="amus-g amus-1">' + h1.mus + '</g><g class="amus-g amus-2">' + h2.mus + '</g>');
      s += part('haar', h1.out + h2.out + tube('M96,52 C100,38 108,26 120,18', 2.4, 'hair') + tube('M288,50 C292,40 298,32 306,27', 2, 'hair') + tube('M190,52 C192,44 196,38 202,34', 1.8, 'hair') + HR(90, 6, 190, 44));
      // Schweißdrüse
      s += part('schweissdruese', tube('M282,190 C276,180 296,174 298,184 C300,196 280,200 284,190 C288,180 304,186 300,196 C296,204 280,202 280,194', 4.4, 'sweat') +
        tube('M292,182 C288,166 296,156 290,140 C284,124 296,114 290,100 C286,88 294,74 292,64', 2.4, 'sweat') + ell(292, 62, 3, 1.6, { fill: '#2E6DA6' }) + HR(274, 60, 34, 146));
      s += '<g class="drops"><circle class="drop" cx="292" cy="56" r="3"/><circle class="drop d2" cx="300" cy="50" r="2.4"/><circle class="drop d3" cx="285" cy="48" r="2.2"/></g>';
      s += '<path class="brk" d="M48,64 h-6 V95 h6 M48,98 h-6 V195 h6 M48,198 h-6 V284 h6"/>';
      return s;
    },
    parts: [
      { id: 'haar', name: 'Haar', alt: ['Haare'], info: 'wächst durch Ober- und Lederhaut', mk: [[24, 22, 108, 34]], find: true },
      { id: 'hornschicht', name: 'Hornschicht', info: 'äußerste Schicht der Oberhaut – Schuppenpanzer', mk: [[366, 72, 322, 67]], find: true },
      { id: 'oberhaut', name: 'Oberhaut', info: 'oberste Schicht, wird ständig erneuert', mk: [[24, 82, 62, 82]], find: true, zone: [60, 64, 330, 97] },
      { id: 'talgdruese', name: 'Talgdrüse', alt: ['Talgdrüsen', 'Talgdruese'], info: 'bildet Talg (fettet Haut und Haare)', mk: [[24, 114, 131, 112]], find: true },
      { id: 'lederhaut', name: 'Lederhaut', info: 'mittlere Schicht mit Blutgefäßen, Drüsen, Haarwurzeln', mk: [[24, 148, 62, 148]], find: true, zone: [60, 97, 330, 196] },
      { id: 'haarwurzel', name: 'Haarwurzel', alt: ['Haarwurzeln'], info: 'in der Lederhaut befestigt', mk: [[24, 186, 104, 186]], find: true },
      { id: 'unterhaut', name: 'Unterhaut', info: 'unterste Schicht mit Fettpolstern', mk: [[24, 240, 62, 240]], find: true, zone: [60, 196, 330, 284] },
      { id: 'haarmuskel', name: 'Haarmuskel', alt: ['Haarmuskeln'], info: 'lässt die Haare aufstehen (Gänsehaut)', mk: [[366, 110, 246, 112]], find: true },
      { id: 'blutgefaesse', name: 'Blutgefäße', alt: ['Blutgefaesse', 'Blutgefäß', 'Adern'], info: 'versorgen die Haut, regeln die Temperatur', mk: [[366, 172, 322, 172]], find: true },
      { id: 'schweissdruese', name: 'Schweißdrüse', alt: ['Schweißdrüsen', 'Schweissdruese'], info: 'bildet Schweiß zum Abkühlen', mk: [[366, 196, 300, 192]], find: true },
      { id: 'sinneskoerperchen', name: 'Sinneskörperchen', alt: ['Sinneszellen', 'Sinneskoerperchen', 'Nerv'], info: 'damit spüren wir Druck, Schmerz, Wärme, Kälte', mk: [[366, 226, 184, 226]], find: true },
      { id: 'fettpolster', name: 'Fettpolster', alt: ['Fett'], info: 'Stoßdämpfer, schützt vor Kälte und Hitze', mk: [[366, 270, 309, 279]], find: true }
    ]
  };

  /* ======================= INFO-GRAFIKEN (ohne Quiz) ======================= */
  function brainShape(d, sul) {
    return path(d, { fill: 'url(#{P}gBrain)', stroke: '#A8606C', 'stroke-width': 1.1 }) + line(sul, '#FFFFFF', 1.8, 0.55, { transform: 'translate(-0.6,-0.7)' }) + line(sul, '#C27884', 1.3, 0.85);
  }
  D.reizweg = {
    title: 'Vom Reiz zum Gehirn', vb: [0, 0, 560, 170], kap: 'wahrnehmung', noQuiz: true,
    render: function () {
      var s = G.spot(280, 90, 280, 80);
      var NERVE = 'M199,112 C260,112 300,60 360,64 C400,66 410,92 440,94';
      s += part('reiz', g(path('M30,150 L30,112 C30,88 44,70 64,70 C84,70 96,88 96,110 L96,150 Z', { fill: 'url(#{P}gSkinH)', stroke: C.skin, 'stroke-width': 1.2 }) +
        path('M48,78 C52,72 76,72 80,78 L78,90 C70,86 58,86 50,90 Z', { fill: '#FBE3E0', stroke: '#D9A79F', 'stroke-width': 0.9 }) + gloss(56, 80, 6, 2, -10, 0.8) + gloss(46, 116, 4, 18, 0, 0.35), { class: 'shw', filter: 'url(#{P}sh)' }) +
        line('M64,8 L66,60', '#9AA5B4', 3.2) + line('M64,8 L66,60', '#E9EEF4', 1.2) + circ(63.6, 9, 6, { fill: 'url(#{P}gCellR)', stroke: '#9C1424', 'stroke-width': 0.8 }) + gloss(61.6, 7, 2, 1.4, -20, 0.9) +
        line('M66,64 l-6,-6 M66,64 l7,-5 M66,64 l-9,1 M66,64 l9,2 M66,64 l-4,7', '#F59E0B', 2.2));
      s += part('sinneskoerperchen', g(rect(140, 80, 100, 56, 10, { fill: 'url(#{P}gDer)', stroke: '#C99686', 'stroke-width': 1 }) + path('M150,80 L230,80 Q240,80 240,90 L240,94 L140,94 L140,90 Q140,80 150,80 Z', { fill: 'url(#{P}gEpi)', stroke: '#A0705A', 'stroke-width': 0.9 }) +
        ell(190, 110, 9.5, 12.5, { fill: 'url(#{P}gCorp)', stroke: '#A8801E', 'stroke-width': 1 }) + line('M184.6,104 h11 M183.8,110 h12.4 M184.6,116 h11', '#A8801E', 0.9, 0.85) + gloss(186, 104, 3, 2, -20, 0.8), { class: 'shw', filter: 'url(#{P}sh)' }));
      s += part('nerv', tube(NERVE, 5.2, 'nerve') +
        circ(0, 0, 9, { fill: '#FFE680', opacity: 0.45, filter: 'url(#{P}blur)' }).replace('<circle', '<circle class="flow"').replace('/>', '><animateMotion dur="1.8s" repeatCount="indefinite" path="' + NERVE + '"/></circle>') +
        '<circle class="flow" r="4.6" fill="#FFF3B0" stroke="#F4B400" stroke-width="1.4"><animateMotion dur="1.8s" repeatCount="indefinite" path="' + NERVE + '"/></circle>');
      s += part('gehirn', g(brainShape('M446,94 C440,70 458,48 482,48 C498,40 524,46 532,62 C548,66 552,92 538,104 C536,122 512,128 498,120 C484,130 458,124 456,110 C446,108 444,100 446,94 Z',
        'M462,74 C472,66 482,72 480,80 M494,58 C502,66 512,62 516,70 M470,98 C482,92 492,100 504,94 M516,84 C524,88 528,96 522,100 M488,76 C494,84 504,82 508,88 M460,106 C466,102 474,106 478,112') + gloss(484, 60, 14, 5, -10, 0.6), { class: 'shw', filter: 'url(#{P}sh)' }) +
        path('M458,132 L540,132 Q548,132 548,140 L548,156 Q548,164 540,164 L462,164 Q454,164 454,156 L454,140 Q454,136 456,134 L448,126 Z', { fill: '#FFFFFF', stroke: '#C9C2B8', 'stroke-width': 1.2 }) +
        '<text class="dtx" x="501" y="152" text-anchor="middle">„Aua, spitz!“</text>');
      s += '<g class="lbl"><text class="dtx" x="63" y="166" text-anchor="middle">Reiz</text><text class="dtx" x="190" y="154" text-anchor="middle">Sinneskörperchen</text><text class="dtx halo" x="322" y="100" text-anchor="middle">Nerven</text><text class="dtx" x="496" y="34" text-anchor="middle">Gehirn</text></g>';
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
      var s = G.spot(190, 130, 190, 110);
      var SK = { fill: 'url(#{P}gSkinH)', stroke: C.skin, 'stroke-width': 1.2, 'stroke-linejoin': 'round' };
      var hand = path('M60,226 L58,150 C56,140 44,120 34,104 C28,94 38,86 46,94 L64,118 L62,48 C62,38 76,38 76,48 L78,108 L82,34 C82,24 96,24 96,34 L96,108 L100,42 C100,32 114,32 114,42 L112,112 L118,62 C118,52 132,52 132,62 L126,150 C124,180 118,200 116,226 Z', SK) +
        line('M69,112 C70,100 70,90 69,80 M89,108 C89,94 89,80 89,66 M107,112 C107,100 107,88 107,76 M124,116 C124,106 125,96 125,86', '#E0AE92', 1, 0.7) +
        line('M70,160 C84,152 100,152 116,160 M66,176 C82,168 104,170 118,178', '#E0AE92', 1.1, 0.6) +
        gloss(76, 160, 10, 30, 0, 0.35);
      var dots = '', r = G.rnd(7), i;
      function dot(x, y) { return circ(x, y, 3.2, { fill: '#6C79E0', opacity: 0.28 }) + circ(x, y, 1.6, { fill: '#3F48C2' }); }
      [[69, 52], [89, 40], [107, 48], [125, 66], [40, 100]].forEach(function (c) { for (i = 0; i < 9; i++) dots += dot(c[0] - 5 + r() * 10, c[1] - 3 + r() * 10); });
      for (i = 0; i < 14; i++) dots += dot(66 + r() * 50, 80 + r() * 60);
      for (i = 0; i < 8; i++) dots += dot(66 + r() * 46, 150 + r() * 66);
      var back = path('M228,226 C222,190 220,150 222,110 C224,84 236,66 260,60 L276,44 L300,44 L316,60 C340,66 352,84 354,110 C356,150 354,190 348,226 Z', G.ext(SK, { fill: 'url(#{P}gSkin)' })) +
        line('M288,64 L288,220', '#D9A085', 1.4, 0.8) + line('M262,92 C268,104 270,118 266,130 M314,92 C308,104 306,118 310,130', '#E0AE92', 1.1, 0.7) + gloss(256, 120, 10, 34, 0, 0.35);
      var bdots = '';
      [[250, 100], [326, 96], [270, 140], [306, 150], [246, 190], [330, 196], [288, 120], [262, 208], [314, 214]].forEach(function (p) { bdots += dot(p[0], p[1]); });
      s += g(hand + back, { class: 'shw', filter: 'url(#{P}sh)' }) + dots + bdots;
      s += '<g class="lbl"><text class="dtx" x="80" y="18" text-anchor="middle">Fingerspitzen: sehr viele</text><text class="dtx" x="288" y="30" text-anchor="middle">Rücken: wenige</text></g>';
      return s;
    },
    parts: []
  };

  D.vitamind = {
    title: 'Von der Sonne zum Knochen', vb: [0, 0, 560, 140], kap: 'sonne', noQuiz: true,
    render: function () {
      var s = '', rays = '', a;
      for (a = 0; a < 360; a += 30) { var rad = a * Math.PI / 180, l = a % 60 ? 38 : 44; rays += 'M' + f(60 + Math.cos(rad) * 30) + ',' + f(60 + Math.sin(rad) * 30) + ' L' + f(60 + Math.cos(rad) * l) + ',' + f(60 + Math.sin(rad) * l) + ' '; }
      function arrow(x0, x1) { return line('M' + x0 + ',60 L' + (x1 - 6) + ',60', '#A8B3C2', 3, 1, { 'stroke-dasharray': '2 6' }) + G.arrowHead(x1, 60, 0, 9, '#A8B3C2'); }
      s += circ(60, 60, 46, { fill: 'url(#{P}gSunGlow)' }) + line(rays, '#FFB703', 4) + circ(60, 60, 24, { fill: 'url(#{P}gSun)' }) + gloss(53, 52, 8, 5, -30, 0.7) + '<text class="dtx" x="60" y="124" text-anchor="middle">Sonne (UV-B)</text>';
      s += arrow(112, 162);
      s += g(path('M172,52 L186,40 L262,40 L258,52 Z', { fill: 'url(#{P}gTop)', stroke: '#A0705A', 'stroke-width': 0.9 }) + rect(172, 52, 86, 14, 0, { fill: 'url(#{P}gEpi)', stroke: '#A0705A', 'stroke-width': 0.9 }) +
        rect(172, 66, 86, 22, 0, { fill: 'url(#{P}gDer)', stroke: '#C99686', 'stroke-width': 0.9 }) + rect(172, 88, 86, 10, 0, { fill: 'url(#{P}gSub)', stroke: '#C9A54A', 'stroke-width': 0.9 }) +
        path('M258,52 L262,40 L262,86 L258,98 Z', { fill: '#E2A381', stroke: '#A0705A', 'stroke-width': 0.9 }) +
        [[190, 59], [206, 61], [222, 58], [238, 61]].map(function (p) { return circ(p[0], p[1], 2.6, { fill: '#FFD34D', stroke: '#D9A400', 'stroke-width': 0.7 }); }).join(''), { class: 'shw', filter: 'url(#{P}sh)' }) +
        '<text class="dtx" x="215" y="124" text-anchor="middle">Haut bildet Vorstufe</text>';
      s += arrow(268, 318);
      s += g(rect(326, 42, 70, 36, 18, { fill: 'url(#{P}gVitD)', stroke: '#E0A100', 'stroke-width': 2 }) + path('M344,46 L378,46', { stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.8 }), { class: 'shw', filter: 'url(#{P}sh)' }) +
        '<text class="vitd-t" x="361" y="66" text-anchor="middle">Vitamin D</text>';
      s += arrow(404, 452);
      s += g(path('M466,48 C458,38 470,30 478,40 L520,62 C530,54 542,62 534,72 C542,80 530,90 522,80 L480,58 C470,68 458,60 466,48 Z', { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 1.1 }) +
        gloss(496, 54, 14, 2.4, 27, 0.8), { class: 'shw', filter: 'url(#{P}sh)' }) + '<text class="dtx" x="500" y="124" text-anchor="middle">Knochenaufbau</text>';
      return s;
    },
    parts: []
  };
})(window.ATLAS = window.ATLAS || {});
