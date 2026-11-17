/*
  Animaciones de scroll (GSAP + ScrollTrigger + SplitText) y scroll suave (Lenis).
  Este archivo se carga de forma diferida desde ScrollMotion.jsx y nunca con prefers-reduced-motion.

  Cada animación tiene un motivo:
  1. Lenis: scroll con inercia y enlaces del menú que se desplazan en vez de saltar
  2. [data-reveal="lines"]: los titulares suben línea a línea para guiar la lectura
  3. Hero: el nombre se retira al bajar, dando el relevo a los proyectos
  4. Capturas de proyecto: entran deslizándose, como una ventana que se abre
*/
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Mismos valores que --ease-out y las duraciones de tokens.css
const EASE = 'expo.out'
const REVEAL = { duration: 1.1, stagger: 0.08, start: 'top 85%' }

function initSmoothScroll() {
  const lenis = new Lenis({ anchors: true, autoRaf: false })
  // Un solo reloj para todo: GSAP mueve Lenis y Lenis avisa a ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}

function revealLines() {
  const splits = gsap.utils.toArray('[data-reveal="lines"]').map((el) =>
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines', // cada línea dentro de una "ventana" que la recorta
      autoSplit: true, // vuelve a partir si cambia el ancho o cargan las fuentes
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: REVEAL.duration,
          stagger: REVEAL.stagger,
          ease: EASE,
          scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
        }),
    }),
  )
  return () => splits.forEach((split) => split.revert())
}

function heroHandOff() {
  gsap.to('.hero__title, .hero__aside, .hero__coords', {
    yPercent: -30,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
}

function projectShots() {
  gsap.utils.toArray('.project').forEach((card) => {
    gsap.from(card.querySelector('.project__shot picture'), {
      xPercent: 12,
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'center center', scrub: true },
    })
  })
}

export function initMotion() {
  const destroyLenis = initSmoothScroll()
  let revertSplits = () => {}

  // gsap.context agrupa todas las animaciones para poder deshacerlas de golpe
  const ctx = gsap.context(() => {
    revertSplits = revealLines()
    heroHandOff()
    projectShots()
  })

  return () => {
    ctx.revert()
    revertSplits()
    destroyLenis()
  }
}
