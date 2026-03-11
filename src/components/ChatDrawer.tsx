import { useState, useEffect, useRef } from 'react'

const CHAT_USERS = [
  { name: 'Artem_UA', color: '#00d4aa', badge: 'VIP' },
  { name: 'crypto_max', color: '#1475e1', badge: null },
  { name: 'lucky777', color: '#ffd700', badge: 'VIP' },
  { name: 'Yaroslav', color: '#ed4163', badge: null },
  { name: 'moon_bet', color: '#a29bfe', badge: null },
  { name: 'DimaKiev', color: '#00d4aa', badge: null },
  { name: 'PokerKing', color: '#f59e0b', badge: 'VIP' },
  { name: 'natasha', color: '#fd79a8', badge: null },
  { name: 'highroller', color: '#ffd700', badge: 'VIP' },
  { name: 'SpinMaster', color: '#55efc4', badge: null },
]

const MESSAGES = [
  'хто тут зараз грає? 👋',
  'щойно зробив x180 на mines 🔥🔥🔥',
  'gg! йду спати багатим 😂',
  'яка мінімальна ставка?',
  '+$340 за 10 хвилин на slots 💰',
  'Dragon Pearls топ гра',
  'хтось грав Aviator сьогодні?',
  'Book of Gold дав bonus game!!!',
  'Wolf Power Megaways 🐺🔥',
  'депозит зайшов за 2 хв, топ сервіс',
  '+$127 виграш! кайф 🎉',
  'сьогодні везе! вже x3 баланс 💪',
  'Dice RTP 99% — математика 🧮',
  'Plinko краща гра для нервів 😬',
  '+$68 на roulette чорне 🖤',
  'MINES X47 LETS GOOO 🚀🚀',
]

const WINS = [
  { game: 'Mines', mult: 47, amount: 235 },
  { game: 'Aviator', mult: 12, amount: 144 },
  { game: 'Plinko', mult: 130, amount: 650 },
  { game: 'Dice', mult: 8, amount: 80 },
  { game: 'Limbo', mult: 50, amount: 150 },
]

type Msg = { id: number; user: typeof CHAT_USERS[0]; text: string; time: string; isWin?: boolean; isMine?: boolean }
function rnd<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)] }
function nowTime() { return new Date().toLocaleTimeString('uk', { hour: '2-digit', minute: '2-digit' }) }

const INIT: Msg[] = [
  { id: 1, user: CHAT_USERS[0], text: 'хто тут зараз грає? 👋', time: '10:41' },
  { id: 2, user: CHAT_USERS[2], text: 'щойно зробив x47 на mines 🔥', time: '10:42', isWin: true },
  { id: 3, user: CHAT_USERS[5], text: 'Book of Gold дав бонус!', time: '10:43' },
  { id: 4, user: CHAT_USERS[8], text: '+$540 Buffalo Megaways 🦬💰', time: '10:44', isWin: true },
  { id: 5, user: CHAT_USERS[3], text: 'яка мінімальна ставка?', time: '10:45' },
  { id: 6, user: CHAT_USERS[1], text: 'від $0.1 є 👍', time: '10:45' },
]

export default function ChatDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>(INIT)
  const [online, setOnline] = useState(1284)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open])

  useEffect(() => {
    if (!open) return
    const ivs: ReturnType<typeof setInterval>[] = []
    ivs.push(setInterval(() => {
      const user = rnd(CHAT_USERS)
      const isWin = Math.random() < 0.25
      const text = isWin
        ? (() => { const w = rnd(WINS); return `+$${w.amount} на ${w.game} × ${w.mult} 🎉` })()
        : rnd(MESSAGES)
      setMsgs(m => [...m.slice(-50), { id: Date.now(), user, text, time: nowTime(), isWin }])
    }, 3000 + Math.random() * 5000))
    ivs.push(setInterval(() => setOnline(o => o + Math.floor(Math.random() * 7) - 3), 4000))
    return () => ivs.forEach(clearInterval)
  }, [open])

  const send = () => {
    if (!msg.trim()) return
    setMsgs(m => [...m, { id: Date.now(), user: { name: 'Ти', color: '#1475e1', badge: null }, text: msg, time: nowTime(), isMine: true }])
    setMsg('')
    setTimeout(() => {
      const user = rnd(CHAT_USERS)
      const replies = ['👍', '😂', 'точно!', 'gg', '+1', '🔥', 'хаха так']
      setMsgs(m => [...m, { id: Date.now() + 1, user, text: rnd(replies), time: nowTime() }])
    }, 2000 + Math.random() * 2000)
  }

  if (!open) return null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 200 }} />
      <div style={{
        position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480, height: '65vh',
        background: '#0f212e', borderRadius: '16px 16px 0 0',
        border: '1px solid #2d4a5a', zIndex: 201,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #2d4a5a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e701', display: 'inline-block' }} />
            <span style={{ fontWeight: 800, color: '#fff', fontSize: 15 }}>Чат</span>
            <span style={{ fontSize: 11, color: '#557086' }}>{online.toLocaleString()} онлайн</span>
          </div>
          <button onClick={onClose} style={{ background: '#213743', border: 'none', color: '#8a9bb0', fontSize: 14, cursor: 'pointer', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {msgs.map(m => (
            <div key={m.id} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start',
              background: m.isWin ? 'rgba(0,231,1,0.04)' : m.isMine ? 'rgba(20,117,225,0.06)' : 'transparent',
              borderRadius: 10, padding: '5px 8px',
              border: m.isWin ? '1px solid rgba(0,231,1,0.12)' : '1px solid transparent',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: m.user.color + '18', border: `1.5px solid ${m.user.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: m.user.color, fontWeight: 800,
              }}>{m.user.name[0].toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: m.user.color }}>{m.user.name}</span>
                  {m.user.badge && <span style={{ fontSize: 7, background: '#ffd70018', color: '#ffd700', border: '1px solid #ffd70033', borderRadius: 3, padding: '1px 4px', fontWeight: 800 }}>VIP</span>}
                  <span style={{ fontSize: 9, color: '#3a5469', marginLeft: 'auto' }}>{m.time}</span>
                </div>
                <p style={{ fontSize: 12, color: m.isWin ? '#00e701' : '#b1bad3', lineHeight: 1.4, wordBreak: 'break-word' }}>
                  {m.isWin && '💰 '}{m.text}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #2d4a5a', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Написати повідомлення..."
            style={{ flex: 1, background: '#1a2c38', border: '1px solid #2d4a5a', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none' }} />
          <button onClick={send} style={{ background: '#00d4aa', border: 'none', borderRadius: 8, padding: '0 14px', color: '#0f212e', fontWeight: 800, cursor: 'pointer', fontSize: 16 }}>↑</button>
        </div>
      </div>
    </>
  )
}
