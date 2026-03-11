import { useState } from 'react'
import InputPanel from './components/InputPanel.jsx'
import OutputPanel from './components/OutputPanel.jsx'
import { aplicarEnvejecimiento, promptAptitudes, CON_SECRETO, calcularSecundarias } from './aptitudes.js'
import styles from './App.module.css'

export default function App() {
  const [params, setParams] = useState(null)
  const [pnj, setPnj] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onGenerar(p) {
    setParams(p)
    setLoading(true)
    setPnj(null)
    setError(null)

    const conSecreto = CON_SECRETO.includes(p.amenaza)

    const prompt = `Eres asistente para el juego de rol de horror KULT (primera edición). Tono oscuro, urbano y perturbador. La realidad es una ilusión y el horror acecha bajo la superficie cotidiana.

Genera un PNJ con estos parámetros:
- Tipo: ${p.grupoLabel} / ${p.archetype}
- Año de campaña: ${p.anio || 'contemporáneo'}
- Nacionalidad del PNJ: ${p.nacionalidad || 'no especificada'}
- Residencia / Localización aventura: ${p.residencia || 'no especificada'}
- Minoría étnico-cultural: ${p.minoria === 'si' ? 'Sí, define cuál de forma coherente' : 'No'}
- Sexo: ${p.sexo === 'aleatorio' ? 'elige libremente según el arquetipo' : p.sexo}
- Orientación sexual: ${p.orientacion === 'aleatoria' ? 'elige libremente según el arquetipo' : p.orientacion}
- Nivel de amenaza y experiencia: ${p.amenaza}

${promptAptitudes(p.amenaza, p.perfilCalculado)}

Responde SOLO con un objeto JSON válido, sin markdown ni texto adicional:
{
  "nombre": "",
  "edad": 0,
  "sexo": "hombre/mujer/no binario",
  "ciudad_nacimiento": "",
  "ciudad_actual": "",
  "minoria": null,
  "vivienda": "",
  "ahorros": "",
  "ingresos_mensuales": "",
  "nivel_credito": "",
  "familiares": "",
  "amigos_vinculos": "",
  "apariencia": "",
  "personalidad": "",
  "motivacion": "",
  "comportamiento_jugadores": "",
  "secreto_inconfesable": ${conSecreto ? '""' : 'null'},
  "secreto_arquetipo": ${conSecreto ? '""' : 'null'},
  "aptitudes": { "AGI": 0, "FUE": 0, "CON": 0, "BEL": 0, "EGO": 0, "CAR": 0, "PER": 0, "EDU": 0 }
}

Reglas narrativas: nombre realista según nacionalidad y época. Textos de 2-4 frases cada uno. Adapta todo al año, localización y contexto cultural. El nivel de amenaza fuerza el relato y el relato fuerza la distribución de aptitudes.`

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2500,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await res.json()
      const text = data.content.map(i => i.text || '').join('')
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Respuesta inesperada del servidor')
      const parsed = JSON.parse(match[0])

      // Aplicar envejecimiento en cliente
      if (parsed.aptitudes && parsed.edad) {
        const { aptitudes, nota } = aplicarEnvejecimiento(parsed.aptitudes, parsed.edad, p.amenaza)
        parsed.aptitudes_finales = aptitudes
        parsed.nota_envejecimiento = nota
        parsed.secundarias = calcularSecundarias(aptitudes)
      }

      setPnj(parsed)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.sigil}>✦ ✦ ✦</div>
        <h1 className={styles.title}>KULT</h1>
        <p className={styles.subtitle}>Generador de Personajes No Jugadores — Fase Narrativa</p>
      </header>

      <main className={styles.main}>
        <InputPanel onGenerar={onGenerar} loading={loading} />
        <OutputPanel pnj={pnj} loading={loading} error={error} params={params} />
      </main>
    </div>
  )
}
