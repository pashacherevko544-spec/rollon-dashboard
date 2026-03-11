import { useState } from 'react'


const SOCIALS = [
  { icon: '✉️', label: 'Email', href: 'mailto:support@rollon.casino' },
  { icon: '💬', label: 'Telegram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
]

export default function Footer() {
  const SECTIONS = [
    { title: 'Казино', items: ['Оригінальні ігри', 'Слоти', 'Live Casino', 'Провайдери', 'VIP клуб'] },
    { title: 'Sport', items: ['Lines', 'Live Bets', 'Esports', 'Results'] },
    { title: 'Help', items: ['FAQ', 'Підтримка', 'Fair Play', 'Verification'] },
    { title: 'Про нас', items: ['Про ROLLON', 'Партнерська програма', 'Блог', 'Карʼєра'] },
    { title: 'Payments', items: ['Deposit Methods', 'Withdrawals', 'Limits', 'Crypto'] },
  ]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ background: '#0A1720', borderTop: '1px solid #1A2C38', marginBottom: 8 }}>

      {/* Accordion */}
      <div>
        {SECTIONS.map((s, i) => (
          <div key={s.title} style={{ borderBottom: '1px solid #1A2C38' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '15px 16px', background: 'none', border: 'none',
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {s.title}
              <span style={{
                fontSize: 10, color: '#557086',
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s', display: 'inline-block',
              }}>▼</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.items.map(item => (
                  <a key={item} href="#" style={{ color: '#7F8FA4', fontSize: 13, textDecoration: 'none' }}
                    onClick={e => e.preventDefault()}>{item}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Socials */}
      <div style={{ padding: '20px 16px', display: 'flex', gap: 12, justifyContent: 'center' }}>
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href}
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#1A2C38', border: '1px solid #253647',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, textDecoration: 'none',
            }}
            title={s.label}
          >{s.icon}</a>
        ))}
      </div>

      {/* Currency */}
      <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#1A2C38', borderRadius: 10, padding: '8px 16px',
          border: '1px solid #253647', fontSize: 12, color: '#B1BAD3',
        }}>
          <span style={{ color: '#17C4BB', fontWeight: 700 }}>₮</span>
          <span>1 USDT = $1.00</span>
        </div>
      </div>

      {/* Legal */}
      <div style={{ padding: '0 16px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#3D5468', lineHeight: 1.7 }}>
          {'© 2026 ROLLON Casino. Всі права захищені.'}<br />
          Rollon N.V., реєстраційний номер 145353, Curaçao.<br />
          Ліцензія на азартні ігри: GCB/2024/0001
        </p>
        <p style={{ fontSize: 11, color: '#3D5468', marginTop: 10, lineHeight: 1.7 }}>
          Азартні ігри можуть викликати залежність.<br />
          Грайте відповідально.{' '}
          <a href="https://www.gamblingtherapy.org" target="_blank" rel="noreferrer"
            style={{ color: '#557086', textDecoration: 'underline' }}>
            GamblingTherapy.org
          </a>
        </p>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>
            R<span style={{ color: '#2F7BED' }}>◆</span>LLON
          </span>
          <div style={{
            background: '#00a86b', borderRadius: 6, padding: '4px 10px',
            fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 0.5,
          }}>✓ GCB CERT</div>
        </div>
      </div>
    </div>
  )
}
