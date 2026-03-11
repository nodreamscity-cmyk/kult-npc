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
export function promptAptitudes(amenaza) {
  const puntos = amenaza === 'único' ? '120-140 (elige dentro del rango según el concepto)' : PUNTOS_POR_NIVEL[amenaza]
  const edadMax = (amenaza === 'alto' || amenaza === 'muy alto') ? 45 : null
  const sinEnvejecimiento = amenaza === 'único'
  const conSecreto = CON_SECRETO.includes(amenaza)

  return `
SISTEMA DE APTITUDES (KULT 1ª ED):

Definición de cada aptitud:
- AGI: velocidad, destreza, precisión, equilibrio, salto, carrera, esquiva, reflejos, iniciativa
- FUE: poder muscular, explosión física, capacidad de carga y entrenamiento
- CON: sistema inmunitario, resistencia a tóxicos y enfermedades, genética, regeneración celular
- BEL: hermosura de facciones y figura
- EGO: fortaleza de la mente y el alma, voluntad, carácter, inteligencia, autopercepción, resistencia al terror y la confusión — la más importante para la supervivencia psíquica
- CAR: magnetismo, personalidad, sex appeal, encanto, salero
- PER: capacidad sensorial — oír, ver, notar, agudeza perceptiva
- EDU: formación académica, conocimientos, cultura

Magnitudes de referencia — CRÍTICO, respeta esto:
- 10 es la media humana. La mayoría de aptitudes de cualquier personaje serán 10.
- 12-15 indica aptitud notable relacionada con el arquetipo del personaje
- 18 es excelencia humana — solo 1 o 2 aptitudes pueden llegar aquí
- Valores por debajo de 7 son deficiencias reales y deben justificarse narrativamente
- NUNCA asignes valores de 1-3 salvo que el concepto del personaje lo exija de forma explícita e inevitable
- Un personaje de nivel bajo tendrá la mayoría de aptitudes entre 8-12
- Un personaje de nivel medio tendrá aptitudes entre 9-13, con 1-2 destacadas en 15
- Un personaje de nivel alto tendrá aptitudes entre 10-15, con alguna en 18
- Un personaje de nivel muy alto puede superar 18 en 1-2 aptitudes de arquetipo, compensando en otras pero NUNCA bajando de 7
- Un personaje único no baja de 10 en ninguna aptitud y puede tener valores casi legendarios (19-22)

Proceso de distribución — SIGUE ESTE ORDEN:
1. Define el concepto del personaje según su arquetipo, edad y trasfondo
2. Identifica sus 2-3 aptitudes dominantes según ese concepto y asígnales valores altos (15-18)
3. Asigna 10 al resto como base
4. Ajusta individualmente según el concepto (sube o baja de 10 solo si hay razón narrativa)
5. Verifica que el total no supere ${puntos} puntos (aplicando coste x3 para valores >18)
6. Si el personaje tiene más de 40 años, ten en cuenta que AGI/FUE/CON/PER recibirán −2 por año sobre 40 — compénsalo asignando valores de base más altos en esas aptitudes si el concepto lo permite

Ejemplo correcto para un capo del crimen de 47 años:
AGI 10  FUE 10  CON 12  BEL 8  EGO 18  CAR 15  PER 13  EDU 14
(Tras envejecimiento: AGI 6  FUE 6  CON 8  BEL 8  EGO 25  CAR 22  PER 9  EDU 21)

Puntos a distribuir (ANTES de envejecimiento): ${puntos}
Coste extraordinario: cada punto sobre 18 cuesta 3 del total. NO aplica al envejecimiento.
${edadMax ? `Edad máxima para este nivel: ${edadMax} años.` : ''}
${sinEnvejecimiento ? 'Este PNJ NO sufre penalizaciones por envejecimiento — desafía la lógica biológica.' : 'Envejecimiento (se aplica en cliente tras recibir el JSON): AGI/FUE/CON/PER −2 por año sobre 40; EGO/CAR/EDU +1 por año entre 40-50. Sin coste x3.'}

Incluye las aptitudes en el JSON con valores enteros ANTES de aplicar envejecimiento:
"aptitudes": { "AGI": 0, "FUE": 0, "CON": 0, "BEL": 0, "EGO": 0, "CAR": 0, "PER": 0, "EDU": 0 }

${conSecreto ? `SECRETO INCONFESABLE: Este PNJ DEBE tener un secreto. Elige el arquetipo más adecuado de esta lista y desarróllalo narrativamente en el ámbito del personaje:
${SECRETOS_KULT.map(s => '· ' + s).join('\n')}
El secreto debe encajar con el ámbito del personaje y tener peso dramático real.` : 'SECRETO INCONFESABLE: Este nivel no genera secreto. Los campos secreto_inconfesable y secreto_arquetipo deben ser null.'}`
}
