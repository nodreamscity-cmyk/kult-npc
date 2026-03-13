import { useState } from 'react'
import { GRUPOS, SUBGRUPOS, SUBSUBGRUPOS } from '../data.js'
import { PERFILES, calcularPerfil } from '../aptitudes.js'
import { HABILIDADES_BASICAS, ARTES_MARCIALES } from '../habilidades.js'
import styles from './InputPanel.module.css'

const PERFIL_KEYS = ['combativo', 'cerebral', 'carismatico', 'equilibrado', 'aleatorio']
const PERFIL_COLORS = {
  combativo:   '#8b1a1a',
  cerebral:    '#1a3a5c',
  carismatico: '#5c1a4a',
  equilibrado: '#2a4a2a',
  aleatorio:   '#4a3a1a'
}

export default function InputPanel({ onGenerar, loading }) {
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubgrupo] = useState('')
  const [subsubgrupo, setSubsubgrupo] = useState('')
  const [anio, setAnio] = useState('')
  const [nacionalidad, setNacionalidad] = useState('')
  const [residencia, setResidencia] = useState('')
  const [minoria, setMinoria] = useState('no')
  const [amenaza, setAmenaza] = useState('bajo')
  const [sexo, setSexo] = useState('aleatorio')
  const [orientacion, setOrientacion] = useState('aleatoria')
  const [edad, setEdad] = useState('')
  const [modoInspiracion, setModoInspiracion] = useState(false)
  const [inspiracion, setInspiracion] = useState('')
  const [imprescindibles, setImprescindibles] = useState([])
  const [pilotarVehiculos, setPilotarVehiculos] = useState(['', '', '', '', ''])
  const [arteMarcialForzada, setArteMarcialForzada] = useState('')

  const toggleImprescindible = (id) => {
    setImprescindibles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 5 ? [...prev, id] : prev
    )
  }

  // Ponderación de perfiles — suma debe ser 100
  const [ponderacion, setPonderacion] = useState({
    combativo: 0, cerebral: 0, carismatico: 0, equilibrado: 0, aleatorio: 100
  })

  const subgrupoList = SUBGRUPOS[grupo] || []
  const subsubgrupoList = SUBSUBGRUPOS[subgrupo] || []

  const handleGrupo = (v) => { setGrupo(v); setSubgrupo(SUBGRUPOS[v]?.[0]?.v || ''); setSubsubgrupo('') }
  const handleSubgrupo = (v) => { setSubgrupo(v); setSubsubgrupo('') }

  const getArchetype = () => {
    const sg = subgrupoList.find(x => x.v === subgrupo)
    const ssg = subsubgrupoList.find(x => x.v === subsubgrupo)
    return [sg?.l, ssg?.l].filter(Boolean).join(' / ') || GRUPOS[grupo] || ''
  }

  // Ajusta un slider manteniendo el total en 100
  const handleSlider = (key, newVal) => {
    const resto = PERFIL_KEYS.filter(k => k !== key)
    const sumaResto = resto.reduce((s, k) => s + ponderacion[k], 0)
    const diff = (100 - newVal) - sumaResto

    if (sumaResto === 0 && newVal < 100) {
      // Distribuye equitativamente entre el resto
      const reparto = Math.floor((100 - newVal) / resto.length)
      const nuevo = { ...ponderacion, [key]: newVal }
      resto.forEach((k, i) => {
        nuevo[k] = i === resto.length - 1
          ? 100 - newVal - reparto * (resto.length - 1)
          : reparto
      })
      setPonderacion(nuevo)
      return
    }

    // Ajusta proporcionalmente el resto
    const nuevo = { ...ponderacion, [key]: newVal }
    if (sumaResto > 0) {
      resto.forEach(k => {
        nuevo[k] = Math.max(0, Math.round(ponderacion[k] + diff * (ponderacion[k] / sumaResto)))
      })
    }
    // Corrección de redondeo
    const totalNuevo = Object.values(nuevo).reduce((s, v) => s + v, 0)
    const ajuste = 100 - totalNuevo
    if (ajuste !== 0) {
      const candidato = resto.find(k => nuevo[k] + ajuste >= 0) || resto[0]
      nuevo[candidato] = Math.max(0, nuevo[candidato] + ajuste)
    }
    setPonderacion(nuevo)
  }

  const perfilCalculado = calcularPerfil(ponderacion)

  const handleSubmit = () => {
    if (!grupo) { alert('Selecciona un tipo de PNJ'); return }
    onGenerar({
      grupo, grupoLabel: GRUPOS[grupo],
      subgrupo, subsubgrupo,
      archetype: getArchetype(),
      anio, nacionalidad, residencia, minoria, amenaza,
      sexo, orientacion,
      edad: edad ? parseInt(edad) : null,
      inspiracion: modoInspiracion ? inspiracion.trim() : null,
      ponderacion, perfilCalculado,
      imprescindibles,
      pilotarVehiculos: pilotarVehiculos.filter(v => v.trim()),
      arteMarcialForzada: arteMarcialForzada || null
    })
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.dot} />
        <h2>Parámetros</h2>
      </div>
      <div className={styles.body}>

        <Field label="Tipo de PNJ">
          <div className={styles.selWrap}>
            <select value={grupo} onChange={e => handleGrupo(e.target.value)}>
              <option value="">— Seleccionar —</option>
              {Object.entries(GRUPOS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </Field>

        {subgrupoList.length > 0 && (
          <Field label="Subgrupo">
            <div className={styles.selWrap}>
              <select value={subgrupo} onChange={e => handleSubgrupo(e.target.value)}>
                {subgrupoList.map(x => <option key={x.v} value={x.v}>{x.l}</option>)}
              </select>
            </div>
          </Field>
        )}

        {subsubgrupoList.length > 0 && (
          <Field label="Especialización">
            <div className={styles.selWrap}>
              <select value={subsubgrupo} onChange={e => setSubsubgrupo(e.target.value)}>
                {subsubgrupoList.map(x => <option key={x.v} value={x.v}>{x.l}</option>)}
              </select>
            </div>
          </Field>
        )}

        <Field label="Año de la campaña">
          <input type="text" value={anio} onChange={e => setAnio(e.target.value)} placeholder="ej. 1993, 2008, 2024…" />
        </Field>

        <Field label="Nacionalidad del PNJ">
          <div className={styles.nacionalidadWrap}>
            <input
              type="text"
              value={nacionalidad}
              onChange={e => setNacionalidad(e.target.value)}
              placeholder="ej. inglesa, rusa, japonesa…"
              disabled={nacionalidad === '__aleatoria__'}
            />
            <button
              className={`${styles.randomBtn} ${nacionalidad === '__aleatoria__' ? styles.active : ''}`}
              onClick={() => setNacionalidad(nacionalidad === '__aleatoria__' ? '' : '__aleatoria__')}
              title="Nacionalidad aleatoria"
            >⬡ Aleatoria</button>
          </div>
        </Field>

        <Field label="Residencia / Localización de la aventura">
          <input type="text" value={residencia} onChange={e => setResidencia(e.target.value)} placeholder="ej. Nueva York, Madrid, Tokio…" />
        </Field>

        <Field label="Minoría étnico-cultural">
          <div className={styles.toggle}>
            {['no', 'si'].map(v => (
              <button key={v} className={`${styles.toggleBtn} ${minoria === v ? styles.active : ''}`} onClick={() => setMinoria(v)}>
                {v === 'no' ? 'No' : 'Sí'}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Nivel de amenaza y experiencia">
          <div className={styles.radioGroup}>
            {['bajo', 'medio', 'alto', 'muy alto', 'único'].map(v => (
              <button key={v} className={`${styles.radioBtn} ${amenaza === v ? styles.active : ''}`} onClick={() => setAmenaza(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.amenazaNota}>⬡ Alto, Muy alto y Único generan secreto inconfesable</div>
          <div className={styles.amenazaPuntos}>
            {{'bajo':'90 pts','medio':'100 pts','alto':'100 pts','muy alto':'110 pts','único':'120–140 pts'}[amenaza]}
          </div>
        </Field>

        <Field label="Sexo">
          <div className={styles.radioGroup}>
            {['aleatorio', 'hombre', 'mujer', 'no binario'].map(v => (
              <button key={v} className={`${styles.radioBtn} ${sexo === v ? styles.active : ''}`} onClick={() => setSexo(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Orientación sexual">
          <div className={styles.radioGroup}>
            {['aleatoria', 'heterosexual', 'homosexual', 'bisexual', 'asexual'].map(v => (
              <button key={v} className={`${styles.radioBtn} ${orientacion === v ? styles.active : ''}`} onClick={() => setOrientacion(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Edad (opcional)">
          <input
            type="number"
            value={edad}
            onChange={e => setEdad(e.target.value)}
            placeholder="Dejar vacío para edad automática"
            min={15} max={90}
          />
          {edad && parseInt(edad) >= 40 && parseInt(edad) < 50 && (
            <div className={styles.edadInfo}>
              ⬡ 40–49 años: AGI, FUE, CON y PER pierden 2 puntos por año sobre 40. EGO, CAR y EDU ganan 1 punto.
            </div>
          )}
          {edad && parseInt(edad) >= 50 && (
            <div className={styles.edadInfo}>
              ⬡ 50+ años: AGI, FUE, CON y PER pierden 2 puntos por año sobre 40. Sin bonos compensatorios.
            </div>
          )}
          {edad && (parseInt(edad) > 45) && (amenaza === 'alto' || amenaza === 'muy alto') && (
            <div className={styles.edadAviso}>⚠ Nivel {amenaza} limita la edad a 45 años</div>
          )}
        </Field>

        {/* PERFIL / INSPIRACIÓN */}
        <Field label="Perfil del personaje">
          <div className={styles.modoToggle}>
            <button
              className={`${styles.modoBtn} ${!modoInspiracion ? styles.active : ''}`}
              onClick={() => setModoInspiracion(false)}
            >Perfil ponderado</button>
            <button
              className={`${styles.modoBtn} ${modoInspiracion ? styles.active : ''}`}
              onClick={() => setModoInspiracion(true)}
            >Inspiración</button>
          </div>

          {modoInspiracion ? (
            <div className={styles.inspiracionWrap}>
              <input
                type="text"
                value={inspiracion}
                onChange={e => setInspiracion(e.target.value)}
                placeholder="ej. Al Capone, Bruce Lee, Sherlock Holmes…"
              />
              <div className={styles.inspiracionNota}>
                Personaje histórico, celebridad o personaje de ficción conocido internacionalmente
              </div>
            </div>
          ) : (
            <div className={styles.perfilWrap}>
              {PERFIL_KEYS.map(k => (
                <div key={k} className={styles.perfilRow}>
                  <div className={styles.perfilLabel}>
                    <span>{PERFILES[k].label}</span>
                    <span className={styles.perfilPct}>{ponderacion[k]}%</span>
                  </div>
                  <div className={styles.sliderWrap}>
                    <input
                      type="range"
                      min={0} max={100} step={5}
                      value={ponderacion[k]}
                      onChange={e => handleSlider(k, Number(e.target.value))}
                      style={{ '--c': PERFIL_COLORS[k] }}
                      className={styles.slider}
                    />
                  </div>
                </div>
              ))}
              <div className={styles.perfilEdad}>
                ⬡ Edad estimada: {perfilCalculado.edadMin}–{perfilCalculado.edadMax} años
              </div>
            </div>
          )}
        </Field>

        {/* HABILIDADES IMPRESCINDIBLES */}
        <Field label="Habilidades imprescindibles">
          <div className={styles.imprescindiblesNota}>
            Estarán presentes si el nivel lo permite. Sin selección, la IA decide libremente.
          </div>

          <div className={styles.impSeccion}>Básicas</div>
          <div className={styles.imprescindiblesGrid}>
            {HABILIDADES_BASICAS.map(h => (
              <button
                key={h.id}
                className={`${styles.impBtn} ${imprescindibles.includes(h.id) ? styles.impActive : ''}`}
                onClick={() => toggleImprescindible(h.id)}
                title={h.aptitud}
              >
                {h.label}
              </button>
            ))}
          </div>

          <div className={styles.impSeccion}>Pilotar</div>
          <div className={styles.pilotarGrid}>
            {pilotarVehiculos.map((v, i) => (
              <input
                key={i}
                type="text"
                value={v}
                onChange={e => {
                  const nuevo = [...pilotarVehiculos]
                  nuevo[i] = e.target.value
                  setPilotarVehiculos(nuevo)
                }}
                placeholder={['Coche', 'Moto', 'Avión', 'Barco', 'Helicóptero'][i]}
                className={styles.pilotarInput}
              />
            ))}
          </div>

          <div className={styles.impSeccion}>Arte marcial</div>
          <div className={styles.selWrap}>
            <select value={arteMarcialForzada} onChange={e => setArteMarcialForzada(e.target.value)}>
              <option value="">— Sin preferencia —</option>
              {ARTES_MARCIALES.map(am => (
                <option key={am.id} value={am.id}>{am.label}</option>
              ))}
            </select>
          </div>
          {arteMarcialForzada && amenaza === 'bajo' && (
            <div className={styles.edadAviso}>⚠ Nivel bajo no permite artes marciales</div>
          )}
        </Field>

        <button className={styles.genBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? '✦  Generando…' : '⬡  Invocar PNJ'}
        </button>

      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
    </div>
  )
}
