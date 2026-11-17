import { lazy, Suspense, useEffect, useState } from 'react'
import './Hero.css'

// three.js va en un archivo aparte que solo se descarga cuando hace falta
const KnotScene = lazy(() => import('./KnotScene.jsx'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

// Espera a que el navegador esté libre para no retrasar la aparición del texto
function whenIdle(callback) {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1500 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(callback, 300)
  return () => window.clearTimeout(id)
}

export default function Hero() {
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    if (!supportsWebGL()) return
    return whenIdle(() => setShowScene(true))
  }, [])

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      {showScene && (
        <Suspense fallback={null}>
          <KnotScene />
        </Suspense>
      )}
      <p className="hero__coords mono">
        37.67° N, 1.70° W
        <br />
        Lorca, Murcia
      </p>
      <h1 id="hero-title" className="hero__title">
        Raúl García <span className="hero__title-soft">Segura</span>
      </h1>
      <div className="hero__aside">
        <p className="hero__avail mono">Disponible · remoto</p>
        <p className="hero__lead">
          Desarrollador web junior. Interfaces con React y JavaScript, cuidadas en cada pantalla.
        </p>
      </div>
    </section>
  )
}
