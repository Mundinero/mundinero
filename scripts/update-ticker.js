/**
 * Actualiza los datos estáticos del ticker en index.html.
 * Corre en GitHub Actions — sin restricciones CORS.
 *
 * APIs usadas:
 *   - Yahoo Finance (sin key): ORO (GC=F) y WTI (CL=F)
 *   - Banxico SIE (BANXICO_TOKEN): tasa ref. + CETES 28d
 *   - INEGI (INEGI_TOKEN): inflación YoY
 *
 * Datos que se actualizan manualmente (cambio anual):
 *   - SAL. MÍN. ($278.80), UMA ($113.14)
 *   - MAGNA ($24.50), PREMIUM ($26.00)  ← CRE no tiene API pública sencilla
 */

const fs    = require('fs');
const https = require('https');

const FILE = 'index.html';
let html   = fs.readFileSync(FILE, 'utf8');

// ── Helpers ────────────────────────────────────────────────────────────────

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'mundinero-ticker-updater/1.0', ...headers } };
    https.get(url, opts, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.slice(0, 120)}`));
          return;
        }
        try { resolve(JSON.parse(raw)); }
        catch { reject(new Error(`JSON inválido: ${raw.slice(0, 120)}`)); }
      });
    }).on('error', reject);
  });
}

// Reemplaza val: '...' para el id dado en tickerState
function patchVal(id, newVal) {
  const re   = new RegExp(`(id: '${id}'[^\\n]*val: ')[^']+(')`);
  const next = html.replace(re, `$1${newVal}$2`);
  if (next === html) { console.warn(`  ⚠  sin match en tickerState para id="${id}"`); return; }
  html = next;
  console.log(`  ✓  ${id.padEnd(10)} → ${newVal}`);
}

// Reemplaza una constante numérica al inicio del script JS
function patchConst(name, numVal) {
  const re   = new RegExp(`(const ${name}\\s*=\\s*)[\\d.]+`);
  const next = html.replace(re, `$1${numVal}`);
  if (next !== html) console.log(`  ✓  const ${name} → ${numVal}`);
  html = next;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {

  // ── ORO (GC=F) y WTI (CL=F) — Yahoo Finance, sin API key ──────────────
  console.log('\n📊 Yahoo Finance: ORO y WTI');
  try {
    const url  = 'https://query1.finance.yahoo.com/v7/finance/quote'
               + '?symbols=GC%3DF%2CCL%3DF&fields=regularMarketPrice&lang=en-US&region=US';
    const data = await get(url);
    for (const q of data?.quoteResponse?.result ?? []) {
      const p = q.regularMarketPrice;
      if (!p) continue;
      if (q.symbol === 'GC=F') patchVal('oro', `$${Math.round(p).toLocaleString('en-US')}`);
      if (q.symbol === 'CL=F') patchVal('wti', `$${p.toFixed(2)}`);
    }
  } catch (e) { console.error('  ✗  Yahoo Finance:', e.message); }


  // ── BANXICO — tasa de referencia + CETES 28d ────────────────────────────
  console.log('\n🏦 Banxico API: tasa ref. + CETES 28d');
  const BX = process.env.BANXICO_TOKEN;
  if (!BX) {
    console.log('  ⏭  BANXICO_TOKEN no configurado.');
    console.log('     → Regístrate en https://www.banxico.org.mx/SieAPIRest/');
    console.log('       y agrega el token en Settings › Secrets › BANXICO_TOKEN');
  } else {
    const bxHdr = { 'Bmx-Token': BX };

    // SF61745 = Tasa objetivo de política monetaria
    try {
      const d = await get(
        'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF61745/datos/oportuno',
        bxHdr
      );
      const v = d?.bmx?.series?.[0]?.datos?.[0]?.dato;
      if (v && v !== 'N/E') patchVal('banxico', `${parseFloat(v).toFixed(2)}%`);
    } catch (e) { console.error('  ✗  Banxico tasa:', e.message); }

    // SF43936 = CETES 28 días, primario
    try {
      const d = await get(
        'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43936/datos/oportuno',
        bxHdr
      );
      const v = d?.bmx?.series?.[0]?.datos?.[0]?.dato;
      if (v && v !== 'N/E') {
        const num = parseFloat(v).toFixed(2);
        patchVal('cetes28', `${num}%`);
        patchConst('CETES_RATE', num);  // recalcula REAL YIELD en el browser
      }
    } catch (e) { console.error('  ✗  Banxico CETES:', e.message); }
  }


  // ── INFLACIÓN YoY — INEGI ───────────────────────────────────────────────
  console.log('\n📈 INEGI: inflación YoY');
  const IG = process.env.INEGI_TOKEN;
  if (!IG) {
    console.log('  ⏭  INEGI_TOKEN no configurado.');
    console.log('     → Solicita token en https://www.inegi.org.mx/servicios/api_indicadores.html');
    console.log('       y agrega el token en Settings › Secrets › INEGI_TOKEN');
  } else {
    try {
      const now   = new Date();
      const end   = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const start = `${now.getFullYear() - 2}-01`;
      const url   = `https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICADOR/628194/BIE/es/${start}/${end}/false/json?token=${IG}`;
      const data  = await get(url);
      const obs   = data?.Series?.[0]?.OBSERVATIONS;
      if (obs?.length >= 13) {
        const cur  = parseFloat(obs.at(-1).OBS_VALUE);
        const prev = parseFloat(obs.at(-13).OBS_VALUE);
        const yoy  = ((cur / prev - 1) * 100).toFixed(2);
        patchVal('infla', `${yoy}%`);
        patchConst('INFLACION_YOY', yoy);  // recalcula REAL YIELD en el browser
      } else {
        console.warn('  ⚠  INEGI: datos insuficientes para calcular YoY');
      }
    } catch (e) { console.error('  ✗  INEGI inflación:', e.message); }
  }


  // ── Datos anuales — recordatorio ────────────────────────────────────────
  console.log('\n📝 Datos de actualización manual (anuales):');
  console.log('   SAL. MÍN. ($278.80), UMA ($113.14), MAGNA ($24.50), PREMIUM ($26.00)');
  console.log('   → Actualizar en tickerState de index.html cuando CONASAMI/CRE publiquen');


  // ── Guardar ─────────────────────────────────────────────────────────────
  fs.writeFileSync(FILE, html, 'utf8');
  console.log('\n✅ index.html escrito. Git diff determinará si hubo cambios reales.\n');
}

main().catch(e => { console.error('\n💥 Error fatal:', e); process.exit(1); });
