import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SEGMENTS = {
  low:    [{ v: 1.5, c: '#2F7BED' },{ v: 1.2, c: '#213743' },{ v: 1.0, c: '#213743' },{ v: 0, c: '#F44336' },{ v: 1.2, c: '#213743' },{ v: 1.5, c: '#2F7BED' },{ v: 2.0, c: '#00E676' },{ v: 0, c: '#F44336' },{ v: 1.0, c: '#213743' },{ v: 3.0, c: '#FFD700' }],
  medium: [{ v: 0, c: '#F44336' },{ v: 2.0, c: '#2F7BED' },{ v: 0, c: '#F44336' },{ v: 3.0, c: '#00E676' },{ v: 0, c: '#F44336' },{ v: 5.0, c: '#FFD700' },{ v: 0, c: '#F44336' },{ v: 2.0, c: '#2F7BED' },{ v: 0, c: '#F44336' },{ v: 10.0, c: '#FF6B6B' }],
  high:   [{ v: 0, c: '#F44336' },{ v: 0, c: '#F44336' },{ v: 0, c: '#F44336' },{ v: 5, c: '#2F7BED' },{ v: 0, c: '#F44336' },{ v: 0, c: '#F44336' },{ v: 0, c: '#F44336' },{ v: 20, c: '#00E676' },{ v: 0, c: '#F44336' },{ v: 50, c: '#FFD700' }],
}

type Risk = 'low' | 'medium' | 'high'

export default function GameWheel() {
  const navigate = useNavigate()
  const [bet, setBet] = useState(1)
  const [risk, setRisk] = useState<Risk>('medium')
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<{ seg: number; mult: number; won: boolean; payout: number } | null>(null)
  const segCount = SEGMENTS[risk].length

  async function spin() {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    const seg = Math.floor(Math.random() * segCount)
    const targetDeg = 360 - (seg * (360 / segCount)) - (360 / segCount / 2)
    const spins = 5 * 360 + targetDeg
    setRotation(prev => prev + spins)
    await new Promise(r => setTimeout(r, 3000))
    const mult = SEGMENTS[risk][seg].v
    const won = mult > 0
    const payout = won ? +(bet * mult).toFixed(2) : 0
    setResult({ seg, mult, won, payout })
    setSpinning(false)
  }

  const segs = SEGMENTS[risk]
  const segAngle = 360 / segCount

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🎡 Wheel</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        {/* Wheel */}
        <div style={{ position: 'relative', width: 280, height: 280, marginTop: 8 }}>
          {/* Pointer */}
          <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '24px solid #fff' }} />

          <svg width="280" height="280" style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none', borderRadius: '50%', overflow: 'visible' }} viewBox="0 0 280 280">
            {segs.map((seg, i) => {
              const startAngle = i * segAngle - 90
              const endAngle = startAngle + segAngle
              const r = 130, cx = 140, cy = 140
              const x1 = cx + r * Math.cos(startAngle * Math.PI / 180)
              const y1 = cy + r * Math.sin(startAngle * Math.PI / 180)
              const x2 = cx + r * Math.cos(endAngle * Math.PI / 180)
              const y2 = cy + r * Math.sin(endAngle * Math.PI / 180)
              const midAngle = (startAngle + endAngle) / 2
              const tx = cx + (r * 0.65) * Math.cos(midAngle * Math.PI / 180)
              const ty = cy + (r * 0.65) * Math.sin(midAngle * Math.PI / 180)
              return (
                <g key={i}>
                  <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill={seg.c} stroke="#0F212E" strokeWidth="2" />
                  <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="11" fontWeight="800">
                    {seg.v > 0 ? `×${seg.v}` : '✕'}
                  </text>
                </g>
              )
            })}
            <circle cx="140" cy="140" r="20" fill="#0F212E" stroke="#1A2C38" strokeWidth="3" />
          </svg>
        </div>

        {/* Result */}
        {result && (
          <div style={{ background: '#1A2C38', borderRadius: 12, padding: '12px 20px', textAlign: 'center', border: `1px solid ${result.won ? '#00E676' : '#F44336'}`, width: '100%' }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: result.won ? '#00E676' : '#F44336' }}>
              {result.won ? `✅ ×${result.mult} · +$${result.payout}` : '❌ Не пощастило'}
            </p>
          </div>
        )}

        {/* Risk */}
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          {(['low', 'medium', 'high'] as Risk[]).map(r => (
            <button key={r} onClick={() => { setRisk(r); setResult(null) }}
              disabled={spinning}
              style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: risk === r ? '#2F7BED' : '#213743', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer', opacity: spinning ? 0.5 : 1 }}>
              {r === 'low' ? '🟢 Низький' : r === 'medium' ? '🟡 Середній' : '🔴 Високий'}
            </button>
          ))}
        </div>

        {/* Bet */}
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16, width: '100%' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" value={bet} onChange={e => setBet(+e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 16, fontWeight: 700 }} />
            <button onClick={() => setBet(b => +(b/2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
            <button onClick={() => setBet(b => +(b*2).toFixed(2))} style={{ padding: '0 14px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
          </div>
        </div>

        <button onClick={spin} disabled={spinning}
          style={{ width: '100%', padding: 18, borderRadius: 14, background: spinning ? '#213743' : '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer', opacity: spinning ? 0.7 : 1 }}>
          {spinning ? '🎡 Крутиться...' : `🎡 Крутити · $${bet}`}
        </button>
      </div>
    </div>
  )
}
