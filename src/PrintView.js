
// PrintView.jsx — abre ventana de impresión con layout sobre fondos
export function imprimirFicha(pnj) {
  const html = generarHTML(pnj)
  const win = window.open('', '_blank', 'width=900,height=1200')
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 800)
}

function generarHTML(p) {
  const apt = p.aptitudes_finales || p.aptitudes || {}
  const sec = p.secundarias || {}

  const habPrincipal = (p.habilidades || []).filter(h => h.bloque === 'principal')
  const habAncla = (p.habilidades || []).filter(h => h.bloque === 'ancla')
  const habBasica = (p.habilidades || []).filter(h => h.bloque === 'basica')

  const habRow = (h) => `
    <div class="hab-row">
      <span class="hab-label">${h.label}${h.nota ? ` <em>${h.nota}</em>` : ''}</span>
      <span class="hab-apt">${h.aptitud}</span>
      <span class="hab-val">${h.valor}</span>
    </div>`

  const am = p.arte_marcial
  const amBlock = am?.disciplina ? `
    <div class="bloque">
      <div class="bloque-title">Arte marcial — ${am.disciplina} <span class="am-nivel">${am.nivel_label}</span> <span class="am-bono">+${am.bono_dano} daño</span></div>
      <div class="hab-grid two-col">
        ${(am.habilidades || []).map(habRow).join('')}
        ${(am.maniobras || []).filter(m => m.valor).map(habRow).join('')}
      </div>
    </div>` : ''

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${p.nombre || 'Personaje'} — KULT</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Cormorant Garamond', serif;
    background: #1a1510;
    color: #2a1f0f;
  }

  /* ── PÁGINA ── */
  .page {
    width: 210mm;
    min-height: 297mm;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    background-size: cover;
    background-position: center top;
  }

  .page-1 { background-image: url('/fondo_p1.jpg'); }
  .page-2 { background-image: url('/fondo_p2.jpg'); }

  .page-content {
    position: absolute;
    inset: 0;
    padding: 0;
  }

  /* ── PÁGINA 1 — zona datos sobre fondo ── */

  /* Bloque nombre/identidad — zona derecha superior */
  .identidad {
    position: absolute;
    top: 18mm;
    left: 52mm;
    right: 8mm;
    background: rgba(240,230,200,0.82);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 5mm 6mm 4mm;
    border-radius: 1px;
  }

  .nombre {
    font-family: 'Cinzel', serif;
    font-size: 16pt;
    font-weight: 600;
    color: #1a0f00;
    line-height: 1.1;
    margin-bottom: 2mm;
  }

  .meta-row {
    display: flex;
    gap: 6mm;
    flex-wrap: wrap;
    font-size: 8pt;
    color: #3a2a10;
  }

  .meta-item { display: flex; flex-direction: column; }
  .meta-label { font-size: 6pt; text-transform: uppercase; letter-spacing: 0.05em; color: #7a5a20; font-family: 'Cinzel', serif; }
  .meta-val { font-size: 9pt; font-weight: 600; }

  /* Aptitudes */
  .aptitudes-block {
    position: absolute;
    top: 72mm;
    left: 8mm;
    right: 8mm;
    background: rgba(240,230,200,0.82);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 4mm 5mm;
    border-radius: 1px;
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #7a5a20;
    border-bottom: 1px solid rgba(100,70,20,0.25);
    padding-bottom: 1.5mm;
    margin-bottom: 3mm;
  }

  .apt-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2mm 4mm;
  }

  .apt-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid rgba(100,70,20,0.15);
    padding-bottom: 1mm;
  }

  .apt-name { font-size: 7pt; text-transform: uppercase; letter-spacing: 0.06em; color: #5a3a10; font-family: 'Cinzel', serif; }
  .apt-val  { font-size: 11pt; font-weight: 600; color: #1a0f00; }

  /* Secundarias */
  .sec-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5mm 4mm;
    margin-top: 2mm;
  }
  .sec-item { display: flex; justify-content: space-between; align-items: baseline; }
  .sec-name { font-size: 6pt; color: #7a5a30; font-style: italic; }
  .sec-val  { font-size: 8pt; color: #3a2a10; }

  /* Equilibrio */
  .equilibrio-row {
    margin-top: 2.5mm;
    display: flex;
    gap: 8mm;
    align-items: center;
  }
  .eq-label { font-size: 6.5pt; color: #7a5a20; font-family: 'Cinzel', serif; text-transform: uppercase; letter-spacing: 0.07em; }
  .eq-val { font-size: 10pt; font-weight: 600; }
  .eq-pos { color: #2a5a2a; }
  .eq-neg { color: #5a1010; }
  .eq-neu { color: #3a2a10; }

  /* Narrativa */
  .narrativa-block {
    position: absolute;
    top: 140mm;
    left: 8mm;
    right: 8mm;
    background: rgba(240,230,200,0.82);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 4mm 5mm;
    border-radius: 1px;
  }

  .narr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
  }

  .narr-item { }
  .narr-item.full { grid-column: 1 / -1; }
  .narr-label { font-size: 6pt; text-transform: uppercase; letter-spacing: 0.08em; color: #7a5a20; font-family: 'Cinzel', serif; margin-bottom: 0.8mm; }
  .narr-text { font-size: 7.5pt; color: #2a1a08; line-height: 1.4; }

  /* Economía */
  .economia-block {
    position: absolute;
    top: 218mm;
    left: 8mm;
    right: 8mm;
    background: rgba(240,230,200,0.78);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 3mm 5mm;
    border-radius: 1px;
  }

  .eco-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2mm;
  }

  /* Equipo */
  .equipo-block {
    position: absolute;
    top: 248mm;
    left: 8mm;
    right: 8mm;
    background: rgba(240,230,200,0.78);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 3mm 5mm;
    border-radius: 1px;
  }

  .equipo-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5mm 6mm;
  }

  .equipo-item { font-size: 8pt; color: #2a1a08; }
  .equipo-item::before { content: '—'; color: #7a5a30; margin-right: 1.5mm; }

  /* ── PÁGINA 2 — habilidades ── */

  .hab-block {
    position: absolute;
    left: 8mm;
    right: 8mm;
    background: rgba(240,230,200,0.82);
    border: 1px solid rgba(100,70,20,0.3);
    padding: 4mm 5mm;
    border-radius: 1px;
  }

  .bloque { margin-bottom: 3mm; }
  .bloque-title {
    font-family: 'Cinzel', serif;
    font-size: 6.5pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #7a5a20;
    margin-bottom: 1.5mm;
  }

  .hab-grid { }
  .hab-grid.two-col { columns: 2; column-gap: 5mm; }

  .hab-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid rgba(100,70,20,0.1);
    padding: 0.8mm 0;
    break-inside: avoid;
  }

  .hab-label { font-size: 7.5pt; color: #2a1a08; flex: 1; }
  .hab-label em { font-size: 6.5pt; color: #7a5a30; }
  .hab-apt { font-size: 6pt; color: #7a5a30; font-family: 'Cinzel', serif; margin: 0 3mm; }
  .hab-val { font-size: 9pt; font-weight: 600; color: #1a0f00; min-width: 8mm; text-align: right; }

  .am-nivel { font-size: 6.5pt; color: #5a3a10; margin-left: 3mm; }
  .am-bono { font-size: 6.5pt; color: #8b1a1a; margin-left: 3mm; }

  /* Ventajas/desventajas */
  .vd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
  }

  .vd-item {
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    border-bottom: 1px solid rgba(100,70,20,0.1);
    padding: 0.8mm 0;
  }

  .vd-label { color: #2a1a08; }
  .vd-pts-v { color: #2a5a2a; font-weight: 600; font-size: 8pt; }
  .vd-pts-d { color: #5a1010; font-weight: 600; font-size: 8pt; }

  /* Secretos */
  .secreto-block {
    background: rgba(90,10,10,0.08);
    border: 1px solid rgba(90,10,10,0.2);
  }

  @media print {
    body { background: white; }
    .page { page-break-after: always; }
    .no-print { display: none; }
  }

  /* Botón imprimir — solo en pantalla */
  .print-btn {
    display: block;
    margin: 8mm auto;
    padding: 3mm 10mm;
    background: #3a2a10;
    color: #c8a84a;
    border: none;
    font-family: 'Cinzel', serif;
    font-size: 9pt;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
  }
  @media print { .print-btn { display: none; } }
</style>
</head>
<body>

<button class="print-btn no-print" onclick="window.print()">⬡ Imprimir / Guardar PDF</button>

<!-- PÁGINA 1 -->
<div class="page page-1">
  <div class="page-content">

    <!-- Identidad -->
    <div class="identidad">
      <div class="nombre">${p.nombre || '—'}</div>
      <div class="meta-row">
        <div class="meta-item"><span class="meta-label">Edad</span><span class="meta-val">${p.edad || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Sexo</span><span class="meta-val">${p.sexo || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Nacimiento</span><span class="meta-val">${p.ciudad_nacimiento || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Residencia</span><span class="meta-val">${p.ciudad_actual || '—'}</span></div>
        ${p.minoria ? `<div class="meta-item"><span class="meta-label">Minoría</span><span class="meta-val">${p.minoria}</span></div>` : ''}
      </div>
    </div>

    <!-- Aptitudes -->
    <div class="aptitudes-block">
      <div class="section-title">Aptitudes</div>
      <div class="apt-grid">
        ${['AGI','FUE','CON','BEL','EGO','CAR','PER','EDU'].map(a => `
          <div class="apt-item">
            <span class="apt-name">${a}</span>
            <span class="apt-val">${apt[a] || '—'}</span>
          </div>`).join('')}
      </div>
      ${Object.keys(sec).length > 0 ? `
      <div class="sec-grid">
        ${Object.entries(sec).map(([k,v]) => `
          <div class="sec-item">
            <span class="sec-name">${k}</span>
            <span class="sec-val">${v}</span>
          </div>`).join('')}
      </div>` : ''}
      <div class="equilibrio-row">
        <span class="eq-label">Equilibrio mental</span>
        <span class="eq-val ${p.equilibrio_signo === 'positivo' ? 'eq-pos' : p.equilibrio_signo === 'negativo' ? 'eq-neg' : 'eq-neu'}">${p.equilibrio_mental || 0}</span>
        ${p.puntos_habilidad_extra > 0 ? `<span class="eq-label">· +${p.puntos_habilidad_extra} pts habilidad</span>` : ''}
      </div>
    </div>

    <!-- Narrativa -->
    <div class="narrativa-block">
      <div class="section-title">Perfil</div>
      <div class="narr-grid">
        <div class="narr-item"><div class="narr-label">Apariencia</div><div class="narr-text">${p.apariencia || '—'}</div></div>
        <div class="narr-item"><div class="narr-label">Personalidad</div><div class="narr-text">${p.personalidad || '—'}</div></div>
        <div class="narr-item full"><div class="narr-label">Comportamiento ante los jugadores</div><div class="narr-text">${p.comportamiento_jugadores || '—'}</div></div>
        <div class="narr-item"><div class="narr-label">Familiares / Vínculos</div><div class="narr-text">${p.familiares || '—'}</div></div>
        <div class="narr-item"><div class="narr-label">Amigos / Aliados</div><div class="narr-text">${p.amigos_vinculos || '—'}</div></div>
      </div>
    </div>

    <!-- Economía -->
    <div class="economia-block">
      <div class="section-title">Situación económica</div>
      <div class="eco-grid">
        <div class="meta-item"><span class="meta-label">Vivienda</span><span class="meta-val" style="font-size:7.5pt">${p.vivienda || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Ahorros</span><span class="meta-val" style="font-size:7.5pt">${p.ahorros || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Ingresos</span><span class="meta-val" style="font-size:7.5pt">${p.ingresos_mensuales || '—'}</span></div>
        <div class="meta-item"><span class="meta-label">Crédito</span><span class="meta-val" style="font-size:7.5pt">${p.nivel_credito || '—'}</span></div>
      </div>
    </div>

    <!-- Equipo en escena -->
    ${p.equipo_en_escena?.length > 0 ? `
    <div class="equipo-block">
      <div class="section-title">Equipo en escena</div>
      <div class="equipo-list">
        ${p.equipo_en_escena.map(obj => `<span class="equipo-item">${obj}</span>`).join('')}
      </div>
    </div>` : ''}

  </div>
</div>

<!-- PÁGINA 2 -->
<div class="page page-2">
  <div class="page-content">

    <!-- Habilidades -->
    <div class="hab-block" style="top:8mm">
      <div class="section-title">Habilidades · Pool: ${p.pool_gastado || '?'} / ${p.pool_total || '?'} pts</div>

      ${habPrincipal.length > 0 ? `
      <div class="bloque">
        <div class="bloque-title">Especialización</div>
        <div class="hab-grid two-col">${habPrincipal.map(habRow).join('')}</div>
      </div>` : ''}

      ${habAncla.length > 0 ? `
      <div class="bloque">
        <div class="bloque-title">Ancla narrativa</div>
        <div class="hab-grid two-col">${habAncla.map(habRow).join('')}</div>
      </div>` : ''}

      ${habBasica.length > 0 ? `
      <div class="bloque">
        <div class="bloque-title">Básicas</div>
        <div class="hab-grid two-col">${habBasica.map(habRow).join('')}</div>
      </div>` : ''}

      ${amBlock}
    </div>

    <!-- Ventajas y desventajas -->
    <div class="hab-block" style="top:155mm">
      <div class="section-title">Ventajas &amp; Desventajas</div>
      <div class="vd-grid">
        <div>
          <div class="bloque-title">Ventajas</div>
          ${(p.ventajas || []).map(v => `
            <div class="vd-item">
              <span class="vd-label">${v.label}</span>
              <span class="vd-pts-v">${v.coste} pts</span>
            </div>`).join('') || '<div class="narr-text" style="font-size:7pt;color:#7a5a30">Ninguna</div>'}
        </div>
        <div>
          <div class="bloque-title">Desventajas</div>
          ${(p.desventajas || []).map(d => `
            <div class="vd-item">
              <span class="vd-label">${d.label}</span>
              <span class="vd-pts-d">${d.puntos} pts</span>
            </div>`).join('') || '<div class="narr-text" style="font-size:7pt;color:#7a5a30">Ninguna</div>'}
        </div>
      </div>
    </div>

    <!-- Secretos -->
    ${p.secreto_inconfesable ? `
    <div class="hab-block secreto-block" style="top:230mm">
      <div class="section-title" style="color:#5a1010">Secretos</div>
      ${p.secreto_arquetipo ? `<div class="narr-label" style="margin-bottom:1mm">${p.secreto_arquetipo}</div>` : ''}
      <div class="narr-text">${p.secreto_inconfesable}</div>
    </div>` : ''}

  </div>
</div>

<button class="print-btn no-print" onclick="window.print()">⬡ Imprimir / Guardar PDF</button>

</body>
</html>`
}
