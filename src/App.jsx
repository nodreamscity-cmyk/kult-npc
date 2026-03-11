import { useState } from 'react'
import InputPanel from './components/InputPanel.jsx'
import OutputPanel from './components/OutputPanel.jsx'
import styles from './App.module.css'

export default function App() {
  const [params, setParams] = useState(null)
  const [pnj, setPnj] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onGenerar(p) {
    setParams(p)
    setLoading(true)
    setPnj(null)
    setImgSrc(null)
    setError(null)

    const prompt = `Eres asistente para el juego de rol de horror KULT (primera edición). Tono oscuro, urbano y perturbador. La realidad es una ilusión y el horror acecha bajo la superficie cotidiana.

Genera un PNJ con estos parámetros:
- Tipo: ${p.grupoLabel} / ${p.archetype}
- Año de campaña: ${p.anio || 'contemporáneo'}
- Nacionalidad del PNJ: ${p.nacionalidad || 'no especificada'}
- Residencia / Localización aventura: ${p.residencia || 'no especificada'}
- Minoría étnico-cultural: ${p.minoria === 'si' ? 'Sí, define cuál de forma coherente' : 'No'}
- Nivel de amenaza y experiencia: ${p.amenaza}

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
  "secreto_inconfesable": ""
}

Reglas: nombre realista según nacionalidad y época. Textos narrativos de 2-4 frases cada uno. Secreto inconfesable: oscuro, específico, con peso dramático real y consecuencias concretas si se descubre. Adapta todo al año, localización y contexto cultural indicados.`

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await res.json()
      const text = data.content.map(i => i.text || '').join('')
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Respuesta inesperada del servidor')
      const parsed = JSON.parse(match[0])
      setPnj(parsed)

      // Build Pollinations image prompt
      const gender = parsed.sexo === 'mujer' ? 'woman' : 'man'
      const archEn = p.archetype.replace(/\d+[\.\d]*\s*·\s*/g, '').toLowerCase()
      const loc = p.residencia || 'urban city'
      const yr = p.anio || 'contemporary'
      const ip = encodeURIComponent(
        `cinematic portrait photo ${gender} ${parsed.edad} years old ${archEn} ${yr} ${loc} noir dramatic lighting gritty realism dark atmosphere photorealistic detailed face`
      )
      setImgSrc(`https://image.pollinations.ai/prompt/${ip}?width=300&height=400&nologo=true&seed=${Date.now()}`)

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
        <OutputPanel pnj={pnj} imgSrc={imgSrc} loading={loading} error={error} params={params} />
      </main>
    </div>
  )
}
