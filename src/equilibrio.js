// ═══════════════════════════════════════════
// VENTAJAS, DESVENTAJAS Y EQUILIBRIO MENTAL
// KULT 1ª EDICIÓN
// ═══════════════════════════════════════════

export const DESVENTAJAS = [
  { id: 'acusado_injustamente',       label: 'Acusado injustamente',       puntos: [15] },
  { id: 'antipatico_animales',        label: 'Antipático a los animales',  puntos: [5] },
  { id: 'avaricia',                   label: 'Avaricia',                   puntos: [10] },
  { id: 'buscado',                    label: 'Buscado',                    puntos: [5, 10, 15] },
  { id: 'depresion',                  label: 'Depresión',                  puntos: [15] },
  { id: 'desfigurado',                label: 'Desfigurado',                puntos: [15] },
  { id: 'drogadiccion',               label: 'Drogadicción',               puntos: [15, 20] },
  { id: 'egoista',                    label: 'Egoísta',                    puntos: [5] },
  { id: 'embrujado',                  label: 'Embrujado',                  puntos: [5, 10, 15] },
  { id: 'enemigo_mortal',             label: 'Enemigo mortal',             puntos: [15] },
  { id: 'esquizofrenia',              label: 'Esquizofrenia',              puntos: [20] },
  { id: 'fanatismo',                  label: 'Fanatismo',                  puntos: [10] },
  { id: 'fobia',                      label: 'Fobia',                      puntos: [5, 10, 15] },
  { id: 'identidad_confundida',       label: 'Identidad confundida',       puntos: [5, 15] },
  { id: 'ignorado',                   label: 'Ignorado',                   puntos: [10] },
  { id: 'instinto_autodestruccion',   label: 'Instinto de autodestrucción',puntos: [10] },
  { id: 'intolerancia',               label: 'Intolerancia',               puntos: [10] },
  { id: 'jugador_empedernido',        label: 'Jugador empedernido',        puntos: [15] },
  { id: 'juramento_venganza',         label: 'Juramento de venganza',      puntos: [5] },
  { id: 'mala_fama',                  label: 'Mala fama',                  puntos: [10] },
  { id: 'mala_suerte',                label: 'Mala suerte',                puntos: [15] },
  { id: 'maldicion',                  label: 'Maldición',                  puntos: [10, 20] },
  { id: 'mania',                      label: 'Manía',                      puntos: [15] },
  { id: 'maniaco_depresivo',          label: 'Maníaco depresivo',          puntos: [20] },
  { id: 'medium_involuntario',        label: 'Médium involuntario',        puntos: [15] },
  { id: 'mentiroso_compulsivo',       label: 'Mentiroso compulsivo',       puntos: [5, 15] },
  { id: 'neurosis_sexual',            label: 'Neurosis sexual',            puntos: [5, 10, 15] },
  { id: 'obsesion',                   label: 'Obsesión',                   puntos: [5, 10, 15] },
  { id: 'paranoia',                   label: 'Paranoia',                   puntos: [15] },
  { id: 'perseguido',                 label: 'Perseguido',                 puntos: [10] },
  { id: 'personalidad_multiple',      label: 'Personalidad múltiple',      puntos: [15] },
  { id: 'pesadillas',                 label: 'Pesadillas',                 puntos: [5, 10] },
  { id: 'quisquilloso',               label: 'Quisquilloso',               puntos: [5] },
  { id: 'racionalista',               label: 'Racionalista',               puntos: [15] },
  { id: 'represion',                  label: 'Represión',                  puntos: [10] },
  { id: 'sexualmente_perturbador',    label: 'Sexualmente perturbador',    puntos: [10] },
]

export const VENTAJAS = [
  { id: 'altruismo',                  label: 'Altruismo',                  coste: 5 },
  { id: 'amigos_influyentes',         label: 'Amigos influyentes',         coste: 15 },
  { id: 'buena_fama',                 label: 'Buena fama',                 coste: 10 },
  { id: 'caballerosidad',             label: 'Caballerosidad',             coste: 5 },
  { id: 'codigo_honor',               label: 'Código de honor',            coste: 5 },
  { id: 'don_lenguas',                label: 'Don de lenguas',             coste: 10 },
  { id: 'empatia',                    label: 'Empatía',                    coste: 15 },
  { id: 'flexibilidad_cultural',      label: 'Flexibilidad cultural',      coste: 10 },
  { id: 'generosidad',                label: 'Generosidad',                coste: 5 },
  { id: 'indulgente',                 label: 'Indulgente',                 coste: 5 },
  { id: 'intuicion',                  label: 'Intuición',                  coste: 15 },
  { id: 'maternal',                   label: 'Maternal',                   coste: 5 },
  { id: 'pacifismo',                  label: 'Pacifismo',                  coste: 5 },
  { id: 'resistencia_enfermedades',   label: 'Resistencia a enfermedades', coste: 15 },
  { id: 'sensibilidad_expandida',     label: 'Sensibilidad expandida',     coste: 10 },
  { id: 'sentido_cuerpo',             label: 'Sentido del cuerpo',         coste: 20 },
  { id: 'sexto_sentido',              label: 'Sexto sentido',              coste: 15 },
  { id: 'simpatico_animales',         label: 'Simpático a los animales',   coste: 15 },
  { id: 'sinceridad',                 label: 'Sinceridad',                 coste: 5 },
  { id: 'soportar_dolor',             label: 'Soportar el dolor',          coste: 15 },
  { id: 'soportar_frio_calor',        label: 'Soportar el frío o el calor',coste: 10 },
  { id: 'soportar_hambre_sed',        label: 'Soportar el hambre o la sed',coste: 10 },
  { id: 'soportar_tortura',           label: 'Soportar la tortura',        coste: 10 },
  { id: 'suerte',                     label: 'Suerte',                     coste: 20 },
  { id: 'talento_artistico',          label: 'Talento artístico',          coste: 10 },
  { id: 'talento_matematico',         label: 'Talento matemático',         coste: 10 },
  { id: 'vision_aura',                label: 'Visión del aura',            coste: 15 },
]

// Efectos del desequilibrio mental por umbral
export const EFECTOS_DESEQUILIBRIO = [
  { umbral: -15,  efecto: 'Emites un aura negativa leve. Niños y animales se sienten incómodos en tu presencia.' },
  { umbral: -25,  efecto: 'Perturbado. Un chequeo médico te calificaría de anormal.' },
  { umbral: -50,  efecto: 'Mentalmente enfermo. Un examen psicológico te clasificaría como enfermo mental.' },
  { umbral: -75,  efecto: 'Psicótico. Bajo estrés tu cuerpo cambia. Puedes adquirir limitaciones como desventajas.' },
  { umbral: -100, efecto: 'Has perdido el control permanente de tus desventajas. Tu Sombra oscura se materializa.' },
]

export const EFECTOS_EQUILIBRIO = [
  { umbral: 15,  efecto: 'Emites un aura positiva leve. Niños y animales se sienten a gusto contigo.' },
  { umbral: 25,  efecto: 'Reconocido como persona armoniosa y estable que gusta a todo el mundo.' },
  { umbral: 50,  efecto: 'Empatía natural. La gente se siente segura en tu compañía.' },
  { umbral: 75,  efecto: 'Los seres con desequilibrio −100 te evitan si pueden.' },
  { umbral: 100, efecto: 'Obtienes Sentido del cuerpo automáticamente. Tus desventajas pierden 1 punto cada una.' },
]

// Calcula balance, desequilibrio/equilibrio y puntos extra de habilidad
export function calcularEquilibrio(ventajasElegidas, desventajasElegidas) {
  const sumaVentajas = ventajasElegidas.reduce((s, v) => s + v.coste, 0)
  const sumaDesventajas = desventajasElegidas.reduce((s, d) => s + d.puntos, 0)
  const balance = sumaDesventajas - sumaVentajas

  const puntosHabilidadExtra = balance > 0 ? balance : 0
  const equilibrioMental = balance > 0 ? -balance : Math.abs(balance)
  const signo = balance > 0 ? 'negativo' : balance < 0 ? 'positivo' : 'neutro'

  // Efecto activo según umbral
  let efectoActivo = null
  if (balance > 0) {
    const umbrales = EFECTOS_DESEQUILIBRIO.filter(e => -balance <= e.umbral)
    efectoActivo = umbrales.length ? umbrales[umbrales.length - 1] : null
  } else if (balance < 0) {
    const umbrales = EFECTOS_EQUILIBRIO.filter(e => Math.abs(balance) >= e.umbral)
    efectoActivo = umbrales.length ? umbrales[umbrales.length - 1] : null
  }

  return { sumaVentajas, sumaDesventajas, balance, puntosHabilidadExtra, equilibrioMental, signo, efectoActivo }
}

// Límites de ventajas/desventajas por nivel de amenaza
export function limitesPorNivel(amenaza) {
  if (amenaza === 'bajo' || amenaza === 'medio') {
    return { minV: 0, maxV: 1, minD: 0, maxD: 1 }
  }
  return { minV: 1, maxV: 5, minD: 1, maxD: 5 }
}

// ¿Debe tener Sentido del cuerpo forzado?
export function forzarSentidoCuerpo(amenaza, ponderacion) {
  if (amenaza !== 'muy alto' && amenaza !== 'único') return false
  const totalCombativo = ponderacion?.combativo || 0
  const total = Object.values(ponderacion || {}).reduce((s, v) => s + v, 0)
  return total > 0 && (totalCombativo / total) > 0.5
}

// Genera el bloque de instrucciones para el prompt
export function promptEquilibrio(amenaza, ponderacion) {
  const limites = limitesPorNivel(amenaza)
  const sentidoCuerpo = forzarSentidoCuerpo(amenaza, ponderacion)

  const listaVentajas = VENTAJAS.map(v => `· ${v.label} (${v.coste} pts)`).join('\n')
  const listaDesventajas = DESVENTAJAS.map(d => {
    const pts = d.puntos.length > 1 ? d.puntos.join('/') : d.puntos[0]
    return `· ${d.label} (${pts} pts)`
  }).join('\n')

  return `
VENTAJAS Y DESVENTAJAS (KULT 1ª ED):

Elige entre ${limites.minD} y ${limites.maxD} desventajas y entre ${limites.minV} y ${limites.maxV} ventajas.
La elección debe ser COHERENTE con el relato, trasfondo y perfil del personaje — no aleatoria.
${sentidoCuerpo ? '⚠ Este personaje DEBE tener la ventaja "Sentido del cuerpo" por su perfil combativo dominante.' : ''}

DESVENTAJAS disponibles (elige las más narrativamente coherentes):
${listaDesventajas}
También puedes crear una desventaja nueva coherente con el personaje, dentro del rango de puntos existente (5-20).

VENTAJAS disponibles:
${listaVentajas}
También puedes crear una ventaja nueva coherente con el personaje, dentro del rango de puntos existente (5-20).

FÓRMULA DE EQUILIBRIO MENTAL:
Balance = Σ puntos desventajas − Σ puntos ventajas
· Si balance > 0 → desequilibrio mental = −balance / puntos extra de habilidad = balance
· Si balance ≤ 0 → equilibrio mental = |balance| / sin puntos extra de habilidad

Incluye en el JSON:
"ventajas": [{"id": "", "label": "", "coste": 0}],
"desventajas": [{"id": "", "label": "", "puntos": 0}],
"equilibrio_mental": 0,
"puntos_habilidad_extra": 0,
"equilibrio_signo": "positivo/negativo/neutro"
`
}
