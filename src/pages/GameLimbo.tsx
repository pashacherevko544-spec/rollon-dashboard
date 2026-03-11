import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameLimbo() {
  const navigate = useNavigate()
  const [bet, setBet] = useState(1)
  const [target, setTarget] = useState(2.0)
  const [result, setResult] = useState<{ actual: number; won: boolean; payout: number } | null>(null)
  const [spinning, setSpinning] = useState(false)

  const winChance = +(99 / target).toFixed(2)

  async function play() {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 800))
    const r = Math.random()
    const actual = r < 0.01 ? 1.0 : Math.max(1.0, +(0.99 / r).toFixed(2))
    const won = actual >= target
    setResult({ actual, won, payout: won ? +(bet * target).toFixed(2) : 0 })
    setSpinning(false)
  }

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🚀 Limbo</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Main display */}
        <div style={{ background: ')linear-gradient(160deg,#0a001a,#1a0040)', borderRadius: 24, padding: '40px 20px(', textAlign: 'center', border: `1px solid ${result ? (result.won ? '#00E676' : '#F44336') : '#2A3D4D'}`, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          {spinning ? (
            <>
              <div style={{ fontSize: 48 }}>🚀</div>
              <p style={{ fontSize: 24, color: '#7F8C9B', fontWeight: 700 }}>Летимо...</p>
            </>
          ) : result ? (
            <>
              <p style={{ fontSize: 72, fontWeight: 900, color: result.won ? '#00E676' : '#F44336' }}>
                {result.actual.toFixed(2)}×
              </p>
              <p style={{ fontSize: 18, color: result.won ? '#00E676' : '#F44336', fontWeight: 700 }}>
                {result.won ? `✅ Ціль ${target}× досягнута!` : `❌ Ціль ${target}× не досягнута`}
              </p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
                {result.won ? `+$${result.payout.toFixed(2)}` : `-$${bet.toFixed(2)}`}
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: 48 }}>🚀</div>
              <p style={{ fontSize: 18, color: '#7F8C9B' }}>Постав ціль і запускай</p>
            </>
          )}
        </div>

        {/* Target multiplier */}
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1 }}>Ціль (×)</p>
            <p style={{ fontSize: 12, color: '#7F8C9B' }}>Шанс: <b style={{ color: '#00E676' }}>{Math.min(99, winChance).toFixed(2)}%</b></p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" step="0.1" min="1.01" value={target} onChange={e => setTarget(Math.max(1.01, +e.target.value))}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 22, fontWeight: 900, textAlign: 'center' }} />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {[1.5, 2, 3, 5, 10, 100].map(t => (
              <button key={t} onClick={() => setTarget(t)}
                style={{ flex: 1, padding: '7px 0', borderRadius: 8, background: target === t ? '#2F7BED' : '#213743', border: `1px solid ${target === t ? '#2F7BED' : '#2A3D4D'}`, color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                {t}×
              </button>
            ))}
          </div>
        </div>

        {/* Bet */}
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
          <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{'Ставка'} · Виграш: ${+(bet * target).toFixed(2)}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" value={bet} onChange={e => setBet(+e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 16, fontWeight: 700 }} />
            <button onClick={() => setBet(b => +(b/2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
            <button onClick={() => setBet(b => +(b*2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
          </div>
        </div>

        <button onClick={play} disabled={spinning}
          style={{ width: ')100%', padding: 18, borderRadius: 14, background: spinning ? '#213743(' : '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer', opacity: spinning ? 0.7 : 1 }}>
          {spinning ? ')🚀 Летимо...' : `🚀 Запустити · $${bet}`}
        </button>
      </div>
    </div>
  )
}
