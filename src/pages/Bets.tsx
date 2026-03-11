import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useUser } from '../hooks/useUser'

type Bet = {
  id: number
  game_type: string
  bet_amount: number
  multiplier: number
  payout: number
  created_at: string
}

export default function Bets() {
  const { user } = useUser()
  const [tab, setTab] = useState<'casino' | 'sport'>('casino')
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    api.myBets(50, 0)
      .then(data => setBets(Array.isArray(data) ? data : data.bets || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #2d4a5a' }}>
        {(['casino', 'sport'] as const).map(tp => (
          <button key={tp} onClick={() => setTab(tp)} style={{
            flex: 1, padding: '12px 0', background: 'none', border: 'none',
            borderBottom: tab === tp ? '2px solid #00d4aa' : '2px solid transparent',
            color: tab === tp ? '#fff' : '#557086',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>{tp === 'casino' ? '🎰 Казино' : '⚽ Спорт'}</button>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
        padding: '10px 16px', color: '#557086', fontSize: 11, fontWeight: 600,
        borderBottom: '1px solid rgba(45,74,90,0.3)',
      }}>
        <span>{'Гра'}</span>
        <span>{'Ставка'}</span>
        <span>×</span>
        <span style={{ textAlign: 'right' }}>{'Виплата'}</span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#557086' }}>{'Завантаження...'}</div>
      ) : tab === 'sport' ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#557086' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚽</div>
          <p style={{ fontWeight: 600 }}>{'Ставки на спорт незабаром'}</p>
        </div>
      ) : bets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#557086' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎲</div>
          <p style={{ fontWeight: 600 }}>{'Ставок ще немає'}</p>
        </div>
      ) : (
        <div>
          {bets.map(b => {
            const won = b.payout > 0
            return (
              <div key={b.id} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
                padding: '10px 16px', alignItems: 'center',
                borderBottom: '1px solid rgba(45,74,90,0.2)',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#c4cdd6' }}>{b.game_type}</div>
                  <div style={{ fontSize: 10, color: '#557086' }}>
                    {new Date(b.created_at).toLocaleDateString()}
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#8a9bb0' }}>${b.bet_amount.toFixed(2)}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: won ? '#00e701' : '#557086' }}>
                  {b.multiplier > 0 ? `${b.multiplier}×` : '—'}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, textAlign: 'right', color: won ? '#00e701' : '#ed4163' }}>
                  {won ? `+$${b.payout.toFixed(2)}` : `-$${b.bet_amount.toFixed(2)}`}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
