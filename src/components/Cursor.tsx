'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const label = labelRef.current
    if (!cursor || !follower || !label) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Mouse move
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power2.out',
      })
    }

    // Follower loop
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08

      gsap.set(follower, {
        x: followerX,
        y: followerY,
      })

      requestAnimationFrame(animateFollower)
    }
    animateFollower()

    // Hover states
    const onEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const cursorLabel = target.dataset.cursor || 'VIEW'

      gsap.to(follower, {
        scale: 2.5,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(cursor, {
        scale: 0,
        duration: 0.3,
      })
      if (label) {
        label.textContent = cursorLabel
        gsap.to(label, { opacity: 1, duration: 0.3 })
      }
    }

    const onLeaveLink = () => {
      gsap.to(follower, {
        scale: 1,
        opacity: 0.6,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      })
      if (label) {
        gsap.to(label, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => { label.textContent = '' }
        })
      }
    }

    // Hide on leave
    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 })
    }
    const onMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Apply to interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Small dot — follows mouse precisely */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#C0957B',
          pointerEvents: 'none',
          zIndex: 99997,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />

      {/* Large follower — trails behind */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(192, 149, 123, 0.5)',
          pointerEvents: 'none',
          zIndex: 99996,
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: '#C0957B',
            opacity: 0,
          }}
        />
      </div>
    </>
  )
}