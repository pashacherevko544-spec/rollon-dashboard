import { useState } from 'react'

export default function Transactions() {
  const [tab, setTab] = useState(0)

  const TABS = [
    'Поповнити', 'Вивести', 'Bonus', 'Raffle', 'Tournament', 'Немає даних'
  ]
  const EMPTY_MSGS = [
    'Немає даних', 'Немає даних', 'Немає даних', 'Немає даних', 'Немає даних', 'Немає даних'
  ]

  return (
    <div>
      <div style={{ padding: '16px 16px 0' }}>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>📋 {'Транзакції'}</h2>
      </div>

      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #2d4a5a', marginTop: 12, scrollbarWidth: 'none' }}>
        {TABS.map((label, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flexShrink: 0, padding: '10px 14px', background: 'none', border: 'none',
            borderBottom: tab === i ? '2px solid #00d4aa' : '2px solid transparent',
            color: tab === i ? '#fff' : '#557086',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: 50, color: '#557086' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>
          {['📥', '📤', '🎁', '🎰', '🏆', '📋'][tab]}
        </div>
        <p style={{ fontWeight: 600, fontSize: 14 }}>{EMPTY_MSGS[tab]}</p>
        <p style={{ fontSize: 12, marginTop: 4, color: '#3a5469' }}>{"Транзакції з'являться тут"}</p>
      </div>
    </div>
  )
}
