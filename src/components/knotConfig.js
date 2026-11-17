/*
  Configuración del nudo 3D, compartida por:
  - KnotScene.jsx (el 3D en vivo)
  - scripts/knot-poster.js (genera la imagen de póster que se ve antes de cargar el 3D)
  Si cambias algo aquí, regenera el póster con `npm run poster` (con `npm run dev` arrancado).
*/
export const KNOT = {
  radius: 1.25,
  tube: 0.38,
  p: 2,
  q: 3,
  segments: { desktop: [360, 64], mobile: [200, 40] }, // [tubulares, radiales]: menos en móvil
  material: {
    color: '#1b1f1c',
    metalness: 0.35,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  },
  scale: 1.1, // centrado en su caja; el tamaño se adapta al alto de la caja
  restRotation: [0.5, 0.6, 0], // pose del póster y punto de partida del 3D
}

export const CAMERA = { fov: 32, position: [0, 0, 9], near: 0.1, far: 100 }

export const ENV_BLUR = 0.04 // difuminado de la iluminación de estudio

export const MOTION = {
  idleSpeed: [0.12, 0.18], // rotación lenta continua en x, y (radianes/segundo)
  scrollTurn: [1.6, 2.4], // giro extra al recorrer el primer alto de pantalla
  mouseTilt: [0.4, 0.6], // inclinación máxima siguiendo al ratón en x, y
  smoothing: 3, // cuanto mayor, más rápido alcanza al ratón
}
