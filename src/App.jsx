import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
      </main>
    </>
  )
}
