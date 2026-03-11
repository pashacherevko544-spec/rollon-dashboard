import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GamePump() {
  const navigate = useNavigate()
  const [bet, setBet] = useState(1)
  const [phase, setPhase] = useState<'bet' | 'playing' | 'done'>('bet')
  const [pumps, setPumps] = useState(0)
  const [popAt, setPopAt] = useState(0)
  const [popped, setPopped] = useState(false)
  const [size, setSize] = useState(80)

  const multiplier = +(1 + pumps * 0.1).toFixed(2)
  const currentWin = +(bet * multiplier).toFixed(2)
  const risk = pumps > 0 ? Math.min(95, Math.round((1 - Math.exp(-pumps / 10)) * 100)) : 5

  function start() {
    const pop = Math.max(1, Math.round(-Math.log(Math.random()) * 8) + 1)
    setPopAt(pop)
    setPumps(0)
    setPopped(false)
    setSize(80)
    setPhase('playing')
  }

  function pump() {
    if (phase !== 'playing') return
    const next = pumps + 1
    if (next >= popAt) {
      setPumps(next)
      setSize(s => Math.min(s + 15, 240))
      setTimeout(() => {
        setPopped(true)
        setPhase('done')
      }, 300)
    } else {
      setPumps(next)
      setSize(s => Math.min(s + 15, 230))
    }
  }

  function cashout() {
    setPhase('done')
    setPopped(false)
  }

  const ballColor = popped ? '#F44336' : pumps > 15 ? '#F44336' : pumps > 8 ? '#FFD700' : '#2F7BED'

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🎈 Pump</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        {/* Balloon */}
        <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          <div style={{
            width: size, height: size, borderRadius: '50%',
            background: popped ? 'transparent' : `radial-gradient(circle at 35% 35%, ${ballColor}cc, ${ballColor})`,
            boxShadow: popped ? 'none' : `0 0 ${pumps * 3}px ${ballColor}88`,
            transition: 'all .2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: popped ? 64 : Math.min(40, 16 + pumps),
          }}>
            {popped ? '💥' : '🎈'}
          </div>
          {!popped && phase === 'playing' && (
            <div style={{ width: 4, height: 40, background: '#7F8C9B', borderRadius: 2 }} />
          )}
        </div>

        {/* Stats */}
        {phase === 'playing' && (
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <div style={{ flex: 1, background: '#1A2C38', borderRadius: 12, padding: 12, textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#7F8C9B' }}>Накачувань</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{pumps}</p>
            </div>
            <div style={{ flex: 1, background: '#1A2C38', borderRadius: 12, padding: 12, textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#7F8C9B' }}>Множник</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#00E676' }}>×{multiplier}</p>
            </div>
            <div style={{ flex: 1, background: '#1A2C38', borderRadius: 12, padding: 12, textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#7F8C9B' }}>Ризик лопнути</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: risk > 60 ? '#F44336' : risk > 30 ? '#FFD700' : '#00E676' }}>{risk}%</p>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div style={{ background: '#1A2C38', borderRadius: 14, padding: 16, textAlign: 'center', width: '100%', border: `1px solid ${popped ? '#F44336' : '#00E676'}` }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: popped ? '#F44336' : '#00E676' }}>
              {popped ? `💥 Лопнув! -$${bet}` : `✅ +$${currentWin}`}
            </p>
          </div>
        )}

        {/* Bet */}
        {phase === 'bet' && (
          <div style={{ background: '#1A2C38', borderRadius: 14, padding: 14, width: '100%' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="number" value={bet} onChange={e => setBet(+e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 16, fontWeight: 700 }} />
              <button onClick={() => setBet(b => +(b/2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
              <button onClick={() => setBet(b => +(b*2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
            </div>
          </div>
        )}

        {phase === 'bet' && (
          <button onClick={start} style={{ width: '100%', padding: 18, borderRadius: 14, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer' }}>
            🎈 Старт · ${bet}
          </button>
        )}

        {phase === 'playing' && (
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <button onClick={pump} style={{ flex: 2, padding: 20, borderRadius: 14, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 22, fontWeight: 900, cursor: 'pointer' }}>
              💨 Накачати
            </button>
            <button onClick={cashout} disabled={pumps === 0} style={{ flex: 1, padding: 20, borderRadius: 14, background: pumps > 0 ? '#00E676' : '#213743', border: 'none', color: pumps > 0 ? '#0F212E' : '#7F8C9B', fontSize: 14, fontWeight: 900, cursor: pumps > 0 ? 'pointer' : 'default', opacity: pumps === 0 ? 0.5 : 1 }}>
              💰 ${currentWin}
            </button>
          </div>
        )}

        {phase === 'done' && (
          <button onClick={() => setPhase('bet')} style={{ width: '100%', padding: 18, borderRadius: 14, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 18, fontWeight: 900, cursor: 'pointer' }}>
            🔄 Нова гра
          </button>
        )}
      </div>
    </div>
  )
}
