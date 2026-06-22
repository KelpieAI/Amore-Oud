import { useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const cursorRing = document.getElementById('cursor-ring')
    if (!cursor || !cursorRing) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = `${mx}px`
      cursor.style.top = `${my}px`
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      cursorRing.style.left = `${rx}px`
      cursorRing.style.top = `${ry}px`
      rafId = requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animRing)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
