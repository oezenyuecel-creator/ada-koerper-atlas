/* Adas Körper-Atlas – Lerninhalte. H1 = Heft „Der Körper“ (24 S.), H2 = Heft 2 (3 S.), E = fachliche Ergänzung */
(function (A) {
  'use strict';

  A.hefte = {
    H1: { kurz: 'Heft 1', lang: 'Heft „Der Körper“ (Adas notizen sachkunde körper 1, 24 Seiten)' },
    H2: { kurz: 'Heft 2', lang: 'Heft 2 (Adas notizen Sachkunde 2, 3 Seiten)' },
    E: { kurz: 'Ergänzung', lang: 'Fachliche Ergänzung (nicht im Heft)' }
  };

  A.kapitel = [
    /* ================= 1 SKELETT ================= */
    {
      id: 'skelett', nr: 1, title: 'Skelett & Knochen', short: 'Skelett', color: '#B9852A', icon: 'bone',
      src: 'H2 S.2–3 · H1 S.17',
      lz: [
        ['1.1', 'Ich kann die drei Aufgaben des Skeletts nennen: Halt, Schutz, Bewegung.'],
        ['1.2', 'Ich weiß, was Schädel und Brustkorb schützen.'],
        ['1.3', 'Ich kenne den größten und den kleinsten Knochen und weiß, wo sie liegen.'],
        ['1.4', 'Ich weiß, warum Knochen fest sind und wozu wir Gelenke brauchen.'],
        ['1.5', 'Ich kann die 20 Knochen vom Arbeitsblatt am Skelett zeigen und benennen.'],
        ['1.6', 'Ich kenne die Knochenzahlen vom Arbeitsblatt (Rippen, Hand, Fuß, 206–220, 213).'],
        ['1.7', 'Ich weiß: Ohne Skelett würde der Körper zusammensacken – Muskeln, Sehnen und Bänder halten die Knochen zusammen.']
      ],
      blocks: [
        { t: 'p', h: 'Das <b>Skelett</b> ist für deinen Körper sehr wichtig. Du kannst es dir vorstellen wie ein <b>Gerüst</b>. Ohne Skelett würde dein Körper in sich zusammensacken.' },
        { t: 'merk', h: 'Das Skelett hat drei Aufgaben:<br>🦴 <b>Halt</b> – es stützt den Körper und trägt sein Gewicht.<br>🛡️ <b>Schutz</b> – es schützt wichtige Organe wie ein kleiner Panzer.<br>🤸 <b>Bewegung</b> – zusammen mit Gelenken und Muskeln.' },
        { t: 'esel', h: 'Denk an ein <b>Haus</b>: Es hat ein <b>Gerüst</b> (Halt), ein <b>Dach</b> (Schutz) und <b>Türen mit Scharnieren</b> (Bewegung).' },
        { t: 'h', h: 'Knochen als Panzer' },
        { t: 'p', h: 'Der <b>Schädel</b> schützt das <b>Gehirn</b>. Der <b>Brustkorb</b> mit den <b>Rippen</b> schützt die <b>Lunge</b>, das <b>Herz</b> und die <b>Leber</b>.' },
        { t: 'achtung', h: 'Genau genommen schützen die unteren Rippen nur den <b>oberen Teil</b> der Leber. Der Rest der Leber liegt darunter im Bauch.' },
        { t: 'h', h: 'Das Skelett-Arbeitsblatt' },
        { t: 'diag', id: 'skelett', cap: 'Tippe auf einen Knochen oder auf eine Nummer. Mit „Namen aus“ kannst du dich selbst abfragen.' },
        { t: 'table', head: ['Auf dem Blatt', 'Knochen', 'Anzahl'], rows: [
          ['Sch…', 'Schädel', '25'], ['Sch…', 'Schlüsselbein', '1 + 1'], ['Sch…', 'Schulterblatt', '1 + 1'],
          ['B…', 'Brustbein', '1'], ['R…', 'Rippen', '12 + 12'], ['W…', 'Wirbelsäule', '33'], ['B…', 'Becken', '3 + 3'],
          ['O…', 'Oberarmknochen', '1 + 1'], ['E…', 'Elle', '1 + 1'], ['Sp…', 'Speiche', '1 + 1'],
          ['H…', 'Handwurzelknochen', '8 + 8'], ['M…', 'Mittelhandknochen', '5 + 5'], ['F…', 'Fingerknochen', '14 + 14'],
          ['O…', 'Oberschenkelknochen', '1 + 1'], ['K…', 'Kniescheibe', '1 + 1'], ['Sch…', 'Schienbein', '1 + 1'],
          ['W…', 'Wadenbein', '1 + 1'], ['F…', 'Fußwurzelknochen', '7 + 7'], ['M…', 'Mittelfußknochen', '5 + 5'],
          ['Z…', 'Zehenknochen', '14 + 14'], ['', '<b>Summe auf dem Blatt</b>', '<b>213</b>']
        ], s: 'H2 S.2' },
        { t: 'zahlen', items: [
          ['12 + 12', 'Rippen', '12 Rippenpaare = 24 Rippen'],
          ['27', 'Knochen in einer Hand', '8 Handwurzel + 5 Mittelhand + 14 Finger'],
          ['26', 'Knochen in einem Fuß', '7 Fußwurzel + 5 Mittelfuß + 14 Zehen'],
          ['206–220', 'Knochen hat ein Mensch', 'so steht es auf dem Blatt: von Mensch zu Mensch verschieden'],
          ['213', 'Knochen hat das Skelett auf dem Blatt', 'nach der Zählweise vom Blatt'],
          ['206', 'Knochen', 'steht in Fachbüchern meistens für Erwachsene']
        ] },
        { t: 'achtung', h: '<b>Zählweise vom Blatt:</b> Das Blatt zählt manche Knochen einzeln, die bei Erwachsenen zusammengewachsen sind – zum Beispiel das <b>Becken (3 + 3)</b> und die <b>Wirbelsäule (33)</b>. So kommt es auf <b>213</b>. Fachbücher nennen für Erwachsene meist <b>206</b>. Für die Arbeit: Das Blatt sagt „<b>zwischen 206 und 220</b>“, das Skelett auf dem Blatt hat <b>213</b>.' },
        { t: 'esel', h: '<b>Finger und Zehen haben je 14 Knochen:</b> Daumen und großer Zeh haben 2 Glieder, alle anderen 3 → 2 + 3 + 3 + 3 + 3 = <b>14</b>.<br><b>Hand:</b> Handwurzel → Mittelhand → Finger (8 + 5 + 14 = 27).<br><b>Fuß:</b> Fußwurzel → Mittelfuß → Zehen (7 + 5 + 14 = 26).' },
        { t: 'esel', h: 'Die <b>Elle</b> bildet die Spitze vom <b>Ell</b>enbogen und liegt auf der Seite vom kleinen Finger. Die <b>Speiche</b> liegt auf der <b>Daumenseite</b>.<br>Das <b>Schienbein</b> ist der dicke Knochen vorne – da tragen Fußballer ihre <b>Schienbein</b>schoner. Das dünne <b>Wadenbein</b> liegt außen, an der Seite der <b>Wade</b>.<br>Das <b>Schlüsselbein</b> liegt vorne wie ein Bügel vom Hals zur Schulter. Das <b>Schulterblatt</b> ist flach wie ein Blatt und liegt <b>hinten</b>.' },
        { t: 'stolper', st: 'S8', h: 'Auf deinem Skelettblatt waren diese Namen noch nicht ganz richtig – jetzt weißt du es:<br>✗ Oberbein → ✓ <b>Oberschenkelknochen</b><br>✗ Wirbelbein → ✓ <b>Wadenbein</b> (Wirbel gibt es nur in der Wirbelsäule)<br>✗ Fußknochen → ✓ <b>Fußwurzelknochen</b><br>✗ Brust → ✓ <b>Brustbein</b><br>Bei den beiden „Sch…“-Kästchen an der Schulter: vorne oben = <b>Schlüsselbein</b>, an der Schulter Richtung Rücken = <b>Schulterblatt</b>. Und <b>Schädel</b> schreibt man mit ä.' },
        { t: 'h', h: 'Der größte und der kleinste Knochen' },
        { t: 'p', h: 'Der <b>größte Knochen</b> ist der <b>Oberschenkelknochen</b>. In deinem ganzen Oberschenkel steckt nur ein großer Knochen. Viele kleine Knochen haben wir in den <b>Händen und Füßen</b>.' },
        { t: 'p', h: 'Der <b>kleinste Knochen</b> steckt im <b>Ohr</b>. Im Heft heißt er <b>Gehörknöchelchen</b>. Genauer: Im <b>Mittelohr</b> liegen drei Gehörknöchelchen – Hammer, Amboss und <b>Steigbügel</b>. Der <b>Steigbügel</b> ist der allerkleinste, kleiner als ein Reiskorn.' },
        { t: 'diag', id: 'ohr', cap: 'Das Ohr: Der Steigbügel liegt im Mittelohr, hinter dem Trommelfell.' },
        { t: 'stolper', st: 'S3', h: 'Kleinster Knochen = <b>Gehörknöchelchen im Ohr</b> (genauer: der <b>Steigbügel</b> im Mittelohr). Nicht im kleinen Finger und nicht im kleinen Zeh!' },
        { t: 'h', h: 'Fest – und trotzdem beweglich' },
        { t: 'p', h: 'Unsere Knochen sind sehr <b>fest und starr</b>, damit sie dem Körper Halt geben können. Damit wir uns trotzdem bewegen können, haben wir <b>Gelenke</b>: Immer dort, wo zwei Knochen aufeinandertreffen, bilden sie ein Gelenk.', s: 'H2 S.3' },
        { t: 'p', h: 'An Skelettmodellen sind die Knochen zusammengeschraubt. In deinem Körper gibt es keine Schrauben: <b>Muskeln, Sehnen und Bänder</b> halten die Knochen zusammen und bewegen sie.', s: 'H1 S.17' },
        { t: 'alltag', h: 'Tast mal nach: Dein <b>Schlüsselbein</b> fühlst du vorne unter dem Hals. Die <b>Kniescheibe</b> kannst du bei lockerem Bein leicht hin- und herschieben. Dein <b>Schienbein</b> spürst du vorne am Unterschenkel direkt unter der Haut.' },
        { t: 'tryit', h: 'Zeig an deinem eigenen Körper (oder einem Erwachsenen): Schädel, Schlüsselbein, Schulterblatt, Brustbein, Rippen, Wirbelsäule, Becken, Oberarmknochen, Elle, Speiche, Oberschenkelknochen, Kniescheibe, Schienbein, Wadenbein.' }
      ]
    },

    /* ================= 2 WIRBELSÄULE ================= */
    {
      id: 'wirbel', nr: 2, title: 'Die Wirbelsäule', short: 'Wirbelsäule', color: '#B45A2A', icon: 'spine',
      src: 'H1 S.23–24 · H2 S.1–3',
      lz: [
        ['2.1', 'Ich weiß, dass die Wirbelsäule aus einzelnen Wirbeln besteht und Bandscheiben dazwischen liegen.'],
        ['2.2', 'Ich kann die doppelte S-Form erklären.'],
        ['2.3', 'Ich kenne die Abschnitte: 7 Hals-, 12 Brust-, 5 Lendenwirbel = 24 bewegliche, dazu Kreuzbein und Steißbein.'],
        ['2.4', 'Ich kenne Atlas und Axis.'],
        ['2.5', 'Ich kann die Aufgaben der Wirbelsäule nennen.'],
        ['2.6', 'Ich weiß, wo die Wirbelsäule beginnt und wo sie aufhört.']
      ],
      blocks: [
        { t: 'p', h: 'Ein wichtiger Teil des Knochengerüsts ist die <b>Wirbelsäule</b>. Sie ist <b>kein fester Stab</b>, sondern aus vielen einzelnen <b>Wirbeln</b> zusammengesetzt. Dazwischen liegen die <b>Bandscheiben</b>. Sie verhindern, dass die Knochen aneinanderstoßen.', s: 'H1 S.24' },
        { t: 'diag', id: 'wirbelsaeule', cap: 'Die Wirbelsäule von der Seite (vorne ist rechts). Tippe auf die Abschnitte.' },
        { t: 'merk', h: 'Die Wirbelsäule ist geformt wie ein <b>doppeltes S</b>. So kann sie beim <b>Gehen und Springen federn</b> und schützt dich vor <b>Erschütterungen</b>.' },
        { t: 'widget', w: 'huepfen', cap: 'Probier es aus: Tippe auf „Hüpfen!“.' },
        { t: 'stolper', st: 'S2', h: 'Nicht nur ein S – ein <b>doppeltes S</b>! Oben am Hals und unten am Rücken biegt sie sich nach vorne, in der Brust nach hinten.' },
        { t: 'h', h: 'Wie viele Wirbel?' },
        { t: 'widget', w: 'wirbelzahlen', cap: 'Tippe auf einen Abschnitt.' },
        { t: 'merk', h: '<b>7 Halswirbel – 12 Brustwirbel – 5 Lendenwirbel</b> = <b>24 bewegliche Wirbel</b>.<br>Den Abschluss bilden das <b>Kreuzbein</b> (5 verwachsene Wirbel) und das <b>Steißbein</b> (4–5 verkümmerte Wirbel).' },
        { t: 'esel', h: '<b>7 – 12 – 5</b> wie ein Schultag: um <b>7</b> Uhr frühstücken, um <b>12</b> Uhr Mittagessen, um <b>5</b> Uhr (17 Uhr) auf den Spielplatz. Und 7 + 12 + 5 = <b>24</b> – so viele Stunden hat ein Tag!' },
        { t: 'stolper', st: 'S1', h: 'Von oben nach unten: <b>Hals 7</b>, <b>Brust 12</b>, <b>Lende 5</b>. Die größte Zahl (12) gehört zur Brust – dort hängen auch die 12 Rippenpaare!' },
        { t: 'achtung', h: '<b>24 oder 33?</b> Lies die Frage genau. <b>Beweglich</b> sind 24 Wirbel (7 + 12 + 5). <b>Insgesamt</b> sind es mit Kreuzbein (5) und Steißbein (meist 4) <b>meist 33</b> – so zählt auch dein Skelettblatt. Weil das Steißbein 4–5 Wirbel haben kann (manchmal auch 3), sind es 33 oder 34. Am sichersten schreibst du: „<b>24 bewegliche Wirbel, mit Kreuz- und Steißbein meist 33</b>.“', s: 'H1 S.23–24 · H2 S.1–2' },
        { t: 'heft', h: 'Bild „Die Wirbelsäule in Seitenansicht“: 1. Halswirbel: Atlas · 2. Halswirbel: Axis · 7 Halswirbel · 12 Brustwirbel · Bandscheiben · 5 Lendenwirbel · 5 verwachsene Wirbel im Kreuzbein · 4–5 verkümmerte im Steißbein.', s: 'H2 S.1' },
        { t: 'extra', h: '<b>Atlas</b> ist ein Riese aus einer alten griechischen Sage, der den Himmel trägt – der Atlas-Wirbel trägt deinen <b>Kopf</b>! Der <b>Axis</b> (2. Halswirbel) ist die Achse, um die sich dein Kopf dreht.' },
        { t: 'h', h: 'Wirbel und Bandscheibe' },
        { t: 'diag', id: 'wirbelausschnitt', cap: 'Ausschnitt: Wirbel und Bandscheiben (wie in deinem Heft S. 23).' },
        { t: 'h', h: 'Wofür brauchen wir die Wirbelsäule?' },
        { t: 'merk', h: 'Die Wirbelsäule …<br>• trägt den Körper und hält ihn <b>aufrecht</b> – wegen ihr können wir <b>aufrecht gehen</b>,<br>• macht den Rücken <b>beweglich</b> (bücken, drehen, beugen),<br>• <b>federt Stöße</b> ab und schützt vor Erschütterungen,<br>• <b>schützt das Rückenmark</b>.' },
        { t: 'extra', h: 'In der Mitte der Wirbel gibt es einen Kanal. Darin liegt das <b>Rückenmark</b> – ein dicker Nervenstrang, der Nachrichten zwischen Gehirn und Körper leitet. Die Wirbel schützen es wie eine Röhre.' },
        { t: 'h', h: 'Wo beginnt sie, wo hört sie auf?' },
        { t: 'p', h: 'Die Wirbelsäule beginnt oben am <b>Hals, direkt unter dem Schädel</b> (der Atlas trägt den Kopf). Sie endet unten mit dem <b>Steißbein</b>.' },
        { t: 'alltag', h: 'Taste vorsichtig: Beug den Kopf nach vorne. Hinten am Hals spürst du einen Knubbel – das ist ein Halswirbel. Von dort kannst du die Wirbel in der Mitte des Rückens bis ganz nach unten ertasten.' }
      ]
    },

    /* ================= 3 GELENKE ================= */
    {
      id: 'gelenke', nr: 3, title: 'Gelenke', short: 'Gelenke', color: '#0E8A7E', icon: 'joint',
      src: 'H1 S.19–21 · H2 S.3',
      lz: [
        ['3.1', 'Ich kann erklären, was ein Gelenk ist.'],
        ['3.2', 'Ich weiß, wozu wir Gelenke brauchen.'],
        ['3.3', 'Ich kann Gelenke an meinem Körper zeigen und benennen.'],
        ['3.4', 'Ich kenne das Kugelgelenk (im Heft auch „Drehgelenk“).'],
        ['3.5', 'Ich kenne das Scharniergelenk (im Heft auch „Klappgelenk“).'],
        ['3.6', 'Ich kann Schulter, Hüfte, Ellenbogen, Knie und Finger richtig zuordnen.'],
        ['3.7', 'Ich kann das Zusammenspiel von Knochen, Gelenken und Muskeln beschreiben.']
      ],
      blocks: [
        { t: 'p', h: 'Bei allen Bewegungen, die du machst, benutzt du deine <b>Gelenke</b>. Sie befinden sich überall dort, wo <b>zwei oder mehr Knochen aufeinandertreffen</b>. Ohne Gelenke wärst du völlig unbeweglich.', s: 'H1 S.21' },
        { t: 'merk', h: '<b>Gelenke machen unseren Körper beweglich.</b> Mit ihnen können wir Körperteile <b>drehen, beugen und strecken</b>.' },
        { t: 'diag', id: 'gelenkkoerper', cap: 'Wo hast du Gelenke? Tippe auf die Punkte.' },
        { t: 'h', h: 'Die zwei wichtigsten Gelenkarten' },
        { t: 'widget', w: 'gelenkarten', cap: 'Schau, wie sich die beiden Gelenke bewegen.' },
        { t: 'merk', h: '<b>1. Kugelgelenk</b> (im Heft: = Drehgelenk): Eine Knochenkugel steckt in einer Pfanne – wie eine Kugel in einem Becher. Bewegungen sind in <b>alle (mehrere) Richtungen</b> möglich. Beispiele: <b>Schulter, Hüfte</b>.<br><b>2. Scharniergelenk</b> (im Heft: = Klappgelenk): funktioniert wie das <b>Scharnier einer Tür</b>. Bewegungen sind nur in <b>eine Richtung</b> möglich – vor und zurück, also <b>beugen und strecken</b>. Beispiele: <b>Ellenbogen, Finger, Knie</b>.' },
        { t: 'esel', h: '<b>K</b>ugel → <b>K</b>reisen: Schulter und Hüfte kannst du im Kreis bewegen.<br><b>Sch</b>arnier → <b>Sch</b>ranktür: Ellenbogen, Knie und Finger gehen nur auf und zu.' },
        { t: 'heft', h: '„Die beiden wichtigsten Gelenkarten sind: 1. Das Kugelgelenk (= Drehgelenk): Bewegungen sind nach allen oder mehreren Richtungen möglich. 2. Das Scharniergelenk (= Klappgelenk): Bewegungen sind in eine Richtung möglich.“', s: 'H1 S.19, S.21' },
        { t: 'achtung', h: '<b>Profi-Wissen:</b> Ärztinnen und Ärzte meinen mit „Drehgelenk“ eigentlich eine <b>eigene</b> Gelenkart – zum Beispiel das Gelenk zwischen Atlas und Axis, mit dem du den Kopf drehst. Ein Kugelgelenk kann zwar auch drehen, ist aber fachlich kein Drehgelenk. In deinem Heft steht trotzdem „Kugelgelenk (= Drehgelenk)“ – schreib es in der Arbeit so, wie ihr es gelernt habt.<br>Und das <b>Knie</b> ist genau genommen ein <b>Dreh-Scharniergelenk</b>: Wenn es gebeugt ist, kann es sich ein kleines bisschen drehen. Im Unterricht zählt es zu den Scharniergelenken.' },
        { t: 'alltag', h: 'Probier es aus: Kreise deinen Arm in der <b>Schulter</b> – das geht in alle Richtungen. Versuch dasselbe mit dem <b>Ellenbogen</b>: Er klappt nur auf und zu.' },
        { t: 'h', h: 'Knochen, Gelenke und Muskeln arbeiten zusammen' },
        { t: 'heft', h: 'Lückentext mit vorgegebenen Anfangsbuchstaben: „Fast alle Knochen deines Körpers sind durch <b>M</b>uskeln miteinander verbunden. Damit wir unsere Körperteile drehen, beugen und strecken können, sind <b>G</b>elenke zur Bewegung an den <b>K</b>nochen befestigt.“', s: 'H1 S.20' },
        { t: 'achtung', h: 'So ist der Lückentext im Heft gemeint (die Buchstaben M, G, K sind vorgegeben). Noch genauer gesagt: <b>Gelenke</b> sind die beweglichen <b>Verbindungsstellen</b> zwischen den Knochen. <b>Muskeln</b> sind mit <b>Sehnen</b> an den Knochen befestigt und bewegen sie. <b>Bänder</b> halten die Knochen am Gelenk zusammen.' }
      ]
    },

    /* ================= 4 MUSKELN ================= */
    {
      id: 'muskeln', nr: 4, title: 'Muskeln', short: 'Muskeln', color: '#D2443C', icon: 'muscle',
      src: 'H1 S.17–18, S.22',
      lz: [
        ['4.1', 'Ich weiß, woraus ein Muskel besteht und was ihn mit dem Knochen verbindet.'],
        ['4.2', 'Ich kann erklären, was beim Zusammenziehen passiert: kürzer UND dicker.'],
        ['4.3', 'Ich weiß: Muskeln liefern die Kraft – Bewegung klappt nur mit Knochen, Muskeln und Gelenken zusammen.'],
        ['4.4', 'Ich weiß, dass Muskeln nur ziehen können und als Gegenspieler arbeiten.'],
        ['4.5', 'Ich kann erklären, was Training, Bewegungsmangel und Muskelkater bedeuten.'],
        ['4.6', 'Ich kenne Beispiele, wofür ich Gesichts-, Arm-, Bein-, Hals- und Bauchmuskeln brauche.'],
        ['4.7', 'Ich kann die Muskeln vom Arbeitsblatt am Bild zeigen.']
      ],
      blocks: [
        { t: 'p', h: 'Ein Skelett allein ist nur ein Haufen Knochen, der nicht selbst stehen kann. In deinem Körper halten <b>Muskeln, Sehnen und Bänder</b> die Knochen zusammen und bewegen sie. Überall im Körper gibt es Muskeln – sogar im Gesicht.', s: 'H1 S.17' },
        { t: 'merk', h: 'Ein Muskel besteht aus vielen <b>Muskelfasern</b>. Durch <b>Sehnen</b> sind die Muskeln mit den Knochen verbunden. Wenn sich ein Muskel <b>zusammenzieht</b>, wird er <b>kürzer und dicker</b>. Dadurch wird der Knochen bewegt, an dem der Muskel befestigt ist.', s: 'H1 S.22' },
        { t: 'widget', w: 'arm', cap: 'Schieb den Regler: Was passiert mit dem Bizeps?' },
        { t: 'esel', h: '<b>Kürzer UND dicker</b> – wie eine Raupe, die sich zusammenzieht: Sie wird kurz und dick!' },
        { t: 'stolper', st: 'S4', h: 'Immer <b>beides</b> nennen: Der Muskel wird <b>kürzer</b> <u>und</u> <b>dicker</b>.' },
        { t: 'merk', h: 'Muskeln liefern die <b>Kraft</b>, die für die Bewegung der Knochen nötig ist. Die Bewegung unseres Körpers wird erst durch das <b>Zusammenspiel von Knochen, Muskeln und Gelenken</b> möglich.', s: 'H1 S.22' },
        { t: 'h', h: 'Muskeln arbeiten als Gegenspieler' },
        { t: 'p', h: 'Muskeln können nur <b>ziehen</b>, nicht schieben. Darum arbeiten sie zu zweit: Manche Muskeln ziehen dein Bein nach oben, wenn du es heben willst, andere ziehen es wieder nach unten. Am Arm beugt der <b>Armbeuger (Bizeps)</b> den Arm. Sein Gegenspieler auf der Rückseite streckt ihn wieder.', s: 'H1 S.17' },
        { t: 'extra', h: 'Der Gegenspieler vom Bizeps heißt <b>Trizeps</b> (Armstrecker). Wenn der Bizeps kürzer und dicker wird, wird der Trizeps länger und dünner – und umgekehrt.' },
        { t: 'h', h: 'Training, Bewegungsmangel, Muskelkater' },
        { t: 'merk', h: '<b>Viel Training:</b> Muskeln werden <b>dicker, fester und stärker</b>.<br><b>Wenig Bewegung:</b> Muskeln werden <b>klein und weich</b>, man wird <b>schwach</b>.<br><b>Ungewohnte, starke Anstrengung:</b> Danach tun die Muskeln manchmal weh – das ist <b>Muskelkater</b>.' },
        { t: 'extra', h: 'Muskelkater geht nach ein paar Tagen von selbst wieder weg.' },
        { t: 'h', h: 'Wofür brauchst du deine Muskeln?' },
        { t: 'cards', items: [
          ['😄', 'Gesichtsmuskeln', 'lachen und kauen'],
          ['💪', 'Armmuskeln', 'etwas tragen und heben'],
          ['🏃', 'Beinmuskeln', 'laufen und springen'],
          ['🙆', 'Halsmuskeln', 'den Kopf bewegen und halten'],
          ['🧘', 'Bauchmuskeln', 'aufrecht sitzen, den Oberkörper beugen']
        ], s: 'H1 S.17' },
        { t: 'h', h: 'Das Muskel-Arbeitsblatt' },
        { t: 'diag', id: 'muskeln', cap: 'Nummern wie auf deinem Arbeitsblatt: 1 Kaumuskel · 2 Brustmuskel · 3 Bauchmuskel · 4 Oberschenkelmuskel · 5 Armbeuger (Bizeps) · 6 Rückenmuskel · 7 Gesäßmuskel · 8 Wadenmuskel.' },
        { t: 'heft', h: 'Malauftrag: Gesichtsmuskeln gelb, Halsmuskeln lila, Arm- und Brustmuskeln grün, Bauchmuskeln blau, Beinmuskeln rot.', s: 'H1 S.17' },
        { t: 'widget', w: 'muskelfarben', cap: 'So sieht der Malauftrag fertig aus.' },
        { t: 'merk', h: 'Merke aus dem Heft: <b>Muskeln halten unsere Knochen zusammen und machen unseren Körper beweglich.</b>', s: 'H1 S.17' },
        { t: 'achtung', h: 'Genau genommen helfen dabei auch die <b>Sehnen</b> (verbinden Muskel und Knochen) und die <b>Bänder</b> (halten die Knochen an den Gelenken zusammen).' },
        { t: 'alltag', h: 'Spann deinen Oberarm an und fühl mit der anderen Hand: Beim Beugen wird der Bizeps <b>dick und hart</b>. Streckst du den Arm, wird er wieder lang und weich.' }
      ]
    },

    /* ================= 5 ORGANE ================= */
    {
      id: 'organe', nr: 5, title: 'Unsere Organe', short: 'Organe', color: '#7448CC', icon: 'organs',
      src: 'H1 S.13–16',
      lz: [
        ['5.1', 'Ich kann 8 Organe nennen und im Körper zeigen.'],
        ['5.2', 'Ich kenne die Aufgaben des Gehirns.'],
        ['5.3', 'Ich kenne Aufgaben, Lage und Schutz des Herzens.'],
        ['5.4', 'Ich kenne die Aufgaben der Lunge.'],
        ['5.5', 'Ich kenne die Aufgaben des Magens.'],
        ['5.6', 'Ich kenne die Aufgaben der Leber.'],
        ['5.7', 'Ich kenne die Aufgaben der Nieren.'],
        ['5.8', 'Ich kenne die Aufgabe der Blase.'],
        ['5.9', 'Ich kenne Dünndarm und Dickdarm und ihre Aufgaben.'],
        ['5.10', 'Ich weiß, dass die Organe zusammenarbeiten.']
      ],
      blocks: [
        { t: 'p', h: 'In deinem Körper gibt es viele <b>Organe</b>. Jedes hat eine <b>besondere Aufgabe</b>. Sie arbeiten zusammen und halten so deinen Körper am Leben.', s: 'H1 S.14' },
        { t: 'diag', id: 'organe', cap: 'Die 8 Organe aus deinem Heft. Tippe auf ein Organ.' },
        { t: 'cards', organ: true, items: [
          ['🧠', 'Gehirn', '„Ich kann alle anderen Körperteile steuern. Auch für das Denken und alle Erinnerungen bin ich zuständig.“', 'Sammelt viele Informationen und steuert die Organe. Hier sitzen dein Gedächtnis und dein Denken. Alles, was du fühlst, geht vom Gehirn aus.'],
          ['❤️', 'Herz', '„Ich versorge den ganzen Körper mit Blut. Du kannst dir mich wie eine Pumpe vorstellen.“', 'Besteht aus Muskeln. Zusammenziehen und Entspannen = Herzschlag. Liegt im Brustkorb (etwas links), die Rippen schützen es.'],
          ['🌬️', 'Lunge', '„Ich versorge den Körper mit Sauerstoff. Ohne mich könntest du nicht atmen.“', 'Sitzt im Brustkorb und besteht aus zwei Lungenflügeln. Über die Adern in der Lunge kommt der Sauerstoff ins Blut.'],
          ['🍽️', 'Magen', '„Bei mir landet das Essen, das du isst. Mit meinen Muskeln knete ich das Essen zu einem Brei.“', 'Die Magensäure hilft beim Zerkleinern.'],
          ['🌀', 'Darm', '„Ich verdaue den Speisebrei und trenne Abfallstoffe und Nährstoffe.“', 'Besteht aus Dünndarm und Dickdarm. Die Nährstoffe gehen ins Blut, die Abfallstoffe werden ausgeschieden.'],
          ['🟤', 'Leber', '„Ich säubere das Blut. Abfallstoffe und giftige Stoffe hole ich aus dem Blut.“', 'Speichert Nährstoffe wie Zucker und Vitamine. Kann giftige Stoffe wie Alkohol teilweise umwandeln.'],
          ['🥜', 'Nieren', '„Wir filtern das Blut und ziehen Wasser aus dem Blut. In uns bildet sich Urin.“', 'Ziehen alles heraus, was der Körper nicht mehr braucht oder was schädlich ist. Der Urin geht zur Blase. Sie sorgen dafür, dass immer gleich viel Wasser im Körper ist.'],
          ['💧', 'Blase', '„In mir sammelt sich der Urin. Wenn ich voll bin, musst du dringend auf die Toilette.“', 'Sie ist mit einem Muskel verschlossen.']
        ], s: 'H1 S.13–15' },
        { t: 'stolper', st: 'S9', h: 'Im Organ-Puzzle sind die Texte von <b>Magen</b> und <b>Darm</b> vertauscht. Richtig:<br>🍽️ <b>Magen</b>: „Bei mir landet das Essen … Mit meinen Muskeln knete ich das Essen zu einem Brei.“<br>🌀 <b>Darm</b>: „Ich verdaue den Speisebrei und trenne Abfallstoffe und Nährstoffe.“' },
        { t: 'stolper', st: 'S5', h: '<b>Nieren oder Leber?</b> Beide helfen, das Blut sauber zu halten – aber unterschiedlich:<br>🥜 <b>Nieren</b>: <b>filtern</b> das Blut, bilden <b>Urin</b>, regeln das <b>Wasser</b> im Körper.<br>🟤 <b>Leber</b>: wandelt <b>giftige Stoffe</b> um und <b>speichert</b> Zucker und Vitamine.' },
        { t: 'esel', h: '<b>N</b>iere → <b>N</b>ass: Die Nieren machen Urin und regeln das Wasser.<br><b>L</b>eber → <b>L</b>ager: Die Leber lagert (speichert) Zucker und Vitamine und entgiftet.' },
        { t: 'achtung', h: 'Im Heft steht bei der Leber: „Alle Abfallstoffe … hole ich aus dem Blut.“ Genauer: Die Leber wandelt giftige Stoffe so um, dass der Körper sie loswerden kann. Viele Abfallstoffe filtern dann die <b>Nieren</b> aus dem Blut – sie landen im <b>Urin</b>.' },
        { t: 'achtung', h: 'Im Heft steht: Das Herz liegt „auf der linken Seite“. Genauer: Es liegt fast in der <b>Mitte</b> der Brust, ein bisschen nach <b>links</b> verschoben.' },
        { t: 'h', h: 'Der Darm' },
        { t: 'merk', h: 'Der Darm besteht aus dem <b>Dünndarm</b> und dem <b>Dickdarm</b>. Der Speisebrei vom Magen wird im Dünndarm weiter verdaut, und die <b>Nährstoffe</b> werden von den <b>Abfallstoffen getrennt</b>. Die Nährstoffe gehen ins <b>Blut</b>, die Abfallstoffe wandern in den Dickdarm und werden zum Schluss ausgeschieden.', s: 'H1 S.15' }
      ]
    },

    /* ================= 6 BLUTKREISLAUF ================= */
    {
      id: 'blut', nr: 6, title: 'Herz & Blutkreislauf', short: 'Blutkreislauf', color: '#C21F3A', icon: 'heart',
      src: 'H1 S.6, S.14, S.3',
      lz: [
        ['6.1', 'Ich weiß: Das Herz ist ein Muskel, arbeitet wie eine Pumpe und ist etwa so groß wie meine Faust.'],
        ['6.2', 'Ich kann Lage und Schutz des Herzens beschreiben und weiß, wie der Herzschlag entsteht.'],
        ['6.3', 'Ich kenne den Unterschied zwischen Arterien und Venen.'],
        ['6.4', 'Ich weiß, dass Blut immer rot ist – blau ist nur die Zeichenfarbe.'],
        ['6.5', 'Ich weiß, was das Blut transportiert: Sauerstoff UND Nährstoffe.'],
        ['6.6', 'Ich kenne die Richtwerte vom Arbeitsblatt.'],
        ['6.7', 'Ich weiß, wo man den Puls fühlt und wo man Venen sieht.'],
        ['6.8', 'Ich kann erklären, wie Lunge, Herz und Blut zusammenarbeiten.']
      ],
      blocks: [
        { t: 'merk', h: 'Das <b>Herz</b> ist ein starker <b>Muskel</b>. Es arbeitet wie eine <b>Pumpe</b> und pumpt das Blut durch den ganzen Körper. Es ist ungefähr so groß wie deine <b>Faust</b>.', s: 'H1 S.6, S.14' },
        { t: 'p', h: 'Wenn sich der Herzmuskel <b>zusammenzieht und wieder entspannt</b>, spürst du deinen <b>Herzschlag</b>. Das Herz liegt im <b>Brustkorb</b> (etwas nach links) und wird von den <b>Rippen</b> geschützt.', s: 'H1 S.14' },
        { t: 'diag', id: 'kreislauf', cap: 'Der Blutkreislauf: Die Punkte zeigen, wie das Blut fließt.' },
        { t: 'merk', h: '<b>Arterien</b> führen das Blut <b>vom Herzen weg</b>. Im Körper ist es <b>sauerstoffreich</b>. Arterien werden meist <b>rot</b> gezeichnet. Deinen <b>Puls</b> tastest du an einer Arterie.<br><b>Venen</b> führen das Blut <b>zum Herzen hin</b>. Im Körper ist es <b>sauerstoffarm</b>. Venen werden meist <b>blau</b> gezeichnet. Bei vielen Menschen siehst du Venen auf dem <b>Handrücken</b>.', s: 'H1 S.6' },
        { t: 'esel', h: '<b>A</b>rterie → <b>a</b>b vom Herzen.<br><b>V</b>ene → <b>v</b>on überall zurück zum Herzen.' },
        { t: 'achtung', h: '<b>Blut ist immer rot!</b> Sauerstoffreiches Blut ist hellrot, sauerstoffarmes dunkelrot. <b>Blau</b> ist nur die <b>Zeichenfarbe</b> für sauerstoffarmes Blut. Venen schimmern durch die Haut bläulich – das Blut darin ist trotzdem rot.' },
        { t: 'extra', h: 'Es gibt zwei Kreisläufe: Im <b>Körperkreislauf</b> bringt das Herz sauerstoffreiches Blut zu Organen und Muskeln. Im <b>Lungenkreislauf</b> pumpt es sauerstoffarmes Blut zur Lunge, dort bekommt das Blut neuen Sauerstoff.<br><b>Achtung, hier ist es umgekehrt:</b> Die <b>Lungenarterie</b> (vom Herzen weg) bringt sauerstoff<b>armes</b> Blut, die <b>Lungenvene</b> (zum Herzen hin) bringt sauerstoff<b>reiches</b> Blut. Die <b>Richtung</b> bestimmt den Namen, nicht der Sauerstoff.' },
        { t: 'merk', h: 'Mit dem Blut werden die <b>Nährstoffe UND der Sauerstoff</b> im ganzen Körper verteilt.', s: 'H1 S.6' },
        { t: 'stolper', st: 'S7', h: 'Das Blut bringt <b>Sauerstoff <u>und</u> Nährstoffe</b> – immer beides nennen! (Es transportiert auch Wasser und nimmt Abfallstoffe wie Kohlendioxid mit.)' },
        { t: 'h', h: 'Zahlen vom Arbeitsblatt' },
        { t: 'zahlen', items: [
          ['2–3 Liter', 'Blut fließen durch deine Blutgefäße', 'Richtwert vom Blatt – passt ungefähr für Kinder. Erwachsene haben etwa 5 Liter.'],
          ['fast 10.000 Liter', 'pumpt das Herz an einem Tag', 'so viel, wie in einen Tankwagen passt (Richtwert)'],
          ['ca. 1 Minute', 'braucht ein Tropfen Blut bis zu den Füßen und zurück', 'Richtwert vom Blatt']
        ], s: 'H1 S.6' },
        { t: 'achtung', h: 'Das sind <b>ungefähre Zahlen</b> vom Arbeitsblatt, keine genauen Messwerte. Wie viel Blut ein Mensch hat und wie viel das Herz pumpt, hängt von Größe, Alter und Bewegung ab. In Ruhe pumpt das Herz eines Erwachsenen etwa 5 Liter pro Minute – das sind rund 7.000 Liter am Tag, beim Sport viel mehr.' },
        { t: 'h', h: 'Lunge, Herz und Blut arbeiten zusammen' },
        { t: 'p', h: 'Die <b>Lunge</b> holt den Sauerstoff aus der Luft ins <b>Blut</b>. Das <b>Herz</b> pumpt das sauerstoffreiche Blut durch die <b>Arterien</b> zu allen Organen und Muskeln. Dort wird der Sauerstoff abgegeben. Das sauerstoffarme Blut fließt durch die <b>Venen</b> zurück zum Herzen und weiter zur Lunge – und alles beginnt von vorn.', s: 'H1 S.3, S.6' },
        { t: 'alltag', h: '<b>Puls fühlen:</b> Leg zwei Finger (nicht den Daumen!) innen an dein Handgelenk, auf der Daumenseite. Spürst du das Klopfen? Hüpf 20-mal und fühl noch einmal – jetzt klopft es schneller.' }
      ]
    },

    /* ================= 7 ATMUNG ================= */
    {
      id: 'atmung', nr: 7, title: 'Die Atmung', short: 'Atmung', color: '#2A84CF', icon: 'lungs',
      src: 'H1 S.2–3, S.6, S.14',
      lz: [
        ['7.1', 'Ich kann den Weg der Luft in 5 Stationen nennen und im Bild zeigen.'],
        ['7.2', 'Ich kann erklären, was in den Lungenbläschen passiert.'],
        ['7.3', 'Ich weiß, was beim Ein- und Ausatmen passiert.'],
        ['7.4', 'Ich weiß: Die Lunge arbeitet automatisch – in Ruhe etwa 15–20 Atemzüge pro Minute (Heft).'],
        ['7.5', 'Ich kann erklären, warum wir bei Belastung schneller und tiefer atmen.'],
        ['7.6', 'Ich kann den Versuch „Die Atmung messen“ beschreiben.']
      ],
      blocks: [
        { t: 'merk', h: 'Der Weg der Luft:<br><b>(1) Mund und Nase</b> → <b>(2) Luftröhre</b> → <b>(3) zwei Hauptbronchien</b> → <b>(4) kleine Bronchien</b> → <b>(5) Lungenbläschen</b>.', s: 'H1 S.2' },
        { t: 'diag', id: 'atemweg', cap: 'Die Nummern 1–5 sind wie auf deinem Arbeitsblatt.' },
        { t: 'p', h: 'Die Luftröhre führt zur Brust und gabelt sich dort in zwei Äste, die <b>Hauptbronchien</b>. Diese verzweigen sich in unzählige <b>kleine Bronchien</b> und enden in den <b>Lungenbläschen</b>. Du kannst dir das wie einen <b>umgedrehten Baum</b> vorstellen.', s: 'H1 S.2' },
        { t: 'esel', h: '„<b>M</b>ein <b>L</b>ama <b>h</b>at <b>k</b>eine <b>L</b>ust“ → <b>M</b>und/Nase – <b>L</b>uftröhre – <b>H</b>auptbronchien – <b>k</b>leine Bronchien – <b>L</b>ungenbläschen.<br>Umgedrehter Baum: Stamm = Luftröhre, dicke Äste = Hauptbronchien, Zweige = kleine Bronchien, Blätter = Lungenbläschen.' },
        { t: 'h', h: 'Der Gasaustausch' },
        { t: 'merk', h: 'In den <b>Lungenbläschen</b> findet der <b>Gasaustausch</b> statt: <b>Sauerstoff</b> geht aus der Luft <b>ins Blut</b>. <b>Kohlendioxid</b> geht aus dem Blut in die Luft und wird <b>ausgeatmet</b>.', s: 'H1 S.2' },
        { t: 'h', h: 'Einatmen und Ausatmen' },
        { t: 'widget', w: 'atmen', cap: 'Schau zu: Einatmen – Ausatmen.' },
        { t: 'merk', h: '<b>Einatmen:</b> Die Lunge dehnt sich aus und der Brustkorb <b>hebt</b> sich.<br><b>Ausatmen:</b> Die Muskeln entspannen sich und der Brustkorb <b>sinkt</b> wieder ab. Die verbrauchte Luft strömt über Luftröhre, Mund und Nase hinaus. Dann beginnt alles von vorne.', s: 'H1 S.2' },
        { t: 'heft', h: '„Die Lunge ist dein Atmungsorgan und arbeitet ganz automatisch. Wenn du ganz ruhig bist, macht sie mit Hilfe des <b>Zwerchfells 15 bis 20 Atemzüge pro Minute</b>.“ – „Die Lunge arbeitet wie ein <b>Blasebalg</b>.“', s: 'H1 S.6, S.3' },
        { t: 'extra', h: 'Das <b>Zwerchfell</b> ist ein großer, flacher Muskel unter der Lunge. Beim Einatmen zieht es sich zusammen und wird flacher – so bekommt die Lunge mehr Platz und saugt Luft ein. Leg die Hand auf den Bauch: Beim Einatmen wölbt er sich ein bisschen nach vorn.' },
        { t: 'achtung', h: '15–20 Atemzüge ist ein <b>Richtwert</b> aus dem Heft. Kinder atmen in Ruhe oft etwas schneller als Erwachsene, und jeder Mensch ist ein bisschen anders.' },
        { t: 'h', h: 'Warum atmest du bei Anstrengung stärker?' },
        { t: 'merk', h: 'Bei Belastung <b>verbraucht</b> dein Körper <b>mehr Sauerstoff</b>, weil die Muskeln arbeiten. Darum atmest du <b>schneller und tiefer</b> – so nimmt die Lunge mehr Sauerstoff aus der Luft <b>ins Blut</b> auf. Das <b>Herz</b> sorgt dann für den Weitertransport im Körper.', s: 'H1 S.3' },
        { t: 'stolper', st: 'S12', h: 'In deinem Heft steht schon: „Der Körper verbraucht mehr Sauerstoff.“ Super! Ergänze immer noch: <b>Darum atme ich schneller und tiefer, um mehr Sauerstoff über die Lunge ins Blut aufzunehmen.</b>' },
        { t: 'versuch', title: 'Versuch „Die Atmung messen“', steps: [
          '<b>Vermutung</b> aufschreiben: Wie viele Atemzüge machst du in einer Minute?',
          'Eine <b>Tätigkeit</b> machen: <b>sitzen</b>, <b>3 Kniebeugen</b>, <b>10 Kniebeugen</b> oder <b>10-mal hüpfen</b>.',
          'Ein Partner stoppt <b>eine Minute</b> – du zählst deine Atemzüge (einmal ein- und ausatmen = 1 Atemzug).',
          '<b>Messung</b> eintragen und mit der Vermutung <b>vergleichen</b>.'
        ], h: '<b>Ergebnis:</b> Nach Anstrengung atmest du <b>schneller (mehr Atemzüge)</b> und <b>tiefer</b> als im Sitzen.', s: 'H1 S.3' },
        { t: 'achtung', h: 'Deine gemessenen Zahlen sind <b>deine eigenen Messwerte</b>. Bei anderen Kindern können sie anders sein – sie sind keine festen Zahlen zum Auswendiglernen. Wichtig ist der Zusammenhang: <b>mehr Anstrengung → mehr Atemzüge</b>.' }
      ]
    },

    /* ================= 8 VERDAUUNG ================= */
    {
      id: 'verdauung', nr: 8, title: 'Die Verdauung', short: 'Verdauung', color: '#CF7417', icon: 'stomach',
      src: 'H1 S.4–5, S.13–15',
      lz: [
        ['8.1', 'Ich kann den Weg der Nahrung in der richtigen Reihenfolge nennen.'],
        ['8.2', 'Ich weiß, was im Mund passiert.'],
        ['8.3', 'Ich weiß, was im Magen passiert.'],
        ['8.4', 'Ich weiß, dass die Leber hilft, das Essen aber nicht durch die Leber wandert.'],
        ['8.5', 'Ich weiß, was im Dünndarm passiert.'],
        ['8.6', 'Ich weiß, was im Dickdarm passiert und wie die Reste ausgeschieden werden.'],
        ['8.7', 'Ich kann den Magenversuch erklären.']
      ],
      blocks: [
        { t: 'p', h: 'Mit unserer Nahrung nehmen wir <b>alle Stoffe auf, die wir zum Leben brauchen</b>. Bei der Verdauung wird das Essen so lange zerlegt, bis das Blut die <b>Nährstoffe</b> aufnehmen kann.', s: 'H1 S.5' },
        { t: 'merk', h: '<b>Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → Enddarm / After</b>', s: 'H1 S.4–5' },
        { t: 'widget', w: 'banane', cap: 'Begleite eine Banane auf ihrer Reise durch den Körper.' },
        { t: 'esel', h: '„<b>M</b>ama <b>s</b>ingt <b>m</b>it <b>D</b>ani <b>d</b>rei <b>E</b>ntenlieder“ → <b>M</b>und – <b>S</b>peiseröhre – <b>M</b>agen – <b>D</b>ünndarm – <b>D</b>ickdarm – <b>E</b>nddarm.<br><b>Dünn kommt vor dick:</b> erst der lange, dünne Darm, dann der dicke.' },
        { t: 'h', h: 'Die Stationen' },
        { t: 'steps', items: [
          ['👄', 'Mund', 'Die Verdauung beginnt schon im <b>Mund</b>: Wir <b>zerkauen</b> das Essen und vermischen es mit <b>Speichel</b>.'],
          ['⬇️', 'Speiseröhre', 'Das Zerkaute rutscht durch die <b>Speiseröhre</b> in den Magen.'],
          ['🍽️', 'Magen', 'Im <b>Magen</b> wird das Essen <b>durchgeknetet</b> und von der <b>Magensäure</b> zersetzt. So wird es zu einem <b>Brei</b>.'],
          ['🟤', 'Leber (daneben)', 'Der Brei wandert <b>an der Leber vorbei</b>. Die Leber hilft bei der Verdauung, aber das Essen geht <b>nicht durch</b> sie hindurch.'],
          ['〰️', 'Dünndarm', 'Im <b>Dünndarm</b> wird der Brei weiter zerlegt. Die <b>Nährstoffe</b> werden von den Abfallstoffen getrennt und gehen <b>ins Blut</b>.'],
          ['🌀', 'Dickdarm', 'Im <b>Dickdarm</b> werden dem wässrigen Speisebrei noch <b>Wasser und Mineralstoffe entzogen</b>.'],
          ['🚽', 'Enddarm / After', 'Was übrig bleibt, wird über den <b>Enddarm</b> und den <b>After</b> <b>ausgeschieden</b>.']
        ], s: 'H1 S.5, S.15' },
        { t: 'extra', h: 'Die Leber bildet <b>Gallensaft</b>. Er fließt in den Dünndarm und hilft, Fett zu zerlegen. In der Speiseröhre schieben Muskeln den Bissen weiter – deshalb klappt Schlucken sogar im Handstand.' },
        { t: 'stolper', st: 'S10', h: 'In deinem Heft stand zuerst, dass die Banane „in die Leber“ geht. Richtig ist: Die Banane geht <b>nie durch die Leber</b>. Ihr Weg: Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → After. Die Leber liegt daneben und hilft von außen.' },
        { t: 'stolper', st: 'S6', h: '<b>Dünndarm:</b> Nährstoffe gehen <b>ins Blut</b>.<br><b>Dickdarm:</b> <b>Wasser und Mineralstoffe</b> werden aus dem Brei geholt – der Rest wird dadurch fester (dicker).' },
        { t: 'achtung', h: 'Im Arbeitsblatt steht: „Die <b>verdaulichen</b> Reste werden weitergeschoben in den Dickdarm.“ Gemeint sind die <b>unverdaulichen</b> Reste – also das, was der Körper nicht verwerten kann.', s: 'H1 S.5' },
        { t: 'h', h: 'Der Magenversuch' },
        { t: 'widget', w: 'magenversuch', cap: 'Wofür stehen die Gegenstände?' },
        { t: 'merk', h: '<b>Plastiktüte</b> = Magen · <b>Keks</b> = Nahrung (Essen) · <b>Wasser</b> = Magensaft/Magensäure · <b>Kneten</b> = die Magenmuskeln. Ergebnis: Der Keks wird zu einem <b>Brei</b> – wie das Essen im Magen.', s: 'H1 S.5' },
        { t: 'achtung', h: 'Der Versuch ist ein <b>Modell</b>: Das Wasser <b>spielt</b> nur die Magensäure. Echte Magensäure zersetzt die Nahrung, Wasser weicht den Keks nur auf. Den Brei hat vor allem das <b>Kneten</b> gemacht.' },
        { t: 'stolper', st: 'S11', h: 'Im Versuch war <b>keine echte Magensäure</b> – das Wasser stand nur für die Magensäure.' },
        { t: 'alltag', h: 'Warum soll man gut kauen? Je kleiner die Stücke, desto leichter hat es der Magen.' }
      ]
    },

    /* ================= 9 HAUT ================= */
    {
      id: 'haut', nr: 9, title: 'Die Haut', short: 'Haut', color: '#C84F7E', icon: 'skin',
      src: 'H1 S.11–12, S.22',
      lz: [
        ['9.1', 'Ich weiß: Die Haut ist das größte Organ (etwa 2 m² beim Erwachsenen).'],
        ['9.2', 'Ich kann Schutzaufgaben der Haut nennen.'],
        ['9.3', 'Ich weiß, was wir mit der Haut spüren.'],
        ['9.4', 'Ich kann die drei Hautschichten von außen nach innen nennen.'],
        ['9.5', 'Ich weiß, was die Oberhaut ist und macht.'],
        ['9.6', 'Ich kann Teile der Lederhaut und ihre Aufgaben nennen.'],
        ['9.7', 'Ich weiß, was die Unterhaut mit den Fettpolstern macht.'],
        ['9.8', 'Ich kann Schwitzen und Gänsehaut erklären.'],
        ['9.9', 'Ich kann alle Begriffe im Hautbild zeigen.']
      ],
      blocks: [
        { t: 'merk', h: 'Die <b>Haut</b> ist das <b>größte Organ</b>, denn sie bedeckt unseren ganzen Körper. Bei Erwachsenen ist das ungefähr eine Fläche von <b>2 Quadratmetern</b> – so groß wie ein großes Badetuch (1 m × 2 m).', s: 'H1 S.12, S.22' },
        { t: 'merk', h: 'Die Haut schützt den Körper vor <b>Verletzungen</b>, <b>Infektionen</b>, <b>Kälte</b> und <b>Hitze</b>. Sie ist <b>dehnbar</b> und <b>wasserdicht</b>: Durch die Oberhaut können wir schwitzen, aber es kann kein Wasser in den Körper eindringen.', s: 'H1 S.12, S.22' },
        { t: 'merk', h: 'Die Haut ist auch ein <b>Sinnesorgan</b>. Mit ihr spüren wir <b>Druck, Schmerz, Wärme und Kälte</b>.', s: 'H1 S.12' },
        { t: 'h', h: 'Die drei Hautschichten' },
        { t: 'diag', id: 'haut', cap: 'Wie auf deinem Arbeitsblatt: Tippe auf die Teile der Haut.' },
        { t: 'merk', h: 'Von außen nach innen: <b>Oberhaut – Lederhaut – Unterhaut</b>.' },
        { t: 'esel', h: '<b>O – L – U</b>: „<b>O</b>ma <b>l</b>iebt <b>U</b>rlaub.“ Von <b>o</b>ben nach <b>u</b>nten: <b>O</b>berhaut, <b>L</b>ederhaut, <b>U</b>nterhaut.' },
        { t: 'steps', items: [
          ['🔝', 'Oberhaut', 'Die oberste Schicht – du kannst sie sehen. Ganz außen liegt die <b>Hornschicht</b>, ein <b>Schuppenpanzer</b>. Die <b>Hautschuppen</b> werden <b>ständig erneuert</b>.'],
          ['🧵', 'Lederhaut', 'Hier liegen viele feine <b>Blutgefäße</b> (sie versorgen die Haut mit Nährstoffen und sorgen für die richtige Temperatur), <b>Sinneszellen</b> (auch in der Oberhaut), die <b>Haarwurzeln</b> mit den kleinen <b>Haarmuskeln</b>, <b>Talgdrüsen</b> und <b>Schweißdrüsen</b>.'],
          ['🛋️', 'Unterhaut', 'Die unterste Schicht. Hier liegen die <b>Fettpolster</b>. Sie funktionieren wie <b>Stoßdämpfer</b> und schützen die inneren Organe vor <b>Kälte und Hitze</b>.']
        ], s: 'H1 S.12' },
        { t: 'extra', h: 'Die Oberhaut erneuert sich ungefähr <b>alle vier Wochen</b> – alte Hautschuppen fallen unbemerkt ab. Der <b>Talg</b> aus den Talgdrüsen fettet Haut und Haare ein und hält sie geschmeidig.' },
        { t: 'h', h: 'Schwitzen und Gänsehaut' },
        { t: 'widget', w: 'gaensehaut', cap: 'Probier beide Knöpfe aus.' },
        { t: 'merk', h: 'In den <b>Schweißdrüsen</b> wird <b>Schweiß</b> gebildet. Er ist wichtig, um den Körper an heißen Tagen oder bei Anstrengung <b>abzukühlen</b> (er verdunstet auf der Haut).<br><b>Gänsehaut:</b> Die kleinen <b>Haarmuskeln</b> an den Haarwurzeln ziehen sich zusammen und lassen die Haare <b>aufstehen</b>.', s: 'H1 S.12' },
        { t: 'heft', h: '„Die Haut erneuert sich ein ganzes Leben lang immer wieder. Sie wächst schneller als jedes andere Organ.“', s: 'H1 S.22' },
        { t: 'achtung', h: 'Dass sich die Haut <b>ein Leben lang erneuert</b>, stimmt. Ob sie wirklich „schneller als jedes andere Organ“ wächst, ist fachlich nicht sicher – die Darmschleimhaut erneuert sich zum Beispiel noch schneller. Merke dir für die Arbeit vor allem: <b>Die Haut erneuert sich ständig.</b>' }
      ]
    },

    /* ================= 10 WAHRNEHMUNG ================= */
    {
      id: 'wahrnehmung', nr: 10, title: 'Fühlen & Wahrnehmen', short: 'Wahrnehmung', color: '#4A58D0', icon: 'hand',
      src: 'H1 S.9–10, S.12',
      lz: [
        ['10.1', 'Ich kenne die vier Wahrnehmungsbereiche.'],
        ['10.2', 'Ich kann Alltagssituationen der richtigen Wahrnehmung zuordnen.'],
        ['10.3', 'Ich weiß, wie eine Berührung im Gehirn ankommt.'],
        ['10.4', 'Ich weiß, dass Sinneskörperchen unterschiedlich verteilt sind.'],
        ['10.5', 'Ich kann den Sinneskörperchentest (Zwei-Stifte-Versuch) beschreiben.']
      ],
      blocks: [
        { t: 'merk', h: 'Es gibt <b>vier Wahrnehmungsbereiche</b>:<br>⚡ <b>Schmerzwahrnehmung</b> · 🌡️ <b>Temperaturwahrnehmung</b> · 🤗 <b>Berührungswahrnehmung</b> · 🔎 <b>Erkundungswahrnehmung</b>', s: 'H1 S.10' },
        { t: 'cards', items: [
          ['⚡', 'Schmerz', 'Max rutscht beim Nähen mit der Nadel ab und sticht sich in den Finger.'],
          ['🌡️', 'Temperatur', 'Lara prüft mit dem Fuß, wie warm das Badewasser ist.'],
          ['🤗', 'Berührung', 'Frieda ist traurig. Ihre Freundin Sandra nimmt sie in den Arm.'],
          ['🔎', 'Erkundung', 'Lukas läuft barfuß über die weiche Wiese. Auf dem Kiesweg muss er langsamer gehen.']
        ], s: 'H1 S.10' },
        { t: 'p', h: '<b>Erkundung</b> heißt: Du <b>ertastest aktiv</b>, wie sich etwas anfühlt – weich, hart, rau, glatt oder spitz. Zum Beispiel barfuß über Gras und Kies laufen oder in einer Fühlkiste raten.' },
        { t: 'h', h: 'Vom Reiz zum Gehirn' },
        { t: 'diag', id: 'reizweg', cap: 'So kommt eine Berührung im Gehirn an.' },
        { t: 'p', h: 'In der Haut liegen <b>Sinneskörperchen</b>. Sie sind dazu da, die Reize, die Berührungen auslösen, an unser <b>Gehirn</b> weiterzuleiten.', s: 'H1 S.9' },
        { t: 'extra', h: 'Genauer: Die Sinneskörperchen <b>nehmen den Reiz auf</b>. <b>Nerven</b> leiten die Nachricht blitzschnell zum <b>Gehirn</b>. Erst das Gehirn erkennt: „Aua, spitz!“ oder „Oh, warm!“' },
        { t: 'h', h: 'Nicht überall gleich viele Sinneskörperchen' },
        { t: 'merk', h: 'Nicht überall in der Haut liegen gleich viele Sinneskörperchen. In den <b>Fingerspitzen</b> liegen <b>sehr viele</b> dicht beieinander, am <b>Rücken</b> nur <b>wenige</b>.', s: 'H1 S.9' },
        { t: 'diag', id: 'dichte', cap: 'Jeder Punkt steht für Sinneskörperchen.' },
        { t: 'versuch', title: 'Versuch: Sinneskörperchentest', steps: [
          'Ihr braucht: eine <b>Augenbinde</b>, <b>zwei Stifte</b>, <b>einen Partner</b>. Vorher eine <b>Vermutung</b> aufschreiben!',
          'Die <b>Versuchsperson verbindet sich die Augen</b>.',
          'Der Partner berührt sie vorsichtig an verschiedenen Körperstellen – <b>abwechselnd mit einem oder zwei Stiften</b> (stumpfe Seite).',
          'Die Versuchsperson sagt nach jeder Berührung, <b>mit wie vielen Stiften</b> sie berührt wurde.',
          'Der Partner <b>schreibt die Antworten auf</b> (richtig oder falsch wahrgenommen?).',
          'Dann <b>wechselt ihr die Rollen</b>.'
        ], h: '<b>Ergebnis:</b> An den <b>Fingerspitzen</b> spürst du zwei nahe Stifte meist als <b>zwei</b>. Am <b>Rücken</b> fühlen sich zwei nahe Stifte oft an wie <b>einer</b>. → <b>Nicht überall sind gleich viele Sinneskörperchen.</b>', s: 'H1 S.9' },
        { t: 'widget', w: 'zweistifte', cap: 'Teste in Gedanken: Wo spürst du zwei Stifte?' },
        { t: 'achtung', h: 'Damit der Test fair ist, müssen die Stifte überall <b>gleich weit auseinander</b> sein. Jeder Mensch spürt etwas anders – deine Ergebnisse können von denen deines Partners abweichen.' }
      ]
    },

    /* ================= 11 SONNE ================= */
    {
      id: 'sonne', nr: 11, title: 'Sonne: Nutzen & Schaden', short: 'Sonne', color: '#D99A00', icon: 'sun',
      src: 'H1 S.7–8',
      lz: [
        ['11.1', 'Ich kann positive Wirkungen der Sonne nennen.'],
        ['11.2', 'Ich weiß, warum die Sonne für die Knochen wichtig ist (UV-B → Vitamin D).'],
        ['11.3', 'Ich kenne Sofort-Schäden durch zu viel Sonne.'],
        ['11.4', 'Ich kenne Langzeitschäden durch zu viel Sonne.'],
        ['11.5', 'Ich kann mindestens fünf Wege nennen, mich vor zu viel Sonne zu schützen.']
      ],
      blocks: [
        { t: 'merk', h: 'Ohne die Sonne gäbe es <b>kein Leben</b> auf der Erde. Sie sorgt für <b>Licht und Wärme</b> und ermöglicht die <b>Fotosynthese</b> bei Pflanzen. Sie ist wichtig für unser <b>Wohlbefinden</b>: Sonnenstrahlen steigern die <b>Leistungsfähigkeit</b>, und wir fühlen uns <b>glücklicher</b>.', s: 'H1 S.7' },
        { t: 'extra', h: '<b>Fotosynthese:</b> Pflanzen machen mit Sonnenlicht aus Wasser und Luft ihre Nahrung – dabei entsteht <b>Sauerstoff</b>, den wir atmen.' },
        { t: 'h', h: 'Sonne für starke Knochen' },
        { t: 'diag', id: 'vitamind', cap: 'Von der Sonne zum Knochen.' },
        { t: 'merk', h: 'Mit der <b>UV-B-Strahlung</b> der Sonne bildet die Haut eine Vorstufe von <b>Vitamin D</b> (im Heft: Provitamin D). Daraus macht der Körper Vitamin D. <b>Vitamin D ist wichtig für den Knochenaufbau.</b>', s: 'H1 S.7' },
        { t: 'achtung', h: 'Für Vitamin D braucht man <b>keinen Sonnenbrand und kein Sonnenbaden</b>. Schon beim normalen Spielen draußen bildet die Haut genug. Längeres Sonnen bringt nicht mehr Vitamin D – nur mehr Schäden.' },
        { t: 'h', h: 'Zu viel Sonne schadet' },
        { t: 'merk', h: '<b>Sofort-Schäden (akut):</b> <b>Sonnenbrand</b>, <b>Bindehautentzündung</b> am Auge.<br><b>Langzeitschäden (chronisch):</b> <b>vorzeitige Hautalterung</b>, <b>Grauer Star</b> (Augenkrankheit, die Linse wird trüb) und im schlimmsten Fall <b>Hautkrebs</b>.<br>UV-Strahlung kann außerdem das <b>Immunsystem schwächen</b>.', s: 'H1 S.7' },
        { t: 'p', h: 'Hautkrebs ist eine der schlimmsten Folgen von zu viel UV-Strahlung. Besonders betroffen sind Stellen, die schlecht vor der Sonne geschützt sind – zu einem großen Teil das <b>Gesicht</b>.', s: 'H1 S.7' },
        { t: 'stolper', st: 'S14', h: 'Das Wort heißt <b>Binde·haut·entzündung</b>. Die Bindehaut ist die dünne Haut vorne am Auge.' },
        { t: 'h', h: 'So schützt du dich' },
        { t: 'widget', w: 'sonnenfit', cap: 'Mach dich sonnenfit: Tippe alles an, was schützt.' },
        { t: 'merk', h: '🧴 <b>Sonnencreme mit hohem Lichtschutzfaktor</b> · 👕 <b>lange Kleidung</b> · 🧢 <b>Kopfbedeckung</b> · 🕶️ <b>Sonnenbrille</b> – und dazu: 🌳 <b>Schatten suchen</b> · 🕛 <b>Mittagssonne meiden</b>.', s: 'H1 S.7–8' },
        { t: 'esel', h: '<b>Creme, Kleidung, Kappe, Brille, Schatten</b> – „Mit C-K-K-B-S bin ich sonnenfit!“' },
        { t: 'extra', h: 'Das Bundesamt für Strahlenschutz rät: Für Kinder Sonnencreme mit <b>sehr hohem Lichtschutzfaktor (50+)</b>. Am besten schützen <b>Schatten und Kleidung</b>. Zwischen etwa <b>11 und 15 Uhr</b> ist die Sonne am stärksten. Creme schützt nur eine Zeit lang – sie ist kein Grund, länger in der prallen Sonne zu bleiben.' }
      ]
    },

    /* ================= 12 TRANSFER ================= */
    {
      id: 'transfer', nr: 12, title: 'Alles hängt zusammen', short: 'Zusammenspiel', color: '#2E8B57', icon: 'puzzle',
      src: 'alle Seiten',
      lz: [
        ['12.1', 'Ich kann den Weg des Sauerstoffs von der Luft bis in die Muskeln erklären.'],
        ['12.2', 'Ich kann erklären, warum beim Sport Atmung und Herzschlag schneller werden und warum ich schwitze.'],
        ['12.3', 'Ich kann das Zusammenspiel von Muskel, Sehne, Knochen und Gelenk erklären.'],
        ['12.4', 'Ich kann erklären, wie Wirbelsäule und Bandscheiben beim Springen helfen.'],
        ['12.5', 'Ich kann erklären, wie die Nährstoffe aus dem Essen in meinen Körper kommen.'],
        ['12.6', 'Ich kann Nieren/Blase und Leber auseinanderhalten.'],
        ['12.7', 'Ich kann Haut, Wahrnehmung und Sonnenschutz im Alltag anwenden.']
      ],
      blocks: [
        { t: 'p', h: 'In der Klassenarbeit gibt es oft Fragen, bei denen du <b>mehrere Kapitel verbinden</b> musst. Hier übst du genau das.' },
        { t: 'h', h: 'Die Reise des Sauerstoffs' },
        { t: 'chain', items: ['Luft', 'Nase / Mund', 'Luftröhre', 'Bronchien', 'Lungenbläschen', 'Blut', 'Herz', 'Arterien', 'Muskeln'] },
        { t: 'h', h: 'Erkläre wie ein Profi' },
        { t: 'szenen', items: [
          ['🏃', 'Du rennst bei warmem Wetter.', 'Die Muskeln brauchen mehr <b>Sauerstoff</b> (und Nährstoffe). Darum atmest du <b>schneller und tiefer</b>, und das <b>Herz</b> schlägt schneller und pumpt das Blut schneller zu den Muskeln. Weil dir warm wird, <b>schwitzt</b> du – der Schweiß <b>kühlt</b> den Körper.'],
          ['🎒', 'Du hebst eine schwere Tasche.', 'Der <b>Bizeps</b> zieht sich zusammen und wird <b>kürzer und dicker</b>. Über die <b>Sehne</b> zieht er am <b>Knochen</b> (Unterarm). Das <b>Ellenbogengelenk</b> (Scharniergelenk) macht die Bewegung möglich – der Arm beugt sich.'],
          ['🤸', 'Du springst auf dem Schulhof und landest auf beiden Füßen.', 'Die Wirbelsäule federt durch ihre <b>doppelte S-Form</b> wie eine Sprungfeder. Die <b>Bandscheiben</b> zwischen den Wirbeln dämpfen den Stoß wie kleine Kissen. So bist du vor <b>Erschütterungen</b> geschützt.'],
          ['🍌', 'Du isst eine Banane.', 'Im <b>Mund</b> wird sie zerkaut und mit Speichel vermischt, rutscht durch die <b>Speiseröhre</b> in den <b>Magen</b> und wird zu Brei geknetet. Im <b>Dünndarm</b> gehen die <b>Nährstoffe ins Blut</b>, und das <b>Blut</b> verteilt sie im ganzen Körper. (Durch die Leber wandert die Banane nicht!)'],
          ['🥤', 'Du hast viel getrunken und musst zur Toilette.', 'Die <b>Nieren</b> filtern das Blut und bilden <b>Urin</b>. Der Urin wird in der <b>Blase</b> gesammelt. Ist sie voll, bekommst du ein Zeichen, dass du zur Toilette musst.'],
          ['☕', 'Du fasst eine heiße Tasse an.', '<b>Sinneskörperchen</b> in der Haut nehmen die Hitze wahr (Temperaturwahrnehmung, vielleicht auch Schmerz). <b>Nerven</b> leiten die Nachricht zum <b>Gehirn</b>, und du ziehst die Hand weg.'],
          ['🏖️', 'Ein Tag im Freibad.', 'Sonnencreme mit hohem Lichtschutzfaktor (nach dem Baden erneut), T-Shirt, Kopfbedeckung, Sonnenbrille und mittags in den <b>Schatten</b>. So vermeidest du Sonnenbrand und Augenschäden.']
        ] },
        { t: 'merk', h: '<b>Profi-Tipps für die Klassenarbeit:</b><br>• Antworte in ganzen Sätzen.<br>• Steht da „Nenne drei …“, nenne wirklich drei Dinge.<br>• Achte auf das <b>UND</b>: Muskel wird kürzer <b>und</b> dicker · Blut bringt Sauerstoff <b>und</b> Nährstoffe · bei Anstrengung schneller <b>und</b> tiefer atmen · Wirbelsäule: <b>doppeltes</b> S.' }
      ]
    }
  ];

  /* ---------- Adas Stolperstellen ---------- */
  A.stolper = [
    { id: 'S1', title: 'Wirbelzahlen 7 – 12 – 5', text: 'Hals 7, Brust 12, Lende 5 – zusammen 24 bewegliche Wirbel.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'wirbel' },
    { id: 'S2', title: 'Doppelte S-Form', text: 'Die Wirbelsäule ist ein doppeltes S – sie federt beim Gehen und Springen.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'wirbel' },
    { id: 'S3', title: 'Kleinster Knochen im Ohr', text: 'Gehörknöchelchen im Ohr – genauer der Steigbügel im Mittelohr.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'skelett' },
    { id: 'S4', title: 'Muskel: kürzer UND dicker', text: 'Beim Zusammenziehen wird der Muskel kürzer und dicker.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'muskeln' },
    { id: 'S5', title: 'Nieren oder Leber?', text: 'Nieren filtern Blut und bilden Urin; die Leber entgiftet und speichert Nährstoffe.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'organe' },
    { id: 'S6', title: 'Dünndarm oder Dickdarm?', text: 'Dünndarm: Nährstoffe ins Blut. Dickdarm: Wasser und Mineralstoffe entziehen.', herkunft: 'Elternliste + Heft 1, S. 4–5 (erst falsch eingetragen)', kap: 'verdauung' },
    { id: 'S7', title: 'Blut: Sauerstoff UND Nährstoffe', text: 'Das Blut verteilt beides im ganzen Körper.', herkunft: 'bekannte Stolperstelle (Elternliste)', kap: 'blut' },
    { id: 'S8', title: 'Namen auf dem Skelettblatt', text: 'Oberschenkelknochen, Wadenbein, Fußwurzelknochen, Brustbein, Schlüsselbein, Schulterblatt.', herkunft: 'Heft 2, S. 2 (Einträge „Oberbein“, „Wirbelbein“, „Fußknochen“, „Brust“, „Schalter“)', kap: 'skelett' },
    { id: 'S9', title: 'Magen oder Darm?', text: 'Magen knetet zu Brei; Darm trennt Nährstoffe und Abfallstoffe.', herkunft: 'Heft 1, S. 13 (Puzzle-Texte vertauscht)', kap: 'organe' },
    { id: 'S10', title: 'Essen geht nicht durch die Leber', text: 'Die Leber hilft von außen – die Nahrung wandert an ihr vorbei.', herkunft: 'Heft 1, S. 4 (Bananen-Text) und S. 5', kap: 'verdauung' },
    { id: 'S11', title: 'Magenversuch ist ein Modell', text: 'Das Wasser spielt nur die Magensäure.', herkunft: 'Heft 1, S. 5 (Antwort zum Versuch)', kap: 'verdauung' },
    { id: 'S12', title: 'Belastung: schneller UND tiefer atmen', text: 'Mehr Sauerstoff wird gebraucht → schneller und tiefer atmen → mehr Sauerstoff ins Blut.', herkunft: 'Heft 1, S. 3 (Antwort unvollständig)', kap: 'atmung' },
    { id: 'S13', title: '24 bewegliche – meist 33 insgesamt', text: 'Bewegliche Wirbel: 24. Mit Kreuz- und Steißbein meist 33.', herkunft: 'Heft 1, S. 23 (Antwort „24“) und Heft 2, S. 2 (33)', kap: 'wirbel' },
    { id: 'S14', title: 'Bindehautentzündung', text: 'Richtiges Fachwort für die Augenentzündung durch zu viel Sonne.', herkunft: 'Heft 1, S. 8 (Schreibweise)', kap: 'sonne' }
  ];

  /* ---------- Abdeckungsmatrix: Quelle/Seite → Lernziele → Kapitel ---------- */
  A.quellen = [
    ['H1', 1, 'Deckblatt „Der Körper – Skelett und Knochen, Gelenke, Muskeln, Organe“', [], ''],
    ['H1', 2, 'Die Atmung: Text, Bild mit Nummern 1–5, Weg der Luft notieren', ['7.1', '7.2', '7.3'], 'atmung'],
    ['H1', 3, 'Versuch „Die Atmung messen“ (Vermutung/Messung) und Text „Warum atmest du bei Belastungen stärker?“', ['7.5', '7.6', '6.8'], 'atmung'],
    ['H1', 4, 'Die Verdauung: Weg einer Banane, Verdauungsorgane anmalen und beschreiben', ['8.1', '8.4', '12.5'], 'verdauung'],
    ['H1', 5, 'Wie arbeitet unser Magen? Lückentext, Bild, Magenversuch (Tüte, Keks, Wasser)', ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7'], 'verdauung'],
    ['H1', 6, 'Blutkreislauf: Karten zu Herz, Lunge und Blutgefäß (Richtwerte, Arterie/Vene, Puls, Zwerchfell)', ['6.1', '6.3', '6.5', '6.6', '6.7', '7.4'], 'blut'],
    ['H1', 7, 'Infotext: Nutzen und Schaden von Sonne', ['11.1', '11.2', '11.3', '11.4', '11.5'], 'sonne'],
    ['H1', 8, 'Mein Wissen über Nutzen und Schaden der Sonne (eigene Antworten)', ['11.1', '11.3', '11.5'], 'sonne'],
    ['H1', 9, 'Versuch: Sinneskörperchentest (Ablauf, Tabelle, Ergebnis)', ['10.3', '10.4', '10.5'], 'wahrnehmung'],
    ['H1', 10, 'Wahrnehmung: vier Bereiche mit Beispielen (Max, Lara, Frieda, Lukas)', ['10.1', '10.2'], 'wahrnehmung'],
    ['H1', 11, 'Die Haut: Bild beschriften (Haar, Schweißdrüse, Talgdrüse, Blutgefäße, Haarmuskel, Hornschicht, 3 Schichten)', ['9.4', '9.9'], 'haut'],
    ['H1', 12, 'Infotext: Aufbau und Funktion der Haut', ['9.1', '9.2', '9.3', '9.5', '9.6', '9.7', '9.8'], 'haut'],
    ['H1', 13, 'Organ-Puzzle: Gehirn, Herz, Nieren, Leber, Lunge, Blase, Darm, Magen', ['5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9'], 'organe'],
    ['H1', 14, 'Unsere Organe: Lückentext (Gehirn, Herz, Lunge, Magen, Leber, Nieren)', ['5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.10', '6.2'], 'organe'],
    ['H1', 15, 'Unsere Organe: Lückentext (Blase, Darm) und Wortliste', ['5.8', '5.9'], 'organe'],
    ['H1', 16, 'Unsere Organe: Bild mit Wortkarten (8 Organe)', ['5.1'], 'organe'],
    ['H1', 17, 'Meine Muskeln: Text, Malauftrag, Fragen, Merksatz, Muskelkater', ['1.7', '4.4', '4.5', '4.6', '4.7'], 'muskeln'],
    ['H1', 18, 'Muskeln: Zahlen 1–8 eintragen (Bild Mann/Frau)', ['4.7'], 'muskeln'],
    ['H1', 19, 'Unseren Gelenken auf der Spur: Wo/Wofür, Kugel- und Scharniergelenk, zuordnen', ['3.2', '3.3', '3.4', '3.5', '3.6'], 'gelenke'],
    ['H1', 20, 'Meine Gelenke: Lückentext (M/G/K), Gelenkarten, Gelenke beschriften', ['3.3', '3.4', '3.5', '3.6', '3.7'], 'gelenke'],
    ['H1', 21, 'Heftnotiz „Gelenke“ (27.10.): Definition, Gelenkarten Dreh-/Klappgelenk', ['3.1', '3.2', '3.4', '3.5'], 'gelenke'],
    ['H1', 22, 'Heftnotiz Übung (3.11.): Muskelfasern, Sehnen, kürzer und dicker; Übung Haut (13.11.)', ['4.1', '4.2', '4.3', '9.1', '9.2', '9.9'], 'muskeln'],
    ['H1', 23, 'Unsere Wirbelsäule: Zeichnung, Aufgaben, Anfang/Ende, Wirbel und Bandscheibe, Anzahl', ['2.1', '2.5', '2.6'], 'wirbel'],
    ['H1', 24, 'Heftnotiz Wirbelsäule: einzelne Wirbel, Bandscheiben, doppeltes S, 7/12/5', ['2.1', '2.2', '2.3', '2.5'], 'wirbel'],
    ['H2', 1, 'Bild „Die Wirbelsäule in Seitenansicht“ (Atlas, Axis, 7/12/5, Kreuzbein, Steißbein, Bandscheiben)', ['2.3', '2.4'], 'wirbel'],
    ['H2', 2, 'Arbeitsblatt „Skelettknochen“ (20 Knochen mit Anzahlen, 206–220, 213)', ['1.5', '1.6'], 'skelett'],
    ['H2', 3, 'Infotext „Unser Skelett“ (Aufgaben, Schutz, größter/kleinster Knochen, Gelenke)', ['1.1', '1.2', '1.3', '1.4', '2.5', '3.1'], 'skelett']
  ];

  /* ---------- Korrekturen, Vereinfachungen, Unklarheiten (für Eltern) ---------- */
  A.korrekturen = [
    ['Vereinfachung', 'H2 S.2', 'Skelettblatt: 213 Knochen, „206–220“', 'Das Blatt zählt zusammengewachsene Knochen einzeln (Becken 3 + 3, Wirbelsäule 33, Schädel 25). Fachbücher: Erwachsene meist 206. Beide Angaben werden gezeigt und als Blatt-Zählweise markiert.'],
    ['Präzisierung', 'H2 S.3', 'Kleinster Knochen „Gehörknöchelchen“', 'Es gibt drei Gehörknöchelchen (Hammer, Amboss, Steigbügel); der kleinste ist der Steigbügel im Mittelohr. Beide Antworten werden akzeptiert.'],
    ['Vereinfachung', 'H2 S.3', 'Brustkorb schützt „die Leber“', 'Die Rippen bedecken nur den oberen Teil der Leber.'],
    ['Uneindeutig', 'H1 S.23–24, H2 S.1–2', 'Anzahl der Wirbel', '24 bewegliche (7 + 12 + 5); insgesamt mit Kreuzbein (5) und Steißbein (Abbildung: 4–5; fachlich 3–5, meist 4) meist 33. Das Skelettblatt zählt 33, Adas Antwort „24“ bezog sich auf die beweglichen Wirbel. Die App fragt beide Zahlen mit klarer Formulierung ab.'],
    ['Fachlich ungenau', 'H1 S.19, S.21', 'Kugelgelenk „= Drehgelenk“', 'Fachlich ist das Drehgelenk (Rad-/Zapfengelenk, z. B. Atlas–Axis) eine eigene Gelenkart. Schulterminologie wird beibehalten und als Unterrichtsbegriff gekennzeichnet; Erklärung im Kapitel Gelenke.'],
    ['Vereinfachung', 'H1 S.19–20', 'Scharniergelenk „in eine Richtung“, Knie als Scharniergelenk', 'Genauer: Bewegung in einer Ebene (beugen/strecken). Das Knie ist ein Dreh-Scharniergelenk; im Unterricht als Scharniergelenk gezählt.'],
    ['Fachlich schief', 'H1 S.20', 'Lückentext „durch M… verbunden … G… an den K… befestigt“', 'Die vorgegebenen Buchstaben ergeben „Muskeln … Gelenke … Knochen“. Fachlich: Gelenke verbinden Knochen beweglich, Muskeln sind über Sehnen an Knochen befestigt, Bänder halten die Gelenke zusammen. Wird als Heftversion geübt und erklärt.'],
    ['Vereinfachung', 'H1 S.17', 'Merksatz „Muskeln halten unsere Knochen zusammen“', 'Zusammengehalten werden Knochen vor allem durch Bänder und Gelenkkapseln; Muskeln und Sehnen stabilisieren und bewegen.'],
    ['Vereinfachung', 'H1 S.13–14', 'Leber „holt alle Abfallstoffe aus dem Blut“', 'Die Leber wandelt Giftstoffe um (Entgiftung) und speichert Nährstoffe; ausgeschieden werden viele Abfallstoffe über die Nieren (Urin). Wichtig für die Stolperstelle Niere/Leber.'],
    ['Vereinfachung', 'H1 S.14', 'Herz „auf der linken Seite“', 'Das Herz liegt fast mittig hinter dem Brustbein, etwas nach links verschoben.'],
    ['Fehler im Arbeitsblatt', 'H1 S.5', '„Die verdaulichen Reste werden … in den Dickdarm“', 'Gemeint sind die unverdaulichen Reste. Die App verwendet „unverdauliche Reste“ und weist auf die Blattformulierung hin.'],
    ['Vereinfachung', 'H1 S.5', '„Der Brei wandert vorbei an der Leber“', 'Die Leber liegt nicht auf dem Nahrungsweg; sie gibt Gallensaft (über die Gallenblase) in den Dünndarm. Wichtig für Adas Fehler „Banane geht in die Leber“ (S. 4).'],
    ['Modell', 'H1 S.5', 'Magenversuch: Wasser = Magensäure', 'Wasser ist nur ein Modell für Magensaft; der Brei entsteht durch Aufweichen und Kneten, nicht durch Säure.'],
    ['Richtwerte', 'H1 S.6', '2–3 Liter Blut, fast 10.000 Liter/Tag, ca. 1 Minute', 'Unterrichtsrichtwerte. Erwachsene haben etwa 5 Liter Blut (MSD Manual); in Ruhe pumpt das Herz etwa 5 l/min ≈ 7.000 l/Tag, bei Belastung mehr. 2–3 Liter passt ungefähr für Kinder. Werden als „ungefähr“ abgefragt.'],
    ['Präzisierung', 'H1 S.6', 'Arterien sauerstoffreich / Venen sauerstoffarm', 'Gilt im Körperkreislauf. Im Lungenkreislauf umgekehrt (Lungenarterie sauerstoffarm, Lungenvene sauerstoffreich). Blut ist immer rot; blau ist Zeichenkonvention. Als Ergänzung erklärt.'],
    ['Richtwert', 'H1 S.6', '15–20 Atemzüge pro Minute in Ruhe', 'Heft-Richtwert (eher Erwachsene). Kinder von 7–9 Jahren atmen in Ruhe oft etwa 16–24-mal pro Minute.'],
    ['Nicht verwendet', 'H1 S.3', 'Adas Messwerte im Atemversuch', 'Die Tabelle enthält eigene, teils durchgestrichene oder schwer lesbare Werte (auch zwei handschriftlich ergänzte Tätigkeiten). Sie werden nicht als Quizfakten verwendet; geübt wird der Zusammenhang Belastung → mehr Atemzüge.'],
    ['Nicht belegbar', 'H1 S.22', 'Haut „wächst schneller als jedes andere Organ“', 'Die Haut erneuert sich ständig (Oberhaut etwa alle vier Wochen); andere Gewebe wie die Darmschleimhaut erneuern sich noch schneller. Die Aussage wird als Heftangabe gezeigt, abgefragt wird „erneuert sich ein Leben lang“.'],
    ['Präzisierung', 'H1 S.12, S.22', 'Haut ca. 2 m²', 'Erwachsene etwa 1,5–2 m², je nach Körpergröße.'],
    ['Präzisierung', 'H1 S.9', 'Sinneskörperchen „leiten Reize an das Gehirn weiter“', 'Genauer: Sinneskörperchen nehmen Reize auf, Nerven leiten die Signale zum Gehirn.'],
    ['Unterrichtsbegriff', 'H1 S.10', '„Erkundungswahrnehmung“', 'Schulbegriff für aktives Ertasten (fachlich: haptische Wahrnehmung). Wird unverändert verwendet.'],
    ['Präzisierung', 'H1 S.7', '„Provitamin D“', 'Fachlich bildet die Haut mit UV-B eine Vorstufe (Prävitamin D3), daraus entsteht Vitamin D. In der App: „Vorstufe von Vitamin D“. Keine Empfehlung zu absichtlichem ungeschütztem Sonnen (BfS: längere Bestrahlung erhöht nicht das Vitamin D, nur das Risiko).'],
    ['Ergänzung', 'H1 S.7–8', 'Sonnenschutz', 'Das Heft nennt Creme mit hohem LSF, lange Kleidung, Kopfbedeckung, Sonnenbrille. Ergänzt nach BfS/BZgA: Schatten, Mittagssonne (ca. 11–15 Uhr) meiden, für Kinder LSF 50+.'],
    ['Ergänzung', 'Pflichtstoff', 'Wirbelsäule schützt das Rückenmark; Zwerchfell beim Einatmen; Trizeps; Gallensaft', 'Nicht ausdrücklich im Heft, laut Pflichtstoff bzw. zum Verständnis ergänzt und als „Extra“ gekennzeichnet.'],
    ['Adas Fehler', 'H2 S.2', 'Skelettblatt-Einträge', '„Oberbein“ (→ Oberschenkelknochen), „Wirbelbein“ (→ Wadenbein), „Fußknochen“ (→ Fußwurzelknochen), „Brust“ (→ Brustbein), „Schalter“ beim Schlüsselbein-Kästchen, unklares Wort beim Schulterblatt-Kästchen, „Schedel“ (→ Schädel). Im Fehlertraining (S8).'],
    ['Adas Fehler', 'H1 S.13', 'Organ-Puzzle', 'Texte von Magen und Darm vertauscht. Im Fehlertraining (S9).'],
    ['Adas Fehler', 'H1 S.4–5', 'Verdauungsweg', 'Banane „geht in die Leber“; im Lückentext zuerst Leber/Dünndarm/Dickdarm vertauscht (später korrigiert). Fehlertraining S6, S10.'],
    ['Adas Fehler', 'H1 S.3, S.5, S.8', 'Unvollständige Antworten', 'Belastung/Atmung ohne „schneller und tiefer → mehr Sauerstoff ins Blut“ (S12); Magenversuch „Magensäure hat den Keks zerlegt“ (S11); „Blindenhautentzündung“ (S14).']
  ];

  A.webquellen = [
    ['MSD Manual (Ausgabe für Patienten): Überblick über das Blut – „rund 5 Liter Blut“', 'https://www.msdmanuals.com/de/heim/bluterkrankungen/das-blut/überblick-über-das-blut'],
    ['BfS/Bundesregierung: Schutz gegen UV-Strahlung (Schatten, Mittagssonne meiden)', 'https://www.bundesregierung.de/breg-de/themen/tipps-fuer-verbraucher/schutz-gegen-uv-strahlung-2185406'],
    ['gesund.bund.de (BMG): UV-Schutz und Hautkrebsprävention', 'https://gesund.bund.de/uv-schutz-hautkrebspraevention'],
    ['BZgA/BIÖG kindergesundheit-info.de: Sonnenschutz für Kinder', 'https://www.kindergesundheit-info.de/fileadmin/user_upload/kindergesundheit-info.de/sonnenschutz-kinder_BZgA_kindergesundheit-info.pdf'],
    ['BfS-Broschüre „Sonne und Sonnenschutz“ (Archiv): Auge, Immunsystem, Vitamin D', 'https://archiv.bge.de/archiv/www.asse.bund.de/SharedDocs/Downloads/BfS/DE/broschueren/opt/strko-sonne-und-sonnenschutz0520.pdf'],
    ['Kenhub: Steißbein – meist vier Steißbeinwirbel (3–5 möglich)', 'https://www.kenhub.com/de/library/anatomie/steissbein-os-coccygis'],
    ['Gelenkformen: Knie als Drehscharniergelenk, Zapfengelenk Atlas–Axis', 'https://www.dr-gumpert.de/html/gelenkformen.html'],
    ['WikEM: Vitalwerte bei Kindern (Atemfrequenz 7–9 Jahre 16–24/min)', 'https://wikem.org/wiki/Vital_signs_(peds)/de'],
    ['aponet.de: Aufbau und Funktion der Haut (Fläche ca. 2 m², Erneuerung)', 'https://www.aponet.de/artikel/aufbau-und-funktion-der-haut-19195'],
    ['aponet.de: So funktioniert das Herz (Pumpleistung in Ruhe)', 'https://www.aponet.de/artikel/so-funktioniert-das-herz-19177']
  ];
})(window.ATLAS = window.ATLAS || {});
