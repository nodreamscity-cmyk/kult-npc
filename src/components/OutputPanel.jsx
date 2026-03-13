import styles from './OutputPanel.module.css'
import { APTITUDES } from '../aptitudes.js'

const THREAT = {
  bajo:       { cls: styles.threatBajo,    label: 'Bajo',     secreto: false },
  medio:      { cls: styles.threatMedio,   label: 'Medio',    secreto: false },
  alto:       { cls: styles.threatAlto,    label: 'Alto',     secreto: true  },
  'muy alto': { cls: styles.threatMuyAlto, label: 'Muy alto', secreto: true  },
  'único':    { cls: styles.threatUnico,   label: 'Único',    secreto: true  }
}

export default function OutputPanel({ pnj, loading, error, params, onImprimir, retrato, loadingRetrato, onGenerarRetrato }) {
  const threat = params ? THREAT[params.amenaza] : null
  const aptFinal = pnj?.aptitudes_finales || pnj?.aptitudes

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.dot} />
        <h2>Expediente</h2>
      </div>

      {!loading && !pnj && !error && (
        <div className={styles.empty}>
          <div className={styles.eye}>◉</div>
          <p>Configura los parámetros y genera un PNJ</p>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spin}>✦</div>
          <p>Conjurando al personaje desde las sombras…</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <strong>Error al generar el PNJ:</strong><br />{error}
        </div>
      )}

      {pnj && !loading && (
        <div className={styles.card}>

          <div className={styles.namebar}>
            <div className={styles.nameInfo}>
              {params && <div className={styles.archetype}>{params.archetype}</div>}
              <div className={styles.name}>{pnj.nombre}</div>
              <div className={styles.meta}>
                <span><strong>{pnj.edad}</strong> años</span>
                <span><strong>{pnj.sexo}</strong></span>
                <span>n. <strong>{pnj.ciudad_nacimiento}</strong></span>
                {pnj.minoria && <span><em>{pnj.minoria}</em></span>}
              </div>
              {threat && (
                <div className={`${styles.badge} ${threat.cls}`}>
                  {threat.label}
                </div>
              )}
            </div>
          </div>

          {aptFinal && (
            <div className={styles.aptBlock}>
              <div className={styles.aptTitle}>Aptitudes</div>
              <div className={styles.aptTable}>
                {APTITUDES.map(a => {
                  const base = pnj.aptitudes?.[a]
                  const final = aptFinal[a]
                  const modificado = base !== undefined && base !== final
                  const extraordinario = base > 18
                  return (
                    <div key={a} className={styles.aptCell}>
                      <div className={styles.aptLabel}>{a}</div>
                      <div className={`${styles.aptVal} ${extraordinario ? styles.aptExtra : ''} ${modificado ? styles.aptMod : ''}`}>
                        {final}
                      </div>
                      {modificado && (
                        <div className={styles.aptBase}>{base}</div>
                      )}
                    </div>
                  )
                })}
              </div>
              {pnj.nota_envejecimiento && (
                <div className={styles.aptNota}>{pnj.nota_envejecimiento}</div>
              )}
            </div>
          )}

          {/* Aptitudes secundarias */}
          {pnj.secundarias && (
            <div className={styles.secBlock}>
              <div className={styles.aptTitle}>Aptitudes secundarias</div>
              <div className={styles.secTable}>
                <div className={styles.secItem}>
                  <div className={styles.secLabel}>Resistencia</div>
                  <div className={styles.secVal}>{pnj.secundarias.resistencia}</div>
                </div>
                <div className={styles.secItem}>
                  <div className={styles.secLabel}>Carga máx.</div>
                  <div className={styles.secVal}>{pnj.secundarias.cargaMax}</div>
                </div>
                <div className={styles.secItem}>
                  <div className={styles.secLabel}>Acciones</div>
                  <div className={styles.secVal}>{pnj.secundarias.acciones}</div>
                </div>
                <div className={styles.secItem}>
                  <div className={styles.secLabel}>Bono inic.</div>
                  <div className={styles.secVal}>{pnj.secundarias.bonoIniciativa >= 0 ? `+${pnj.secundarias.bonoIniciativa}` : pnj.secundarias.bonoIniciativa}</div>
                </div>
                <div className={styles.secItem}>
                  <div className={styles.secLabel}>Bono daño</div>
                  <div className={styles.secVal}>{pnj.secundarias.bonoDano >= 0 ? `+${pnj.secundarias.bonoDano}` : pnj.secundarias.bonoDano}</div>
                </div>

              </div>
            </div>
          )}

          {/* Ventajas, Desventajas y Equilibrio Mental */}
          {(pnj.ventajas?.length > 0 || pnj.desventajas?.length > 0) && (
            <div className={styles.equilibrioBlock}>
              <div className={styles.vdGrid}>
                {pnj.ventajas?.length > 0 && (
                  <div className={styles.vdCol}>
                    <div className={styles.vdTitle}>Ventajas</div>
                    {pnj.ventajas.map((v, i) => (
                      <div key={i} className={styles.vdItem}>
                        <span className={styles.vdLabel}>{v.label}</span>
                        <span className={styles.vdPts}>{v.coste} pts</span>
                      </div>
                    ))}
                  </div>
                )}
                {pnj.desventajas?.length > 0 && (
                  <div className={styles.vdCol}>
                    <div className={styles.vdTitle}>Desventajas</div>
                    {pnj.desventajas.map((d, i) => (
                      <div key={i} className={styles.vdItem}>
                        <span className={styles.vdLabel}>{d.label}</span>
                        <span className={styles.vdPts}>{d.puntos} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {pnj.equilibrio_calculado && (
                <div className={`${styles.equilibrioBar} ${pnj.equilibrio_calculado.signo === 'negativo' ? styles.equilibrioNeg : styles.equilibrioPos}`}>
                  <span>
                    Equilibrio mental:
                    <strong> {pnj.equilibrio_calculado.signo === 'negativo' ? '−' : '+'}{pnj.equilibrio_calculado.equilibrioMental}</strong>
                    {' '}({pnj.equilibrio_calculado.signo})
                  </span>
                  {pnj.equilibrio_calculado.puntosHabilidadExtra > 0 && (
                    <span className={styles.ptsExtra}>+{pnj.equilibrio_calculado.puntosHabilidadExtra} pts habilidad</span>
                  )}
                </div>
              )}
              {pnj.equilibrio_calculado?.efectoActivo && (
                <div className={styles.equilibrioEfecto}>
                  {pnj.equilibrio_calculado.efectoActivo.efecto}
                </div>
              )}
            </div>
          )}

          <div className={styles.sections}>

            <Section title="Situación vital">
              <div className={styles.econ}>
                <EconItem label="Residencia actual" value={pnj.ciudad_actual} full />
                <EconItem label="Vivienda" value={pnj.vivienda} full />
                <EconItem label="Ingresos / mes" value={pnj.ingresos_mensuales} />
                <EconItem label="Ahorros" value={pnj.ahorros} />
                <EconItem label="Nivel de crédito" value={pnj.nivel_credito} full />
              </div>
            </Section>

            <Section title="Red social" even>
              <p className={styles.text} style={{ marginBottom: '0.6rem' }}>{pnj.familiares}</p>
              <p className={styles.text}>{pnj.amigos_vinculos}</p>
            </Section>

            <Section title="Apariencia" full>
              <p className={styles.text}>{pnj.apariencia}</p>
            </Section>

            <Section title="Personalidad">
              <p className={styles.text}>{pnj.personalidad}</p>
            </Section>

            <Section title="Ante los jugadores" full>
              <p className={styles.text}>{pnj.comportamiento_jugadores}</p>
            </Section>

            {threat?.secreto && pnj.secreto_inconfesable && (
              <Section
                title={`⬡ Secreto inconfesable${pnj.secreto_arquetipo ? ' — ' + pnj.secreto_arquetipo : ''}`}
                full secret
              >
                <p className={styles.textSecret}>{pnj.secreto_inconfesable}</p>
              </Section>
            )}

            {/* Habilidades */}
            {pnj.habilidades?.length > 0 && (
              <Section title="Habilidades" full>
                <div className={styles.habPool}>
                  Pool: <strong>{pnj.pool_gastado || '?'}</strong> / {pnj.pool_total || '?'} pts
                </div>

                {/* Bloque principal */}
                {pnj.habilidades.filter(h => h.bloque === 'principal').length > 0 && (
                  <div className={styles.habBloque}>
                    <div className={styles.habBloqueTitle}>Especialización</div>
                    <div className={styles.habGrid}>
                      {pnj.habilidades.filter(h => h.bloque === 'principal').map((h, i) => (
                        <HabItem key={i} h={h} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bloque ancla */}
                {pnj.habilidades.filter(h => h.bloque === 'ancla').length > 0 && (
                  <div className={styles.habBloque}>
                    <div className={styles.habBloqueTitle}>Rasgos personales</div>
                    <div className={styles.habGrid}>
                      {pnj.habilidades.filter(h => h.bloque === 'ancla').map((h, i) => (
                        <HabItem key={i} h={h} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Básicas con inversión */}
                {pnj.habilidades.filter(h => h.bloque === 'basica').length > 0 && (
                  <div className={styles.habBloque}>
                    <div className={styles.habBloqueTitle}>Básicas</div>
                    <div className={styles.habGrid}>
                      {pnj.habilidades.filter(h => h.bloque === 'basica').map((h, i) => (
                        <HabItem key={i} h={h} />
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* Arte marcial */}
            {pnj.arte_marcial?.disciplina && (
              <Section title={`Arte marcial — ${pnj.arte_marcial.disciplina}`} full>
                <div className={styles.amHeader}>
                  <span className={styles.amNivel}>{pnj.arte_marcial.nivel_label}</span>
                  <span className={styles.amBono}>Bono al daño: +{pnj.arte_marcial.bono_dano}</span>
                  <span className={styles.amCoste}>{pnj.arte_marcial.coste} pts</span>
                </div>
                {pnj.arte_marcial.habilidades?.length > 0 && (
                  <div className={styles.habGrid} style={{ marginTop: '0.6rem' }}>
                    {pnj.arte_marcial.habilidades.map((h, i) => (
                      <HabItem key={i} h={h} />
                    ))}
                  </div>
                )}
                {pnj.arte_marcial.maniobras?.length > 0 && (
                  <div className={styles.habBloque}>
                    <div className={styles.habBloqueTitle}>Maniobras budo</div>
                    <div className={styles.habGrid}>
                      {pnj.arte_marcial.maniobras.map((m, i) => (
                        <HabItem key={i} h={typeof m === 'string' ? { label: m, aptitud: '', valor: '' } : m} />
                      ))}
                    </div>
                  </div>
                )}
                {pnj.arte_marcial.preternaturales?.length > 0 && (
                  <div className={styles.habBloque}>
                    <div className={styles.habBloqueTitle}>Habilidades preternaturales</div>
                    {pnj.arte_marcial.preternaturales.map((h, i) => (
                      <div key={i} className={styles.preternItem}>
                        <span>{h.label}</span>
                        <span className={styles.vdPts}>{h.coste} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {pnj.equipo_en_escena?.length > 0 && (
              <Section title="Equipo en escena" full>
                <div className={styles.equipoGrid}>
                  {pnj.equipo_en_escena.map((obj, i) => (
                    <span key={i} className={styles.equipoItem}>{obj}</span>
                  ))}
                </div>
              </Section>
            )}

          </div>
        </div>
      )}
      {pnj && (
        <div className={styles.retratoArea}>
          <button className={styles.retratoBtn} onClick={onGenerarRetrato} disabled={loadingRetrato}>
            {loadingRetrato ? '⬡ Generando prompt…' : '⬡ Prompt de retrato'}
          </button>
          {retrato && (
            <div className={styles.promptBox}>
              <p className={styles.promptHint}>Usa este prompt en el generador de imágenes que prefieras.</p>
              <div className={styles.promptText}>{retrato}</div>
              <div className={styles.promptBtns}>
                <button className={styles.promptCopy} onClick={() => navigator.clipboard.writeText(retrato)}>⬡ Copiar prompt</button>
              </div>
            </div>
          )}
        </div>
      )}
      {pnj && (
        <button className={styles.printBtn} onClick={onImprimir}>
          ⬡ Ver ficha imprimible
        </button>
      )}
    </div>
  )
}

function HabItem({ h }) {
  return (
    <div className={styles.habItem}>
      <span className={styles.habLabel}>{h.label}{h.nota ? ` — ${h.nota}` : ''}</span>
      <span className={styles.habApt}>{h.aptitud}</span>
      <span className={styles.habVal}>{h.valor}</span>
    </div>
  )
}

function Section({ title, children, full, even, secret }) {
  return (
    <div className={[
      styles.section,
      full ? styles.full : '',
      even ? styles.even : '',
      secret ? styles.secret : ''
    ].join(' ')}>
      <div className={secret ? styles.titleRed : styles.title}>{title}</div>
      {children}
    </div>
  )
}

function EconItem({ label, value, full }) {
  return (
    <div className={`${styles.econItem} ${full ? styles.econFull : ''}`}>
      <div className={styles.econLabel}>{label}</div>
      <div className={styles.econValue}>{value}</div>
    </div>
  )
}
