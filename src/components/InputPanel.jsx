import { useState } from 'react'
import { GRUPOS, SUBGRUPOS, SUBSUBGRUPOS } from '../data.js'
import styles from './InputPanel.module.css'

export default function InputPanel({ onGenerar, loading }) {
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubgrupo] = useState('')
  const [subsubgrupo, setSubsubgrupo] = useState('')
  const [anio, setAnio] = useState('')
  const [nacionalidad, setNacionalidad] = useState('')
  const [residencia, setResidencia] = useState('')
  const [minoria, setMinoria] = useState('no')
  const [amenaza, setAmenaza] = useState('bajo')

  const subgrupoList = SUBGRUPOS[grupo] || []
  const subsubgrupoList = SUBSUBGRUPOS[subgrupo] || []

  const handleGrupo = (v) => {
    setGrupo(v)
    setSubgrupo(SUBGRUPOS[v]?.[0]?.v || '')
    setSubsubgrupo('')
  }

  const handleSubgrupo = (v) => {
    setSubgrupo(v)
    setSubsubgrupo('')
  }

  const getArchetype = () => {
    const sg = subgrupoList.find(x => x.v === subgrupo)
    const ssg = subsubgrupoList.find(x => x.v === subsubgrupo)
    return [sg?.l, ssg?.l].filter(Boolean).join(' / ') || GRUPOS[grupo] || ''
  }

  const handleSubmit = () => {
    if (!grupo) { alert('Selecciona un tipo de PNJ'); return }
    onGenerar({
      grupo,
      grupoLabel: GRUPOS[grupo],
      subgrupo,
      subsubgrupo,
      archetype: getArchetype(),
      anio,
      nacionalidad,
      residencia,
      minoria,
      amenaza
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
          <input
            type="text"
            value={anio}
            onChange={e => setAnio(e.target.value)}
            placeholder="ej. 1993, 2008, 2024…"
          />
        </Field>

        <Field label="Nacionalidad del PNJ">
          <input
            type="text"
            value={nacionalidad}
            onChange={e => setNacionalidad(e.target.value)}
            placeholder="ej. inglesa, rusa, japonesa…"
          />
        </Field>

        <Field label="Residencia / Localización de la aventura">
          <input
            type="text"
            value={residencia}
            onChange={e => setResidencia(e.target.value)}
            placeholder="ej. Nueva York, Madrid, Tokio…"
          />
        </Field>

        <Field label="Minoría étnico-cultural">
          <div className={styles.toggle}>
            {['no', 'si'].map(v => (
              <button
                key={v}
                className={`${styles.toggleBtn} ${minoria === v ? styles.active : ''}`}
                onClick={() => setMinoria(v)}
              >
                {v === 'no' ? 'No' : 'Sí'}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Nivel de amenaza y experiencia">
          <div className={styles.radioGroup}>
            {['bajo', 'medio', 'alto', 'muy alto', 'único'].map(v => (
              <button
                key={v}
                className={`${styles.radioBtn} ${amenaza === v ? styles.active : ''}`}
                onClick={() => setAmenaza(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.amenazaNota}>
            ⬡ Alto, Muy alto y Único generan secreto inconfesable
          </div>
        </Field>

        <button
          className={styles.genBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
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
