// Ejecuta `callback` cuando el navegador esté libre, para no retrasar la primera pintura.
// Devuelve una función que cancela la espera.
export function whenIdle(callback, timeout = 1500) {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(callback, 300)
  return () => window.clearTimeout(id)
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
