import { projects, projectInProgress } from '../data/projects.js'
import SectionHead from './SectionHead.jsx'
import ProjectCard from './ProjectCard.jsx'
import './Projects.css'

export default function Projects() {
  const nextNumber = String(projects.length + 1).padStart(2, '0')

  return (
    <section id="trabajo" className="projects" aria-labelledby="trabajo-title">
      <SectionHead label="01 — Trabajo" title="Proyectos publicados y en producción." titleId="trabajo-title" />

      <div className="projects__list">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {projectInProgress && (
          <p className="projects__soon mono">
            <span>Proyecto {nextNumber}</span>
            <span>En desarrollo</span>
          </p>
        )}
      </div>
    </section>
  )
}
