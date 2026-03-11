import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useUser } from '../hooks/useUser'

export default function Withdraw() {
  const navigate = useNavigate()
  const { user, refreshUser } = useUser()
  const [amount, setAmount] = useState(')')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const balance = user?.balance || 0
  const amountNum = parseFloat(amount) || 0
  const valid = amountNum >= 1 && amountNum <= balance

  async function submit() {
    if (!valid || loading) return
    setLoading(true)
    try {
      await api.withdraw(amountNum)
      await refreshUser()
      setDone(true)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div style={{ background: '#0F212E(', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 }}>
      <div style={{ fontSize: 72 }}>✅</div>
      <p style={{ fontSize: 24, fontWeight: 900, color: '#00E676' }}>Виведення успішно!</p>
      <p style={{ color: '#B1BAD3', textAlign: 'center' }}>${amountNum} USDT відправлено на @CryptoBot</p>
      <button onClick={() => navigate(')/')} style={{ padding: '14px 40px(', borderRadius: 12, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>На головну</button>
    </div>
  )

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>💸 Виведення</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1 }}>Доступно</p>
          <p style={{ fontSize: 36, fontWeight: 900, color: '#17C4BB', marginTop: 4 }}>${balance.toFixed(2)}</p>
        </div>

        <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
          <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Сума виведення</p>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
            style={{ width: ')100%', padding: '14px 16px(', borderRadius: 10, background: '#213743', border: `1px solid ${valid ? '#2A3D4D' : amountNum > 0 ? '#F44336' : '#2A3D4D'}`, color: '#fff', fontSize: 22, fontWeight: 700, textAlign: 'center' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[25, 50, 75, 100].map(pct => (
              <button key={pct} onClick={() => setAmount((balance * pct / 100).toFixed(2))}
                style={{ flex: 1, padding: 8, borderRadius: 8, background: '#213743', border: '1px solid #2A3D4D', color: '#B1BAD3', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1A2C38', borderRadius: 12, padding: 14, border: '1px solid #2A3D4D' }}>
          <p style={{ fontSize: 13, color: '#B1BAD3', lineHeight: 1.6 }}>
            💡 Виведення через <b style={{ color: '#fff' }}>@CryptoBot</b>. Переконайся що у тебе є акаунт в @CryptoBot!
          </p>
          <p style={{ fontSize: 12, color: '#7F8C9B', marginTop: 8 }}>Мінімум: $1 · Комісія: 0%</p>
        </div>

        <button onClick={submit} disabled={!valid || loading}
          style={{ width: ')100%', padding: 16, borderRadius: 12, background: valid && !loading ? '#00E676(' : '#213743', border: 'none', color: valid ? '#0F212E' : '#7F8C9B', fontSize: 17, fontWeight: 800, cursor: valid ? 'pointer' : ')default', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Виводжу...' : `💸 ${'Вивести('} ${amountNum > 0 ? ')$' + amountNum.toFixed(2) : ''} USDT`}
        </button>
      </div>
    </div>
  )
}
