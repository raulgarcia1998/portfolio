/*
  Nudo del hero en dos capas:
  1. Póster: imagen ligera del nudo en reposo (generada con `npm run poster`). Se ve desde el primer momento.
  2. 3D en vivo: three.js (~240 KB) se descarga en la primera interacción (ratón, toque, scroll o teclado)
     y sustituye al póster con un fundido. Como parten de la misma pose y cámara, el cambio no se nota.
  Así la carga inicial es rápida y el 3D solo cuesta a quien interactúa.
  Con prefers-reduced-motion o sin WebGL se queda el póster: mismo aspecto, sin movimiento.
*/
import { lazy, Suspense, useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/whenIdle.js'
import './Knot.css'

const KnotScene = lazy(() => import('./KnotScene.jsx'))

const INTERACTION_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown']

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Knot() {
  const [loadLive, setLoadLive] = useState(false)
  const [liveReady, setLiveReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || !supportsWebGL()) return

    const start = () => {
      setLoadLive(true)
      stop()
    }
    const stop = () => INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, start))

    INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, start, { passive: true }))
    return stop
  }, [])

  return (
    <div className={`knot${liveReady ? ' is-live' : ''}`} aria-hidden="true">
      <picture className="knot__poster">
        <source type="image/avif" srcSet="/knot/knot-600.avif 600w, /knot/knot-1200.avif 1200w" sizes="(min-width: 860px) 70vh, 50vh" />
        <source type="image/webp" srcSet="/knot/knot-600.webp 600w, /knot/knot-1200.webp 1200w" sizes="(min-width: 860px) 70vh, 50vh" />
        <img src="/knot/knot-600.webp" width="1200" height="1200" alt="" fetchPriority="high" decoding="async" />
      </picture>

      {loadLive && (
        <Suspense fallback={null}>
          <KnotScene onReady={() => setLiveReady(true)} />
        </Suspense>
      )}
    </div>
  )
}
