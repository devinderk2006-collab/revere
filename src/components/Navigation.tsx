'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2.5 }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        padding: scrolled ? '20px 48px' : '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10, 8, 7, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(192, 149, 123, 0.08)' : '1px solid transparent',
        transition: 'all 600ms cubic-bezier(0.76, 0, 0.24, 1)',
        opacity: 0,
      }}
    >
      <span
        ref={logoRef}
        data-cursor="HOME"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: scrolled ? '1.4rem' : '1.8rem',
          fontWeight: '300',
          letterSpacing: '0.15em',
          color: '#C0957B',
          transition: 'all 600ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        onMouseEnter={e => {
          gsap.to(e.currentTarget, {
            textShadow: '0 0 40px rgba(192,149,123,0.4)',
            duration: 0.4
          })
        }}
        onMouseLeave={e => {
          gsap.to(e.currentTarget, {
            textShadow: 'none',
            duration: 0.4
          })
        }}
      >
        reveरे
      </span>

      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
      }}>
        {['EXPLORE', 'STYLES', 'MOODS'].map((item) => (
          <button
            key={item}
            data-cursor="GO"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: '#5C4E48',
              background: 'none',
              border: 'none',
              padding: '4px 0',
              transition: 'color 350ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C0957B' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#5C4E48' }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  )
}