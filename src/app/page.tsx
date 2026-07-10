'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import SmoothScroll from '@/components/SmoothScroll'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Cursor />
      <SmoothScroll />

      {!loaded && (
        <Loader onComplete={() => setLoaded(true)} />
      )}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <Navigation />
        <Hero />
        <Gallery />
        <Footer />
      </div>
    </>
  )
}