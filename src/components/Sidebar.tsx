import { useNavigate } from 'react-router-dom'
import { useLang } from '../hooks/useLang'

export const VIP_LEVELS = [
  { name: 'Бронза',   min: 0,      max: 500,    icon: '🥉', color: '#CD7F32', bg: 'linear-gradient(135deg,#3d2010,#5c3010)' },
  { name: 'Срібло',  min: 500,    max: 2500,   icon: '🥈', color: '#C0C0C0', bg: 'linear-gradient(135deg,#1e1e2e,#2e2e4e)' },
  { name: 'Золото',   min: 2500,   max: 10000,  icon: '🥇', color: '#FFD700', bg: 'linear-gradient(135deg,#2d1f00,#4d3800)' },
  { name: 'Платина',  min: 10000,  max: 50000,  icon: '💎', color: '#17C4BB', bg: 'linear-gradient(135deg,#001f20,#003535)' },
  { name: 'Діамант',  min: 50000,  max: Infinity,icon: '💠', color: '#2F7BED', bg: 'linear-gradient(135deg,#001040,#002070)' },
]

export function getVipLevel(totalWagered: number) {
  return VIP_LEVELS.findLast(l => totalWagered >= l.min) || VIP_LEVELS[0]
}

export function VipBadge({ wagered, size = 'sm' }: { wagered: number; size?: 'sm' | 'lg' }) {
  const { t } = useLang()
  const lvl = getVipLevel(wagered)
  const next = VIP_LEVELS[VIP_LEVELS.indexOf(lvl) + 1]
  const progress = next ? Math.min(100, ((wagered - lvl.min) / (next.min - lvl.min)) * 100) : 100

  if (size === 'lg') return (
    <div style={{ background: lvl.bg, borderRadius: 14, padding: '14px 16px', border: `1px solid ${lvl.color}30` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{lvl.icon}</span>
        <div>
          <p style={{ fontSize: 16, fontWeight: 900, color: lvl.color }}>{lvl.name}</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>
            {t('wagered_label')}: ${wagered.toLocaleString()}
          </p>
        </div>
        {next && <p style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,.35)' }}>→ {next.name}</p>}
      </div>
      {next && <>
        <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${lvl.color}, ${lvl.color}cc)`, borderRadius: 4, transition: 'width .5s ease', boxShadow: `0 0 8px ${lvl.color}40` }}/>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 5, textAlign: 'right' }}>
          ${(next.min - wagered).toLocaleString()} до {next.name}
        </p>
      </>}
    </div>
  )

  return (
    <span style={{ background: `${lvl.color}15`, border: `1px solid ${lvl.color}40`, borderRadius: 8, padding: '3px 10px', fontSize: 11, color: lvl.color, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {lvl.icon} {lvl.name}
    </span>
  )
}

interface SidebarProps {
  open: boolean
  onClose: () => void
  wagered?: number
  username?: string
  balance?: number
}

export default function Sidebar({ open, onClose, wagered = 0, username, balance = 0 }: SidebarProps) {
  const navigate = useNavigate()
  const { t } = useLang()
  const lvl = getVipLevel(wagered)
  const displayName = username || t('anonymous')

  const MENU_ITEMS = [
    { icon: '🏠', label: t('nav_home'),        path: '/' },
    { icon: '🎮', label: t('nav_games'),       path: '/games' },
    { icon: '🎰', label: t('nav_slots'),       path: '/slots' },
    { icon: '📊', label: t('profile_my_bets'), path: '/bets' },
    { icon: '💳', label: t('sidebar_deposit'), path: '/deposit' },
    { icon: '💸', label: t('sidebar_withdraw'),path: '/withdraw' },
    { icon: '👤', label: t('nav_profile'),     path: '/profile' },
  ]

  function go(path: string) { navigate(path); onClose() }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.65)',
        backdropFilter: open ? 'blur(4px)' : 'none',
        WebkitBackdropFilter: open ? 'blur(4px)' : 'none',
        zIndex: 100, opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .3s ease',
      }}/>

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
        background: 'linear-gradient(180deg, #0F212E 0%, #0a1a24 100%)',
        zIndex: 101,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '8px 0 40px rgba(0,0,0,.6)' : 'none',
        borderRight: '1px solid rgba(47, 123, 237, 0.06)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(26, 44, 56, 0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span onClick={() => go('/')} style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -0.5, cursor: 'pointer' }}>
              R<span style={{ color: '#2F7BED' }}>◆</span>LLON
            </span>
            <button onClick={onClose} style={{ background: 'rgba(33, 55, 67, 0.5)', border: 'none', color: '#7F8C9B', fontSize: 16, cursor: 'pointer', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>

          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${lvl.color}`, overflow: 'hidden', background: '#0f212e', flexShrink: 0 }}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}&backgroundColor=0f212e`}
                alt="avatar"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{displayName}</p>
              <VipBadge wagered={wagered} />
            </div>
          </div>

          {/* Balance */}
          <div style={{ background: 'rgba(26, 44, 56, 0.6)', borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(23, 196, 187, 0.1)' }}>
            <div>
              <p style={{ fontSize: 9, color: '#556B7C', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>{t('balance')}</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#17C4BB', fontVariantNumeric: 'tabular-nums' }}>${balance.toFixed(2)}</p>
            </div>
            <button onClick={() => go('/deposit')} style={{
              background: 'linear-gradient(135deg, #2F7BED, #1a5fd4)', border: 'none', borderRadius: 10,
              padding: '9px 16px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(47, 123, 237, 0.3)',
            }}>
              + {t('sidebar_deposit')}
            </button>
          </div>
        </div>

        {/* VIP Progress */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(26, 44, 56, 0.8)' }}>
          <VipBadge wagered={wagered} size="lg" />
        </div>

        {/* Menu items */}
        <nav style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
          {MENU_ITEMS.map(item => (
            <button key={item.path} onClick={() => go(item.path)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 12px', borderRadius: 12, border: 'none',
                background: 'none', color: '#B1BAD3', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, textAlign: 'left',
                transition: 'background .2s, color .2s, transform .1s',
              }}
              onTouchStart={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(26, 44, 56, 0.6)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
              onTouchEnd={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = '#B1BAD3' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(26, 44, 56, 0.6)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = '#B1BAD3' }}>
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>


      </div>
    </>
  )
}
