import './Nav.css'

export default function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <li><a href="#">His</a></li>
        <li><a href="#">Hers</a></li>
        <li><a href="#">Unisex</a></li>
      </ul>
      <div className="nav-logo">Amore Oud</div>
      <div className="nav-actions">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#" className="nav-cart">Basket (0)</a>
      </div>
    </nav>
  )
}
