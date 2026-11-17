import './Hero.css'

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      {/* Aquí irá el nudo 3D (paso posterior), detrás del texto */}
      <p className="hero__coords mono">
        37.67° N, 1.70° W
        <br />
        Lorca, Murcia
      </p>
      <h1 id="hero-title" className="hero__title">
        Raúl García <span className="hero__title-soft">Segura</span>
      </h1>
      <div className="hero__aside">
        <p className="hero__avail mono">Disponible · remoto</p>
        <p className="hero__lead">
          Desarrollador web junior. Interfaces con React y JavaScript, cuidadas en cada pantalla.
        </p>
      </div>
    </section>
  )
}
