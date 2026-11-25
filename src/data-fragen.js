/* Adas Körper-Atlas – Fragenkatalog. Konvention: bei mc ist die erste Option richtig (Anzeige wird gemischt);
   bei multi stehen zuerst die richtigen, dann die falschen Optionen. st = Stolperstelle, p = Nummer in der Probe-Klassenarbeit. */
(function (A) {
  'use strict';
  var Q = A.fragen = [];
  function ext(o, x) { if (x) for (var k in x) o[k] = x[k]; Q.push(o); return o; }
  function mc(id, k, lz, q, o, x) { return ext({ id: id, k: k, lz: lz, t: 'mc', q: q, o: o, a: 0 }, x); }
  function multi(id, k, lz, q, right, wrong, x) {
    var a = []; for (var i = 0; i < right.length; i++) a.push(i);
    return ext({ id: id, k: k, lz: lz, t: 'multi', q: q, o: right.concat(wrong), a: a }, x);
  }
  function tf(id, k, lz, q, a, x) { return ext({ id: id, k: k, lz: lz, t: 'tf', q: q, a: a }, x); }
  function num(id, k, lz, q, a, x) { return ext({ id: id, k: k, lz: lz, t: 'num', q: q, a: a }, x); }
  function sh(id, k, lz, q, a, acc, x) { return ext({ id: id, k: k, lz: lz, t: 'short', q: q, a: a, acc: acc || [] }, x); }
  function li(id, k, lz, q, n, items, x) { return ext({ id: id, k: k, lz: lz, t: 'list', q: q, n: n, items: items }, x); }
  function ord(id, k, lz, q, items, x) { return ext({ id: id, k: k, lz: lz, t: 'order', q: q, items: items }, x); }
  function mat(id, k, lz, q, pairs, x) { return ext({ id: id, k: k, lz: lz, t: 'match', q: q, pairs: pairs }, x); }
  function srt(id, k, lz, q, cats, items, x) { return ext({ id: id, k: k, lz: lz, t: 'sort', q: q, cats: cats, items: items }, x); }
  function clz(id, k, lz, q, bank, x) { return ext({ id: id, k: k, lz: lz, t: 'cloze', q: q, bank: bank || [] }, x); }
  function txt(id, k, lz, q, a, kp, x) { return ext({ id: id, k: k, lz: lz, t: 'text', q: q, a: a, kp: kp }, x); }
  function lab(id, k, lz, q, diag, parts, x) { return ext({ id: id, k: k, lz: lz, t: 'label', q: q, diag: diag, parts: parts }, x); }

  /* ======================= 1 SKELETT ======================= */
  var K = 'skelett';
  multi('sk01', K, '1.1', 'Welche Aufgaben hat das Skelett? Wähle alle richtigen aus.',
    ['Es gibt dem Körper Halt.', 'Es schützt wichtige Organe.', 'Es ermöglicht mit Gelenken und Muskeln Bewegung.'],
    ['Es verdaut das Essen.', 'Es pumpt das Blut durch den Körper.'],
    { ex: 'Halt, Schutz und Bewegung. Verdauen macht der Darm, pumpen das Herz.', src: 'H2 S.3', p: 'P01' });
  li('sk02', K, '1.1', 'Nenne drei Aufgaben des Skeletts.', 3, [
    ['Halt (stützen, Gewicht tragen)', ['halt', 'haelt', 'stuetz', 'geruest', 'gewicht', 'trag', 'aufrecht', 'stabil', 'steh']],
    ['Schutz der Organe', ['schuetz', 'schutz', 'panzer']],
    ['Bewegung', ['beweg']]
  ], { ex: 'Halt (wie ein Gerüst), Schutz (wie ein Panzer), Bewegung (mit Gelenken und Muskeln).', src: 'H2 S.3', p: 'P01' });
  mc('sk03', K, '1.1', 'Womit vergleicht dein Heft das Skelett?', ['Mit einem Gerüst', 'Mit einem Schwamm', 'Mit einer Pumpe', 'Mit einem Filter'],
    { ex: 'Das Skelett ist wie ein Gerüst für den Körper. (Die Pumpe ist das Herz, ein Filter die Niere.)', src: 'H2 S.3' });
  mc('sk04', K, '1.2', 'Was schützt der Schädel?', ['Das Gehirn', 'Das Herz', 'Die Lunge', 'Den Magen'], { src: 'H2 S.3', p: 'P02' });
  multi('sk05', K, '1.2', 'Was schützt der Brustkorb mit den Rippen? Wähle alle richtigen aus.',
    ['Das Herz', 'Die Lunge', 'Die Leber (den oberen Teil)'], ['Das Gehirn', 'Die Blase'],
    { ex: 'Im Heft: Lunge, Herz und Leber. Genau genommen schützen die unteren Rippen den oberen Teil der Leber.', src: 'H2 S.3', p: 'P02' });
  txt('sk06', K, '1.2', 'Erkläre, warum man manche Teile des Skeletts „einen kleinen Panzer“ nennt.',
    'Weil sie wichtige Organe schützen: Der Schädel schützt das Gehirn. Der Brustkorb mit den Rippen schützt Herz, Lunge und (teilweise) die Leber.',
    ['Knochen schützen wichtige Organe', 'Schädel → Gehirn', 'Brustkorb/Rippen → Herz, Lunge, Leber'], { src: 'H2 S.3', p: 'P02' });
  sh('sk07', K, '1.3', 'Wie heißt der größte Knochen deines Körpers?', 'Oberschenkelknochen', ['Oberschenkel-Knochen', 'Femur'],
    { half: ['Oberschenkel'], halfMsg: 'Fast! Der Knochen heißt Oberschenkel<b>knochen</b>.', ex: 'Im ganzen Oberschenkel steckt nur ein großer Knochen.', src: 'H2 S.3', st: 'S8' });
  mc('sk08', K, '1.3', 'Wo steckt der kleinste Knochen?', ['Im Ohr', 'Im kleinen Finger', 'Im kleinen Zeh', 'In der Nase'],
    { ex: 'Im Ohr! Er ist ein Gehörknöchelchen und heißt Steigbügel.', src: 'H2 S.3', st: 'S3' });
  sh('sk09', K, '1.3', 'Wie heißt der kleinste Knochen? (Name oder Gruppe aus dem Heft)', 'Steigbügel', ['Gehörknöchelchen', 'Gehörknochen', 'Steigbügel im Ohr'],
    { ex: 'Im Heft steht „Gehörknöchelchen“. Der kleinste der drei Gehörknöchelchen heißt Steigbügel.', src: 'H2 S.3', st: 'S3' });
  txt('sk10', K, '1.3', 'Wie heißen der größte und der kleinste Knochen? Wo liegen sie?',
    'Der größte Knochen ist der Oberschenkelknochen im Oberschenkel. Der kleinste Knochen ist ein Gehörknöchelchen im Ohr – der Steigbügel im Mittelohr.',
    ['Oberschenkelknochen', 'liegt im Oberschenkel', 'Gehörknöchelchen / Steigbügel', 'liegt im Ohr (Mittelohr)'], { src: 'H2 S.3', st: 'S3', p: 'P03' });
  tf('sk11', K, '1.3', 'In deinem Oberschenkel stecken viele kleine Knochen.', false,
    { ex: 'Falsch: Im Oberschenkel steckt nur ein einziger großer Knochen. Viele kleine Knochen haben wir in Händen und Füßen.', src: 'H2 S.3' });
  mc('sk12', K, '1.3', 'Wo haben wir besonders viele kleine Knochen?', ['In Händen und Füßen', 'Im Oberschenkel', 'Im Oberarm', 'Im Schädeldach'], { src: 'H2 S.3' });
  mc('sk13', K, '1.4', 'Warum sind Knochen fest und starr?', ['Damit sie dem Körper Halt geben', 'Damit sie Blut pumpen', 'Damit sie Essen verdauen', 'Damit sie Wärme spüren'], { src: 'H2 S.3' });
  clz('sk14', K, '1.4', 'Unsere Knochen sind sehr [[fest]] und starr, damit sie dem Körper [[Halt]] geben. Damit wir uns trotzdem bewegen können, haben wir [[Gelenke]]. Immer dort, wo zwei [[Knochen]] aufeinandertreffen, bilden sie ein Gelenk.',
    ['weich', 'Muskelkater', 'Organe'], { src: 'H2 S.3' });
  txt('sk15', K, '1.4', 'Knochen sind fest und starr. Wie können wir uns trotzdem bewegen?',
    'Durch Gelenke: Dort, wo zwei Knochen aufeinandertreffen, bilden sie ein bewegliches Gelenk. Muskeln ziehen an den Knochen und bewegen sie.',
    ['Gelenke', 'wo zwei Knochen aufeinandertreffen', 'Muskeln bewegen die Knochen'], { src: 'H2 S.3' });
  mat('sk16', K, '1.5', 'Ordne zu: Wo liegt der Knochen?', [
    ['Schädel', 'Kopf – schützt das Gehirn'], ['Schlüsselbein', 'vorne zwischen Brustbein und Schulter'],
    ['Schulterblatt', 'hinten an der Schulter, flach wie ein Blatt'], ['Brustbein', 'Mitte vom Brustkorb'], ['Kniescheibe', 'vorne am Knie']
  ], { src: 'H2 S.2', st: 'S8' });
  li('sk17', K, '1.5', 'Nenne die beiden Knochen im Unterarm.', 2, [['Elle', ['elle']], ['Speiche', ['speiche', 'speich']]], { src: 'H2 S.2', p: 'P09' });
  li('sk18', K, '1.5', 'Nenne die beiden Knochen im Unterschenkel.', 2, [['Schienbein', ['schienb', 'schienenb']], ['Wadenbein', ['wadenb', 'wade']]], { src: 'H2 S.2', st: 'S8', p: 'P09' });
  mc('sk19', K, '1.5', 'Welcher Unterarmknochen liegt auf der Daumenseite?', ['Speiche', 'Elle', 'Schienbein', 'Wadenbein'],
    { ex: 'Die Speiche liegt auf der Daumenseite, die Elle auf der Seite vom kleinen Finger. Die Elle bildet die Spitze vom Ellenbogen.', src: 'H2 S.2' });
  mc('sk20', K, '1.5', 'Welcher Unterschenkelknochen ist der dicke vorne (innen)?', ['Schienbein', 'Wadenbein', 'Elle', 'Speiche'],
    { ex: 'Das Schienbein – dort tragen Fußballer Schienbeinschoner. Das dünne Wadenbein liegt außen.', src: 'H2 S.2', st: 'S8' });
  ord('sk21', K, '1.5', 'Hand: Bringe die Knochengruppen in die richtige Reihenfolge – vom Handgelenk bis zu den Fingerspitzen.',
    ['Handwurzelknochen', 'Mittelhandknochen', 'Fingerknochen'], { src: 'H2 S.2', p: 'P10' });
  ord('sk22', K, '1.5', 'Fuß: Bringe die Knochengruppen in die richtige Reihenfolge – vom Knöchel bis zu den Zehenspitzen.',
    ['Fußwurzelknochen', 'Mittelfußknochen', 'Zehenknochen'], { src: 'H2 S.2', st: 'S8', p: 'P10' });
  sh('sk23', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>O…</b> (1 + 1) – der größte Knochen.', 'Oberschenkelknochen', [],
    { half: ['Oberschenkel'], halfMsg: 'Fast: Oberschenkel<b>knochen</b>.', ex: 'Oberschenkelknochen – nicht „Oberbein“.', src: 'H2 S.2', st: 'S8' });
  sh('sk24', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>W…</b> (1 + 1) – der dünne Knochen außen am Unterschenkel.', 'Wadenbein', ['Wadenknochen'],
    { ex: 'Wadenbein – nicht „Wirbelbein“. Wirbel gibt es nur in der Wirbelsäule.', src: 'H2 S.2', st: 'S8' });
  sh('sk25', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>F…</b> (7 + 7) – die Knochen am hinteren Teil vom Fuß, beim Knöchel.', 'Fußwurzelknochen', ['Fußwurzel', 'Fusswurzelknochen'],
    { half: ['Fußknochen'], halfMsg: 'Fast! Gemeint sind die Fuß<b>wurzel</b>knochen.', src: 'H2 S.2', st: 'S8' });
  sh('sk26', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>B…</b> (1) – der Knochen in der Mitte vom Brustkorb.', 'Brustbein', [],
    { half: ['Brust'], halfMsg: 'Fast! Der Knochen heißt Brust<b>bein</b>.', src: 'H2 S.2', st: 'S8' });
  sh('sk27', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>Sch…</b> (1 + 1) – der Knochen vorne zwischen Hals und Schulter.', 'Schlüsselbein', ['Schlüsselbeine'],
    { ex: 'Das Schlüsselbein liegt vorne wie ein Bügel vom Brustbein zur Schulter.', src: 'H2 S.2', st: 'S8' });
  sh('sk28', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>Sch…</b> (1 + 1) – der flache Knochen hinten an der Schulter.', 'Schulterblatt', ['Schulterblätter'],
    { ex: 'Das Schulterblatt ist flach wie ein Blatt und liegt hinten auf dem Rücken.', src: 'H2 S.2', st: 'S8' });
  sh('sk29', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>Sch…</b> (25) – schützt das Gehirn.', 'Schädel', ['Schädelknochen'], { src: 'H2 S.2' });
  sh('sk30', K, '1.5', 'Ergänze wie auf dem Arbeitsblatt: <b>O…</b> (1 + 1) – der Knochen im Oberarm.', 'Oberarmknochen', [],
    { half: ['Oberarm'], halfMsg: 'Fast! Der Knochen heißt Oberarm<b>knochen</b>.', src: 'H2 S.2' });
  num('sk31', K, '1.6', 'Wie viele Rippen hat ein Mensch normalerweise?', 24,
    { half: [12], halfMsg: '12 Paare – also 12 + 12 = <b>24</b> Rippen.', ex: '12 Rippenpaare = 24 Rippen (auf dem Blatt: 12 + 12).', src: 'H2 S.2', p: 'P04' });
  num('sk32', K, '1.6', 'Wie viele Rippenpaare haben wir?', 12, { half: [24], halfMsg: '24 sind die einzelnen Rippen – das sind <b>12 Paare</b>.', src: 'H2 S.2' });
  num('sk33', K, '1.6', 'Wie viele Knochen hat eine Hand?', 27, { ex: '8 Handwurzel- + 5 Mittelhand- + 14 Fingerknochen = 27.', src: 'H2 S.2' });
  num('sk34', K, '1.6', 'Wie viele Knochen hat ein Fuß?', 26, { ex: '7 Fußwurzel- + 5 Mittelfuß- + 14 Zehenknochen = 26.', src: 'H2 S.2' });
  num('sk35', K, '1.6', 'Wie viele Fingerknochen hat eine Hand?', 14, { ex: 'Daumen 2 + vier Finger je 3 = 14.', src: 'H2 S.2' });
  num('sk36', K, '1.6', 'Wie viele Knochen hat das Skelett auf deinem Arbeitsblatt?', 213, { ex: 'Das Blatt zählt 213 – nach seiner eigenen Zählweise.', src: 'H2 S.2', p: 'P04' });
  mc('sk37', K, '1.6', 'Was steht auf dem Arbeitsblatt: Wie viele Knochen hat ein Mensch?',
    ['Zwischen 206 und 220 – das ist von Mensch zu Mensch verschieden', 'Genau 100', 'Genau 500', 'Immer genau 213'], { src: 'H2 S.2' });
  tf('sk38', K, '1.6', 'Jeder Mensch hat genau 213 Knochen.', false,
    { ex: 'Nein. 213 hat nur das Skelett auf dem Blatt (nach seiner Zählweise). Die Zahl ist von Mensch zu Mensch verschieden; Fachbücher nennen für Erwachsene meist 206.', src: 'H2 S.2' });
  mat('sk39', K, '1.6', 'Ordne die Anzahlen vom Arbeitsblatt zu.', [
    ['Handwurzelknochen', '8 + 8'], ['Mittelhandknochen', '5 + 5'], ['Fingerknochen', '14 + 14'], ['Fußwurzelknochen', '7 + 7'], ['Rippen', '12 + 12']
  ], { src: 'H2 S.2' });
  mc('sk40', K, '1.6', 'Mit wie vielen Teilen zählt das Arbeitsblatt die Wirbelsäule?', ['33', '24', '12', '7'],
    { ex: 'Das Blatt zählt 33 (mit Kreuzbein- und Steißbeinwirbeln). Beweglich sind 24.', src: 'H2 S.2', st: 'S13' });
  mc('sk41', K, '1.6', 'Warum steht in Fachbüchern meist 206, auf deinem Blatt aber 213?',
    ['Das Blatt zählt manche zusammengewachsenen Knochen einzeln (z. B. Becken 3 + 3, Wirbelsäule 33).', 'Kinder haben weniger Knochen als das Blatt.', 'Das Blatt zählt die Zähne mit.', 'Weil Fachbücher die Hände weglassen.'], { src: 'H2 S.2' });
  mc('sk42', K, '1.6', 'Wie zählt das Arbeitsblatt das Becken?', ['3 + 3', '1', '12 + 12', '5 + 5'],
    { ex: 'Jede Beckenhälfte besteht aus drei Knochen, die zusammenwachsen – das Blatt zählt sie einzeln: 3 + 3.', src: 'H2 S.2' });
  mc('sk43', K, '1.6', 'Wie viele Knochen zählt das Arbeitsblatt beim Schädel?', ['25', '2', '206', '12'],
    { ex: 'Laut Blatt 25. Fachbücher zählen den Schädel unterschiedlich.', src: 'H2 S.2' });
  mc('sk44', K, '1.7', 'Was würde ohne Skelett passieren?', ['Der Körper würde in sich zusammensacken.', 'Wir könnten schneller laufen.', 'Wir würden größer.', 'Gar nichts.'], { src: 'H1 S.17' });
  mc('sk45', K, '1.7', 'Was hält im Körper die Knochen zusammen – statt Schrauben wie beim Skelettmodell?',
    ['Muskeln, Sehnen und Bänder', 'Schrauben', 'Klebstoff', 'Haare'], { src: 'H1 S.17' });

  /* ======================= 2 WIRBELSÄULE ======================= */
  K = 'wirbel';
  tf('ws01', K, '2.1', 'Die Wirbelsäule ist ein einziger fester Knochenstab.', false,
    { ex: 'Sie besteht aus vielen einzelnen Wirbeln – darum ist sie beweglich.', src: 'H1 S.24' });
  mc('ws02', K, '2.1', 'Was liegt zwischen den Wirbeln?', ['Bandscheiben', 'Rippen', 'Lungenbläschen', 'Sehnen'], { src: 'H1 S.24', p: 'P08' });
  mc('ws03', K, '2.1', 'Wozu sind die Bandscheiben da?',
    ['Sie verhindern, dass die Wirbel aneinanderstoßen, und federn Stöße ab.', 'Sie pumpen Blut.', 'Sie bilden Urin.', 'Sie bilden Schweiß.'], { src: 'H1 S.24', p: 'P08' });
  txt('ws04', K, '2.1', 'Was sind Bandscheiben und wozu brauchen wir sie?',
    'Bandscheiben sind weiche Polster zwischen den Wirbeln. Sie verhindern, dass die Wirbelknochen aneinanderstoßen, und federn Erschütterungen ab.',
    ['Polster zwischen den Wirbeln', 'verhindern, dass die Knochen aneinanderstoßen', 'federn Stöße ab'], { src: 'H1 S.24', p: 'P08' });
  mc('ws05', K, '2.2', 'Welche Form hat die Wirbelsäule von der Seite?', ['Doppeltes S', 'Gerader Stab', 'C-Form', 'Kreis'], { src: 'H1 S.24', st: 'S2', p: 'P07' });
  sh('ws06', K, '2.2', 'Ergänze: Die Wirbelsäule ist geformt wie ein …', 'doppeltes S', ['doppel S', 'doppel-S', 'doppelte S-Form', 'doppelte S Form', 'zwei S', 'doppeltes S-Form'],
    { half: ['S', 'S-Form', 'Schlange'], halfMsg: 'Fast! Es ist ein <b>doppeltes</b> S.', src: 'H1 S.24', st: 'S2' });
  txt('ws07', K, '2.2', 'Welche Form hat die Wirbelsäule? Warum ist diese Form nützlich?',
    'Sie ist geformt wie ein doppeltes S. So kann sie beim Gehen und Springen federn wie eine Sprungfeder und schützt uns vor Erschütterungen.',
    ['doppeltes S', 'federt beim Gehen und Springen', 'schützt vor Erschütterungen'], { src: 'H1 S.24', st: 'S2', p: 'P07' });
  clz('ws08', K, '2.3', 'Die Wirbelsäule hat [[7]] Halswirbel, [[12]] Brustwirbel und [[5]] Lendenwirbel. Zusammen sind das [[24]] bewegliche Wirbel.',
    ['33', '206', '10'], { src: 'H1 S.24', st: 'S1' });
  num('ws09', K, '2.3', 'Wie viele Halswirbel hast du?', 7, { src: 'H1 S.24', st: 'S1' });
  num('ws10', K, '2.3', 'Wie viele Brustwirbel hast du?', 12, { ex: '12 Brustwirbel – an ihnen hängen auch die 12 Rippenpaare.', src: 'H1 S.24', st: 'S1' });
  num('ws11', K, '2.3', 'Wie viele Lendenwirbel hast du?', 5, { src: 'H1 S.24', st: 'S1' });
  num('ws12', K, '2.3', 'Wie viele bewegliche Wirbel hat die Wirbelsäule?', 24, { ex: '7 + 12 + 5 = 24 – so viele Stunden hat ein Tag!', src: 'H1 S.24', st: 'S13', p: 'P06' });
  mc('ws13', K, '2.3', 'Wie viele Wirbel hat die Wirbelsäule insgesamt meistens (mit Kreuzbein und Steißbein)?', ['33', '24', '12', '206'],
    { ex: '24 bewegliche + 5 im Kreuzbein + meist 4 im Steißbein = 33. Die Abbildung nennt 4–5 Steißbeinwirbel, also 33 oder 34.', src: 'H2 S.1–2', st: 'S13', p: 'P06' });
  ord('ws14', K, '2.3', 'Ordne die Abschnitte der Wirbelsäule von oben nach unten.', ['Halswirbel', 'Brustwirbel', 'Lendenwirbel', 'Kreuzbein', 'Steißbein'],
    { src: 'H2 S.1', st: 'S1' });
  mat('ws15', K, '2.3', 'Ordne die Anzahl zu.', [
    ['Halswirbel', '7'], ['Brustwirbel', '12'], ['Lendenwirbel', '5'], ['Kreuzbein', '5 verwachsene Wirbel'], ['Steißbein', '4–5 verkümmerte Wirbel']
  ], { src: 'H2 S.1', st: 'S1' });
  txt('ws16', K, '2.3', 'Nenne die fünf Abschnitte der Wirbelsäule von oben nach unten, jeweils mit der Anzahl der Wirbel.',
    '7 Halswirbel – 12 Brustwirbel – 5 Lendenwirbel – Kreuzbein (5 verwachsene Wirbel) – Steißbein (4–5 verkümmerte Wirbel).',
    ['7 Halswirbel', '12 Brustwirbel', '5 Lendenwirbel', 'Kreuzbein: 5 verwachsene', 'Steißbein: 4–5'], { src: 'H2 S.1, H1 S.24', st: 'S1', p: 'P05' });
  tf('ws17', K, '2.3', 'Die Wirbel im Kreuzbein sind miteinander verwachsen.', true, { src: 'H2 S.1' });
  mc('ws18', K, '2.3', 'Ein Kind schreibt: „Die Wirbelsäule hat 24 Wirbel.“ Was stimmt?',
    ['Das stimmt für die beweglichen Wirbel. Mit Kreuzbein und Steißbein sind es meist 33.', 'Das ist ganz falsch.', 'Es sind immer genau 206.', 'Es sind 12.'],
    { src: 'H1 S.23, H2 S.2', st: 'S13' });
  mc('ws19', K, '2.4', 'Wie heißt der 1. Halswirbel?', ['Atlas', 'Axis', 'Steigbügel', 'Kreuzbein'], { ex: 'Der Atlas trägt den Kopf – wie der Riese Atlas den Himmel.', src: 'H2 S.1' });
  mc('ws20', K, '2.4', 'Wie heißt der 2. Halswirbel?', ['Axis', 'Atlas', 'Amboss', 'Becken'], { ex: 'Um den Axis (die Achse) dreht sich der Kopf.', src: 'H2 S.1' });
  multi('ws21', K, '2.5', 'Wofür brauchen wir die Wirbelsäule? Wähle alle richtigen aus.',
    ['Damit wir aufrecht gehen können', 'Damit wir uns bücken und drehen können', 'Damit Stöße beim Springen abgefedert werden', 'Damit das Rückenmark geschützt ist'],
    ['Damit wir Essen verdauen', 'Damit wir Urin bilden'], { src: 'H1 S.23–24, H2 S.3' });
  tf('ws22', K, '2.5', 'Wegen der Wirbelsäule können wir aufrecht gehen.', true, { src: 'H2 S.3, H1 S.24' });
  mc('ws23', K, '2.5', 'Was liegt geschützt im Inneren der Wirbelsäule?', ['Das Rückenmark', 'Die Leber', 'Die Lunge', 'Der Magen'],
    { ex: 'Das Rückenmark – ein dicker Nervenstrang, der Nachrichten zwischen Gehirn und Körper leitet.', src: 'E' });
  mc('ws24', K, '2.6', 'Wo beginnt deine Wirbelsäule und wo hört sie auf?',
    ['Oben am Hals direkt unter dem Schädel – unten am Steißbein', 'Am Kinn – an den Knien', 'An den Schultern – am Bauchnabel', 'Am Brustbein – an den Füßen'], { src: 'H1 S.23' });
  txt('ws25', K, '2.6', 'Beschreibe, wo die Wirbelsäule beginnt und wo sie endet. Wo kannst du sie ertasten?',
    'Sie beginnt oben am Hals, direkt unter dem Schädel, und endet unten am Steißbein. Ertasten kann man sie hinten in der Mitte des Rückens.',
    ['beginnt am Hals unter dem Schädel', 'endet am Steißbein', 'hinten in der Mitte des Rückens'], { src: 'H1 S.23' });
  txt('ws26', K, '2.5', 'Nenne Aufgaben der Wirbelsäule.',
    'Sie trägt den Körper und hält ihn aufrecht (aufrecht gehen), macht den Rücken beweglich, federt Stöße ab (Schutz vor Erschütterungen) und schützt das Rückenmark.',
    ['aufrecht gehen / Halt', 'beweglich', 'federt Stöße ab', 'schützt das Rückenmark'], { src: 'H1 S.23–24' });

  /* ======================= 3 GELENKE ======================= */
  K = 'gelenke';
  mc('ge01', K, '3.1', 'Was ist ein Gelenk?', ['Eine bewegliche Verbindung dort, wo zwei Knochen aufeinandertreffen', 'Ein Muskel im Bein', 'Ein Knochen im Ohr', 'Eine Drüse in der Haut'],
    { src: 'H2 S.3, H1 S.21', p: 'P11' });
  clz('ge02', K, '3.1', 'Gelenke befinden sich überall dort, wo zwei oder mehr [[Knochen]] [[aufeinandertreffen]]. Ohne Gelenke wärst du völlig [[unbeweglich]].',
    ['Muskeln', 'schneller', 'größer'], { src: 'H1 S.21' });
  mc('ge03', K, '3.2', 'Wofür brauchen wir Gelenke?', ['Damit wir uns bewegen können (drehen, beugen, strecken)', 'Damit wir atmen', 'Damit wir schwitzen', 'Damit wir Urin bilden'],
    { src: 'H1 S.19–20', p: 'P11' });
  tf('ge04', K, '3.2', 'Merksatz: Gelenke machen unseren Körper beweglich.', true, { src: 'H1 S.20' });
  multi('ge05', K, '3.3', 'Wo hast du Gelenke? Wähle alle richtigen aus.', ['Schulter', 'Ellenbogen', 'Knie', 'Hüfte', 'Finger'],
    ['Mitten im Oberschenkelknochen'], { ex: 'Mitten im Knochen ist kein Gelenk – Gelenke sind dort, wo zwei Knochen aufeinandertreffen.', src: 'H1 S.19–20' });
  li('ge06', K, '3.3', 'Nenne vier Stellen, an denen du Gelenke hast.', 4, [
    ['Schulter', ['schulter']], ['Ellenbogen', ['ellenbog', 'ellbog', 'ellebog']], ['Hüfte', ['huefte', 'hueft', 'hufte']], ['Knie', ['knie']],
    ['Finger', ['finger']], ['Hand / Handgelenk', ['hand']], ['Fuß / Sprunggelenk', ['fuss', 'fus', 'sprung', 'knoechel']], ['Zehen', ['zeh']],
    ['Hals / Wirbelsäule', ['hals', 'wirbel', 'nacken']], ['Kiefer', ['kiefer']]
  ], { src: 'H1 S.19' });
  mc('ge07', K, '3.4', 'Wie kann sich ein Kugelgelenk bewegen?', ['In alle (mehrere) Richtungen', 'Nur in eine Richtung: beugen und strecken', 'Gar nicht', 'Nur nach oben'], { src: 'H1 S.19–20' });
  mc('ge08', K, '3.5', 'Wie kann sich ein Scharniergelenk bewegen?', ['Nur in eine Richtung: vor und zurück (beugen und strecken)', 'In alle Richtungen', 'Gar nicht', 'Im Kreis'], { src: 'H1 S.19–20' });
  sh('ge09', K, '3.4', 'Wie heißt das Kugelgelenk in deinem Heft noch? Kugelgelenk (= …)', 'Drehgelenk', [],
    { ex: 'Im Heft: Kugelgelenk (= Drehgelenk). Profi-Wissen: Fachleute nennen ein anderes Gelenk „Drehgelenk“ – z. B. das zwischen Atlas und Axis.', src: 'H1 S.19, S.21' });
  sh('ge10', K, '3.5', 'Wie heißt das Scharniergelenk in deinem Heft noch? Scharniergelenk (= …)', 'Klappgelenk', [], { src: 'H1 S.19, S.21' });
  srt('ge11', K, '3.6', 'Kugelgelenk oder Scharniergelenk? Sortiere.', ['Kugelgelenk', 'Scharniergelenk'], [
    ['Schultergelenk', 0], ['Hüftgelenk', 0], ['Ellenbogengelenk', 1], ['Kniegelenk', 1], ['Fingergelenk', 1]
  ], { ex: 'Kugelgelenke: Schulter, Hüfte. Scharniergelenke: Ellenbogen, Knie (vereinfacht), Finger.', src: 'H1 S.19–20', p: 'P13' });
  mc('ge12', K, '3.6', 'Welches Gelenk ist ein Kugelgelenk?', ['Schultergelenk', 'Ellenbogengelenk', 'Fingergelenk', 'Kniegelenk'], { src: 'H1 S.19' });
  mc('ge13', K, '3.6', 'Welches Gelenk ist ein Scharniergelenk?', ['Ellenbogengelenk', 'Hüftgelenk', 'Schultergelenk'], { src: 'H1 S.19' });
  mc('ge14', K, '3.6', 'Mit welchem Gelenk kannst du dein Bein im Kreis bewegen?', ['Hüftgelenk (Kugelgelenk)', 'Kniegelenk', 'Fingergelenk'], { src: 'H1 S.19' });
  txt('ge15', K, '3.4', 'Welche zwei Gelenkarten stehen in deinem Heft? Erkläre den Unterschied und nenne je ein Beispiel.',
    'Kugelgelenk: Man kann es in alle Richtungen bewegen, z. B. Schulter oder Hüfte. Scharniergelenk: Man kann es nur in eine Richtung bewegen, vor und zurück (beugen und strecken) – wie eine Tür, z. B. Ellenbogen, Knie oder Finger.',
    ['Kugelgelenk: alle Richtungen', 'Beispiel Schulter oder Hüfte', 'Scharniergelenk: eine Richtung (beugen/strecken)', 'Beispiel Ellenbogen, Knie oder Finger'], { src: 'H1 S.19–21', p: 'P12' });
  mc('ge16', K, '3.5', 'Womit kann man ein Scharniergelenk vergleichen?', ['Mit einer Tür, die auf- und zugeht', 'Mit einer Kugel in einem Becher', 'Mit einem Schwamm', 'Mit einer Pumpe'], { src: 'H1 S.20' });
  mc('ge17', K, '3.4', 'Womit kann man ein Kugelgelenk vergleichen?', ['Mit einer Kugel in einem Becher', 'Mit einer Tür', 'Mit einem Gummiband', 'Mit einem Sieb'], { src: 'H1 S.20' });
  clz('ge18', K, '3.7', 'Lückentext aus deinem Heft: Fast alle Knochen deines Körpers sind durch M… [[Muskeln]] miteinander verbunden. Damit wir unsere Körperteile drehen, beugen und strecken können, sind G… [[Gelenke]] zur Bewegung an den K… [[Knochen]] befestigt.',
    ['Organe'], { note: 'So steht es im Heft (die Anfangsbuchstaben sind vorgegeben). Noch genauer: Gelenke verbinden die Knochen beweglich, Muskeln sind mit Sehnen an den Knochen befestigt.', src: 'H1 S.20' });
  mc('ge19', K, '3.7', 'Was stimmt ganz genau?', ['Gelenke verbinden Knochen beweglich; Muskeln sind mit Sehnen an den Knochen befestigt und bewegen sie.',
    'Gelenke sind an den Muskeln festgeschraubt.', 'Knochen bewegen sich von allein.', 'Muskeln sind kleine Knochen.'], { src: 'E (zu H1 S.20)' });
  tf('ge20', K, '3.5', 'Das Knie zählt im Unterricht zu den Scharniergelenken.', true,
    { ex: 'Ja. Profi-Wissen: Genau genommen ist es ein Dreh-Scharniergelenk – gebeugt kann es sich ein bisschen drehen.', src: 'H1 S.19–20' });
  mc('ge21', K, '3.2', 'Was wäre ohne Gelenke?', ['Du wärst völlig unbeweglich.', 'Du könntest besser springen.', 'Du wärst größer.', 'Du hättest mehr Knochen.'], { src: 'H1 S.21' });
  txt('ge22', K, '3.1', 'Was ist ein Gelenk und wozu brauchen wir Gelenke?',
    'Ein Gelenk ist eine bewegliche Verbindung zwischen Knochen – dort, wo zwei Knochen aufeinandertreffen. Wir brauchen Gelenke, um uns bewegen zu können (beugen, strecken, drehen).',
    ['Verbindung, wo Knochen aufeinandertreffen', 'damit wir uns bewegen können'], { src: 'H2 S.3, H1 S.19–21', p: 'P11' });

  /* ======================= 4 MUSKELN ======================= */
  K = 'muskeln';
  mc('mu01', K, '4.1', 'Woraus besteht ein Muskel?', ['Aus vielen Muskelfasern', 'Aus kleinen Knochen', 'Aus Luftbläschen', 'Aus Fett'], { src: 'H1 S.22', p: 'P14' });
  sh('mu02', K, '4.1', 'Wodurch sind Muskeln mit den Knochen verbunden?', 'Sehnen', ['Sehne', 'durch Sehnen', 'mit Sehnen'], { src: 'H1 S.22', p: 'P14' });
  multi('mu03', K, '4.2', 'Was passiert mit einem Muskel, wenn er sich zusammenzieht? Wähle alle richtigen aus.', ['Er wird kürzer.', 'Er wird dicker.'],
    ['Er wird länger.', 'Er wird dünner.'], { ex: 'Kürzer UND dicker – wie eine Raupe, die sich zusammenzieht.', src: 'H1 S.22', st: 'S4' });
  clz('mu04', K, '4.2', 'Wenn sich der Muskel zusammenzieht, wird er [[kürzer]] und [[dicker]]. Dadurch wird der [[Knochen]] bewegt, an dem der Muskel befestigt ist.',
    ['länger', 'dünner', 'Magen'], { src: 'H1 S.22', st: 'S4' });
  txt('mu05', K, '4.2', 'Was passiert mit einem Muskel, wenn er sich zusammenzieht? Wie entsteht dadurch Bewegung?',
    'Der Muskel wird kürzer und dicker. Er zieht über die Sehne am Knochen. So bewegt sich der Knochen am Gelenk.',
    ['wird kürzer', 'UND dicker', 'zieht über die Sehne am Knochen', 'Knochen bewegt sich am Gelenk'], { src: 'H1 S.22', st: 'S4', p: 'P15' });
  tf('mu06', K, '4.2', 'Wenn sich der Bizeps zusammenzieht, wird er länger und dünner.', false, { ex: 'Umgekehrt: kürzer und dicker!', src: 'H1 S.22', st: 'S4' });
  li('mu07', K, '4.3', 'Welche drei Teile arbeiten zusammen, damit du dich bewegen kannst?', 3, [
    ['Knochen', ['knoch', 'skelett']], ['Muskeln', ['muskel']], ['Gelenke', ['gelenk']]
  ], { src: 'H1 S.22' });
  mc('mu08', K, '4.3', 'Wer liefert die Kraft für die Bewegung der Knochen?', ['Die Muskeln', 'Die Gelenke', 'Die Bandscheiben', 'Die Haut'], { src: 'H1 S.22' });
  mc('mu09', K, '4.4', 'Muskeln können nur …', ['ziehen', 'schieben', 'leuchten', 'denken'],
    { ex: 'Muskeln können nur ziehen. Darum gibt es Gegenspieler: Manche ziehen dein Bein nach oben, andere wieder nach unten.', src: 'H1 S.17' });
  tf('mu10', K, '4.4', 'Manche Muskeln ziehen dein Bein nach oben, andere ziehen es wieder nach unten.', true, { src: 'H1 S.17' });
  mc('mu11', K, '4.5', 'Was passiert mit Muskeln, wenn man viel trainiert?', ['Sie werden dicker und fester (stärker).', 'Sie werden klein und weich.', 'Sie verschwinden.', 'Sie werden zu Knochen.'],
    { src: 'H1 S.17', p: 'P16' });
  mc('mu12', K, '4.5', 'Was passiert mit Muskeln, wenn man sich gar nicht oder nur wenig bewegt?', ['Sie werden klein und weich – man wird schwach.', 'Sie werden dicker.', 'Sie werden härter.', 'Gar nichts.'],
    { src: 'H1 S.17', p: 'P16' });
  sh('mu13', K, '4.5', 'Wenn du viel Sport getrieben hast, tun deine Muskeln manchmal weh. Wie nennt man diesen Schmerz?', 'Muskelkater', ['Muskel-Kater'], { src: 'H1 S.17', p: 'P16' });
  txt('mu14', K, '4.5', 'Was passiert mit Muskeln bei regelmäßigem Training, bei zu wenig Bewegung und bei ungewohnter, starker Belastung?',
    'Training: Die Muskeln werden dicker, fester und stärker. Zu wenig Bewegung: Sie werden klein und weich, man wird schwach. Ungewohnte starke Belastung: Muskelkater.',
    ['Training → dicker/stärker', 'wenig Bewegung → klein, weich, schwach', 'starke Belastung → Muskelkater'], { src: 'H1 S.17', p: 'P16' });
  multi('mu15', K, '4.6', 'Wofür brauchst du deine Gesichtsmuskeln? Wähle die zwei Beispiele aus dem Text.', ['Lachen', 'Kauen'], ['Verdauen', 'Blut pumpen'], { src: 'H1 S.17' });
  mat('mu16', K, '4.6', 'Ordne zu: Wofür brauchst du diese Muskeln?', [
    ['Armmuskeln', 'etwas tragen und heben'], ['Beinmuskeln', 'laufen und springen'], ['Halsmuskeln', 'den Kopf bewegen'],
    ['Bauchmuskeln', 'aufrecht sitzen, Oberkörper beugen'], ['Gesichtsmuskeln', 'lachen und kauen']
  ], { src: 'H1 S.17' });
  li('mu17', K, '4.6', 'Nenne zwei Dinge, für die du deine Gesichtsmuskeln brauchst.', 2, [
    ['lachen', ['lach', 'laech', 'grins', 'freu']], ['kauen', ['kau', 'beiss', 'essen']], ['blinzeln', ['blinzel', 'zwinker', 'augen']],
    ['sprechen', ['sprech', 'reden']], ['Grimassen schneiden', ['grimass', 'gesicht zieh']]
  ], { src: 'H1 S.17' });
  lab('mu18', K, '4.7', 'Trage die richtigen Namen ein (wie auf dem Arbeitsblatt).', 'muskeln',
    ['kaumuskel', 'brustmuskel', 'bauchmuskel', 'oberschenkelmuskel', 'bizeps', 'rueckenmuskel', 'gesaessmuskel', 'wadenmuskel'], { src: 'H1 S.18' });
  mc('mu19', K, '4.7', 'Wie heißt der Armbeuger noch?', ['Bizeps', 'Wadenmuskel', 'Kaumuskel', 'Gesäßmuskel'], { src: 'H1 S.18' });
  tf('mu20', K, '4.7', 'Der Wadenmuskel liegt hinten am Unterschenkel.', true, { src: 'H1 S.18' });
  tf('mu21', K, '4.1', 'Merke aus dem Heft: Muskeln halten unsere Knochen zusammen und machen unseren Körper beweglich.', true,
    { ex: 'So steht es im Heft. Dabei helfen auch Sehnen und Bänder.', src: 'H1 S.17' });
  txt('mu22', K, '4.1', 'Woraus besteht ein Muskel? Was verbindet Muskeln mit Knochen?',
    'Ein Muskel besteht aus vielen Muskelfasern. Sehnen verbinden die Muskeln mit den Knochen.',
    ['Muskelfasern', 'Sehnen'], { src: 'H1 S.22', p: 'P14' });

  /* ======================= 5 ORGANE ======================= */
  K = 'organe';
  li('or01', K, '5.1', 'Nenne acht Organe aus deinem Heft.', 8, [
    ['Gehirn', ['gehirn', 'hirn']], ['Herz', ['herz']], ['Lunge', ['lunge']], ['Leber', ['leber']], ['Magen', ['magen']],
    ['Nieren', ['niere']], ['Darm', ['darm']], ['Blase', ['blase']], ['Haut', ['haut']]
  ], { ex: 'Gehirn, Herz, Lunge, Leber, Magen, Nieren, Darm, Blase (die Haut ist auch ein Organ).', src: 'H1 S.13, S.16', p: 'P17' });
  lab('or02', K, '5.1', 'Beschrifte die Organe.', 'organe', ['gehirn', 'lunge', 'herz', 'leber', 'magen', 'nieren', 'darm', 'blase'], { src: 'H1 S.16' });
  mc('or03', K, '5.2', 'Welches Organ steuert alle anderen Körperteile?', ['Gehirn', 'Herz', 'Magen', 'Blase'], { src: 'H1 S.13' });
  clz('or04', K, '5.2', 'Das Gehirn sammelt viele [[Informationen]] und steuert die einzelnen Organe. Im Gehirn sitzt auch dein [[Gedächtnis]] und dein Denken.',
    ['Blut', 'Urin', 'Magensäure'], { src: 'H1 S.14' });
  txt('or05', K, '5.2', 'Welche Aufgaben hat das Gehirn?',
    'Es steuert alle Körperteile und Organe und sammelt viele Informationen. Mit dem Gehirn denken und erinnern wir uns (Gedächtnis). Alles, was wir fühlen, geht vom Gehirn aus.',
    ['steuert Körper und Organe', 'sammelt Informationen', 'Denken', 'Gedächtnis / Erinnerungen'], { src: 'H1 S.13–14', p: 'P18' });
  mc('or06', K, '5.3', 'Welches Organ kannst du dir wie eine Pumpe vorstellen?', ['Herz', 'Lunge', 'Leber', 'Gehirn'], { src: 'H1 S.13' });
  clz('or07', K, '5.3', 'Das Herz versorgt unseren Körper und die Organe mit [[Blut]]. Es besteht aus [[Muskeln]]. Durch das Zusammenziehen und Entspannen spürst du deinen [[Herzschlag]]. Das Herz liegt im Brustkorb und wird von den [[Rippen]] geschützt.',
    ['Knochen', 'Urin', 'Muskelkater'], { src: 'H1 S.14' });
  num('or08', K, '5.4', 'Aus wie vielen Lungenflügeln besteht die Lunge?', 2, { src: 'H1 S.14' });
  mc('or09', K, '5.4', 'Was macht die Lunge?', ['Sie versorgt den Körper mit Sauerstoff – ohne sie könnten wir nicht atmen.', 'Sie filtert das Blut.', 'Sie sammelt den Urin.', 'Sie knetet das Essen.'],
    { src: 'H1 S.13' });
  mc('or10', K, '5.5', 'Welches Organ knetet das Essen mit seinen Muskeln zu einem Brei?', ['Magen', 'Darm', 'Leber', 'Niere'], { src: 'H1 S.13–14', st: 'S9' });
  mc('or11', K, '5.9', 'Welches Organ verdaut den Speisebrei weiter und trennt Nährstoffe und Abfallstoffe?', ['Darm', 'Magen', 'Blase', 'Lunge'], { src: 'H1 S.13, S.15', st: 'S9' });
  mat('or12', K, '5.2', 'Organ-Puzzle: Welcher Satz gehört zu welchem Organ?', [
    ['Gehirn', '„Ich kann alle anderen Körperteile steuern.“'], ['Herz', '„Du kannst dir mich wie eine Pumpe vorstellen.“'],
    ['Lunge', '„Ohne mich könntest du nicht atmen.“'], ['Magen', '„Mit meinen Muskeln knete ich das Essen zu einem Brei.“'],
    ['Darm', '„Ich trenne Abfallstoffe und Nährstoffe.“'], ['Leber', '„Ich säubere das Blut und hole giftige Stoffe heraus.“'],
    ['Nieren', '„Wir filtern das Blut. In uns bildet sich Urin.“'], ['Blase', '„In mir sammelt sich der Urin.“']
  ], { src: 'H1 S.13', st: 'S9' });
  multi('or13', K, '5.6', 'Was macht die Leber? Wähle alle richtigen aus.',
    ['Sie säubert das Blut (holt giftige Stoffe heraus).', 'Sie speichert Nährstoffe wie Zucker und Vitamine.', 'Sie kann giftige Stoffe wie Alkohol teilweise umwandeln.'],
    ['Sie bildet den Urin.', 'Sie pumpt das Blut.'], { src: 'H1 S.13–14', st: 'S5' });
  txt('or14', K, '5.6', 'Was macht die Leber? Nenne zwei Aufgaben.',
    'Die Leber säubert das Blut: Sie holt Abfallstoffe und giftige Stoffe heraus und wandelt sie um (z. B. Alkohol teilweise). Außerdem speichert sie Nährstoffe wie Zucker und Vitamine.',
    ['säubert das Blut / baut giftige Stoffe ab', 'speichert Nährstoffe (Zucker, Vitamine)'], { src: 'H1 S.13–14', st: 'S5', p: 'P20' });
  multi('or15', K, '5.7', 'Was machen die Nieren? Wähle alle richtigen aus.',
    ['Sie filtern das Blut.', 'Sie bilden Urin.', 'Sie sorgen dafür, dass immer gleich viel Wasser im Körper ist.'],
    ['Sie speichern Zucker und Vitamine.', 'Sie kneten das Essen.'], { src: 'H1 S.13–14', st: 'S5' });
  txt('or16', K, '5.7', 'Welche Aufgaben haben die Nieren? Was geschieht mit dem Urin?',
    'Die Nieren filtern das Blut und ziehen alles heraus, was der Körper nicht mehr braucht oder was schädlich ist. Dabei entsteht Urin. Sie sorgen dafür, dass immer gleich viel Wasser im Körper ist. Der Urin geht in die Blase, wird dort gesammelt und dann ausgeschieden.',
    ['filtern das Blut', 'bilden Urin', 'regeln das Wasser im Körper', 'Urin → Blase → Toilette'], { src: 'H1 S.13–14', st: 'S5', p: 'P21' });
  mc('or17', K, '5.7', 'In welchem Organ entsteht der Urin?', ['In den Nieren', 'In der Leber', 'In der Blase', 'Im Magen'],
    { ex: 'Die Nieren bilden den Urin. Die Blase sammelt ihn nur.', src: 'H1 S.13', st: 'S5' });
  srt('or18', K, '5.7', 'Nieren oder Leber? Sortiere.', ['Nieren', 'Leber'], [
    ['filtern das Blut und bilden Urin', 0], ['sorgen dafür, dass immer gleich viel Wasser im Körper ist', 0], ['geben den Urin an die Blase weiter', 0],
    ['speichert Zucker und Vitamine', 1], ['wandelt giftige Stoffe wie Alkohol teilweise um', 1]
  ], { src: 'H1 S.13–14', st: 'S5' });
  mc('or19', K, '5.8', 'Was macht die Blase?', ['Sie sammelt den Urin.', 'Sie bildet den Urin.', 'Sie filtert das Blut.', 'Sie verdaut Fett.'], { src: 'H1 S.13', st: 'S5' });
  sh('or20', K, '5.8', 'Ergänze: Die Blase ist mit einem … verschlossen.', 'Muskel', ['Schließmuskel', 'Muskeln'], { src: 'H1 S.15' });
  clz('or21', K, '5.9', 'Der Darm besteht aus dem [[Dünndarm]] und dem [[Dickdarm]]. Der Speisebrei vom Magen wird im Dünndarm weiter verdaut, und die Nährstoffe werden von den Abfallstoffen [[getrennt]]. Die Nährstoffe gehen ins [[Blut]], die Abfallstoffe wandern in den Dickdarm und werden zum Schluss ausgeschieden.',
    ['Urin', 'Magen'], { src: 'H1 S.15', st: 'S6' });
  mc('or22', K, '5.10', 'Warum sagt man: Die Organe arbeiten zusammen?',
    ['Jedes Organ hat eine besondere Aufgabe – zusammen halten sie den Körper am Leben.', 'Alle Organe machen genau dasselbe.', 'Organe arbeiten nur nachts.', 'Ein Organ reicht zum Leben.'], { src: 'H1 S.14' });
  mc('or23', K, '5.3', 'Wo liegt das Herz?', ['Im Brustkorb, etwas nach links – geschützt von den Rippen', 'Im Bauch neben dem Magen', 'Im Kopf', 'Im Rücken unter den Nieren'], { src: 'H1 S.14' });
  tf('or24', K, '5.1', 'Die Haut ist auch ein Organ – sogar das größte.', true, { src: 'H1 S.12, S.22' });
  sh('or25', K, '5.6', 'Welches Organ speichert Zucker und Vitamine?', 'Leber', [], { src: 'H1 S.14', st: 'S5' });
  clz('or26', K, '5.4', 'Die Lunge versorgt den Körper mit [[Sauerstoff]]. Sie sitzt in unserem Brustkorb und besteht aus zwei [[Lungenflügeln]]. Über die Adern in der Lunge kommt der Sauerstoff ins [[Blut]].',
    ['Urin', 'Magensäure'], { src: 'H1 S.14' });
  clz('or27', K, '5.5', 'Im Magen wird das [[Essen]] durchgeknetet und dadurch zu einer Art [[Brei]]. Beim Zerkleinern hilft die [[Magensäure]].',
    ['Urin', 'Luft'], { src: 'H1 S.14' });

  /* ======================= 6 HERZ & BLUTKREISLAUF ======================= */
  K = 'blut';
  mc('bl01', K, '6.1', 'Wie groß ist dein Herz ungefähr?', ['So groß wie deine Faust', 'So groß wie ein Fußball', 'So groß wie ein Fingernagel', 'So groß wie dein Kopf'], { src: 'H1 S.6', p: 'P19' });
  mc('bl02', K, '6.1', 'Woraus besteht das Herz vor allem?', ['Aus Muskeln', 'Aus Knochen', 'Aus Fett', 'Aus Luft'], { src: 'H1 S.14' });
  txt('bl03', K, '6.1', 'Wie groß ist das Herz ungefähr? Was macht es? Wie entsteht der Herzschlag?',
    'Das Herz ist ungefähr so groß wie eine Faust. Es ist ein Muskel und pumpt das Blut durch den ganzen Körper – wie eine Pumpe. Wenn sich der Herzmuskel zusammenzieht und wieder entspannt, spürt man den Herzschlag.',
    ['faustgroß', 'Muskel / Pumpe', 'pumpt Blut durch den ganzen Körper', 'Herzschlag = zusammenziehen und entspannen'], { src: 'H1 S.6, S.14', p: 'P19' });
  mc('bl04', K, '6.3', 'Wohin führen Arterien das Blut?', ['Vom Herzen weg', 'Zum Herzen hin', 'Nur in die Lunge', 'In die Blase'], { src: 'H1 S.6', p: 'P23' });
  mc('bl05', K, '6.3', 'Wohin führen Venen das Blut?', ['Zum Herzen hin', 'Vom Herzen weg', 'In den Magen', 'Aus der Haut hinaus'], { src: 'H1 S.6', p: 'P23' });
  srt('bl06', K, '6.3', 'Arterie oder Vene? (im Körperkreislauf)', ['Arterie', 'Vene'], [
    ['führt das Blut vom Herzen weg', 0], ['führt das Blut zum Herzen hin', 1], ['sauerstoffreiches Blut', 0], ['sauerstoffarmes Blut', 1],
    ['meist rot gezeichnet', 0], ['meist blau gezeichnet', 1], ['hier tastest du den Puls', 0], ['oft auf dem Handrücken zu sehen', 1]
  ], { src: 'H1 S.6' });
  txt('bl07', K, '6.3', 'Was ist der Unterschied zwischen Arterien und Venen? Welche Farbe haben sie meistens in Zeichnungen?',
    'Arterien führen das Blut vom Herzen weg; im Körper ist es sauerstoffreich. Sie werden meist rot gezeichnet. Venen führen das Blut zum Herzen hin; im Körper ist es sauerstoffarm. Sie werden meist blau gezeichnet.',
    ['Arterien: vom Herzen weg', 'sauerstoffreich, rot gezeichnet', 'Venen: zum Herzen hin', 'sauerstoffarm, blau gezeichnet'], { src: 'H1 S.6', p: 'P23' });
  tf('bl08', K, '6.4', 'Das Blut in den Venen ist blau.', false, { ex: 'Blut ist immer rot! Blau ist nur die Zeichenfarbe für sauerstoffarmes Blut.', src: 'E' });
  mc('bl09', K, '6.4', 'Warum werden Venen in Zeichnungen blau gemalt?',
    ['Blau steht für sauerstoffarmes Blut – das Blut selbst ist trotzdem rot.', 'Weil das Blut in Venen blau ist.', 'Weil Venen aus Wasser bestehen.', 'Weil Venen kalt sind.'], { src: 'H1 S.6, E' });
  mc('bl10', K, '6.4', 'Extra-Wissen: Welches Blut fließt in der Lungenarterie (vom Herzen zur Lunge)?', ['Sauerstoffarmes Blut', 'Sauerstoffreiches Blut', 'Gar kein Blut', 'Urin'],
    { ex: 'Die Lungenarterie führt vom Herzen weg (darum Arterie), bringt aber sauerstoffarmes Blut zur Lunge. Im Lungenkreislauf ist es umgekehrt.', src: 'E' });
  multi('bl11', K, '6.5', 'Was transportiert das Blut? Wähle alle richtigen aus.', ['Sauerstoff', 'Nährstoffe', 'Wasser', 'Kohlendioxid zur Lunge'], ['Knochen'],
    { ex: 'Sauerstoff UND Nährstoffe sind die wichtigsten. Das Blut bringt auch Wasser und nimmt Kohlendioxid mit zur Lunge.', src: 'H1 S.6', st: 'S7' });
  li('bl12', K, '6.5', 'Welche zwei wichtigen Stoffe verteilt das Blut im ganzen Körper?', 2, [
    ['Sauerstoff', ['sauerst', 'o2']], ['Nährstoffe', ['naehrst', 'nahrst', 'nahrung', 'zucker', 'vitamin', 'essen']]
  ], { src: 'H1 S.6', st: 'S7', p: 'P22' });
  mc('bl13', K, '6.6', 'Wie viel Blut fließt laut deinem Arbeitsblatt durch die Blutgefäße?', ['2 bis 3 Liter', '20 bis 30 Liter', '200 Liter', 'Ein halber Liter'],
    { ex: 'Richtwert vom Blatt (passt etwa für Kinder). Erwachsene haben ungefähr 5 Liter.', src: 'H1 S.6' });
  mc('bl14', K, '6.6', 'Wie viel Blut kann das Herz laut Arbeitsblatt an einem Tag pumpen?', ['Fast 10.000 Liter – so viel wie in einen Tankwagen passt', '10 Liter', '100 Liter', '1 Million Liter'],
    { ex: 'Ein grober Richtwert vom Blatt. Wie viel genau, hängt von Alter, Größe und Bewegung ab.', src: 'H1 S.6' });
  mc('bl15', K, '6.6', 'Wie lange braucht ein Tropfen Blut laut Arbeitsblatt bis zu den Füßen und wieder zurück?', ['Ungefähr eine Minute', 'Eine Stunde', 'Einen Tag', 'Eine Woche'], { src: 'H1 S.6' });
  tf('bl16', K, '6.6', 'Die Zahlen vom Arbeitsblatt (2–3 Liter, fast 10.000 Liter, eine Minute) sind ungefähre Richtwerte.', true, { src: 'H1 S.6' });
  mc('bl17', K, '6.7', 'Wo tastest du deinen Puls?', ['An einer Arterie, z. B. innen am Handgelenk', 'An einer Vene auf dem Handrücken', 'Am Knochen', 'An den Haaren'], { src: 'H1 S.6' });
  mc('bl18', K, '6.7', 'Wo kannst du bei vielen Menschen Venen sehen?', ['Auf dem Handrücken', 'Im Ohr', 'Auf den Zähnen', 'In den Haaren'], { src: 'H1 S.6' });
  ord('bl19', K, '6.8', 'Wie kommt der Sauerstoff zu deinen Muskeln? Bringe in die richtige Reihenfolge.', [
    'Die Lunge nimmt Sauerstoff aus der Luft auf.', 'Der Sauerstoff gelangt ins Blut.', 'Das Herz pumpt das Blut durch die Arterien.',
    'Das Blut bringt den Sauerstoff zu den Muskeln.', 'Sauerstoffarmes Blut fließt durch die Venen zurück zum Herzen.'
  ], { src: 'H1 S.3, S.6' });
  txt('bl20', K, '6.8', 'Erkläre, wie Lunge, Herz und Blut zusammenarbeiten.',
    'Die Lunge nimmt Sauerstoff aus der Luft auf und gibt ihn ins Blut. Das Herz pumpt das sauerstoffreiche Blut durch die Arterien in den ganzen Körper. Dort wird der Sauerstoff abgegeben. Das sauerstoffarme Blut fließt durch die Venen zurück zum Herzen und wird zur Lunge gepumpt.',
    ['Lunge: Sauerstoff ins Blut', 'Herz pumpt das Blut', 'Arterien bringen es in den Körper', 'sauerstoffarmes Blut zurück zum Herzen und zur Lunge'], { src: 'H1 S.3, S.6', p: 'P24' });
  mc('bl21', K, '6.2', 'Wie entsteht dein Herzschlag?', ['Der Herzmuskel zieht sich zusammen und entspannt sich wieder.', 'Das Blut klopft gegen die Rippen.', 'Die Lunge drückt auf das Herz.', 'Der Magen knurrt.'], { src: 'H1 S.14' });
  tf('bl22', K, '6.1', 'Das Herz ist ein Muskel.', true, { src: 'H1 S.6, S.14' });
  tf('bl23', K, '6.5', 'Das Blut bringt nur Sauerstoff, aber keine Nährstoffe.', false, { ex: 'Falsch: Sauerstoff UND Nährstoffe!', src: 'H1 S.6', st: 'S7' });
  mc('bl24', K, '6.2', 'Was schützt dein Herz?', ['Die Rippen (der Brustkorb)', 'Der Schädel', 'Das Becken', 'Die Kniescheibe'], { src: 'H1 S.14, H2 S.3' });

  /* ======================= 7 ATMUNG ======================= */
  K = 'atmung';
  ord('at01', K, '7.1', 'Bringe den Weg der Luft in die richtige Reihenfolge.', ['Mund und Nase', 'Luftröhre', 'zwei Hauptbronchien', 'kleine Bronchien', 'Lungenbläschen'], { src: 'H1 S.2', p: 'P25' });
  lab('at02', K, '7.1', 'Notiere den Weg der Luft von 1 bis 5 (wie auf dem Arbeitsblatt).', 'atemweg', ['mundnase', 'luftroehre', 'hauptbronchien', 'kleinebronchien', 'lungenblaeschen'], { src: 'H1 S.2' });
  txt('at03', K, '7.1', 'Schreibe die fünf Stationen der Luft auf – von Nase oder Mund bis zum Gasaustausch.',
    '1. Mund/Nase → 2. Luftröhre → 3. zwei Hauptbronchien → 4. kleine Bronchien → 5. Lungenbläschen.',
    ['Mund/Nase', 'Luftröhre', 'Hauptbronchien', 'kleine Bronchien', 'Lungenbläschen'], { src: 'H1 S.2', p: 'P25' });
  mc('at04', K, '7.1', 'Womit vergleicht das Heft die Luftwege in der Lunge?', ['Mit einem umgedrehten Baum', 'Mit einer Tür', 'Mit einer Pumpe', 'Mit einem Tankwagen'], { src: 'H1 S.2' });
  mc('at05', K, '7.1', 'In was gabelt sich die Luftröhre?', ['In zwei Hauptbronchien', 'In die Speiseröhre', 'In zwei Nieren', 'In den Magen'], { src: 'H1 S.2' });
  mc('at06', K, '7.2', 'Wo findet der Gasaustausch statt?', ['In den Lungenbläschen', 'In der Luftröhre', 'Im Magen', 'In der Nase'], { src: 'H1 S.2' });
  txt('at07', K, '7.2', 'Was geschieht in den Lungenbläschen?',
    'Dort findet der Gasaustausch statt: Sauerstoff aus der Luft geht ins Blut. Kohlendioxid geht aus dem Blut in die Luft und wird ausgeatmet.',
    ['Gasaustausch', 'Sauerstoff → ins Blut', 'Kohlendioxid → aus dem Blut, wird ausgeatmet'], { src: 'H1 S.2', p: 'P26' });
  mc('at08', K, '7.2', 'Welcher Stoff geht in den Lungenbläschen aus der Luft ins Blut?', ['Sauerstoff', 'Kohlendioxid', 'Magensäure', 'Urin'], { src: 'H1 S.2' });
  mc('at09', K, '7.2', 'Welcher Stoff geht in den Lungenbläschen aus dem Blut in die Luft und wird ausgeatmet?', ['Kohlendioxid', 'Sauerstoff', 'Nährstoffe', 'Speichel'], { src: 'H1 S.2' });
  mc('at10', K, '7.3', 'Was passiert beim Einatmen?', ['Die Lunge dehnt sich aus und der Brustkorb hebt sich.', 'Der Brustkorb sinkt ab.', 'Die Lunge wird ganz klein.', 'Das Herz bleibt stehen.'], { src: 'H1 S.2' });
  mc('at11', K, '7.3', 'Was passiert beim Ausatmen?', ['Die Muskeln entspannen sich und der Brustkorb sinkt wieder ab.', 'Der Brustkorb hebt sich.', 'Die Lunge dehnt sich aus.', 'Die Luft geht in den Magen.'], { src: 'H1 S.2' });
  txt('at12', K, '7.3', 'Was passiert beim Einatmen und beim Ausatmen mit dem Brustkorb?',
    'Beim Einatmen dehnt sich die Lunge aus und der Brustkorb hebt sich. Beim Ausatmen entspannen sich die Muskeln, der Brustkorb sinkt wieder ab und die verbrauchte Luft strömt über Luftröhre, Mund und Nase hinaus.',
    ['Einatmen: Lunge dehnt sich, Brustkorb hebt sich', 'Ausatmen: Muskeln entspannen sich, Brustkorb sinkt'], { src: 'H1 S.2', p: 'P27' });
  sh('at13', K, '7.4', 'Wie heißt der große Atemmuskel unter der Lunge?', 'Zwerchfell', [], { src: 'H1 S.6' });
  mc('at14', K, '7.4', 'Wie viele Atemzüge macht die Lunge laut Heft in Ruhe ungefähr pro Minute?', ['15 bis 20', '1 bis 2', '100 bis 120', '500'],
    { ex: 'Ein Richtwert aus dem Heft – Kinder atmen in Ruhe oft etwas schneller.', src: 'H1 S.6' });
  tf('at15', K, '7.4', 'Die Lunge arbeitet ganz automatisch – du musst nicht ans Atmen denken.', true, { src: 'H1 S.6' });
  mc('at16', K, '7.4', 'Womit vergleicht das Heft die Lunge?', ['Mit einem Blasebalg', 'Mit einem Sieb', 'Mit einer Kugel im Becher', 'Mit einem Tankwagen'], { src: 'H1 S.3' });
  txt('at17', K, '7.5', 'Warum atmest du nach zehn Kniebeugen schneller und tiefer als beim Sitzen?',
    'Bei Anstrengung verbraucht der Körper mehr Sauerstoff, weil die Muskeln arbeiten. Darum atme ich schneller und tiefer – so nimmt die Lunge mehr Sauerstoff aus der Luft ins Blut auf. Das Herz bringt ihn zu den Muskeln.',
    ['Körper/Muskeln brauchen mehr Sauerstoff', 'schneller UND tiefer atmen', 'mehr Sauerstoff über die Lunge ins Blut'], { src: 'H1 S.3', st: 'S12', p: 'P28' });
  mc('at18', K, '7.5', 'Welcher Zusammenhang besteht zwischen Belastung und Atmung?',
    ['Je mehr Belastung, desto mehr Sauerstoff braucht der Körper – darum atmet man schneller und tiefer.', 'Bei Belastung atmet man langsamer.', 'Atmung und Belastung haben nichts miteinander zu tun.', 'Bei Belastung braucht man weniger Sauerstoff.'],
    { src: 'H1 S.3', st: 'S12' });
  multi('at19', K, '7.5', 'Was passiert bei Anstrengung? Wähle alle richtigen aus.', ['Du atmest schneller.', 'Du atmest tiefer.', 'Das Herz schlägt schneller.'],
    ['Du brauchst weniger Sauerstoff.', 'Du atmest langsamer.'], { src: 'H1 S.3', st: 'S12' });
  ord('at20', K, '7.6', 'Versuch „Die Atmung messen“: Bringe die Schritte in die richtige Reihenfolge.', [
    'Vermutung aufschreiben: Wie viele Atemzüge schaffe ich in einer Minute?', 'Tätigkeit machen: z. B. sitzen, 10 Kniebeugen oder 10-mal hüpfen',
    'Eine Minute lang die Atemzüge zählen', 'Messung eintragen und mit der Vermutung vergleichen'
  ], { src: 'H1 S.3' });
  mc('at21', K, '7.6', 'Nach welcher Tätigkeit zählt man im Versuch normalerweise mehr Atemzüge?', ['Nach 10 Kniebeugen', 'Nach ruhigem Sitzen'],
    { ex: 'Je anstrengender, desto mehr Atemzüge. Deine eigenen Zahlen können anders sein als bei anderen Kindern.', src: 'H1 S.3' });
  tf('at22', K, '7.6', 'Alle Kinder messen im Versuch genau dieselbe Anzahl Atemzüge.', false,
    { ex: 'Jeder Körper ist anders. Wichtig ist der Zusammenhang: mehr Anstrengung → mehr Atemzüge.', src: 'H1 S.3' });
  mc('at23', K, '7.3', 'Was macht das Zwerchfell beim Einatmen?', ['Es zieht sich zusammen und wird flacher – die Lunge bekommt mehr Platz.', 'Es pumpt Blut.', 'Es verdaut die Luft.', 'Es wird zur Luftröhre.'],
    { src: 'E (zu H1 S.6)' });

  /* ======================= 8 VERDAUUNG ======================= */
  K = 'verdauung';
  ord('ve01', K, '8.1', 'Bringe den Weg der Nahrung in die richtige Reihenfolge.', ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm', 'Enddarm und After'], { src: 'H1 S.4–5', st: 'S6', p: 'P29' });
  txt('ve02', K, '8.1', 'Schreibe den vollständigen Weg der Nahrung von der Aufnahme bis zur Ausscheidung auf.',
    'Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → Enddarm/After.',
    ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm (vor dem Dickdarm!)', 'Dickdarm', 'Enddarm/After'], { src: 'H1 S.4–5', st: 'S6', p: 'P29' });
  mc('ve03', K, '8.2', 'Wo beginnt die Verdauung?', ['Im Mund', 'Im Magen', 'Im Dickdarm', 'In der Leber'], { src: 'H1 S.5' });
  multi('ve04', K, '8.2', 'Was passiert im Mund? Wähle alle richtigen aus.', ['Das Essen wird zerkaut.', 'Es wird mit Speichel vermischt.'],
    ['Die Nährstoffe gehen ins Blut.', 'Es wird Wasser entzogen.'], { src: 'H1 S.5', p: 'P30' });
  mc('ve05', K, '8.3', 'Was passiert im Magen?', ['Das Essen wird durchgeknetet und von der Magensäure zu einem Brei zersetzt.', 'Dem Brei wird Wasser entzogen.', 'Die Nährstoffe gehen ins Blut.', 'Das Essen wird zerkaut.'],
    { src: 'H1 S.5, S.14', p: 'P30' });
  txt('ve06', K, '8.3', 'Was passiert mit der Nahrung im Mund und im Magen?',
    'Im Mund wird das Essen zerkaut und mit Speichel vermischt. Im Magen wird es durchgeknetet und von der Magensäure zersetzt – es wird zu einem Brei.',
    ['Mund: zerkauen + Speichel', 'Magen: kneten + Magensäure', '→ Brei'], { src: 'H1 S.5', p: 'P30' });
  tf('ve07', K, '8.4', 'Die Nahrung wandert durch die Leber hindurch.', false,
    { ex: 'Nein! Der Brei wandert an der Leber vorbei. Die Leber hilft (mit Gallensaft), aber das Essen geht nicht durch sie hindurch.', src: 'H1 S.5', st: 'S10' });
  mc('ve08', K, '8.4', 'Welche Rolle hat die Leber bei der Verdauung?', ['Sie hilft (z. B. mit Gallensaft), aber das Essen wandert nicht durch sie hindurch.',
    'Das Essen wird in der Leber gekaut.', 'Die Banane wandert vom Magen in die Leber.', 'Die Leber ist der Weg vom Mund zum Magen.'], { src: 'H1 S.5, E', st: 'S10' });
  mc('ve09', K, '8.5', 'Wo gelangen die Nährstoffe ins Blut?', ['Im Dünndarm', 'Im Dickdarm', 'In der Speiseröhre', 'In der Blase'], { src: 'H1 S.5, S.15', st: 'S6' });
  mc('ve10', K, '8.6', 'Was passiert im Dickdarm?', ['Dem Speisebrei werden Wasser und Mineralstoffe entzogen.', 'Das Essen wird zerkaut.', 'Die Magensäure zersetzt das Essen.', 'Das Blut wird gefiltert.'],
    { src: 'H1 S.5', st: 'S6' });
  srt('ve11', K, '8.5', 'Dünndarm oder Dickdarm? Sortiere.', ['Dünndarm', 'Dickdarm'], [
    ['Die Nährstoffe gehen ins Blut.', 0], ['Der Brei wird weiter zerlegt.', 0], ['Nährstoffe werden von Abfallstoffen getrennt.', 0], ['kommt direkt nach dem Magen', 0],
    ['Wasser und Mineralstoffe werden entzogen.', 1], ['Danach wird der Rest ausgeschieden.', 1]
  ], { src: 'H1 S.5, S.15', st: 'S6' });
  txt('ve12', K, '8.6', 'Was geschieht im Dünndarm und was im Dickdarm?',
    'Im Dünndarm wird der Brei weiter verdaut. Die Nährstoffe werden von den Abfallstoffen getrennt und gehen ins Blut. Im Dickdarm werden dem Brei Wasser und Mineralstoffe entzogen; der Rest wird ausgeschieden.',
    ['Dünndarm: weiter verdauen, Nährstoffe ins Blut', 'Dickdarm: Wasser und Mineralstoffe entziehen', 'Rest wird ausgeschieden'], { src: 'H1 S.5, S.15', st: 'S6', p: 'P31' });
  clz('ve13', K, '8.1', 'Die Verdauung beginnt bereits im [[Mund]], wenn wir Essen zerkauen und mit Speichel vermischen. Das Zerkaute rutscht durch die [[Speiseröhre]] in den [[Magen]], wo es von der Magensäure zersetzt und zu einem Brei wird. Der Brei wandert vorbei an der [[Leber]]. Danach gelangt der Brei in den [[Dünndarm]] und wird dort weiter zerlegt. Die unverdaulichen Reste werden weitergeschoben in den [[Dickdarm]].',
    ['Luftröhre', 'Niere'], { src: 'H1 S.5', st: 'S6', note: 'Im Arbeitsblatt steht „verdaulichen Reste“ – gemeint sind die unverdaulichen.' });
  mat('ve14', K, '8.7', 'Magenversuch: Wofür stehen die Gegenstände?', [
    ['Plastiktüte', 'Magen'], ['Keks', 'Nahrung (Essen)'], ['Wasser', 'Magensaft / Magensäure (Modell)'], ['Kneten', 'Bewegung der Magenmuskeln']
  ], { src: 'H1 S.5', st: 'S11', p: 'P32' });
  tf('ve15', K, '8.7', 'Im Magenversuch ist das Wasser echte Magensäure.', false,
    { ex: 'Das Wasser spielt die Magensäure nur – es ist ein Modell. Den Brei hat vor allem das Kneten gemacht.', src: 'H1 S.5', st: 'S11' });
  txt('ve16', K, '8.7', 'Magenversuch: Was ist passiert, und wofür stehen Plastiktüte, Keks, Wasser und das Kneten?',
    'Der Keks wurde in der Tüte mit Wasser geknetet und wurde zu einem Brei – so wie das Essen im Magen. Tüte = Magen, Keks = Nahrung, Wasser = Magensaft/Magensäure (nur ein Modell), Kneten = die Magenmuskeln, die den Brei durchkneten.',
    ['Keks wird zu Brei', 'Tüte = Magen', 'Keks = Nahrung', 'Wasser = Magensäure (Modell)', 'Kneten = Magenbewegung'], { src: 'H1 S.5', st: 'S11', p: 'P32' });
  mc('ve17', K, '8.2', 'Warum essen wir?', ['Mit der Nahrung nehmen wir alle Stoffe auf, die wir zum Leben brauchen.', 'Nur weil es schmeckt.', 'Damit der Magen schwerer wird.', 'Damit die Leber wächst.'],
    { src: 'H1 S.5' });
  mc('ve18', K, '8.1', 'Durch welchen Schlauch rutscht das Essen vom Mund in den Magen?', ['Speiseröhre', 'Luftröhre', 'Bronchien', 'Dickdarm'], { src: 'H1 S.5' });
  mc('ve19', K, '8.6', 'Was passiert mit den Resten, die übrig bleiben?', ['Sie werden über Enddarm und After ausgeschieden.', 'Sie gehen ins Gehirn.', 'Sie werden in der Lunge gespeichert.', 'Sie werden zu Knochen.'],
    { src: 'H1 S.5' });
  mc('ve20', K, '8.4', 'Eine Banane wandert durch deinen Körper. Durch welches Organ geht sie NICHT?', ['Leber', 'Speiseröhre', 'Dünndarm', 'Dickdarm'], { src: 'H1 S.4–5', st: 'S10' });

  /* ======================= 9 HAUT ======================= */
  K = 'haut';
  mc('ha01', K, '9.1', 'Welches ist das größte Organ des Körpers?', ['Die Haut', 'Die Leber', 'Der Darm', 'Die Lunge'], { src: 'H1 S.12, S.22', p: 'P33' });
  mc('ha02', K, '9.1', 'Wie groß ist die Haut eines Erwachsenen ungefähr?', ['Ungefähr 2 Quadratmeter', 'Ungefähr 2 Quadratzentimeter', 'Ungefähr 20 Quadratmeter', 'Ungefähr 200 Quadratmeter'], { src: 'H1 S.22' });
  tf('ha03', K, '9.1', 'Die Haut ist das größte Organ, weil sie unseren ganzen Körper bedeckt.', true, { src: 'H1 S.22' });
  multi('ha04', K, '9.2', 'Wovor schützt die Haut? Wähle alle richtigen aus.', ['Vor Verletzungen', 'Vor Infektionen (Krankheitserregern)', 'Vor Kälte', 'Vor Hitze'], ['Vor Muskelkater'],
    { src: 'H1 S.22, S.12', p: 'P33' });
  li('ha05', K, '9.2', 'Nenne drei Aufgaben der Haut.', 3, [
    ['Schutz vor Verletzungen', ['verletz', 'wunde', 'stoss']], ['Schutz vor Infektionen', ['infekt', 'keim', 'krankheit', 'bakteri', 'erreger', 'virus', 'viren', 'schmutz', 'dreck']],
    ['Schutz vor Kälte und Hitze', ['kaelte', 'hitze', 'waerme', 'warm', 'kalt', 'temperatur', 'sonne']], ['wasserdicht', ['wasser']],
    ['spüren (Sinnesorgan)', ['spuer', 'fuehl', 'tast', 'sinn', 'wahrnehm', 'druck', 'schmerz']], ['schwitzen / kühlen', ['schwitz', 'schweiss', 'kuehl']]
  ], { src: 'H1 S.12, S.22', p: 'P33' });
  tf('ha06', K, '9.2', 'Durch die Oberhaut können wir schwitzen, aber es kann kein Wasser in den Körper eindringen.', true, { src: 'H1 S.12' });
  mc('ha07', K, '9.2', 'Welche zwei Eigenschaften hat die Haut laut deinem Heft?', ['dehnbar und wasserdicht', 'hart und starr', 'durchsichtig und glatt', 'kalt und trocken'], { src: 'H1 S.22' });
  multi('ha08', K, '9.3', 'Was können wir mit der Haut spüren? Wähle alle richtigen aus.', ['Druck', 'Schmerz', 'Wärme', 'Kälte'], ['Farben', 'Geräusche'], { src: 'H1 S.12' });
  ord('ha09', K, '9.4', 'Ordne die Hautschichten von außen nach innen.', ['Oberhaut', 'Lederhaut', 'Unterhaut'], { src: 'H1 S.11–12', p: 'P34' });
  li('ha10', K, '9.4', 'Nenne die drei Hautschichten von außen nach innen.', 3, [
    ['Oberhaut', ['oberhaut']], ['Lederhaut', ['lederhaut', 'ledahaut', 'lederh']], ['Unterhaut', ['unterhaut']]
  ], { ordered: true, src: 'H1 S.11–12', p: 'P34' });
  mc('ha11', K, '9.5', 'Welche Hautschicht kannst du mit deinen Augen sehen?', ['Die Oberhaut', 'Die Lederhaut', 'Die Unterhaut'], { src: 'H1 S.12' });
  mc('ha12', K, '9.5', 'Was ist die Hornschicht?', ['Die äußerste Schicht der Oberhaut – ein Schuppenpanzer', 'Eine Drüse', 'Ein Muskel', 'Ein Blutgefäß'], { src: 'H1 S.11–12' });
  txt('ha13', K, '9.5', 'Welche Aufgabe hat die Oberhaut? Was geschieht mit den Hautschuppen?',
    'Die Oberhaut ist die oberste Schicht, ein Schuppenpanzer. Sie schützt den Körper: Wir können durch sie schwitzen, aber kein Wasser dringt ein. Die Hautschuppen werden ständig erneuert.',
    ['oberste Schicht / Schuppenpanzer', 'schützt, wasserdicht', 'Hautschuppen werden ständig erneuert'], { src: 'H1 S.12', p: 'P35' });
  multi('ha14', K, '9.6', 'Was liegt in der Lederhaut? Wähle alle richtigen aus.', ['Blutgefäße', 'Sinneszellen', 'Haarwurzeln', 'Haarmuskeln', 'Talgdrüsen', 'Schweißdrüsen'], ['Fettpolster'],
    { ex: 'Die Fettpolster liegen in der Unterhaut.', src: 'H1 S.12' });
  li('ha15', K, '9.6', 'Nenne vier Bestandteile der Lederhaut.', 4, [
    ['Blutgefäße', ['blut', 'gefaess', 'gefaes', 'ader']], ['Sinneszellen', ['sinn']], ['Haarwurzeln', ['haarwurz', 'wurzel']],
    ['Haarmuskeln', ['haarmusk', 'muskel']], ['Talgdrüsen', ['talg']], ['Schweißdrüsen', ['schweiss', 'schweis']]
  ], { src: 'H1 S.12', p: 'P36' });
  mc('ha16', K, '9.6', 'Welche Aufgaben haben die Blutgefäße in der Lederhaut?', ['Sie versorgen die Haut mit Nährstoffen und sorgen für die richtige Temperatur.', 'Sie bilden Schweiß.', 'Sie lassen Haare wachsen.', 'Sie speichern Fett.'],
    { src: 'H1 S.12' });
  mc('ha17', K, '9.7', 'Was liegt in der Unterhaut?', ['Fettpolster', 'Die Hornschicht', 'Haarspitzen', 'Lungenbläschen'], { src: 'H1 S.12' });
  txt('ha18', K, '9.7', 'Welche Aufgabe haben die Fettpolster in der Unterhaut?',
    'Sie funktionieren wie Stoßdämpfer und schützen die inneren Organe vor Kälte und Hitze.', ['Stoßdämpfer', 'Schutz vor Kälte und Hitze'], { src: 'H1 S.12', p: 'P38' });
  mc('ha19', K, '9.8', 'Wozu ist Schweiß wichtig?', ['Er kühlt den Körper an heißen Tagen und bei Anstrengung ab.', 'Er wärmt den Körper.', 'Er lässt die Haare wachsen.', 'Er bildet Vitamin D.'], { src: 'H1 S.12' });
  mc('ha20', K, '9.8', 'Wie entsteht Gänsehaut?', ['Kleine Haarmuskeln an den Haarwurzeln ziehen sich zusammen und lassen die Haare aufstehen.', 'Die Haut bekommt Federn.', 'Die Schweißdrüsen platzen.', 'Das Fett friert ein.'],
    { src: 'H1 S.12' });
  txt('ha21', K, '9.8', 'Warum schwitzen wir? Wie entsteht Gänsehaut?',
    'Wir schwitzen, damit der Körper an heißen Tagen oder bei Anstrengung abkühlt – der Schweiß kühlt die Haut. Gänsehaut entsteht, wenn sich die kleinen Haarmuskeln an den Haarwurzeln zusammenziehen und die Haare aufstehen lassen.',
    ['Schweiß kühlt (Hitze, Anstrengung)', 'Haarmuskeln ziehen sich zusammen', 'Haare stehen auf'], { src: 'H1 S.12', p: 'P37' });
  tf('ha22', K, '9.5', 'Die Haut erneuert sich ein ganzes Leben lang immer wieder.', true, { src: 'H1 S.22' });
  lab('ha23', K, '9.9', 'Beschrifte das Hautbild.', 'haut', ['haar', 'hornschicht', 'schweissdruese', 'talgdruese', 'blutgefaesse', 'haarmuskel'], { src: 'H1 S.11' });
  lab('ha24', K, '9.4', 'Beschrifte die drei Hautschichten.', 'haut', ['oberhaut', 'lederhaut', 'unterhaut'], { src: 'H1 S.11' });
  mc('ha25', K, '9.6', 'Wo sind die Haarwurzeln befestigt?', ['In der Lederhaut', 'Auf der Hornschicht', 'Im Knochen', 'Im Blut'], { src: 'H1 S.12' });
  mc('ha26', K, '9.6', 'Extra-Wissen: Was machen die Talgdrüsen?', ['Sie bilden Talg, der Haut und Haare geschmeidig hält.', 'Sie bilden Schweiß.', 'Sie bilden Urin.', 'Sie bilden Blut.'], { src: 'E' });
  mc('ha27', K, '9.3', 'Wo in der Haut liegen viele Sinneszellen?', ['In der Lederhaut und in der Oberhaut', 'Nur in den Haaren', 'Nur in der Unterhaut', 'Gar nicht in der Haut'], { src: 'H1 S.12' });

  /* ======================= 10 WAHRNEHMUNG ======================= */
  K = 'wahrnehmung';
  li('wa01', K, '10.1', 'Nenne die vier Wahrnehmungsbereiche.', 4, [
    ['Schmerzwahrnehmung', ['schmerz']], ['Temperaturwahrnehmung', ['temperatur', 'waerme', 'kaelte']], ['Berührungswahrnehmung', ['beruehr', 'beruer']], ['Erkundungswahrnehmung', ['erkund']]
  ], { src: 'H1 S.10', p: 'P39' });
  srt('wa02', K, '10.2', 'Welche Wahrnehmung ist das? (Beispiele aus deinem Heft)', ['Schmerz', 'Temperatur', 'Berührung', 'Erkundung'], [
    ['Max rutscht beim Nähen ab und sticht sich mit der Nadel in den Finger.', 0], ['Lara prüft mit dem Fuß, wie warm das Badewasser ist.', 1],
    ['Sandra nimmt ihre traurige Freundin Frieda in den Arm.', 2], ['Lukas läuft barfuß über die weiche Wiese und dann langsam über den Kiesweg.', 3]
  ], { src: 'H1 S.10' });
  srt('wa03', K, '10.2', 'Welche Wahrnehmung ist das? (neue Beispiele)', ['Schmerz', 'Temperatur', 'Berührung', 'Erkundung'], [
    ['Du stößt dir den Zeh am Tischbein.', 0], ['Eine Schneeflocke landet auf deiner Hand und ist kalt.', 1], ['Du fasst eine heiße Tasse an.', 1],
    ['Dein Opa streichelt dir über den Kopf.', 2], ['Du ertastest mit geschlossenen Augen, ob ein Stein glatt oder rau ist.', 3]
  ], { src: 'H1 S.10 (Transfer)' });
  mc('wa04', K, '10.2', 'Lukas läuft barfuß über weiches Gras und spitzen Kies. Welche Wahrnehmung ist das?', ['Erkundungswahrnehmung', 'Temperaturwahrnehmung', 'Schmerzwahrnehmung', 'Berührungswahrnehmung'], { src: 'H1 S.10' });
  txt('wa05', K, '10.2', 'Nenne die vier Wahrnehmungsarten und jeweils ein Beispiel.',
    'Schmerz: sich mit einer Nadel in den Finger stechen. Temperatur: mit dem Fuß prüfen, wie warm das Badewasser ist. Berührung: jemand nimmt dich in den Arm. Erkundung: barfuß über Gras und Kies laufen und ertasten, wie es sich anfühlt.',
    ['Schmerz + Beispiel', 'Temperatur + Beispiel', 'Berührung + Beispiel', 'Erkundung + Beispiel'], { src: 'H1 S.10', p: 'P39' });
  ord('wa06', K, '10.3', 'Wie kommt eine Berührung im Gehirn an? Bringe in die Reihenfolge.', [
    'Etwas berührt die Haut (Reiz).', 'Sinneskörperchen in der Haut nehmen den Reiz auf.', 'Nerven leiten die Nachricht weiter.', 'Das Gehirn erkennt, was du spürst.'
  ], { src: 'H1 S.9, E' });
  mc('wa07', K, '10.3', 'Wozu sind Sinneskörperchen da?', ['Sie nehmen Reize wie Berührungen auf; die Nachricht wird an das Gehirn weitergeleitet.', 'Sie bilden Schweiß.', 'Sie pumpen Blut.', 'Sie lassen Haare wachsen.'],
    { src: 'H1 S.9' });
  tf('wa08', K, '10.4', 'Überall in der Haut liegen gleich viele Sinneskörperchen.', false, { src: 'H1 S.9' });
  mc('wa09', K, '10.4', 'Wo liegen besonders viele Sinneskörperchen?', ['In den Fingerspitzen', 'Am Rücken', 'Am Oberarm'], { src: 'H1 S.9' });
  txt('wa10', K, '10.4', 'Warum kannst du an den Fingerspitzen zwei Stifte besser unterscheiden als am Rücken?',
    'In den Fingerspitzen liegen viel mehr Sinneskörperchen dicht beieinander als am Rücken. Darum spürt man dort zwei Stifte als zwei, am Rücken oft nur als einen.',
    ['Fingerspitzen: viele Sinneskörperchen', 'Rücken: wenige', 'Sinneskörperchen sind unterschiedlich verteilt'], { src: 'H1 S.9' });
  multi('wa11', K, '10.5', 'Was braucht ihr für den Sinneskörperchentest?', ['Eine Augenbinde', 'Zwei Stifte', 'Einen Partner'], ['Eine Schere', 'Ein Thermometer'], { src: 'H1 S.9' });
  ord('wa12', K, '10.5', 'Bringe den Ablauf des Sinneskörperchentests in die richtige Reihenfolge.', [
    'Die Versuchsperson verbindet sich die Augen.', 'Der Partner berührt sie abwechselnd mit einem oder zwei Stiften.',
    'Die Versuchsperson sagt, mit wie vielen Stiften sie berührt wurde.', 'Der Partner schreibt die Antworten auf.', 'Ihr wechselt die Rollen.'
  ], { src: 'H1 S.9' });
  txt('wa13', K, '10.5', 'Erkläre den Sinneskörperchentest mit zwei Stiften. Was zeigt er?',
    'Eine Person verbindet sich die Augen. Der Partner berührt sie vorsichtig an verschiedenen Körperstellen abwechselnd mit einem oder zwei Stiften. Die Person sagt, ob sie einen oder zwei Stifte spürt, der Partner schreibt es auf; dann werden die Rollen getauscht. Der Test zeigt: Nicht überall liegen gleich viele Sinneskörperchen – an den Fingerspitzen viele, am Rücken wenige.',
    ['Augen verbunden', 'abwechselnd 1 oder 2 Stifte', 'sagen, aufschreiben, Rollen tauschen', 'Sinneskörperchen sind unterschiedlich verteilt'], { src: 'H1 S.9', p: 'P40' });
  mc('wa14', K, '10.5', 'Was stellt ihr bei diesem Versuch fest?', ['Nicht überall sind gleich viele Sinneskörperchen.', 'Überall spürt man gleich gut.', 'Am Rücken spürt man am genauesten.', 'Stifte sind immer spitz.'], { src: 'H1 S.9' });
  tf('wa15', K, '10.5', 'Vor dem Versuch schreibt man eine Vermutung auf und vergleicht sie danach mit dem Ergebnis.', true, { src: 'H1 S.9' });
  mc('wa16', K, '10.1', 'Was bedeutet Erkundungswahrnehmung?', ['Aktiv ertasten, wie sich etwas anfühlt (z. B. weich, rau, spitz)', 'Spüren, ob etwas heiß oder kalt ist', 'Spüren, dass etwas weh tut', 'Hören, was jemand sagt'], { src: 'H1 S.10' });

  /* ======================= 11 SONNE ======================= */
  K = 'sonne';
  multi('so01', K, '11.1', 'Was ist gut an der Sonne? Wähle alle richtigen aus.', ['Sie sorgt für Licht und Wärme.', 'Sie ermöglicht die Fotosynthese bei Pflanzen.', 'Sie ist wichtig für unser Wohlbefinden.', 'Sie hilft der Haut, Vitamin D zu bilden.'],
    ['Sie verursacht Sonnenbrand.'], { src: 'H1 S.7', p: 'P41' });
  li('so02', K, '11.1', 'Nenne vier positive Wirkungen der Sonne.', 4, [
    ['Licht', ['licht', 'hell']], ['Wärme', ['waerme', 'warm']], ['Fotosynthese (Pflanzen)', ['foto', 'photo', 'pflanz']],
    ['Wohlbefinden / glücklich', ['wohl', 'glueck', 'laune', 'froehlich', 'stimmung', 'vital', 'leistung', 'fit']], ['Vitamin D', ['vitamin']],
    ['Leben auf der Erde', ['leben']], ['starke Knochen', ['knochen']]
  ], { src: 'H1 S.7–8', p: 'P41' });
  mc('so03', K, '11.2', 'Welches Vitamin bildet der Körper mithilfe der Sonne?', ['Vitamin D', 'Vitamin C', 'Vitamin A', 'Vitamin B'], { src: 'H1 S.7' });
  mc('so04', K, '11.2', 'Welche Strahlung braucht die Haut, um Vitamin D zu bilden?', ['Die UV-B-Strahlung der Sonne', 'Licht vom Mond', 'Licht einer Taschenlampe', 'Wärme vom Ofen'], { src: 'H1 S.7' });
  txt('so05', K, '11.2', 'Warum ist Sonnenlicht für unsere Knochen wichtig?',
    'Mit der UV-B-Strahlung der Sonne bildet die Haut eine Vorstufe von Vitamin D; daraus macht der Körper Vitamin D. Vitamin D ist wichtig für den Knochenaufbau.',
    ['UV-B-Strahlung', 'Haut bildet Vitamin D', 'Vitamin D → Knochenaufbau'], { src: 'H1 S.7', p: 'P42' });
  ord('so06', K, '11.2', 'Bringe in die richtige Reihenfolge.', [
    'Die Sonne schickt UV-B-Strahlung.', 'Die Haut bildet eine Vorstufe von Vitamin D.', 'Der Körper macht daraus Vitamin D.', 'Vitamin D hilft beim Knochenaufbau.'
  ], { src: 'H1 S.7' });
  multi('so07', K, '11.3', 'Welche Schäden kann zu viel Sonne SOFORT (akut) auslösen?', ['Sonnenbrand', 'Bindehautentzündung am Auge'], ['Grauer Star', 'Hautkrebs'],
    { ex: 'Grauer Star und Hautkrebs sind Langzeitschäden – sie entstehen erst nach vielen Jahren.', src: 'H1 S.7', st: 'S14' });
  clz('so20', K, '11.3', 'UV-Strahlen können akute Schäden auslösen. Dazu zählen zum Beispiel der [[Sonnenbrand]] und [[Bindehautentzündungen]] am Auge.',
    ['Gänsehaut', 'Muskelkater'], { src: 'H1 S.7', st: 'S14' });
  srt('so08', K, '11.4', 'Sofort-Schaden oder Langzeitschaden?', ['sofort (akut)', 'nach langer Zeit'], [
    ['Sonnenbrand', 0], ['Bindehautentzündung', 0], ['vorzeitige Hautalterung', 1], ['Grauer Star', 1], ['Hautkrebs', 1]
  ], { src: 'H1 S.7' });
  li('so09', K, '11.4', 'Nenne vier mögliche Schäden durch zu viel Sonne.', 4, [
    ['Sonnenbrand', ['brand']], ['Bindehautentzündung', ['binde', 'blinde', 'augenentz', 'auge']], ['Hautalterung', ['alter', 'falt']],
    ['Grauer Star', ['star', 'linse']], ['Hautkrebs', ['krebs']], ['schwächeres Immunsystem', ['immun', 'abwehr']]
  ], { src: 'H1 S.7', p: 'P43' });
  mc('so10', K, '11.4', 'Was ist der „Graue Star“?', ['Eine Augenkrankheit (die Linse wird trüb)', 'Ein Stern am Himmel', 'Ein Vogel', 'Ein Sonnenbrand am Rücken'], { src: 'H1 S.7' });
  tf('so11', K, '11.4', 'Zu viel UV-Strahlung kann das Immunsystem schwächen.', true, { src: 'H1 S.7' });
  mc('so12', K, '11.4', 'Welche Stelle bekommt besonders oft Hautkrebs, weil sie schlecht geschützt ist?', ['Das Gesicht', 'Die Fußsohlen', 'Die Haut unter dem T-Shirt', 'Die Zunge'], { src: 'H1 S.7' });
  multi('so13', K, '11.5', 'Wie schützt du dich vor zu viel Sonne? Wähle alle richtigen aus.',
    ['Sonnencreme mit hohem Lichtschutzfaktor', 'Lange Kleidung', 'Kopfbedeckung (Hut, Kappe)', 'Sonnenbrille', 'Schatten suchen'], ['Mittags lange in der prallen Sonne liegen'],
    { src: 'H1 S.7–8, E' });
  li('so14', K, '11.5', 'Nenne vier Möglichkeiten, dich vor zu viel Sonne zu schützen.', 4, [
    ['Sonnencreme (hoher Lichtschutzfaktor)', ['creme', 'krem', 'lichtschutz', 'lichtfaktor', 'lsf', 'eincrem', 'sonnenschutzmittel', 'lotion']],
    ['lange Kleidung', ['kleid', 'shirt', 'hose', 'aermel', 'anzieh', 'pulli']], ['Kopfbedeckung', ['kopf', 'hut', 'kappe', 'muetze', 'cap']],
    ['Sonnenbrille', ['bril']], ['Schatten', ['schatten', 'schirm', 'drinnen', 'im haus']], ['Mittagssonne meiden', ['mittag']]
  ], { src: 'H1 S.7–8', p: 'P44' });
  mc('so15', K, '11.5', 'Was bedeutet „hoher Lichtschutzfaktor“ bei der Sonnencreme?', ['Die Creme schützt die Haut stark vor UV-Strahlung.', 'Die Creme macht die Haut heller.', 'Die Creme riecht stark.', 'Die Creme ist besonders bunt.'], { src: 'H1 S.7' });
  tf('so16', K, '11.2', 'Für Vitamin D muss man sich lange ohne Schutz in die Sonne legen.', false,
    { ex: 'Nein! Schon beim normalen Spielen draußen bildet die Haut genug. Langes Sonnenbaden bringt nicht mehr Vitamin D, nur mehr Schäden.', src: 'E (BfS)' });
  sh('so17', K, '11.3', 'Wie heißt die Entzündung am Auge, die zu viel Sonne auslösen kann?', 'Bindehautentzündung', ['Bindehaut-Entzündung', 'Bindehautentzündungen'],
    { src: 'H1 S.7–8', st: 'S14' });
  mc('so18', K, '11.1', 'Was ist Fotosynthese?', ['Pflanzen machen mit Sonnenlicht ihre Nahrung – dabei entsteht Sauerstoff.', 'Ein Foto von der Sonne.', 'Sonnenbrand bei Pflanzen.', 'Eine Sonnencreme.'], { src: 'H1 S.7, E' });
  mc('so19', K, '11.5', 'Zu welcher Tageszeit ist die Sonne im Sommer am stärksten?', ['Mittags (etwa 11 bis 15 Uhr)', 'Früh morgens', 'Spät abends', 'Nachts'], { src: 'E (BfS/BZgA)' });

  /* ======================= 12 ZUSAMMENSPIEL ======================= */
  K = 'transfer';
  ord('tr01', K, '12.1', 'Die Reise des Sauerstoffs: Wie kommt er aus der Luft in deine Beinmuskeln?',
    ['Nase / Mund', 'Luftröhre', 'Bronchien', 'Lungenbläschen', 'Blut', 'Herz', 'Arterien', 'Beinmuskeln'], { src: 'H1 S.2–3, S.6' });
  txt('tr02', K, '12.2', 'Du rennst bei warmem Wetter. Warum werden Atmung und Herzschlag schneller, und warum schwitzt du?',
    'Beim Rennen brauchen die Muskeln mehr Sauerstoff (und Nährstoffe). Darum atme ich schneller und tiefer – die Lunge nimmt mehr Sauerstoff ins Blut auf. Das Herz schlägt schneller und pumpt das Blut schneller zu den Muskeln. Weil mir warm wird, schwitze ich: Der Schweiß kühlt meinen Körper ab.',
    ['Muskeln brauchen mehr Sauerstoff', 'schneller und tiefer atmen', 'Herz pumpt schneller', 'Schweiß kühlt'], { src: 'H1 S.3, S.6, S.12', st: 'S12', p: 'P47' });
  txt('tr03', K, '12.3', 'Du hebst eine schwere Tasche. Erkläre das Zusammenspiel von Muskel, Sehne, Knochen und Gelenk.',
    'Der Muskel (z. B. der Bizeps) zieht sich zusammen und wird kürzer und dicker. Über die Sehne zieht er am Knochen. Am Gelenk (Ellenbogen) bewegt sich der Knochen – der Arm beugt sich und hebt die Tasche.',
    ['Muskel zieht sich zusammen: kürzer und dicker', 'Sehne überträgt den Zug auf den Knochen', 'Gelenk macht die Bewegung möglich'], { src: 'H1 S.22, S.20', st: 'S4', p: 'P46' });
  txt('tr04', K, '12.4', 'Du springst auf dem Schulhof und landest auf beiden Füßen. Erkläre, welche Rolle die Wirbelsäule und die Bandscheiben spielen.',
    'Die Wirbelsäule hat die Form eines doppelten S und federt den Stoß ab wie eine Sprungfeder. Die Bandscheiben zwischen den Wirbeln sind wie kleine Kissen: Sie dämpfen den Stoß und verhindern, dass die Wirbel aneinanderstoßen. So bin ich vor Erschütterungen geschützt.',
    ['doppelte S-Form federt', 'Bandscheiben dämpfen den Stoß', 'Schutz vor Erschütterungen'], { src: 'H1 S.24', st: 'S2', p: 'P45' });
  txt('tr05', K, '12.5', 'Du isst eine Banane. Erkläre, wie die Nährstoffe schließlich in deinen Körper gelangen.',
    'Im Mund wird die Banane zerkaut und mit Speichel vermischt. Sie rutscht durch die Speiseröhre in den Magen und wird dort mit Magensäure zu Brei geknetet. Im Dünndarm wird der Brei weiter zerlegt, und die Nährstoffe gehen ins Blut. Das Blut verteilt die Nährstoffe im ganzen Körper. (Durch die Leber wandert die Banane nicht.)',
    ['Mund, Speiseröhre, Magen', 'Dünndarm: Nährstoffe ins Blut', 'Blut verteilt die Nährstoffe', 'nicht durch die Leber'], { src: 'H1 S.4–5, S.6', st: 'S10', p: 'P48' });
  mc('tr06', K, '12.6', 'Du hast viel getrunken und musst dringend zur Toilette. Welche Organe waren beteiligt?',
    ['Die Nieren haben das Blut gefiltert und Urin gebildet; die Blase hat ihn gesammelt.', 'Die Leber hat den Urin gebildet.', 'Der Magen hat den Urin gesammelt.', 'Die Lunge hat das Wasser ausgeatmet.'],
    { src: 'H1 S.13–15', st: 'S5' });
  ord('tr07', K, '12.7', 'Du fasst eine heiße Tasse an. Was passiert? Bringe in die Reihenfolge.', [
    'Die Hitze trifft auf deine Haut.', 'Sinneskörperchen nehmen den Reiz auf.', 'Nerven leiten die Nachricht zum Gehirn.', 'Das Gehirn merkt „heiß!“ – und du ziehst die Hand weg.'
  ], { src: 'H1 S.9–10, E' });
  multi('tr08', K, '12.7', 'Ein Tag im Freibad. Was ist schlau? Wähle alle richtigen aus.',
    ['Sonnencreme mit hohem Lichtschutzfaktor auftragen (nach dem Baden erneut)', 'Mittags in den Schatten gehen', 'T-Shirt, Kappe und Sonnenbrille tragen', 'Viel trinken, weil man beim Schwitzen Wasser verliert'],
    ['Ohne Schutz in der Mittagssonne schlafen'], { src: 'H1 S.7–8, S.12' });
  tf('tr09', K, '12.3', 'Ein Muskel wird beim Zusammenziehen nur kürzer.', false, { ex: 'Kürzer UND dicker!', src: 'H1 S.22', st: 'S4' });
  mc('tr10', K, '12.1', 'Welche Aussage ist ganz richtig?', ['Das Blut bringt Sauerstoff und Nährstoffe zu allen Körperteilen.', 'Das Blut bringt nur Sauerstoff.', 'Das Blut bringt nur Nährstoffe.', 'Das Blut bringt Urin zur Lunge.'],
    { src: 'H1 S.6', st: 'S7' });
  txt('tr11', K, '12.3', 'Warum sind Knochen allein nicht genug, damit du dich bewegen kannst?',
    'Knochen sind fest und starr. Damit wir uns bewegen können, brauchen wir Gelenke (bewegliche Verbindungen) und Muskeln, die über Sehnen an den Knochen ziehen. Nur im Zusammenspiel klappt die Bewegung.',
    ['Knochen sind starr', 'Gelenke machen beweglich', 'Muskeln liefern die Kraft'], { src: 'H2 S.3, H1 S.22' });
  mc('tr12', K, '12.5', 'Ein Kind sagt: „Die Banane geht vom Magen in die Leber.“ Was antwortest du?',
    ['Stimmt nicht: Vom Magen geht der Brei in den Dünndarm. Die Leber hilft nur von außen.', 'Stimmt genau.', 'Nein, sie geht in die Lunge.', 'Nein, sie geht in die Blase.'], { src: 'H1 S.4–5', st: 'S10' });
  mc('tr13', K, '12.5', 'Ein Kind sagt: „Im Dickdarm gehen die Nährstoffe ins Blut.“ Was antwortest du?',
    ['Stimmt nicht: Das passiert im Dünndarm. Der Dickdarm entzieht Wasser und Mineralstoffe.', 'Stimmt genau.', 'Das passiert im Magen.', 'Das passiert in der Speiseröhre.'], { src: 'H1 S.5', st: 'S6' });
  mc('tr14', K, '12.6', 'Ein Kind sagt: „Die Leber filtert das Blut und macht Urin.“ Was antwortest du?',
    ['Stimmt nicht: Die Nieren filtern das Blut und bilden Urin. Die Leber baut giftige Stoffe ab und speichert Nährstoffe.', 'Stimmt genau.', 'Das macht der Magen.', 'Das macht das Herz.'],
    { src: 'H1 S.13–14', st: 'S5' });
  srt('tr15', K, '12.1', 'Zu welchem Bereich gehört das?', ['Atmung', 'Blutkreislauf', 'Verdauung'], [
    ['Luftröhre', 0], ['Lungenbläschen', 0], ['Arterie', 1], ['Vene', 1], ['Herz', 1], ['Speiseröhre', 2], ['Dünndarm', 2], ['Magen', 2]
  ], { src: 'H1 S.2–6' });
  txt('tr16', K, '12.7', 'Erkläre einem jüngeren Kind, warum die Sonne gut UND gefährlich sein kann.',
    'Die Sonne gibt Licht und Wärme, macht gute Laune und hilft der Haut, Vitamin D für starke Knochen zu bilden. Zu viel UV-Strahlung kann aber Sonnenbrand und Augenentzündungen auslösen und später Hautalterung, Grauen Star oder Hautkrebs. Darum: Sonnencreme, Kleidung, Kopfbedeckung, Sonnenbrille und Schatten.',
    ['Nutzen: Licht, Wärme, Vitamin D', 'Schaden: Sonnenbrand, Augen, Hautkrebs', 'Schutz nennen'], { src: 'H1 S.7–8' });
  mc('tr17', K, '12.1', 'Wo genau gelangt der Sauerstoff aus der Luft ins Blut?', ['In den Lungenbläschen', 'In der Luftröhre', 'Im Herzen', 'In den Muskeln'], { src: 'H1 S.2' });
  mc('tr18', K, '12.2', 'Warum schlägt dein Herz beim Sport schneller?', ['Es muss mehr Blut mit Sauerstoff zu den arbeitenden Muskeln pumpen.', 'Weil es sich langweilt.', 'Weil die Knochen wachsen.', 'Weil der Magen voll ist.'],
    { src: 'H1 S.3' });
})(window.ATLAS = window.ATLAS || {});
