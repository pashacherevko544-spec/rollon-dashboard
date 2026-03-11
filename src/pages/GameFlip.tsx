import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameFlip() {
  const navigate = useNavigate()
  const [bet, setBet] = useState(1)
  const [choice, setChoice] = useState<'heads' | 'tails'>('heads')
  const [flipping, setFlipping] = useState(false)
  const [result, setResult] = useState<{ outcome: string; won: boolean; payout: number } | null>(null)
  const [flip, setFlip] = useState(0)

  async function play() {
    if (flipping) return
    setFlipping(true)
    setResult(null)
    setFlip(f => f + 1)
    await new Promise(r => setTimeout(r, 1000))
    const outcome = Math.random() < 0.5 ? 'heads' : 'tails'
    const won = outcome === choice
    setResult({ outcome, won, payout: won ? +(bet * 1.98).toFixed(2) : 0 })
    setFlipping(false)
  }

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🪙 Flip</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Coin */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
          <div style={{
            width: 160, height: 160, borderRadius: '50%',
            background: result
              ? result.outcome === 'heads'
                ? 'radial-gradient(circle,#FFD700,#B8860B)'
                : 'radial-gradient(circle,#C0C0C0,#808080)'
              : 'radial-gradient(circle,#2F7BED,#1a4a9e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 64,
            boxShadow: `0 0 40px ${result ? (result.won ? '#00E67640' : '#F4433640') : '#2F7BED40'}`,
            border: `4px solid ${result ? (result.won ? '#00E676' : '#F44336') : '#2F7BED'}`,
            transition: 'all .5s',
            transform: flipping ? 'rotateY(180deg)' : 'rotateY(0)',
          }}>
            {flipping ? '🌀' : result ? (result.outcome === 'heads' ? '👑' : '⭐') : '🪙'}
          </div>
        </div>

        {result && (
          <div style={{ background: '#1A2C38', borderRadius: 14, padding: 16, textAlign: 'center', border: `1px solid ${result.won ? '#00E676' : '#F44336'}` }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: result.won ? '#00E676' : '#F44336' }}>
              {result.outcome === 'heads' ? '👑 Орел' : '⭐ Решка'} — {result.won ? `+$${result.payout}` : `-$${bet}`}
            </p>
          </div>
        )}

        {/* Choice */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setChoice('heads')}
            style={{ flex: 1, padding: 20, borderRadius: 16, border: `2px solid ${choice === 'heads' ? '#FFD700' : '#2A3D4D'}`, background: choice === 'heads' ? '#FFD70015' : '#1A2C38', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 36 }}>👑</span>
            <span style={{ color: '#fff', fontWeight: 800 }}>Орел</span>
            <span style={{ color: '#7F8C9B', fontSize: 12 }}>×1.98</span>
          </button>
          <button onClick={() => setChoice('tails')}
            style={{ flex: 1, padding: 20, borderRadius: 16, border: `2px solid ${choice === 'tails' ? '#C0C0C0' : '#2A3D4D'}`, background: choice === 'tails' ? '#C0C0C015' : '#1A2C38', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 36 }}>⭐</span>
            <span style={{ color: '#fff', fontWeight: 800 }}>Решка</span>
            <span style={{ color: '#7F8C9B', fontSize: 12 }}>×1.98</span>
          </button>
        </div>

        {/* Bet */}
        <div style={{ background: '#1A2C38', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" value={bet} onChange={e => setBet(+e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 16, fontWeight: 700 }} />
            <button onClick={() => setBet(b => +(b/2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
            <button onClick={() => setBet(b => +(b*2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
          </div>
        </div>

        <button onClick={play} disabled={flipping}
          style={{ width: '100%', padding: 18, borderRadius: 14, background: flipping ? '#213743' : '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer', opacity: flipping ? 0.7 : 1 }}>
          {flipping ? '🌀 Підкидую...' : `🪙 Кинути · $${bet}`}
        </button>
      </div>
    </div>
  )
}
