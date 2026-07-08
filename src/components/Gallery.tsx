'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UnsplashPhoto {
  id: string
  urls: { regular: string; full: string }
  alt_description: string
  user: { name: string }
}

const STYLES = ['All', 'Japandi', 'Minimalist', 'Boho', 'Industrial', 'Maximalist']

export default function Gallery() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStyle, setActiveStyle] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)

  const fetchPhotos = async (style: string) => {
    setLoading(true)
    const query = style === 'All' ? 'interior design room' : `${style} interior design`
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=18&client_id=jNUuzWyXm32-w_9gErFnU3iBskj5vhJ6K5Gotl9ulc8`
      )
      const data = await res.json()
      setPhotos(data.results || [])
    } catch (error) {
      console.error('Error:', error)
      setPhotos([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPhotos('All')
  }, [])

  // Animate rows on scroll
  useEffect(() => {
    if (loading || !sectionRef.current) return

    const rows = sectionRef.current.querySelectorAll('.gallery-row')
    rows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      )
    })
  }, [loading, photos])

  if (loading) {
    return (
      <section style={{
        width: '100%',
        minHeight: '100vh',
        background: '#0A0807',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '1.5rem',
          fontStyle: 'italic',
          color: '#5C4E48',
        }}>
          gathering spaces...
        </p>
      </section>
    )
  }

  const p = photos

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      background: '#0A0807',
      overflow: 'hidden',
    }}>

      {/* ── INTRO STATEMENT ── */}
      <div className="gallery-row" style={{
        padding: '120px 48px 80px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '48px',
        opacity: 0,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            color: '#5C4E48',
            marginBottom: '24px',
          }}>EXPLORE SPACES</p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: '300',
            color: '#F0EBE6',
            letterSpacing: '-0.02em',
            lineHeight: '0.9',
            maxWidth: '600px',
          }}>
            find your<br />
            <span style={{ color: '#C0957B', fontStyle: 'italic' }}>aesthetic</span>
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.8rem',
          lineHeight: '1.8',
          color: '#5C4E48',
          maxWidth: '280px',
          textAlign: 'right',
        }}>
          Every space tells a story.<br />
          Find the one that speaks yours.
        </p>
      </div>

      {/* ── FILTERS ── */}
      <div className="gallery-row" style={{
        padding: '0 48px 80px',
        display: 'flex',
        gap: '32px',
        opacity: 0,
      }}>
        {STYLES.map(style => (
          <button
            key={style}
            onClick={() => { setActiveStyle(style); fetchPhotos(style) }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: activeStyle === style ? '#C0957B' : '#5C4E48',
              background: 'none',
              border: 'none',
              paddingBottom: '6px',
              borderBottom: activeStyle === style ? '1px solid #C0957B' : '1px solid transparent',
              transition: 'all 350ms ease',
            }}
            onMouseEnter={e => { if (activeStyle !== style) e.currentTarget.style.color = '#A89890' }}
            onMouseLeave={e => { if (activeStyle !== style) e.currentTarget.style.color = '#5C4E48' }}
          >
            {style.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── ROW 1 — Full bleed hero photo ── */}
      {p[0] && (
        <div className="gallery-row" style={{ opacity: 0, position: 'relative' }}>
          <div style={{
            width: '100%',
            height: '80vh',
            position: 'relative',
            overflow: 'hidden',
          }}
            onMouseEnter={e => {
              gsap.to(e.currentTarget.querySelector('img'), { scale: 1.04, duration: 1, ease: 'power2.out' })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 1, ease: 'power2.out' })
            }}
          >
            <Image src={p[0].urls.regular} alt={p[0].alt_description || 'space'} fill style={{ objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,8,7,0.7) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '48px',
              left: '48px',
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: '300',
                fontStyle: 'italic',
                color: '#F0EBE6',
                lineHeight: '1',
              }}>
                {p[0].alt_description || 'a beautiful space'}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: '#8B553F',
                marginTop: '12px',
              }}>by {p[0].user.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── ROW 2 — Asymmetric split 60/40 ── */}
      {p[1] && p[2] && (
        <div className="gallery-row" style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '4px',
          opacity: 0,
        }}>
          <PhotoCard photo={p[1]} height="70vh" />
          <PhotoCard photo={p[2]} height="70vh" />
        </div>
      )}

      {/* ── EDITORIAL TEXT BREAK ── */}
      <div className="gallery-row" style={{
        padding: '120px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
        opacity: 0,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: '300',
          color: '#F0EBE6',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        }}>
          spaces that<br />
          <span style={{ color: '#C0957B', fontStyle: 'italic' }}>tell stories</span>
        </h3>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.85rem',
          lineHeight: '2',
          color: '#5C4E48',
        }}>
          Design is never just about aesthetics. It's about how a space makes you feel the moment you walk in. The warmth of light through a window. The weight of silence in a well-composed room.
        </p>
      </div>

      {/* ── ROW 3 — Three photos, different heights ── */}
      {p[3] && p[4] && p[5] && (
        <div className="gallery-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr 1fr',
          gap: '4px',
          opacity: 0,
        }}>
          <PhotoCard photo={p[3]} height="60vh" />
          <PhotoCard photo={p[4]} height="75vh" />
          <PhotoCard photo={p[5]} height="60vh" />
        </div>
      )}

      {/* ── ROW 4 — Offset layout with text ── */}
      {p[6] && p[7] && (
        <div className="gallery-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          padding: '80px 48px',
          alignItems: 'center',
          opacity: 0,
        }}>
          <div style={{ position: 'relative', height: '60vh', overflow: 'hidden', borderRadius: '2px' }}
            onMouseEnter={e => gsap.to(e.currentTarget.querySelector('img'), { scale: 1.04, duration: 1, ease: 'power2.out' })}
            onMouseLeave={e => gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 1, ease: 'power2.out' })}
          >
            <Image src={p[6].urls.regular} alt={p[6].alt_description || 'space'} fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              color: '#5C4E48',
              marginBottom: '24px',
            }}>EDITORIAL PICK</p>
            <h3 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: '300',
              color: '#F0EBE6',
              lineHeight: '1.2',
              marginBottom: '24px',
            }}>
              {p[6].alt_description || 'a curated space'}
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              lineHeight: '1.8',
              color: '#5C4E48',
              marginBottom: '32px',
            }}>
              by {p[6].user.name}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: '#C0957B',
              borderBottom: '1px solid #3E1011',
              paddingBottom: '8px',
              cursor: 'pointer',
            }}>
              EXPLORE THIS STYLE →
            </div>
          </div>
        </div>
      )}

      {/* ── ROW 5 — Four equal photos ── */}
      {p[8] && p[9] && p[10] && p[11] && (
        <div className="gallery-row" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          opacity: 0,
        }}>
          <PhotoCard photo={p[8]} height="50vh" />
          <PhotoCard photo={p[9]} height="50vh" />
          <PhotoCard photo={p[10]} height="50vh" />
          <PhotoCard photo={p[11]} height="50vh" />
        </div>
      )}

      {/* ── FINAL FULL BLEED ── */}
      {p[12] && (
        <div className="gallery-row" style={{ opacity: 0, position: 'relative', marginTop: '4px' }}>
          <div style={{
            width: '100%',
            height: '90vh',
            position: 'relative',
            overflow: 'hidden',
          }}
            onMouseEnter={e => gsap.to(e.currentTarget.querySelector('img'), { scale: 1.04, duration: 1, ease: 'power2.out' })}
            onMouseLeave={e => gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 1, ease: 'power2.out' })}
          >
            <Image src={p[12].urls.regular} alt={p[12].alt_description || 'space'} fill style={{ objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,8,7,0.85) 0%, rgba(10,8,7,0.4) 50%, rgba(10,8,7,0.3) 100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '24px',
            }}>
             <p style={{
  fontFamily: 'var(--font-cormorant)',
  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
  fontWeight: '300',
  fontStyle: 'italic',
  color: '#F0EBE6',
  textAlign: 'center',
  textShadow: '0 2px 40px rgba(0,0,0,0.9)',
}}>
  love this style?
</p>
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
               color: '#F0EBE6',
border: '1px solid rgba(240,235,230,0.4)',
background: 'rgba(10,8,7,0.4)',
backdropFilter: 'blur(10px)',
                padding: '16px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>
                START DESIGNING YOUR ROOM →
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

// Reusable photo card
function PhotoCard({ photo, height }: { photo: UnsplashPhoto; height: string }) {
  return (
    <div
      style={{ position: 'relative', height, overflow: 'hidden' }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('img')
        const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
        const info = e.currentTarget.querySelector('.info') as HTMLElement
        if (img) gsap.to(img, { scale: 1.05, duration: 0.8, ease: 'power2.out' })
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 })
        if (info) gsap.to(info, { y: 0, opacity: 1, duration: 0.5 })
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('img')
        const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
        const info = e.currentTarget.querySelector('.info') as HTMLElement
        if (img) gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' })
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 })
        if (info) gsap.to(info, { y: 10, opacity: 0, duration: 0.4 })
      }}
    >
      <Image
        src={photo.urls.regular}
        alt={photo.alt_description || 'interior'}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="overlay" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,8,7,0.9) 0%, transparent 60%)',
        opacity: 0,
      }} />
      <div className="info" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        opacity: 0,
        transform: 'translateY(10px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: '#F0EBE6',
        }}>
          {photo.alt_description || 'beautiful space'}
        </p>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#8B553F',
          marginTop: '4px',
        }}>
          by {photo.user.name}
        </p>
      </div>
    </div>
  )
}