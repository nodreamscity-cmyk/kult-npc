import { useState } from 'react'
import InputPanel from './components/InputPanel.jsx'
import OutputPanel from './components/OutputPanel.jsx'
import { aplicarEnvejecimiento, promptAptitudes, CON_SECRETO, calcularSecundarias } from './aptitudes.js'
import { calcularEquilibrio, promptEquilibrio } from './equilibrio.js'
import { promptHabilidades, HABILIDADES_BASICAS, ARTES_MARCIALES } from './habilidades.js'
import PrintView from './PrintView.jsx'
import styles from './App.module.css'

export default function App() {
  const [params, setParams] = useState(null)
  const [pnj, setPnj] = useState(null)
  const [printMode, setPrintMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onGenerar(p) {
    setParams(p)
    setLoading(true)
    setPnj(null)
    setError(null)

    const conSecreto = CON_SECRETO.includes(p.amenaza)

    const prompt = `Eres asistente para el juego de rol de horror KULT (primera edición). Tono oscuro, urbano y perturbador. La realidad es una ilusión y el horror acecha bajo la superficie cotidiana.

FILOSOFÍA NARRATIVA — MUY IMPORTANTE:
Esta app genera el ESQUEMA de un personaje, no su historia. El narrador pondrá la vida.
- Cada campo narrativo: 1-2 frases precisas. Trazos, no relatos.
- Sin ganchos para el master, sin dramatismo innecesario, sin frases de cierre épicas.
- Apariencia: rasgos físicos concretos y llamativos. Nada más.
- Personalidad: 2-3 rasgos dominantes en tensión. Sin explicaciones psicológicas.
- Motivación: una dirección, no una historia de vida.
- Comportamiento ante jugadores: cómo reacciona en primera instancia. Punto.
- Secreto inconfesable: la tensión latente, no el relato del trauma.
- Familiares / vínculos: nombres, rol, estado. Sin narrativa.

Genera un PNJ con estos parámetros:
- Tipo: ${p.grupoLabel} / ${p.archetype}
- Año de campaña: ${p.anio || 'contemporáneo'}
- Nacionalidad del PNJ: ${p.nacionalidad === '__aleatoria__' ? 'elige libremente según arquetipo, año y localización' : (p.nacionalidad || 'no especificada')}
- Residencia / Localización aventura: ${p.residencia || 'no especificada'}
- Minoría étnico-cultural: ${p.minoria === 'si' ? 'Sí, define cuál de forma coherente' : 'No'}
- Sexo: ${p.sexo === 'aleatorio' ? 'elige libremente según el arquetipo' : p.sexo}
- Orientación sexual: ${p.orientacion === 'aleatoria' ? 'elige libremente según el arquetipo' : p.orientacion}
- Nivel de amenaza y experiencia: ${p.amenaza}
${p.nombreForzado ? `- Nombre fijado por el usuario: ${p.nombreForzado}. Usa exactamente este nombre.` : ''}
${p.edad ? `- Edad fijada por el usuario: ${p.edad} años. Respeta esta edad salvo que contradiga una restricción de nivel (alto/muy alto: máximo 45 años).` : ''}
${p.inspiracion ? `- Inspiración de personaje: "${p.inspiracion}". IMPORTANTE: solo usa esta referencia si corresponde a una figura pública, histórica o de ficción reconocida internacionalmente. Si no la reconoces, ignórala completamente y genera el personaje según arquetipo y nivel. Si la reconoces, úsala como ancla de personalidad, perfil y distribución de aptitudes — no copies datos biográficos reales, inspírate en el arquetipo que representa.` : ''}
${(() => {
        const basicas = p.imprescindibles?.length > 0
          ? p.imprescindibles.map(id => { const h = HABILIDADES_BASICAS.find(x => x.id === id); return h ? h.label : id })
          : []
        const pilotar = (p.pilotarVehiculos || []).map(v => `Pilotar ${v}`)
        const todas = [...basicas, ...pilotar]
        return todas.length > 0
          ? `- Habilidades imprescindibles (incluye estas si el nivel lo permite): ${todas.join(', ')}.`
          : ''
      })()}
${p.arteMarcialForzada ? `- Arte marcial preferida por el usuario: ${ARTES_MARCIALES.find(x => x.id === p.arteMarcialForzada)?.label || p.arteMarcialForzada}. Úsala si el nivel de amenaza lo permite. Si no es posible, ignórala sin avisar.` : ''}

${promptAptitudes(p.amenaza, p.perfilCalculado)}

${promptEquilibrio(p.amenaza, p.ponderacion)}

${promptHabilidades(p.amenaza, p.perfilCalculado, p.ponderacion, 0)}

Nota: el pool de habilidades puede aumentar según el balance ventajas/desventajas que determines. Ajusta pool_gastado en consecuencia.

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
  "comportamiento_jugadores": "",
  "secreto_inconfesable": ${conSecreto ? '""' : 'null'},
  "secreto_arquetipo": ${conSecreto ? '""' : 'null'},
  "aptitudes": { "AGI": 0, "FUE": 0, "CON": 0, "BEL": 0, "EGO": 0, "CAR": 0, "PER": 0, "EDU": 0 },
  "ventajas": [{"id": "", "label": "", "coste": 0}],
  "desventajas": [{"id": "", "label": "", "puntos": 0}],
  "equilibrio_mental": 0,
  "puntos_habilidad_extra": 0,
  "equilibrio_signo": "positivo/negativo/neutro",
  "habilidades": [{"id": "", "label": "", "aptitud": "", "valor": 0, "bloque": "principal/ancla/basica", "nota": ""}],
  "arte_marcial": {
    "disciplina": "nombre del arte marcial",
    "nivel": 0,
    "nivel_label": "estudiante/instructor/maestro/gran maestro",
    "coste": 0,
    "bono_dano": 0,
    "habilidades": [{"id": "", "label": "", "aptitud": "FUE/AGI", "valor": 0}],
    "maniobras": [{"label": "", "aptitud": "AGI/FUE/EGO", "valor": 0}],
    "preternaturales": [{"label": "", "coste": 0}]
  },
  "pool_total": 0,
  "pool_gastado": 0,
  "equipo_en_escena": ["", "", "", ""]
}

equipo_en_escena: entre 4 y 6 objetos concretos que lleva encima cuando aparece por primera vez. Solo nombres de objeto, sin descripciones ni narrativa. Coherentes con su nivel económico, perfil y contexto.

Reglas narrativas: nombre realista según nacionalidad y época. Textos de 1-2 frases precisas. Adapta todo al año, localización y contexto cultural. El nivel de amenaza fuerza el relato y el relato fuerza la distribución de aptitudes.`

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 3500,
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

      // Calcular equilibrio mental en cliente (verificación)
      if (parsed.ventajas && parsed.desventajas) {
        const eq = calcularEquilibrio(parsed.ventajas, parsed.desventajas)
        parsed.equilibrio_calculado = eq
      }

      // Normalizar maniobras budo — la IA a veces devuelve strings en lugar de objetos
      if (parsed.arte_marcial?.maniobras) {
        const APTITUD_MANIOBRA = {
          'amortiguar el golpe': 'AGI', 'ataque relámpago': 'AGI', 'ataque torbellino': 'AGI',
          'combinar': 'AGI', 'desarmar': 'AGI', 'estrangulamiento': 'AGI', 'evasión': 'AGI',
          'gancho': 'FUE', 'iaido': 'AGI', 'kiai': 'EGO', 'noquear': 'FUE',
          'patada giratoria': 'FUE', 'patada voladora': 'FUE', 'romper el arma': 'AGI',
          'tajo giratorio': 'AGI', 'salto del tigre': 'AGI', 'zafarse': 'AGI',
          'zarpa de tigre': 'AGI', 'fuera de combate': 'AGI', 'suavizar el golpe': 'AGI',
          'romper la presa': 'AGI', 'contraataque': 'AGI', 'inmovilización': 'AGI',
        }
        parsed.arte_marcial.maniobras = parsed.arte_marcial.maniobras.map(m => {
          if (typeof m === 'string') {
            const key = m.toLowerCase()
            return { label: m, aptitud: APTITUD_MANIOBRA[key] || 'AGI', valor: '' }
          }
          return m
        })
      }

      setPnj(parsed)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  if (printMode && pnj) {
    return <PrintView pnj={pnj} onCerrar={() => setPrintMode(false)} />
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
        <OutputPanel pnj={pnj} loading={loading} error={error} params={params} onImprimir={() => setPrintMode(true)} />
      </main>
    </div>
  )
}
