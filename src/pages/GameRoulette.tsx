import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RED_NUMS = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const NUMS = Array.from({ length: 37 }, (_, i) => i)

type BetType = 'straight' | 'red' | 'black' | 'even' | 'odd' | 'low' | 'high'

interface Bet { type: BetType; num?: number; amount: number }

export default function GameRoulette() {
  const navigate = useNavigate()
  const [chip, setChip] = useState(1)
  const [bets, setBets] = useState<Bet[]>([])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<{ num: number; winnings: number } | null>(null)
  const [ballAngle, setBallAngle] = useState(0)

  const totalBet = bets.reduce((s, b) => s + b.amount, 0)

  function addBet(type: BetType, num?: number) {
    setBets(prev => {
      const existing = prev.find(b => b.type === type && b.num === num)
      if (existing) return prev.map(b => b.type === type && b.num === num ? { ...b, amount: b.amount + chip } : b)
      return [...prev, { type, num, amount: chip }]
    })
  }

  function calcWin(bet: Bet, num: number): number {
    const isRed = RED_NUMS.includes(num)
    switch (bet.type) {
      case 'straight': return bet.num === num ? bet.amount * 35 : 0
      case 'red':    return (num > 0 && isRed) ? bet.amount * 2 : 0
      case 'black':  return (num > 0 && !isRed) ? bet.amount * 2 : 0
      case 'even':   return (num > 0 && num % 2 === 0) ? bet.amount * 2 : 0
      case 'odd':    return (num > 0 && num % 2 === 1) ? bet.amount * 2 : 0
      case 'low':    return (num >= 1 && num <= 18) ? bet.amount * 2 : 0
      case 'high':   return (num >= 19 && num <= 36) ? bet.amount * 2 : 0
      default: return 0
    }
  }

  async function spin() {
    if (bets.length === 0 || spinning) return
    setSpinning(true)
    setResult(null)
    const num = Math.floor(Math.random() * 37)
    setBallAngle(a => a + 1800 + Math.random() * 360)
    await new Promise(r => setTimeout(r, 3000))
    const winnings = bets.reduce((s, b) => s + calcWin(b, num), 0)
    setResult({ num, winnings })
    setSpinning(false)
  }

  const isRed = (n: number) => RED_NUMS.includes(n)
  const numColor = (n: number) => n === 0 ? '#00875A' : isRed(n) ? '#E74C3C' : '#1a1a1a'

  const OUTSIDE_BETS: { type: BetType; label: string; color: string }[] = [
    { type: 'red', label: '🔴 Червоне', color: '#E74C3C' },
    { type: 'black', label: '⚫ Чорне', color: '#2d2d2d' },
    { type: 'even', label: 'Парне', color: '#213743' },
    { type: 'odd', label: 'Непарне', color: '#213743' },
    { type: 'low', label: '1-18', color: '#213743' },
    { type: 'high', label: '19-36', color: '#213743' },
  ]

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>🎰 Roulette</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Wheel visual */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ position: 'relative', width: 180, height: 180 }}>
            <div style={{ width: 180, height: 180, borderRadius: '50%', background: 'conic-gradient(#00875A 0deg 9.7deg, #1a1a1a 9.7deg 19.4deg, #E74C3C 19.4deg 29.1deg, #1a1a1a 29.1deg 38.8deg, #E74C3C 38.8deg 48.5deg, #1a1a1a 48.5deg 58.2deg, #E74C3C 58.2deg 67.9deg, #1a1a1a 67.9deg 77.6deg, #E74C3C 77.6deg 87.3deg, #1a1a1a 87.3deg 97deg, #E74C3C 97deg 106.7deg, #1a1a1a 106.7deg 116.4deg, #E74C3C 116.4deg 126.1deg, #1a1a1a 126.1deg 135.8deg, #E74C3C 135.8deg 145.5deg, #1a1a1a 145.5deg 155.2deg, #E74C3C 155.2deg 164.9deg, #1a1a1a 164.9deg 174.6deg, #E74C3C 174.6deg 184.3deg, #1a1a1a 184.3deg 194deg)', border: '4px solid #FFD700', transition: spinning ? 'none' : 'none', transform: `rotate(${ballAngle}deg)`, transition: spinning ? `transform 3s ease-out` : 'none', boxShadow: '0 0 20px rgba(255,215,0,.3)' }} />
            {result && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: numColor(result.num), border: '3px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff' }}>
                  {result.num}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div style={{ background: '#1A2C38', borderRadius: 14, padding: 14, textAlign: 'center', border: `1px solid ${result.winnings > 0 ? '#00E676' : '#F44336'}` }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: result.winnings > 0 ? '#00E676' : '#F44336' }}>
              Випало {result.num} {isRed(result.num) ? '🔴' : result.num === 0 ? '🟢' : '⚫'} · {result.winnings > 0 ? `+$${(result.winnings - totalBet).toFixed(2)}` : `-$${totalBet}`}
            </p>
          </div>
        )}

        {/* Chip selector */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {[0.5, 1, 5, 10, 25, 100].map(c => (
            <button key={c} onClick={() => setChip(c)}
              style={{ width: 44, height: 44, borderRadius: '50%', background: chip === c ? '#2F7BED' : '#213743', border: `2px solid ${chip === c ? '#2F7BED' : '#2A3D4D'}`, color: '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>
              ${c}
            </button>
          ))}
        </div>

        {/* Number grid */}
        <div style={{ background: '#1A2C38', borderRadius: 14, padding: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gap: 3 }}>
            {NUMS.slice(1).map(n => (
              <button key={n} onClick={() => addBet('straight', n)}
                style={{ aspectRatio: '1', borderRadius: 4, background: numColor(n), color: '#fff', fontSize: 9, fontWeight: 700, cursor: 'pointer', border: bets.find(b => b.type === 'straight' && b.num === n) ? '2px solid #FFD700' : '1px solid #2A3D4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => addBet('straight', 0)}
            style={{ width: '100%', marginTop: 4, padding: '6px 0', borderRadius: 6, background: '#00875A', border: bets.find(b => b.num === 0) ? '2px solid #FFD700' : '1px solid #2A3D4D', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 13 }}>
            0
          </button>
        </div>

        {/* Outside bets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {OUTSIDE_BETS.map(({ type, label, color }) => (
            <button key={type} onClick={() => addBet(type)}
              style={{ padding: '10px 4px', borderRadius: 10, background: color, border: bets.find(b => b.type === type) ? '2px solid #FFD700' : '1px solid #2A3D4D', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              {label}
              {bets.find(b => b.type === type) && <span style={{ display: 'block', fontSize: 10, color: '#FFD700' }}>${bets.find(b => b.type === type)!.amount}</span>}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setBets([]); setResult(null) }}
            style={{ flex: 1, padding: 14, borderRadius: 12, background: '#213743', border: '1px solid #2A3D4D', color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>
            ✕ Очистити
          </button>
          <button onClick={spin} disabled={bets.length === 0 || spinning}
            style={{ flex: 2, padding: 14, borderRadius: 12, background: bets.length === 0 || spinning ? '#213743' : '#2F7BED', border: 'none', color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: bets.length === 0 || spinning ? 0.6 : 1 }}>
            {spinning ? '🎡 Крутиться...' : `🎡 Крутити · $${totalBet}`}
          </button>
        </div>
      </div>
    </div>
  )
}
