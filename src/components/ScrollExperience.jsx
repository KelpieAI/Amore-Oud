import { useEffect, useRef } from 'react'
import './ScrollExperience.css'

const products = [
  {
    name: 'OUD NOIR INTENSE',
    sub: '100ML · HIS COLLECTION',
    price: '£45',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80',
    accent: '#C9A84C',
    wash: 'rgba(201,168,76,0.07)',
    ghost: 'ع',
    ghostStroke: '1px rgba(201,168,76,0.06)',
    stripLabel: 'Oud Noir',
  },
  {
    name: 'ROSE DE LUNE',
    sub: '85ML · HERS COLLECTION',
    price: '£42',
    img: 'https://images.unsplash.com/photo-1592945403407-9caf930b0097?w=400&q=80',
    accent: '#c47b6e',
    wash: 'rgba(196,123,110,0.08)',
    ghost: 'ر',
    ghostStroke: '1px rgba(196,123,110,0.07)',
    stripLabel: 'Rose de Lune',
  },
  {
    name: 'AMBER SAFFRON',
    sub: '100ML · UNISEX COLLECTION',
    price: '£48',
    img: 'https://images.unsplash.com/photo-1601295452898-4bf7f6cc6d4e?w=400&q=80',
    accent: '#d4943a',
    wash: 'rgba(212,148,58,0.07)',
    ghost: 'ز',
    ghostStroke: '1px rgba(212,148,58,0.06)',
    stripLabel: 'Amber Saffron',
  },
  {
    name: 'OUD BLANC',
    sub: '100ML · UNISEX COLLECTION',
    price: '£38',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffedba74520?w=400&q=80',
    accent: '#a8b8a0',
    wash: 'rgba(168,184,160,0.06)',
    ghost: 'و',
    ghostStroke: '1px rgba(168,184,160,0.05)',
    stripLabel: 'Oud Blanc',
  },
]

const scatterItems = [
  { name: 'Oud Noir', price: '£45', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=120&q=80', left: '16%', top: '22%' },
  { name: 'Rose de Lune', price: '£42', img: 'https://images.unsplash.com/photo-1592945403407-9caf930b0097?w=120&q=80', left: '50%', top: '15%' },
  { name: 'Amber Saffron', price: '£48', img: 'https://images.unsplash.com/photo-1601295452898-4bf7f6cc6d4e?w=120&q=80', left: '82%', top: '26%' },
  { name: 'Oud Blanc', price: '£38', img: 'https://images.unsplash.com/photo-1588776814546-1ffedba74520?w=120&q=80', left: '20%', top: '72%' },
  { name: 'Musk Royale', price: '£40', img: 'https://images.unsplash.com/photo-1547004980-15af91e42f6d?w=120&q=80', left: '55%', top: '78%' },
  { name: 'Velvet Oud', price: '£44', img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=120&q=80', left: '80%', top: '68%' },
]

const CHARS = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
}

function mapRange(v, a, b, c, d) {
  return c + (d - c) * clamp((v - a) / (b - a), 0, 1)
}

export default function ScrollExperience() {
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const washRef = useRef(null)
  const ghostRef = useRef(null)
  const stageRef = useRef(null)
  const pImgRef = useRef(null)
  const pNameRef = useRef(null)
  const pSubRef = useRef(null)
  const pPriceRef = useRef(null)
  const stripRef = useRef(null)
  const scatterRef = useRef(null)
  const ctaRef = useRef(null)
  const tickerRef = useRef(null)
  const counterRef = useRef(null)
  const dotsRef = useRef([])
  const stripLabelsRef = useRef([])
  const scatterItemRefs = useRef([])

  const currentProductRef = useRef(-1)
  const scrambleTimerRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const bar = barRef.current
    const wash = washRef.current
    const ghost = ghostRef.current
    const stage = stageRef.current
    const pImg = pImgRef.current
    const pName = pNameRef.current
    const pSub = pSubRef.current
    const pPrice = pPriceRef.current
    const strip = stripRef.current
    const scatter = scatterRef.current
    const ctaEl = ctaRef.current
    const ticker = tickerRef.current
    const counter = counterRef.current
    const dots = dotsRef.current
    const stripLabels = stripLabelsRef.current
    const scatterEls = scatterItemRefs.current

    if (!track || !bar || !wash || !ghost || !stage) return

    function scramble(target, text, duration) {
      clearTimeout(scrambleTimerRef.current)
      const steps = 14
      const interval = duration / steps
      let step = 0

      function tick() {
        step++
        const progress = step / steps
        let result = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            result += ' '
            continue
          }
          if (i / text.length < progress) {
            result += text[i]
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        target.textContent = result
        if (step < steps) {
          scrambleTimerRef.current = setTimeout(tick, interval)
        } else {
          target.textContent = text
        }
      }
      tick()
    }

    function setProduct(idx) {
      if (idx === currentProductRef.current) return
      currentProductRef.current = idx
      const p = products[idx]

      pImg.src = p.img
      pImg.alt = p.name
      pImg.style.filter = `drop-shadow(0 0 80px ${p.accent}44)`
      pSub.textContent = p.sub
      pPrice.style.color = p.accent

      scramble(pName, p.name, 380)

      wash.style.background = `radial-gradient(ellipse at center, ${p.wash} 0%, #080608 68%)`
      ghost.textContent = p.ghost
      ghost.style.webkitTextStroke = p.ghostStroke

      dots.forEach((d, i) => d?.classList.toggle('active', i === idx))
      stripLabels.forEach((l, i) => l?.classList.toggle('active', i === idx))

      pPrice.style.opacity = '0'
      pPrice.style.transform = 'translateY(20px)'
      setTimeout(() => {
        pPrice.textContent = p.price
        pPrice.style.transition = 'opacity 0.35s, transform 0.35s'
        pPrice.style.opacity = '1'
        pPrice.style.transform = 'translateY(0)'
      }, 280)
    }

    function resetScatterItems() {
      scatterEls.forEach((el) => {
        if (!el) return
        el.style.opacity = '0'
        el.style.transform = 'translate(-50%,-50%) scale(0.3)'
      })
    }

    function onScroll() {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const prog = clamp(scrolled / total, 0, 1)

      bar.style.width = `${prog * 100}%`

      const productEnd = 0.72
      const scatterEnd = 0.86

      if (prog < productEnd) {
        const sceneWidth = productEnd / products.length
        const sceneIdx = Math.floor(prog / sceneWidth)
        const idx = clamp(sceneIdx, 0, products.length - 1)
        const sceneProg = (prog % sceneWidth) / sceneWidth

        setProduct(idx)

        const midScale = mapRange(sceneProg, 0, 0.15, 0.85, 1)
        const endScale = sceneProg > 0.8 ? mapRange(sceneProg, 0.8, 1, 1, 0.9) : midScale
        const opacity =
          sceneProg < 0.1
            ? mapRange(sceneProg, 0, 0.1, 0, 1)
            : sceneProg > 0.88
              ? mapRange(sceneProg, 0.88, 1, 1, 0)
              : 1

        stage.style.transform = `scale(${endScale})`
        stage.style.opacity = opacity

        strip.style.opacity = '1'
        counter.style.opacity = '1'
        scatter.style.opacity = '0'
        ctaEl.style.opacity = '0'
        ctaEl.style.pointerEvents = 'none'
        ticker.style.opacity = '0'

        resetScatterItems()
      } else if (prog < scatterEnd) {
        const sp = (prog - productEnd) / (scatterEnd - productEnd)

        stage.style.opacity = '0'
        strip.style.opacity = '0'
        counter.style.opacity = '0'
        scatter.style.opacity = '1'
        ctaEl.style.opacity = '0'
        ctaEl.style.pointerEvents = 'none'
        ticker.style.opacity = '0'

        wash.style.background =
          'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, #080608 68%)'
        ghost.textContent = '✦'
        ghost.style.webkitTextStroke = '1px rgba(201,168,76,0.04)'

        scatterEls.forEach((el, i) => {
          if (!el) return
          const delay = i * 0.08
          const local = clamp((sp - delay) / 0.5, 0, 1)
          el.style.opacity = local
          el.style.transform = `translate(-50%,-50%) scale(${0.3 + local * 0.7})`
        })
      } else {
        const sp = (prog - scatterEnd) / (1 - scatterEnd)
        const fadeIn = clamp(sp * 3, 0, 1)
        const tickIn = clamp((sp - 0.3) * 3, 0, 1)

        stage.style.opacity = '0'
        strip.style.opacity = '0'
        counter.style.opacity = '0'
        scatter.style.opacity = '0'
        ctaEl.style.opacity = fadeIn
        ctaEl.style.pointerEvents = fadeIn > 0.5 ? 'auto' : 'none'
        ticker.style.opacity = tickIn

        wash.style.background = '#080608'
        ghost.style.webkitTextStroke = '1px rgba(201,168,76,0.03)'
      }
    }

    const onMouseMove = (e) => {
      const xR = e.clientX / window.innerWidth - 0.5
      const yR = e.clientY / window.innerHeight - 0.5
      ghost.style.transform = `translate(${xR * 28}px, ${yR * 16}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mousemove', onMouseMove)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouseMove)
      clearTimeout(scrambleTimerRef.current)
    }
  }, [])

  return (
    <>
      <div id="progress-bar" ref={barRef} />

      <div className="scroll-track" id="scroll-track" ref={trackRef}>
        <div className="scroll-sticky">
          <div id="colour-wash" ref={washRef} />

          <div id="ghost-bg" ref={ghostRef}>
            ع
          </div>

          <div id="section-counter" ref={counterRef}>
            {products.map((_, i) => (
              <div
                key={i}
                className={`counter-dot${i === 0 ? ' active' : ''}`}
                data-index={i}
                ref={(el) => {
                  dotsRef.current[i] = el
                }}
              />
            ))}
          </div>

          <div id="product-stage">
            <div className="product-inner" id="product-inner" ref={stageRef}>
              <div className="product-img-wrap">
                <img id="product-img" ref={pImgRef} src={products[0].img} alt="" />
              </div>
              <div className="product-name" id="product-name" ref={pNameRef} />
              <div className="product-sub" id="product-sub" ref={pSubRef} />
              <div className="product-price" id="product-price" ref={pPriceRef} />
            </div>
          </div>

          <div id="product-strip" ref={stripRef}>
            {products.map((p, i) => (
              <span
                key={i}
                className={`strip-label${i === 0 ? ' active' : ''}`}
                data-index={i}
                ref={(el) => {
                  stripLabelsRef.current[i] = el
                }}
              >
                {p.stripLabel}
              </span>
            ))}
          </div>

          <div id="scatter-scene" ref={scatterRef}>
            {scatterItems.map((item, i) => (
              <div
                key={item.name}
                className="scatter-item"
                style={{ left: item.left, top: item.top }}
                data-i={i}
                ref={(el) => {
                  scatterItemRefs.current[i] = el
                }}
              >
                <img src={item.img} alt={item.name} />
                <span className="scatter-item-name">{item.name}</span>
                <span className="scatter-item-price">{item.price}</span>
              </div>
            ))}
          </div>

          <div id="cta-scene" ref={ctaRef}>
            <div className="cta-eyebrow">New Collection — In Stock Now</div>
            <h2 className="cta-headline">
              That&apos;s<br />
              the <em>collection.</em>
            </h2>
            <div className="cta-buttons">
              <a href="#" className="btn-primary">
                Shop Now &nbsp;→
              </a>
              <a href="#" className="btn-secondary">
                View All Fragrances
              </a>
            </div>
            <p className="cta-tagline">Free UK Delivery · Premium Arabic Perfumes</p>
          </div>

          <div id="ticker" ref={tickerRef}>
            <span className="ticker-inner">
              &nbsp;&nbsp;✦ &nbsp;ARABIC PERFUMES &nbsp;· &nbsp;FREE UK DELIVERY &nbsp;· &nbsp;HIS
              &nbsp;· &nbsp;HERS &nbsp;· &nbsp;UNISEX &nbsp;· &nbsp;AMORE OUD &nbsp;· &nbsp;LUXURY
              FRAGRANCES &nbsp;· &nbsp;DISCOVER YOUR SCENT &nbsp;· &nbsp;✦ &nbsp;ARABIC PERFUMES
              &nbsp;· &nbsp;FREE UK DELIVERY &nbsp;· &nbsp;HIS &nbsp;· &nbsp;HERS &nbsp;· &nbsp;UNISEX
              &nbsp;· &nbsp;AMORE OUD &nbsp;· &nbsp;LUXURY FRAGRANCES &nbsp;· &nbsp;DISCOVER YOUR
              SCENT &nbsp;·&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
