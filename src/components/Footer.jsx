import './Footer.css'

export default function Footer() {
  return (
    <footer>
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
            <li><a href="#">His</a></li>
            <li><a href="#">Hers</a></li>
            <li><a href="#">Unisex</a></li>
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
