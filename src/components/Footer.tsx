'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      }
    )

    gsap.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      }
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        width: '100%',
        background: '#0A0807',
        padding: '80px 48px 48px',
        opacity: 0,
      }}
    >
      {/* Top line */}
      <div
        ref={lineRef}
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, #3E1011, #8B553F, transparent)',
          marginBottom: '64px',
          transform: 'scaleX(0)',
        }}
      />

      {/* Main footer content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '48px',
        marginBottom: '80px',
      }}>

        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '2.5rem',
            fontWeight: '300',
            letterSpacing: '0.1em',
            color: '#C0957B',
            marginBottom: '16px',
          }}>
            reveरे
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.75rem',
            lineHeight: '1.8',
            color: '#5C4E48',
            maxWidth: '240px',
          }}>
            A space to daydream. An inspiration platform for those who believe every room has a story waiting to be told.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: '#3E1011',
            marginBottom: '24px',
          }}>EXPLORE</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Japandi', 'Minimalist', 'Boho', 'Industrial', 'Maximalist'].map(style => (
              <p
                key={style}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  fontWeight: '300',
                  color: '#5C4E48',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C0957B'}
                onMouseLeave={e => e.currentTarget.style.color = '#5C4E48'}
              >
                {style}
              </p>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: '#3E1011',
            marginBottom: '24px',
          }}>ABOUT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Our Story', 'Design Philosophy', 'For Designers', 'Contact'].map(item => (
              <p
                key={item}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  fontWeight: '300',
                  color: '#5C4E48',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C0957B'}
                onMouseLeave={e => e.currentTarget.style.color = '#5C4E48'}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '32px',
        borderTop: '1px solid rgba(62,16,17,0.3)',
      }}>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#3E1011',
        }}>
          © 2026 reveरे. ALL RIGHTS RESERVED.
        </p>

        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          color: '#3E1011',
        }}>
          daydream in every room
        </p>

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#3E1011',
        }}>
          INDIA
        </p>
      </div>
    </footer>
  )
}