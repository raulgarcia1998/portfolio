import './SectionHead.css'

// Cabecera de sección: etiqueta numerada a la izquierda y titular a la derecha
export default function SectionHead({ label, title, titleId }) {
  return (
    <div className="section-head">
      <p className="section-head__label mono">{label}</p>
      <h2 id={titleId} className="section-head__title">
        {title}
      </h2>
    </div>
  )
}
