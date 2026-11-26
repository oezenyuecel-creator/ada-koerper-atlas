/* Adas Körper-Atlas – Organe, Weg der Nahrung, Weg der Luft, Blutkreislauf (plastisch gezeichnet) */
(function (A) {
  'use strict';
  var G = A.G, D = A.diagramme, C = G.C;
  var part = G.part, H = G.H, HR = G.HR, both = G.both, path = G.path, ell = G.ell, rect = G.rect, g = G.g, f = G.f, pt = G.pt, tube = G.tube, gloss = G.gloss;
  function line(d, col, w, op, o) { return path(d, G.ext({ fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: op == null ? 1 : op }, o)); }
  function organ(d, grad, stroke, o) { return path(d, G.ext({ fill: 'url(#{P}' + grad + ')', stroke: stroke, 'stroke-width': 1.1, 'stroke-linejoin': 'round' }, o)); }

  /* ======================= ORGANE / VERDAUUNG (gemeinsamer Körper) ======================= */
  var HEAD_D = 'M120,60 C118,32 138,14 160,14 C184,14 200,30 200,52 C200,58 198,62 202,68 C205,72 203,76 199,77 C199,82 198,86 194,88 C192,94 188,98 180,98 L174,100 L172,112 L134,112 L136,96 C126,90 120,76 120,60 Z';
  var TORSO_D = 'M134,112 C116,114 96,118 84,126 C78,132 76,142 76,156 L78,250 C78,300 80,340 84,380 L88,452 L212,452 L216,380 C220,340 222,300 222,250 L224,156 C224,142 222,132 216,126 C204,118 184,114 172,112 Z';
  var ARM_D = 'M84,126 C66,130 58,146 56,170 L52,300 C50,340 48,380 46,420 C46,432 50,440 56,440 C62,440 64,430 64,420 C66,380 70,340 72,300 L76,196 Z';
  var SI_D = 'M170,328 C178,332 180,338 172,340 C160,342 140,334 126,340 C118,344 120,352 128,352 C144,352 160,348 174,354 C182,358 180,366 172,366 C158,366 140,360 126,366 C118,370 120,378 128,378 C144,378 160,374 174,380 C182,384 180,392 172,392 C158,392 140,386 128,392 C122,396 120,400 120,402';
  var COLON_D = 'M118,400 C110,400 108,388 108,376 L108,336 C108,326 114,322 124,322 L176,322 C188,322 192,328 192,338 L192,384 C192,398 186,404 176,406 C166,408 160,412 156,418';
  var RECT_D = 'M156,416 C154,424 152,432 152,442';
  var ESO_D = 'M158,100 C158,150 162,210 174,262';

  function bodyOrg() {
    var SKO = { fill: 'url(#{P}gTorso)', stroke: C.skin, 'stroke-width': 1.1, 'stroke-linejoin': 'round' };
    return g(both(path(ARM_D, SKO), 150) + path(TORSO_D, SKO) + path(HEAD_D, { fill: 'url(#{P}gSkinR)', stroke: C.skin, 'stroke-width': 1.1, 'stroke-linejoin': 'round' }) +
      ell(150, 62, 5, 8, { fill: '#F1C3A6', stroke: C.skin, 'stroke-width': 0.9 }) + line('M151,58 C148,61 149,65 151,67', C.skin, 0.9, 0.8) +
      path('M184,56 C186,53.6 190,53.4 192,55.4', { fill: 'none', stroke: '#5A3A28', 'stroke-width': 1.3, 'stroke-linecap': 'round' }) + ell(188.6, 59.4, 1.6, 2, { fill: '#2A2230' }) +
      gloss(150, 160, 40, 60, 0, 0.35), { class: 'shw', filter: 'url(#{P}sh)' });
  }
  function brain() {
    var b = organ('M136,44 C136,26 152,18 168,20 C184,20 194,32 192,46 C192,56 186,62 176,62 C170,66 160,66 154,62 C146,64 138,58 136,50 Z', 'gBrain', '#A8606C');
    var sul = 'M144,34 C150,30 156,34 154,40 M160,24 C166,30 174,26 178,32 M182,36 C186,42 184,50 188,52 M146,48 C152,44 160,50 168,46 M170,40 C176,44 172,52 180,54 M140,54 C146,52 150,58 156,56 M158,32 C162,38 158,44 164,46 M170,58 C174,54 180,58 184,56 M150,56 C160,50 172,52 182,48';
    b += line(sul, '#FFFFFF', 1.6, 0.55, { transform: 'translate(-0.5,-0.6)' }) + line(sul, '#C27884', 1.1, 0.85);
    b += organ('M150,62 C146,70 152,76 160,74 C166,72 168,66 164,62 Z', 'gCereb', '#A8606C') + line('M151,66 C156,68 161,68 165,65 M151.5,69.6 C156,71.4 160,71.4 163.6,69', '#A8606C', 0.7, 0.8);
    b += path('M160,70 L166,70 L166.4,88 L161,88 Z', { fill: 'url(#{P}gBrain)', stroke: '#A8606C', 'stroke-width': 0.9 }) + gloss(158, 30, 12, 5, -12, 0.6);
    return b;
  }
  function trachea() {
    var t = path('M146,100 L154,100 L154,150 L146,150 Z', { fill: 'url(#{P}gTrach)', stroke: '#6F8FB5', 'stroke-width': 0.9 });
    for (var y = 104; y < 150; y += 5.5) t += line('M146,' + y + ' L154,' + y, '#8FAACB', 1.1, 0.9);
    return t + tube('M150,150 L134,166', 5, 'air') + tube('M150,150 L166,166', 5, 'air');
  }
  function lungs(op) {
    var L = 'M140,150 C128,142 108,150 100,170 C92,192 90,230 94,262 C110,268 130,266 142,258 C146,230 146,190 140,150 Z',
      R = 'M160,150 C172,142 192,150 200,170 C208,192 210,230 206,262 C194,266 180,264 170,258 C172,246 162,236 160,226 C160,200 160,176 160,150 Z';
    var s = organ(L, 'gLung', '#B5606A', { opacity: op }) + organ(R, 'gLung', '#B5606A', { opacity: op });
    s += line('M134,166 L122,186 L112,210 M122,186 L130,212 M112,210 L104,236 M112,210 L120,240 M166,166 L178,188 L188,212 M178,188 L172,214 M188,212 L196,238', '#FFFFFF', 1.6, 0.55);
    s += line('M97,226 C110,220 124,214 141,208 M101,256 C112,236 126,210 138,176 M163,182 C176,206 190,232 204,254', '#B5606A', 0.9, 0.55);
    return s + gloss(112, 182, 9, 18, 15, 0.55) + gloss(188, 182, 9, 18, -15, 0.55);
  }
  function heart() {
    return tube('M166,194 C165,184 170,178 177,178 C183,178 186,183 185,190', 5.2, 'art') + tube('M156,204 L155,182', 5, 'ven') + tube('M160,196 C156,186 150,183 145,186', 5, 'ven') +
      organ('M146,206 C144,192 158,184 168,190 C178,184 192,190 192,204 C192,224 182,238 176,248 C164,240 150,228 146,214 Z', 'gHeart', '#7A1A1C') +
      line('M162,198 C166,212 171,226 176,244 M177,196 C184,204 188,214 188,224', '#F2A39C', 1, 0.75) + gloss(158, 200, 6, 4, -30, 0.7);
  }
  function liver() {
    return organ('M146,288 C146,283 152,281 154.6,286 C156.6,292 154.6,298.6 150.4,298.6 C147.2,298.6 146,294 146,288 Z', 'gGall', '#4E7F2E') +
      organ('M92,272 C110,262 150,262 174,268 C180,274 174,282 164,286 C142,296 118,304 100,308 C90,300 88,284 92,272 Z', 'gLiver', '#5E2416') +
      line('M128,266 C126,276 122,288 116,300', '#7E3524', 1, 0.6) + gloss(112, 276, 12, 4, -10, 0.55);
  }
  var STOM_D = 'M168,262 C172,254 186,251 198,256 C210,261 217,273 216,288 C215,304 205,316 190,319 C176,322 162,318 154,308 C151,304 152,300 157,298 C164,299 172,298 176,294 C179,290 178,282 175,276 C173,272 170,268 168,262 Z';
  function stomach() {
    return organ(STOM_D, 'gStom', '#A9503E') + line('M184,262 C196,268 205,282 205,298 M190,262 C200,270 210,284 210,296 M163,309 C174,314 186,314 198,308', '#D2826F', 1, 0.55) + gloss(200, 268, 7, 4, 30, 0.7);
  }
  function kidneys() {
    var kid = organ('M96,310 C84,310 80,326 82,334 C84,346 92,354 100,352 C106,350 108,344 104,338 C102,334 102,330 105,326 C108,320 106,310 96,310 Z', 'gKid', '#561A12') +
      path('M103.6,327 C100.6,329 100.4,335 103.4,337.4 L106,336 C104.6,333 104.8,330 106.4,328 Z', { fill: '#F3D27A', stroke: '#B89432', 'stroke-width': 0.6 }) +
      path('M88,311 C90,306 98,305 101,309 C97,309 92,310 88,311 Z', { fill: '#F2C55C', stroke: '#B88E24', 'stroke-width': 0.6 }) + gloss(91, 322, 3, 6, 10, 0.55);
    return kid + '<g transform="matrix(-1 0 0 1 300 -4)">' + kid.replace(/<(clipPath|linearGradient|radialGradient)\b[\s\S]*?<\/\1>/g, '') + '</g>';
  }
  function colon(withRect) {
    return tube(COLON_D, 15, 'col') + line(COLON_D, '#A86A3E', 13, 0.45, { 'stroke-dasharray': '1.3 5.2', 'stroke-linecap': 'butt' }) +
      tube('M116,404 C112,410 110,415 112,420', 3.2, 'col') + (withRect ? tube(RECT_D, 11, 'col') : '');
  }
  function smallInt() { return tube(SI_D, 8, 'si') + line(SI_D, '#C9786A', 6.4, 0.25, { 'stroke-dasharray': '1 4', 'stroke-linecap': 'butt' }); }
  function bladder() { return organ('M138,404 C136,394 164,394 162,404 C162,416 156,424 150,424 C144,424 138,416 138,404 Z', 'gBlad', '#A8801E') + gloss(146, 402, 4, 3, -20, 0.75); }

  function organSVG(mode) {
    var dig = mode === 'verdauung', s = G.spot(150, 240, 150, 230) + bodyOrg();
    if (!dig) {
      s += part('speiseroehre', tube(ESO_D, 6, 'eso', { opacity: 0.75 }));
      s += part('gehirn', brain()) + part('luftroehre', trachea()) + part('lunge', lungs(0.95)) + part('herz', heart());
      s += tube('M90,270 C110,256 136,254 150,256 C164,254 190,256 210,270', 3.4, 'mus', { opacity: 0.8, class: 'deco' });
      s += part('leber', liver()) + part('magen', stomach());
      s += line('M104,340 C112,370 128,392 142,404 M196,336 C188,366 172,390 158,404', '#E8C45C', 2.2, 1, { class: 'deco' }) + part('nieren', kidneys());
      s += part('darm', part('dickdarm', colon(true)) + part('duenndarm', smallInt() + HR(122, 334, 58, 62))) + part('blase', bladder());
    } else {
      s += g(brain() + trachea() + lungs(1) + heart(), { opacity: 0.2 });
      s += part('mund', path('M199,78 C192,76 184,77 178,80 C172,84 168,90 164,98 L160,100 C166,92 172,86 180,84 C188,82 194,83 199,84 Z', { fill: '#B9505C', opacity: 0.85 }) +
        path('M196,82 C190,80 182,81 177,85 C181,86 189,86 196,84 Z', { fill: '#E98080' }) + ell(194, 81, 5.6, 3.4, { fill: 'url(#{P}gLips)', stroke: '#9A3440', 'stroke-width': 0.7 }) + HR(182, 72, 22, 18));
      s += part('speiseroehre', tube('M190,82 C178,84 166,88 160,100 C158,150 162,210 174,262', 6.5, 'eso') + H('M158,100 C158,150 162,210 174,262', 12));
      s += part('leber', liver() + line('M150,292 C156,300 158,306 160,312', '#5A9A3A', 2.2, 1, { 'stroke-dasharray': '3 3' }));
      s += part('magen', stomach());
      s += part('dickdarm', colon(false));
      s += part('duenndarm', smallInt() + HR(122, 334, 58, 62));
      s += part('enddarm', tube(RECT_D, 11, 'col') + ell(152, 446, 3.4, 2.4, { fill: '#8A5530' }) + HR(144, 412, 20, 40));
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
      { id: 'blase', name: 'Blase', alt: ['Harnblase'], info: 'sammelt den Urin', mk: [[24, 420, 141, 412]], find: true },
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
      { id: 'magen', name: 'Magen', info: 'kneten + Magensäure → Brei', mk: [[272, 284, 204, 290]], find: true },
      { id: 'leber', name: 'Leber', info: 'liegt daneben, hilft mit Gallensaft – das Essen geht nicht hindurch', mk: [[24, 280, 98, 288]], find: true },
      { id: 'duenndarm', name: 'Dünndarm', alt: ['Duenndarm'], info: 'Nährstoffe gehen ins Blut', mk: [[24, 360, 132, 363]], find: true },
      { id: 'dickdarm', name: 'Dickdarm', info: 'Wasser und Mineralstoffe werden entzogen', mk: [[272, 350, 192, 350]], find: true },
      { id: 'enddarm', name: 'Enddarm und After', alt: ['Enddarm', 'After', 'Enddarm/After'], info: 'Reste werden ausgeschieden', mk: [[272, 436, 155, 432]], find: true }
    ],
    bananaPath: 'M195,81 C178,84 166,88 160,100 C158,150 162,210 174,264 C190,276 200,296 186,308 C176,316 166,316 160,312 C166,318 172,324 170,328 ' + SI_D.slice(SI_D.indexOf('C')) +
      ' L118,400 ' + COLON_D.slice(COLON_D.indexOf('C')) + ' C154,424 152,434 152,446',
    stations: [[0, 'mund'], [0.11, 'speiseroehre'], [0.2, 'magen'], [0.27, 'duenndarm'], [0.57, 'dickdarm'], [0.92, 'enddarm'], [1, 'enddarm']]
  };

  /* ======================= ATEMWEG ======================= */
  D.atemweg = {
    title: 'Der Weg der Luft', vb: [0, 0, 340, 372], kap: 'atmung', lz: '7.1',
    render: function () {
      var s = G.spot(150, 220, 170, 190);
      s += path('M104,140 C80,144 50,152 36,168 C30,176 28,190 28,210 L28,372 L252,372 L252,210 C252,190 250,176 244,168 C230,152 190,144 162,140 Z', { fill: 'url(#{P}gTorso)', opacity: 0.55 });
      s += path('M104,140 C80,144 50,152 36,168 C30,176 28,190 28,210 L28,372 M162,140 C190,144 230,152 244,168 C250,176 252,190 252,210 L252,372', { fill: 'none', stroke: C.skin, 'stroke-width': 1.2 });
      s += g(path('M80,70 C78,36 104,12 136,12 C168,12 188,32 190,52 C190,58 188,62 196,74 C200,80 196,84 190,84 C190,88 188,92 186,94 C188,100 186,106 180,108 C176,112 170,114 164,114 L162,140 L104,140 L106,116 C90,108 80,92 80,70 Z',
        { fill: 'url(#{P}gSkinR)', stroke: C.skin, 'stroke-width': 1.1, 'stroke-linejoin': 'round' }) +
        path('M80,70 C78,36 104,12 136,12 C160,12 178,24 186,40 C170,31 150,31 134,37 C116,44 104,58 98,76 C94,88 92,98 95,108 C86,99 80,86 80,70 Z', { fill: 'url(#{P}gHair)', stroke: '#3A2418', 'stroke-width': 0.9 }) +
        gloss(118, 24, 14, 4, -20, 0.4) + ell(112, 66, 5.4, 8, { fill: '#F1C3A6', stroke: C.skin, 'stroke-width': 0.9 }) +
        path('M168,44 C171,41.6 176,41.4 179,43.6', { fill: 'none', stroke: '#5A3A28', 'stroke-width': 1.4, 'stroke-linecap': 'round' }) + ell(174, 49, 1.8, 2.3, { fill: '#2A2230' }), { class: 'shw', filter: 'url(#{P}sh)' });
      s += '<g class="air-in"><path class="air" d="M232,64 L206,70"/><g class="airh">' + G.arrowHead(205, 70, 167, 7, '#4F7FD6') + '</g></g><g class="air-out"><path class="air air2" d="M204,78 L232,86"/><g class="airh">' + G.arrowHead(233, 86.3, 16, 7, '#8A94A6') + '</g></g>';
      var AF = { fill: 'url(#{P}gAir)', stroke: '#6F9CC6', 'stroke-width': 1, 'stroke-linejoin': 'round' };
      s += part('mundnase', path('M150,60 C160,56 180,58 190,68 C186,72 176,74 160,74 C152,74 148,68 150,60 Z', AF) + path('M152,88 C162,84 178,84 186,88 C180,94 166,96 156,95 Z', AF) +
        path('M146,64 C140,80 140,100 144,124 L152,124 C150,106 150,88 154,72 Z', AF) + line('M160,63 C168,61 176,62 182,66 M162,69 C170,68 176,69 182,71', '#8FB3D6', 0.9, 0.8));
      var th = '';
      th += organ('M130,174 C110,164 80,178 72,212 C64,248 62,292 70,322 C92,330 120,328 138,318 C142,282 142,222 130,174 Z', 'gLung', '#B5606A', { opacity: 0.88 });
      th += organ('M168,174 C188,164 218,178 226,212 C234,248 234,292 226,320 C206,326 186,324 172,316 C174,302 164,292 162,278 C162,242 162,208 168,174 Z', 'gLung', '#B5606A', { opacity: 0.88 });
      th += gloss(96, 206, 9, 20, 15, 0.5) + gloss(206, 206, 9, 20, -15, 0.5);
      var TL = 'M120,240 L104,262 L92,290 M104,262 L112,292 M92,290 L84,312 M92,290 L98,314 M112,292 L106,316 M112,292 L122,312 M120,240 L96,236 L82,250 M96,236 L86,220 M120,240 L126,272 L132,300',
        TR = 'M178,240 L196,262 L208,290 M196,262 L188,292 M208,290 L216,312 M208,290 L202,314 M188,292 L194,316 M188,292 L178,312 M178,240 L202,236 L216,250 M202,236 L212,220 M178,240 L172,272 L168,300';
      var alv = '';
      [[84, 312], [98, 314], [106, 316], [122, 312], [82, 250], [86, 220], [132, 300], [216, 312], [202, 314], [194, 316], [178, 312], [216, 250], [212, 220], [168, 300]].forEach(function (p) {
        alv += ell(p[0], p[1], 3.5, 3.5, { fill: 'url(#{P}gAlv)', stroke: '#B5606A', 'stroke-width': 0.6 }) + ell(p[0] + 4, p[1] + 3, 2.9, 2.9, { fill: 'url(#{P}gAlv)', stroke: '#B5606A', 'stroke-width': 0.6 }) +
          ell(p[0] - 3, p[1] + 4, 2.7, 2.7, { fill: 'url(#{P}gAlv)', stroke: '#B5606A', 'stroke-width': 0.6 });
      });
      th += part('kleinebronchien', tube(TL, 3, 'air') + tube(TR, 3, 'air') + H('M120,240 L104,262 L92,290 M178,240 L196,262 L208,290 M120,240 L126,272 M178,240 L172,272', 10));
      // Lupe: Lungenbläschen mit Haargefäßen
      var mag = line('M214,300 L250,290', '#4A5568', 1.2, 0.7, { 'stroke-dasharray': '3 3' }) +
        G.circ(290, 278, 42, { fill: 'url(#{P}gGlass)' }) +
        [[281, 254, 9.5], [297, 251, 8.6], [300, 266, 9], [283, 268, 8.6], [268, 261, 6.8]].map(function (c) { return G.circ(c[0], c[1], c[2], { fill: 'url(#{P}gAlv)', stroke: '#B5606A', 'stroke-width': 1.1 }) + gloss(c[0] - c[2] * 0.3, c[1] - c[2] * 0.35, c[2] * 0.35, c[2] * 0.22, -30, 0.7); }).join('') +
        tube('M254,292 C264,297 278,298 291,296', 3.4, 'ven') + tube('M291,296 C303,294 315,289 325,280', 3.4, 'art') +
        line('M284,277 L284,287', '#C0392B', 2.4) + G.arrowHead(284, 290.5, 90, 5.5, '#C0392B') + line('M299,294 L299,284', '#2F5DB8', 2.4) + G.arrowHead(299, 280.5, -90, 5.5, '#2F5DB8') +
        '<text class="gtx gtx-o" x="270" y="289" text-anchor="middle">O₂</text><text class="gtx gtx-c" x="300" y="310" text-anchor="middle">CO₂</text>' +
        G.circ(290, 278, 42, { fill: 'none', stroke: 'url(#{P}gMetal)', 'stroke-width': 4.4 }) + G.circ(290, 278, 39.6, { fill: 'none', stroke: '#FFFFFF', 'stroke-width': 0.8, opacity: 0.8 }) +
        path('M262,244 C270,236 282,233 292,234', { fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.8 }) +
        line('M319,309 L334,330', '#3E4756', 7.6) + line('M319,309 L334,330', '#7C889A', 4.6);
      th += part('lungenblaeschen', alv + '<g class="mag">' + mag + '</g>');
      th += part('hauptbronchien', tube('M149,212 L120,240 M149,212 L178,240', 6.2, 'air'));
      s += '<g class="thorax">' + part('lunge', th) + '</g>';
      var tr = path('M144,122 L154,122 L154,214 L144,214 Z', { fill: 'url(#{P}gTrach)', stroke: '#6F8FB5', 'stroke-width': 0.9 });
      for (var y = 128; y < 212; y += 6) tr += line('M144,' + y + ' C147,' + (y + 1.6) + ' 151,' + (y + 1.6) + ' 154,' + y, '#8FAACB', 1.4, 0.95);
      s += part('luftroehre', tr + gloss(147.6, 168, 1.4, 34, 0, 0.6));
      s += '<g class="dia">' + part('zwerchfell', path('M64,332 C96,314 130,310 149,314 C168,310 202,314 234,332 L234,338 C202,320 168,316 149,320 C130,316 96,320 64,338 Z', { fill: 'url(#{P}gDia)', stroke: '#8E4433', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }) +
        line('M70,333 C100,317 130,314 149,317 C168,314 198,317 228,333', '#F6C2B2', 0.9, 0.7) + H('M64,335 C96,317 130,313 149,317 C168,313 202,317 234,335', 14)) + '</g>';
      return s;
    },
    parts: [
      { id: 'mundnase', name: 'Mund und Nase', alt: ['Nase', 'Mund', 'Mund/Nase', 'Nase und Mund', 'Nasenhöhle'], info: '(1) hier kommt die Luft hinein', mk: [[232, 52, 178, 66], [232, 100, 176, 92]], find: true },
      { id: 'luftroehre', name: 'Luftröhre', alt: ['Luftroehre'], info: '(2) führt zur Brust', mk: [[266, 150, 154, 170]], find: true },
      { id: 'hauptbronchien', name: 'Hauptbronchien', alt: ['zwei Hauptbronchien', 'Hauptbronchie', 'Bronchien'], info: '(3) die zwei großen Äste', mk: [[266, 210, 166, 228], [266, 210, 132, 228]], find: true },
      { id: 'kleinebronchien', name: 'kleine Bronchien', alt: ['kleine Bronchien', 'Bronchiolen', 'Bronchien'], info: '(4) viele kleine Zweige', mk: [[24, 272, 98, 272]], find: true },
      { id: 'lungenblaeschen', name: 'Lungenbläschen', alt: ['Lungenblaeschen', 'Lungenbläschen'], info: '(5) hier findet der Gasaustausch statt', mk: [[300, 212, 292, 236]], find: true },
      { id: 'zwerchfell', name: 'Zwerchfell', info: 'Atemmuskel unter der Lunge', mk: [[266, 350, 200, 320]], find: true },
      { id: 'lunge', name: 'Lunge', alt: ['Lungenflügel'], info: 'zwei Lungenflügel', mk: [[24, 196, 80, 200]], find: false }
    ]
  };

  /* ======================= BLUTKREISLAUF ======================= */
  D.kreislauf = {
    title: 'Der Blutkreislauf', vb: [0, 0, 340, 430], kap: 'blut', lz: '6.3', hl: 'glow',
    render: function () {
      var s = G.spot(170, 215, 170, 210);
      var lungL = 'M162,30 C140,18 100,28 96,62 C94,88 106,106 128,108 C150,110 162,96 162,80 Z';
      var net = line('M106,60 C120,52 140,56 156,64 M104,80 C120,74 140,78 156,86 M110,96 C124,92 140,96 152,100', 'url(#{P}gCapRB)', 1.3, 0.7);
      var bub = ''; [[112, 50], [126, 44], [140, 52], [118, 66], [134, 70], [148, 66], [110, 84], [126, 90], [142, 88], [154, 78]].forEach(function (b) { bub += G.circ(b[0], b[1], 3.6, { fill: '#FFFFFF', opacity: 0.22 }); });
      var lungs = both(organ(lungL, 'gLung', '#B5606A') + bub + net + gloss(118, 46, 10, 6, -25, 0.6), 170);
      var la = 'M158,184 C150,152 130,142 128,112', lv = 'M212,112 C212,142 192,152 182,184', ar = 'M190,238 C214,262 236,292 232,330', ve = 'M108,330 C104,292 130,264 150,240';
      function vessel(id, d, pl, end, col) { return part(id, tube(d, 9, pl) + G.arrowHead(end[0], end[1], end[2], 10, col) + H(d, 16)); }
      s += part('lungenkreislauf', part('lunge', lungs) + vessel('lungenarterie', la, 'ven', [128.6, 104, -94], '#2B4DA6') + vessel('lungenvene', lv, 'art', [179.8, 191, 107], '#B91C2C'));
      s += part('herz', organ('M170,180 C156,168 132,178 136,198 C140,224 156,242 170,256 Z', 'gHeartB', '#1E3270') +
        organ('M170,180 C184,168 208,178 204,198 C200,224 184,242 170,256 Z', 'gHeart', '#7A1A1C') + line('M170,182 L170,252', '#FFFFFF', 2, 0.9) +
        gloss(150, 192, 7, 4.4, -30, 0.7) + gloss(190, 192, 7, 4.4, 30, 0.7));
      var tile = rect(88, 330, 164, 72, 16, { fill: 'url(#{P}gTile)', stroke: '#D9B49A', 'stroke-width': 1.3 }) +
        line('M110,356 C140,346 200,366 232,352 M110,372 C140,362 200,382 232,368 M118,346 C134,354 146,358 160,350 M180,384 C196,376 210,380 224,388', 'url(#{P}gCapRB)', 1.6, 0.85) +
        '<text class="dtx lbl" x="170" y="394" text-anchor="middle">Organe und Muskeln</text>';
      s += part('koerperkreislauf', part('koerper', tile) + vessel('arterie', ar, 'art', [231.6, 334, 96], '#B91C2C') + vessel('vene', ve, 'ven', [155.2, 233.8, -50], '#2B4DA6'));
      function dots(d, red, n, dur) {
        var o = '';
        for (var i = 0; i < n; i++) o += '<circle class="flow" r="3.4" fill="' + (red ? '#FF9AA5' : '#A9BDF2') + '"><animateMotion dur="' + dur + 's" begin="-' + (i * dur / n).toFixed(2) + 's" repeatCount="indefinite" path="' + d + '"/></circle>';
        return o;
      }
      s += '<g class="flows">' + dots(la, false, 3, 2.4) + dots(lv, true, 3, 2.4) + dots(ar, true, 4, 2.8) + dots(ve, false, 4, 2.8) + '</g>';
      s += '<g class="lbl"><text class="dtx halo" x="170" y="142" text-anchor="middle">Lungenkreislauf</text><text class="dtx halo" x="170" y="302" text-anchor="middle">Körperkreislauf</text></g>';
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
})(window.ATLAS = window.ATLAS || {});
