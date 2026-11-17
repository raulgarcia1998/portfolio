import { useEffect } from 'react'
import { whenIdle, prefersReducedMotion } from '../utils/whenIdle.js'

// No pinta nada: carga GSAP y Lenis cuando la página ya se ve y el navegador está libre.
// Con prefers-reduced-motion no se descarga nada: scroll nativo y sin animaciones.
export default function ScrollMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let cleanup = () => {}
    let cancelled = false

    const cancelIdle = whenIdle(async () => {
      const { initMotion } = await import('../motion/initMotion.js')
      if (!cancelled) cleanup = initMotion()
    })

    return () => {
      cancelled = true
      cancelIdle()
      cleanup()
    }
  }, [])

  return null
}
