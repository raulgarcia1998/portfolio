import './ProjectCard.css'

const IMAGE_WIDTHS = [800, 1600] // los mismos que genera scripts/optimize-images.mjs

function srcSet(name, format, maxWidth) {
  return IMAGE_WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `/proyectos/${name}-${w}.${format} ${w}w`)
    .join(', ')
}

function ExternalLink({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function ProjectCard({ project, index }) {
  const { name, label, summary, problem, challenge, stack, role, liveUrl, repoUrl, image } = project
  const number = String(index + 1).padStart(2, '0')
  const headingId = `proyecto-${project.id}`

  return (
    <article className="project" aria-labelledby={headingId}>
      <div className="project__info">
        <p className="mono">
          Proyecto {number}
          {label && ` · ${label}`}
        </p>
        <h3 id={headingId} className="project__name">
          {name}
        </h3>

        <dl className="project__facts">
          <div>
            <dt className="mono">Qué es</dt>
            <dd>{summary}</dd>
          </div>
          {problem && (
            <div>
              <dt className="mono">El problema</dt>
              <dd>{problem}</dd>
            </div>
          )}
          {challenge && (
            <div>
              <dt className="mono">Lo más difícil</dt>
              <dd>{challenge}</dd>
            </div>
          )}
        </dl>

        <ul className="project__chips" aria-label="Tecnologías y rol">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {role && <li>{role}</li>}
        </ul>

        <div className="project__actions">
          {liveUrl && (
            <ExternalLink href={liveUrl} className="project__btn project__btn--primary">
              Ver web en vivo
            </ExternalLink>
          )}
          {repoUrl && (
            <ExternalLink href={repoUrl} className="project__btn">
              Ver código
            </ExternalLink>
          )}
        </div>
      </div>

      {image && (
        <div className="project__shot">
          <picture>
            <source type="image/avif" srcSet={srcSet(image.name, 'avif', image.width)} sizes="(min-width: 860px) 55vw, 100vw" />
            <source type="image/webp" srcSet={srcSet(image.name, 'webp', image.width)} sizes="(min-width: 860px) 55vw, 100vw" />
            <img
              src={`/proyectos/${image.name}-800.webp`}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      )}
    </article>
  )
}
