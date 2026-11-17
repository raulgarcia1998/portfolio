import { profile } from '../data/profile.js'
import './About.css'

export default function About() {
  const { skills, education } = profile

  return (
    <section id="sobre-mi" className="about" aria-labelledby="sobre-mi-title">
      <h2 id="sobre-mi-title" className="about__label mono">
        02 — Sobre mí
      </h2>

      <p className="about__text" data-reveal="lines">
        Perseverante y resolutivo. Busco mi primer puesto para crecer dentro de un equipo. Fuera del código:{' '}
        <span className="about__accent">arte, videojuegos, cine y techno.</span>
      </p>

      <dl className="about__facts">
        <div>
          <dt className="mono">Domino</dt>
          <dd>{skills.strong.join(', ')}</dd>
        </div>
        <div>
          <dt className="mono">Trabajo con</dt>
          <dd>{skills.familiar.join(', ')}</dd>
        </div>
        {education && (
          <div>
            <dt className="mono">Formación</dt>
            <dd>{education.title}</dd>
            <dd className="about__meta mono">
              {education.center} · {education.year}
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}
