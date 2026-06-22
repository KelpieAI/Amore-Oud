import Reveal from './Reveal'
import './BrandStatement.css'

export default function BrandStatement() {
  return (
    <section className="brand-statement" id="story">
      <Reveal className="brand-img">
        <img
          src="/images/brand-oud.png"
          alt="Agarwood chips — the raw oud used in Amore Oud fragrances"
        />
        <div className="brand-img-accent" />
      </Reveal>
      <Reveal className="brand-text">
        <div className="section-eyebrow brand-eyebrow">Our Story</div>
        <p className="brand-quote">
          Beauty is more than
          <br />
          appearance. It&apos;s a <em>feeling.</em>
        </p>
        <p className="brand-body">
          At Amore Oud, we are passionate about bringing the finest Arabic fragrances to the
          world. Every bottle is a journey, from the ancient oud forests of the Middle East to
          your skin. We believe your signature scent should be as unique as you are.
        </p>
        <a href="#" className="hero-cta brand-cta">
          Our Story &nbsp;→
        </a>
        <div className="brand-stats">
          <div>
            <div className="brand-stat-num">100+</div>
            <div className="brand-stat-label">Fragrances</div>
          </div>
          <div>
            <div className="brand-stat-num">3</div>
            <div className="brand-stat-label">Collections</div>
          </div>
          <div>
            <div className="brand-stat-num">★ 5</div>
            <div className="brand-stat-label">Customer Rating</div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
