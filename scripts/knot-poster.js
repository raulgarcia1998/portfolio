/*
  Dibuja el nudo en su pose de reposo con la misma configuración que KnotScene.jsx
  (geometría, material, iluminación de estudio, cámara, tone mapping de React Three Fiber)
  y deja la imagen PNG en window.posterDataURL.
*/
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { KNOT, CAMERA, ENV_BLUR } from '../src/components/knotConfig.js'

const SIZE = 2400 // se renderiza grande y luego se reduce: bordes más suaves

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setSize(SIZE, SIZE)
renderer.setClearColor(0x000000, 0)
// Los mismos ajustes de color que aplica React Three Fiber por defecto
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputColorSpace = THREE.SRGBColorSpace
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), ENV_BLUR).texture

const camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, CAMERA.near, CAMERA.far)
camera.position.set(...CAMERA.position)

const [tubular, radial] = KNOT.segments.desktop
const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(KNOT.radius, KNOT.tube, tubular, radial, KNOT.p, KNOT.q),
  new THREE.MeshPhysicalMaterial(KNOT.material),
)
mesh.rotation.set(...KNOT.restRotation)

const group = new THREE.Group()
group.scale.setScalar(KNOT.scale)
group.add(mesh)
scene.add(group)

renderer.render(scene, camera)
window.posterDataURL = renderer.domElement.toDataURL('image/png')
