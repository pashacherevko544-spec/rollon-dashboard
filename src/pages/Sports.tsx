import { useNavigate } from 'react-router-dom'

const SPORTS = [
  { icon: '⚽', name: 'Футбол', events: 142 },
  { icon: '🎾', name: 'Теніс', events: 67 },
  { icon: '🏀', name: 'Баскетбол', events: 45 },
  { icon: '🏒', name: 'Хокей', events: 23 },
  { icon: '🎮', name: 'CS2', events: 18, esport: true },
  { icon: '🎮', name: 'Dota 2', events: 12, esport: true },
  { icon: '🏈', name: 'Американський футбол', events: 8 },
  { icon: '⚾', name: 'Бейсбол', events: 15 },
  { icon: '🥊', name: 'Бокс / MMA', events: 6 },
  { icon: '🏐', name: 'Волейбол', events: 21 },
  { icon: '🎮', name: 'League of Legends', events: 9, esport: true },
  { icon: '🏓', name: 'Настільний теніс', events: 34 },
]

const totalLive = SPORTS.reduce((s, x) => s + x.events, 0)

export default function Sports() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Header banner */}
      <div style={{
        margin: '12px 16px', padding: 20, borderRadius: 12,
        background: 'linear-gradient(135deg, #f59e0b22, #f59e0b08)',
        border: '1px solid #f59e0b33',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ fontWeight: 800, fontSize: 18, color: '#f59e0b' }}>Live Events</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{totalLive}</div>
        <div style={{ fontSize: 12, color: '#8a9bb0', marginTop: 2 }}>подій прямо зараз</div>
      </div>

      {/* Sports list */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Спорт</div>
        {SPORTS.filter(s => !s.esport).map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 0', borderBottom: '1px solid rgba(45,74,90,0.3)',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{s.name}</div>
            </div>
            <div style={{
              background: '#f59e0b18', border: '1px solid #f59e0b33',
              borderRadius: 6, padding: '3px 8px',
              fontSize: 11, fontWeight: 700, color: '#f59e0b',
            }}>{s.events}</div>
            <span style={{ color: '#557086' }}>›</span>
          </div>
        ))}

        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 20, marginBottom: 12 }}>Кіберспорт</div>
        {SPORTS.filter(s => s.esport).map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 0', borderBottom: '1px solid rgba(45,74,90,0.3)',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{s.name}</div>
            </div>
            <div style={{
              background: '#1475e118', border: '1px solid #1475e133',
              borderRadius: 6, padding: '3px 8px',
              fontSize: 11, fontWeight: 700, color: '#1475e1',
            }}>{s.events}</div>
            <span style={{ color: '#557086' }}>›</span>
          </div>
        ))}
      </div>

      {/* Coming soon note */}
      <div style={{ textAlign: 'center', padding: '30px 16px', color: '#557086' }}>
        <p style={{ fontSize: 13 }}>Ставки на спорт — незабаром 🚀</p>
      </div>
    </div>
  )
}
