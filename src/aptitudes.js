// ═══════════════════════════════════════════
// SISTEMA DE APTITUDES — KULT 1ª EDICIÓN
// ═══════════════════════════════════════════

export const APTITUDES = ['AGI', 'FUE', 'CON', 'BEL', 'EGO', 'CAR', 'PER', 'EDU']

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

// Coste real de una aptitud (aplica x3 para valores > 18)
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
export function promptAptitudes(amenaza, edad) {
  const puntos = amenaza === 'único' ? '120-140 (elige dentro del rango según el concepto)' : PUNTOS_POR_NIVEL[amenaza]
  const edadMax = (amenaza === 'alto' || amenaza === 'muy alto') ? 45 : null
  const sinEnvejecimiento = amenaza === 'único'
  const conSecreto = CON_SECRETO.includes(amenaza)

  return `
SISTEMA DE APTITUDES (KULT 1ª ED):
- Aptitudes: AGI, FUE, CON, BEL, EGO, CAR, PER, EDU
- Puntos a distribuir: ${puntos}
- Rango normal: 3 (patología) a 18 (excelencia)
- Valores 19-20 permitidos: cada punto sobre 18 CUESTA 3 del total (ej: AGI 20 = 18 + 3 + 3 = 24 puntos)
- El coste x3 NO se aplica a modificadores por envejecimiento
- Valores 1-2: incapacitantes (solo si la narrativa lo justifica plenamente)
${edadMax ? `- Edad máxima para este nivel: ${edadMax} años` : ''}
${sinEnvejecimiento ? '- Este PNJ NO sufre penalizaciones por envejecimiento (desafía la lógica biológica)' : `- Envejecimiento (40-80 años): AGI/FUE/CON/PER −2 por año sobre 40; EGO/CAR/EDU +1 por año entre 40-50. Sin coste x3.`}

La distribución debe ser coherente con el arquetipo y la narrativa del personaje. El nivel de amenaza fuerza el relato y el relato fuerza la distribución.

Incluye las aptitudes en el JSON con valores enteros ANTES de aplicar envejecimiento (los valores base de diseño):
"aptitudes": { "AGI": 0, "FUE": 0, "CON": 0, "BEL": 0, "EGO": 0, "CAR": 0, "PER": 0, "EDU": 0 }

${conSecreto ? `SECRETO INCONFESABLE: Este PNJ DEBE tener un secreto. Elige el arquetipo más adecuado de esta lista y desarróllalo narrativamente:
${SECRETOS_KULT.map(s => '· ' + s).join('\n')}
El secreto debe encajar con el ámbito del personaje y tener peso dramático real.` : 'SECRETO INCONFESABLE: Este nivel no genera secreto. El campo secreto_inconfesable debe ser null.'}`
}
