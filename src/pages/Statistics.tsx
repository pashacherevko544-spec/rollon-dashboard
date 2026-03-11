import { useUser } from '../hooks/useUser'

export default function Statistics() {
  const { user } = useUser()

  const stats = [
    { label: 'Всього ставок', value: user?.games_played ?? 0, icon: '🎲', color: '#1475e1' },
    { label: 'Виграшів', value: `$${(user?.total_won ?? 0).toFixed(2)}`, icon: '💰', color: '#00e701' },
    { label: 'Програшів', value: `$${(user?.total_lost ?? 0).toFixed(2)}`, icon: '📉', color: '#ed4163' },
    { label: 'Поставлено', value: `$${((user?.total_won ?? 0) + (user?.total_lost ?? 0)).toFixed(2)}`, icon: '🔄', color: '#f59e0b' },
    { label: 'Поповнити', value: `$${(user?.total_deposited ?? 0).toFixed(2)}`, icon: '📥', color: '#00d4aa' },
    { label: 'Вивести', value: `$${(user?.total_withdrawn ?? 0).toFixed(2)}`, icon: '📤', color: '#9b59b6' },
  ]

  return (
    <div>
      <div style={{ padding: '16px 16px 8px' }}>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>📊 {'Статистика'}</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '12px 16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#213743', borderRadius: 12, padding: 16, border: '1px solid #2d4a5a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color: '#557086', fontWeight: 600 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>
              {typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', display: 'flex', gap: 8 }}>
        {['Все', 'Казино', 'Слоти'].map((f, i) => (
          <button key={f} style={{
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: i === 0 ? '#00d4aa' : '#213743',
            color: i === 0 ? '#0f212e' : '#8a9bb0',
            fontWeight: 600, fontSize: 12, cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>
    </div>
  )
}
