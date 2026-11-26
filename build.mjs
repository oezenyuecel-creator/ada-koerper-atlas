// Baut index.html: alle Quelldateien werden in eine einzige, offline nutzbare HTML-Datei eingebettet.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const src = (f) => readFileSync(join(dir, 'src', f), 'utf8');
const JS_ORDER = ['engine.js', 'data-kapitel.js', 'data-fragen.js', 'dg-core.js', 'dg-skelett.js', 'dg-muskeln.js', 'dg-organe.js', 'dg-haut.js', 'app.js', 'widgets.js'];

const css = src('styles.css');
const js = JS_ORDER.map((f) => `/* ===== ${f} ===== */\n` + src(f)).join('\n');
if (/<\/script/i.test(js)) throw new Error('JS enthält </script – bitte maskieren.');

const html = src('shell.html').replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
writeFileSync(join(dir, 'index.html'), html);
writeFileSync(join(dir, 'Adas_Koerper_Atlas.html'), html);
console.log(`index.html gebaut: ${(html.length / 1024).toFixed(0)} KB`);
