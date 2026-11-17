import { profile } from '../data/profile.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer mono">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Hecho con React y Vite</span>
    </footer>
  )
}
