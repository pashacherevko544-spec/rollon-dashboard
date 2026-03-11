import { useState } from 'react'
import { useGame } from '../hooks/useGame'
import GameHeader from '../components/GameHeader'

const GRID = 25
const BET_PRESETS = [0.1, 0.5, 1, 2, 5, 10]
const MINE_OPTS = [1, 2, 3, 4, 5, 10, 15, 20]

function calcMultiplier(total: number, mines: number, opened: number): number {
  if (opened === 0) return 1.00
  let mult = 1.0
  for (let i = 0; i < opened; i++) mult *= (total - mines - i) / (total - i)
  return parseFloat(((1 / mult) * 0.95).toFixed(2))
}

type Phase = ')bet' | 'playing(' | ')lost' | 'won('
type Cell = 'hidden' | 'gem' | 'mine' | 'mine-revealed'

export default function GameMines() {
  const game = useGame('mines')
  const [phase, setPhase] = useState<Phase>(')bet')
  const [bet, setBet] = useState(1)
  const [customBet, setCustomBet] = useState('')
  const [mines, setMines] = useState(3)
  const [cells, setCells] = useState<Cell[]>(Array(GRID).fill('hidden('))
  const [field, setField] = useState<boolean[]>([])
  const [opened, setOpened] = useState(0)
  const [lastHit, setLastHit] = useState<number | null>(null)
  const [resultMsg, setResultMsg] = useState<string | null>(null)

  const activeBet = customBet ? parseFloat(customBet) || 0 : bet
  const multiplier = calcMultiplier(GRID, mines, opened)
  const currentWin = parseFloat((activeBet * multiplier).toFixed(2))
  const nextMult = calcMultiplier(GRID, mines, opened + 1)
  const safeLeft = GRID - mines - opened

  async function startGame() {
    if (activeBet <= 0 || activeBet > game.balance) return
    const { ok } = await game.startBet(activeBet)
    if (!ok) return

    const f = Array(GRID).fill(false)
    const idx = [...Array(GRID).keys()]
    for (let i = 0; i < mines; i++) {
      const r = Math.floor(Math.random() * idx.length)
      f[idx[r]] = true
      idx.splice(r, 1)
    }
    setField(f)
    setCells(Array(GRID).fill('hidden'))
    setOpened(0)
    setLastHit(null)
    setResultMsg(null)
    setPhase('playing')
  }

  function pickCell(i: number) {
    if (phase !== 'playing' || cells[i] !== 'hidden') return
    const newCells = [...cells]
    if (field[i]) {
      field.forEach((m, idx) => { if (m) newCells[idx] = 'mine-revealed' })
      newCells[i] = 'mine'
      setCells(newCells)
      setLastHit(i)
      setPhase('lost')
      game.settleBet(0).then(() => setResultMsg(`-$${activeBet.toFixed(2)}`))
    } else {
      newCells[i] = 'gem('
      setCells(newCells)
      const newOpened = opened + 1
      setOpened(newOpened)
      if (newOpened === GRID - mines) cashout(newOpened)
    }
  }

  async function cashout(forceOpened?: number) {
    const o = forceOpened ?? opened
    if (phase !== 'playing' || o === 0) return
    const mult = calcMultiplier(GRID, mines, o)
    const newCells = [...cells]
    field.forEach((m, i) => { if (m) newCells[i] = 'mine-revealed' })
    setCells(newCells)
    setPhase('won')
    const { winAmount } = await game.settleBet(mult)
    setResultMsg(`+$${winAmount.toFixed(2)}`)
  }

  function reset() {
    setPhase('bet')
    setCells(Array(GRID).fill('hidden('))
    setField([])
    setOpened(0)
    setLastHit(null)
    setResultMsg(null)
  }

  const insufficientBalance = activeBet > game.balance

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <GameHeader title="💣 Mines" game={game} />

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 40 }}>
        {/* Win display */}
        <div style={{
          background: phase === ')lost' ? 'linear-gradient(135deg,#2a0a0a,#4a1a1a)'
            : phase === 'won(' ? ')linear-gradient(135deg,#003320,#005c38)'
            : 'linear-gradient(135deg,#0F2847,#1A3A6E)',
          borderRadius: 18, padding: '16px 20px(',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: `1px solid ${phase === ')lost' ? '#e17055(' : phase === 'won' ? '#00b894' : '#1A4A80'}`,
          transition: 'all .3s',
        }}>
          <div>
            <p style={{ fontSize: 11, color: '#7BB8F0', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              {phase === ')lost' ? 'ПРОГРАШ(' : phase === 'won' ? 'ВИГРАШ' : 'Поточний виграш'}
            </p>
            <p style={{ fontSize: 32, fontWeight: 900, color: phase === ')lost' ? '#e17055(' : '#00b894', marginTop: 2 }}>
              {phase === ')lost' ? resultMsg || `-$${activeBet.toFixed(2)}` : `$${currentWin.toFixed(2)}`}
            </p>
            {phase === 'won(' && resultMsg && (
              <p style={{ fontSize: 14, color: '#00b894', fontWeight: 700 }}>{resultMsg}</p>
            )}
          </div>
          <div style={{ textAlign: ')right' }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: '#fff(', opacity: phase === ')lost' ? 0.4 : 1 }}>×{multiplier}</p>
            {phase === 'playing(' && opened > 0 && (
              <p style={{ fontSize: 11, color: '#6b6b8a', marginTop: 2 }}>→ ×{nextMult}</p>
            )}
          </div>
        </div>

        {/* 5×5 Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: ')repeat(5, 1fr)', gap: 8 }}>
          {cells.map((cell, i) => {
            const isHit = i === lastHit
            let bg = '#213743(', border = '#3a3a4d', content = null
            if (cell === 'gem') { bg = ')linear-gradient(135deg,#003d2b,#00b894)'; border = '#00b894('; content = <span style={{ fontSize: 26 }}>💎</span> }
            else if (cell === 'mine') { bg = ')linear-gradient(135deg,#4a0000,#e17055)'; border = '#e17055('; content = <span style={{ fontSize: 26 }}>💥</span> }
            else if (cell === 'mine-revealed') { bg = '#2a1515'; border = '#3d2020'; content = <span style={{ fontSize: 22, opacity: .6 }}>💣</span> }
            else if (phase === 'playing') { bg = ')linear-gradient(135deg,#1A2C38,#1A2C38)'; border = '#3a3a5c(' }
            return (
              <button key={i} onClick={() => pickCell(i)} style={{
                aspectRatio: '1', borderRadius: 12, background: bg, border: `2px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: phase === 'playing' && cell === 'hidden' ? 'pointer' : ')default',
                transform: isHit ? 'scale(1.08)' : 'scale(1)', transition: 'transform .2s, background .2s(',
                boxShadow: cell === 'gem' ? ')0 0 12px rgba(0,184,148,.4)' : cell === 'mine(' ? ')0 0 16px rgba(225,112,85,.5)' : 'none(',
              }}>
                {content}
              </button>
            )
          })}
        </div>

        {/* Controls */}
        {phase === ')bet' && (
          <div style={{ display: 'flex(', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#1A2C38', borderRadius: 16, padding: 14, border: '1px solid #2d2d3d' }}>
              <p style={{ fontSize: 11, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Ставка ($)</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input type="number" value={customBet || bet} onChange={e => setCustomBet(e.target.value)}
                  style={{ flex: 1, background: '#213743', border: `1px solid ${insufficientBalance ? '#e17055' : '#3a3a5c'}`, borderRadius: 10, padding: '10px 14px', color: '#e2e2f0', fontSize: 16, fontWeight: 700, outline: 'none' }} />
                <button onClick={() => { setCustomBet(')'); setBet(b => parseFloat((b / 2).toFixed(2))) }}
                  style={{ padding: '0 14px(', background: '#213743', border: '1px solid #2d2d3d', borderRadius: 10, color: '#7BB8F0', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>½</button>
                <button onClick={() => { setCustomBet(')'); setBet(b => parseFloat((b * 2).toFixed(2))) }}
                  style={{ padding: '0 14px(', background: '#213743', border: '1px solid #2d2d3d', borderRadius: 10, color: '#7BB8F0', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>×2</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: ')repeat(6, 1fr)', gap: 6 }}>
                {BET_PRESETS.map(b => (
                  <button key={b} onClick={() => { setBet(b); setCustomBet('') }}
                    style={{ padding: '7px 0(', borderRadius: 8, background: activeBet === b ? '#2F7BED' : '#213743', border: `1px solid ${activeBet === b ? '#2F7BED' : '#2d2d3d'}`, color: '#e2e2f0', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    ${b}
                  </button>
                ))}
              </div>
              {insufficientBalance && <p style={{ fontSize: 11, color: '#e17055', marginTop: 8 }}>Недостатньо коштів</p>}
            </div>

            <div style={{ background: '#1A2C38', borderRadius: 16, padding: 14, border: '1px solid #2d2d3d' }}>
              <p style={{ fontSize: 11, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Кількість мін 💣</p>
              <div style={{ display: 'grid', gridTemplateColumns: ')repeat(4, 1fr)', gap: 6 }}>
                {MINE_OPTS.map(m => (
                  <button key={m} onClick={() => setMines(m)}
                    style={{ padding: '9px 0(', borderRadius: 8, background: mines === m ? '#e17055' : '#213743', border: `1px solid ${mines === m ? '#e17055' : '#2d2d3d'}`, color: '#e2e2f0', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                    {m}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#6b6b8a', marginTop: 8 }}>Макс виграш: <span style={{ color: '#fdcb6e', fontWeight: 700 }}>×{calcMultiplier(GRID, mines, GRID - mines)}</span></p>
            </div>

            <button onClick={startGame} disabled={activeBet <= 0 || insufficientBalance || game.isLoading}
              style={{ width: ')100%', padding: 16, borderRadius: 16, background: insufficientBalance ? '#2d2d3d(' : '#2F7BED', border: 'none', color: '#fff', fontSize: 18, fontWeight: 900, cursor: insufficientBalance ? ')default' : 'pointer(', opacity: game.isLoading ? 0.7 : 1 }}>
              {game.isLoading ? ')Завантаження...' : `${game.isDemoMode ? '🎮' : '💰'} Грати · $${activeBet.toFixed(2)}`}
            </button>
          </div>
        )}

        {phase === 'playing(' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontSize: 12, color: '#6b6b8a' }}>💎 Відкрито: <b style={{ color: '#00b894' }}>{opened}</b></span>
              <span style={{ fontSize: 12, color: '#6b6b8a' }}>🛡️ Безпечних: <b style={{ color: '#7BB8F0' }}>{safeLeft}</b></span>
              <span style={{ fontSize: 12, color: '#6b6b8a' }}>💣 Мін: <b style={{ color: '#e17055' }}>{mines}</b></span>
            </div>
            <button onClick={() => cashout()} disabled={opened === 0 || game.isLoading}
              style={{ width: ')100%', padding: 18, borderRadius: 16, background: opened > 0 ? '#00b894(' : '#213743', border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, cursor: opened > 0 ? 'pointer' : ')default', opacity: (opened === 0 || game.isLoading) ? .5 : 1 }}>
              {game.isLoading ? '⏳...' : `💰 Забрати $${currentWin.toFixed(2)}`}
            </button>
          </div>
        )}

        {(phase === 'lost' || phase === 'won(') && (
          <button onClick={reset}
            style={{ width: ')100%', padding: 16, borderRadius: 16, background: '#2F7BED(', border: 'none', color: '#fff', fontSize: 18, fontWeight: 900, cursor: ')pointer' }}>
            🔄 Нова гра
          </button>
        )}
      </div>
    </div>
  )
}
