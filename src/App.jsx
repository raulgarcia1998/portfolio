import { projects } from './data/projects.js'

// Página provisional del paso 1: solo comprueba que tokens, fuentes y datos cargan.
// Se sustituye sección a sección en los siguientes pasos.
export default function App() {
  return (
    <main style={{ padding: 'var(--pad)' }}>
      <p className="mono">Base del proyecto · paso 1</p>
      <h1
        style={{
          fontSize: 'var(--text-hero)',
          lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-hero)',
          fontWeight: 600,
        }}
      >
        Raúl García <span style={{ color: 'var(--color-ink-soft)', fontWeight: 400 }}>Segura</span>
      </h1>
      <p className="mono" style={{ color: 'var(--color-accent)', marginTop: 'var(--gap)' }}>
        {projects.length} proyecto cargado desde src/data/projects.js
      </p>
    </main>
  )
}
