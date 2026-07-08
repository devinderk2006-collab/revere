'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(192, 149, 123, 0.08) 0%, rgba(62, 16, 17, 0.04) 50%, transparent 70%)',
        transition: 'left 0.15s ease, top 0.15s ease',
      }}
    />
  )
}