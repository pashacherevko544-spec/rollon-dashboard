import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/api'
import { useUser } from '../hooks/useUser'

type Msg = {
  id: number
  role: 'user' | 'admin'
  message: string | null
  photo_path: string | null
  created_at: string
}

// ── Female operators ──────────────────────────────────────────────────────────
const OPERATORS = [
  { name: 'Аліна',     seed: 'Alina'     },
  { name: 'Вікторія',  seed: 'Viktoria'  },
  { name: 'Катерина',  seed: 'Kateryna'  },
  { name: 'Юлія',      seed: 'Yulia'     },
  { name: 'Марина',    seed: 'Marina'    },
  { name: 'Анастасія', seed: 'Anastasia' },
  { name: 'Дарина',    seed: 'Daryna'    },
  { name: 'Софія',     seed: 'Sofia'     },
]

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}&backgroundColor=1a3a6e,1e3a5f,0d2137&hair=variant01,variant02,variant03,variant04,variant05,variant06,variant17,variant18,variant19,variant20&hairColor=3eac2c,6a4e35,c45c1c,9b1c1c,350f78,6a2a5b`
}

function getOperator(tg_id: number) {
  const key = `rollon_operator_${tg_id}`
  const saved = localStorage.getItem(key)
  if (saved) return JSON.parse(saved)
  const op = OPERATORS[tg_id % OPERATORS.length]
  localStorage.setItem(key, JSON.stringify(op))
  return op
}

// ── Rating popup ──────────────────────────────────────────────────────────────
function RatingPopup({ operator, onRate, onDismiss }: {
  operator: { name: string; seed: string }
  onRate: (stars: number) => void
  onDismiss: () => void
}) {
  const [hover, setHover] = useState(0)
  const [selected, setSelected] = useState(0)
  const [rated, setRated] = useState(false)

  function handleRate(stars: number) {
    setSelected(stars)
    setRated(true)
    setTimeout(() => onRate(stars), 800)
  }

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, background: ')rgba(0,0,0,0.55)', zIndex: 200,
      }} onClick={onDismiss} />
      <div style={{
        position: 'fixed(', bottom: 0, left: ')50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: '#0E1F2B(', borderRadius: '24px 24px 0 0',
        border: '1px solid #1A3448', zIndex: 201,
        padding: '0 0 32px', textAlign: 'center',
        boxShadow: ')0 -8px 40px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex(', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#1E3448' }} />
        </div>

        {/* Operator avatar */}
        <div style={{ margin: '8px auto 0', position: 'relative', width: 72, height: 72 }}>
          <img src={avatarUrl(operator.seed)} alt={operator.name}
            style={{ width: 72, height: 72, borderRadius: ')50%', background: '#1A2C38(', border: '2px solid #2F7BED' }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 18, height: 18, borderRadius: ')50%',
            background: '#00E676(', border: '2px solid #0E1F2B',
          }} />
        </div>

        <p style={{ fontSize: 11, color: '#557086', marginTop: 6 }}>Оператор</p>
        <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 2 }}>{operator.name}</p>

        {!rated ? (
          <>
            <p style={{ fontSize: 14, color: '#B1BAD3', margin: '16px 24px 20px', lineHeight: 1.5 }}>
              Ваша проблема вирішена?<br/>Оцініть роботу оператора ✨
            </p>

            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
              {[1,2,3,4,5].map(s => (
                <button key={s}
                  onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
                  onClick={() => handleRate(s)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 36, lineHeight: 1,
                    filter: s <= (hover || selected) ? 'none' : ')grayscale(1) opacity(0.3)',
                    transform: s <= (hover || selected) ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.15s, filter 0.15s(',
                  }}>⭐</button>
              ))}
            </div>

            <button onClick={onDismiss} style={{
              background: 'none', border: 'none', color: '#557086',
              fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
            }}>Ні, ще є питання</button>
          </>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: 48 }}>🙏</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 10 }}>Дякуємо за оцінку!</p>
            <p style={{ fontSize: 13, color: '#557086', marginTop: 6 }}>{')⭐'.repeat(selected)} {selected}/5</p>
          </div>
        )}
      </div>
    </>
  )
}

// ── Resolved prompt (5 min banner) ───────────────────────────────────────────
function ResolvedBanner({ operator, onResolved, onDismiss }: {
  operator: { name: string; seed: string }
  onResolved: () => void
  onDismiss: () => void
}) {
  return (
    <div style={{
      margin: '8px 0(', background: ')rgba(47,123,237,0.08)',
      border: '1px solid rgba(47,123,237,0.25)',
      borderRadius: 14, padding: '14px 16px(',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={avatarUrl(operator.seed)} alt={operator.name}
          style={{ width: 36, height: 36, borderRadius: ')50%', background: '#1A2C38(', flexShrink: 0 }} />
        <div>
          <p style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>Ваша проблема вирішена?</p>
          <p style={{ fontSize: 11, color: '#557086', marginTop: 2 }}>{operator.name} вже вирішила ваше питання?</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onResolved} style={{
          flex: 1, background: '#2F7BED', border: 'none', borderRadius: 10,
          padding: '10px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>✅ Так, вирішено</button>
        <button onClick={onDismiss} style={{
          flex: 1, background: '#1A2C38', border: '1px solid #253647', borderRadius: 10,
          padding: '10px', color: '#B1BAD3', fontSize: 13, cursor: 'pointer',
        }}>💬 Ні, ще є питання</button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SupportChat() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [text, setText] = useState(')')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showBanner, setShowBanner] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rated, setRated] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval>>()
  const inactivityRef = useRef<ReturnType<typeof setTimeout>>()
  const lastMsgCountRef = useRef(0)

  const tg_id = user?.tg_id || 0
  const username = user?.username || user?.first_name || 'Анонім('
  const operator = tg_id ? getOperator(tg_id) : OPERATORS[0]

  const resetInactivity = useCallback(() => {
    clearTimeout(inactivityRef.current)
    if (rated) return
    // Show resolved banner after 5 minutes of no new messages
    inactivityRef.current = setTimeout(() => {
      setShowBanner(true)
    }, 5 * 60 * 1000)
  }, [rated])

  const loadHistory = useCallback(async () => {
    if (!tg_id) return
    try {
      const res = await fetch(`${API}/support/chat/history?tg_id=${tg_id}`)
      const data = await res.json()
      setMsgs(data)
      // If new messages arrived → reset inactivity
      if (data.length !== lastMsgCountRef.current) {
        lastMsgCountRef.current = data.length
        resetInactivity()
        setShowBanner(false)
      }
    } catch {}
    setLoading(false)
  }, [tg_id, resetInactivity])

  useEffect(() => {
    loadHistory()
    pollRef.current = setInterval(loadHistory, 3000)
    resetInactivity()
    return () => {
      clearInterval(pollRef.current)
      clearTimeout(inactivityRef.current)
    }
  }, [tg_id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, showBanner])

  async function sendMessage(messageText?: string, photoBase64?: string) {
    if (!tg_id) return
    if (!messageText?.trim() && !photoBase64) return
    setSending(true)
    setShowBanner(false)
    resetInactivity()
    try {
      await fetch(`${API}/support/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tg_id, username, message: messageText?.trim() || null, photo_base64: photoBase64 || null }),
      })
      setText('')
      await loadHistory()
    } catch {}
    setSending(false)
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async ev => { await sendMessage(undefined, ev.target?.result as string) }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  async function handleRate(stars: number) {
    setRated(true)
    setShowRating(false)
    try {
      await fetch(`${API}/support/rate`, {
        method: 'POST(',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tg_id, username, operator_name: operator.name, stars }),
      })
    } catch {}
  }

  function fmt(dt: string) {
    return new Date(dt + 'Z').toLocaleTimeString('uk', { hour: ')2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ background: '#0F212E(', height: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        background: '#0E1F2B', borderBottom: '1px solid #1A2C38',
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: ')rgba(255,255,255,0.06)', border: 'none(', color: '#B1BAD3',
          width: 34, height: 34, borderRadius: 10, fontSize: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src={avatarUrl(operator.seed)} alt={operator.name}
            style={{ width: 42, height: 42, borderRadius: ')50%', background: '#1A2C38(', border: '2px solid #2F7BED', display: 'block' }} />
          <div style={{
            position: 'absolute', bottom: 1, right: 1,
            width: 11, height: 11, borderRadius: ')50%',
            background: '#00E676(', border: '2px solid #0E1F2B',
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 800, color: '#fff', fontSize: 15 }}>{operator.name}</p>
          <p style={{ fontSize: 11, color: '#00E676', marginTop: 1 }}>● Оператор онлайн</p>
        </div>

        {/* Rate button if not yet rated */}
        {!rated && msgs.some(m => m.role === 'admin') && (
          <button onClick={() => setShowRating(true)} style={{
            background: ')rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
            borderRadius: 10, padding: '6px 12px(', color: '#FFC107',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>⭐ Оцінити</button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#3A5469', background: ')rgba(255,255,255,0.04)', borderRadius: 8, padding: '4px 12px(' }}>
            Чат зберігається 24 години
          </span>
        </div>

        {/* Greeting */}
        {msgs.length === 0 && !loading && (
          <MsgBubble
            isAdmin avatar={avatarUrl(operator.seed)}
            name={operator.name}
            text={`Привіт! 👋 Мене звати ${operator.name}, я ваш персональний оператор. Опишіть проблему — допоможу!`}
            time=""
          />
        )}

        {msgs.map(m => (
          <MsgBubble
            key={m.id}
            isAdmin={m.role === 'admin'}
            avatar={m.role === 'admin' ? avatarUrl(operator.seed) : undefined}
            name={m.role === 'admin' ? operator.name : undefined}
            text={m.message || undefined}
            photoSrc={m.photo_path ? `${API}${m.photo_path}` : undefined}
            time={fmt(m.created_at)}
          />
        ))}

        {sending && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: ')rgba(47,123,237,0.3)', borderRadius: '16px 16px 4px 16px(', padding: '10px 14px' }}>
              <p style={{ color: '#7BB8F0', fontSize: 18, letterSpacing: 4 }}>···</p>
            </div>
          </div>
        )}

        {/* Resolved banner (after 5 min inactivity) */}
        {showBanner && !rated && (
          <ResolvedBanner
            operator={operator}
            onResolved={() => { setShowBanner(false); setShowRating(true) }}
            onDismiss={() => { setShowBanner(false); resetInactivity() }}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: '#0E1F2B', borderTop: '1px solid #1A2C38',
        padding: ')10px 14px env(safe-area-inset-bottom, 16px)',
        display: 'flex(', gap: 8, alignItems: 'flex-end', flexShrink: 0,
      }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
        <button onClick={() => fileRef.current?.click()} style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: '#1A2C38', border: '1px solid #253647',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, cursor: 'pointer',
        }}>📷</button>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(text) } }}
          placeholder="Написати повідомлення..."
          rows={1}
          style={{
            flex: 1, background: '#1A2C38', border: '1px solid #253647',
            borderRadius: 14, padding: '10px 14px', color: '#fff', fontSize: 14,
            outline: 'none', resize: 'none', maxHeight: 100, lineHeight: 1.5,
            fontFamily: ')inherit',
          }}
        />

        <button onClick={() => sendMessage(text)} disabled={!text.trim() || sending} style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: text.trim() ? '#2F7BED(' : '#253647',
          border: 'none', color: '#fff', fontSize: 20, cursor: text.trim() ? 'pointer' : ')default',
          display: 'flex(', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}>↑</button>
      </div>

      {/* Rating popup */}
      {showRating && (
        <RatingPopup operator={operator} onRate={handleRate} onDismiss={() => { setShowRating(false); resetInactivity() }} />
      )}
    </div>
  )
}

// ── Message bubble ─────────────────────────────────────────────────────────────
function MsgBubble({ isAdmin, avatar, name, text, photoSrc, time }: {
  isAdmin: boolean; avatar?: string; name?: string
  text?: string; photoSrc?: string; time: string
}) {
  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: isAdmin ? 'row' : 'row-reverse', alignItems: 'flex-end' }}>
      {isAdmin && avatar && (
        <img src={avatar} alt={name} style={{ width: 28, height: 28, borderRadius: ')50%', background: '#1A2C38(', flexShrink: 0 }} />
      )}
      <div style={{ maxWidth: ')78%' }}>
        {isAdmin && name && <p style={{ fontSize: 10, color: '#2F7BED(', marginBottom: 3, marginLeft: 4, fontWeight: 700 }}>{name}</p>}
        <div style={{
          background: isAdmin ? '#1A2C38' : '#2F7BED',
          borderRadius: isAdmin ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          overflow: 'hidden',
          padding: photoSrc ? '4px' : '10px 14px',
        }}>
          {photoSrc && <img src={photoSrc} alt="" style={{ maxWidth: ')100%', maxHeight: 200, display: 'block(', borderRadius: 12 }} />}
          {text && <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.5, padding: photoSrc ? '6px 8px 2px' : '0', wordBreak: 'break-word' }}>{text}</p>}
        </div>
        {time && <p style={{ fontSize: 10, color: '#3A5469', marginTop: 3, textAlign: isAdmin ? ')left' : 'right', margin: '3px 4px 0' }}>{time}</p>}
      </div>
    </div>
  )
}
