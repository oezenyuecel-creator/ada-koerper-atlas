/* Adas Körper-Atlas – Muskelfiguren (von vorne und von hinten), Muskeln mit Faserverlauf */
(function (A) {
  'use strict';
  var G = A.G, D = A.diagramme, C = G.C;
  var part = G.part, both = G.both, path = G.path, ell = G.ell, g = G.g, f = G.f, tube = G.tube, mus = G.muscle;

  var SK = { fill: 'url(#{P}gSkinH)', stroke: C.skin, 'stroke-width': 1, 'stroke-linejoin': 'round' };
  var SKT = { fill: 'url(#{P}gSkin)', stroke: C.skin, 'stroke-width': 1, 'stroke-linejoin': 'round' };
  var TEN = { fill: 'url(#{P}gTen)', stroke: C.ten, 'stroke-width': 0.7, 'stroke-linejoin': 'round' };
  function line(d, col, w, op) { return path(d, { fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: op == null ? 1 : op }); }
  function sh(x) { return function (d) { return d.replace(/(-?\d*\.?\d+),(-?\d*\.?\d+)/g, function (m, a, b) { return f(+a + x) + ',' + b; }); }; } // waagrecht verschieben
  function absSeg(y0, y1, xo, xi, xb) { // ein „Päckchen“ des geraden Bauchmuskels
    xb = xb == null ? xo : xb;
    return 'M' + f(xo + 1.6) + ',' + f(y0) + ' L' + f(xi) + ',' + f(y0) + ' L' + f(xi) + ',' + f(y1) + ' L' + f(xb + 1.6) + ',' + f(y1) +
      ' C' + f(xb - 0.4) + ',' + f(y1) + ' ' + f((xo + xb) / 2 - 1.2) + ',' + f((y0 + y1) / 2 + 3) + ' ' + f((xo + xb) / 2 - 1.2) + ',' + f((y0 + y1) / 2) +
      ' C' + f((xo + xb) / 2 - 1.2) + ',' + f((y0 + y1) / 2 - 3) + ' ' + f(xo - 0.4) + ',' + f(y0) + ' ' + f(xo + 1.6) + ',' + f(y0) + ' Z';
  }

  /* ---------- Körper (Haut) ---------- */
  function body(x0, back) {
    var X = sh(x0 - 110), s = '';
    var legL = X('M70,250 L110,252 C108,290 104,320 102,338 L78,338 C74,310 70,280 70,250 Z'), shinL = X('M78,336 L102,336 C102,370 100,400 98,424 L84,424 C80,400 78,370 78,336 Z');
    s += both(path(legL, SK) + path(shinL, SK) + ell(x0 - 20, 431, 13, 6, SK), x0);
    var armU = X('M64,102 C54,110 50,140 50,172 L64,174 C66,150 70,124 76,108 Z'), armF = X('M50,170 C46,200 44,226 44,244 L56,246 C58,226 62,200 64,172 Z');
    var armL = path(armF, SK) + path(armU, SK) + ell(x0 - 60, 256, 7, 11, SK);
    s += armL;
    if (back) s += G.mirror(armL, x0);
    else s += path('M150,96 C164,98 182,110 194,124 L184,140 C172,128 158,120 146,116 Z', SK) + path('M184,138 C182,112 184,92 186,78 L200,78 C200,94 200,118 196,134 Z', SK) + ell(193, 68, 9.5, 9.5, SK);
    s += path(X('M66,100 C74,90 92,88 100,88 L120,88 C128,88 146,90 154,100 C160,112 158,132 154,150 C150,175 148,200 148,214 L72,214 C72,200 70,175 66,150 C62,132 60,112 66,100 Z'), SKT);
    s += path(X('M100,70 L120,70 L122,92 L98,92 Z'), SK);
    s += both(ell(x0 - 22, 50, 4.2, 7.2, SK), x0) + ell(x0, 48, 22, 27, { fill: 'url(#{P}gSkinR)', stroke: C.skin, 'stroke-width': 1 });
    if (back) {
      s += path(X('M88,48 C86,22 134,22 132,48 C132,63 126,72 110,74 C94,72 88,63 88,48 Z'), { fill: 'url(#{P}gHair)', stroke: '#3A2418', 'stroke-width': 0.9 }) + G.gloss(x0 - 6, 30, 9, 4, -15, 0.4) +
        line(X('M100,40 C104,52 104,62 100,70 M110,38 C112,52 112,62 110,72 M120,40 C116,52 116,62 120,70'), '#3A2418', 0.8, 0.5);
    } else {
      s += path(X('M88,44 C86,24 100,18 110,18 C121,18 134,24 132,44 C130,36 124,31 117,30 C112,33 104,33 99,31 C93,33 89,38 88,44 Z'), { fill: 'url(#{P}gHair)', stroke: '#3A2418', 'stroke-width': 0.9 }) +
        G.gloss(x0 - 4, 23, 8, 2.6, -10, 0.45) +
        both(ell(x0 - 8, 49.5, 2.1, 2.5, { fill: '#2A2230' }) + G.circ(x0 - 7.3, 48.6, 0.75, { fill: '#FFFFFF' }), x0) +
        line(X('M105,65 Q110,68.5 115,65'), '#7A3B2E', 1.5);
      s += path(X('M72,212 L148,212 L152,250 L114,252 L110,240 L106,252 L68,250 Z'), { fill: 'url(#{P}gShort)', stroke: '#22397A', 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        path(X('M72,212 L148,212 L148.6,219 L71.4,219 Z'), { fill: '#2B4A8C' });
    }
    return g(s, { class: 'shw', filter: 'url(#{P}sh)' });
  }

  D.muskeln = {
    title: 'Muskeln von vorne und von hinten', vb: [0, 0, 440, 450], kap: 'muskeln', lz: '4.7',
    render: function () {
      var s = G.spot(110, 225, 105, 225) + G.spot(330, 225, 105, 225) + G.ground(110, 434, 46, 6) + G.ground(330, 434, 46, 6);
      s += body(110, false) + body(330, true);
      /* ----- Gesicht ----- */
      s += part('gesichtsmuskeln',
        '<g class="part-rest">' + mus('M91,43 C93,36 101,33 110,33 C119,33 127,36 129,43 C123,40.6 116.5,39.6 110,39.6 C103.5,39.6 97,40.6 91,43 Z', { ang: 90, gap: 1.6 }) +
        tube(G.ellPath(102, 49.5, 5.4, 4.6), 1.7, 'mus') + tube(G.ellPath(118, 49.5, 5.4, 4.6), 1.7, 'mus') + tube(G.ellPath(110, 65.6, 7, 3.9), 1.7, 'mus') + '</g>' +
        part('kaumuskel', both(mus('M88.6,53 C93,52 96.6,56.4 96.8,62 C97,67.6 94.6,72 91,72.6 C88.4,71 87.2,64 87.6,58.4 Z', { ang: 95, gap: 1.6 }), 110)));
      /* ----- Hals ----- */
      s += part('halsmuskeln', both(
        mus('M101,80 C96,86 88,90 76,94 C72,95.4 68,97 66,99.6 C72,98.6 80,98 88,97.6 C95,96 100,93 104,89 Z', { ang: 160, gap: 1.8 }) +
        mus('M95.6,68 C98.6,69.6 102,74.4 104.4,79.6 C106.6,84.6 108.2,88.8 109.2,92.6 L104.6,93.4 C102.2,88.4 99.4,83.4 96.8,79 C94.8,75.4 94.4,71 95.6,68 Z', { ang: 62, gap: 1.5 }), 110));
      /* ----- Brust, Bauch ----- */
      s += part('brustmuskel', both(mus('M108.6,95.6 C100,93.6 88,95 80.6,99 C74.6,102.4 70.6,108 70.2,114.6 C75.6,121.6 84,127.6 94,130 C100,131.4 105.4,130.8 108.6,128.6 Z', { focus: [70.6, 115], a0: -38, a1: 40, n: 16, len: 44 }), 110));
      var abs = mus('M70.6,128 C80,131 91,137 97.4,142.6 L97.4,205.4 C92,208 84,209 74.4,207.4 C73.4,190 71,168 68.6,150 C67.8,141 68.6,133 70.6,128 Z', { ang: 62, gap: 2.1 });
      [[131.5, 147, 98.8], [148.8, 164, 98.6], [165.8, 181.5, 98.6], [183.4, 207, 99.4, 102.6]].forEach(function (q) { abs += mus(absSeg(q[0], q[1], q[2], 109.3, q[3]), { ang: 90, gap: 1.7 }); });
      s += part('bauchmuskel', both(abs, 110) + path('M109.3,131 L110.7,131 L110.7,207 L109.3,207 Z', TEN));
      /* ----- Arme ----- */
      var ARM = [
        ['M57.4,137.4 C55.6,148 55,160 56.6,171 L65.6,171.6 C66.6,160 68.4,148 71.4,128 C65.6,128.6 61,131.6 57.4,137.4 Z', { spindle: [[64, 130], [61, 171]], hw: 5, n: 5 }],
        ['M50.6,175 C47.6,196 47.4,218 50.4,238 L59.6,238.6 C61.4,218 64,196 65.6,175.4 Z', { ang: 95, gap: 1.8 }],
        ['M50.6,175 C48,186 46.6,200 46.8,212 C49,202 52,188 56,176 Z', { ang: 100, gap: 1.6 }],
        ['M87.6,95.4 C80,92.4 68,94 62.4,102 C56.8,110 55.6,124 57.4,138 C61.4,132 66,126 70.2,119.6 C74.4,112 80.4,104.4 87.6,99.4 Z', { focus: [57.6, 138], a0: -120, a1: -48, n: 12, len: 50 }]
      ];
      function arm(dx) {
        var X = sh(dx);
        return ARM.map(function (m) {
          var o = G.ext(m[1]);
          if (o.spindle) o.spindle = o.spindle.map(function (p) { return [p[0] + dx, p[1]]; });
          if (o.focus) o.focus = [o.focus[0] + dx, o.focus[1]];
          return mus(X(m[0]), o);
        }).join('') + path(X('M50.4,236 L59.6,236.6 L58.6,245 L51.2,245 Z'), TEN);
      }
      var armF = arm(0), armB = arm(220);
      var flex = mus('M150,112 C160,115 172,118 184,124 L184,136 C174,128 160,121 147,117.6 Z', { ang: 20, gap: 1.8 }) +
        mus('M185.6,138 C183.6,114 184.6,94 186.6,80 L199.6,80 C199.8,96 199.8,118 196.4,134 Z', { ang: 90, gap: 1.9 }) + path('M186.6,80 L199.6,80 L199,76 L187.4,76 Z', TEN) +
        mus('M132.4,95.4 C140,92.6 150,93.6 156,98.4 C160.4,102 161,108.6 158.4,113.4 C154.4,110.6 148.8,107.4 143,104.6 C138.4,102.4 134.6,99.6 132.4,95.4 Z', { focus: [159, 113], a0: -170, a1: -110, n: 10, len: 40 });
      s += part('armmuskeln', '<g class="part-rest">' + armF + flex + both(armB, 330) + '</g>' +
        part('bizeps', mus('M150,108.4 C152,98.4 162,90.4 174,92 C184,93.6 191,103.6 192.4,116 C186.4,114.2 180.4,113.4 174.4,113.2 C166.4,113.2 158,112.4 150,110.4 Z', { spindle: [[151, 109], [191.6, 115]], hw: 11, n: 6 }) +
          path('M190.4,113.4 L194.4,116.6 L192.6,121 L188.6,117.6 Z', TEN)));
      /* ----- Beine ----- */
      var quad = mus('M72.6,262 C69.6,282 71.4,306 77.6,324 C80.4,330.4 84.6,332.4 88,330.6 C86,314 85,292 86,265 Z', { ang: 98, gap: 1.9 }) +
        mus('M86.4,258 C84.4,284 86,310 90,328 L98.6,328 C101.6,310 102.4,284 100.4,258 Z', { spindle: [[93.4, 258], [94.2, 328]], hw: 6, n: 5 }) +
        mus('M100.6,284 C104.6,298 106.2,314 102.6,330 C99,334.4 94.6,333.4 93,329.4 C97,313 99.4,298 100.6,284 Z', { ang: 70, gap: 1.8 }) +
        mus('M73.6,254 C80,270 90,292 99.6,318 L102.4,316 C93,290 83,268 77,252 Z', { ang: 62, gap: 1.4 });
      var knee = ell(93.4, 336, 5.6, 6.4, { fill: 'url(#{P}gBoneR)', stroke: C.bone, 'stroke-width': 0.8 }) + path('M90.4,341 L96.4,341 L95.6,348 L91.2,348 Z', TEN);
      var shin = mus('M85.6,344 C83.6,370 85.6,396 87.6,414 L93.6,414 C95.6,396 97.6,370 97.6,344 Z', { ang: 92, gap: 1.8 }) +
        mus('M80,344 C78.4,366 80,390 84,410 L86,410 C84.6,390 83.6,366 84.6,344 Z', { ang: 92, gap: 1.6 }) +
        mus('M97.6,346 C101.6,356 102,374 99,390 L96.6,356 Z', { ang: 85, gap: 1.6 });
      var hams = mus('M292.6,258 C290.6,284 293.6,310 300.6,330 L310.6,330 C309.6,306 308.6,282 309.6,258 Z', { ang: 96, gap: 1.9 }) +
        mus('M309.6,258 C309.6,282 310.6,306 312.6,330 L320.6,330 C324.6,310 325.6,284 322.6,258 Z', { ang: 86, gap: 1.9 }) + path('M300.6,330 L320.6,330 L318,338 L302.6,338 Z', TEN);
      var calf = mus('M299.6,344 C294,356 293.4,372 297.6,386 C300.6,392 304.6,394.6 307.6,393 C309,378 309,360 307.6,344 Z', { spindle: [[303.6, 344], [303, 393]], hw: 6, n: 5 }) +
        mus('M309.6,344 C315.6,350 319.4,364 318.6,380 C317.6,390 313.6,394.6 309.6,393 C311,378 311.4,360 309.6,344 Z', { spindle: [[312.6, 344], [312, 393]], hw: 5, n: 5 }) +
        path('M303.6,391 L315.4,391 L312.6,422 L306.6,422 Z', TEN);
      s += part('beinmuskeln', '<g class="part-rest">' + both(shin, 110) + both(hams, 330) + '</g>' + part('oberschenkelmuskel', both(quad, 110)) + part('wadenmuskel', both(calf, 330))) + both(knee, 110);
      /* ----- Rücken, Gesäß ----- */
      var lat = mus('M297.6,118 C305.6,128 315.6,140 321.6,154 C325.6,166 327.6,180 327.6,198 L311.6,202 C303.6,192 297.6,178 294.6,162 C291.6,148 292.6,132 297.6,118 Z', { ang: 55, gap: 2.1 }) +
        mus('M317.6,170 C320.6,168 326,168 328.4,170 L328.4,210 L316.4,210 C315.6,196 316,182 317.6,170 Z', { ang: 90, gap: 1.6 }) +
        mus('M302.6,106 C310.6,110.6 320,117 325.6,125 C322,135 312,141 302,139.4 C297.6,129 297.6,115 302.6,106 Z', { ang: 25, gap: 1.9 });
      s += part('rueckenmuskel', both(lat, 330) +
        mus('M330,72 C338,78 346,85 356,91 C364,95.6 372,97.6 377,101.6 C367,108 355,114 347,124 C341,138 335.6,158 330,180 C324.4,158 319,138 313,124 C305,114 293,108 283,101.6 C288,97.6 296,95.6 304,91 C314,85 322,78 330,72 Z', { ang: 0, gap: 2.1 }) +
        path('M329.2,76 L330.8,76 L330.8,178 L329.2,178 Z', TEN));
      s += part('gesaessmuskel', both(mus('M328.4,212 C316,209.6 300.4,213.6 294,225.6 C290,237.6 294,249.6 304,254.6 C312,258 322,257.4 328.4,254 Z', { ang: 40, gap: 2 }), 330));
      s += '<g class="lbl"><text x="110" y="446" class="dtx" text-anchor="middle">von vorne</text><text x="330" y="446" class="dtx" text-anchor="middle">von hinten</text></g>';
      return s;
    },
    parts: [
      { id: 'kaumuskel', name: 'Kaumuskel', info: 'Wange/Kiefer – zum Kauen', mk: [[30, 40, 92, 61]], find: true },
      { id: 'brustmuskel', name: 'Brustmuskel', info: 'vorne auf der Brust', mk: [[30, 110, 88, 112]], find: true },
      { id: 'bauchmuskel', name: 'Bauchmuskel', alt: ['Bauchmuskeln'], info: 'aufrecht sitzen, Oberkörper beugen', mk: [[30, 162, 101, 162]], find: true },
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
  // Malauftrag aus dem Heft: Muskelgruppen leuchtend einfärben (Licht und Fasern bleiben sichtbar)
  D.muskeln.malauftrag = { gesichtsmuskeln: 'yellow', halsmuskeln: 'violet', armmuskeln: 'green', brustmuskel: 'green', bauchmuskel: 'blue', beinmuskeln: 'red', rueckenmuskel: 'stone', gesaessmuskel: 'stone' };
})(window.ATLAS = window.ATLAS || {});
