import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useLang } from '../hooks/useLang'
import WalletModal from './WalletModal'
import ProfileMenu from './ProfileMenu'
import Sidebar from './Sidebar'

export default function Header() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { t } = useLang()
  const [walletOpen, setWalletOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const balance = user?.balance ?? 0

  return (
    <>
      <header style={{
        background: '#1a2c38',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid #2d4a5a',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
        {/* Hamburger */}
        <button onClick={() => setSidebarOpen(true)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 4, display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 20, height: 2, background: '#8a9bb0', borderRadius: 2 }} />
          ))}
        </button>

        {/* Logo — клік → головна */}
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center', cursor: 'pointer' }}>
          <span style={{
            fontWeight: 900, fontSize: 20, color: '#fff',
            letterSpacing: 2, textTransform: 'uppercase',
          }}>
            R<span style={{ color: '#2F7BED' }}>◆</span>LLON
          </span>
        </div>

        {/* Balance pill */}
        <div style={{
          background: '#0f212e', borderRadius: 8,
          padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 12, color: '#00d4aa', fontWeight: 700 }}>₮</span>
          <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>
            {balance.toFixed(2)}
          </span>
        </div>

        {/* Top up button */}
        <button onClick={() => setWalletOpen(true)} style={{
          background: '#00d4aa',
          border: 'none', borderRadius: 8,
          padding: '7px 12px',
          color: '#0f212e', fontWeight: 800, fontSize: 12,
          cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          + {t('btn_deposit')}
        </button>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setProfileOpen(p => !p)} style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '2px solid #2F7BED',
            overflow: 'hidden', cursor: 'pointer', background: '#1a2c38', padding: 0,
          }}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.first_name || 'Player')}&backgroundColor=1a2c38`}
              alt="avatar"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </button>
          {profileOpen && <ProfileMenu onClose={() => setProfileOpen(false)} />}
        </div>
      </header>

      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
