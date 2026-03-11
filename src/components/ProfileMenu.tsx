import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useLang } from '../hooks/useLang'
import { useState } from 'react'
import VIPModal from './VIPModal'

export default function ProfileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const { user } = useUser()
  const { t } = useLang()
  const [vipOpen, setVipOpen] = useState(false)

  const MENU_ITEMS = [
    { icon: '💰', label: t('sidebar_deposit'), path: '/deposit' },
    { icon: '🔒', label: t('profile_settings'), path: null },
    { icon: '⭐', label: 'VIP', path: '__vip__' },
    { icon: '📊', label: t('profile_stats'), path: '/statistics' },
    { icon: '📋', label: t('profile_transactions'), path: '/transactions' },
    { icon: '🎲', label: t('profile_my_bets'), path: '/bets' },
    { icon: '⚙️', label: t('profile_settings'), path: '/profile' },
    { icon: '🎧', label: t('profile_support'), path: '/support' },
  ]

  if (!open) return null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{
        position: 'fixed', top: 56, right: 8, zIndex: 201,
        width: 260, background: '#1a2c38',
        borderRadius: 12, border: '1px solid #2d4a5a',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        {/* User info */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #2d4a5a', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4aa, #00b894)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 14, color: '#0f212e',
          }}>
            {(user?.first_name?.[0] || 'U').toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{user?.first_name || t('anonymous')}</div>
            <div style={{ fontSize: 11, color: '#8a9bb0' }}>@{user?.username || 'anonymous'}</div>
          </div>
        </div>

        {/* Menu items */}
        <div style={{ padding: '6px 0' }}>
          {MENU_ITEMS.map((item, i) => (
            <button key={i} onClick={() => {
              onClose()
              if (item.path === '__vip__') { setVipOpen(true); return }
              if (item.path) navigate(item.path)
            }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', background: 'none', border: 'none',
              color: '#c4cdd6', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '6px 0', borderTop: '1px solid #2d4a5a' }}>
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px', background: 'none', border: 'none',
            color: '#ed4163', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: 16 }}>🚪</span>
            {t('btn_cancel')}
          </button>
        </div>
      </div>

      <VIPModal open={vipOpen} onClose={() => setVipOpen(false)} />
    </>
  )
}
