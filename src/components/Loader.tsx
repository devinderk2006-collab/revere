'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const lineRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Progress line
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100))
        }
      },
      '+=0.3'
    )

    // Pause
    .to({}, { duration: 0.5 })

    // Wipe out
    .fromTo(overlayRef.current,
      { scaleY: 1, transformOrigin: 'top center' },
      {
        scaleY: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: onComplete
      }
    )

  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0807',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
      }}
    >
      {/* Logo — shown immediately via CSS, no JS needed */}
      <div
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '2.5rem',
          fontWeight: '300',
          letterSpacing: '0.2em',
          color: '#C0957B',
          animation: 'logoFadeIn 0.8s ease forwards',
        }}
      >
        reveरे
      </div>

      {/* Progress line */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'rgba(192, 149, 123, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #8B553F, #C0957B)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Progress number */}
      <div style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '0.65rem',
        letterSpacing: '0.4em',
        color: '#5C4E48',
      }}>
        {progress}
      </div>

      {/* Wipe overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0A0807',
          transformOrigin: 'top center',
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes logoFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}