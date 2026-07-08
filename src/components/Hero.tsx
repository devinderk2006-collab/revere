'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROOM_PHOTOS = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400',
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(bgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
    )
    .fromTo(svgRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' },
      '-=1.5'
    )
    .fromTo(metaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25
      const y = (e.clientY / window.innerHeight - 0.5) * 25

      document.querySelectorAll('.bg-photo').forEach((el, i) => {
        gsap.to(el, {
          x: x * (i + 1) * 0.4,
          y: y * (i + 1) * 0.4,
          duration: 2,
          ease: 'power2.out',
        })
      })

      gsap.to(svgRef.current, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 2,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=600',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(svgRef.current, {
          y: p * -120,
          opacity: 1 - p * 1.8,
          scale: 1 + p * 0.05,
        })
        gsap.set(metaRef.current, { opacity: 1 - p * 4 })
        gsap.set(scrollHintRef.current, { opacity: 1 - p * 4 })
      }
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

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
      {/* Background photos */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-60px',
          opacity: 0,
          zIndex: 0,
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gridTemplateRows: '1fr 1fr',
          gap: '3px',
        }}
      >
        {ROOM_PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="bg-photo"
            style={{
              overflow: 'hidden',
              gridRow: i === 0 ? '1 / 3' : 'auto',
            }}
          >
            <img
              src={photo}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,8,7,0.88)',
        zIndex: 1,
      }} />

      {/* MASSIVE SVG TEXT */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
      }}>
        <svg
          ref={svgRef}
          viewBox="0 0 1200 280"
          style={{
            width: '100%',
            height: 'auto',
            overflow: 'visible',
            opacity: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="wordClip">
              <text
                x="600"
                y="230"
                textAnchor="middle"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="240"
                fontWeight="300"
                letterSpacing="-4"
              >
                reveरे
              </text>
            </clipPath>
            <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B553F" stopOpacity="0.4" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="#C0957B" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <image
            href={ROOM_PHOTOS[0]}
            x="-100"
            y="-60"
            width="800"
            height="400"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#wordClip)"
          />
          <image
            href={ROOM_PHOTOS[1]}
            x="400"
            y="-60"
            width="900"
            height="400"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#wordClip)"
            opacity="0.85"
          />
          <rect
            x="0" y="0" width="1200" height="280"
            fill="url(#warmGrad)"
            clipPath="url(#wordClip)"
          />
          <text
            x="600"
            y="230"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="240"
            fontWeight="300"
            letterSpacing="-4"
            fill="none"
            stroke="rgba(192,149,123,0.12)"
            strokeWidth="0.8"
          >
            reveरे
          </text>
        </svg>
      </div>

      {/* Metadata */}
      <div
        ref={metaRef}
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          padding: '24px 48px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '1px', background: '#8B553F' }} />
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#8B553F',
          }}>EST. 2026</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            color: '#8B553F',
            marginBottom: '6px',
          }}>DISCOVER YOUR SPACE</p>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#C0957B',
          }}>interior design inspiration</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#8B553F',
          }}>INDIA</span>
          <div style={{ width: '32px', height: '1px', background: '#8B553F' }} />
        </div>
      </div>

      {/* Scroll hint — BRIGHTER NOW */}
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
          zIndex: 3,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          color: '#C0957B',
        }}>
          SCROLL TO ENTER
        </div>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, #C0957B, rgba(192,149,123,0))',
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
        background: 'linear-gradient(to right, transparent, #8B553F, transparent)',
        zIndex: 3,
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