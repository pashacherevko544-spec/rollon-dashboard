import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PAYOUT: Record<number, Record<number, number>> = {
  1:  { 0:0, 1:3.8 },
  2:  { 0:0, 1:1, 2:10 },
  3:  { 0:0, 1:1, 2:3, 3:50 },
  4:  { 0:0, 1:0, 2:2, 3:10, 4:100 },
  5:  { 0:0, 1:0, 2:1, 3:4, 4:25, 5:500 },
  6:  { 0:0, 1:0, 2:1, 3:3, 4:10, 5:100, 6:1000 },
  7:  { 0:0, 1:0, 2:0.5, 3:2, 4:6, 5:25, 6:200, 7:2500 },
  8:  { 0:0, 1:0, 2:0.5, 3:1, 4:4, 5:15, 6:80, 7:500, 8:5000 },
  9:  { 0:0, 1:0, 2:0, 3:1, 4:3, 5:8, 6:40, 7:200, 8:1500, 9:10000 },
  10: { 0:0, 1:0, 2:0, 3:0.5, 4:2, 5:5, 6:20, 7:100, 8:500, 9:5000, 10:50000 },
}

export default function GameKeno() {
  const navigate = useNavigate()
  const [bet, setBet] = useState(1)
  const [picks, setPicks] = useState<number[]>([])
  const [drawn, setDrawn] = useState<number[]>([])
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ matches: number; mult: number; payout: number } | null>(null)

  const pickCount = picks.length
  const table = PAYOUT[pickCount] || {}

  function togglePick(n: number) {
    if (playing) return
    if (picks.includes(n)) {
      setPicks(p => p.filter(x => x !== n))
    } else if (picks.length < 10) {
      setPicks(p => [...p, n])
    }
  }

  async function play() {
    if (picks.length === 0 || playing) return
    setPlaying(true)
    setDrawn([])
    setResult(null)

    const drawnNums = [...Array(40).keys()].map(i => i + 1)
      .sort(() => Math.random() - 0.5).slice(0, 20)

    // Animate drawing
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 80))
      setDrawn(drawnNums.slice(0, i + 1))
    }

    const matches = picks.filter(p => drawnNums.includes(p)).length
    const mult = table[matches] || 0
    const payout = +(bet * mult).toFixed(2)
    setResult({ matches, mult, payout })
    setPlaying(false)
  }

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🔢 Keno</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#7F8C9B', background: '#213743', padding: '3px 10px', borderRadius: 20 }}>
          Вибрано: {pickCount}/10
        </span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Result */}
        {result && (
          <div style={{ background: '#1A2C38', borderRadius: 14, padding: 14, textAlign: 'center', border: `1px solid ${result.payout > bet ? '#00E676' : '#F44336'}` }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: result.payout > bet ? '#00E676' : '#F44336' }}>
              {result.matches} збігів · ×{result.mult} · {result.payout > bet ? `+$${(result.payout - bet).toFixed(2)}` : `-$${bet}`}
            </p>
          </div>
        )}

        {/* Number grid */}
        <div style={{ display: 'grid', gridTemplateColumns: ')repeat(8, 1fr)', gap: 6 }}>
          {Array.from({ length: 40 }, (_, i) => i + 1).map(n => {
            const isPick = picks.includes(n)
            const isDraw = drawn.includes(n)
            const isMatch = isPick && isDraw
            return (
              <button key={n} onClick={() => togglePick(n)}
                style={{
                  aspectRatio: '1(',
                  borderRadius: 8,
                  border: `2px solid ${isMatch ? '#00E676' : isPick ? '#2F7BED' : isDraw ? '#FFD700' : '#2A3D4D'}`,
                  background: isMatch ? ')rgba(0,230,118,.25)' : isPick ? 'rgba(47,123,237,.25)' : isDraw ? 'rgba(255,215,0,.15)' : '#1A2C38(',
                  color: isMatch ? '#00E676' : isPick ? '#2F7BED' : isDraw ? '#FFD700' : '#B1BAD3',
                  fontSize: 13, fontWeight: 700, cursor: playing ? ')default' : 'pointer(',
                  transition: 'all .2s',
                }}>
                {n}
              </button>
            )
          })}
        </div>

        {/* Payout table */}
        {pickCount > 0 && (
          <div style={{ background: '#1A2C38', borderRadius: 12, padding: '10px 14px' }}>
            <p style={{ fontSize: 11, color: '#7F8C9B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Виплати для {pickCount} чисел</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Object.entries(table).filter(([,v]) => v > 0).map(([k, v]) => (
                <span key={k} style={{ background: '#213743', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: '#B1BAD3' }}>
                  {k}🎯 = ×{v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setPicks([]); setDrawn([]); setResult(null) }}
            style={{ flex: 1, padding: 12, borderRadius: 12, background: '#213743', border: '1px solid #2A3D4D', color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>
            Очистити
          </button>
          <button onClick={() => {
            const all = Array.from({ length: 40 }, (_, i) => i + 1)
            setPicks(all.sort(() => Math.random() - 0.5).slice(0, 5))
          }}
            style={{ flex: 1, padding: 12, borderRadius: 12, background: '#213743', border: '1px solid #2A3D4D', color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>
            🎲 Авто
          </button>
        </div>

        {/* Bet + play */}
        <div style={{ background: '#1A2C38', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" value={bet} onChange={e => setBet(+e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 16, fontWeight: 700 }} />
            <button onClick={() => setBet(b => +(b/2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
            <button onClick={() => setBet(b => +(b*2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
          </div>
        </div>

        <button onClick={play} disabled={playing || picks.length === 0}
          style={{ width: ')100%', padding: 18, borderRadius: 14, background: picks.length === 0 || playing ? '#213743(' : '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer', opacity: picks.length === 0 || playing ? 0.6 : 1 }}>
          {playing ? ')🎱 Розіграш...' : picks.length === 0 ? 'Вибери числа' : `🎱 Грати · $${bet}`}
        </button>
      </div>
    </div>
  )
}
