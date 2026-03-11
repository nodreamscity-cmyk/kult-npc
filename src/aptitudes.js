// ═══════════════════════════════════════════
// SISTEMA DE APTITUDES — KULT 1ª EDICIÓN
// ═══════════════════════════════════════════

export const APTITUDES = ['AGI', 'FUE', 'CON', 'BEL', 'EGO', 'CAR', 'PER', 'EDU']

// ═══════════════════════════════════════════
// PERFILES DE PERSONAJE
// ═══════════════════════════════════════════

export const PERFILES = {
  combativo: {
    label: 'Combativo',
    edadMin: 18, edadMax: 35,
    dominantes: ['AGI', 'FUE', 'CON'],
    secundarias: ['PER'],
    bajas: ['EDU', 'BEL'],
    relato: 'directo, físico, resolutivo, escasa paciencia para la política o la diplomacia. Sus problemas los resuelve con acción. Sus secretos son de sangre.'
  },
  cerebral: {
    label: 'Cerebral',
    edadMin: 28, edadMax: 55,
    dominantes: ['EGO', 'EDU', 'PER'],
    secundarias: [],
    bajas: ['FUE', 'BEL'],
    relato: 'analítico, paciente, manipulador a menudo sin saberlo. Acumula conocimiento como otros acumulan deudas. Sus secretos son de saber prohibido.'
  },
  carismatico: {
    label: 'Carismático',
    edadMin: 25, edadMax: 50,
    dominantes: ['CAR', 'EGO', 'BEL'],
    secundarias: [],
    bajas: ['FUE'],
    relato: 'magnético, social, sus relaciones son su verdadero poder y su talón de Aquiles. Atrae sin proponérselo. Sus secretos son de deseo y traición.'
  },
  equilibrado: {
    label: 'Equilibrado',
    edadMin: 28, edadMax: 45,
    dominantes: [],
    secundarias: [],
    bajas: [],
    relato: 'versátil, sin extremos evidentes, difícil de leer. Su arquetipo define sus matices. Sus secretos son complejos y no encajan en categorías simples.'
  },
  aleatorio: {
    label: 'Aleatorio',
    edadMin: 18, edadMax: 70,
    dominantes: [],
    secundarias: [],
    bajas: [],
    relato: 'sin condicionantes de perfil. La IA decide libremente según arquetipo, nivel y contexto.'
  }
}

// Interpola rangos de edad y pesos de aptitudes según ponderación de perfiles
export function calcularPerfil(ponderacion) {
  // ponderacion = { combativo: 0-100, cerebral: 0-100, carismatico: 0-100, equilibrado: 0-100, aleatorio: 0-100 }
  // los valores deben sumar 100

  const total = Object.values(ponderacion).reduce((s, v) => s + v, 0)
  if (total === 0) return PERFILES.aleatorio

  // Edad ponderada
  let edadMin = 0, edadMax = 0
  Object.entries(ponderacion).forEach(([k, v]) => {
    const peso = v / total
    edadMin += PERFILES[k].edadMin * peso
    edadMax += PERFILES[k].edadMax * peso
  })

  // Aptitudes dominantes ponderadas (acumula peso por aptitud)
  const pesosApt = {}
  APTITUDES.forEach(a => pesosApt[a] = 0)

  Object.entries(ponderacion).forEach(([k, v]) => {
    if (v === 0) return
    const peso = v / total
    const p = PERFILES[k]
    p.dominantes.forEach(a => pesosApt[a] += peso * 2)
    p.secundarias.forEach(a => pesosApt[a] += peso * 1)
    p.bajas.forEach(a => pesosApt[a] -= peso * 1)
  })

  // Relato ponderado — lista los perfiles activos por peso
  const relatoFrags = Object.entries(ponderacion)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([k, v]) => `${PERFILES[k].label} (${v}%): ${PERFILES[k].relato}`)

  return {
    edadMin: Math.round(edadMin),
    edadMax: Math.round(edadMax),
    pesosApt,
    relato: relatoFrags.join('\n')
  }
}

export const PUNTOS_POR_NIVEL = {
  bajo: 90,
  medio: 100,
  alto: 100,
  'muy alto': 110,
  'único': null // 120-140, se decide en prompt
}

export const CON_SECRETO = ['alto', 'muy alto', 'único']

export const SECRETOS_KULT = [
  'Conocimiento prohibido',
  'Culpable de crimen',
  'Demencia',
  'Desarraigado',
  'Elegido',
  'Experiencia con lo oculto',
  'Experiencia sobrenatural',
  'Guardián',
  'Heredero',
  'Legado',
  'Maldición',
  'Pacto con los poderes de la oscuridad',
  'Poseído y embrujado',
  'Responsable de experimentos médicos',
  'Secreto de familia',
  'Víctima de crimen',
  'Víctima de experimentos médicos'
]

// ═══════════════════════════════════════════
// APTITUDES SECUNDARIAS — KULT 1ª EDICIÓN
// ═══════════════════════════════════════════

export function calcularSecundarias(apt) {
  const { AGI, FUE, CON } = apt

  // RESISTENCIA
  const resistencia = CON * 5

  // CAPACIDAD DE CARGA
  const cargaMax = FUE

  // BONO DE INICIATIVA
  let bonoIniciativa = 0
  if (AGI > 12) bonoIniciativa = AGI - 12
  else if (AGI < 8) bonoIniciativa = AGI - 8
  // entre 8-12 es 0

  // ACCIONES POR TURNO
  let acciones = 2
  if (AGI >= 16) acciones = 3 + Math.floor((AGI - 16) / 10)
  acciones = Math.min(acciones, 9)

  // BONO AL DAÑO (FUE + AGI)
  const sumFueAgi = FUE + AGI
  let bonoDano = 0
  if      (sumFueAgi <= 6)  bonoDano = -3
  else if (sumFueAgi <= 10) bonoDano = -2
  else if (sumFueAgi <= 14) bonoDano = -1
  else if (sumFueAgi <= 20) bonoDano = 0
  else if (sumFueAgi <= 24) bonoDano = +1
  else if (sumFueAgi <= 28) bonoDano = +2
  else if (sumFueAgi <= 32) bonoDano = +3
  else if (sumFueAgi <= 40) bonoDano = +4
  else if (sumFueAgi <= 46) bonoDano = +5
  else if (sumFueAgi <= 54) bonoDano = +6
  else                       bonoDano = +7

  // CAPACIDAD DE DAÑO (por CON)
  let capDano = { rasgunos: 0, leves: 0, graves: 0 }
  if      (CON <= 5)  capDano = { rasgunos: 3, leves: 2, graves: 2 }
  else if (CON <= 10) capDano = { rasgunos: 4, leves: 3, graves: 2 }
  else if (CON <= 15) capDano = { rasgunos: 4, leves: 3, graves: 3 }
  else if (CON <= 20) capDano = { rasgunos: 5, leves: 4, graves: 3 }
  else if (CON <= 25) capDano = { rasgunos: 6, leves: 5, graves: 3 }
  else                capDano = { rasgunos: 7, leves: 6, graves: 4 }

  return {
    resistencia,
    cargaMax,
    bonoIniciativa,
    acciones,
    bonoDano,
    capDano
  }
}
export function costeAptitud(valor) {
  if (valor <= 18) return valor
  return 18 + (valor - 18) * 3
}

// Calcula el coste total de un set de aptitudes
export function costeTotalAptitudes(aptitudes) {
  return Object.values(aptitudes).reduce((sum, v) => sum + costeAptitud(v), 0)
}

// Aplica modificadores de envejecimiento
// Devuelve las aptitudes modificadas y un resumen del efecto
export function aplicarEnvejecimiento(aptitudes, edad, amenaza) {
  // Único no envejece
  if (amenaza === 'único') return { aptitudes, nota: null }
  // Solo aplica de 40 a 80
  if (edad < 40 || edad > 80) return { aptitudes, nota: null }

  const añosSobre40 = Math.min(edad - 40, 40) // máximo 40 años de penalización
  const añosEntre40y50 = Math.min(Math.max(edad - 40, 0), 10)

  const mod = { ...aptitudes }
  const fisicas = ['AGI', 'FUE', 'CON', 'PER']
  const mentales = ['EGO', 'CAR', 'EDU']

  // Penalización física: -2 por año sobre 40
  fisicas.forEach(a => {
    mod[a] = Math.max(1, mod[a] - (añosSobre40 * 2))
  })

  // Bonus mental: +1 por año de 40 a 50 (sin coste x3)
  mentales.forEach(a => {
    mod[a] = mod[a] + añosEntre40y50
  })

  const nota = `Envejecimiento aplicado (${edad} años): AGI/FUE/CON/PER −${añosSobre40 * 2}${añosEntre40y50 > 0 ? ` · EGO/CAR/EDU +${añosEntre40y50}` : ''}`
  return { aptitudes: mod, nota }
}

// Genera el bloque de instrucciones para el prompt de la IA
export function promptAptitudes(amenaza, perfil) {
  const puntos = amenaza === 'único' ? '120-140 (elige dentro del rango según el concepto)' : PUNTOS_POR_NIVEL[amenaza]
  const edadMax = (amenaza === 'alto' || amenaza === 'muy alto') ? 45 : null
  const sinEnvejecimiento = amenaza === 'único'
  const conSecreto = CON_SECRETO.includes(amenaza)

  // Construir guía de aptitudes según pesos del perfil
  const guiaApt = perfil ? APTITUDES.map(a => {
    const peso = perfil.pesosApt[a] || 0
    if (peso >= 1.5) return `${a}: DOMINANTE — valor alto, define al personaje`
    if (peso >= 0.5) return `${a}: notable — algo por encima de la media`
    if (peso <= -0.5) return `${a}: baja — por debajo de la media, justificada por perfil`
    return `${a}: media — en torno a 10`
  }).join('\n') : null

  const edadRango = perfil
    ? `${edadMax ? Math.min(perfil.edadMax, edadMax) : perfil.edadMax} años máximo, mínimo ${perfil.edadMin} — condicionado por perfil`
    : edadMax ? `máximo ${edadMax} años` : 'libre'

  return `
SISTEMA DE APTITUDES (KULT 1ª ED):

Definición de cada aptitud:
- AGI: velocidad, destreza, precisión, equilibrio, salto, carrera, esquiva, reflejos, iniciativa
- FUE: poder muscular, explosión física, capacidad de carga y entrenamiento
- CON: sistema inmunitario, resistencia a tóxicos y enfermedades, genética, regeneración celular
- BEL: hermosura de facciones y figura
- EGO: fortaleza de la mente y el alma, voluntad, carácter, inteligencia, autopercepción, resistencia al terror — la más importante para la supervivencia psíquica
- CAR: magnetismo, personalidad, sex appeal, encanto, salero
- PER: capacidad sensorial — oír, ver, notar, agudeza perceptiva
- EDU: formación académica, conocimientos, cultura

${perfil ? `PERFIL DEL PERSONAJE — condiciona aptitudes, edad y relato:
${perfil.relato}

Guía de distribución por perfil:
${guiaApt}
` : ''}
Magnitudes de referencia:
- 10 es la media humana
- 12-15 indica aptitud notable ligada al arquetipo
- 18 es excelencia humana — solo 1 o 2 aptitudes
- Nunca valores 1-3 salvo que el concepto lo exija de forma inevitable
- Muy alto: puede superar 18 en aptitudes dominantes, nunca bajar de 7
- Único: no baja de 10, valores casi legendarios posibles

Edad del personaje: ${edadRango}
${sinEnvejecimiento ? 'Este PNJ NO sufre envejecimiento — desafía la lógica biológica.' : 'Si tiene más de 40 años, recuerda que AGI/FUE/CON/PER recibirán −2 por año sobre 40 en post-proceso. Compensa asignando bases más altas en esas aptitudes si el arquetipo lo permite.'}

Proceso — SIGUE ESTE ORDEN:
1. Define el concepto según arquetipo, perfil y edad
2. Asigna valores a aptitudes dominantes del perfil (15-18)
3. Asigna 10 al resto como base
4. Ajusta según concepto solo si hay razón narrativa
5. Verifica que el total no supere ${puntos} puntos (coste ×3 para valores >18)

Puntos a distribuir (ANTES de envejecimiento): ${puntos}
Coste extraordinario: cada punto sobre 18 cuesta 3. NO aplica al envejecimiento.

Incluye aptitudes en el JSON ANTES de envejecimiento:
"aptitudes": { "AGI": 0, "FUE": 0, "CON": 0, "BEL": 0, "EGO": 0, "CAR": 0, "PER": 0, "EDU": 0 }

${conSecreto
    ? 'SECRETO INCONFESABLE: Este PNJ DEBE tener un secreto. Elige el arquetipo más adecuado de esta lista y desarróllalo narrativamente en el ámbito del personaje:\n' + SECRETOS_KULT.map(s => '· ' + s).join('\n') + '\nEl secreto debe encajar con el perfil y tener peso dramático real.'
    : 'SECRETO INCONFESABLE: Este nivel no genera secreto. Los campos secreto_inconfesable y secreto_arquetipo deben ser null.'
}`
}
