import { useState } from 'react'
import { useGame } from '../hooks/useGame'
import GameHeader from '../components/GameHeader'

export default function GameDice() {
  const game = useGame('dice')
  const [bet, setBet] = useState(1)
  const [target, setTarget] = useState(50)
  const [over, setOver] = useState(true)
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState<{ roll: number; won: boolean; payout: number } | null>(null)

  const winChance = over ? 100 - target : target
  const multiplier = winChance > 0 ? +(99 / winChance).toFixed(4) : 0
  const BET_OPTS = [0.1, 0.5, 1, 2, 5, 10]

  async function roll() {
    if (rolling || bet > game.balance) return
    setRolling(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 600))
    const res = await game.playOnce({ target, over }, bet)
    if (res) setResult({ roll: res.roll as number, won: res.won as boolean, payout: res.payout as number })
    setRolling(false)
  }

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <GameHeader title="🎲 Dice" rtp="99%" game={game} />

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Result */}
        <div style={{ background: '#1A2C38', borderRadius: 20, padding: '24px 20px', textAlign: 'center', border: `1px solid ${result ? (result.won ? '#00E676' : '#F44336') : '#2A3D4D'}`, transition: 'border-color .3s' }}>
          {rolling ? (
            <p style={{ fontSize: 56, fontWeight: 900, color: '#fff' }}>🎲</p>
          ) : result ? (
            <>
              <p style={{ fontSize: 64, fontWeight: 900, color: result.won ? '#00E676' : '#F44336' }}>{result.roll}</p>
              <p style={{ fontSize: 16, color: result.won ? '#00E676' : '#F44336', fontWeight: 700, marginTop: 4 }}>
                {result.won ? `✅ +$${result.payout.toFixed(2)}` : `❌ -$${bet.toFixed(2)}`}
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 64, fontWeight: 900, color: '#213743' }}>—</p>
              <p style={{ fontSize: 13, color: '#7F8C9B' }}>Зроби ставку і кидай</p>
            </>
          )}
        </div>

        {/* Slider */}
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#7F8C9B' }}>Ціль: <b style={{ color: '#fff' }}>{target}</b></span>
            <span style={{ fontSize: 12, color: '#7F8C9B' }}>Шанс: <b style={{ color: '#00E676' }}>{winChance.toFixed(2)}%</b></span>
            <span style={{ fontSize: 12, color: '#7F8C9B' }}>×<b style={{ color: '#fff' }}>{multiplier.toFixed(4)}</b></span>
          </div>
          <input type="range" min="2" max="98" value={target} onChange={e => setTarget(+e.target.value)}
            style={{ width: ')100%', accentColor: '#2F7BED(', cursor: 'pointer' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => setOver(true)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: over ? '#2F7BED' : '#213743', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>↑ Вище {target}</button>
            <button onClick={() => setOver(false)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: !over ? '#2F7BED' : '#213743', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>↓ Нижче {target}</button>
          </div>
        </div>

        {/* Bet */}
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 14 }}>
          <p style={{ fontSize: 11, color: '#7F8C9B', marginBottom: 8 }}>Ставка</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input type="number" value={bet} onChange={e => setBet(Math.max(0.01, +e.target.value))}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#213743', border: `1px solid ${bet > game.balance ? '#F44336' : '#2A3D4D'}`, color: '#fff', fontSize: 16, fontWeight: 700, outline: 'none' }} />
            <button onClick={() => setBet(b => +(b / 2).toFixed(2))} style={{ padding: '0 12px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>½</button>
            <button onClick={() => setBet(b => +(b * 2).toFixed(2))} style={{ padding: '0 12px', background: '#213743', border: '1px solid #2A3D4D', borderRadius: 10, color: '#B1BAD3', fontWeight: 700, cursor: 'pointer' }}>×2</button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {BET_OPTS.map(b => (
              <button key={b} onClick={() => setBet(b)} style={{ padding: '6px 12px', borderRadius: 8, background: bet === b ? '#2F7BED' : '#213743', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>${b}</button>
            ))}
          </div>
        </div>

        <button onClick={roll} disabled={rolling || bet > game.balance || game.isLoading}
          style={{ width: ')100%', padding: 18, borderRadius: 14, background: rolling || bet > game.balance ? '#213743(' : '#2F7BED', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: 'pointer', opacity: rolling ? 0.7 : 1 }}>
          {rolling ? ')🎲 Кидаю...' : `${game.isDemoMode ? '🎮' : '💰'} Кинути · $${bet.toFixed(2)}`}
        </button>
      </div>
    </div>
  )
}
