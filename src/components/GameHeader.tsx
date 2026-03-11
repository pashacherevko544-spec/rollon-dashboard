import { useNavigate } from 'react-router-dom'
import type { UseGameReturn } from '../hooks/useGame'

interface Props {
  title: string
  rtp?: string
  game: UseGameReturn
}

export default function GameHeader({ title, rtp, game }: Props) {
  const navigate = useNavigate()
  const { isDemoMode, toggleDemo, resetDemoBalance, balance, isLoggedIn } = game

  return (
    <div style={{
      background: '#0a1520',
      borderBottom: '1px solid #1A2C38',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <button onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer', flexShrink: 0 }}>
        ←
      </button>

      <span style={{ fontWeight: 900, fontSize: 16, color: '#fff', flex: 1 }}>{title}</span>

      {rtp && (
        <span style={{ fontSize: 11, color: '#7F8C9B', background: '#213743', padding: '3px 8px', borderRadius: 12, flexShrink: 0 }}>
          RTP {rtp}
        </span>
      )}

      {/* Balance */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#213743', borderRadius: 8, padding: '6px 10px', flexShrink: 0 }}>
        <span style={{ color: isDemoMode ? '#FFD700' : '#17C4BB', fontSize: 12 }}>
          {isDemoMode ? '🎮' : '₮'}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: isDemoMode ? '#FFD700' : '#fff' }}>
          {balance.toFixed(2)}
        </span>
      </div>

      {/* Demo/Real toggle */}
      {isLoggedIn ? (
        <button onClick={toggleDemo}
          style={{
            padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: isDemoMode ? '#FFD70020' : '#2F7BED20',
            color: isDemoMode ? '#FFD700' : '#2F7BED',
            fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>
          {isDemoMode ? '🎮 DEMO' : '💰 REAL'}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <span style={{
            padding: '5px 10px', borderRadius: 8,
            background: '#FFD70020', color: '#FFD700',
            fontSize: 11, fontWeight: 700,
          }}>
            🎮 DEMO
          </span>
          {balance < 10 && (
            <button onClick={resetDemoBalance}
              style={{ padding: '5px 8px', borderRadius: 8, border: 'none', background: '#00E67620', color: '#00E676', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
              +$1000
            </button>
          )}
        </div>
      )}
    </div>
  )
}
