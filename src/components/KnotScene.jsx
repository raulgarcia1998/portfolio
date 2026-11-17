/*
  Nudo toroidal 3D del hero (React Three Fiber).
  Se carga de forma diferida desde Hero.jsx: three.js no entra en el JavaScript inicial.
  - Reacciona al ratón y rota con el scroll
  - Con prefers-reduced-motion se queda quieto
  - Deja de dibujar cuando el hero no está en pantalla
*/
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import './KnotScene.css'

// Valores de la maqueta (docs/propuestas/c-estudio-3d.html)
const KNOT = {
  radius: 1.25,
  tube: 0.38,
  p: 2,
  q: 3,
  segments: { desktop: [360, 64], mobile: [200, 40] }, // menos polígonos en móvil
  material: {
    color: '#1b1f1c',
    metalness: 0.35,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  },
  // Escritorio: a la derecha, en el hueco libre. Móvil: centrado en su propio canvas (ver KnotScene.css)
  position: { desktop: [1.9, 0.35, 0], mobile: [0, 0, 0] },
  scale: { desktop: 0.8, mobile: 1.05 },
  restRotation: [0.5, 0.6, 0], // pose inicial (y la única si se reduce el movimiento)
}

const MOTION = {
  idleSpeed: [0.12, 0.18], // rotación lenta continua en x, y (radianes/segundo)
  scrollTurn: [1.6, 2.4], // giro extra al recorrer el primer alto de pantalla
  mouseTilt: [0.4, 0.6], // inclinación máxima siguiendo al ratón en x, y
  smoothing: 3, // cuanto mayor, más rápido alcanza al ratón
}

const BREAKPOINT = 860 // el mismo que en los CSS

// Iluminación de estudio: un entorno neutro que se refleja en el clearcoat
function StudioLight() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const texture = pmrem.fromScene(room, 0.04).texture
    scene.environment = texture
    return () => {
      scene.environment = null
      texture.dispose()
      room.dispose?.()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

function Knot({ reducedMotion }) {
  const group = useRef()
  const mesh = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const width = useThree((state) => state.size.width)
  const layout = width < BREAKPOINT ? 'mobile' : 'desktop'

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / window.innerHeight, 1)
    const [rx, ry] = KNOT.restRotation

    mesh.current.rotation.x = rx + t * MOTION.idleSpeed[0] + scroll * MOTION.scrollTurn[0]
    mesh.current.rotation.y = ry + t * MOTION.idleSpeed[1] + scroll * MOTION.scrollTurn[1]

    // Suavizado independiente de los FPS: el nudo "persigue" al ratón con inercia
    const k = 1 - Math.exp(-delta * MOTION.smoothing)
    group.current.rotation.x += (pointer.current.y * MOTION.mouseTilt[0] - group.current.rotation.x) * k
    group.current.rotation.y += (pointer.current.x * MOTION.mouseTilt[1] - group.current.rotation.y) * k
  })

  const [tubular, radial] = KNOT.segments[layout]

  return (
    <group ref={group} position={KNOT.position[layout]} scale={KNOT.scale[layout]}>
      <mesh ref={mesh} rotation={KNOT.restRotation}>
        <torusKnotGeometry args={[KNOT.radius, KNOT.tube, tubular, radial, KNOT.p, KNOT.q]} />
        <meshPhysicalMaterial {...KNOT.material} />
      </mesh>
    </group>
  )
}

export default function KnotScene() {
  const wrapper = useRef()
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [onScreen, setOnScreen] = useState(true)
  const [ready, setReady] = useState(false)

  // Pausa el bucle de render cuando el hero sale de pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(wrapper.current)
    return () => observer.disconnect()
  }, [])

  // 'demand' = solo dibuja cuando cambia algo (p. ej. al redimensionar): nudo estático
  const frameloop = reducedMotion ? 'demand' : onScreen ? 'always' : 'never'

  return (
    <div ref={wrapper} className={`knot-scene${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.75]}
        camera={{ fov: 32, position: [0, 0, 9], near: 0.1, far: 100 }}
        onCreated={() => setReady(true)}
      >
        <StudioLight />
        <Knot reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
