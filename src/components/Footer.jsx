import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-top">
        <div>
          <div className="footer-logo">Amore Oud</div>
          <p className="footer-tagline">
            Your destination for exquisite Arabic perfumes, luxurious oils, and authentic Middle
            Eastern fragrances.
          </p>
        </div>
        <div>
          <div className="footer-heading">Shop</div>
          <ul className="footer-links">
          <li><Link to="/his">His</Link></li>
          <li><Link to="/hers">Hers</Link></li>
          <li><Link to="/unisex">Unisex</Link></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Info</div>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Follow Us</div>
          <ul className="footer-links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Amore Oud. All rights reserved.</span>
        <span>Terms · Privacy · Cookies</span>
      </div>
    </footer>
  )
}
