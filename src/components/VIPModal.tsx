const LEVELS = [
  { name: 'Bronze I', color: '#cd7f32', wager: 0 },
  { name: 'Bronze II', color: '#cd7f32', wager: 1000 },
  { name: 'Bronze III', color: '#cd7f32', wager: 5000 },
  { name: 'Silver I', color: '#c0c0c0', wager: 10000 },
  { name: 'Silver II', color: '#c0c0c0', wager: 25000 },
  { name: 'Silver III', color: '#c0c0c0', wager: 50000 },
  { name: 'Gold I', color: '#ffd700', wager: 100000 },
  { name: 'Gold II', color: '#ffd700', wager: 250000 },
  { name: 'Gold III', color: '#ffd700', wager: 500000 },
  { name: 'Platinum I', color: '#e5e4e2', wager: 1000000 },
  { name: 'Platinum II', color: '#e5e4e2', wager: 2500000 },
  { name: 'Platinum III', color: '#e5e4e2', wager: 5000000 },
  { name: 'Platinum IV', color: '#e5e4e2', wager: 10000000 },
  { name: 'Diamond I', color: '#b9f2ff', wager: 25000000 },
  { name: 'Diamond II', color: '#b9f2ff', wager: 50000000 },
  { name: 'Diamond III', color: '#b9f2ff', wager: 100000000 },
  { name: 'Diamond IV', color: '#b9f2ff', wager: 250000000 },
  { name: 'Diamond V', color: '#b9f2ff', wager: 500000000 },
]

const BENEFITS = [
  { icon: '🔄', name: 'Reload', desc: 'Щоденне бонусне нарахування' },
  { icon: '💸', name: 'Rakeback', desc: 'Повернення частини ставок' },
  { icon: '📈', name: 'Weekly Boost', desc: 'Щотижневий бонус' },
  { icon: '🎁', name: 'Monthly Bonus', desc: 'Щомісячний ексклюзивний бонус' },
  { icon: '👔', name: 'VIP Manager', desc: 'Персональний менеджер (від Platinum)' },
]

export default function VIPModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const currentLevel = 0 // Bronze I
  const currentWager = 450
  const nextLevel = LEVELS[currentLevel + 1]
  const progress = nextLevel ? Math.min(100, (currentWager / nextLevel.wager) * 100) : 100

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 32px)', maxWidth: 440,
        background: '#1a2c38', borderRadius: 16,
        border: '1px solid #2d4a5a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        zIndex: 301, maxHeight: '85vh', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #2d4a5a',
        }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>⭐ VIP Програма</span>
          <button onClick={onClose} style={{
            background: '#213743', border: 'none', color: '#8a9bb0',
            width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>✕</button>
        </div>

        <div style={{ padding: 20 }}>
          {/* Current level */}
          <div style={{
            background: '#0f212e', borderRadius: 12, padding: 20, marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#8a9bb0' }}>Ваш рівень</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: LEVELS[currentLevel].color }}>
                  {LEVELS[currentLevel].name}
                </div>
              </div>
              {nextLevel && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#8a9bb0' }}>Наступний рівень</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: nextLevel.color }}>{nextLevel.name}</div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div style={{
              background: '#213743', borderRadius: 8, height: 8, overflow: 'hidden', marginBottom: 6,
            }}>
              <div style={{
                height: '100%', borderRadius: 8,
                background: `linear-gradient(90deg, ${LEVELS[currentLevel].color}, ${nextLevel?.color || LEVELS[currentLevel].color})`,
                width: `${progress}%`,
                transition: 'width 0.5s ease',
              }} />
            </div>
            <div style={{ fontSize: 11, color: '#557086' }}>
              ${currentWager.toLocaleString()} / ${nextLevel?.wager.toLocaleString() || '∞'}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Переваги VIP</div>
          {BENEFITS.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderBottom: '1px solid rgba(45,74,90,0.3)',
            }}>
              <span style={{ fontSize: 20 }}>{b.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{b.name}</div>
                <div style={{ fontSize: 11, color: '#557086' }}>{b.desc}</div>
              </div>
            </div>
          ))}

          {/* Levels grid */}
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 20, marginBottom: 12 }}>Рівні</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {LEVELS.map((l, i) => (
              <div key={i} style={{
                background: i === currentLevel ? l.color + '22' : '#0f212e',
                border: `1px solid ${i === currentLevel ? l.color + '55' : '#2d4a5a33'}`,
                borderRadius: 8, padding: '8px 6px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: l.color }}>{l.name}</div>
                <div style={{ fontSize: 8, color: '#557086', marginTop: 2 }}>${l.wager >= 1e6 ? (l.wager / 1e6).toFixed(0) + 'M' : l.wager >= 1000 ? (l.wager / 1000).toFixed(0) + 'K' : l.wager}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
