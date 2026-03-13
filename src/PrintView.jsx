import { useEffect, useRef, useState } from 'react'
import styles from './PrintView.module.css'

export default function PrintView({ pnj, onCerrar }) {
  const page1Ref = useRef(null)
  const page2Ref = useRef(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handlePDF = async () => {
    setGenerating(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const capture = async (el) => {
        return await html2canvas(el, {
          scale: 2, useCORS: true, allowTaint: true,
          backgroundColor: '#1a1510',
          width: el.offsetWidth, height: el.offsetHeight,
        })
      }
      const c1 = await capture(page1Ref.current)
      pdf.addImage(c1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.addPage()
      const c2 = await capture(page2Ref.current)
      pdf.addImage(c2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      pdf.save(`${pnj.nombre || 'personaje'}.pdf`)
    } catch (e) {
      console.error(e)
      alert('Error generando PDF')
    }
    setGenerating(false)
  }

  const apt = pnj.aptitudes_finales || pnj.aptitudes || {}
  const sec = pnj.secundarias || {}
  const habPrincipal = (pnj.habilidades || []).filter(h => h.bloque === 'principal')
  const habAncla     = (pnj.habilidades || []).filter(h => h.bloque === 'ancla')
  const habBasica    = (pnj.habilidades || []).filter(h => h.bloque === 'basica')
  const am = pnj.arte_marcial

  const HabRow = ({ h }) => (
    <div className={styles.habRow}>
      <span className={styles.habLabel}>{h.label}{h.nota ? <em> {h.nota}</em> : ''}</span>
      <span className={styles.habApt}>{h.aptitud}</span>
      <span className={styles.habVal}>{h.valor}</span>
    </div>
  )

  return (
    <div className={styles.wrap}>

      <div className={styles.controls}>
        <button className={styles.printBtn} onClick={handlePDF} disabled={generating}>
          {generating ? '⬡ Generando PDF…' : '⬡ Descargar PDF'}
        </button>
        <button className={styles.closeBtn} onClick={onCerrar}>✕ Volver</button>
      </div>

      {/* PÁGINA 1 */}
      <div ref={page1Ref} className={`${styles.page} ${styles.page1}`}>
        <div className={styles.colDer}>

          <div className={styles.blk}>
            <div className={styles.nombre}>{pnj.nombre}</div>
            <div className={styles.metaRow}>
              {[
                ['Edad', pnj.edad],
                ['Sexo', pnj.sexo],
                ['Nacimiento', pnj.ciudad_nacimiento],
                ['Residencia', pnj.ciudad_actual],
                pnj.minoria ? ['Minoría', pnj.minoria] : null,
              ].filter(Boolean).map(([l, v]) => (
                <div key={l} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{l}</span>
                  <span className={styles.metaVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.blk}>
            <div className={styles.sectionTitle}>Aptitudes</div>
            <div className={styles.aptGrid}>
              {['AGI','FUE','CON','BEL','EGO','CAR','PER','EDU'].map(a => (
                <div key={a} className={styles.aptItem}>
                  <span className={styles.aptName}>{a}</span>
                  <span className={styles.aptVal}>{apt[a] || '—'}</span>
                </div>
              ))}
            </div>
            {Object.keys(sec).length > 0 && (
              <div className={styles.secGrid}>
                {Object.entries(sec).filter(([k,v]) => typeof v !== 'object').map(([k,v]) => (
                  <div key={k} className={styles.secItem}>
                    <span className={styles.secName}>{k}</span>
                    <span className={styles.secVal}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.eqRow}>
              <span className={styles.eqLabel}>Equilibrio mental</span>
              <span className={`${styles.eqVal} ${pnj.equilibrio_signo === 'positivo' ? styles.eqPos : pnj.equilibrio_signo === 'negativo' ? styles.eqNeg : ''}`}>
                {pnj.equilibrio_mental || 0}
              </span>
              {pnj.puntos_habilidad_extra > 0 && (
                <span className={styles.eqLabel}>· +{pnj.puntos_habilidad_extra} pts habilidad</span>
              )}
            </div>
          </div>

          <div className={styles.blk}>
            <div className={styles.sectionTitle}>Perfil</div>
            <div className={styles.narrGrid}>
              <div className={styles.narrItem}>
                <div className={styles.narrLabel}>Apariencia</div>
                <div className={styles.narrText}>{pnj.apariencia}</div>
              </div>
              <div className={styles.narrItem}>
                <div className={styles.narrLabel}>Personalidad</div>
                <div className={styles.narrText}>{pnj.personalidad}</div>
              </div>
              <div className={`${styles.narrItem} ${styles.full}`}>
                <div className={styles.narrLabel}>Comportamiento ante los jugadores</div>
                <div className={styles.narrText}>{pnj.comportamiento_jugadores}</div>
              </div>
              <div className={styles.narrItem}>
                <div className={styles.narrLabel}>Familiares / Vínculos</div>
                <div className={styles.narrText}>{pnj.familiares}</div>
              </div>
              <div className={styles.narrItem}>
                <div className={styles.narrLabel}>Amigos / Aliados</div>
                <div className={styles.narrText}>{pnj.amigos_vinculos}</div>
              </div>
            </div>
          </div>

          <div className={styles.blk}>
            <div className={styles.sectionTitle}>Situación económica</div>
            <div className={styles.ecoGrid}>
              {[['Vivienda',pnj.vivienda],['Ahorros',pnj.ahorros],['Ingresos',pnj.ingresos_mensuales],['Crédito',pnj.nivel_credito]].map(([l,v]) => (
                <div key={l} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{l}</span>
                  <span className={styles.metaValSm}>{v || '—'}</span>
                </div>
              ))}
            </div>
          </div>

          {pnj.equipo_en_escena?.length > 0 && (
            <div className={styles.blk}>
              <div className={styles.sectionTitle}>Equipo en escena</div>
              <div className={styles.equipoList}>
                {pnj.equipo_en_escena.map((obj, i) => (
                  <span key={i} className={styles.equipoItem}>{obj}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* PÁGINA 2 */}
      <div ref={page2Ref} className={`${styles.page} ${styles.page2}`}>
        <div className={styles.colFull}>

          <div className={styles.blk}>
            <div className={styles.sectionTitle}>Habilidades · Pool: {pnj.pool_gastado || '?'} / {pnj.pool_total || '?'} pts</div>
            {habPrincipal.length > 0 && (
              <div className={styles.bloque}>
                <div className={styles.bloqueTitle}>Especialización</div>
                <div className={`${styles.habGrid} ${styles.twoCol}`}>
                  {habPrincipal.map((h,i) => <HabRow key={i} h={h}/>)}
                </div>
              </div>
            )}
            {habAncla.length > 0 && (
              <div className={styles.bloque}>
                <div className={styles.bloqueTitle}>Ancla narrativa</div>
                <div className={`${styles.habGrid} ${styles.twoCol}`}>
                  {habAncla.map((h,i) => <HabRow key={i} h={h}/>)}
                </div>
              </div>
            )}
            {habBasica.length > 0 && (
              <div className={styles.bloque}>
                <div className={styles.bloqueTitle}>Básicas</div>
                <div className={`${styles.habGrid} ${styles.twoCol}`}>
                  {habBasica.map((h,i) => <HabRow key={i} h={h}/>)}
                </div>
              </div>
            )}
            {am?.disciplina && (
              <div className={styles.bloque}>
                <div className={styles.bloqueTitle}>
                  Arte marcial — {am.disciplina}
                  <span className={styles.amNivel}> {am.nivel_label}</span>
                  <span className={styles.amBono}> +{am.bono_dano} daño</span>
                </div>
                <div className={`${styles.habGrid} ${styles.twoCol}`}>
                  {(am.habilidades||[]).map((h,i) => <HabRow key={i} h={h}/>)}
                  {(am.maniobras||[]).filter(m => m && typeof m === 'object' && m.valor).map((h,i) => <HabRow key={`m${i}`} h={h}/>)}
                </div>
              </div>
            )}
          </div>

          <div className={styles.blk}>
            <div className={styles.sectionTitle}>Ventajas &amp; Desventajas</div>
            <div className={styles.vdGrid}>
              <div>
                <div className={styles.bloqueTitle}>Ventajas</div>
                {(pnj.ventajas||[]).length > 0
                  ? pnj.ventajas.map((v,i) => (
                      <div key={i} className={styles.vdItem}>
                        <span className={styles.vdLabel}>{v.label}</span>
                        <span className={styles.vdPtsV}>{v.coste} pts</span>
                      </div>
                    ))
                  : <div className={styles.narrText} style={{fontSize:'8pt',color:'#7a5a30'}}>Ninguna</div>
                }
              </div>
              <div>
                <div className={styles.bloqueTitle}>Desventajas</div>
                {(pnj.desventajas||[]).length > 0
                  ? pnj.desventajas.map((d,i) => (
                      <div key={i} className={styles.vdItem}>
                        <span className={styles.vdLabel}>{d.label}</span>
                        <span className={styles.vdPtsD}>{d.puntos} pts</span>
                      </div>
                    ))
                  : <div className={styles.narrText} style={{fontSize:'8pt',color:'#7a5a30'}}>Ninguna</div>
                }
              </div>
            </div>
          </div>

          {pnj.secreto_inconfesable && (
            <div className={`${styles.blk} ${styles.secretoBlk}`}>
              <div className={styles.sectionTitle} style={{color:'#5a1010'}}>Secretos</div>
              {pnj.secreto_arquetipo && (
                <div className={styles.bloqueTitle} style={{marginBottom:'2mm'}}>{pnj.secreto_arquetipo}</div>
              )}
              <div className={styles.narrText}>{pnj.secreto_inconfesable}</div>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
