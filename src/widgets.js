/* Adas Körper-Atlas – interaktive Lern-Bausteine */
(function (A) {
  'use strict';
  var W = A.widgets = {};
  function esc(s) { return A.ui.esc(s); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function frame(host, title, inner, cap) {
    host.innerHTML = '<figure class="fig widget"><div class="wtitle">' + title + '</div>' + inner + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>';
    return host.firstChild;
  }

  /* ---------- Wirbelsäule: Hüpfen ---------- */
  W.huepfen = function (host, cap) {
    var f = frame(host, '🦘 Die Wirbelsäule federt', '<div class="wrow"><div class="wsvg narrow">' + A.ui.svgString('wirbelsaeule', { cls: 'springy' }) + '</div>' +
      '<div class="wside"><button class="btn primary" data-a="jump">Hüpfen!</button><p class="wtext">Die <b>doppelte S-Form</b> federt wie eine Sprungfeder. Die <b>Bandscheiben</b> (rot) sind wie kleine Kissen zwischen den Wirbeln.</p></div></div>', cap);
    var svg = $('svg', f), t = null;
    $('[data-a=jump]', f).addEventListener('click', function () {
      svg.classList.remove('jump'); void svg.getBoundingClientRect(); svg.classList.add('jump');
      clearTimeout(t); t = setTimeout(function () { svg.classList.remove('jump'); }, 900);
    });
  };

  /* ---------- Wirbelzahlen ---------- */
  W.wirbelzahlen = function (host, cap) {
    var seg = [['Hals', 7, '#E9A23B', '7 Halswirbel – beweglich, tragen den Kopf (1. Atlas, 2. Axis)'], ['Brust', 12, '#C9772F', '12 Brustwirbel – an ihnen hängen die 12 Rippenpaare'],
      ['Lende', 5, '#A65A26', '5 Lendenwirbel – die dicksten, sie tragen viel Gewicht'], ['Kreuzbein', 5, '#8C7B6B', 'Kreuzbein – 5 Wirbel sind zu einem Knochen verwachsen'], ['Steißbein', 4, '#B8AA9A', 'Steißbein – 4–5 verkümmerte Wirbel (meist 4)']];
    var f = frame(host, '🔢 Wirbel zählen', '<div class="wz"><div class="wz-br top"><span style="flex:24">24 bewegliche Wirbel (7 + 12 + 5)</span><span style="flex:9"></span></div>' +
      '<div class="wz-bar">' + seg.map(function (s, i) { return '<button class="wz-s" data-i="' + i + '" style="flex:' + s[1] + ';background:' + s[2] + '"><b>' + s[1] + '</b><small>' + s[0] + '</small></button>'; }).join('') + '</div>' +
      '<div class="wz-br bottom"><span style="flex:33">insgesamt meist 33 (mit 5 Steißbeinwirbeln: 34)</span></div><p class="wtext wz-info">Tippe auf einen Abschnitt.</p></div>', cap);
    f.addEventListener('click', function (e) {
      var b = e.target.closest('.wz-s'); if (!b) return;
      $$('.wz-s', f).forEach(function (x) { x.classList.toggle('on', x === b); });
      $('.wz-info', f).textContent = seg[+b.getAttribute('data-i')][3];
    });
  };

  /* ---------- Gelenkarten ---------- */
  W.gelenkarten = function (host, cap) {
    var f = frame(host, '⚙️ Kugelgelenk und Scharniergelenk', '<div class="wsvg">' + A.ui.svgString('gelenkarten', {}) + '</div><div class="wcols"><div><b>Kugelgelenk</b><br>Bewegung in alle Richtungen (z. B. Schulter, Hüfte)</div><div><b>Scharniergelenk</b><br>nur vor und zurück – beugen und strecken (z. B. Ellenbogen, Knie, Finger)</div></div>' +
      '<div class="center"><button class="btn primary" data-a="move" aria-pressed="false">▶ Bewegen lassen</button></div>', cap);
    var svg = $('svg', f), b = $('[data-a=move]', f);
    b.addEventListener('click', function () { var on = !svg.classList.contains('moving'); svg.classList.toggle('moving', on); b.setAttribute('aria-pressed', on); b.textContent = on ? '⏸ Anhalten' : '▶ Bewegen lassen'; });
  };

  /* ---------- Arm: Bizeps und Trizeps ---------- */
  W.arm = function (host, cap) {
    var f = frame(host, '💪 Muskeln bewegen den Arm', '<div class="wsvg"><svg class="dg armsvg" viewBox="0 0 360 312" role="img" aria-label="Arm mit Bizeps und Trizeps"><defs>' + A.G.defs().replace(/\{P\}/g, 'arm-') + '</defs><g class="armg"></g></svg></div>' +
      '<label class="slider"><span>gestreckt</span><input type="range" min="0" max="100" value="10" aria-label="Arm beugen"><span>gebeugt</span></label>' +
      '<div class="wcols armread"><div class="bz"></div><div class="tz"></div></div><div class="center"><button class="btn" data-a="bend">Beugen</button> <button class="btn" data-a="str">Strecken</button></div>', cap);
    var grp = $('.armg', f), rng = $('input', f), bz = $('.bz', f), tz = $('.tz', f), G = A.G;
    var S = [84, 46], Eb = [94, 166], L0 = null, L20 = null;
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; } function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; } function mul(a, k) { return [a[0] * k, a[1] * k]; }
    function len(a) { return Math.hypot(a[0], a[1]); } function unit(a) { var l = len(a) || 1; return [a[0] / l, a[1] / l]; } function p(a) { return a[0].toFixed(1) + ',' + a[1].toFixed(1); }
    function spindle(o, i, th, back) {
      var u = unit(sub(i, o)), n = [-u[1], u[0]], a = add(o, mul(u, 12)), b = sub(i, mul(u, 9)), m = mul(add(a, b), 0.5);
      var d = 'M' + p(a) + ' Q' + p(add(m, mul(n, th * 1.35))) + ' ' + p(b) + ' Q' + p(sub(m, mul(n, th * 1.35))) + ' ' + p(a) + ' Z';
      return G.tube('M' + p(o) + ' L' + p(a) + ' M' + p(b) + ' L' + p(i), 3.2, 'ten') +
        '<g opacity="' + (back ? 0.85 : 1) + '">' + G.muscle(d, { spindle: [a, b], hw: th * 0.9, n: 6 }) +
        G.gloss(m[0] - n[0] * th * 0.5, m[1] - n[1] * th * 0.5, th * 0.5, th * 0.22, Math.atan2(u[1], u[0]) * 180 / Math.PI, 0.55) + '</g>';
    }
    function draw(v) {
      var al = (8 + 1.3 * v) * Math.PI / 180, dir = [Math.sin(al), Math.cos(al)], pf = [Math.cos(al), -Math.sin(al)];
      var W1 = add(Eb, mul(dir, 116)), hand = add(Eb, mul(dir, 130));
      var oB = [100, 62], iB = add(add(Eb, mul(dir, 24)), mul(pf, 6));
      var oT = [70, 62], iT = add(add(Eb, mul(pf, -8)), mul(dir, -6));
      var LB = len(sub(iB, oB)), LT = len(sub(iT, oT));
      if (L0 == null) { L0 = LB; L20 = LT; }
      var thB = Math.max(7, Math.min(26, 10 * Math.pow(L0 / LB, 1.6))), thT = Math.max(4, Math.min(16, 9 * Math.pow(L20 / LT, 1.6)));
      var s = G.ground(150, 302, 120, 6) +
        G.tube('M' + p(S) + ' L' + p(Eb), 10.5) + G.tube('M' + p(Eb) + ' L' + p(W1), 8.5) +
        G.circ(S[0], S[1], 10.5, { fill: 'url(#{P}gBoneR)', stroke: G.C.bone, 'stroke-width': 1 }) + G.gloss(S[0] - 3, S[1] - 3.5, 4, 2.6, -30, 0.85) +
        G.circ(Eb[0], Eb[1], 8, { fill: 'url(#{P}gBoneR)', stroke: G.C.bone, 'stroke-width': 1 }) +
        G.circ(hand[0], hand[1], 13.5, { fill: 'url(#{P}gSkinR)', stroke: G.C.skin, 'stroke-width': 1.2 }) +
        spindle(oT, iT, thT, true) + spindle(oB, iB, thB, false);
      var mB = mul(add(oB, iB), 0.5), mT = mul(add(oT, iT), 0.5);
      s += '<text class="dtx halo" x="' + (mB[0] + 24).toFixed(0) + '" y="' + (mB[1] + 4).toFixed(0) + '">Bizeps</text><text class="dtx halo" x="' + (mT[0] - 64).toFixed(0) + '" y="' + (mT[1] + 4).toFixed(0) + '">Trizeps</text>' +
        '<text class="dtx small halo" x="' + (Eb[0] - 76) + '" y="' + (Eb[1] + 28) + '">Ellenbogen</text><text class="dtx small" x="12" y="306">Sehnen = helle Enden</text>';
      grp.innerHTML = s.replace(/\{P\}/g, 'arm-');
      bz.innerHTML = '<b>Bizeps (Armbeuger)</b><br>' + (v > 20 ? 'zieht sich zusammen: <b>kürzer und dicker</b> ✓' : 'entspannt: lang und flach');
      tz.innerHTML = '<b>Trizeps (Gegenspieler)</b><br>' + (v > 20 ? 'wird gedehnt: <b>länger und dünner</b>' : 'zieht sich zusammen und streckt den Arm');
    }
    rng.addEventListener('input', function () { draw(+rng.value); });
    function anim(to) { var from = +rng.value, t0 = null; function step(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 700), v = from + (to - from) * (0.5 - Math.cos(k * Math.PI) / 2); rng.value = v; draw(v); if (k < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }
    $('[data-a=bend]', f).addEventListener('click', function () { anim(100); });
    $('[data-a=str]', f).addEventListener('click', function () { anim(0); });
    draw(10);
  };

  /* ---------- Malauftrag Muskeln ---------- */
  W.muskelfarben = function (host, cap) {
    var f = frame(host, '🎨 Malauftrag aus dem Heft', '<div class="wsvg">' + A.ui.svgString('muskeln', { cls: 'malauftrag' }) + '</div><div class="legendchips"><span style="--c:#F2CC3C">Gesichtsmuskeln: gelb</span><span style="--c:#9B6CD1">Halsmuskeln: lila</span><span style="--c:#4CAF63">Arm- und Brustmuskeln: grün</span><span style="--c:#3F86D8">Bauchmuskeln: blau</span><span style="--c:#D94A43">Beinmuskeln: rot</span><span style="--c:#BDB6AE">Rücken/Gesäß: nicht im Auftrag</span></div>', cap);
    var svg = $('svg', f), pfx = svg.getAttribute('data-pfx'), M = A.diagramme.muskeln.malauftrag;
    Object.keys(M).forEach(function (pid) { $$('[data-part="' + pid + '"]', svg).forEach(function (e) { e.setAttribute('filter', 'url(#' + pfx + 't-' + M[pid] + ')'); }); });
  };

  /* ---------- Atmen ---------- */
  W.atmen = function (host, cap) {
    var f = frame(host, '🌬️ Einatmen und Ausatmen', '<div class="wrow"><div class="wsvg">' + A.ui.svgString('atemweg', { cls: 'breath' }) + '</div><div class="wside"><div class="seg"><button class="segb" data-m="in" aria-pressed="false">Einatmen</button><button class="segb" data-m="out" aria-pressed="false">Ausatmen</button></div>' +
      '<button class="btn" data-a="auto" aria-pressed="false">▶ Automatisch</button><p class="wtext breathtext">Tippe auf „Einatmen“.</p></div></div>', cap);
    var svg = $('svg', f), txt = $('.breathtext', f), timer = null;
    var T = {
      in: '<b>Einatmen:</b> Das <b>Zwerchfell</b> zieht sich zusammen und wird flacher, der <b>Brustkorb hebt sich</b>, die <b>Lunge dehnt sich aus</b> – frische Luft mit Sauerstoff strömt hinein.',
      out: '<b>Ausatmen:</b> Die Muskeln <b>entspannen</b> sich, der <b>Brustkorb sinkt</b>, die Lunge wird kleiner – die verbrauchte Luft mit Kohlendioxid strömt über Luftröhre, Mund und Nase hinaus.'
    };
    function set(m) {
      svg.classList.toggle('insp', m === 'in'); svg.classList.toggle('exsp', m === 'out');
      $$('.segb', f).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-m') === m); });
      txt.innerHTML = T[m];
    }
    $('.seg', f).addEventListener('click', function (e) { var b = e.target.closest('.segb'); if (!b) return; stop(); set(b.getAttribute('data-m')); });
    function stop() { clearInterval(timer); timer = null; var a = $('[data-a=auto]', f); a.setAttribute('aria-pressed', 'false'); a.textContent = '▶ Automatisch'; }
    $('[data-a=auto]', f).addEventListener('click', function () {
      if (timer) return stop();
      var m = 'in'; set(m); this.setAttribute('aria-pressed', 'true'); this.textContent = '⏸ Anhalten';
      timer = setInterval(function () { if (!document.body.contains(svg)) return stop(); m = m === 'in' ? 'out' : 'in'; set(m); }, 2600);
    });
  };

  /* ---------- Banane: Weg der Nahrung ---------- */
  W.banane = function (host, cap) {
    var d = A.diagramme.verdauung;
    var f = frame(host, '🍌 Die Reise der Banane', '<div class="wrow"><div class="wsvg">' + A.ui.svgString('verdauung', { quiz: false }) + '</div><div class="wside"><ol class="bsteps"></ol>' +
      '<div class="btnrow"><button class="btn" data-a="prev">← Zurück</button><button class="btn primary" data-a="next">Weiter →</button></div></div></div>', cap);
    var svg = $('svg', f);
    var st = [
      ['mund', '👄 Mund', 'Die Banane wird <b>zerkaut</b> und mit <b>Speichel</b> vermischt. Hier beginnt die Verdauung.', [195, 81]],
      ['speiseroehre', '⬇️ Speiseröhre', 'Der Bissen rutscht durch die <b>Speiseröhre</b> in den Magen.', [163, 180]],
      ['magen', '🍽️ Magen', 'Der Magen <b>knetet</b> die Banane mit <b>Magensäure</b> zu einem <b>Brei</b>.', [196, 288]],
      ['leber', '🟤 An der Leber vorbei', 'Der Brei wandert <b>an der Leber vorbei – nicht hindurch!</b> Die Leber hilft mit Gallensaft.', [158, 306]],
      ['duenndarm', '〰️ Dünndarm', 'Im <b>Dünndarm</b> wird weiter zerlegt. Die <b>Nährstoffe gehen ins Blut</b>.', [150, 362]],
      ['dickdarm', '🌀 Dickdarm', 'Im <b>Dickdarm</b> werden dem Brei <b>Wasser und Mineralstoffe entzogen</b>.', [150, 322]],
      ['enddarm', '🚽 Enddarm und After', 'Was übrig bleibt, wird <b>ausgeschieden</b>.', [152, 446]]
    ];
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d.bananaPath); path.setAttribute('class', 'bpath');
    $('.dgc', svg).appendChild(path);
    var ban = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    ban.setAttribute('class', 'banana'); ban.innerHTML = '<circle r="10" class="ban-c"/><path d="M-8.4,-3.6 C-5.6,5.6 5.8,6.8 9.4,-4.2 C9.8,-5.4 8.6,-6 8,-5 C4.6,1 -2.8,1.6 -6.6,-4.4 C-7.2,-5.4 -8.8,-4.8 -8.4,-3.6 Z" fill="#FFD84A" stroke="#B88A00" stroke-width=".9"/><path d="M8.2,-5 L9.8,-7.6" stroke="#6B4A1E" stroke-width="1.6" stroke-linecap="round"/><path d="M-5.4,-1.6 C-2.4,2.6 3,3 6.2,-1.2" fill="none" stroke="#FFF3B0" stroke-width="1.1" stroke-linecap="round"/>';
    svg.appendChild(ban);
    var L = path.getTotalLength(), N = 260, samples = [];
    for (var i = 0; i <= N; i++) { var pt = path.getPointAtLength(L * i / N); samples.push([pt.x, pt.y, L * i / N]); }
    var pos = st.map(function (s, k) {
      var best = 0, bd = 1e9, from = k ? 0 : 0;
      samples.forEach(function (sm) { var dd = Math.hypot(sm[0] - s[3][0], sm[1] - s[3][1]); if (dd < bd) { bd = dd; best = sm[2]; } });
      return best;
    });
    pos[0] = 0; pos[pos.length - 1] = L;
    for (i = 1; i < pos.length; i++) if (pos[i] < pos[i - 1]) pos[i] = pos[i - 1];
    var cur = 0, curL = 0, raf = null;
    function place(l) { var pt = path.getPointAtLength(l); ban.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ',' + pt.y.toFixed(1) + ')'); }
    function list() {
      $('.bsteps', f).innerHTML = st.map(function (s, k) { return '<li class="' + (k === cur ? 'on' : (k < cur ? 'done' : '')) + '"><b>' + s[1] + '</b>' + (k === cur ? '<p>' + s[2] + '</p>' : '') + '</li>'; }).join('');
      A.ui.highlight(svg, 'verdauung', st[cur][0], { dim: false });
    }
    function go(k) {
      k = Math.max(0, Math.min(st.length - 1, k)); var from = curL, to = pos[k], t0 = null; cur = k; list();
      cancelAnimationFrame(raf);
      function step(ts) { if (!t0) t0 = ts; var q = Math.min(1, (ts - t0) / 900); curL = from + (to - from) * (0.5 - Math.cos(q * Math.PI) / 2); place(curL); if (q < 1) raf = requestAnimationFrame(step); }
      raf = requestAnimationFrame(step);
    }
    $('[data-a=next]', f).addEventListener('click', function () { go(cur + 1 >= st.length ? 0 : cur + 1); });
    $('[data-a=prev]', f).addEventListener('click', function () { go(cur - 1); });
    place(0); list();
  };

  /* ---------- Magenversuch ---------- */
  W.magenversuch = function (host, cap) {
    var items = [['🛍️', 'Plastiktüte', 'steht für den <b>Magen</b>'], ['🍪', 'Keks', 'steht für die <b>Nahrung</b> (das Essen)'], ['💧', 'Wasser', 'spielt den <b>Magensaft / die Magensäure</b> – nur als Modell!'], ['👐', 'Kneten', 'steht für die <b>Magenmuskeln</b>, die den Brei durchkneten']];
    var f = frame(host, '🧪 Der Magenversuch', '<p class="wtext">Tippe auf eine Karte: Wofür steht der Gegenstand?</p><div class="flipcards">' + items.map(function (it, i) {
      return '<button class="fcard" data-i="' + i + '"><span class="fc-front"><span class="big">' + it[0] + '</span><b>' + it[1] + '</b></span><span class="fc-back">' + it[2] + '</span></button>';
    }).join('') + '</div>', cap);
    f.addEventListener('click', function (e) { var b = e.target.closest('.fcard'); if (b) b.classList.toggle('turned'); });
  };

  /* ---------- Gänsehaut & Schwitzen ---------- */
  W.gaensehaut = function (host, cap) {
    var f = frame(host, '🥶🥵 Gänsehaut und Schwitzen', '<div class="wsvg">' + A.ui.svgString('haut', { cls: 'skinanim' }) + '</div><div class="center btnrow"><button class="btn" data-a="goose" aria-pressed="false">🥶 Gänsehaut</button><button class="btn" data-a="sweat" aria-pressed="false">🥵 Schwitzen</button></div><p class="wtext center gtext">Probier beide Knöpfe aus.</p>', cap);
    var svg = $('svg', f), t = $('.gtext', f);
    $('[data-a=goose]', f).addEventListener('click', function () { var on = !svg.classList.contains('goose'); svg.classList.toggle('goose', on); this.setAttribute('aria-pressed', on); t.innerHTML = on ? 'Kälte! Die kleinen <b>Haarmuskeln</b> ziehen sich zusammen – die <b>Haare stellen sich auf</b>. Das ist Gänsehaut.' : 'Die Haarmuskeln sind wieder entspannt.'; });
    $('[data-a=sweat]', f).addEventListener('click', function () { var on = !svg.classList.contains('sweaty'); svg.classList.toggle('sweaty', on); this.setAttribute('aria-pressed', on); t.innerHTML = on ? 'Hitze oder Anstrengung! Die <b>Schweißdrüse</b> gibt Schweiß ab. Er <b>verdunstet</b> auf der Haut und <b>kühlt</b> den Körper.' : 'Kein Schweiß mehr nötig.'; });
  };

  /* ---------- Zwei-Stifte-Versuch ---------- */
  W.zweistifte = function (host, cap) {
    var spots = [['☝️', 'Fingerspitze', 3, 'zwei Stifte – ganz deutlich', 'An der'], ['😊', 'Wange', 2, 'oft zwei Stifte', 'An der'], ['✋', 'Handfläche', 2, 'manchmal zwei, manchmal nur einer', 'An der'],
      ['🙂', 'Stirn', 1, 'meist nur einer', 'An der'], ['🦶', 'Fußsohle', 1, 'meist nur einer', 'An der'], ['💪', 'Oberarm', 1, 'meist nur einer', 'Am'], ['🤚', 'Unterarm', 1, 'meist nur einer', 'Am'], ['🔙', 'Rücken', 0, 'fast immer nur einer', 'Am']];
    var f = frame(host, '✏️✏️ Zwei-Stifte-Versuch', '<p class="wtext">Der Partner berührt dich mit <b>zwei Stiften</b>, die etwa <b>1 cm</b> auseinander sind. Wähle eine Körperstelle, schreib deine <b>Vermutung</b> – dann schau, was meistens passiert.</p>' +
      '<div class="spots">' + spots.map(function (s, i) { return '<button class="spot" data-i="' + i + '">' + s[0] + '<b>' + s[1] + '</b></button>'; }).join('') + '</div><div class="spotres"></div>', cap);
    f.addEventListener('click', function (e) {
      var b = e.target.closest('.spot');
      if (b) {
        $$('.spot', f).forEach(function (x) { x.classList.toggle('on', x === b); });
        var s = spots[+b.getAttribute('data-i')];
        $('.spotres', f).innerHTML = '<p><b>' + s[1] + ':</b> Was spürst du? <button class="btn small" data-g="1">einen Stift</button> <button class="btn small" data-g="2">zwei Stifte</button></p><div class="reveal" data-i="' + b.getAttribute('data-i') + '"></div>';
        return;
      }
      var g = e.target.closest('[data-g]');
      if (g) {
        var rv = $('.reveal', f), s2 = spots[+rv.getAttribute('data-i')], two = s2[2] >= 2;
        var dens = ['ganz wenige', 'wenige', 'ziemlich viele', 'sehr viele'][s2[2]];
        rv.innerHTML = '<div class="box ' + ((g.getAttribute('data-g') === '2') === two ? 'merk' : 'achtung') + '"><b>Meistens: ' + s2[3] + '.</b> ' + s2[4] + ' ' + s2[1] + ' liegen <b>' + dens + '</b> Sinneskörperchen. ' +
          ((g.getAttribute('data-g') === '2') === two ? 'Deine Vermutung passt! 🎯' : 'Das hättest du anders vermutet – genau dafür macht man den Versuch.') + '<div class="dens">' + new Array(1 + [2, 5, 10, 18][s2[2]]).join('<i></i>') + '</div></div>';
      }
    });
  };

  /* ---------- Sonnenfit ---------- */
  W.sonnenfit = function (host, cap) {
    var items = [['creme', '🧴', 'Sonnencreme (hoher LSF)'], ['shirt', '👕', 'lange Kleidung'], ['hut', '🧢', 'Kopfbedeckung'], ['brille', '🕶️', 'Sonnenbrille'], ['schatten', '🌳', 'Schatten'], ['mittag', '🕛', 'Mittagssonne meiden']];
    var G = A.G, P = function (x) { return x.replace(/\{P\}/g, 'sun-'); };
    var SK = { fill: 'url(#{P}gSkinH)', stroke: G.C.skin, 'stroke-width': 1, 'stroke-linejoin': 'round' };
    var BLUE = { fill: '#4F8FD8', stroke: '#2F67AD', 'stroke-width': 1, 'stroke-linejoin': 'round' };
    var rays = '', ra;
    for (ra = 0; ra < 360; ra += 45) { var rr = ra * Math.PI / 180; rays += 'M' + (190 + Math.cos(rr) * 20).toFixed(1) + ',' + (30 + Math.sin(rr) * 20).toFixed(1) + ' L' + (190 + Math.cos(rr) * 27).toFixed(1) + ',' + (30 + Math.sin(rr) * 27).toFixed(1) + ' '; }
    function limb(P4, w0, w1, o) { return G.path(G.limb(P4, w0, w1, 0).d, o); }
    var armL = limb([[100, 122], [97, 136], [93, 150], [90, 164]], 10, 8, SK) + G.circ(89.5, 167, 5.4, SK);
    var legL = G.rect(104.5, 180, 11.5, 38, 5.5, SK) + G.path('M101,214 L116,214 C117,219 115,222 111,222 L99,222 C96,222 96,217 101,214 Z', { fill: 'url(#{P}gShoe)', stroke: '#B8401C', 'stroke-width': 0.9 });
    var kid = '<svg class="dg sunkid" viewBox="0 0 220 230" role="img" aria-label="Kind in der Sonne"><defs>' + P(G.defs()) + '</defs>' + P(
      G.ground(118, 222, 60, 5) +
      '<g class="sk-sun">' + G.circ(190, 30, 30, { fill: 'url(#{P}gSunGlow)' }) + G.path(rays, { stroke: '#FFB703', 'stroke-width': 3.4, 'stroke-linecap': 'round' }) + G.circ(190, 30, 15, { fill: 'url(#{P}gSun)' }) + G.gloss(185, 25, 5, 3, -30, 0.7) + '</g>' +
      '<g class="it it-schatten">' + G.ell(58, 222, 52, 6, { fill: '#2F6B3A', opacity: 0.22 }) + G.rect(53, 92, 11, 130, 4, { fill: '#8B5E3C', stroke: '#5E3B22', 'stroke-width': 1 }) +
        G.circ(36, 82, 24, { fill: '#4E9F5D' }) + G.circ(80, 76, 26, { fill: '#5DB16B' }) + G.circ(58, 54, 27, { fill: '#6CC27A' }) + G.gloss(50, 42, 11, 5, -20, 0.5) + '</g>' +
      '<g class="kidb">' + G.both(legL, 118) + G.both(armL, 118) +
        G.path('M100,120 C106,115.5 130,115.5 136,120 L138,170 L98,170 Z', { fill: 'url(#{P}gVitD)', stroke: '#D9A400', 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        G.path('M97,166 L139,166 L140,186 L120.5,186 L118,177 L115.5,186 L96,186 Z', { fill: 'url(#{P}gShort)', stroke: '#22397A', 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
        '<g class="it it-shirt">' + G.path('M97,118 C105,112.5 131,112.5 139,118 L141,172 L95,172 Z', BLUE) + limb([[99, 120], [96, 135], [92, 149], [89, 161]], 12.5, 10.5, BLUE) + limb([[137, 120], [140, 135], [144, 149], [147, 161]], 12.5, 10.5, BLUE) +
          G.rect(103.5, 182, 13.5, 30, 5, BLUE) + G.rect(119, 182, 13.5, 30, 5, BLUE) + G.path('M96,166 L140,166 L141,186 L95,186 Z', BLUE) + '</g>' +
        G.rect(112, 106, 12, 13, 5, SK) + G.both(G.ell(95.5, 93, 3.6, 5, SK), 118) +
        G.circ(118, 92, 23, { fill: 'url(#{P}gSkinR)', stroke: G.C.skin, 'stroke-width': 1.1 }) +
        G.path('M95,90 C93,70 106,62 118,62 C132,62 143,70 141,90 C138,80 130,76 122,76 C116,80 106,80 100,78 C97,82 96,86 95,90 Z', { fill: 'url(#{P}gHair)', stroke: '#3A2418', 'stroke-width': 0.9 }) +
        G.both(G.ell(110.5, 94, 2.2, 2.7, { fill: '#2A2230' }) + G.circ(111.3, 93, 0.8, { fill: '#FFFFFF' }) + G.ell(104.5, 101, 4, 2.2, { fill: '#F49C94', opacity: 0.55 }), 118) +
        G.path('M110.5,103 Q118,109.5 125.5,103', { fill: 'none', stroke: '#7A3B2E', 'stroke-width': 1.8, 'stroke-linecap': 'round' }) +
        '<g class="it it-brille">' + G.rect(102.5, 88, 12.5, 9, 4, { fill: '#1F2633' }) + G.rect(121, 88, 12.5, 9, 4, { fill: '#1F2633' }) + G.path('M115,91.5 h6', { stroke: '#1F2633', 'stroke-width': 2 }) +
          G.path('M105,90.5 L109,90.5 M123.5,90.5 L127.5,90.5', { stroke: '#FFFFFF', 'stroke-width': 1.2, opacity: 0.6, 'stroke-linecap': 'round' }) + '</g>' +
        '<g class="it it-hut">' + G.ell(118, 73, 31, 6.5, { fill: '#E4572E', stroke: '#B23A18', 'stroke-width': 1 }) + G.path('M99,73 C99,55 137,55 137,73 Z', { fill: '#F06A3E', stroke: '#B23A18', 'stroke-width': 1 }) +
          G.path('M100,68 C110,65 126,65 136,68 L136.6,72 C126,69 110,69 99.4,72 Z', { fill: '#FFD34D' }) + G.gloss(112, 61, 8, 2.6, -10, 0.5) + '</g>' +
        '<g class="it it-creme">' + G.path('M104,99 l4,-3 M128,99 l4,-3 M92,142 l5,-3 M141,142 l5,-3 M108,200 l4,-3', { stroke: '#FFFFFF', 'stroke-width': 2.4, 'stroke-linecap': 'round' }) +
          G.rect(152, 150, 17, 27, 5, { fill: 'url(#{P}gVitD)', stroke: '#D98A00', 'stroke-width': 1 }) + G.rect(155.5, 143.5, 10, 7.5, 2, { fill: '#E85D04' }) + '<text x="160.5" y="168" font-size="8" text-anchor="middle" fill="#8A4A00" font-weight="800">50</text></g>' +
      '</g>' +
      '<g class="it it-mittag">' + G.circ(40, 192, 18, { fill: '#FFFFFF', stroke: '#8A94A6', 'stroke-width': 2 }) + G.path('M40,192 V180 M40,192 H48', { stroke: '#1E2433', 'stroke-width': 2.4, 'stroke-linecap': 'round' }) +
        G.path('M24,208 L56,176', { stroke: '#D94A43', 'stroke-width': 4, 'stroke-linecap': 'round' }) + '</g>') + '</svg>';
    var f = frame(host, '😎 Mach dich sonnenfit!', '<div class="wrow"><div class="wsvg narrow">' + kid + '</div><div class="wside"><div class="sunitems">' + items.map(function (it) {
      return '<button class="sunb" data-k="' + it[0] + '" aria-pressed="false">' + it[1] + ' ' + it[2] + '</button>';
    }).join('') + '</div><p class="wtext sunmsg">Tippe alles an, was dich schützt.</p></div></div>', cap);
    var svg = $('svg', f), on = {};
    f.addEventListener('click', function (e) {
      var b = e.target.closest('.sunb'); if (!b) return;
      var k = b.getAttribute('data-k'); on[k] = !on[k]; b.setAttribute('aria-pressed', on[k]);
      svg.classList.toggle('w-' + k, on[k]);
      var n = Object.keys(on).filter(function (x) { return on[x]; }).length;
      $('.sunmsg', f).innerHTML = n === items.length ? '<b>Super – du bist sonnenfit!</b> ☀️ So schützt du Haut und Augen vor zu viel UV-Strahlung.' : (n + ' von ' + items.length + ' Schutz-Tipps. Weiter so!');
    });
  };
})(window.ATLAS = window.ATLAS || {});
