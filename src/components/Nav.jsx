import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="/his">His</Link></li>
        <li><Link to="/hers">Hers</Link></li>
        <li><Link to="/unisex">Unisex</Link></li>
      </ul>
      <Link to="/" className="nav-logo">Amore Oud</Link>
      <div className="nav-actions">
        <a href="#story">About</a>
        <a href="#contact">Contact</a>
        <a href="#" className="nav-cart">Basket (0)</a>
      </div>
    </nav>
  )
}
