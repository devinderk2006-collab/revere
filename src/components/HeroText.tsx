'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const ROOM_PHOTOS = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
]

const LETTERS = ['r', 'e', 'v', 'e', 'र', 'े']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgGridRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [photosLoaded, setPhotosLoaded] = useState(false)

  useEffect(() => {
    setPhotosLoaded(true)
  }, [])

  useEffect(() => {
    if (!photosLoaded) return

    const tl = gsap.timeline({ delay: 0.5 })

    // Phase 1 — photos grid fades in
    tl.fromTo(bgGridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    )

    // Phase 2 — dark overlay comes in
    .fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )

    // Phase 3 — letters crash in one by one
    .fromTo('.hero-letter',
      { y: 200, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.06,
      },
      '-=0.3'
    )

    // Phase 4 — metadata appears
    .fromTo(metaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )

    // Phase 5 — scroll hint
    .fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    // Mouse parallax on letter photos
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5)
      const y = (e.clientY / window.innerHeight - 0.5)

      document.querySelectorAll('.letter-photo').forEach((el, i) => {
        const depth = (i % 3 + 1) * 15
        gsap.to(el, {
          x: x * depth,
          y: y * depth,
          duration: 1.5,
          ease: 'power2.out',
        })
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    // Scroll — letters scatter
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=600',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        document.querySelectorAll('.hero-letter').forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1
          gsap.set(el, {
            y: p * (i + 1) * -80 * dir,
            opacity: 1 - p * 1.5,
            scale: 1 - p * 0.3,
          })
        })
        gsap.set(metaRef.current, { opacity: 1 - p * 3 })
      }
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [photosLoaded])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0A0807',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background photo grid */}
      <div
        ref={bgGridRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          opacity: 0,
          zIndex: 0,
        }}
      >
        {ROOM_PHOTOS.map((photo, i) => (
          <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src={photo}
              alt="room"
              fill
              style={{ objectFit: 'cover' }}
              sizes="25vw"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,8,7,0.82)',
          zIndex: 1,
          opacity: 0,
        }}
      />

      {/* Giant masked text */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
          overflow: 'hidden',
          padding: '0 20px',
        }}
      >
        {LETTERS.map((letter, i) => (
          <div
            key={i}
            className="hero-letter"
            style={{
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              lineHeight: '0.85',
            }}
          >
            {/* The letter as a clipping mask */}
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(6rem, 16vw, 14rem)',
                fontWeight: '300',
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(192,149,123,0.3)',
                position: 'relative',
                zIndex: 2,
                userSelect: 'none',
                fontStyle: i === 4 || i === 5 ? 'normal' : 'normal',
              }}
            >
              {letter}
            </div>

            {/* Photo behind letter via mix-blend-mode */}
            <div
              className="letter-photo"
              style={{
                position: 'absolute',
                inset: '-20px',
                zIndex: 1,
              }}
            >
              <Image
                src={ROOM_PHOTOS[i % ROOM_PHOTOS.length]}
                alt=""
                fill
                style={{ objectFit: 'cover', mixBlendMode: 'lighten', opacity: 0.9 }}
                sizes="20vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div
        ref={metaRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '0 48px',
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '1px', background: '#3E1011' }} />
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#5C4E48',
          }}>2026</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            color: '#5C4E48',
            marginBottom: '8px',
          }}>DISCOVER YOUR SPACE</p>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#8B553F',
          }}>interior design inspiration</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#5C4E48',
          }}>INTERIOR DESIGN</span>
          <div style={{ width: '32px', height: '1px', background: '#3E1011' }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
          zIndex: 2,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          color: '#3E1011',
        }}>
          SCROLL TO ENTER
        </div>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, #8B553F, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      {/* Bottom line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, #3E1011, transparent)',
        zIndex: 2,
      }} />

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  )
}