import './Nav.css'

const links = [
  { href: '#trabajo', label: 'Trabajo' },
  { href: '#sobre-mi', label: 'Sobre mí' },
]

export default function Nav() {
  return (
    <header className="nav">
      <a className="nav__mark" href="#inicio">
        Raúl García
      </a>
      <nav className="nav__pill" aria-label="Principal">
        {links.map((link) => (
          <a key={link.href} className="nav__link" href={link.href}>
            {link.label}
          </a>
        ))}
        <a className="nav__link nav__link--primary" href="#contacto">
          Contacto
        </a>
      </nav>
    </header>
  )
}
