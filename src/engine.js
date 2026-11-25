/* Adas Körper-Atlas – Engine: Normalisierung, Bewertung, Auswahl (läuft im Browser und in Node) */
(function (root) {
  'use strict';
  var E = {};

  /* ---------- Text ---------- */
  E.norm = function (s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[​-‍﻿­]/g, '')
      .replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
      .replace(/[^a-z0-9+]+/g, ' ').replace(/\s+/g, ' ').trim();
  };
  var STOP = ' der die das den dem des ein eine einen einem einer im in am an mit durch ist sind heisst heissen es sie er man zum zur auch noch nur ganz ';
  E.strip = function (n) {
    return n.split(' ').filter(function (w) { return w && STOP.indexOf(' ' + w + ' ') < 0; }).join(' ');
  };
  E.key = function (s) { return E.strip(E.norm(s)); };

  E.lev = function (a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, i, j;
    if (!m) return n; if (!n) return m;
    var prev = new Array(n + 1), cur = new Array(n + 1);
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        var c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
      }
      var t = prev; prev = cur; cur = t;
    }
    return prev[n];
  };

  var NUMW = { null: 0, eins: 1, ein: 1, eine: 1, zwei: 2, drei: 3, vier: 4, fuenf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10,
    elf: 11, zwoelf: 12, dreizehn: 13, vierzehn: 14, fuenfzehn: 15, sechzehn: 16, siebzehn: 17, achtzehn: 18, neunzehn: 19, zwanzig: 20,
    einundzwanzig: 21, zweiundzwanzig: 22, dreiundzwanzig: 23, vierundzwanzig: 24, fuenfundzwanzig: 25, sechsundzwanzig: 26,
    siebenundzwanzig: 27, achtundzwanzig: 28, neunundzwanzig: 29, dreissig: 30, dreiunddreissig: 33, vierunddreissig: 34 };

  /* Zahl aus Eingabe lesen: "24", "vierundzwanzig", "12 + 12", "24 Rippen" */
  E.parseNum = function (s) {
    var raw = String(s == null ? '' : s).replace(/\s+/g, '');
    if (/^\d+(\+\d+)+$/.test(raw)) return raw.split('+').reduce(function (a, b) { return a + parseInt(b, 10); }, 0);
    var n = E.norm(s);
    if (!n) return null;
    var m = n.match(/\d+/);
    if (m) return parseInt(m[0], 10);
    var parts = n.split(' ');
    for (var i = 0; i < parts.length; i++) if (Object.prototype.hasOwnProperty.call(NUMW, parts[i])) return NUMW[parts[i]];
    return null;
  };

  /* Begriff prüfen. accepted: Liste gültiger Antworten. glossary: alle bekannten Fachbegriffe (für Tippfehler-Toleranz). */
  E.matchTerm = function (input, accepted, glossary) {
    var n = E.key(input);
    if (!n) return { ok: false, empty: true };
    var acc = accepted.map(E.key).filter(Boolean);
    var i;
    for (i = 0; i < acc.length; i++) if (n === acc[i]) return { ok: true, exact: true };
    for (i = 0; i < acc.length; i++) if ((' ' + n + ' ').indexOf(' ' + acc[i] + ' ') >= 0) return { ok: true, exact: true };
    var tol = n.length <= 4 ? 0 : (n.length <= 7 ? 1 : 2);
    if (!tol) return { ok: false };
    var bestAcc = 99, bestOther = 99;
    for (i = 0; i < acc.length; i++) bestAcc = Math.min(bestAcc, E.lev(n, acc[i]));
    var g = glossary || [];
    for (i = 0; i < g.length; i++) {
      if (acc.indexOf(g[i]) >= 0) continue;
      var d = E.lev(n, g[i]);
      if (d < bestOther) bestOther = d;
    }
    if (bestAcc <= tol && bestAcc < bestOther) return { ok: true, exact: false };
    return { ok: false };
  };

  /* ---------- Bewertung ---------- */
  /* Ergebnis: {score 0..1, status 'r'|'t'|'f', msg, spelling} */
  function res(score, extra) {
    var o = { score: score, status: score >= 0.999 ? 'r' : (score > 0 ? 't' : 'f') };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  E.points = function (q) {
    if (q.pts) return q.pts;
    return ({ multi: 2, list: 2, order: 2, match: 2, sort: 2, cloze: 2, label: 2, text: 2 })[q.t] || 1;
  };

  E.grade = function (q, r, ctx) {
    var gl = (ctx && ctx.glossary) || [];
    var i, c;
    switch (q.t) {
      case 'mc':
      case 'imgname':
        if (r == null) return res(0, { empty: true });
        return res(r === q.a ? 1 : 0);
      case 'tf':
        if (r == null) return res(0, { empty: true });
        return res(r === q.a ? 1 : 0);
      case 'multi': {
        var sel = r || [];
        if (!sel.length) return res(0, { empty: true });
        var good = 0, bad = 0;
        sel.forEach(function (x) { if (q.a.indexOf(x) >= 0) good++; else bad++; });
        var sc = Math.max(0, good - bad) / q.a.length;
        if (good === q.a.length && bad === 0) sc = 1; else sc = Math.min(sc, 0.99);
        return res(sc);
      }
      case 'num': {
        var v = E.parseNum(r);
        if (v == null) return res(0, { empty: !String(r || '').trim() });
        var ok = [].concat(q.a, q.acc || []);
        if (ok.indexOf(v) >= 0) return res(1);
        if (q.half && q.half.indexOf(v) >= 0) return res(0.5, { msg: q.halfMsg });
        return res(0);
      }
      case 'short':
      case 'imgtype': {
        var accepted = [q.a].concat(q.acc || []);
        var m = E.matchTerm(r, accepted, gl);
        if (m.empty) return res(0, { empty: true });
        if (m.ok) return res(1, { spelling: !m.exact });
        if (q.half) {
          var h = E.matchTerm(r, q.half, []);
          if (h.ok) return res(0.5, { msg: q.halfMsg });
        }
        return res(0);
      }
      case 'list': {
        var arr = r || [];
        var used = {}, hits = [], n = q.n;
        arr.forEach(function (s, idx) {
          var t = E.norm(s);
          if (!t) { hits.push(null); return; }
          var found = -1;
          for (var j = 0; j < q.items.length && found < 0; j++) {
            if (used[j]) continue;
            if (q.ordered && j !== idx) continue;
            var kws = q.items[j][1];
            for (var k = 0; k < kws.length; k++) {
              if (t.indexOf(E.norm(kws[k])) >= 0) { found = j; break; }
            }
          }
          if (found >= 0) { used[found] = true; hits.push(found); } else hits.push(-1);
        });
        c = hits.filter(function (h) { return h != null && h >= 0; }).length;
        if (!arr.some(function (s) { return String(s || '').trim(); })) return res(0, { empty: true, hits: hits });
        return res(Math.min(c, n) / n, { hits: hits });
      }
      case 'order': {
        var seq = r || [];
        if (seq.length < q.items.length) return res(0, { empty: !seq.length, incomplete: true });
        c = 0;
        for (i = 0; i < q.items.length; i++) if (seq[i] === i) c++;
        return res(c / q.items.length);
      }
      case 'match': {
        var mm = r || [];
        c = 0;
        for (i = 0; i < q.pairs.length; i++) if (mm[i] === i) c++;
        if (!mm.some(function (x) { return x != null; })) return res(0, { empty: true });
        return res(c / q.pairs.length);
      }
      case 'sort': {
        var ss = r || [];
        c = 0;
        for (i = 0; i < q.items.length; i++) if (ss[i] === q.items[i][1]) c++;
        if (!ss.some(function (x) { return x != null; })) return res(0, { empty: true });
        return res(c / q.items.length);
      }
      case 'cloze': {
        var gaps = E.clozeGaps(q.q);
        var cc = r || [];
        c = 0;
        for (i = 0; i < gaps.length; i++) {
          var want = gaps[i].map(E.key);
          if (cc[i] != null && want.indexOf(E.key(cc[i])) >= 0) c++;
        }
        if (!cc.some(function (x) { return x != null && x !== ''; })) return res(0, { empty: true });
        return res(c / gaps.length);
      }
      case 'label': {
        var ll = r || [];
        c = 0;
        for (i = 0; i < q.parts.length; i++) if (ll[i] === q.parts[i]) c++;
        if (!ll.some(function (x) { return x; })) return res(0, { empty: true });
        return res(c / q.parts.length);
      }
      case 'find': {
        if (!r || !r.length) return res(0, { empty: true });
        return res(r.indexOf(q.part) >= 0 ? 1 : 0, { tapped: r[0] });
      }
      case 'text': {
        if (!r || !r.self) return res(0, { empty: true, pending: true });
        return res(r.self === 'r' ? 1 : (r.self === 't' ? 0.5 : 0), { self: true });
      }
    }
    return res(0);
  };

  /* Lückentext: "Text [[Wort|Alternative]] Text" → Liste der Lücken */
  E.clozeGaps = function (text) {
    var out = [], re = /\[\[([^\]]+)\]\]/g, m;
    while ((m = re.exec(text))) out.push(m[1].split('|'));
    return out;
  };

  /* ---------- Hilfen ---------- */
  E.shuffle = function (arr, rnd) {
    var a = arr.slice(), r = rnd || Math.random;
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  E.seeded = function (seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  };
  E.earned = function (q, score) { return Math.round(score * E.points(q) * 2) / 2; };

  if (typeof module !== 'undefined' && module.exports) module.exports = E;
  else root.ENGINE = E;
})(typeof window !== 'undefined' ? window : globalThis);
