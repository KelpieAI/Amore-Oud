import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { getScrollProducts, getScatterProducts, formatPrice } from '../data/products'
import './ScrollExperience.css'

const scatterPositions = [
  { left: '14%', top: '32%' },
  { left: '50%', top: '30%' },
  { left: '86%', top: '34%' },
  { left: '16%', top: '72%' },
  { left: '50%', top: '76%' },
  { left: '84%', top: '72%' },
]

function toScrollProduct(p) {
  return {
    name: p.displayName,
    sub: p.sub,
    price: formatPrice(p.price),
    img: p.image,
    accent: p.accent,
    wash: p.wash,
    ghost: p.ghost,
    ghostStroke: p.ghostStroke,
    stripLabel: p.stripLabel,
  }
}

const products = getScrollProducts().map(toScrollProduct)

const scatterItems = getScatterProducts().map((p, i) => ({
  name: p.stripLabel,
  price: formatPrice(p.price),
  img: p.image,
  glow: p.scatterGlow || p.accent,
  floatDelay: `${i * 0.55}s`,
  floatDuration: `${3.6 + i * 0.35}s`,
  ...scatterPositions[i],
}))

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
        el.style.transform = 'translate(-50%,-50%) scale(0.55)'
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
          const delay = i * 0.07
          const local = clamp((sp - delay) / 0.65, 0, 1)
          const eased = local * local * (3 - 2 * local)
          el.style.opacity = eased
          el.style.transform = `translate(-50%,-50%) scale(${0.55 + eased * 0.45})`
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
                <img id="product-img" ref={pImgRef} src={products[0]?.img} alt="" />
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
                style={{
                  left: item.left,
                  top: item.top,
                  '--scatter-glow': item.glow,
                  '--float-delay': item.floatDelay,
                  '--float-duration': item.floatDuration,
                }}
                data-i={i}
                ref={(el) => {
                  scatterItemRefs.current[i] = el
                }}
              >
                <div className="scatter-item-inner">
                  <div className="scatter-item-glow" aria-hidden="true" />
                  <div className="scatter-item-img-wrap">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <span className="scatter-item-name">{item.name}</span>
                  <span className="scatter-item-price">{item.price}</span>
                </div>
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
              <Link to="/unisex" className="btn-primary">
                Shop Now &nbsp;→
              </Link>
              <Link to="/his" className="btn-secondary">
                View All Fragrances
              </Link>
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
