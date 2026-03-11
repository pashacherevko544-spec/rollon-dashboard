import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'



export default function HeroBanner() {
  const SLIDES = [
    {
      id: 1,
      title: 'Ласкаво просимо до Rollon',
      sub: 'Грай у найкращі слоти від BGaming',
      cta: `🎰 ${'Грати зараз'}`,
      ctaPath: '/slots',
      bg: 'linear-gradient(135deg, #0d2151 0%, #1a3a6e 50%, #0d2151 100%)',
      accent: '#2F7BED',
      emoji: '🎰',
      badge: 'NEW',
      badgeColor: '#2F7BED',
    },
    {
      id: 2,
      title: 'Bonus BGaming',
      sub: '182 слоти · Висока волатильність · Великі виграші',
      cta: '🟢 Відкрити слоти',
      ctaPath: '/slots',
      bg: 'linear-gradient(135deg, #0a2a1a 0%, #0d3d20 50%, #0a2a1a 100%)',
      accent: '#00E676',
      emoji: '💎',
      badge: 'HOT',
      badgeColor: '#00E676',
    },
    {
      id: 3,
      title: 'Mines · Aviator · Plinko',
      sub: 'Власні ігри Rollon — грай без обмежень',
      cta: `⚡ ${'Грати'}`,
      ctaPath: '/games',
      bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1060 50%, #1a0a2e 100%)',
      accent: '#9B59B6',
      emoji: '⚡',
      badge: 'ORIGINAL',
      badgeColor: '#9B59B6',
    },
    {
      id: 4,
      title: 'Live Казино',
      sub: 'Evolution · Рулетка · Баккара · Блекджек',
      cta: '🎥 Дивитись',
      ctaPath: '/games',
      bg: 'linear-gradient(135deg, #2a0a0a 0%, #4a1010 50%, #2a0a0a 100%)',
      accent: '#E74C3C',
      emoji: '🎥',
      badge: 'LIVE',
      badgeColor: '#E74C3C',
    },
  ]
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) setCurrent(c => (c + 1) % SLIDES.length)
      else setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
    }
  }

  const slide = SLIDES[current]

  return (
    <div style={{ padding: '12px 16px 0', userSelect: 'none' }}>
      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !dragging && navigate(slide.ctaPath)}
        style={{
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          height: 148,
          background: slide.bg,
          cursor: 'pointer',
          transition: 'background 0.5s ease',
          border: `1px solid ${slide.accent}25`,
          boxShadow: `0 4px 24px ${slide.accent}15`,
        }}>

        {/* Glow blob */}
        <div style={{
          position: 'absolute', right: -30, top: -30,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 65%)`,
          pointerEvents: 'none',
          transition: 'background 0.5s',
        }} />

        {/* Big emoji */}
        <div style={{
          position: 'absolute', right: 16, bottom: 0,
          fontSize: 80, lineHeight: 1, opacity: 0.85,
          filter: `drop-shadow(0 4px 20px ${slide.accent}60)`,
          transition: 'all 0.3s',
        }}>
          {slide.emoji}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', padding: '18px 16px', zIndex: 2, maxWidth: '65%' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: `${slide.accent}25`,
            border: `1px solid ${slide.accent}50`,
            borderRadius: 6, padding: '2px 8px',
            fontSize: 10, fontWeight: 800, color: slide.accent,
            letterSpacing: 0.8, marginBottom: 8,
          }}>
            {slide.badge}
          </div>

          <p style={{ fontSize: 17, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>
            {slide.title}
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, marginBottom: 14 }}>
            {slide.sub}
          </p>

          {/* CTA button */}
          <button
            onClick={e => { e.stopPropagation(); navigate(slide.ctaPath) }}
            style={{
              background: slide.accent,
              border: 'none', borderRadius: 8,
              padding: '7px 14px',
              fontSize: 12, fontWeight: 700, color: '#fff',
              cursor: 'pointer',
              boxShadow: `0 2px 12px ${slide.accent}40`,
            }}>
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 6,
              height: 6, borderRadius: 3,
              background: i === current ? slide.accent : '#2A3F50',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: i === current ? `0 0 6px ${slide.accent}80` : 'none',
            }} />
        ))}
      </div>
    </div>
  )
}
