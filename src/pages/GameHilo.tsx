import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useUser } from '../hooks/useUser'

const VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const SUITS = ['♠','♥','♦','♣']

function randomCard() {
  return { val: Math.floor(Math.random() * 13), suit: Math.floor(Math.random() * 4) }
}
function cardLabel(v: number) { return VALS[v] }
function suitColor(s: number) { return s > 1 ? '#F44336' : '#fff' }

export default function GameHilo() {
  const navigate = useNavigate()
  const { user, refreshUser } = useUser()
  const [bet, setBet] = useState(1)
  const [phase, setPhase] = useState<'bet'|'playing'|'done'>('bet')
  const [card, setCard] = useState(randomCard())
  const [history, setHistory] = useState<Array<{ card: any; correct: boolean }>>([])
  const [multiplier, setMultiplier] = useState(1)
  const [result, setResult] = useState<'won'|'lost'|null>(null)
  const [streak, setStreak] = useState(0)
  const [win, setWin] = useState(0)

  function start() {
    setCard(randomCard())
    setHistory([])
    setMultiplier(1)
    setResult(null)
    setStreak(0)
    setPhase('playing')
  }

  function guess(higher: boolean) {
    const next = randomCard()
    const correct = higher ? next.val > card.val : next.val < card.val
    const newMult = correct ? +(multiplier * 1.5).toFixed(2) : multiplier
    setHistory(h => [...h, { card, correct }])
    setCard(next)
    if (!correct) {
      setResult('lost')
      setPhase('done')
    } else {
      setMultiplier(newMult)
      setStreak(s => s + 1)
    }
  }

  async function cashout() {
    const payout = +(bet * multiplier).toFixed(2)
    setWin(payout)
    setResult('won')
    setPhase('done')
    if (user) {
      try {
        await api.placeBet({ game_type: 'hilo', bet_amount: bet, multiplier, payout })
        await refreshUser()
      } catch {}
    }
  }

  const C = { bg: '#0f212e', card: '#213743', border: '#2d4a5a', text: '#fff', sub: '#8a9bb0', accent: '#00d4aa' }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.sub, borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 16 }}>←</button>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>🃏 Hi-Lo</div>
          <div style={{ marginLeft: 'auto', background: C.card, borderRadius: 8, padding: '6px 12px' }}>
            <span style={{ fontSize: 11, color: C.sub }}>×</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.accent }}>{multiplier}</span>
          </div>
        </div>

        {/* Card display */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 80, lineHeight: 1, color: suitColor(card.suit) }}>
            {cardLabel(card.val)}{SUITS[card.suit]}
          </div>
          {phase === 'done' && result && (
            <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, color: result === 'won' ? '#00e701' : '#ed4163' }}>
              {result === 'won' ? `✅ Виграш: +$${win}` : `❌ Програш: -$${bet}`}
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {history.map((h, i) => (
              <div key={i} style={{ background: h.correct ? '#00e70120' : '#ed416320', border: `1px solid ${h.correct ? '#00e701' : '#ed4163'}`, borderRadius: 6, padding: '3px 8px', fontSize: 12, color: h.correct ? '#00e701' : '#ed4163' }}>
                {cardLabel(h.card.val)}{SUITS[h.card.suit]}
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        {phase === 'bet' && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
            <p style={{ fontSize: 11, color: C.sub, marginBottom: 8 }}>Ставка</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[0.5, 1, 2, 5, 10].map(v => (
                <button key={v} onClick={() => setBet(v)} style={{ flex: 1, padding: '8px 0', background: bet === v ? C.accent : '#0f212e', border: `1px solid ${bet === v ? C.accent : C.border}`, borderRadius: 8, color: bet === v ? '#0f212e' : C.sub, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{v}</button>
              ))}
            </div>
            <button onClick={start} style={{ width: '100%', background: C.accent, border: 'none', borderRadius: 12, padding: 14, color: '#0f212e', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              🃏 Грати · ${bet}
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => guess(true)} style={{ flex: 1, background: '#00e70120', border: '2px solid #00e701', borderRadius: 14, padding: 18, color: '#00e701', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              ⬆ Higher
            </button>
            <button onClick={cashout} style={{ flex: 1, background: '#2F7BED20', border: '2px solid #2F7BED', borderRadius: 14, padding: 18, color: '#2F7BED', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
              💰 Забрати ×{multiplier}
            </button>
            <button onClick={() => guess(false)} style={{ flex: 1, background: '#ed416320', border: '2px solid #ed4163', borderRadius: 14, padding: 18, color: '#ed4163', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              ⬇ Lower
            </button>
          </div>
        )}

        {phase === 'done' && (
          <button onClick={() => setPhase('bet')} style={{ width: '100%', background: C.accent, border: 'none', borderRadius: 12, padding: 14, color: '#0f212e', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
            Грати знову
          </button>
        )}
      </div>
    </div>
  )
}
