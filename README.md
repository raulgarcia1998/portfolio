# Portfolio — Raúl García Segura

Portfolio personal de desarrollador web junior.

**Web publicada:** _pendiente de publicar_ <!-- TODO: añadir la URL de Vercel -->

## Stack

- React + Vite (JavaScript)
- CSS puro con custom properties: todos los colores, tamaños y easings están en [`src/styles/tokens.css`](src/styles/tokens.css)
- GSAP + ScrollTrigger + SplitText y Lenis para las animaciones de scroll
- React Three Fiber (three.js) para el nudo 3D del hero
- Despliegue en Vercel

## Decisiones técnicas

- **Rendimiento:** Lighthouse móvil 98 · accesibilidad, buenas prácticas y SEO 100.
  - El 3D y las animaciones van en archivos aparte que se cargan de forma diferida.
  - Al cargar, el hero muestra una imagen del nudo generada con la misma escena 3D ([`npm run poster`](scripts/render-knot-poster.mjs)). El 3D en vivo se descarga en la primera interacción y la sustituye con un fundido. La primera carga es rápida y el 3D solo cuesta a quien interactúa.
  - Imágenes en AVIF/WebP con `srcset` y tamaño explícito ([`npm run images`](scripts/optimize-images.mjs)).
- **Accesibilidad:** HTML semántico, navegable con teclado (con enlace para saltar al contenido) y contraste AA. Con `prefers-reduced-motion` no se cargan ni el scroll suave ni las animaciones, y el nudo se queda quieto.
- **Contenido como datos:** los proyectos están en [`src/data/projects.js`](src/data/projects.js) y los datos personales en [`src/data/profile.js`](src/data/profile.js). Añadir un proyecto es añadir un objeto.
- **Mobile first:** probado a 375 px y a 1440 px.

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # versión de producción en /dist
npm run images   # convierte las capturas de /capturas a AVIF/WebP
npm run poster   # regenera la imagen del nudo (con npm run dev arrancado)
```

## Contacto

- Email: raulgarciasegura1998@gmail.com
- LinkedIn: [raul-garcia-daw](https://www.linkedin.com/in/raul-garcia-daw/)
