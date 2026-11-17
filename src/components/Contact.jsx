import { profile } from '../data/profile.js'
import './Contact.css'

// __HAS_CV__ lo define vite.config.js: es true solo si existe public/cv.pdf
const hasCv = __HAS_CV__

export default function Contact() {
  return (
    <section id="contacto" className="contact" aria-labelledby="contacto-title">
      <p className="contact__label mono">03 — Contacto</p>
      <h2 id="contacto-title" className="contact__title">
        ¿Tienes un puesto
        <br />
        para mí?
      </h2>

      <ul className="contact__links">
        <li>
          <a className="contact__link contact__link--primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </li>
        <li>
          <a className="contact__link" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
        <li>
          <a className="contact__link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
        {hasCv && (
          <li>
            <a className="contact__link" href="/cv.pdf" download="CV-Raul-Garcia-Segura.pdf">
              Descargar CV <span className="sr-only">(PDF)</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}
