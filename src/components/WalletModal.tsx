import { useState } from 'react'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

const TABS = ['Огляд', 'Купити крипту', 'Обмін']

const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: '#f7931a', balance: 0.00000 },
  { symbol: 'SOL', name: 'Solana', icon: '◎', color: '#9945ff', balance: 0.000 },
  { symbol: 'USDT', name: 'Tether', icon: '₮', color: '#26a17b', balance: 0 },
  { symbol: 'TON', name: 'Toncoin', icon: '💎', color: '#0098ea', balance: 0.000 },
]

export default function WalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState(0)
  const { user } = useUser()
  const navigate = useNavigate()
  const balance = user?.balance ?? 0

  if (!open) return null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 32px)', maxWidth: 440,
        background: '#1a2c38', borderRadius: 16,
        border: '1px solid #2d4a5a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        zIndex: 301, overflow: 'hidden',
        maxHeight: '85vh', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #2d4a5a',
        }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>Гаманець</span>
          <button onClick={onClose} style={{
            background: '#213743', border: 'none', color: '#8a9bb0',
            width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #2d4a5a' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: 1, padding: '12px 0', background: 'none', border: 'none',
              borderBottom: tab === i ? '2px solid #00d4aa' : '2px solid transparent',
              color: tab === i ? '#fff' : '#557086',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 20 }}>
          {tab === 0 && (
            <>
              {/* Total balance */}
              <div style={{
                background: '#0f212e', borderRadius: 12, padding: 20,
                textAlign: 'center', marginBottom: 16,
              }}>
                <div style={{ fontSize: 12, color: '#8a9bb0', marginBottom: 4 }}>Загальний баланс</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>${balance.toFixed(2)}</div>
                <div style={{ fontSize: 12, color: '#00d4aa', marginTop: 2 }}>USDT</div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <button onClick={() => { onClose(); navigate('/deposit') }} style={{
                  flex: 1, padding: '12px 0', borderRadius: 8,
                  background: '#00d4aa', border: 'none',
                  color: '#0f212e', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer',
                }}>{'Поповнити'}</button>
                <button onClick={() => { onClose(); navigate('/withdraw') }} style={{
                  flex: 1, padding: '12px 0', borderRadius: 8,
                  background: '#213743', border: '1px solid #2d4a5a',
                  color: '#fff', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer',
                }}>Вивід</button>
              </div>

              {/* Currency list */}
              <div style={{ fontSize: 12, color: '#557086', marginBottom: 10, fontWeight: 600 }}>Валюти</div>
              {CURRENCIES.map(c => (
                <div key={c.symbol} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0', borderBottom: '1px solid rgba(45,74,90,0.3)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: c.color + '20', border: `1.5px solid ${c.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: c.color,
                  }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{c.symbol}</div>
                    <div style={{ fontSize: 11, color: '#557086' }}>{c.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>
                      {c.symbol === 'USDT' ? balance.toFixed(2) : c.balance.toFixed(c.symbol === 'BTC' ? 5 : 3)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {tab === 1 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#557086' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
              <p style={{ fontWeight: 600 }}>Незабаром</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Функція в розробці</p>
            </div>
          )}
          {tab === 2 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#557086' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔄</div>
              <p style={{ fontWeight: 600 }}>Незабаром</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Функція в розробці</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
