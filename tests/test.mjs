// Prüft Inhalte und Bewertungslogik ohne Browser: node tests/test.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const ctx = { window: {}, console };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ['engine.js', 'data-kapitel.js', 'data-fragen.js', 'diagrams.js']) vm.runInContext(readFileSync(join(dir, f), 'utf8'), ctx, { filename: f });
const A = ctx.window.ATLAS, E = ctx.window.ENGINE;

let fails = 0, checks = 0;
function ok(cond, msg) { checks++; if (!cond) { fails++; console.log('✗ ' + msg); } }

/* ---------- Struktur ---------- */
const K = {}; A.kapitel.forEach((k) => (K[k.id] = k));
const LZ = {}; A.kapitel.forEach((k) => k.lz.forEach((l) => (LZ[l[0]] = k.id)));
const Q = A.fragen, ids = new Set();
Q.forEach((q) => {
  ok(!ids.has(q.id), 'doppelte Frage-ID ' + q.id); ids.add(q.id);
  ok(K[q.k], q.id + ': Kapitel unbekannt ' + q.k);
  ok(LZ[q.lz] === q.k, q.id + ': Lernziel ' + q.lz + ' passt nicht zu Kapitel ' + q.k);
  ok(q.src, q.id + ': Quelle fehlt');
  ok(typeof q.q === 'string' && q.q.length > 5, q.id + ': Fragetext fehlt');
  if (q.t === 'mc') ok(q.o.length >= 2 && q.a === 0 && new Set(q.o).size === q.o.length, q.id + ': mc-Optionen');
  if (q.t === 'multi') ok(q.a.length >= 1 && q.a.every((i) => i < q.o.length) && q.a.length < q.o.length, q.id + ': multi');
  if (q.t === 'tf') ok(typeof q.a === 'boolean', q.id + ': tf');
  if (q.t === 'num') ok(typeof q.a === 'number', q.id + ': num');
  if (q.t === 'short') ok(typeof q.a === 'string' && q.a, q.id + ': short');
  if (q.t === 'list') ok(q.n >= 1 && q.items.length >= q.n && q.items.every((it) => it[0] && it[1].length), q.id + ': list');
  if (q.t === 'order') ok(q.items.length >= 3 && new Set(q.items).size === q.items.length, q.id + ': order');
  if (q.t === 'match') ok(q.pairs.length >= 2 && new Set(q.pairs.map((p) => p[1])).size === q.pairs.length, q.id + ': match rechts doppelt');
  if (q.t === 'sort') ok(q.items.every((it) => it[1] >= 0 && it[1] < q.cats.length), q.id + ': sort');
  if (q.t === 'cloze') ok(E.clozeGaps(q.q).length >= 1, q.id + ': cloze ohne Lücke');
  if (q.t === 'text') ok(q.a && q.kp && q.kp.length >= 1, q.id + ': text ohne Musterlösung/Stichpunkte');
  if (q.t === 'label') { const d = A.diagramme[q.diag]; ok(d && q.parts.every((p) => d.parts.some((x) => x.id === p)), q.id + ': label-Teile'); }
  if (q.st) ok(A.stolper.some((s) => s.id === q.st), q.id + ': Stolperstelle unbekannt');
});
Object.keys(LZ).forEach((l) => ok(Q.some((q) => q.lz === l), 'Lernziel ohne Frage: ' + l));
A.stolper.forEach((s) => ok(Q.filter((q) => q.st === s.id).length >= 2, 'Stolperstelle mit < 2 Fragen: ' + s.id));
for (let p = 1; p <= 48; p++) { const id = 'P' + String(p).padStart(2, '0'); ok(Q.some((q) => q.p === id), 'Probearbeit-Aufgabe nicht abgedeckt: ' + id); }
A.quellen.forEach((r) => r[3].forEach((l) => ok(LZ[l], 'Quellenmatrix: unbekanntes Lernziel ' + l)));
for (const [did, d] of Object.entries(A.diagramme)) {
  ok(typeof d.render === 'function', did + ': render');
  const s = d.render();
  ok(typeof s === 'string' && s.length > 50, did + ': SVG leer');
  d.parts.forEach((p) => {
    ok(p.name, did + '/' + p.id + ': Name');
    ok(s.includes('data-part="' + p.id + '"'), did + '/' + p.id + ': Teil fehlt im SVG');
    (p.mk || []).forEach((m) => ok(m.length === 4 && m.every((v) => typeof v === 'number' && isFinite(v)), did + '/' + p.id + ': Marker'));
  });
  ok((s.match(/<g/g) || []).length === (s.match(/<\/g>/g) || []).length, did + ': <g> nicht ausgeglichen');
}
K.skelett.blocks.concat(...A.kapitel.map((k) => k.blocks)).forEach((b) => { if (b.t === 'diag') ok(A.diagramme[b.id], 'Block verweist auf unbekannte Grafik ' + b.id); });

/* ---------- Bewertung ---------- */
const QM = {}; Q.forEach((q) => (QM[q.id] = q));
const GL = new Set();
Q.forEach((q) => { if (q.t === 'short') [q.a, ...(q.acc || []), ...(q.half || [])].forEach((s) => GL.add(E.key(s))); if (q.t === 'list') q.items.forEach((it) => GL.add(E.key(it[0]))); });
Object.values(A.diagramme).forEach((d) => d.parts.forEach((p) => [p.name, ...(p.alt || [])].forEach((s) => GL.add(E.key(s)))));
['Speichel', 'Schulter', 'Schalter', 'Wade', 'Brust', 'Oberarm', 'Oberschenkel', 'Wirbel', 'Speiche', 'Elle'].forEach((s) => GL.add(E.key(s)));
const C = { glossary: [...GL] };
const g = (id, r) => E.grade(QM[id], r, C);
const expect = (id, r, st, note) => { const res = g(id, r); ok(res.status === st, `${id} ${JSON.stringify(r)} → ${res.status}, erwartet ${st}${note ? ' (' + note + ')' : ''}`); return res; };

expect('sk07', 'Oberschenkelknochen', 'r');
expect('sk07', 'der Oberschenkelknochen', 'r');
expect('sk07', 'Oberschenkel Knochen', 'r', 'Leerzeichen');
expect('sk07', 'Oberschenkel', 't');
expect('sk07', 'Oberbein', 'f');
expect('sk23', 'Oberbein', 'f');
expect('sk24', 'Wadenbein', 'r');
expect('sk24', 'Wadnbein', 'r', 'Tippfehler');
expect('sk24', 'Wirbelbein', 'f');
expect('sk26', 'Brust', 't');
expect('sk26', 'Brustbein', 'r');
expect('sk25', 'Fußknochen', 't');
expect('sk25', 'Fusswurzelknochen', 'r');
expect('sk27', 'Schalter', 'f');
expect('sk29', 'Schedel', 'r', 'Schreibweise');
expect('sk09', 'Steigbügel', 'r');
expect('sk09', 'Steigbuegel', 'r');
expect('sk09', 'Gehörknöchelchen', 'r');
expect('sk09', 'Amboss', 'f');
expect('ws06', 'doppeltes S', 'r');
expect('ws06', 'ein doppeltes S', 'r');
expect('ws06', 'S', 't');
expect('ws06', 'Kreis', 'f');
expect('sk31', '24', 'r');
expect('sk31', '12 + 12', 'r');
expect('sk31', 'vierundzwanzig', 'r');
expect('sk31', '12', 't');
expect('sk31', '33', 'f');
expect('ws09', 'sieben', 'r');
expect('ws12', '24', 'r');
expect('sk02', ['Halt', 'Schutz', 'Bewegung'], 'r');
expect('sk02', ['stützt den Körper', 'schützt die Organe', 'damit wir uns bewegen'], 'r');
expect('sk02', ['Halt', 'Halt', 'Bewegung'], 't');
expect('sk02', ['', '', ''], 'f');
expect('bl12', ['Sauerstoff', 'Nährstoffe'], 'r');
expect('bl12', ['Sauerstoff', ''], 't');
expect('ha10', ['Oberhaut', 'Lederhaut', 'Unterhaut'], 'r');
expect('ha10', ['Unterhaut', 'Lederhaut', 'Oberhaut'], 't', 'Reihenfolge');
expect('so14', ['Sonnencreme', 'Kappe', 'Sonnenbrille', 'Schatten'], 'r');
expect('mu03', [0, 1], 'r');
expect('mu03', [0], 't');
expect('mu03', [0, 2], 'f');
expect('ws21', [0, 1, 2, 3], 'r');
expect('ge11', [0, 0, 1, 1, 1], 'r');
expect('ge11', [0, 1, 1, 1, 1], 't');
expect('or12', [0, 1, 2, 3, 4, 5, 6, 7], 'r');
expect('or12', [0, 1, 2, 4, 3, 5, 6, 7], 't', 'Magen/Darm vertauscht');
expect('ve01', [0, 1, 2, 3, 4, 5], 'r');
expect('ve01', [0, 1, 2, 4, 3, 5], 't');
expect('ve01', [0, 1], 'f', 'unvollständig');
expect('mu04', ['kürzer', 'dicker', 'Knochen'], 'r');
expect('mu04', ['länger', 'dicker', 'Knochen'], 't');
expect('ws08', ['7', '12', '5', '24'], 'r');
expect('ge18', ['Muskeln', 'Gelenke', 'Knochen'], 'r');
expect('so17', 'Bindehautentzündung', 'r');
expect('mu02', 'durch Sehnen', 'r');
expect('mu13', 'Muskelkater', 'r');
expect('ge09', 'Drehgelenk', 'r');
expect('ge10', 'Klappgelenk', 'r');
expect('at13', 'Zwerchfell', 'r');
expect('or20', 'Schließmuskel', 'r');
ok(E.grade({ t: 'text' }, { self: 't' }).score === 0.5, 'Freitext teilweise = 0,5');
ok(E.matchTerm('Speichel', ['Speiche'], C.glossary).ok === false, 'Speichel darf nicht als Speiche zählen');
ok(E.parseNum('12 + 12') === 24 && E.parseNum('dreiunddreißig') === 33, 'parseNum');
ok(E.earned({ t: 'multi' }, 0.5) === 1, 'Teilpunkte');

const n = Q.length, types = {};
Q.forEach((q) => (types[q.t] = (types[q.t] || 0) + 1));
console.log(`${checks - fails}/${checks} Prüfungen bestanden · ${n} handgeschriebene Fragen · ${Object.keys(LZ).length} Lernziele · Typen: ${JSON.stringify(types)}`);
if (fails) process.exit(1);
