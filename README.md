# KULT — Generador de PNJs

Generador narrativo de Personajes No Jugadores para KULT (primera edición).

## Requisitos

- Node.js 18 o superior
- Una API key de Anthropic

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env

# 3. Editar .env y añadir tu API key de Anthropic
#    VITE_ANTHROPIC_API_KEY=sk-ant-...

# 4. Arrancar en desarrollo
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```
VITE_ANTHROPIC_API_KEY=sk-ant-tu-api-key-aqui
```

## Build para producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  App.jsx              # Componente raíz y lógica de generación
  App.module.css       # Estilos del layout principal
  data.js              # Grupos, subgrupos y subespecializaciones
  index.css            # Variables CSS globales y reset
  main.jsx             # Entry point React
  components/
    InputPanel.jsx     # Panel de parámetros / inputs
    InputPanel.module.css
    OutputPanel.jsx    # Panel de expediente / output
    OutputPanel.module.css
```
