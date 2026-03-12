// ═══════════════════════════════════════════
// HABILIDADES — KULT 1ª EDICIÓN
// ═══════════════════════════════════════════

// ── Pool base por nivel (sin bono desequilibrio) ──
export const POOL_BASE = {
  'bajo':     90,
  'medio':    100,
  'alto':     120,
  'muy alto': 155,
  'único':    200,
}

// ── Habilidades básicas (base 3 puntos gratis) ──
export const HABILIDADES_BASICAS = [
  // AGI
  { id: 'armas_proyectil',    label: 'Armas de proyectil',   aptitud: 'AGI' },
  { id: 'arco',               label: 'Arco',                  aptitud: 'AGI' },
  { id: 'armas_automaticas',  label: 'Armas automáticas',     aptitud: 'AGI' },
  { id: 'armas_pesadas',      label: 'Armas pesadas',         aptitud: 'AGI' },
  { id: 'fusil_ballesta',     label: 'Fusil y ballesta',      aptitud: 'AGI' },
  { id: 'pistola',            label: 'Pistola',               aptitud: 'AGI' },
  { id: 'esquivar_bas',       label: 'Esquivar',              aptitud: 'AGI' },
  { id: 'sigilo',             label: 'Sigilo',                aptitud: 'AGI' },
  { id: 'trepar',             label: 'Trepar',                aptitud: 'AGI' },
  // FUE
  { id: 'armas_cac',          label: 'Armas CaC',             aptitud: 'FUE' },
  { id: 'armas_arrojadizas',  label: 'Armas arrojadizas',     aptitud: 'FUE' },
  { id: 'armas_contundentes', label: 'Armas contundentes',    aptitud: 'FUE' },
  { id: 'combate_sin_armas',  label: 'Combate sin armas',     aptitud: 'FUE' },
  { id: 'lanzar',             label: 'Lanzar',                aptitud: 'FUE' },
  // CON
  { id: 'nadar',              label: 'Nadar',                 aptitud: 'CON' },
  // PER
  { id: 'buscar',             label: 'Buscar',                aptitud: 'PER' },
  { id: 'esconderse',         label: 'Esconderse',            aptitud: 'PER' },
  // EDU
  { id: 'leer_escribir',      label: 'Leer/Escribir idioma nativo', aptitud: 'EDU' },
]

// ── Habilidades generales ──
export const HABILIDADES_GENERALES = [
  // AGI
  { id: 'acrobacia',          label: 'Acrobacia',             aptitud: 'AGI' },
  { id: 'artesania',          label: 'Artesanía',             aptitud: 'AGI' },
  { id: 'baile',              label: 'Baile',                 aptitud: 'AGI' },
  { id: 'deporte',            label: 'Deporte (especificar)', aptitud: 'AGI', porEjemplar: true },
  { id: 'cambiar_blanco',     label: 'Cambiar de blanco',     aptitud: 'AGI' },
  { id: 'desenfundar_rapido', label: 'Desenfundar rápido',    aptitud: 'AGI' },
  { id: 'finta',              label: 'Finta',                 aptitud: 'AGI' },
  { id: 'tiro_doble',         label: 'Tiro doble',            aptitud: 'AGI' },
  { id: 'paracaidismo',       label: 'Paracaidismo',          aptitud: 'AGI' },
  { id: 'saber_caer',         label: 'Saber caer',            aptitud: 'AGI' },
  { id: 'submarinismo',       label: 'Submarinismo',          aptitud: 'AGI' },
  { id: 'tocar_instrumento',  label: 'Tocar instrumento',     aptitud: 'AGI' },
  // FUE (maniobras budo FUE se gestionan en artes marciales)
  // EGO
  { id: 'artes_plasticas',    label: 'Artes plásticas',       aptitud: 'EGO' },
  { id: 'astrologia',         label: 'Astrología',            aptitud: 'EGO' },
  { id: 'cocina',             label: 'Cocina',                aptitud: 'EGO' },
  { id: 'contabilidad',       label: 'Contabilidad',          aptitud: 'EGO' },
  { id: 'criptografia',       label: 'Criptografía',          aptitud: 'EGO' },
  { id: 'demoliciones',       label: 'Demoliciones',          aptitud: 'EGO' },
  { id: 'documentacion',      label: 'Documentación',         aptitud: 'EGO' },
  { id: 'electronica',        label: 'Electrónica',           aptitud: 'EGO' },
  { id: 'espionaje_electronico', label: 'Espionaje electrónico', aptitud: 'EGO' },
  { id: 'fuerzas_ki',         label: 'Fuerzas ki',            aptitud: 'EGO' },
  { id: 'hipnotismo',         label: 'Hipnotismo',            aptitud: 'EGO' },
  { id: 'hombre_mundo',       label: 'Hombre de mundo',       aptitud: 'EGO' },
  { id: 'idiomas',            label: 'Idiomas',               aptitud: 'EGO' },
  { id: 'informatica',        label: 'Informática',           aptitud: 'EGO' },
  { id: 'mecanica_motores',   label: 'Mecánica de motores',   aptitud: 'EGO' },
  { id: 'meditacion',         label: 'Meditación',            aptitud: 'EGO' },
  { id: 'navegacion',         label: 'Navegación',            aptitud: 'EGO' },
  { id: 'numerologia',        label: 'Numerología',           aptitud: 'EGO' },
  { id: 'ocultismo',          label: 'Ocultismo',             aptitud: 'EGO' },
  { id: 'parapsicologia',     label: 'Parapsicología',        aptitud: 'EGO' },
  { id: 'primeros_auxilios',  label: 'Primeros auxilios',     aptitud: 'EGO' },
  { id: 'radiocomunicaciones',label: 'Radiocomunicaciones',   aptitud: 'EGO' },
  { id: 'redaccion',          label: 'Redacción',             aptitud: 'EGO' },
  { id: 'sistemas_seguridad', label: 'Sistemas de seguridad', aptitud: 'EGO' },
  { id: 'supervivencia',      label: 'Supervivencia',         aptitud: 'EGO' },
  { id: 'tasar',              label: 'Tasar',                 aptitud: 'EGO' },
  { id: 'venenos_drogas',     label: 'Venenos y drogas',      aptitud: 'EGO' },
  // CAR
  { id: 'actuar',             label: 'Actuar',                aptitud: 'CAR' },
  { id: 'cabalgar',           label: 'Cabalgar',              aptitud: 'CAR' },
  { id: 'cantar',             label: 'Cantar',                aptitud: 'CAR' },
  { id: 'diplomacia',         label: 'Diplomacia',            aptitud: 'CAR' },
  { id: 'disfrazarse',        label: 'Disfrazarse',           aptitud: 'CAR' },
  { id: 'echar_fortuna',      label: 'Echar la fortuna',      aptitud: 'CAR' },
  { id: 'etiqueta',           label: 'Etiqueta',              aptitud: 'CAR' },
  { id: 'interrogar',         label: 'Interrogar',            aptitud: 'CAR' },
  { id: 'red_contactos',      label: 'Red de contactos',      aptitud: 'CAR' },
  { id: 'retorica',           label: 'Retórica',              aptitud: 'CAR' },
  { id: 'seduccion',          label: 'Seducción',             aptitud: 'CAR' },
  // PER
  { id: 'acechar',            label: 'Acechar',               aptitud: 'PER' },
  { id: 'allanamiento',       label: 'Allanamiento',          aptitud: 'PER' },
  { id: 'combate_nocturno',   label: 'Combate nocturno',      aptitud: 'PER' },
  { id: 'conducir',           label: 'Conducir vehículo',     aptitud: 'PER' },
  { id: 'criminologia',       label: 'Criminología',          aptitud: 'PER' },
  { id: 'falsificacion',      label: 'Falsificación',         aptitud: 'PER' },
  { id: 'fotografia',         label: 'Fotografía',            aptitud: 'PER' },
  { id: 'juegos_azar',        label: 'Juegos de azar',        aptitud: 'PER' },
  { id: 'pilotar',            label: 'Pilotar (especificar)', aptitud: 'PER', porEjemplar: true },
  // Ninguna aptitud
  { id: 'combatir_ambas',     label: 'Combatir con ambas manos', aptitud: null },
]

// ── Habilidades académicas (basadas en EDU) ──
export const HABILIDADES_ACADEMICAS = [
  {
    id: 'ciencias_naturales', label: 'Ciencias Naturales', aptitud: 'EDU',
    especialidades: ['Astronomía', 'Biología', 'Electrónica', 'Física', 'Geología', 'Informática', 'Matemáticas', 'Química']
  },
  {
    id: 'ciencias_sociales', label: 'Ciencias Sociales', aptitud: 'EDU',
    especialidades: ['Ciencias políticas', 'Derecho', 'Economía', 'Sociología']
  },
  {
    id: 'humanidades', label: 'Humanidades', aptitud: 'EDU',
    especialidades: ['Antropología', 'Arqueología', 'Bellas Artes', 'Filosofía', 'Historia', 'Lingüística', 'Literatura', 'Psicología', 'Religión']
  },
  {
    id: 'medicina', label: 'Medicina', aptitud: 'EDU',
    especialidades: ['Anatomía', 'Cirugía', 'Fisiología', 'Neurología', 'Patología', 'Psiquiatría', 'Toxicología']
  },
]

// ── Artes marciales ──
export const ARTES_MARCIALES = [
  {
    id: 'jiu_jitsu',
    label: 'Jiu-jitsu',
    descripcion: 'Defensivo. Técnicas contra ataques con o sin armas. Devuelve la fuerza del adversario en su contra.',
    habilidades: [
      { id: 'lanzamiento', label: 'Lanzamiento', aptitud: 'FUE', niveles: { 20: 9,  30: 15, 50: 20, 75: 30 } },
      { id: 'presa',       label: 'Presa',        aptitud: 'FUE', niveles: { 20: 9,  30: 12, 50: 15, 75: 24 } },
      { id: 'bloqueo',     label: 'Bloqueo',      aptitud: 'AGI', niveles: { 20: 9,  30: 15, 50: 18, 75: 24 } },
      { id: 'esquivar',    label: 'Esquivar',     aptitud: 'AGI', niveles: { 20: null,30: 6, 50: 12, 75: 21 } },
      { id: 'caer',        label: 'Caer',         aptitud: 'AGI', niveles: { 20: 9,  30: 12, 50: 20, 75: 24 } },
    ],
    maniobras: ['Amortiguar el golpe', 'Combinar', 'Desarmar', 'Estrangulamiento', 'Evasión', 'Kiai', 'Zafarse'],
  },
  {
    id: 'karate',
    label: 'Kárate',
    descripcion: 'Ofensivo. Énfasis en golpes y patadas. Se emplean bastones y nunchaku.',
    habilidades: [
      { id: 'golpe',    label: 'Golpe',    aptitud: 'FUE', niveles: { 20: 9,  30: 15, 50: 20, 75: 30 } },
      { id: 'patada',   label: 'Patada',   aptitud: 'FUE', niveles: { 20: 9,  30: 12, 50: 18, 75: 24 } },
      { id: 'bloqueo',  label: 'Bloqueo',  aptitud: 'AGI', niveles: { 20: 9,  30: 15, 50: 20, 75: 27 } },
      { id: 'esquivar', label: 'Esquivar', aptitud: 'AGI', niveles: { 20: 9,  30: 12, 50: 15, 75: 21 } },
      { id: 'arma',     label: 'Arma',     aptitud: 'AGI', niveles: { 20: null,30: 6, 50: 15, 75: 18 } },
    ],
    maniobras: ['Ataque relámpago', 'Combinar', 'Desarmar', 'Evasión', 'Kiai', 'Noquear', 'Patada giratoria', 'Patada voladora', 'Salto del tigre', 'Zafarse', 'Zarpa de tigre'],
  },
  {
    id: 'kendo',
    label: 'Kendo',
    descripcion: 'Esgrima japonesa. Manejo de la espada a una y dos manos.',
    habilidades: [
      { id: 'tajo',     label: 'Tajo',     aptitud: 'FUE', niveles: { 20: 12, 30: 15, 50: 20, 75: 30 } },
      { id: 'estocada', label: 'Estocada', aptitud: 'FUE', niveles: { 20: 9,  30: 15, 50: 20, 75: 30 } },
      { id: 'bloqueo',  label: 'Bloqueo',  aptitud: 'AGI', niveles: { 20: 9,  30: 15, 50: 20, 75: 30 } },
      { id: 'esquivar', label: 'Esquivar', aptitud: 'AGI', niveles: { 20: 6,  30: 12, 50: 18, 75: 21 } },
    ],
    maniobras: ['Ataque torbellino', 'Combinar', 'Desarmar', 'Evasión', 'Iaido', 'Kiai', 'Romper el arma', 'Salto del tigre', 'Tajo giratorio', 'Zafarse'],
  },
  {
    id: 'instruccion_comandos',
    label: 'Instrucción de comandos',
    descripcion: 'Versátil. Patadas, golpes, lanzamientos, presas. También puñales y cuchillos.',
    habilidades: [
      { id: 'golpe',        label: 'Golpe',        aptitud: 'FUE', niveles: { 20: 6,    30: 9,  50: 15, 75: 21 } },
      { id: 'patada',       label: 'Patada',       aptitud: 'FUE', niveles: { 20: 6,    30: 9,  50: 15, 75: 18 } },
      { id: 'lanzamiento',  label: 'Lanzamiento',  aptitud: 'FUE', niveles: { 20: 6,    30: 9,  50: 9,  75: 12 } },
      { id: 'presa',        label: 'Presa',        aptitud: 'FUE', niveles: { 20: 6,    30: 9,  50: 9,  75: 12 } },
      { id: 'bloqueo',      label: 'Bloqueo',      aptitud: 'AGI', niveles: { 20: 6,    30: 9,  50: 15, 75: 21 } },
      { id: 'caer',         label: 'Caer',         aptitud: 'AGI', niveles: { 20: 6,    30: 9,  50: 12, 75: 15 } },
      { id: 'arma',         label: 'Arma',         aptitud: 'AGI', niveles: { 20: null, 30: 6,  50: 15, 75: 21 } },
    ],
    maniobras: ['Amortiguar el golpe', 'Ataque relámpago', 'Combinar', 'Desarmar', 'Estrangulamiento', 'Evasión', 'Gancho', 'Kiai', 'Noquear', 'Patada giratoria', 'Patada voladora', 'Salto del tigre', 'Zafarse', 'Zarpa de tigre'],
  },
]

// Artes marciales adicionales generadas por IA — la IA puede inventar nuevas
// siguiendo la misma estructura: nombre, descripción, habilidades con aptitud y niveles, maniobras budo compatibles

// ── Habilidades preternaturales (maestros y grandes maestros) ──
export const HABILIDADES_PRETERNATURALES = [
  { id: 'ataque_aire',        label: 'Ataque de aire',           coste: 15, descripcion: 'Golpe o patada que envía onda de aire hasta 10m. Bono al daño normal.' },
  { id: 'coma',               label: 'Coma',                     coste: 10, descripcion: 'Trance profundo. Metabolismo mínimo. Sobrevive un mes sin comida ni agua.' },
  { id: 'dominar_voz',        label: 'Dominar con la voz',       coste: 20, descripcion: 'Timbre especial que hace obedecer. Resistencia: tirada bajo EGO/2.' },
  { id: 'levitacion',         label: 'Levitación',               coste: 15, descripcion: 'Elevarse sobre el suelo. Requiere Meditación ≥ 20. Hasta 2m por ronda.' },
  { id: 'reflejos_rapidos',   label: 'Reflejos rápidos',         coste: 20, descripcion: '+1 acción extra por ronda de combate. +5 a la tirada de iniciativa.' },
  { id: 'regeneracion',       label: 'Regeneración',             coste: 20, descripcion: 'Cura a triple velocidad. Sin infecciones.' },
  { id: 'resistencia_pm',     label: 'Resistencia',              coste: 15, descripcion: 'Nunca pierde Resistencia. Corre/nada/pelea indefinidamente. Solo 4h de sueño.' },
  { id: 'resistir_dolor_pm',  label: 'Resistir el dolor',        coste: 15, descripcion: 'Sin tiradas de CON para evitar desmayo. Idéntico a ventaja homónima.' },
  { id: 'resistir_frio_calor',label: 'Resistir el frío y el calor', coste: 15, descripcion: 'Soporta −30°C a +100°C sin daño. Más allá, solo mitad de pérdidas.' },
  { id: 'resistir_hambre',    label: 'Resistir el hambre y la sed', coste: 15, descripcion: 'Un mes sin comida, dos sin agua sin efecto. Luego mitad de pérdidas.' },
  { id: 'sentidos_superiores',label: 'Sentidos superiores',      coste: 15, descripcion: 'Vista, oído, olfato, tacto y gusto extraordinarios. Detectar veneno en agua.' },
  { id: 'sexto_sentido_pm',   label: 'Sexto sentido',            coste: 15, descripcion: 'Premoniciones acertadas sobre peligros y situaciones propias.' },
]

// ── Bono al daño por nivel de arte marcial ──
export const BONO_DANO_AM = { 20: 1, 30: 3, 50: 5, 75: 10 }

// ── Niveles de arte marcial accesibles por nivel de amenaza ──
export const NIVELES_AM_POR_AMENAZA = {
  'bajo':     [],
  'medio':    [20, 30],
  'alto':     [20, 30],
  'muy alto': [20, 30, 50],
  'único':    [20, 30, 50, 75],
}

// ── Número orientativo de habilidades por nivel ──
export const NUM_HABILIDADES = {
  'bajo':     { min: 4, max: 6 },
  'medio':    { min: 6, max: 8 },
  'alto':     { min: 8, max: 10 },
  'muy alto': { min: 10, max: 12 },
  'único':    { min: 12, max: 15 },
}

// ── Genera el bloque de instrucciones para el prompt ──
export function promptHabilidades(amenaza, perfilCalculado, ponderacion, puntosHabilidadExtra = 0) {
  const pool = POOL_BASE[amenaza] + puntosHabilidadExtra
  const niv = NUM_HABILIDADES[amenaza]
  const nivelesAM = NIVELES_AM_POR_AMENAZA[amenaza]

  // Mostrar artes marciales para cualquier nivel medio+ — la IA decide si el arquetipo es compatible
  const esCombativo = nivelesAM.length > 0

  const listaBasicas = HABILIDADES_BASICAS
    .map(h => `  · ${h.label} [${h.aptitud}] (base 3 gratis)`)
    .join('\n')

  const listaGenerales = HABILIDADES_GENERALES
    .map(h => `  · ${h.label} [${h.aptitud || 'ninguna'}]`)
    .join('\n')

  const listaAcademicas = HABILIDADES_ACADEMICAS
    .map(h => `  · ${h.label} [EDU] — especialidades: ${h.especialidades.join(', ')}`)
    .join('\n')

  // Lista AM con valores del nivel máximo accesible, en orden aleatorio para evitar sesgo
  const nivelesAMOrdenados = [...nivelesAM].sort((a, b) => a - b)
  const nivelMaxAM = nivelesAMOrdenados[nivelesAMOrdenados.length - 1]
  const nombresNivel = { 20: 'Estudiante', 30: 'Instructor', 50: 'Maestro', 75: 'Gran maestro' }

  const listaAMConValores = [...ARTES_MARCIALES]
    .sort(() => Math.random() - 0.5) // orden aleatorio para evitar sesgo hacia la última
    .map(am => {
      const habs = am.habilidades.map(h => {
        const valoresDisponibles = nivelesAMOrdenados
          .map(n => `${nombresNivel[n]}: ${h.niveles[n] ?? '—'}`)
          .join(' / ')
        return `    - ${h.label} [${h.aptitud}]: ${valoresDisponibles}`
      }).join('\n')
      return `  · ${am.label} — ${am.descripcion}\n${habs}`
    }).join('\n\n')

  const preternaturales = HABILIDADES_PRETERNATURALES
    .map(h => `  · ${h.label} (${h.coste} pts) — ${h.descripcion}`)
    .join('\n')

  return `
HABILIDADES (KULT 1ª ED):

Pool de puntos disponible: ${pool} pts (${POOL_BASE[amenaza]} base${puntosHabilidadExtra > 0 ? ` + ${puntosHabilidadExtra} por desequilibrio mental` : ''})
Número de habilidades: entre ${niv.min} y ${niv.max}

NORMA ×3: cualquier habilidad que supere el valor de su aptitud dominante cuesta ×3 por punto adicional.
Las habilidades básicas empiezan con base 3 gratis — solo invierte en ellas si el perfil lo justifica claramente.

DISTRIBUCIÓN:
· 60-70% del pool → bloque principal: habilidades de especialización del arquetipo y perfil, con puntuaciones notables
· 20-30% del pool → bloque ancla narrativa: 2-3 habilidades que revelan rasgos personales, puntuación modesta (8-12 máximo)
· Perfil aleatorio: única excepción donde se permite dispersión amplia
· Evitar el síndrome "experto en todo" — especializar, no colorear

HABILIDADES BÁSICAS (base 3 gratis):
${listaBasicas}

HABILIDADES GENERALES:
${listaGenerales}
Nota: Deporte y Pilotar son una habilidad por especialidad (ej: Deporte — Fútbol, Pilotar — Moto)

HABILIDADES ACADÉMICAS (basadas en EDU, especialización cuesta igual que la primaria, requiere mínimo 5):
${listaAcademicas}

${esCombativo ? `ARTES MARCIALES:
Niveles accesibles para nivel "${amenaza}": ${nivelesAMOrdenados.map(n => `${nombresNivel[n]} (${n} pts)`).join(', ')}
Incluye arte marcial si el perfil y arquetipo lo justifican. Si el arquetipo es claramente incompatible, deja arte_marcial en null.
Restricción maestro/gran maestro: FUE ≥ 20 y AGI ≥ 20
Sentido del cuerpo reduce el coste a la mitad (redondeando arriba)
Bono al daño: Estudiante +1 / Instructor +3 / Maestro +5 / Gran maestro +10

Elige la disciplina más coherente con el arquetipo, nacionalidad y trasfondo. Puedes inventar una nueva siguiendo la misma estructura.
Las habilidades del arte marcial tienen valores FIJOS según el nivel — cópialos exactamente en el JSON:

${listaAMConValores}

Para las maniobras budo, elige entre 2-4 de las compatibles con la disciplina e invierte puntos del pool en ellas. Cada maniobra tiene su aptitud dominante según la tabla. Solo incluye las que tienen puntos invertidos — con su valor numérico. Las que no tienen puntos no aparecen.
${(amenaza === 'muy alto' || amenaza === 'único') ? `\nHABILIDADES PRETERNATURALES (solo maestros y grandes maestros, elige 0-2 coherentes con el arquetipo):
${preternaturales}` : ''}` : ''}

Incluye en el JSON:
"habilidades": [
  {
    "id": "",
    "label": "",
    "aptitud": "AGI/FUE/CON/BEL/EGO/CAR/PER/EDU/null",
    "valor": 0,
    "bloque": "principal/ancla/basica",
    "nota": ""
  }
],
"arte_marcial": {
  "disciplina": "",
  "nivel": 0,
  "nivel_label": "estudiante/instructor/maestro/gran maestro",
  "coste": 0,
  "bono_dano": 0,
  "habilidades": [],
  "maniobras": [],
  "preternaturales": []
},
"pool_total": ${pool},
"pool_gastado": 0
`
}
