import { useEffect, useRef } from 'react'
import './Hero.css'

const PERKS = [
  { icon: '✦', title: 'Premium Quality', sub: '100% Original Fragrances' },
  { icon: '◈', title: 'Long Lasting', sub: 'Intense, All-Day Wear' },
  { icon: '⟶', title: 'Fast Shipping', sub: 'Free UK Delivery' },
  { icon: '◇', title: 'Guaranteed', sub: 'Authenticity Promise' },
]

const CSS_EMBERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${38 + (i * 13) % 58}%`,
  delay: `${i * 0.55}s`,
  dur: `${3.2 + (i % 5) * 0.7}s`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 6) * 4)}px`,
  size: i % 3 === 0 ? '4px' : '3px',
}))

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Smoke {
      constructor() {
        this.r = 0
        this.g = 0
        this.b = 0
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.size = 0
        this.alpha = 0
        this.maxAlpha = 0
        this.growing = true
        this.wobble = 0
        this.wobSpd = 0
        this.reset(true)
      }

      reset(initial) {
        const w = canvas.width
        const h = canvas.height
        this.x = initial
          ? w * 0.35 + Math.random() * w * 0.65
          : w * 0.4 + Math.random() * w * 0.6
        this.y = initial ? h * 0.45 + Math.random() * h * 0.55 : h + 30
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = -(Math.random() * 0.45 + 0.15)
        this.size = Math.random() * 110 + 60
        this.alpha = 0
        this.maxAlpha = Math.random() * 0.05 + 0.015
        this.growing = true
        this.wobble = Math.random() * Math.PI * 2
        this.wobSpd = (Math.random() - 0.5) * 0.01

        if (Math.random() < 0.65) {
          this.r = 195 + Math.floor(Math.random() * 35)
          this.g = 130 + Math.floor(Math.random() * 35)
          this.b = 70 + Math.floor(Math.random() * 25)
        } else {
          this.r = 201 + Math.floor(Math.random() * 20)
          this.g = 168 + Math.floor(Math.random() * 15)
          this.b = 76 + Math.floor(Math.random() * 15)
        }
      }

      update() {
        this.wobble += this.wobSpd
        this.x += this.vx + Math.sin(this.wobble) * 0.25
        this.y += this.vy
        this.size += 0.2
        if (this.growing) {
          this.alpha += 0.0008
          if (this.alpha >= this.maxAlpha) this.growing = false
        } else {
          this.alpha -= 0.0003
        }
        if (this.alpha <= 0 || this.y < -this.size) this.reset(false)
      }

      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        g.addColorStop(0, `rgba(${this.r},${this.g},${this.b},${this.alpha})`)
        g.addColorStop(0.5, `rgba(${this.r},${this.g},${this.b},${this.alpha * 0.35})`)
        g.addColorStop(1, `rgba(${this.r},${this.g},${this.b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Ember {
      constructor() {
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.size = 0
        this.alpha = 0
        this.maxAlpha = 0
        this.growing = true
        this.twinkle = 0
        this.twinkSpd = 0
        this.displayAlpha = 0
        this.reset(true)
      }

      reset(initial) {
        const w = canvas.width
        const h = canvas.height
        this.x = initial
          ? w * 0.25 + Math.random() * w * 0.75
          : w * 0.3 + Math.random() * w * 0.7
        this.y = initial ? h * 0.55 + Math.random() * h * 0.45 : h + 5
        this.vy = -(Math.random() * 0.9 + 0.35)
        this.vx = (Math.random() - 0.5) * 0.45
        this.size = Math.random() * 1.8 + 0.5
        this.alpha = 0
        this.maxAlpha = Math.random() * 0.6 + 0.25
        this.growing = true
        this.twinkle = Math.random() * Math.PI * 2
        this.twinkSpd = Math.random() * 0.08 + 0.03
        this.displayAlpha = 0
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.twinkle += this.twinkSpd
        const twinkFactor = 0.7 + Math.sin(this.twinkle) * 0.3
        if (this.growing) {
          this.alpha += 0.008
          if (this.alpha >= this.maxAlpha) this.growing = false
        } else {
          this.alpha -= 0.004
        }
        this.displayAlpha = this.alpha * twinkFactor
        if (this.alpha <= 0 || this.y < -10) this.reset(false)
      }

      draw() {
        ctx.fillStyle = `rgba(201,168,76,${this.displayAlpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        g.addColorStop(0, `rgba(220,185,90,${this.displayAlpha * 0.45})`)
        g.addColorStop(1, 'rgba(220,185,90,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const smokes = Array.from({ length: 60 }, () => new Smoke())
    const embers = Array.from({ length: 40 }, () => new Ember())

    let rafId = 0
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of smokes) {
        s.update()
        s.draw()
      }
      for (const e of embers) {
        e.update()
        e.draw()
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-base" />
      <canvas ref={canvasRef} id="smoke-canvas" />
      <div className="hero-vign" />

      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-haze-wisp hero-haze-wisp--a" aria-hidden="true" />
      <div className="hero-haze-wisp hero-haze-wisp--b" aria-hidden="true" />

      <div className="hero-embers" aria-hidden="true">
        {CSS_EMBERS.map((e) => (
          <span
            key={e.id}
            className="hero-ember"
            style={{
              '--x': e.x,
              '--delay': e.delay,
              '--dur': e.dur,
              '--drift': e.drift,
              '--size': e.size,
            }}
          />
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-stage">
          <div className="hero-content">
            <div className="hero-eyebrow">Arabic Perfumes</div>

            <h1 className="hero-headline">
              Elegance<br />
              <em>in every</em>
              <br />
              scent.
            </h1>

            <p className="hero-sub">Discover Middle Eastern Fragrances That Define You</p>

            <a href="#collections" className="hero-cta">
              Explore Collection &nbsp;→
            </a>
          </div>

          <div className="hero-product">
            <div className="hero-product-visual" aria-hidden="true">
              <div className="hero-product-glow" />
              <div className="hero-product-shadow" />
              <img
                src="/images/amore-oud-hero.png"
                alt="Le Falcone Risala Forever perfume bottle and box"
                className="hero-product-img"
                width={680}
                height={900}
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="hero-product-info">
              <p className="hero-product-name">Le Falcone Risala Forever</p>
              <p className="hero-product-meta">
                <span className="hero-product-size">100ml</span>
                <span className="hero-product-prices">
                  <span className="hero-product-was">£34.99</span>
                  <span className="hero-product-now">£32.99</span>
                </span>
              </p>
              <p className="hero-product-shipping">Free shipping</p>
            </div>
          </div>
        </div>

        <div className="perks-strip">
          {PERKS.map((p) => (
            <div key={p.title} className="perk">
              <span className="perk-icon">{p.icon}</span>
              <div className="perk-text">
                <span className="perk-title">{p.title}</span>
                <span className="perk-sub">{p.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
