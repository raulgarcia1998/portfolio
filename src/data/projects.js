/*
  Proyectos del portfolio. Añadir un proyecto = añadir un objeto a este array.
  Datos sacados de docs/BRIEF.md. No inventar nada: si falta algo, dejarlo en null.

  Imagen: deja la captura original en /capturas, ejecuta `npm run images`
  y copia aquí el ancho y alto que imprime.
*/
export const projects = [
  {
    id: 'muebles-purias',
    name: 'Muebles Purias',
    label: 'Cliente real',
    summary: 'Web para un negocio local de montaje de cocinas y venta de muebles.',
    problem:
      'La web anterior estaba anticuada: no transmitía la profesionalidad del negocio ni enseñaba sus resultados.',
    challenge: 'Un vídeo de fondo a máxima calidad consumiendo el mínimo de datos posible.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    role: 'En solitario',
    liveUrl: 'https://muebles-purias.vercel.app/',
    repoUrl: 'https://github.com/raulgarcia1998/muebles_purias',
    image: {
      name: 'muebles-purias', // archivos en /public/proyectos/muebles-purias-800.avif, etc.
      width: 1899,
      height: 908,
      alt: 'Página de inicio de la web de Muebles Purias: una cocina oscura con el titular «La cocina que ya tienes en la cabeza».',
    },
  },
]

// Muestra el bloque "Proyecto 0X · En desarrollo" al final de la lista. Ponlo a false si no hay ninguno en marcha.
export const projectInProgress = true
