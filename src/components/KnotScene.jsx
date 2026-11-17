/*
  Nudo toroidal 3D en vivo (React Three Fiber). Lo carga Knot.jsx en la primera interacción.
  - Reacciona al ratón y rota con el scroll
  - Deja de dibujar cuando sale de pantalla
  - Avisa con onReady tras pintar el primer fotograma, para el fundido con el póster
*/
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { KNOT, CAMERA, ENV_BLUR, MOTION } from './knotConfig.js'

const BREAKPOINT = 860 // el mismo que en los CSS

// Iluminación de estudio: un entorno neutro que se refleja en el clearcoat
function StudioLight() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const texture = pmrem.fromScene(room, ENV_BLUR).texture
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

function Knot({ onReady }) {
  const group = useRef()
  const mesh = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const startTime = useRef(null) // el giro cuenta desde el primer fotograma: arranca en la pose del póster
  const isMobile = window.innerWidth < BREAKPOINT

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime
      onReady()
    }
    const t = state.clock.elapsedTime - startTime.current
    const scroll = Math.min(window.scrollY / window.innerHeight, 1)
    const [rx, ry] = KNOT.restRotation

    mesh.current.rotation.x = rx + t * MOTION.idleSpeed[0] + scroll * MOTION.scrollTurn[0]
    mesh.current.rotation.y = ry + t * MOTION.idleSpeed[1] + scroll * MOTION.scrollTurn[1]

    // Suavizado independiente de los FPS: el nudo "persigue" al ratón con inercia
    const k = 1 - Math.exp(-delta * MOTION.smoothing)
    group.current.rotation.x += (pointer.current.y * MOTION.mouseTilt[0] - group.current.rotation.x) * k
    group.current.rotation.y += (pointer.current.x * MOTION.mouseTilt[1] - group.current.rotation.y) * k
  })

  const [tubular, radial] = KNOT.segments[isMobile ? 'mobile' : 'desktop']

  return (
    <group ref={group} scale={KNOT.scale}>
      <mesh ref={mesh} rotation={KNOT.restRotation}>
        <torusKnotGeometry args={[KNOT.radius, KNOT.tube, tubular, radial, KNOT.p, KNOT.q]} />
        <meshPhysicalMaterial {...KNOT.material} />
      </mesh>
    </group>
  )
}

export default function KnotScene({ onReady }) {
  const wrapper = useRef()
  const [onScreen, setOnScreen] = useState(true)

  // Pausa el bucle de render cuando el nudo sale de pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(wrapper.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="knot__live">
      <Canvas frameloop={onScreen ? 'always' : 'never'} dpr={[1, 1.75]} camera={CAMERA}>
        <StudioLight />
        <Knot onReady={onReady} />
      </Canvas>
    </div>
  )
}
