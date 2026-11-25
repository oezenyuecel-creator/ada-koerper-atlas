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
    var f = frame(host, '💪 Muskeln bewegen den Arm', '<div class="wsvg"><svg class="dg armsvg" viewBox="0 0 360 250" role="img" aria-label="Arm mit Bizeps und Trizeps"></svg></div>' +
      '<label class="slider"><span>gestreckt</span><input type="range" min="0" max="100" value="10" aria-label="Arm beugen"><span>gebeugt</span></label>' +
      '<div class="wcols armread"><div class="bz"></div><div class="tz"></div></div><div class="center"><button class="btn" data-a="bend">Beugen</button> <button class="btn" data-a="str">Strecken</button></div>', cap);
    var svg = $('svg', f), rng = $('input', f), bz = $('.bz', f), tz = $('.tz', f);
    var S = [84, 46], Eb = [94, 166], L0 = null, L20 = null;
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; } function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; } function mul(a, k) { return [a[0] * k, a[1] * k]; }
    function len(a) { return Math.hypot(a[0], a[1]); } function unit(a) { var l = len(a) || 1; return [a[0] / l, a[1] / l]; } function p(a) { return a[0].toFixed(1) + ',' + a[1].toFixed(1); }
    function spindle(o, i, th, cls) {
      var u = unit(sub(i, o)), n = [-u[1], u[0]], a = add(o, mul(u, 12)), b = sub(i, mul(u, 9)), m = mul(add(a, b), 0.5);
      return '<path class="tendon" d="M' + p(o) + ' L' + p(a) + ' M' + p(b) + ' L' + p(i) + '"/><path class="' + cls + '" d="M' + p(a) + ' Q' + p(add(m, mul(n, th * 1.35))) + ' ' + p(b) + ' Q' + p(sub(m, mul(n, th * 1.35))) + ' ' + p(a) + ' Z"/>';
    }
    function draw(v) {
      var al = (8 + 1.3 * v) * Math.PI / 180, dir = [Math.sin(al), Math.cos(al)], pf = [Math.cos(al), -Math.sin(al)];
      var W1 = add(Eb, mul(dir, 116)), hand = add(Eb, mul(dir, 130));
      var oB = [100, 62], iB = add(add(Eb, mul(dir, 24)), mul(pf, 6));
      var oT = [70, 62], iT = add(add(Eb, mul(pf, -8)), mul(dir, -6));
      var LB = len(sub(iB, oB)), LT = len(sub(iT, oT));
      if (L0 == null) { L0 = LB; L20 = LT; }
      var thB = Math.max(7, Math.min(26, 10 * Math.pow(L0 / LB, 1.6))), thT = Math.max(4, Math.min(16, 9 * Math.pow(L20 / LT, 1.6)));
      var s = '<path class="bo" d="M' + p(S) + ' L' + p(Eb) + '" stroke-width="13"/><path class="bi" d="M' + p(S) + ' L' + p(Eb) + '" stroke-width="10.5"/>' +
        '<circle class="bf" cx="' + S[0] + '" cy="' + S[1] + '" r="10"/>' +
        '<path class="bo" d="M' + p(Eb) + ' L' + p(W1) + '" stroke-width="11"/><path class="bi" d="M' + p(Eb) + ' L' + p(W1) + '" stroke-width="8.5"/>' +
        '<circle class="bf" cx="' + Eb[0] + '" cy="' + Eb[1] + '" r="8"/><circle class="armhand" cx="' + hand[0].toFixed(1) + '" cy="' + hand[1].toFixed(1) + '" r="13"/>' +
        spindle(oT, iT, thT, 'tri') + spindle(oB, iB, thB, 'bic');
      var mB = mul(add(oB, iB), 0.5), mT = mul(add(oT, iT), 0.5);
      s += '<text class="dtx" x="' + (mB[0] + 24).toFixed(0) + '" y="' + (mB[1] + 4).toFixed(0) + '">Bizeps</text><text class="dtx" x="' + (mT[0] - 64).toFixed(0) + '" y="' + (mT[1] + 4).toFixed(0) + '">Trizeps</text>' +
        '<text class="dtx small" x="' + (Eb[0] - 76) + '" y="' + (Eb[1] + 28) + '">Ellenbogen</text><text class="dtx small" x="12" y="236">Sehnen = helle Enden</text>';
      svg.innerHTML = s;
      var rb = LB / L0, rt = LT / L20;
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
    frame(host, '🎨 Malauftrag aus dem Heft', '<div class="wsvg">' + A.ui.svgString('muskeln', { cls: 'malauftrag' }) + '</div><div class="legendchips"><span style="--c:#F2CC3C">Gesichtsmuskeln: gelb</span><span style="--c:#9B6CD1">Halsmuskeln: lila</span><span style="--c:#4CAF63">Arm- und Brustmuskeln: grün</span><span style="--c:#3F86D8">Bauchmuskeln: blau</span><span style="--c:#D94A43">Beinmuskeln: rot</span><span style="--c:#BDB6AE">Rücken/Gesäß: nicht im Auftrag</span></div>', cap);
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
    ban.setAttribute('class', 'banana'); ban.innerHTML = '<circle r="8" class="ban-c"/><text y="4" text-anchor="middle">🍌</text>';
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
    var kid = '<svg class="dg sunkid" viewBox="0 0 220 230" role="img" aria-label="Kind in der Sonne">' +
      '<g class="sk-sun"><circle cx="190" cy="30" r="16" fill="#FFC93C"/><path d="M190 4v-0M190 8v-6M212 30h6M164 30h-6M206 14l4-4M174 14l-4-4" stroke="#FFC93C" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="it it-schatten"><path d="M20 90 C20 40 90 30 100 86 Z" fill="#5FAF6B"/><rect x="56" y="80" width="8" height="140" fill="#8B5E3C"/><path d="M20 220 L140 220" stroke="#5FAF6B" stroke-width="6" opacity=".35"/></g>' +
      '<g class="kidb"><rect x="98" y="118" width="40" height="56" rx="12" class="kidskin2"/><g class="it it-shirt"><rect x="94" y="116" width="48" height="60" rx="12" fill="#4F8FD8"/><rect x="84" y="120" width="14" height="44" rx="7" fill="#4F8FD8"/><rect x="138" y="120" width="14" height="44" rx="7" fill="#4F8FD8"/></g>' +
      '<circle cx="118" cy="92" r="24" class="kidskin"/><circle cx="110" cy="92" r="2.4" fill="#2b2b2b"/><circle cx="126" cy="92" r="2.4" fill="#2b2b2b"/><path d="M110 103 Q118 109 126 103" stroke="#2b2b2b" stroke-width="2" fill="none"/>' +
      '<g class="it it-brille"><rect x="102" y="86" width="13" height="10" rx="4" fill="#222"/><rect x="121" y="86" width="13" height="10" rx="4" fill="#222"/><path d="M115 90 h6" stroke="#222" stroke-width="2"/></g>' +
      '<g class="it it-hut"><path d="M94 78 C96 60 140 60 142 78 Z" fill="#E4572E"/><rect x="88" y="74" width="62" height="7" rx="3.5" fill="#E4572E"/></g>' +
      '<rect x="102" y="172" width="12" height="44" rx="6" class="kidskin"/><rect x="122" y="172" width="12" height="44" rx="6" class="kidskin"/>' +
      '<g class="it it-creme"><path d="M104 104 l4 -4 M130 104 l4 -4 M100 140 l5 -3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><rect x="150" y="150" width="16" height="26" rx="4" fill="#FFB703"/><rect x="153" y="144" width="10" height="7" rx="2" fill="#E85D04"/><text x="158" y="168" font-size="8" text-anchor="middle" fill="#fff" font-weight="700">50</text></g></g>' +
      '<g class="it it-mittag"><circle cx="40" cy="190" r="18" fill="#fff" stroke="#888" stroke-width="2"/><path d="M40 190 v-12 M40 190 h8" stroke="#333" stroke-width="2.4" stroke-linecap="round"/><path d="M24 206 L56 174" stroke="#D94A43" stroke-width="4" stroke-linecap="round"/></g></svg>';
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
