/*
  Genera la imagen de póster del nudo 3D en /public/knot (AVIF y WebP, 600 y 1200 px).

  Uso:
    1. Arranca `npm run dev` (por defecto en http://localhost:5173)
    2. En otra terminal: `npm run poster`

  Abre scripts/knot-poster.html en Chrome sin ventana, espera a que dibuje el nudo
  y convierte la imagen con sharp. Necesita Google Chrome instalado
  (o indica su ruta con la variable de entorno CHROME_PATH).
*/
import { spawn } from 'node:child_process'
import { mkdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5173'
const CHROME =
  process.env.CHROME_PATH ??
  {
    win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  }[process.platform] ??
  'google-chrome'
const OUT = 'public/knot'
const WIDTHS = [600, 1200]
const PORT = 9335

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const profile = path.join(tmpdir(), 'knot-poster-chrome')

const chrome = spawn(CHROME, [
  '--headless=new',
  '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  'about:blank',
])

try {
  // Conexión con Chrome mediante el protocolo de DevTools
  let page
  for (let i = 0; i < 40 && !page; i++) {
    await sleep(250)
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
      page = targets.find((t) => t.type === 'page')
    } catch {
      // Chrome aún arrancando
    }
  }
  if (!page) throw new Error('No se pudo conectar con Chrome')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve) => (ws.onopen = resolve))
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (pending.has(msg.id)) {
      pending.get(msg.id)(msg.result)
      pending.delete(msg.id)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      pending.set(++id, resolve)
      ws.send(JSON.stringify({ id, method, params }))
    })

  await send('Page.navigate', { url: `${DEV_URL}/scripts/knot-poster.html` })

  let dataURL
  for (let i = 0; i < 60 && !dataURL; i++) {
    await sleep(500)
    const res = await send('Runtime.evaluate', { expression: 'window.posterDataURL', returnByValue: true })
    dataURL = res?.result?.value
  }
  if (!dataURL) throw new Error(`El póster no se generó. ¿Está arrancado "npm run dev" en ${DEV_URL}?`)
  ws.close()

  const png = Buffer.from(dataURL.split(',')[1], 'base64')
  await mkdir(OUT, { recursive: true })
  for (const w of WIDTHS) {
    const img = sharp(png).resize({ width: w })
    await img.clone().avif({ quality: 60 }).toFile(`${OUT}/knot-${w}.avif`)
    await img.clone().webp({ quality: 82 }).toFile(`${OUT}/knot-${w}.webp`)
  }
  console.log(`Póster generado en ${OUT}`)
} finally {
  chrome.kill()
  await sleep(500)
  await rm(profile, { recursive: true, force: true }).catch(() => {})
}
