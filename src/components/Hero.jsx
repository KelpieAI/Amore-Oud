import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-bg-img" />
      <div className="hero-content">
        <div className="hero-eyebrow">Arabic Perfumes</div>
        <h1 className="hero-headline">
          Elegance<br />
          <em>in every</em><br />
          scent.
        </h1>
        <p className="hero-sub">Discover Middle Eastern Fragrances That Define You</p>
        <a href="#collections" className="hero-cta">Explore Collection &nbsp;→</a>
      </div>
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
