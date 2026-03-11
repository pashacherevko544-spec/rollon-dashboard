import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import ChatDrawer from './ChatDrawer'
import { useLang } from '../hooks/useLang'

const ACTIVE = '#00d4aa'
const INACTIVE = '#557086'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isDesktop
}

interface Props { children: React.ReactNode }

export default function Layout({ children }: Props) {
  const loc = useLocation()
  const nav = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const { t } = useLang()

  const NAV = [
    { path: '/', label: t('nav_home'), emoji: '🏠' },
    { path: '/slots', label: t('nav_slots'), emoji: '🎰' },
    { path: '/games', label: t('nav_games'), emoji: '🎮' },
    { path: '/bets', label: t('profile_bets'), emoji: '📊' },
    { path: '/profile', label: t('nav_profile'), emoji: '👤' },
    { path: '__chat__', label: t('nav_chat'), emoji: '💬' },
  ]

  if (isDesktop) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gridTemplateRows: '57px 1fr', minHeight: '100vh', maxWidth: 1400, margin: '0 auto', background: '#0f212e' }}>
        {/* Header placeholder (actual header is fixed) */}
        <div style={{ gridColumn: '1 / -1', gridRow: 1 }}>
          <Header />
        </div>

        {/* Desktop Sidebar */}
        <aside style={{
          gridColumn: 1, gridRow: 2,
          background: '#0a1a24',
          borderRight: '1px solid #1a2c38',
          position: 'sticky', top: 57,
          height: 'calc(100vh - 57px)',
          overflowY: 'auto',
          padding: '12px 0',
        }}>
          {NAV.map(item => {
            const isChat = item.path === '__chat__'
            const active = isChat ? chatOpen : loc.pathname === item.path
            return (
              <button key={item.path}
                onClick={() => isChat ? setChatOpen(o => !o) : nav(item.path)}
                style={{
                  width: '100%', border: 'none',
                  background: active ? 'rgba(0,212,170,0.08)' : 'none',
                  borderLeft: `3px solid ${active ? ACTIVE : 'transparent'}`,
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 20px', cursor: 'pointer',
                  color: active ? '#fff' : INACTIVE,
                  fontSize: 14, fontWeight: active ? 700 : 500,
                  transition: 'all 0.15s',
                }}>
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                {item.label}
              </button>
            )
          })}

          {/* Providers block */}
          <div style={{ marginTop: 24, padding: '0 16px' }}>
            <p style={{ fontSize: 11, color: '#557086', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{t('home_providers')}</p>
            {[
              { name: 'BGaming', color: '#00E676' },
              { name: 'Novomatic', color: '#FF6D00' },
              { name: 'Platipus', color: '#AB47BC' },
              { name: 'Gamzix', color: '#00BCD4' },
              { name: 'Aviatrix', color: '#00E5FF' },
            ].map(p => (
              <button key={p.name} onClick={() => nav('/slots')} style={{
                width: '100%', background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 4px', cursor: 'pointer',
                color: INACTIVE, fontSize: 13, fontWeight: 500,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                {p.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main style={{ gridColumn: 2, gridRow: 2, overflowY: 'auto', paddingBottom: 40 }}>
          {children}
        </main>

        <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    )
  }

  // Mobile layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0f212e' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 57, paddingBottom: 70 }}>
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#1a2c38',
        borderTop: '1px solid #2d4a5a',
        display: 'flex',
        zIndex: 40,
        height: 60,
      }}>
        {NAV.slice(0, 5).map(item => {
          const active = loc.pathname === item.path
          return (
            <button key={item.path}
              onClick={() => nav(item.path)}
              style={{
                flex: 1, border: 'none', background: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 3,
                cursor: 'pointer',
                borderTop: active ? `2px solid ${ACTIVE}` : '2px solid transparent',
              }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <span style={{ fontSize: 10, color: active ? ACTIVE : INACTIVE, fontWeight: 600 }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
