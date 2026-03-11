import { useState } from 'react'
import { API } from '../utils/api'
import { useUser } from '../hooks/useUser'

export default function SupportModal({ onClose }: { onClose: () => void }) {
  const { user } = useUser()
  const [step, setStep] = useState<'form' | 'sent'>('form')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    if (!message.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/support/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          username: user?.username || user?.first_name || null,
          tg_id: user?.tg_id || null,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('sent')
      } else {
        setError('Помилка. Спробуй ще раз.')
      }
    } catch {
      setError('Помилка з'єднання.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300,
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: '#0E1F2B', borderRadius: '20px 20px 0 0',
        border: '1px solid #1A3448', zIndex: 301,
        padding: '0 0 24px',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#2A3D4D' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(47,123,237,0.15)', border: '1px solid rgba(47,123,237,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🎧</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Підтримка</p>
              <p style={{ fontSize: 11, color: '#557086', marginTop: 1 }}>Зазвичай відповідаємо за 30 хв</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#B1BAD3', fontSize: 16, cursor: 'pointer', width: 30, height: 30, borderRadius: 8 }}>✕</button>
        </div>

        {step === 'form' ? (
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Quick topics */}
            <div>
              <p style={{ fontSize: 11, color: '#557086', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>Часті запити</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Проблема з депозитом', 'Проблема з виводом', 'Технічна помилка', 'Питання про бонуси', 'Інше'].map(t => (
                  <button key={t} onClick={() => setMessage(t)}
                    style={{
                      background: message === t ? 'rgba(47,123,237,0.2)' : '#1A2C38',
                      border: `1px solid ${message === t ? '#2F7BED' : '#253647'}`,
                      borderRadius: 8, padding: '6px 12px', fontSize: 12,
                      color: message === t ? '#2F7BED' : '#B1BAD3',
                      cursor: 'pointer', fontWeight: message === t ? 700 : 400,
                    }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div>
              <p style={{ fontSize: 11, color: '#557086', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>Опиши проблему</p>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Опиши свою проблему докладно..."
                rows={4}
                style={{
                  width: '100%', background: '#1A2C38', border: '1px solid #253647',
                  borderRadius: 12, padding: '12px 14px', color: '#fff', fontSize: 14,
                  outline: 'none', resize: 'none', lineHeight: 1.5,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && <p style={{ fontSize: 12, color: '#e74c3c' }}>{error}</p>}

            <button
              onClick={submit}
              disabled={!message.trim() || loading}
              style={{
                width: '100%', padding: 16, borderRadius: 14,
                background: message.trim() ? '#2F7BED' : '#1A2C38',
                border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                cursor: message.trim() ? 'pointer' : 'default',
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s',
              }}
            >
              {loading ? '⏳ Надсилаємо...' : '📨 ' + 'Надіслати'}
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 8 }}>Тікет надіслано!</p>
            <p style={{ fontSize: 14, color: '#7F8C9B', lineHeight: 1.6, marginBottom: 24 }}>
              Ми отримали твій запит і відповімо<br/>найближчим часом у цьому чаті 💬
            </p>
            <button onClick={onClose} style={{
              background: '#2F7BED', border: 'none', borderRadius: 14,
              padding: '14px 40px', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }>{'Закрити'}</button>
          </div>
        )}
      </div>
    </>
  )
}
