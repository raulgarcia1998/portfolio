/*
  Proyectos del portfolio. Añadir un proyecto = añadir un objeto a este array.
  Datos sacados de docs/BRIEF.md. No inventar nada: si falta algo, dejarlo en null.
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
    image: null, // se añade en el paso de la sección de proyectos (AVIF/WebP)
  },
]
