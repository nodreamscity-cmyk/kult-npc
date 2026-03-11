import styles from './OutputPanel.module.css'
import { APTITUDES } from '../aptitudes.js'

const THREAT = {
  bajo:       { cls: styles.threatBajo,    label: 'Bajo',     secreto: false },
  medio:      { cls: styles.threatMedio,   label: 'Medio',    secreto: false },
  alto:       { cls: styles.threatAlto,    label: 'Alto',     secreto: true  },
  'muy alto': { cls: styles.threatMuyAlto, label: 'Muy alto', secreto: true  },
  'único':    { cls: styles.threatUnico,   label: 'Único',    secreto: true  }
}

export default function OutputPanel({ pnj, loading, error, params }) {
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

            <Section title="Motivación" even>
              <p className={styles.text}>{pnj.motivacion}</p>
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

          </div>
        </div>
      )}
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
