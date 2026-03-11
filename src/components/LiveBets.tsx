import { useState, useEffect, useRef } from 'react'

const GAMES = ['Mines', 'Aviator', 'Dice', 'Plinko', 'Limbo', 'Wheel', 'Book of Gold', 'Buffalo MW', 'Dragon Pearls', 'Keno', 'Flip', 'Roulette']
const USERS = ['Artem_UA', 'crypto_max', 'lucky777', 'DimaKiev', 'moon_bet', 'highroller', 'SpinMaster', 'Vegas_Pro', 'natasha', 'BetBoss', 'wolf_pack', 'ace_high']

function rnd<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)] }

type Bet = { id: number; user: string; game: string; amount: number; mult: number; payout: number; won: boolean }

function genBet(): Bet {
  const amount = parseFloat((Math.random() * 100 + 0.5).toFixed(2))
  const won = Math.random() > 0.45
  const mult = won ? parseFloat((Math.random() * 20 + 1.01).toFixed(2)) : 0
  return {
    id: Date.now() + Math.random(),
    user: rnd(USERS),
    game: rnd(GAMES),
    amount,
    mult,
    payout: won ? parseFloat((amount * mult).toFixed(2)) : 0,
    won,
  }
}



const ROW_COUNT = 10

export default function LiveBets() {
  const TABS = ['Всі ставки', 'Мої ставки', 'Великі гравці']
  const [tab, setTab] = useState(0)
  const [bets, setBets] = useState<Bet[]>(() => Array.from({ length: ROW_COUNT }, genBet))
  const freshId = useRef<number | null>(null)

  useEffect(() => {
    const schedule = () => {
      const delay = 2000 + Math.random() * 3000
      return setTimeout(() => {
        const newBet = genBet()
        freshId.current = newBet.id
        setBets(prev => {
          const next = [newBet, ...prev.slice(0, ROW_COUNT - 1)]
          return next
        })
        timerRef.current = schedule()
      }, delay)
    }
    const timerRef = { current: schedule() }
    return () => clearTimeout(timerRef.current)
  }, [])

  const displayed = tab === 2 ? bets.filter(b => b.amount > 30) : bets

  return (
    <div style={{ margin: '16px 0' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, padding: '0 16px', marginBottom: 10 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: '8px 16px', background: 'none', border: 'none',
            borderBottom: tab === i ? '2px solid #00d4aa' : '2px solid transparent',
            color: tab === i ? '#fff' : '#557086',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
        padding: '6px 16px', color: '#557086', fontSize: 10, fontWeight: 600,
      }}>
        <span>Гра</span>
        <span>Ставка</span>
        <span>Коеф.</span>
        <span style={{ textAlign: 'right' }}>Виплата</span>
      </div>

      {/* Rows — фіксована висота, без анімації зсуву */}
      <div>
        {tab === 1 ? (
          <div style={{ padding: 30, textAlign: 'center', color: '#557086', fontSize: 13 }}>
            Грай, щоб бачити ставки тут
          </div>
        ) : displayed.slice(0, ROW_COUNT).map((b, idx) => {
          const isFresh = b.id === freshId.current && idx === 0
          return (
            <div key={b.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
              padding: '8px 16px', alignItems: 'center',
              borderBottom: '1px solid rgba(45,74,90,0.2)',
              background: isFresh ? 'rgba(0,212,170,0.04)' : 'transparent',
              transition: 'background 1s ease',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#c4cdd6' }}>{b.game}</div>
                <div style={{ fontSize: 10, color: '#557086' }}>{b.user}</div>
              </div>
              <span style={{ fontSize: 12, color: '#8a9bb0' }}>${b.amount.toFixed(2)}</span>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: b.won ? '#00e701' : '#557086',
              }}>{b.won ? `${b.mult}×` : '—'}</span>
              <span style={{
                fontSize: 12, fontWeight: 700, textAlign: 'right',
                color: b.won ? '#00e701' : '#ed4163',
              }}>
                {b.won ? `+$${b.payout.toFixed(2)}` : `-$${b.amount.toFixed(2)}`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
