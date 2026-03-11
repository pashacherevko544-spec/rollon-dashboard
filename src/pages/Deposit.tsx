import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useUser } from '../hooks/useUser'

export default function Deposit() {
  const navigate = useNavigate()
  const { refreshUser } = useUser()
  const [amount, setAmount] = useState(10)
  const [currency, setCurrency] = useState('USDT')
  const [invoice, setInvoice] = useState<any>(null)
  const [checking, setChecking] = useState(false)
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  const AMOUNTS = [5, 10, 25, 50, 100, 250]
  const CURRENCIES = [
    { id: 'USDT', label: 'USDT', icon: '₮', color: '#26A17B' },
    { id: 'TON',  label: 'TON',  icon: '◎', color: '#0098EA' },
    { id: 'BTC',  label: 'BTC',  icon: '₿', color: '#F7931A' },
  ]

  async function createInvoice() {
    setLoading(true)
    try {
      const inv = await api.deposit(amount, currency)
      setInvoice(inv)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function checkPayment() {
    if (!invoice) return
    setChecking(true)
    try {
      const res = await api.checkDeposit(String(invoice.invoice_id), amount)
      if (res.paid) {
        setPaid(true)
        await refreshUser()
      } else {
        alert('Оплата ще не знайдена. Спробуй через хвилину.')
      }
    } catch (e: any) {
      alert(e.message)
    } finally {
      setChecking(false)
    }
  }

  if (paid) return (
    <div style={{ background: '#0F212E', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 }}>
      <div style={{ fontSize: 72 }}>✅</div>
      <p style={{ fontSize: 24, fontWeight: 900, color: '#00E676' }}>Поповнення успішно!</p>
      <p style={{ color: '#B1BAD3', textAlign: 'center' }}>+${amount} {currency} зараховано на баланс</p>
      <button onClick={() => navigate('/')}
        style={{ padding: '14px 40px', borderRadius: 12, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
        🎮 Грати
      </button>
    </div>
  )

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <div style={{ background: '#0F212E', borderBottom: '1px solid #1A2C38', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>💳 Поповнення</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {!invoice ? (
          <>
            {/* Currency */}
            <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
              <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Валюта</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {CURRENCIES.map(c => (
                  <button key={c.id} onClick={() => setCurrency(c.id)}
                    style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${currency === c.id ? c.color : '#2A3D4D'}`, background: currency === c.id ? `${c.color}22` : '#213743', color: currency === c.id ? '#fff' : '#B1BAD3', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                    <span style={{ color: c.color }}>{c.icon}</span> {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div style={{ background: '#1A2C38', borderRadius: 16, padding: 16 }}>
              <p style={{ fontSize: 12, color: '#7F8C9B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Сума</p>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {AMOUNTS.map(a => (
                  <button key={a} onClick={() => setAmount(a)}
                    style={{ padding: '9px 0', borderRadius: 8, background: amount === a ? '#2F7BED' : '#213743', border: `1px solid ${amount === a ? '#2F7BED' : '#2A3D4D'}`, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    ${a}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ background: '#1A2C38', borderRadius: 12, padding: 14, border: '1px solid #2A3D4D' }}>
              <p style={{ fontSize: 13, color: '#B1BAD3', lineHeight: 1.6 }}>
                💡 Оплата через <b style={{ color: '#fff' }}>@CryptoBot</b> — безпечно і миттєво. Після оплати натисни «Перевірити».
              </p>
            </div>

            <button onClick={createInvoice} disabled={loading || amount < 0.5}
              style={{ width: '100%', padding: 16, borderRadius: 12, background: '#2F7BED', border: 'none', color: '#fff', fontSize: 17, fontWeight: 800, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Створюю рахунок...' : `💳 ${'Поповнити'} $${amount} ${currency}`}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#1A2C38', borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#7F8C9B', marginBottom: 8 }}>Рахунок створено</p>
              <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 4 }}>${amount} {currency}</p>
              <p style={{ fontSize: 12, color: '#7F8C9B' }}>ID: {invoice.invoice_id}</p>
            </div>

            <a href={invoice.pay_url} target="_blank" rel="noreferrer"
              style={{ display: 'block', width: '100%', padding: 16, borderRadius: 12, background: '#2F7BED', color: '#fff', fontSize: 17, fontWeight: 800, textAlign: 'center', textDecoration: 'none' }}>
              🤖 Оплатити через @CryptoBot
            </a>

            <button onClick={checkPayment} disabled={checking}
              style={{ width: '100%', padding: 14, borderRadius: 12, background: '#213743', border: '1px solid #2A3D4D', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: checking ? 0.7 : 1 }}>
              {checking ? 'Перевіряю...' : '✅ Я оплатив — перевірити'}
            </button>

            <button onClick={() => setInvoice(null)}
              style={{ background: 'none', border: 'none', color: '#7F8C9B', fontSize: 13, cursor: 'pointer', padding: 8 }}>
              ← Назад
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
