/* Adas Körper-Atlas – Oberfläche: Speicher, Navigation, Fragetypen, Modi */
(function (A) {
  'use strict';
  var EN = window.ENGINE;
  var main = null;

  /* ================= Hilfen ================= */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function strip(h) { return String(h || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function shuffle(a) { return EN.shuffle(a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function srcText(s) {
    if (!s) return '';
    return String(s).replace(/H1/g, 'Heft 1').replace(/H2/g, 'Heft 2').replace(/\bE\b/g, 'Ergänzung').replace(/S\.(\d)/g, 'S. $1');
  }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function bar(p, c) { return '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, p)) + '%;' + (c ? 'background:' + c : '') + '"></i></div>'; }
  A.ui = { esc: esc };

  /* ================= Speicher ================= */
  var KEY = 'adaKoerperAtlas.v1', storageOK = true;
  function defaults() { return { v: 1, q: {}, err: {}, cards: {}, exams: [], lzSelf: {}, seen: {}, kat: 0 }; }
  function load() {
    var d = defaults();
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) { var o = JSON.parse(raw); for (var k in d) if (o && o[k] != null) d[k] = o[k]; }
      window.localStorage.setItem(KEY + '.t', '1'); window.localStorage.removeItem(KEY + '.t');
    } catch (e) { storageOK = false; }
    return d;
  }
  var S = load();
  function save() {
    if (!storageOK) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { storageOK = false; showStorageNote(); }
  }
  function showStorageNote() {
    var n = $('#storenote');
    if (n) n.hidden = storageOK;
  }

  /* ================= Daten vorbereiten ================= */
  var KAP = A.kapitel, KMAP = {}, LZ = {}, QS = A.fragen.slice(), QMAP = {}, DG = A.diagramme;
  KAP.forEach(function (k) { KMAP[k.id] = k; k.lz.forEach(function (l) { LZ[l[0]] = { id: l[0], text: l[1], kap: k.id }; }); });
  var IMG_Q = {
    skelett: 'Welcher Knochen ist markiert?', ohr: 'Was ist im Ohr markiert?', wirbelsaeule: 'Welcher Teil der Wirbelsäule ist markiert?', wirbelausschnitt: 'Was ist markiert?',
    gelenkkoerper: 'Welches Gelenk ist markiert?', gelenkarten: 'Welche Gelenkart ist das?', muskeln: 'Welcher Muskel ist markiert?', organe: 'Welches Organ ist markiert?',
    kreislauf: 'Was ist im Blutkreislauf markiert?', atemweg: 'Welche Station der Luft ist markiert?', verdauung: 'Welche Station der Verdauung ist markiert?', haut: 'Was ist in der Haut markiert?'
  };
  var TYPED = { skelett: 1, organe: 1, atemweg: 1, haut: 1, muskeln: 1, verdauung: 1, wirbelsaeule: 1 };
  Object.keys(DG).forEach(function (did) {
    var d = DG[did];
    if (d.noQuiz) return;
    d.parts.forEach(function (p) {
      if (p.q === false) return;
      QS.push({ id: 'img-' + did + '-' + p.id, k: d.kap, lz: d.lz, t: 'imgname', q: IMG_Q[did] || 'Was ist markiert?', diag: did, part: p.id, a: p.id, auto: true });
      if (TYPED[did] && p.mk && p.mk.length) QS.push({ id: 'typ-' + did + '-' + p.id, k: d.kap, lz: d.lz, t: 'imgtype', q: (IMG_Q[did] || 'Was ist markiert?') + ' Schreib den Namen.', diag: did, part: p.id, a: p.name.replace(/\s*\(.*\)/, ''), acc: [p.name].concat(p.alt || []), auto: true });
      if (p.find) QS.push({ id: 'find-' + did + '-' + p.id, k: d.kap, lz: d.lz, t: 'find', q: 'Tippe auf: <b>' + esc(p.name) + '</b>', diag: did, part: p.id, auto: true });
    });
  });
  QS.forEach(function (q) { QMAP[q.id] = q; });
  function partOf(did, pid) { var d = DG[did]; for (var i = 0; i < d.parts.length; i++) if (d.parts[i].id === pid) return d.parts[i]; return null; }

  // Glossar für Tippfehler-Toleranz
  var GL = {};
  function gl(s) { var k = EN.key(s); if (k && k.split(' ').length <= 3) GL[k] = 1; }
  QS.forEach(function (q) {
    if (q.t === 'short' || q.t === 'imgtype') { gl(q.a); (q.acc || []).forEach(gl); (q.half || []).forEach(gl); }
    if (q.t === 'list') q.items.forEach(function (it) { gl(it[0]); });
    if (q.t === 'order') q.items.forEach(gl);
    if (q.t === 'match') q.pairs.forEach(function (p) { gl(p[0]); });
  });
  Object.keys(DG).forEach(function (did) { DG[did].parts.forEach(function (p) { gl(p.name); (p.alt || []).forEach(gl); }); });
  ['Speichel', 'Schulter', 'Schalter', 'Wade', 'Brust', 'Bein', 'Oberarm', 'Oberschenkel', 'Unterarm', 'Unterschenkel', 'Wirbel', 'Hüfte', 'Knie', 'Arterie', 'Vene',
    'Lunge', 'Leber', 'Niere', 'Magen', 'Darm', 'Blase', 'Herz', 'Gehirn', 'Haut', 'Muskel', 'Sehne', 'Band', 'Bänder', 'Gelenk', 'Knochen', 'Rippe', 'Becken', 'Schädel',
    'Kiefer', 'Nase', 'Mund', 'Ohr', 'Auge', 'Drehgelenk', 'Klappgelenk', 'Kugelgelenk', 'Scharniergelenk', 'Steißbein', 'Kreuzbein', 'Zwerchfell', 'Luftröhre', 'Speiseröhre'].forEach(gl);
  var GLOSS = Object.keys(GL);
  var CTX = { glossary: GLOSS };

  /* ================= Statistik ================= */
  function st(id) { return S.q[id] || null; }
  function record(q, res) {
    var o = S.q[q.id] || { n: 0, r: 0, t: 0, f: 0, last: null, streak: 0 };
    o.n++; o[res.status]++; o.last = res.status; o.ts = Date.now();
    o.streak = res.status === 'r' ? (o.streak || 0) + 1 : 0;
    S.q[q.id] = o;
    var msg = null;
    if (res.status !== 'r') { S.err[q.id] = { c: ((S.err[q.id] && S.err[q.id].c) || 0) + 1, fix: 0 }; }
    else if (S.err[q.id]) {
      S.err[q.id].fix = (S.err[q.id].fix || 0) + 1;
      if (S.err[q.id].fix >= 2) { delete S.err[q.id]; msg = 'Fehler ausgebügelt – diese Frage ist aus deiner Fehlerliste raus!'; }
      else msg = 'Noch einmal richtig, dann ist die Frage aus der Fehlerliste raus.';
    }
    save();
    return msg;
  }
  function qsOf(k, opt) { return QS.filter(function (q) { return q.k === k && (!opt || !opt.noImg || !q.auto); }); }
  function kapStats(k) {
    var list = qsOf(k), r = 0, seen = 0;
    list.forEach(function (q) { var s = st(q.id); if (s) { seen++; if (s.last === 'r') r++; } });
    var errs = Object.keys(S.err).filter(function (id) { return QMAP[id] && QMAP[id].k === k; }).length;
    return { total: list.length, seen: seen, right: r, errs: errs, p: pct(r, list.length) };
  }
  function lzStats(lz) {
    var list = QS.filter(function (q) { return q.lz === lz; }), r = 0;
    list.forEach(function (q) { var s = st(q.id); if (s && s.last === 'r') r++; });
    return { total: list.length, right: r, p: pct(r, list.length) };
  }
  function overall() {
    var r = 0, seen = 0;
    QS.forEach(function (q) { var s = st(q.id); if (s) { seen++; if (s.last === 'r') r++; } });
    return { total: QS.length, seen: seen, right: r, p: pct(r, QS.length) };
  }

  /* ================= Lösungstext ================= */
  function answerHTML(q) {
    switch (q.t) {
      case 'mc': return esc(q.o[q.a]);
      case 'multi': return q.a.map(function (i) { return '• ' + esc(q.o[i]); }).join('<br>');
      case 'tf': return q.a ? 'Das stimmt.' : 'Das stimmt nicht.';
      case 'num': return esc(String(q.a)) + (q.unit ? ' ' + esc(q.unit) : '');
      case 'short': return esc(q.a);
      case 'list':
        if (q.items.length === q.n) return q.items.map(function (it, i) { return (q.ordered ? (i + 1) + '. ' : '• ') + esc(it[0]); }).join('<br>');
        return 'Richtig sind zum Beispiel: ' + q.items.map(function (it) { return esc(it[0]); }).join(', ') + ' (' + q.n + ' davon genügen).';
      case 'order': return q.items.map(function (x, i) { return (i + 1) + '. ' + esc(x); }).join('<br>');
      case 'match': return q.pairs.map(function (p) { return '<b>' + esc(p[0]) + '</b> → ' + esc(p[1]); }).join('<br>');
      case 'sort': return q.cats.map(function (c, ci) { return '<b>' + esc(c) + ':</b> ' + q.items.filter(function (it) { return it[1] === ci; }).map(function (it) { return esc(it[0]); }).join(' · '); }).join('<br>');
      case 'cloze': return q.q.replace(/\[\[([^\]|]+)[^\]]*\]\]/g, function (m, w) { return '<b class="gapok">' + esc(w) + '</b>'; });
      case 'label': return q.parts.map(function (p, i) { return (i + 1) + ' = ' + esc(partOf(q.diag, p).name); }).join('<br>');
      case 'imgname': case 'imgtype': case 'find': return esc(partOf(q.diag, q.part).name);
      case 'text': return esc(q.a);
    }
    return '';
  }
  var TYPE_LABEL = { mc: 'Auswahl', multi: 'Mehrfachauswahl', tf: 'Richtig oder falsch?', num: 'Zahl', short: 'Begriff', list: 'Aufzählen', order: 'Reihenfolge', match: 'Zuordnen',
    sort: 'Sortieren', cloze: 'Lückentext', label: 'Bild beschriften', imgname: 'Bildquiz', imgtype: 'Bildquiz', find: 'Bildquiz', text: 'Erklären' };

  /* ================= SVG-Grafiken ================= */
  var SVGNS = 'http://www.w3.org/2000/svg';
  var SVG_SEQ = 0;
  function svgString(did, opt) {
    opt = opt || {};
    var d = DG[did];
    var cls = 'dg dg-' + did + (opt.quiz ? ' quiz' : '') + (opt.vb ? ' fvz' : '') + (opt.cls ? ' ' + opt.cls : '');
    var mk = '';
    if (opt.markers) {
      var list = opt.markerParts ? opt.markerParts : d.parts.map(function (p) { return p.id; });
      list.forEach(function (pid, i) {
        var p = partOf(did, pid); if (!p || !p.mk || !p.mk.length) return;
        var n = opt.markerNums ? opt.markerNums[i] : (i + 1);
        p.mk.forEach(function (m) {
          var ln = 'M' + m[0] + ',' + m[1] + ' L' + m[2] + ',' + m[3];
          mk += '<g class="mk" data-mk="' + pid + '"><path class="mk-h" d="' + ln + '"/><path class="mk-l" d="' + ln + '"/><circle cx="' + m[2] + '" cy="' + m[3] + '" r="2.3" class="mk-a"/>' +
            '<circle class="mk-c" cx="' + m[0] + '" cy="' + m[1] + '" r="9.6" filter="url(#{P}shS)"/><text x="' + m[0] + '" y="' + (m[1] + 3.7) + '">' + n + '</text></g>';
        });
      });
    }
    var vb = (opt.vb || d.vb).join(' '), pfx = 'g' + (++SVG_SEQ).toString(36) + '-';
    return ('<svg class="' + cls + '" viewBox="' + vb + '" role="img" aria-label="' + esc(d.title) + '" xmlns="' + SVGNS + '" data-pfx="' + pfx + '">' +
      '<defs>' + A.G.defs(opt.vb ? opt.vb[2] / d.vb[2] : 1) + '</defs><g class="dgc">' + d.render() + '</g><g class="mks">' + mk + '</g><g class="rings"></g></svg>').replace(/\{P\}/g, pfx);
  }
  function partEls(svg, pid) { return $$('[data-part="' + pid + '"]', svg); }
  function chainAt(el) {
    var out = [];
    while (el && el.tagName && el.tagName.toLowerCase() !== 'svg') { if (el.getAttribute && el.getAttribute('data-part')) out.push(el.getAttribute('data-part')); el = el.parentNode; }
    return out;
  }
  // Markierung: Teil leuchtet (Filter), Licht und Schatten bleiben erhalten
  function markPart(svg, pid, cls, did) {
    var pfx = svg.getAttribute('data-pfx') || '', glow = cls === 'hl' && did && DG[did] && DG[did].hl === 'glow';
    partEls(svg, pid).forEach(function (e) {
      e.classList.add(cls);
      e.setAttribute('filter', 'url(#' + pfx + (glow ? 'glow' : cls) + ')');
      var a = e.parentNode;
      while (a && a !== svg) { if (a.classList && a.classList.contains('part')) a.classList.add('hl-anc'); a = a.parentNode; }
    });
  }
  function clearHL(svg) {
    $$('.hl,.sel,.bad', svg).forEach(function (e) { e.removeAttribute('filter'); });
    $$('.hl,.hl-anc,.sel,.bad,.ok', svg).forEach(function (e) { e.classList.remove('hl', 'hl-anc', 'sel', 'bad', 'ok'); });
    svg.classList.remove('dim');
    var r = $('.rings', svg); if (r) r.innerHTML = '';
  }
  function anchorOf(svg, did, pid) {
    var p = partOf(did, pid);
    if (p && p.mk && p.mk.length) {
      var a = [p.mk[0][2], p.mk[0][3]], v = (svg.getAttribute('viewBox') || '').split(/\s+/).map(Number), dv = DG[did].vb;
      // vergrößerter Ausschnitt einer symmetrischen Figur: Ring auf die sichtbare Seite spiegeln
      if (v.length === 4 && (a[0] < v[0] || a[0] > v[0] + v[2])) { var mx = 2 * (dv[0] + dv[2] / 2) - a[0]; if (mx >= v[0] && mx <= v[0] + v[2]) a[0] = mx; }
      return a;
    }
    var el = partEls(svg, pid)[0];
    try { var b = el.getBBox(); return [b.x + b.width / 2, b.y + b.height / 2]; } catch (e) { return null; }
  }
  function highlight(svg, did, pid, opt) {
    opt = opt || {};
    clearHL(svg);
    markPart(svg, pid, opt.cls || 'hl', did);
    if (opt.dim !== false) svg.classList.add('dim');
    if (opt.ring) {
      var at = anchorOf(svg, did, pid);
      if (at) $('.rings', svg).innerHTML = '<circle class="ring" cx="' + at[0] + '" cy="' + at[1] + '" r="13"/><circle class="ring ring2" cx="' + at[0] + '" cy="' + at[1] + '" r="13"/>';
    }
  }
  A.ui.svgString = svgString; A.ui.highlight = highlight; A.ui.clearHL = clearHL; A.ui.chainAt = chainAt; A.ui.partOf = partOf; A.ui.markPart = markPart;

  /* Legende: zwei Spalten nur, wenn jeder Name hineinpasst – sonst eine Spalte (nie abgeschnittene Namen) */
  function fitLegend(ol) {
    if (!ol) return;
    ol.classList.remove('one');
    if (ol.clientWidth && ol.scrollWidth > ol.clientWidth + 1) ol.classList.add('one');
  }
  var fitT = null;
  window.addEventListener('resize', function () { clearTimeout(fitT); fitT = setTimeout(function () { $$('.legend').forEach(fitLegend); }, 120); });

  /* Erkunden: Grafik + Legende */
  function explorer(host, did, cap) {
    var d = DG[did];
    if (d.noQuiz) { host.innerHTML = '<figure class="fig plain">' + svgString(did, {}) + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>'; return; }
    var names = true;
    host.innerHTML = '<figure class="fig explore"><div class="fig-tools"><button class="tbtn" data-act="names" aria-pressed="true">👁️ Namen an</button>' +
      '<button class="tbtn" data-act="quiz">🎯 Bildquiz</button></div><div class="fig-row"><div class="fig-svg">' + svgString(did, { markers: true }) + '</div>' +
      '<ol class="legend">' + d.parts.map(function (p, i) {
        return '<li data-p="' + p.id + '" tabindex="0"><span class="ln">' + (p.mk && p.mk.length ? (i + 1) : '•') + '</span><span class="lt"><b class="nm">' + esc(p.name) + '</b><small>' + esc(p.info || '') + '</small></span></li>';
      }).join('') + '</ol></div><div class="fig-info" aria-live="polite">' + esc(cap || 'Tippe auf eine Nummer oder ein Teil.') + '</div></figure>';
    var svg = $('svg', host), info = $('.fig-info', host);
    function show(pid) {
      var p = partOf(did, pid); if (!p) return;
      highlight(svg, did, pid, { ring: true });
      $$('.legend li', host).forEach(function (li) { li.classList.toggle('on', li.getAttribute('data-p') === pid); });
      var idx = d.parts.indexOf(p) + 1;
      info.innerHTML = '<b>' + (p.mk && p.mk.length ? idx + ' · ' : '') + esc(p.name) + '</b> – ' + esc(p.info || '');
    }
    svg.addEventListener('click', function (e) {
      var mk = e.target.closest ? e.target.closest('.mk') : null;
      if (mk) { show(mk.getAttribute('data-mk')); return; }
      var ch = chainAt(e.target); if (ch.length) show(ch[0]);
    });
    $$('.legend li', host).forEach(function (li) {
      li.addEventListener('click', function () { show(li.getAttribute('data-p')); });
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(li.getAttribute('data-p')); } });
    });
    $('[data-act=names]', host).addEventListener('click', function () {
      names = !names; this.setAttribute('aria-pressed', names); this.textContent = names ? '👁️ Namen an' : '🙈 Namen aus';
      host.querySelector('.legend').classList.toggle('hidden-names', !names);
      info.textContent = names ? 'Tippe auf eine Nummer oder ein Teil.' : 'Namen versteckt: Sag dir selbst, wie jede Nummer heißt – dann tippe zum Nachschauen.';
      clearHL(svg);
    });
    $('[data-act=quiz]', host).addEventListener('click', function () { location.hash = '#/bildquiz/' + did; });
    fitLegend($('.legend', host));
  }
  A.ui.explorer = explorer;

  /* ================= Fragen-Darstellung ================= */
  var PRAISE = ['Super!', 'Klasse!', 'Genau!', 'Stark!', 'Richtig gut!', 'Prima!', 'Spitze!'];
  function renderQ(q, host, opt) {
    opt = opt || {};
    var mode = opt.mode || 'train', locked = false, resp = opt.resp != null ? opt.resp : null, kap = KMAP[q.k];
    var head = '<div class="qmeta"><span class="kchip" style="--c:' + kap.color + '">' + esc(kap.short) + '</span><span class="qtype">' + TYPE_LABEL[q.t] + '</span>' +
      (q.st ? '<span class="stchip" title="Stolperstelle">⚠️ Stolperstelle</span>' : '') + (q.src && mode !== 'exam' ? '<span class="qsrc">' + esc(srcText(q.src)) + '</span>' : '') + '</div>';
    host.innerHTML = '<div class="qcard" data-qid="' + q.id + '">' + head + '<div class="qtext">' + (q.t === 'tf' ? 'Stimmt das? <span class="tfq">' + q.q + '</span>' : q.q) + '</div><div class="qbody"></div><div class="qfb" aria-live="polite"></div></div>';
    var body = $('.qbody', host), fb = $('.qfb', host);
    var ctl = { q: q, get: function () { return resp; }, set: function (v) { resp = v; if (opt.onChange) opt.onChange(v); }, lock: function () { locked = true; host.querySelector('.qcard').classList.add('locked'); } };
    function changed(v) { ctl.set(v); }
    var t = q.t, html = '', order;

    if (t === 'mc' || t === 'tf' || t === 'multi' || t === 'imgname') {
      var opts;
      if (t === 'tf') opts = [{ v: true, l: '👍 Stimmt' }, { v: false, l: '👎 Stimmt nicht' }];
      else if (t === 'imgname') {
        var did = q.diag, svgHtml = svgString(did, { quiz: true });
        body.innerHTML = '<div class="qimg">' + svgHtml + '</div>';
        var svg0 = $('svg', body);
        highlight(svg0, did, q.part, { ring: true });
        var excl = {}; partEls(svg0, q.part).forEach(function (e) {
          $$('[data-part]', e).forEach(function (x) { excl[x.getAttribute('data-part')] = 1; });
          var a = e.parentNode; while (a && a !== svg0) { if (a.getAttribute && a.getAttribute('data-part')) excl[a.getAttribute('data-part')] = 1; a = a.parentNode; }
        });
        var cands = DG[did].parts.filter(function (p) { return p.id !== q.part && !excl[p.id]; });
        var dis = shuffle(cands).slice(0, 3).map(function (p) { return p.id; });
        opts = shuffle([q.part].concat(dis)).map(function (id) { return { v: id, l: partOf(did, id).name }; });
      } else {
        opts = q.o.map(function (o, i) { return { v: i, l: o }; });
        if (!q.noShuffle) opts = shuffle(opts);
      }
      var multi = t === 'multi';
      var wrap = document.createElement('div');
      wrap.className = 'opts' + (t === 'tf' ? ' tf' : '') + (multi ? ' multi' : '');
      wrap.innerHTML = (multi ? '<p class="hint">Mehrere Antworten können richtig sein.</p>' : '') + opts.map(function (o, i) {
        return '<button class="opt" data-i="' + i + '" aria-pressed="false">' + (multi ? '<span class="box"></span>' : '<span class="dot"></span>') + '<span>' + o.l + '</span></button>';
      }).join('');
      body.appendChild(wrap);
      if (resp != null) $$('.opt', wrap).forEach(function (b) { var o = opts[+b.getAttribute('data-i')]; if (multi ? resp.indexOf(o.v) >= 0 : resp === o.v) b.setAttribute('aria-pressed', 'true'); });
      wrap.addEventListener('click', function (e) {
        var b = e.target.closest('.opt'); if (!b || locked) return;
        var o = opts[+b.getAttribute('data-i')];
        if (multi) {
          var cur = (resp || []).slice(), ix = cur.indexOf(o.v);
          if (ix >= 0) cur.splice(ix, 1); else cur.push(o.v);
          b.setAttribute('aria-pressed', ix < 0);
          changed(cur);
        } else {
          $$('.opt', wrap).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          changed(o.v);
          if (opt.autoCheck) opt.autoCheck();
        }
      });
      ctl.mark = function () {
        $$('.opt', wrap).forEach(function (b) {
          var o = opts[+b.getAttribute('data-i')];
          var right = multi ? q.a.indexOf(o.v) >= 0 : (t === 'tf' ? o.v === q.a : o.v === q.a);
          var chosen = b.getAttribute('aria-pressed') === 'true';
          if (right) b.classList.add('right'); else if (chosen) b.classList.add('wrong');
        });
      };
    } else if (t === 'num' || t === 'short' || t === 'imgtype') {
      if (t === 'imgtype') {
        body.innerHTML = '<div class="qimg">' + svgString(q.diag, { quiz: true }) + '</div>';
        highlight($('svg', body), q.diag, q.part, { ring: true });
      }
      var inp = document.createElement('div');
      inp.className = 'inrow';
      inp.innerHTML = '<input class="tin' + (t === 'num' ? ' num' : '') + '" type="text" ' + (t === 'num' ? 'inputmode="numeric" ' : '') + 'autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + (t === 'num' ? 'Zahl' : 'Deine Antwort') + '" aria-label="Antwort">' + (q.unit ? '<span class="unit">' + esc(q.unit) + '</span>' : '');
      body.appendChild(inp);
      var field = $('input', inp);
      if (resp != null) field.value = resp;
      field.addEventListener('input', function () { if (!locked) changed(field.value); });
      field.addEventListener('keydown', function (e) { if (e.key === 'Enter' && opt.onEnter) { e.preventDefault(); opt.onEnter(); } });
      ctl.focus = function () { try { field.focus({ preventScroll: true }); } catch (e) { } };
    } else if (t === 'list') {
      var lw = document.createElement('div'); lw.className = 'listin';
      var arr = resp ? resp.slice() : new Array(q.n).fill('');
      for (var i = 0; i < q.n; i++) lw.innerHTML += '<label class="li"><span>' + (i + 1) + '.</span><input class="tin" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-i="' + i + '" value="' + esc(arr[i] || '') + '"></label>';
      body.appendChild(lw);
      lw.addEventListener('input', function (e) { var f = e.target; if (locked || !f.matches('input')) return; arr[+f.getAttribute('data-i')] = f.value; changed(arr.slice()); });
      if (q.ordered) lw.insertAdjacentHTML('beforebegin', '<p class="hint">Achte auf die Reihenfolge.</p>');
      ctl.mark = function (res) {
        $$('input', lw).forEach(function (f, idx) { var h = res.hits ? res.hits[idx] : null; if (h != null) f.classList.add(h >= 0 ? 'ok' : 'no'); });
      };
    } else if (t === 'order') {
      order = resp ? resp.slice() : [];
      var pool = shuffle(q.items.map(function (x, i) { return i; }));
      var ow = document.createElement('div'); ow.className = 'orderw';
      body.appendChild(ow);
      var drawOrder = function () {
        ow.innerHTML = '<p class="hint">Tippe die Kärtchen in der richtigen Reihenfolge an. Zum Zurücklegen nochmal tippen.</p><ol class="ord-ans">' +
          order.map(function (ix, n) { return '<li><button class="chip on" data-ix="' + ix + '"><b>' + (n + 1) + '</b> ' + esc(q.items[ix]) + '</button></li>'; }).join('') +
          (order.length < q.items.length ? '<li class="slot">' + (order.length + 1) + '. …</li>' : '') + '</ol><div class="ord-pool">' +
          pool.filter(function (ix) { return order.indexOf(ix) < 0; }).map(function (ix) { return '<button class="chip" data-ix="' + ix + '">' + esc(q.items[ix]) + '</button>'; }).join('') + '</div>';
      };
      drawOrder();
      ow.addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (!b || locked) return;
        var ix = +b.getAttribute('data-ix'), p = order.indexOf(ix);
        if (p >= 0) order.splice(p, 1); else order.push(ix);
        drawOrder(); changed(order.slice());
      });
      ctl.mark = function () {
        $$('.ord-ans li', ow).forEach(function (li, n) { var b = $('button', li); if (b) li.classList.add(+b.getAttribute('data-ix') === n ? 'ok' : 'no'); });
      };
    } else if (t === 'match' || t === 'sort' || t === 'label' || t === 'cloze') {
      var rows = resp ? resp.slice() : [];
      if (t === 'label') {
        body.innerHTML = '<div class="qimg">' + svgString(q.diag, { quiz: true, markers: true, markerParts: q.parts }) + '</div>';
      }
      var mw = document.createElement('div'); mw.className = 'rows';
      if (t === 'match') {
        var rights = shuffle(q.pairs.map(function (p, i) { return i; }));
        mw.innerHTML = q.pairs.map(function (p, i) {
          return '<div class="mrow" data-i="' + i + '"><span class="ml">' + esc(p[0]) + '</span><select aria-label="' + esc(p[0]) + '"><option value="">– wählen –</option>' +
            rights.map(function (r) { return '<option value="' + r + '"' + (rows[i] === r ? ' selected' : '') + '>' + esc(q.pairs[r][1]) + '</option>'; }).join('') + '</select></div>';
        }).join('');
        mw.addEventListener('change', function (e) { var r = e.target.closest('.mrow'); if (!r || locked) return; rows[+r.getAttribute('data-i')] = e.target.value === '' ? null : +e.target.value; changed(rows.slice()); });
      } else if (t === 'label') {
        var names = shuffle(q.parts.slice());
        mw.innerHTML = q.parts.map(function (p, i) {
          return '<div class="mrow" data-i="' + i + '"><span class="ml"><b class="numdot">' + (i + 1) + '</b></span><select aria-label="Nummer ' + (i + 1) + '"><option value="">– Name wählen –</option>' +
            names.map(function (n) { return '<option value="' + n + '"' + (rows[i] === n ? ' selected' : '') + '>' + esc(partOf(q.diag, n).name) + '</option>'; }).join('') + '</select></div>';
        }).join('');
        mw.addEventListener('change', function (e) { var r = e.target.closest('.mrow'); if (!r || locked) return; rows[+r.getAttribute('data-i')] = e.target.value || null; changed(rows.slice()); });
      } else if (t === 'sort') {
        mw.innerHTML = q.items.map(function (it, i) {
          return '<div class="srow" data-i="' + i + '"><span class="sl">' + esc(it[0]) + '</span><span class="seg">' + q.cats.map(function (c, ci) {
            return '<button class="segb" data-c="' + ci + '" aria-pressed="' + (rows[i] === ci) + '">' + esc(c) + '</button>';
          }).join('') + '</span></div>';
        }).join('');
        mw.addEventListener('click', function (e) {
          var b = e.target.closest('.segb'); if (!b || locked) return;
          var r = b.closest('.srow'), i = +r.getAttribute('data-i');
          rows[i] = +b.getAttribute('data-c');
          $$('.segb', r).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          changed(rows.slice());
        });
      } else if (t === 'cloze') {
        var gaps = EN.clozeGaps(q.q), words = {};
        gaps.forEach(function (g) { words[g[0]] = 1; }); (q.bank || []).forEach(function (w) { words[w] = 1; });
        var wl = shuffle(Object.keys(words)), gi = 0;
        mw.className = 'cloze';
        mw.innerHTML = '<p class="hint">Wähle für jede Lücke das passende Wort.</p><p class="clz">' + q.q.replace(/\[\[([^\]]+)\]\]/g, function () {
          var i = gi++;
          return '<select class="gap" data-i="' + i + '" aria-label="Lücke ' + (i + 1) + '"><option value="">…</option>' + wl.map(function (w) { return '<option' + (rows[i] === w ? ' selected' : '') + '>' + esc(w) + '</option>'; }).join('') + '</select>';
        }) + '</p>';
        mw.addEventListener('change', function (e) { var s = e.target; if (!s.matches('select') || locked) return; rows[+s.getAttribute('data-i')] = s.value || null; changed(rows.slice()); });
        body.parentNode.querySelector('.qtext').innerHTML = q.q.indexOf('Lückentext') === 0 ? 'Lückentext aus deinem Heft' : 'Fülle die Lücken.';
      }
      body.appendChild(mw);
      ctl.mark = function () {
        if (t === 'match') $$('.mrow', mw).forEach(function (r) { var i = +r.getAttribute('data-i'), ok = rows[i] === i; r.classList.add(ok ? 'ok' : 'no'); if (!ok) r.insertAdjacentHTML('beforeend', '<span class="fix">→ ' + esc(q.pairs[i][1]) + '</span>'); });
        if (t === 'label') $$('.mrow', mw).forEach(function (r) { var i = +r.getAttribute('data-i'), ok = rows[i] === q.parts[i]; r.classList.add(ok ? 'ok' : 'no'); if (!ok) r.insertAdjacentHTML('beforeend', '<span class="fix">→ ' + esc(partOf(q.diag, q.parts[i]).name) + '</span>'); });
        if (t === 'sort') $$('.srow', mw).forEach(function (r) { var i = +r.getAttribute('data-i'), ok = rows[i] === q.items[i][1]; r.classList.add(ok ? 'ok' : 'no'); if (!ok) r.insertAdjacentHTML('beforeend', '<span class="fix">→ ' + esc(q.cats[q.items[i][1]]) + '</span>'); });
        if (t === 'cloze') { var gg = EN.clozeGaps(q.q); $$('select.gap', mw).forEach(function (s, i) { var ok = gg[i].map(EN.key).indexOf(EN.key(rows[i] || '')) >= 0; s.classList.add(ok ? 'ok' : 'no'); if (!ok) s.insertAdjacentHTML('afterend', '<span class="fix">' + esc(gg[i][0]) + '</span>'); }); }
      };
    } else if (t === 'find') {
      var fvp = partOf(q.diag, q.part);
      body.innerHTML = '<p class="hint">Tippe im Bild auf die richtige Stelle. Dann auf „Prüfen“.' + (fvp && fvp.fv ? ' (Ausschnitt vergrößert)' : '') + '</p><div class="qimg tapimg">' + svgString(q.diag, { quiz: true, vb: fvp && fvp.fv }) + '</div><p class="picked">Noch nichts gewählt.</p>';
      var svgF = $('svg', body), picked = $('.picked', body);
      svgF.addEventListener('click', function (e) {
        if (locked) return;
        var ch = chainAt(e.target);
        try { // Zonen (z. B. Hautschichten): Tipp-Höhe zählt mit
          var pt = svgF.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
          var sp = pt.matrixTransform(svgF.getScreenCTM().inverse());
          DG[q.diag].parts.forEach(function (p) { if (p.zone && sp.x >= p.zone[0] && sp.x <= p.zone[2] && sp.y >= p.zone[1] && sp.y <= p.zone[3] && ch.indexOf(p.id) < 0) ch.push(p.id); });
        } catch (err) { }
        if (!ch.length) return;
        var pid = ch[0];
        highlight(svgF, q.diag, pid, { cls: 'sel', dim: false });
        picked.textContent = 'Gewählt ✓ – tippe auf „Prüfen“ oder wähle neu.';
        changed(ch);
      });
      ctl.mark = function (res) {
        highlight(svgF, q.diag, q.part, { ring: true });
        if (res.status !== 'r' && resp && resp[0] && resp[0] !== q.part) markPart(svgF, resp[0], 'bad', q.diag);
        var tp = resp && resp[0] ? partOf(q.diag, resp[0]) : null;
        picked.innerHTML = res.status === 'r' ? 'Genau dort! 🎯' : (tp ? 'Du hast <b>' + esc(tp.name) + '</b> angetippt. Grün leuchtet <b>' + esc(partOf(q.diag, q.part).name) + '</b>.' : '');
      };
    } else if (t === 'text') {
      var tw = document.createElement('div'); tw.className = 'textw';
      tw.innerHTML = '<textarea class="tarea" rows="4" placeholder="Schreib deine Antwort – oder sag sie laut. Dann schau dir die Musterlösung an." aria-label="Deine Antwort">' + esc(resp && resp.text || '') + '</textarea>';
      body.appendChild(tw);
      var ta = $('textarea', tw);
      ta.addEventListener('input', function () { if (!locked) changed({ text: ta.value, self: resp && resp.self }); });
    }

    /* Rückmeldung */
    ctl.check = function () {
      if (t === 'text') return null;
      var res = EN.grade(q, resp, CTX);
      ctl.result = res;
      return res;
    };
    ctl.feedback = function (res, extraMsg) {
      if (ctl.mark) ctl.mark(res);
      ctl.lock();
      var icon = res.status === 'r' ? '✓' : (res.status === 't' ? '◐' : '✗');
      var title = res.status === 'r' ? pick(PRAISE) + (res.spelling ? ' Achte noch auf die Schreibweise.' : '') : (res.status === 't' ? 'Teilweise richtig!' : 'Noch nicht ganz – so ist es richtig:');
      var showAns = !(res.status === 'r' && (t === 'mc' || t === 'tf' || t === 'imgname' || t === 'find'));
      var html = '<div class="fb fb-' + res.status + '"><div class="fb-h"><span class="fb-i">' + icon + '</span><b>' + title + '</b>' +
        (t !== 'text' && E_POINTS(q) > 1 ? '<span class="fb-p">' + EN.earned(q, res.score) + ' / ' + E_POINTS(q) + ' Punkte</span>' : '') + '</div>';
      if (res.msg) html += '<p>' + res.msg + '</p>';
      if (showAns && t !== 'text') html += '<div class="fb-a"><span class="lbl2">Richtige Antwort</span>' + answerHTML(q) + '</div>';
      if (res.spelling && res.status === 'r') html += '<div class="fb-a"><span class="lbl2">So schreibt man es</span>' + answerHTML(q) + '</div>';
      if (q.ex) html += '<p class="fb-ex">💡 ' + q.ex + '</p>';
      if (q.note) html += '<p class="fb-note">🔎 ' + q.note + '</p>';
      if (extraMsg) html += '<p class="fb-fix">' + extraMsg + '</p>';
      html += '</div>';
      fb.innerHTML = html;
    };
    /* Freitext: Musterlösung + Selbsteinschätzung */
    ctl.reveal = function (onRated) {
      ctl.lock();
      var typed = (resp && resp.text || '').toLowerCase();
      var kps = (q.kp || []).map(function (k) {
        var words = EN.norm(k).split(' ').filter(function (w) { return w.length >= 5; });
        var hit = typed && words.some(function (w) { return EN.norm(typed).indexOf(w.slice(0, Math.max(5, w.length - 2))) >= 0; });
        return { k: k, hit: hit };
      });
      fb.innerHTML = '<div class="fb fb-model"><div class="fb-a"><span class="lbl2">Musterlösung</span>' + esc(q.a) + '</div>' +
        (kps.length ? '<div class="kps"><span class="lbl2">Hast du das genannt? (abhaken)</span>' + kps.map(function (k, i) {
          return '<label class="kp"><input type="checkbox" data-i="' + i + '"' + (k.hit ? ' checked' : '') + '> ' + esc(k.k) + '</label>';
        }).join('') + '</div>' : '') +
        (q.ex ? '<p class="fb-ex">💡 ' + q.ex + '</p>' : '') + (q.note ? '<p class="fb-note">🔎 ' + q.note + '</p>' : '') +
        '<p class="hint">Vergleiche den Inhalt, nicht die genaue Wortwahl. Gleichwertige Antworten zählen auch. Wie war deine Antwort?</p><div class="selfrate">' +
        '<button class="sr sr-r" data-s="r">✓ Richtig</button><button class="sr sr-t" data-s="t">◐ Teilweise</button><button class="sr sr-f" data-s="f">✗ Falsch</button></div></div>';
      var boxes = $$('.kp input', fb);
      function suggest() {
        if (!boxes.length) return;
        var c = boxes.filter(function (b) { return b.checked; }).length;
        $$('.sr', fb).forEach(function (b) { b.classList.remove('suggest'); });
        var s = c === boxes.length ? 'r' : (c > 0 ? 't' : 'f');
        $('.sr-' + s, fb).classList.add('suggest');
      }
      boxes.forEach(function (b) { b.addEventListener('change', suggest); }); suggest();
      $('.selfrate', fb).addEventListener('click', function (e) {
        var b = e.target.closest('.sr'); if (!b) return;
        resp = { text: resp && resp.text || '', self: b.getAttribute('data-s') };
        $$('.sr', fb).forEach(function (x) { x.disabled = true; x.classList.toggle('chosen', x === b); });
        var res = EN.grade(q, resp, CTX); ctl.result = res;
        if (onRated) onRated(res);
      });
    };
    return ctl;
  }
  function E_POINTS(q) { return EN.points(q); }
  A.ui.renderQ = renderQ;

  /* ================= Übungsrunde (Training, Bildquiz, Fehler, Katalog) ================= */
  function runQuestions(cfg) {
    var list = cfg.ids.map(function (id) { return QMAP[id]; }).filter(Boolean);
    if (!list.length) { main.innerHTML = page(cfg.title, '<div class="empty">Hier gibt es gerade keine Fragen. 🎉</div>', cfg.back); return; }
    var i = cfg.start || 0, results = [];
    function step() {
      if (i >= list.length) return finish();
      var q = list[i];
      main.innerHTML = '<div class="runner"><div class="rhead"><a class="back" href="' + cfg.back + '">← ' + esc(cfg.backLabel || 'Zurück') + '</a><b>' + esc(cfg.title) + '</b><span class="rcount">' + (i + 1) + ' / ' + list.length + '</span></div>' +
        bar(pct(i, list.length), KMAP[q.k].color) + '<div class="qhost"></div><div class="rfoot"><button class="btn ghost" data-a="skip">Überspringen</button><button class="btn primary" data-a="check">Prüfen</button></div></div>';
      var host = $('.qhost', main), btnC = $('[data-a=check]', main), btnS = $('[data-a=skip]', main), done = false;
      var ctl = renderQ(q, host, { mode: 'train', onEnter: function () { btnC.click(); } });
      if (q.t === 'text') btnC.textContent = 'Lösung zeigen';
      if (ctl.focus && window.matchMedia && window.matchMedia('(pointer:fine)').matches) ctl.focus();
      function next() { i++; if (cfg.onProgress) cfg.onProgress(i); step(); window.scrollTo(0, 0); }
      btnS.addEventListener('click', function () { if (!done) results.push({ q: q, status: 'skip', score: 0 }); next(); });
      btnC.addEventListener('click', function () {
        if (done) { next(); return; }
        if (q.t === 'text') {
          btnC.disabled = true; btnS.hidden = true;
          ctl.reveal(function (res) {
            var m = record(q, res); results.push({ q: q, status: res.status, score: res.score });
            done = true; btnC.disabled = false; btnC.textContent = i + 1 < list.length ? 'Weiter →' : 'Fertig';
            if (m) $('.qfb', host).insertAdjacentHTML('beforeend', '<p class="fb-fix">' + m + '</p>');
            btnC.focus();
          });
          return;
        }
        var res = ctl.check();
        if (res.empty && q.t !== 'order') { shake(btnC); return; }
        if (res.incomplete) { shake(btnC); return; }
        var m = record(q, res);
        results.push({ q: q, status: res.status, score: res.score });
        ctl.feedback(res, m);
        done = true; btnS.hidden = true; btnC.textContent = i + 1 < list.length ? 'Weiter →' : 'Fertig';
        btnC.focus();
      });
    }
    function finish() {
      var pts = 0, max = 0, wrong = [];
      results.forEach(function (r) { if (r.status === 'skip') { max += E_POINTS(r.q); wrong.push(r.q.id); return; } pts += EN.earned(r.q, r.score); max += E_POINTS(r.q); if (r.status !== 'r') wrong.push(r.q.id); });
      var p = pct(pts, max), right = results.filter(function (r) { return r.status === 'r'; }).length;
      var face = p >= 90 ? '🏆' : (p >= 75 ? '🌟' : (p >= 50 ? '💪' : '🌱'));
      main.innerHTML = page(cfg.title, '<div class="result"><div class="big">' + face + '</div><h2>' + right + ' von ' + results.length + ' Fragen richtig</h2><p class="muted">' + pts + ' von ' + max + ' Punkten (' + p + ' %)</p>' + bar(p) +
        (wrong.length ? '<h3>Noch üben:</h3><ul class="wl">' + wrong.map(function (id) { var q = QMAP[id]; return '<li><span class="kchip" style="--c:' + KMAP[q.k].color + '">' + esc(KMAP[q.k].short) + '</span> ' + esc(strip(q.q)).slice(0, 110) + '</li>'; }).join('') + '</ul>' : '<p>Alles richtig – super gemacht! 🎉</p>') +
        '<div class="btnrow">' + (wrong.length ? '<button class="btn primary" data-a="wrong">Falsche nochmal üben (' + wrong.length + ')</button>' : '') +
        (cfg.again ? '<button class="btn" data-a="again">Neue Runde</button>' : '') + '<a class="btn ghost" href="' + cfg.back + '">Zurück</a></div></div>', cfg.back);
      var bw = $('[data-a=wrong]', main), ba = $('[data-a=again]', main);
      if (bw) bw.addEventListener('click', function () { runQuestions({ title: cfg.title + ' – Wiederholung', ids: shuffle(wrong), back: cfg.back, backLabel: cfg.backLabel }); });
      if (ba) ba.addEventListener('click', function () { cfg.again(); });
      if (cfg.onFinish) cfg.onFinish(results);
    }
    step();
  }
  function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
  function page(title, inner, back, sub) {
    return '<div class="page"><div class="phead">' + (back ? '<a class="back" href="' + back + '">← Zurück</a>' : '') + '<h1>' + title + '</h1>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + '</div>' + inner + '</div>';
  }

  /* Auswahl einer Übungsrunde: zuerst Neues und Fehler, dann der Rest */
  function pickRound(pool, n) {
    var fresh = [], wrong = [], rest = [];
    shuffle(pool).forEach(function (q) { var s = st(q.id); if (!s) fresh.push(q); else if (s.last !== 'r') wrong.push(q); else rest.push(q); });
    var out = wrong.slice(0, Math.ceil(n / 3)).concat(fresh).concat(wrong.slice(Math.ceil(n / 3))).concat(rest).slice(0, n);
    // Typen mischen: Freitext nicht direkt hintereinander
    return shuffle(out).map(function (q) { return q.id; });
  }

  /* ================= Ansichten ================= */
  var ICONS = {
    bone: '<path d="M7 7a2.5 2.5 0 1 1 3.5-3.5L13.5 6.5 17 10l3 3a2.5 2.5 0 1 1-3.5 3.5L13.5 13.5 10 10 7 7z" transform="rotate(0 12 12)"/>',
    spine: '<path d="M12 2v3M10 6h4M10.5 9h3M10 12h4M10.5 15h3M10 18h4M12 19v3"/>',
    joint: '<circle cx="12" cy="12" r="4"/><path d="M12 2v6M12 16v6"/>',
    muscle: '<path d="M5 18c2-6 4-9 8-10 2-.5 3 1 2 3-1.5 2.5-3 3-3 5"/><path d="M15 8c2 0 4 1 4 3"/>',
    organs: '<path d="M8 4c-2 3-3 6-3 9a7 7 0 0 0 14 0c0-3-1-6-3-9"/><path d="M12 4v10"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    lungs: '<path d="M12 3v8M12 11c-2-1-3-3-5-3-2 0-3 3-3 7 0 3 1 5 3 5 3 0 5-2 5-5M12 11c2-1 3-3 5-3 2 0 3 3 3 7 0 3-1 5-3 5-3 0-5-2-5-5"/>',
    stomach: '<path d="M9 3v4c0 2-4 3-4 8a5 5 0 0 0 9 3c1-1 2-1 3 0M9 7c4 0 8 1 8 6"/>',
    skin: '<path d="M3 8h18M3 13h18M3 18h18M8 3l-1 5M15 3l-1 5"/>',
    hand: '<path d="M7 11V5a1.5 1.5 0 0 1 3 0v5M10 10V4a1.5 1.5 0 0 1 3 0v6M13 10V5a1.5 1.5 0 0 1 3 0v7M16 12v-2a1.5 1.5 0 0 1 3 0v4c0 4-3 7-7 7-3 0-5-2-6-4l-2-4a1.5 1.5 0 0 1 2.5-1.5L7 13"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    puzzle: '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H4v-4a2 2 0 1 0 0-4z"/>'
  };
  function icon(n, c) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="color:' + (c || 'currentColor') + '">' + (ICONS[n] || '') + '</svg>'; }

  function vStart() {
    var o = overall(), nErr = Object.keys(S.err).length;
    var rec;
    var untouched = KAP.filter(function (k) { return !S.seen[k.id]; });
    if (nErr >= 5) rec = ['🔁', 'Fehlertraining', nErr + ' Fragen warten auf eine zweite Chance.', '#/fehler'];
    else if (untouched.length) rec = ['📖', 'Weiterlernen: ' + untouched[0].title, 'Lies das Kapitel und schau dir die Bilder an.', '#/lernen/' + untouched[0].id];
    else if (!S.exams.length) rec = ['📝', 'Probeprüfung', 'Teste dich wie in der Klassenarbeit.', '#/pruefung'];
    else rec = ['🎯', 'Kapiteltraining', 'Übe die Kapitel mit dem kleinsten Balken.', '#/training'];
    var modes = [
      ['📖', 'Lernen', 'Alle 12 Kapitel mit Bildern, Merksätzen und Eselsbrücken', '#/lernen', 'A'],
      ['🎯', 'Kapiteltraining', 'Eine Frage pro Bildschirm, sofort mit Rückmeldung', '#/training', 'B'],
      ['🖼️', 'Bildquiz', 'Körperteile erkennen, finden und beschriften', '#/bildquiz', 'C'],
      ['🃏', 'Karteikarten', 'Erst antworten, dann umdrehen', '#/karten', 'D'],
      ['📝', 'Probeprüfung', 'Wie in der Klassenarbeit – Auswertung am Ende', '#/pruefung', 'E'],
      ['📚', 'Fragenkatalog', 'Alle ' + QS.length + ' Fragen nach Lernzielen', '#/katalog', 'F'],
      ['🔁', 'Fehlertraining', 'Stolperstellen und eigene Fehler gezielt üben', '#/fehler', 'G']
    ];
    main.innerHTML = '<div class="page home"><section class="hero"><div class="hero-t"><p class="eyebrow">Sachkunde · Klasse 3 · Der menschliche Körper</p><h1>Hallo Ada! 👋</h1>' +
      '<p>Hier lernst du alles aus deinem Heft – vom Skelett bis zur Sonne. Erst verstehen, dann üben, dann wie in der Klassenarbeit testen.</p></div>' +
      '<div class="ring-w"><svg viewBox="0 0 120 120" class="ring-p"><circle cx="60" cy="60" r="50" class="rbg"/><circle cx="60" cy="60" r="50" class="rfg" style="stroke-dasharray:' + (o.p * 3.1416).toFixed(1) + ' 314.16"/></svg>' +
      '<div class="ring-l"><b>' + o.p + ' %</b><small>sicher</small></div></div></section>' +
      '<a class="reco" href="' + rec[3] + '"><span class="reco-i">' + rec[0] + '</span><span><small>Empfehlung</small><b>' + esc(rec[1]) + '</b><span>' + esc(rec[2]) + '</span></span><span class="go">→</span></a>' +
      '<h2 class="sec">Was möchtest du machen?</h2><div class="modes">' + modes.map(function (m) {
        return '<a class="mode" href="' + m[3] + '"><span class="mi">' + m[0] + '</span><b>' + m[1] + (m[1] === 'Fehlertraining' && nErr ? ' <span class="badge">' + nErr + '</span>' : '') + '</b><span>' + m[2] + '</span></a>';
      }).join('') + '</div>' +
      '<h2 class="sec">Kapitel</h2><div class="kgrid">' + KAP.map(function (k) {
        var s = kapStats(k.id);
        return '<a class="kcard" href="#/lernen/' + k.id + '" style="--c:' + k.color + '"><span class="kn">' + k.nr + '</span>' + icon(k.icon, k.color) + '<b>' + esc(k.title) + '</b>' + bar(s.p, k.color) + '<small>' + s.p + ' % sicher' + (s.errs ? ' · ' + s.errs + ' Fehler offen' : '') + '</small></a>';
      }).join('') + '</div>' +
      '<p class="foot"><a href="#/eltern">Für Eltern: Anleitung, Quellen, Abdeckung & Korrekturen →</a></p></div>';
  }

  function vLernenListe() {
    main.innerHTML = page('📖 Lernen', '<p class="lead">Wähle ein Kapitel. Jedes Kapitel hat Merksätze, Bilder zum Antippen, Eselsbrücken und Hinweise, was genau im Heft steht.</p><div class="kgrid">' + KAP.map(function (k) {
      var s = kapStats(k.id);
      return '<a class="kcard" href="#/lernen/' + k.id + '" style="--c:' + k.color + '"><span class="kn">' + k.nr + '</span>' + icon(k.icon, k.color) + '<b>' + esc(k.title) + '</b>' + bar(s.p, k.color) + '<small>' + esc(srcText(k.src)) + '</small></a>';
    }).join('') + '</div>', '#/');
  }

  function blockHTML(b, k) {
    var src = b.s ? '<span class="srcb">' + esc(srcText(b.s)) + '</span>' : '';
    switch (b.t) {
      case 'p': return '<p class="lp">' + b.h + ' ' + src + '</p>';
      case 'h': return '<h3 class="lh">' + b.h + '</h3>';
      case 'merk': return '<div class="box merk"><div class="bx-t">💡 Merksatz ' + src + '</div>' + b.h + '</div>';
      case 'heft': return '<div class="box heft"><div class="bx-t">📓 So steht es in deinem Heft ' + src + '</div>' + b.h + '</div>';
      case 'extra': return '<div class="box extra"><div class="bx-t">🔬 Extra-Wissen</div>' + b.h + '</div>';
      case 'achtung': return '<div class="box achtung"><div class="bx-t">🔎 Genau hingeschaut ' + src + '</div>' + b.h + '</div>';
      case 'esel': return '<div class="box esel"><div class="bx-t">🧠 Eselsbrücke</div>' + b.h + '</div>';
      case 'stolper': return '<div class="box stolper"><div class="bx-t">⚠️ Stolperstelle</div>' + b.h + '<div><a class="btn small" href="#/fehler/' + b.st + '">Gezielt üben →</a></div></div>';
      case 'alltag': return '<div class="box alltag"><div class="bx-t">🏠 Im Alltag</div>' + b.h + '</div>';
      case 'tryit': return '<div class="box tryit"><div class="bx-t">🖐️ Probier’s aus</div>' + b.h + '</div>';
      case 'versuch': return '<div class="box versuch"><div class="bx-t">🧪 ' + esc(b.title) + ' ' + src + '</div><ol class="vsteps">' + b.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol><p>' + b.h + '</p></div>';
      case 'zahlen': return '<div class="zgrid">' + b.items.map(function (z) { return '<div class="zcard"><b>' + z[0] + '</b><span>' + z[1] + '</span><small>' + z[2] + '</small></div>'; }).join('') + '</div>' + (b.s ? '<p class="srcline">' + src + '</p>' : '');
      case 'table': return '<div class="tblw"><table class="tbl"><thead><tr>' + b.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
        b.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' + (b.s ? '<p class="srcline">' + src + '</p>' : '');
      case 'cards': return '<div class="cgrid' + (b.organ ? ' organ' : '') + '">' + b.items.map(function (c) { return '<div class="ocard"><div class="oc-h"><span class="oi">' + c[0] + '</span><b>' + c[1] + '</b></div><p>' + c[2] + '</p>' + (c[3] ? '<small>' + c[3] + '</small>' : '') + '</div>'; }).join('') + '</div>' + (b.s ? '<p class="srcline">' + src + '</p>' : '');
      case 'steps': return '<ol class="stations">' + b.items.map(function (c) { return '<li><span class="si">' + c[0] + '</span><div><b>' + c[1] + '</b><p>' + c[2] + '</p></div></li>'; }).join('') + '</ol>' + (b.s ? '<p class="srcline">' + src + '</p>' : '');
      case 'chain': return '<div class="chain">' + b.items.map(function (c) { return '<span class="cn">' + esc(c) + '</span>'; }).join('<span class="ca">→</span>') + '</div>';
      case 'szenen': return '<div class="szenen">' + b.items.map(function (c, i) { return '<details class="szene"><summary><span class="oi">' + c[0] + '</span> ' + esc(c[1]) + ' <em>Erkläre es zuerst selbst – dann tippen.</em></summary><p>' + c[2] + '</p></details>'; }).join('') + '</div>';
      case 'diag': return '<div class="diaghost" data-d="' + b.id + '" data-cap="' + esc(b.cap || '') + '"></div>';
      case 'widget': return '<div class="widgethost" data-w="' + b.w + '" data-cap="' + esc(b.cap || '') + '"></div>';
    }
    return '';
  }
  function vKapitel(id) {
    var k = KMAP[id]; if (!k) return vLernenListe();
    S.seen[id] = Date.now(); save();
    var ix = KAP.indexOf(k), prev = KAP[ix - 1], next = KAP[ix + 1];
    var lzHtml = '<div class="lzbox"><div class="bx-t">🎯 Das lernst du in diesem Kapitel</div><ul class="lzl">' + k.lz.map(function (l) {
      var s = lzStats(l[0]), self = S.lzSelf[l[0]];
      return '<li><label><input type="checkbox" data-lz="' + l[0] + '"' + (self ? ' checked' : '') + '><span><b>' + l[0] + '</b> ' + esc(l[1]) + '</span></label>' + bar(s.p, k.color) + '</li>';
    }).join('') + '</ul><p class="hint">Häkchen = „Das kann ich“. Der Balken zeigt, wie viele Fragen dazu du schon richtig hattest.</p></div>';
    main.innerHTML = '<div class="page kap" style="--c:' + k.color + '"><div class="kaphead"><a class="back" href="#/lernen">← Alle Kapitel</a><div class="kh"><span class="kn big">' + k.nr + '</span>' + icon(k.icon, '#fff') +
      '<div><h1>' + esc(k.title) + '</h1><p>Aus deinem Heft: ' + esc(srcText(k.src)) + '</p></div></div></div>' + lzHtml +
      '<article class="blocks">' + k.blocks.map(function (b) { return blockHTML(b, k); }).join('') + '</article>' +
      '<div class="kapend"><h3>Jetzt üben</h3><div class="btnrow"><a class="btn primary" href="#/training/' + k.id + '">🎯 Kapiteltraining</a>' +
      (KAP_DIAGS(k.id).length ? '<a class="btn" href="#/bildquiz/kap-' + k.id + '">🖼️ Bildquiz</a>' : '') + '<a class="btn" href="#/karten/' + k.id + '">🃏 Karteikarten</a></div>' +
      '<div class="pnav">' + (prev ? '<a href="#/lernen/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a href="#/lernen/' + next.id + '">' + esc(next.title) + ' →</a>' : '') + '</div></div></div>';
    $$('.diaghost', main).forEach(function (h) { explorer(h, h.getAttribute('data-d'), h.getAttribute('data-cap')); });
    $$('.widgethost', main).forEach(function (h) { var w = A.widgets && A.widgets[h.getAttribute('data-w')]; if (w) w(h, h.getAttribute('data-cap')); });
    $$('[data-lz]', main).forEach(function (c) { c.addEventListener('change', function () { S.lzSelf[c.getAttribute('data-lz')] = c.checked; save(); }); });
  }
  function KAP_DIAGS(kid) { return Object.keys(DG).filter(function (d) { return DG[d].kap === kid && !DG[d].noQuiz; }); }

  function vTraining(id) {
    if (id) {
      var k = id === 'mix' ? null : KMAP[id];
      var pool = id === 'mix' ? QS.filter(function (q) { return q.t !== 'find'; }) : qsOf(id);
      var go = function () { runQuestions({ title: k ? '🎯 ' + k.title : '🎯 Gemischt', ids: pickRound(pool, 12), back: '#/training', backLabel: 'Training', again: go }); };
      return go();
    }
    main.innerHTML = page('🎯 Kapiteltraining', '<p class="lead">Eine Runde hat 12 Fragen – zuerst kommen neue Fragen und deine Fehler. Du bekommst sofort eine Rückmeldung.</p>' +
      '<a class="mixbtn" href="#/training/mix">🎲 Alle Kapitel gemischt</a><div class="klist">' + KAP.map(function (k) {
        var s = kapStats(k.id);
        return '<a class="krow" href="#/training/' + k.id + '" style="--c:' + k.color + '"><span class="kn">' + k.nr + '</span><span class="kt"><b>' + esc(k.title) + '</b>' + bar(s.p, k.color) +
          '<small>' + s.right + ' von ' + s.total + ' Fragen richtig' + (s.errs ? ' · ' + s.errs + ' offen' : '') + '</small></span><span class="go">→</span></a>';
      }).join('') + '</div>', '#/');
  }

  function vBildquiz(arg) {
    var diags = Object.keys(DG).filter(function (d) { return !DG[d].noQuiz; });
    if (arg) {
      var set = arg.indexOf('kap-') === 0 ? KAP_DIAGS(arg.slice(4)) : (DG[arg] ? [arg] : diags);
      var title = arg.indexOf('kap-') === 0 ? KMAP[arg.slice(4)].title : (DG[arg] ? DG[arg].title : 'Alles gemischt');
      var mode = (location.hash.split('?')[1] || '').replace('m=', '') || 'mix';
      var pool = QS.filter(function (q) {
        if (set.indexOf(q.diag) < 0) return false;
        if (mode === 'name') return q.t === 'imgname' || q.t === 'imgtype';
        if (mode === 'find') return q.t === 'find';
        if (mode === 'label') return q.t === 'label';
        return q.t === 'imgname' || q.t === 'imgtype' || q.t === 'find' || q.t === 'label';
      });
      var go = function () { runQuestions({ title: '🖼️ ' + title, ids: pickRound(pool, 10), back: '#/bildquiz', backLabel: 'Bildquiz', again: go }); };
      return go();
    }
    main.innerHTML = page('🖼️ Bildquiz', '<p class="lead">Ein Teil ist markiert – wie heißt er? Oder: Tippe auf den richtigen Teil. Die Namen sind im Bild versteckt.</p>' +
      '<div class="seg big" id="bqmode"><button class="segb" data-m="mix" aria-pressed="true">Gemischt</button><button class="segb" data-m="name" aria-pressed="false">Was ist markiert?</button><button class="segb" data-m="find" aria-pressed="false">Finde den Teil</button><button class="segb" data-m="label" aria-pressed="false">Beschriften</button></div>' +
      '<div class="dgrid">' + '<a class="dcard all" data-d="alle" href="#/bildquiz/alle">🎲<b>Alles gemischt</b><small>alle Bilder</small></a>' + diags.map(function (d) {
        var n = QS.filter(function (q) { return q.diag === d; }).length, k = KMAP[DG[d].kap];
        return '<a class="dcard" data-d="' + d + '" href="#/bildquiz/' + d + '" style="--c:' + k.color + '"><div class="thumb">' + svgString(d, {}) + '</div><b>' + esc(DG[d].title) + '</b><small>' + n + ' Bildfragen</small></a>';
      }).join('') + '</div>', '#/');
    var m = 'mix';
    $('#bqmode').addEventListener('click', function (e) {
      var b = e.target.closest('.segb'); if (!b) return; m = b.getAttribute('data-m');
      $$('#bqmode .segb').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      $$('.dcard').forEach(function (a) { a.setAttribute('href', '#/bildquiz/' + a.getAttribute('data-d') + (m === 'mix' ? '' : '?m=' + m)); });
    });
  }

  /* ---------- Karteikarten ---------- */
  function vKarten(arg) {
    var cardTypes = { mc: 1, multi: 1, tf: 1, num: 1, short: 1, list: 1, order: 1, match: 1, sort: 1, cloze: 1, text: 1 };
    if (!arg) {
      main.innerHTML = page('🃏 Karteikarten', '<p class="lead">So geht’s: Lies die Frage, <b>antworte zuerst selbst</b> (laut oder aufschreiben) – dann dreh die Karte um und bewerte dich ehrlich. Gewusste Karten wandern ein Fach weiter und kommen seltener.</p>' +
        '<a class="mixbtn" href="#/karten/alle">🎲 Alle Kapitel</a><div class="klist">' + KAP.map(function (k) {
          var cs = QS.filter(function (q) { return q.k === k.id && cardTypes[q.t]; }), known = cs.filter(function (q) { return (S.cards[q.id] || {}).box >= 3; }).length;
          return '<a class="krow" href="#/karten/' + k.id + '" style="--c:' + k.color + '"><span class="kn">' + k.nr + '</span><span class="kt"><b>' + esc(k.title) + '</b>' + bar(pct(known, cs.length), k.color) + '<small>' + known + ' von ' + cs.length + ' Karten gut gewusst</small></span><span class="go">→</span></a>';
        }).join('') + '</div>', '#/');
      return;
    }
    var pool = QS.filter(function (q) { return cardTypes[q.t] && (arg === 'alle' || q.k === arg); });
    pool = shuffle(pool).sort(function (a, b) { return ((S.cards[a.id] || {}).box || 1) - ((S.cards[b.id] || {}).box || 1); }).slice(0, 10);
    var i = 0, tally = { r: 0, t: 0, f: 0 };
    var title = arg === 'alle' ? 'Alle Kapitel' : KMAP[arg].title;
    function show() {
      if (i >= pool.length) {
        main.innerHTML = page('🃏 ' + esc(title), '<div class="result"><div class="big">🃏</div><h2>Runde geschafft!</h2><p>✓ ' + tally.r + ' gewusst · ◐ ' + tally.t + ' teilweise · ✗ ' + tally.f + ' noch nicht</p><div class="btnrow"><a class="btn primary" href="#/karten/' + arg + '?' + Date.now() + '">Nächste 10 Karten</a><a class="btn ghost" href="#/karten">Zurück</a></div></div>', '#/karten');
        return;
      }
      var q = pool[i], box = (S.cards[q.id] || {}).box || 1;
      main.innerHTML = '<div class="runner"><div class="rhead"><a class="back" href="#/karten">← Karteikarten</a><b>' + esc(title) + '</b><span class="rcount">' + (i + 1) + ' / ' + pool.length + '</span></div>' + bar(pct(i, pool.length), KMAP[q.k].color) +
        '<div class="flip"><div class="flip-in"><div class="face front"><div class="qmeta"><span class="kchip" style="--c:' + KMAP[q.k].color + '">' + esc(KMAP[q.k].short) + '</span><span class="qtype">Fach ' + box + ' von 5</span></div><div class="qtext">' +
        (q.t === 'tf' ? 'Stimmt das? <span class="tfq">' + q.q + '</span>' : (q.t === 'cloze' ? q.q.replace(/\[\[[^\]]+\]\]/g, '<span class="gapblank">______</span>') : q.q)) +
        '</div><textarea class="tarea small" rows="2" placeholder="Deine Antwort (oder laut sagen)"></textarea><button class="btn primary wide" data-a="flip">Umdrehen ↻</button></div>' +
        '<div class="face back"><div class="bx-t">Lösung</div><div class="ans">' + answerHTML(q) + '</div>' + (q.ex ? '<p class="fb-ex">💡 ' + q.ex + '</p>' : '') + '<div class="mine"></div>' +
        '<p class="hint">Wie gut wusstest du es?</p><div class="selfrate"><button class="sr sr-r" data-s="r">✓ Gewusst</button><button class="sr sr-t" data-s="t">◐ Teilweise</button><button class="sr sr-f" data-s="f">✗ Nicht gewusst</button></div></div></div></div></div>';
      var fl = $('.flip', main);
      $('[data-a=flip]', main).addEventListener('click', function () {
        var mine = $('.front textarea', main).value.trim();
        if (mine) $('.mine', main).innerHTML = '<span class="lbl2">Deine Antwort</span>' + esc(mine);
        fl.classList.add('turned');
      });
      $('.back .selfrate', main).addEventListener('click', function (e) {
        var b = e.target.closest('.sr'); if (!b) return;
        var s = b.getAttribute('data-s'); tally[s]++;
        var c = S.cards[q.id] || { box: 1 };
        c.box = s === 'r' ? Math.min(5, c.box + 1) : (s === 't' ? c.box : 1); c.ts = Date.now();
        S.cards[q.id] = c;
        record(q, { status: s, score: s === 'r' ? 1 : (s === 't' ? 0.5 : 0) });
        i++; show(); window.scrollTo(0, 0);
      });
    }
    show();
  }

  /* ---------- Probeprüfung ---------- */
  var PROBE_PDF = ['sk02', 'sk06', 'sk10', 'sk36', 'sk31', 'ws16', 'ws12', 'ws13', 'ws07', 'ws04', 'sk17', 'sk18', 'sk21', 'sk22', 'ge22', 'ge15', 'ge11', 'mu22', 'mu05', 'mu14',
    'or01', 'or05', 'bl03', 'or14', 'or16', 'bl12', 'bl07', 'bl20', 'at03', 'at07', 'at12', 'at17', 've02', 've06', 've12', 've16', 'ha01', 'ha05', 'ha10', 'ha13', 'ha15', 'ha21', 'ha18',
    'wa05', 'wa13', 'so02', 'so05', 'so09', 'so14', 'tr04', 'tr03', 'tr02', 'tr05'];
  function examSet(n) {
    var per = n <= 12 ? 1 : (n <= 24 ? 2 : 3), out = [];
    KAP.forEach(function (k) {
      var pool = shuffle(qsOf(k.id).filter(function (q) { return q.t !== 'find'; }));
      var texts = pool.filter(function (q) { return q.t === 'text'; }), imgs = pool.filter(function (q) { return q.auto || q.t === 'label'; });
      var closed = pool.filter(function (q) { return q.t !== 'text' && !q.auto && q.t !== 'label'; });
      var take = closed.slice(0, per);
      if (imgs.length && Math.random() < 0.45) take[take.length - 1] = imgs[0]; // höchstens eine Bildfrage pro Kapitel
      if (texts.length && Math.random() < (per >= 2 ? 0.55 : 0.3)) take[0] = texts[0];
      take.forEach(function (q) { if (q && out.indexOf(q) < 0) out.push(q); });
    });
    var rest = shuffle(QS.filter(function (q) { return out.indexOf(q) < 0 && q.auto && q.t !== 'find'; })).concat(shuffle(QS.filter(function (q) { return out.indexOf(q) < 0 && !q.auto; })));
    while (out.length < n && rest.length) out.push(rest.pop());
    out = out.slice(0, n);
    out.sort(function (a, b) { return KAP.indexOf(KMAP[a.k]) - KAP.indexOf(KMAP[b.k]); });
    return out.map(function (q) { return q.id; });
  }
  function vPruefung() {
    main.innerHTML = page('📝 Probeprüfung', '<p class="lead">Wie in der Klassenarbeit: Du bekommst Fragen aus <b>allen</b> Kapiteln, aber <b>noch keine Lösungen</b>. Erst am Ende wird ausgewertet. Freitext-Antworten vergleichst du dann mit der Musterlösung.</p>' +
      '<div class="pgrid"><button class="pcard" data-n="12"><b>Kurz</b><span>12 Fragen · ca. 15 Min.</span></button><button class="pcard" data-n="24"><b>Normal</b><span>24 Fragen · ca. 30 Min.</span></button>' +
      '<button class="pcard" data-n="40"><b>Lang</b><span>40 Fragen · ca. 50 Min.</span></button><button class="pcard pdf" data-n="pdf"><b>Probearbeit wie im PDF</b><span>alle 48 Aufgaben, Teil 1–6 (meist Erklär-Fragen)</span></button></div>' +
      (S.exams.length ? '<h2 class="sec">Deine bisherigen Probeprüfungen</h2><ul class="hist">' + S.exams.slice(-8).reverse().map(function (e) {
        return '<li><span>' + new Date(e.ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }) + ' · ' + esc(e.name) + '</span><b>' + e.pct + ' %</b>' + bar(e.pct) + '</li>';
      }).join('') + '</ul>' : '') +
      '<p class="hint">Hinweis: Die App gibt bewusst keine Schulnote an – deine Lehrkraft hat einen eigenen Bewertungsschlüssel.</p>', '#/');
    $$('.pcard', main).forEach(function (b) {
      b.addEventListener('click', function () {
        var n = b.getAttribute('data-n');
        startExam(n === 'pdf' ? PROBE_PDF.slice() : examSet(+n), n === 'pdf' ? 'Probearbeit (PDF)' : (n === '12' ? 'Kurz' : n === '24' ? 'Normal' : 'Lang'));
      });
    });
  }
  function startExam(ids, name) {
    var list = ids.map(function (id) { return QMAP[id]; }).filter(Boolean), answers = {}, i = 0, ctl = null;
    function store() { if (ctl) answers[list[i].id] = ctl.get(); }
    function filled(q) { var r = answers[q.id]; if (r == null) return false; if (Array.isArray(r)) return r.some(function (x) { return x != null && x !== ''; }); if (typeof r === 'object') return !!(r.text && r.text.trim()); return String(r).trim() !== ''; }
    function show() {
      var q = list[i];
      main.innerHTML = '<div class="runner exam"><div class="rhead"><button class="back linkbtn" data-a="quit">✕ Abbrechen</button><b>📝 Probeprüfung · ' + esc(name) + '</b><span class="rcount">' + (i + 1) + ' / ' + list.length + '</span></div>' +
        '<div class="qhost"></div><div class="rfoot"><button class="btn ghost" data-a="prev"' + (i ? '' : ' disabled') + '>← Zurück</button>' +
        (i + 1 < list.length ? '<button class="btn primary" data-a="next">Weiter →</button>' : '<button class="btn primary" data-a="submit">Abgeben ✓</button>') + '</div>' +
        '<div class="dots">' + list.map(function (x, n) { return '<button class="ed' + (n === i ? ' cur' : '') + (filled(x) ? ' fill' : '') + '" data-n="' + n + '" aria-label="Frage ' + (n + 1) + '">' + (n + 1) + '</button>'; }).join('') + '</div>' +
        (i + 1 < list.length ? '<p class="center"><button class="linkbtn" data-a="submit">Jetzt abgeben</button></p>' : '') + '</div>';
      ctl = renderQ(q, $('.qhost', main), { mode: 'exam', resp: answers[q.id] != null ? answers[q.id] : null, onChange: function () { var d = $('.ed.cur', main); if (d) d.classList.toggle('fill', filled(q) || true); } });
      $('.rfoot', main).addEventListener('click', function (e) {
        var b = e.target.closest('[data-a]'); if (!b) return; store();
        var a = b.getAttribute('data-a');
        if (a === 'prev') { i--; show(); } else if (a === 'next') { i++; show(); } else if (a === 'submit') submit();
        window.scrollTo(0, 0);
      });
      $('.dots', main).addEventListener('click', function (e) { var b = e.target.closest('.ed'); if (!b) return; store(); i = +b.getAttribute('data-n'); show(); });
      $$('[data-a=submit]', main).forEach(function (b) { if (!b.closest('.rfoot')) b.addEventListener('click', function () { store(); submit(); }); });
      $('[data-a=quit]', main).addEventListener('click', function () { if (window.confirm('Probeprüfung abbrechen? Deine Antworten gehen verloren.')) location.hash = '#/pruefung'; });
    }
    function submit() {
      var open = list.filter(function (q) { return !filled(q); }).length;
      if (open && !window.confirm(open + ' Frage(n) sind noch leer. Trotzdem abgeben?')) return;
      var texts = list.filter(function (q) { return q.t === 'text' && filled(q); }), ti = 0, selfRes = {}; // leere Erklär-Antworten zählen automatisch 0 Punkte
      function rateNext() {
        if (ti >= texts.length) return results(selfRes);
        var q = texts[ti];
        main.innerHTML = page('📝 Auswertung: Erklär-Fragen', '<p class="lead">Vergleiche deine Antwort mit der Musterlösung und bewerte dich ehrlich (' + (ti + 1) + ' von ' + texts.length + ').</p><div class="qhost"></div>', null);
        var c = renderQ(q, $('.qhost', main), { mode: 'review', resp: answers[q.id] || { text: '' } });
        var mine = (answers[q.id] && answers[q.id].text || '').trim();
        $('.qbody', main).innerHTML = '<div class="fb-a"><span class="lbl2">Deine Antwort</span>' + (mine ? esc(mine) : '<i>(leer gelassen)</i>') + '</div>';
        c.reveal(function (res) { selfRes[q.id] = res; setTimeout(function () { ti++; rateNext(); window.scrollTo(0, 0); }, 450); });
      }
      rateNext();
    }
    function results(selfRes) {
      var pts = 0, max = 0, byK = {}, rows = [];
      list.forEach(function (q) {
        var res = q.t === 'text' ? (selfRes[q.id] || { score: 0, status: 'f' }) : EN.grade(q, answers[q.id], CTX);
        if (res.empty && q.t !== 'text') res = { score: 0, status: 'f', empty: true };
        var e = EN.earned(q, res.score), m = E_POINTS(q);
        pts += e; max += m;
        byK[q.k] = byK[q.k] || { p: 0, m: 0 }; byK[q.k].p += e; byK[q.k].m += m;
        record(q, res);
        rows.push({ q: q, res: res, e: e, m: m });
      });
      var p = pct(pts, max);
      S.exams.push({ ts: Date.now(), name: name, pts: pts, max: max, pct: p }); save();
      var label = p >= 90 ? 'Super sicher! 🏆' : (p >= 75 ? 'Gut dabei! 🌟' : (p >= 50 ? 'Auf einem guten Weg 💪' : 'Weiter üben – du schaffst das! 🌱'));
      var weak = KAP.filter(function (k) { return byK[k.id] && pct(byK[k.id].p, byK[k.id].m) < 80; });
      main.innerHTML = page('📝 Ergebnis', '<div class="result"><h2>' + pts + ' von ' + max + ' Punkten · ' + p + ' %</h2><p class="muted">' + label + '</p>' + bar(p) +
        '<p class="hint">Keine Schulnote: Deine Lehrkraft hat einen eigenen Bewertungsschlüssel. Nimm die Prozente als Orientierung.</p></div>' +
        '<h2 class="sec">Nach Themen</h2><div class="tbars">' + KAP.filter(function (k) { return byK[k.id]; }).map(function (k) {
          var pp = pct(byK[k.id].p, byK[k.id].m);
          return '<div class="tb"><span>' + esc(k.short) + '</span>' + bar(pp, k.color) + '<b>' + pp + ' %</b></div>';
        }).join('') + '</div>' +
        (weak.length ? '<div class="box achtung"><div class="bx-t">📌 Wiederholungsbedarf</div>' + weak.map(function (k) { return '<a class="btn small" href="#/lernen/' + k.id + '">' + esc(k.title) + '</a>'; }).join(' ') + '</div>' : '') +
        '<div class="btnrow"><a class="btn primary" href="#/fehler">🔁 Fehler jetzt üben</a><a class="btn" href="#/pruefung">Neue Probeprüfung</a></div>' +
        '<h2 class="sec">Alle Aufgaben mit Lösung</h2><ol class="exrev">' + rows.map(function (r) {
          var ic = r.res.status === 'r' ? '✓' : (r.res.status === 't' ? '◐' : '✗');
          return '<li class="er er-' + r.res.status + '"><details><summary><span class="eri">' + ic + '</span><span>' + esc(strip(r.q.q)).slice(0, 140) + '</span><b>' + r.e + '/' + r.m + '</b></summary><div class="fb-a"><span class="lbl2">Lösung</span>' + answerHTML(r.q) + '</div>' + (r.q.ex ? '<p class="fb-ex">💡 ' + r.q.ex + '</p>' : '') + '</details></li>';
        }).join('') + '</ol>', '#/pruefung');
    }
    show();
  }

  /* ---------- Fragenkatalog ---------- */
  function catalogOrder() {
    var out = [];
    KAP.forEach(function (k) { k.lz.forEach(function (l) { QS.forEach(function (q) { if (q.k === k.id && q.lz === l[0] && !q.auto) out.push(q.id); }); }); });
    KAP.forEach(function (k) { QS.forEach(function (q) { if (q.k === k.id && q.auto) out.push(q.id); }); });
    return out;
  }
  function vKatalog(arg) {
    var ORD = catalogOrder();
    if (arg === 'alle') {
      var start = Math.min(S.kat || 0, ORD.length - 1);
      if (start >= ORD.length - 1) start = 0;
      return runQuestions({ title: '📚 Ganzer Katalog', ids: ORD, start: start, back: '#/katalog', backLabel: 'Katalog', onProgress: function (n) { S.kat = n; save(); }, onFinish: function () { S.kat = 0; save(); } });
    }
    if (arg && KMAP[arg]) return runQuestions({ title: '📚 ' + KMAP[arg].title, ids: ORD.filter(function (id) { return QMAP[id].k === arg; }), back: '#/katalog', backLabel: 'Katalog' });
    if (arg && LZ[arg]) return runQuestions({ title: '📚 Lernziel ' + arg, ids: ORD.filter(function (id) { return QMAP[id].lz === arg; }), back: '#/katalog', backLabel: 'Katalog' });
    var o = overall();
    function stIcon(id) { var s = st(id); return !s ? '<span class="sti n" title="neu">○</span>' : (s.last === 'r' ? '<span class="sti r" title="richtig">✓</span>' : (s.last === 't' ? '<span class="sti t" title="teilweise">◐</span>' : '<span class="sti f" title="falsch">✗</span>')); }
    main.innerHTML = page('📚 Fragenkatalog', '<p class="lead">Alle <b>' + QS.length + '</b> Fragen, geordnet nach Kapiteln und Lernzielen. Jedes Lernziel kommt mindestens einmal vor, wichtige Themen mehrfach mit anderen Worten. Davon sind ' + QS.filter(function (q) { return q.auto; }).length + ' Bildfragen.</p>' +
      '<div class="stat3"><div><b>' + o.seen + '</b><span>bearbeitet</span></div><div><b>' + o.right + '</b><span>zuletzt richtig</span></div><div><b>' + Object.keys(S.err).length + '</b><span>offene Fehler</span></div></div>' +
      '<a class="mixbtn" href="#/katalog/alle">▶ Ganzen Katalog der Reihe nach' + (S.kat ? ' (weiter bei Frage ' + (S.kat + 1) + ')' : '') + '</a>' +
      KAP.map(function (k) {
        var qk = ORD.filter(function (id) { return QMAP[id].k === k.id; });
        return '<details class="katk" style="--c:' + k.color + '"><summary><span class="kn">' + k.nr + '</span><b>' + esc(k.title) + '</b><small>' + qk.length + ' Fragen</small></summary>' +
          '<p><a class="btn small" href="#/katalog/' + k.id + '">Alle ' + qk.length + ' Fragen üben</a></p>' +
          k.lz.map(function (l) {
            var ql = qk.filter(function (id) { return QMAP[id].lz === l[0] && !QMAP[id].auto; }), qa = qk.filter(function (id) { return QMAP[id].lz === l[0] && QMAP[id].auto; });
            return '<div class="katlz"><div class="katlz-h"><b>' + l[0] + '</b> ' + esc(l[1]) + ' <a class="linkbtn" href="#/katalog/' + l[0] + '">üben (' + (ql.length + qa.length) + ')</a></div><ul class="katq">' +
              ql.map(function (id) { var q = QMAP[id]; return '<li>' + stIcon(id) + '<details><summary><span class="qtl">' + TYPE_LABEL[q.t] + '</span> ' + esc(strip(q.q)) + (q.st ? ' <span class="stchip">⚠️</span>' : '') + '</summary><div class="fb-a"><span class="lbl2">Lösung</span>' + answerHTML(q) + '</div>' + (q.src ? '<small class="qsrc">' + esc(srcText(q.src)) + '</small>' : '') + '</details></li>'; }).join('') +
              (qa.length ? '<li class="katimg">🖼️ ' + qa.length + ' Bildfragen zu diesem Lernziel</li>' : '') + '</ul></div>';
          }).join('') + '</details>';
      }).join(''), '#/');
  }

  /* ---------- Fehlertraining ---------- */
  function vFehler(arg) {
    if (arg && arg.indexOf('S') === 0) {
      var stp = A.stolper.filter(function (x) { return x.id === arg; })[0];
      if (stp) return runQuestions({ title: '⚠️ ' + stp.title, ids: shuffle(QS.filter(function (q) { return q.st === arg; }).map(function (q) { return q.id; })), back: '#/fehler', backLabel: 'Fehlertraining' });
    }
    if (arg === 'stolper') return runQuestions({ title: '⚠️ Alle Stolperstellen', ids: pickRound(QS.filter(function (q) { return q.st; }), 15), back: '#/fehler', backLabel: 'Fehlertraining' });
    var errIds = Object.keys(S.err).filter(function (id) { return QMAP[id]; }).sort(function (a, b) { return S.err[b].c - S.err[a].c; });
    if (arg === 'alle') return runQuestions({ title: '🔁 Meine Fehler', ids: errIds.slice(0, 15), back: '#/fehler', backLabel: 'Fehlertraining' });
    if (arg && KMAP[arg]) return runQuestions({ title: '🔁 Fehler: ' + KMAP[arg].title, ids: errIds.filter(function (id) { return QMAP[id].k === arg; }), back: '#/fehler', backLabel: 'Fehlertraining' });
    main.innerHTML = page('🔁 Fehlertraining', '<p class="lead">Hier übst du gezielt das, was noch wackelt. Eine Frage verschwindet aus deiner Fehlerliste, wenn du sie <b>zweimal hintereinander richtig</b> beantwortest.</p>' +
      '<h2 class="sec">⚠️ Adas Stolperstellen</h2><p class="hint">Diese Punkte waren im Heft oder beim Üben schon einmal schwierig. Sie sind von Anfang an dabei.</p>' +
      '<a class="mixbtn" href="#/fehler/stolper">🎲 Alle Stolperstellen gemischt</a><div class="stgrid">' + A.stolper.map(function (x) {
        var qs = QS.filter(function (q) { return q.st === x.id; }), ok = qs.filter(function (q) { var s = st(q.id); return s && s.last === 'r'; }).length;
        return '<a class="stcard" href="#/fehler/' + x.id + '" style="--c:' + KMAP[x.kap].color + '"><b>' + esc(x.title) + '</b><span>' + esc(x.text) + '</span>' + bar(pct(ok, qs.length), KMAP[x.kap].color) + '<small>' + ok + ' von ' + qs.length + ' Fragen sicher</small></a>';
      }).join('') + '</div>' +
      '<h2 class="sec">🔁 Meine Fehler (' + errIds.length + ')</h2>' + (errIds.length ? '<a class="mixbtn" href="#/fehler/alle">▶ Fehler üben (bis zu 15)</a>' : '<p class="muted">Noch keine offenen Fehler. Super – oder du hast noch nicht geübt. 😉</p>') +
      '<h2 class="sec">📊 Fortschritt nach Thema</h2><div class="tbars">' + KAP.map(function (k) {
        var s = kapStats(k.id);
        return '<div class="tb"><span>' + esc(k.short) + '</span>' + bar(s.p, k.color) + '<b>' + s.p + ' %</b>' + (s.errs ? '<a class="linkbtn" href="#/fehler/' + k.id + '">' + s.errs + ' Fehler üben</a>' : '<em></em>') + '</div>';
      }).join('') + '</div>', '#/');
  }

  /* ---------- Eltern ---------- */
  function vEltern() {
    var lzCount = {}; QS.forEach(function (q) { lzCount[q.lz] = (lzCount[q.lz] || 0) + 1; });
    var missing = Object.keys(LZ).filter(function (l) { return !lzCount[l]; });
    var o = overall();
    var probe = {}; QS.forEach(function (q) { if (q.p) (probe[q.p] = probe[q.p] || []).push(q.id); });
    main.innerHTML = page('👪 Für Eltern', '<nav class="toc"><a href="#el-anl">Anleitung</a><a href="#el-fort">Fortschritt</a><a href="#el-mat">Abdeckungsmatrix</a><a href="#el-probe">Probearbeit-Abgleich</a><a href="#el-korr">Korrekturen</a><a href="#el-q">Quellen</a><a href="#el-dat">Daten</a></nav>' +
      '<section id="el-anl" class="esec"><h2>Kurzanleitung</h2><ol class="plan">' +
      '<li><b>Lernen</b> (📖): ein Kapitel lesen, die Bilder antippen (Namen an/aus zum Selbstabfragen), Merksätze laut vorlesen.</li>' +
      '<li><b>Kapiteltraining</b> (🎯): 12 Fragen pro Runde mit sofortiger Rückmeldung; neue Fragen und Fehler kommen zuerst.</li>' +
      '<li><b>Bildquiz</b> (🖼️): Teile erkennen, auf dem Bild finden und Bilder wie im Heft beschriften (Skelett, Muskeln 1–8, Organe, Luftweg 1–5, Haut).</li>' +
      '<li><b>Karteikarten</b> (🃏): erst antworten, dann umdrehen und ehrlich bewerten (Lernkartei mit 5 Fächern).</li>' +
      '<li><b>Probeprüfung</b> (📝): 12/24/40 zufällige Fragen aus allen Kapiteln ohne Zwischenlösungen – oder alle 48 Aufgaben der Probe-Klassenarbeit (PDF).</li>' +
      '<li><b>Fehlertraining</b> (🔁): Adas 14 bekannte Stolperstellen sind von Beginn an hinterlegt; falsche und teilweise richtige Antworten landen automatisch dort.</li></ol>' +
      '<p><b>Vorschlag für die letzten Tage vor der Arbeit:</b> pro Tag 2–3 Kapitel lernen + je eine Trainingsrunde, danach 10 Minuten Fehlertraining. Am Vortag eine Probeprüfung „Normal“ und die Stolperstellen. Freitext-Fragen am besten gemeinsam bewerten – laut erklären lassen hilft sehr.</p>' +
      '<p><b>Bewertung:</b> Auswahl-, Zahl-, Begriffs-, Reihenfolge-, Zuordnungs-, Lückentext- und Bildaufgaben werden automatisch bewertet (Teilpunkte möglich; kleine Tippfehler bei Fachbegriffen werden akzeptiert und mit richtiger Schreibweise angezeigt). Erklär-Fragen werden mit Musterlösung und Stichpunkten selbst bewertet (richtig/teilweise/falsch). Es wird keine Schulnote angezeigt.</p></section>' +
      '<section id="el-fort" class="esec"><h2>Fortschritt</h2><p>' + o.seen + ' von ' + o.total + ' Fragen bearbeitet, ' + o.right + ' zuletzt richtig · ' + Object.keys(S.err).length + ' offene Fehler · ' + S.exams.length + ' Probeprüfungen.</p>' +
      '<div class="tblw"><table class="tbl"><thead><tr><th>Kapitel</th><th>Fragen</th><th>bearbeitet</th><th>richtig</th><th>offene Fehler</th></tr></thead><tbody>' + KAP.map(function (k) {
        var s = kapStats(k.id); return '<tr><td>' + k.nr + '. ' + esc(k.title) + '</td><td>' + s.total + '</td><td>' + s.seen + '</td><td>' + s.right + ' (' + s.p + ' %)</td><td>' + s.errs + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<details><summary>Lernziele im Detail (' + Object.keys(LZ).length + ')</summary><div class="tblw"><table class="tbl"><thead><tr><th>LZ</th><th>Lernziel</th><th>Fragen</th><th>richtig</th><th>„kann ich“</th></tr></thead><tbody>' +
      Object.keys(LZ).map(function (l) { var s = lzStats(l); return '<tr><td>' + l + '</td><td>' + esc(LZ[l].text) + '</td><td>' + s.total + '</td><td>' + s.p + ' %</td><td>' + (S.lzSelf[l] ? '✓' : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div></details></section>' +
      '<section id="el-mat" class="esec"><h2>Abdeckungsmatrix</h2><p>Jede Seite der beiden Hefte → Lernziele → Lernansicht → Anzahl Fragen. ' +
      (missing.length ? '<b>Achtung: Lernziele ohne Frage: ' + missing.join(', ') + '</b>' : 'Alle ' + Object.keys(LZ).length + ' Lernziele haben mindestens eine Frage (insgesamt ' + QS.length + ' Fragen, davon ' + QS.filter(function (q) { return q.auto; }).length + ' automatisch erzeugte Bildfragen).') + '</p>' +
      '<div class="tblw"><table class="tbl mat"><thead><tr><th>Quelle</th><th>Inhalt</th><th>Lernziele</th><th>Lernansicht</th><th>Fragen</th></tr></thead><tbody>' + A.quellen.map(function (r) {
        var n = 0; r[3].forEach(function (l) { n += lzCount[l] || 0; });
        return '<tr><td>' + (r[0] === 'H1' ? 'Heft 1' : 'Heft 2') + ', S. ' + r[1] + '</td><td>' + esc(r[2]) + '</td><td>' + (r[3].length ? r[3].map(function (l) { return '<span title="' + esc(LZ[l] ? LZ[l].text : '') + '">' + l + '</span>'; }).join(', ') : '–') + '</td><td>' +
          (r[4] ? '<a href="#/lernen/' + r[4] + '">' + esc(KMAP[r[4]].title) + '</a>' : '–') + '</td><td>' + (r[3].length ? n : '–') + '</td></tr>';
      }).join('') + '</tbody></table></div></section>' +
      '<section id="el-probe" class="esec"><h2>Abgleich mit der Probe-Klassenarbeit (PDF)</h2><p>Alle 48 Aufgaben der Probearbeit sind im Katalog enthalten (zum Teil mehrfach in anderer Form). Die Lösungen im PDF stimmen mit dem Heft überein.</p><div class="pgridm">' +
      Object.keys(probe).sort().map(function (p) { return '<span title="' + esc(probe[p].join(', ')) + '"><b>' + p.replace('P', '') + '</b> ' + probe[p].length + '×</span>'; }).join('') + '</div></section>' +
      '<section id="el-korr" class="esec"><h2>Korrigierte, vereinfachte und uneindeutige Angaben</h2><p>Unterrichtsangaben wurden nicht stillschweigend geändert. In der App sind sie so markiert: 📓 „So steht es in deinem Heft“, 🔬 „Extra-Wissen“ (fachliche Ergänzung), 🔎 „Genau hingeschaut“ (Vereinfachung/Korrektur).</p>' +
      '<div class="tblw"><table class="tbl"><thead><tr><th>Art</th><th>Quelle</th><th>Angabe</th><th>Einordnung</th></tr></thead><tbody>' + A.korrekturen.map(function (r) {
        return '<tr><td><span class="tag">' + esc(r[0]) + '</span></td><td>' + esc(srcText(r[1])) + '</td><td>' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td></tr>';
      }).join('') + '</tbody></table></div></section>' +
      '<section id="el-q" class="esec"><h2>Quellen</h2><ul><li><b>Heft 1</b>: ' + esc(A.hefte.H1.lang) + '</li><li><b>Heft 2</b>: ' + esc(A.hefte.H2.lang) + '</li><li>Probe-Klassenarbeit und Lösungen (PDF, zum Abgleich)</li></ul>' +
      '<p>Fachliche Abgleiche (nur für Zweifelsfälle; die App selbst braucht kein Internet):</p><ul class="wq">' + A.webquellen.map(function (w) { return '<li>' + esc(w[0]) + '<br><a href="' + esc(w[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(w[1]) + '</a></li>'; }).join('') + '</ul>' +
      '<p>Alle Grafiken sind selbst gezeichnete, schematische SVG-Grafiken nach dem Aufbau der Heftbilder (keine Kopien der Arbeitsblätter).</p></section>' +
      '<section id="el-dat" class="esec"><h2>Daten</h2><p>Der Fortschritt wird nur lokal in diesem Browser gespeichert – kein Login, keine Datenübertragung. ' +
      (storageOK ? 'Speichern ist aktiv.' : '<b>Speichern ist in diesem Browser gesperrt</b> (z. B. privates Fenster) – die App funktioniert trotzdem, der Fortschritt gilt aber nur bis zum Schließen.') + '</p>' +
      '<button class="btn danger" data-a="reset">Fortschritt zurücksetzen</button></section>', '#/');
    $('[data-a=reset]', main).addEventListener('click', function () {
      if (!window.confirm('Wirklich den ganzen Fortschritt löschen (Antworten, Fehlerliste, Karteikarten, Probeprüfungen)?')) return;
      S = defaults(); save();
      try { window.localStorage.removeItem(KEY); } catch (e) { }
      location.hash = '#/'; route();
    });
    $$('.toc a', main).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var t = $(a.getAttribute('href'), main); if (t) t.scrollIntoView({ behavior: 'smooth' }); }); });
  }

  /* ================= Router ================= */
  function route() {
    var h = location.hash.replace(/^#\/?/, '').split('?')[0], p = h.split('/');
    var v = p[0] || '', a = p[1];
    document.body.setAttribute('data-view', v || 'start');
    try {
      if (!v) vStart();
      else if (v === 'lernen') a ? vKapitel(a) : vLernenListe();
      else if (v === 'training') vTraining(a);
      else if (v === 'bildquiz') vBildquiz(a);
      else if (v === 'karten') vKarten(a);
      else if (v === 'pruefung') vPruefung();
      else if (v === 'katalog') vKatalog(a);
      else if (v === 'fehler') vFehler(a);
      else if (v === 'eltern') vEltern();
      else vStart();
    } catch (e) {
      main.innerHTML = '<div class="page"><div class="box achtung"><div class="bx-t">Ups – da ist etwas schiefgelaufen.</div><p>' + esc(e.message) + '</p><a class="btn" href="#/">Zur Startseite</a></div></div>';
      if (window.console) console.error(e);
    }
    window.scrollTo(0, 0);
    showStorageNote();
  }

  function init() {
    main = document.getElementById('main');
    window.addEventListener('hashchange', route);
    route();
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) || location.protocol === 'file:') {
      window.__atlas = { A: A, S: function () { return S; }, QS: QS, QMAP: QMAP, CTX: CTX, grade: function (id, r) { return EN.grade(QMAP[id], r, CTX); }, route: route, svgString: svgString, highlight: highlight, examSet: examSet, PROBE_PDF: PROBE_PDF, catalogOrder: catalogOrder };
    }
  }
  A.app = { init: init, QS: QS, QMAP: QMAP, KMAP: KMAP, LZ: LZ, CTX: CTX, catalogOrder: catalogOrder, PROBE_PDF: PROBE_PDF, examSet: examSet };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window.ATLAS = window.ATLAS || {});
