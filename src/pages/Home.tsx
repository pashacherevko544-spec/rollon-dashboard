import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import bngGames from '../data/bng_games.json'
import gdriveImages from '../data/gdrive_images.json'

const C = {
  bg: '#0f212e', card: '#213743', accent: '#00d4aa',
  text: '#fff', sub: '#8a9bb0', border: '#2d4a5a',
  red: '#ef4444', green: '#22c55e', orange: '#f59e0b',
  hot: '#ef4444', orig: '#1475e1',
}

// ── Promo Banner ──────────────────────────────────────────────────────────────
const BANNERS_STATIC = [
  { badge: 'NEW', titleKey: 'hero_welcome_title', subKey: 'hero_welcome_sub', ctaKey: 'play_now', color: '#1475e1', emoji: '🎰' },
  { badge: 'HOT', title: 'Rollon Originals', subKey: 'hero_originals_sub', ctaKey: 'btn_play', color: '#00d4aa', emoji: '⚡' },
  { badge: 'VIP', title: 'VIP Program', sub: 'Bonuses, cashback & personal manager', cta: 'VIP →', color: '#a855f7', emoji: '💎' },
  { badge: 'LIVE', title: 'Live Casino', sub: 'Lightning Roulette, Crazy Time & more', cta: 'Watch Live', color: '#ef4444', emoji: '🎲' },
]

function PromoBanner() {
  const [idx, setIdx] = useState(0)
  const UK: Record<string,string> = {
    hero_welcome_title: 'Ласкаво просимо до Rollon',
    hero_welcome_sub: 'Грай у найкращі слоти від BGaming',
    hero_originals_sub: 'Mines, Aviator, Plinko та ще 8 ігор',
    play_now: 'Грати зараз',
    btn_play: 'Грати',
  }
  const BANNERS = BANNERS_STATIC.map(b => ({
    ...b,
    title: b.title || (b.titleKey ? UK[b.titleKey] : ''),
    sub: b.sub || (b.subKey ? UK[b.subKey] : ''),
    cta: b.cta || (b.ctaKey ? UK[b.ctaKey] : ''),
  }))
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000)
    return () => clearInterval(timer)
  }, [])
  const b = BANNERS[idx]
  return (
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{
        background: `linear-gradient(135deg, ${b.color}22, ${C.card})`,
        border: `1px solid ${b.color}44`,
        borderRadius: 16, padding: '18px 16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <span style={{
          background: b.color, color: '#fff', fontWeight: 800,
          fontSize: 10, padding: '2px 8px', borderRadius: 20, letterSpacing: 1,
        }}>{b.badge}</span>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>{b.title}</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 4 }}>{b.sub}</div>
        </div>
        <button style={{
          marginTop: 14, background: b.color, border: 'none',
          borderRadius: 10, padding: '9px 18px',
          color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer',
        }}>{b.cta}</button>
        <div style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          fontSize: 64, opacity: 0.15,
        }}>{b.emoji}</div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 5, marginTop: 12 }}>
          {BANNERS.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 16 : 6, height: 6,
              borderRadius: 3, background: i === idx ? b.color : C.border,
              cursor: 'pointer', transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Category Tabs ─────────────────────────────────────────────────────────────
function CategoryTabs({ active, onChange }: { active: string, onChange: (key: string) => void }) {
  const tabs = [
    { key: 'casino', label: 'Casino', icon: '🎰' },
    { key: 'slots', label: 'Слоти', icon: '🎮' },
    { key: 'live', label: 'Live', icon: '📺' },
    { key: 'sports', label: 'Sport', icon: '⚽', soon: true },
  ]
  return (
    <div style={{ display: 'flex', gap: 8, padding: '14px 14px 0', overflowX: 'auto' }}>
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => !tab.soon && onChange(tab.key)} style={{
          background: active === tab.key ? C.accent : C.card,
          border: `1px solid ${active === tab.key ? C.accent : C.border}`,
          borderRadius: 20, padding: '7px 14px',
          color: active === tab.key ? '#0f212e' : C.sub,
          fontWeight: 700, fontSize: 13, cursor: tab.soon ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          flexShrink: 0, position: 'relative',
        }}>
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
          {tab.soon && (
            <span style={{
              background: C.orange, color: '#fff',
              fontSize: 8, fontWeight: 800, padding: '1px 5px',
              borderRadius: 20, letterSpacing: 0.5,
            }}>SOON</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Two Big Cards ─────────────────────────────────────────────────────────────
function BigCards() {
  const nav = useNavigate()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 14px 0' }}>
      <div onClick={() => nav('/games')} style={{
        background: 'linear-gradient(135deg, #1a3a4a, #213743)',
        border: `1px solid ${C.border}`, borderRadius: 14,
        padding: '16px 12px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🎰</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Казино</div>
        <div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>13 ігор</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>18 432 грають</span>
        </div>
        <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 60, opacity: 0.08 }}>🎰</div>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #1a2a1a, #1f3022)',
        border: `1px solid #2d5a2d`, borderRadius: 14,
        padding: '16px 12px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>⚽</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Спорт</div>
        <div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>{'Ставка'}</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: '#f59e0b22', border: '1px solid #f59e0b44',
          borderRadius: 20, padding: '3px 8px', marginTop: 6,
        }}>
          <span style={{ fontSize: 10 }}>🚀</span>
          <span style={{ fontSize: 10, color: C.orange, fontWeight: 700 }}>Скоро</span>
        </div>
      </div>
    </div>
  )
}

// ── Search Bar ────────────────────────────────────────────────────────────────
function SearchBar() {
  return (
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke={C.sub} strokeWidth="2"/>
          <path d="M20 20l-4-4" stroke={C.sub} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 13, color: C.sub }}>Знайди свою гру...</span>
      </div>
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, count, onAll }: { icon: string, title: string, count?: string, onAll?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{title}</span>
      </div>
      {count && (
        <button onClick={onAll} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.accent, fontSize: 13, fontWeight: 700,
        }}>Усі {count} &gt;</button>
      )}
    </div>
  )
}

// ── Original Game Card ────────────────────────────────────────────────────────
const ORIG_GAMES = [
  { id: 'mines', name: 'Mines', path: '/game/mines', color: '#1a4a2e', emoji: '💣', players: '3 241' },
  { id: 'aviator', name: 'Aviator', path: '/game/aviator', color: '#4a1a1a', emoji: '✈️', players: '5 832' },
  { id: 'plinko', name: 'Plinko', path: '/game/plinko', color: '#2a1a4a', emoji: '🎯', players: '2 109' },
  { id: 'chicken', name: 'Chicken', path: '/game/chicken', color: '#4a3a1a', emoji: '🐔', players: '1 874' },
  { id: 'dice', name: 'Dice', path: '/game/dice', color: '#1a3a4a', emoji: '🎲', players: '2 456' },
  { id: 'limbo', name: 'Limbo', path: '/game/limbo', color: '#3a1a4a', emoji: '🌊', players: '987' },
  { id: 'wheel', name: 'Wheel', path: '/game/wheel', color: '#4a2a1a', emoji: '🎡', players: '1 203' },
  { id: 'flip', name: 'Flip', path: '/game/flip', color: '#1a4a3a', emoji: '🪙', players: '654' },
  { id: 'hilo', name: 'Hi-Lo', path: '/game/hilo', color: '#1a2a4a', emoji: '🃏', players: '743' },
  { id: 'keno', name: 'Keno', path: '/game/keno', color: '#4a1a3a', emoji: '🔢', players: '1 284' },
  { id: 'dragon', name: 'Dragon', path: '/game/dragon', color: '#2a4a1a', emoji: '🐉', players: '1 923' },
]

function OriginalCard({ game }: { game: typeof ORIG_GAMES[0] }) {
  const nav = useNavigate()
  return (
    <div onClick={() => nav(game.path)} style={{
      background: `linear-gradient(135deg, ${game.color}, #213743)`,
      border: `1px solid ${C.border}`, borderRadius: 14,
      width: 130, flexShrink: 0, cursor: 'pointer', overflow: 'hidden',
    }}>
      <div style={{
        height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44,
      }}>{game.emoji}</div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{
          display: 'inline-block', background: C.orig,
          color: '#fff', fontSize: 9, fontWeight: 800,
          padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5, marginBottom: 4,
        }}>ORIGINAL</div>
        <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{game.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: 10, color: C.sub }}>{game.players}</span>
        </div>
      </div>
    </div>
  )
}

// ── Provider Game Card ────────────────────────────────────────────────────────
function ProviderCard({ name, badge, color, imgUrl, players, onClick }: any) {
  return (
    <div onClick={onClick} style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 14, width: 110, flexShrink: 0, cursor: 'pointer', overflow: 'hidden',
    }}>
      <div style={{
        width: '100%', aspectRatio: '3/4', background: '#1a2c38',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        {imgUrl ? (
          <img src={imgUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: 36 }}>🎰</span>
        )}
        <div style={{
          position: 'absolute', top: 6, left: 6,
          background: color, color: '#fff',
          fontSize: 8, fontWeight: 800, padding: '2px 5px', borderRadius: 4,
        }}>{badge}</div>
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        {players && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.green }} />
            <span style={{ fontSize: 10, color: C.sub }}>{players}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Live Section ──────────────────────────────────────────────────────────────
const LIVE_GAMES = [
  { name: 'Live Roulette', emoji: '🎡', players: '2 841', desc: 'До 35х на число', color: '#1a3a1a' },
  { name: 'Dragon Tower', emoji: '🐉', players: '1 923', desc: 'Лізь вище!', color: '#2a1a1a' },
  { name: 'Pump', emoji: '🎈', players: '744', desc: 'Накачай або забирай!', color: '#1a1a3a' },
  { name: 'Keno', emoji: '🔢', players: '1 284', desc: '7, 14, 42, 9, 11...', color: '#1a2a3a' },
]

const LIVE_CASINO = [
  { name: 'Lightning Roulette', emoji: '⚡', players: '8 420', hot: true },
  { name: 'Crazy Time', emoji: '🎪', players: '12 800', hot: true },
  { name: 'Monopoly Live', emoji: '🎩', players: '7 340', hot: false },
]

const PROVIDERS = [
  { key: 'bgaming', label: 'BGAMING', count: '182+ ігор', color: '#1475e1' },
  { key: 'pragmatic', label: 'PRAGMATIC', count: '300+ ігор', color: '#f59e0b' },
  { key: 'evolution', label: 'EVOLUTION', count: '120+ ігор', color: '#ef4444' },
  { key: 'netent', label: 'NETENT', count: '200+ ігор', color: '#a855f7' },
]

// 🌞 Літня підбірка — тільки ігри з картинками
const SUMMER_SLOTS = [
  { id: 'power_sun_xxl',           name: 'Power Sun XXL',           gdrive: '1Cp5CPJV_qvnndmAkyJcnaNNdw0PSDkND' },
  { id: 'sun_of_egypt_5',          name: 'Sun of Egypt 5',          gdrive: '1Km7GCp53JPsPoBm3FkQ2ovT-8u3mso-9' },
  { id: 'pirate_chest',            name: 'Pirate Chest',            gdrive: '1FhxiHMu4IR6gA6GO9nAIivQA3WNLNo6I' },
  { id: 'pearl_diver_2',           name: 'Pearl Diver 2',           gdrive: '13UIVXebhlt3w7-fVbAyO0MScPAFsWdy2' },
  { id: 'queen_of_the_sun',        name: 'Queen of the Sun',        gdrive: '1-xFGJEOuKSGck8ossCJQvqyBwy54nKvv' },
  { id: 'sunlight_princess',       name: 'Sunlight Princess',       gdrive: '1X17-HE6KFlQo2u5ahw7i03YEHS4dXmHY' },
  { id: 'aztec_sun',               name: 'Aztec Sun',               gdrive: '1P1qpYTrDUM0N1dy-DsHiTN4WkAyFPpMu' },
  { id: 'book_of_sun_multichance', name: 'Book of Sun',             gdrive: '1IFS2WXWS1hMsZpgLGEUOG907oSRv_box' },
  { id: '3_pirate_barrels',        name: '3 Pirate Barrels',        gdrive: '1M0KO1YV7IjrDWh60Sx0cke1UHtz9v513' },
  { id: 'sun_of_egypt',            name: 'Sun of Egypt',            gdrive: '18kDw6oGf5pvReGaHGpQixAAvfxuGGDak' },
  { id: 'african_spirit_sticky_wilds', name: 'African Spirit',      gdrive: '1Hu2PnLFZfbf2gPgWPiYZefkA0RBACo46' },
  { id: 'treasures_fire',          name: 'Treasures of Fire',       gdrive: '11qS1jLN6Nqb1XdVw7d70-zOpk-m3j4s_' },
].map(g => ({ ...g, imgUrl: `https://drive.google.com/thumbnail?id=${g.gdrive}&sz=w600-h600` }))

// ── Live Bets ─────────────────────────────────────────────────────────────────
const GAME_ICONS: Record<string, string> = {
  mines: '💣', aviator: '✈️', plinko: '🎯', chicken: '🐔',
  dice: '🎲', limbo: '🌊', wheel: '🎡', flip: '🪙',
  keno: '🔢', dragon: '🐉', pump: '🎈', roulette: '🎡',
}
const GAMES_LIST = ['mines', 'aviator', 'plinko', 'chicken', 'dice', 'keno', 'pump', 'wheel']
const NAMES = ['ninja', 'alpha', 'lucky', 'fast', 'hot', 'pro', 'mega', 'super', 'cool', 'dark']

let betCounter = 0
function genBet() {
  const game = GAMES_LIST[Math.floor(Math.random() * GAMES_LIST.length)]
  const bet = +(Math.random() * 50 + 0.1).toFixed(2)
  const win = Math.random() > 0.45
  const mult = win ? +(Math.random() * 15 + 1.1).toFixed(2) : 0
  const payout = win ? +(bet * mult).toFixed(2) : -bet
  const name = NAMES[Math.floor(Math.random() * NAMES.length)]
  const num = Math.floor(Math.random() * 90 + 10)
  return { id: ++betCounter, game, emoji: GAME_ICONS[game] || '🎰', bet, mult, payout, user: `${name}_***${num}`, win }
}

const ROW_COUNT = 10
// Стабільні ключі для рядків: 0..9 — ніколи не змінюються
const ROW_KEYS = Array.from({ length: ROW_COUNT }, (_, i) => i)

function LiveBetsSection() {
  const [tab, setTab] = useState<'all' | 'big'>('all')
  // bets[i] — дані для позиції i (оновлюємо in-place, без зсуву)
  const [bets, setBets] = useState(() => ROW_KEYS.map(() => genBet()))
  const [freshIdx, setFreshIdx] = useState<number | null>(null)
  const cursorRef = useRef(0) // наступна позиція для оновлення

  useEffect(() => {
    const schedule = () => {
      const delay = 1500 + Math.random() * 2000
      return setTimeout(() => {
        const nb = genBet()
        const idx = cursorRef.current % ROW_COUNT
        cursorRef.current++
        setFreshIdx(idx)
        setBets(prev => prev.map((b, i) => i === idx ? nb : b))
        setTimeout(() => setFreshIdx(null), 800)
        timerRef.current = schedule()
      }, delay)
    }
    const timerRef = { current: schedule() }
    return () => clearTimeout(timerRef.current)
  }, [])

  const shown = tab === 'big'
    ? [...bets].sort((a, b) => b.payout - a.payout)
    : bets

  return (
    <div style={{ padding: '0 0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />
          <span style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Останні ставки</span>
        </div>
        <div style={{
          background: C.green, color: '#0f212e',
          fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20,
        }}>LIVE</div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 14px 10px' }}>
        {(['all', 'big'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? C.orig : C.card,
            border: `1px solid ${tab === t ? C.orig : C.border}`,
            borderRadius: 20, padding: '5px 14px',
            color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>
            {t === 'all' ? 'Всі' : 'Великі виграші'}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        padding: '6px 14px', borderBottom: `1px solid ${C.border}`,
      }}>
        {['ГРА', 'СТАВКА', 'МНОЖНИК', 'ВИГРАШ'].map(h => (
          <span key={h} style={{ fontSize: 10, color: C.sub, fontWeight: 700 }}>{h}</span>
        ))}
      </div>

      {/* Rows — стабільні позиції, оновлення in-place */}
      {shown.map((b, idx) => (
        <div key={ROW_KEYS[idx]} style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          padding: '8px 14px', borderBottom: `1px solid ${C.border}11`,
          alignItems: 'center',
          background: freshIdx === idx ? 'rgba(0,212,170,0.07)' : 'transparent',
          transition: 'background 0.8s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>{b.emoji}</span>
            <div>
              <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{b.game}</div>
              <div style={{ fontSize: 10, color: C.sub }}>{b.user}</div>
            </div>
          </div>
          <span style={{ fontSize: 12, color: C.sub }}>${b.bet}</span>
          <span style={{ fontSize: 12, color: b.win ? C.green : C.sub, fontWeight: 700 }}>
            ×{b.win ? b.mult : '0'}
          </span>
          <span style={{ fontSize: 12, color: b.win ? C.green : C.red, fontWeight: 700 }}>
            {b.win ? `+$${b.payout}` : `-$${b.bet}`}
          </span>
        </div>
      ))}
    </div>
  )
}

const FOOTER_CONTENT: Record<string, { label: string; href?: string }[]> = {
  'Казино': [
    { label: 'Slots', href: '/slots' },
    { label: 'Games', href: '/games' },
    { label: 'Промоції' },
    { label: 'VIP Програма' },
    { label: 'Partner Program' },
    { label: 'Rollon Blog' },
  ],
  'Спорт': [
    { label: 'Футбол' },
    { label: 'Баскетбол' },
    { label: 'Теніс' },
    { label: 'eSports' },
    { label: 'UFC / MMA' },
    { label: 'Live ставки' },
  ],
  'Допомога': [
    { label: 'FAQ' },
    { label: 'Служба підтримки', href: '/support' },
    { label: 'Responsible Gaming' },
    { label: 'Самовиключення' },
    { label: 'Ліміти на депозит' },
    { label: 'Верифікація акаунту' },
  ],
  'Про нас': [
    { label: 'Про Rollon Casino' },
    { label: 'Умови та правила' },
    { label: 'Політика конфіденційності' },
    { label: 'Політика AML' },
    { label: 'Ліцензія та регуляція' },
    { label: 'Responsible Casino' },
  ],
  'Платежі': [
    { label: 'Bitcoin (BTC)' },
    { label: 'Ethereum (ETH)' },
    { label: 'Tether (USDT)' },
    { label: 'Litecoin (LTC)' },
    { label: 'Binance Coin (BNB)' },
    { label: 'Способи поповнення', href: '/deposit' },
  ],
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const nav = useNavigate()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '16px 14px 20px' }}>
      {Object.keys(FOOTER_CONTENT).map(s => (
        <div key={s} style={{ borderBottom: `1px solid ${C.border}` }}>
          <div onClick={() => setOpen(open === s ? null : s)} style={{
            padding: '13px 0', display: 'flex', justifyContent: 'space-between', cursor: 'pointer',
          }}>
            <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{s}</span>
            <span style={{ color: C.sub, fontSize: 14, transition: 'transform 0.2s', display: 'inline-block', transform: open === s ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </div>
          {open === s && (
            <div style={{ paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {FOOTER_CONTENT[s].map(item => (
                <button key={item.label} onClick={() => item.href ? nav(item.href) : undefined} style={{
                  background: 'none', border: 'none', textAlign: 'left',
                  padding: '7px 0', color: C.sub, fontSize: 13, cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = C.sub)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Social */}
      <div style={{ display: 'flex', gap: 16, padding: '16px 0', justifyContent: 'center' }}>
        {['✉️', '💬', '👁️', '🎮', '▶️'].map((icon, i) => (
          <div key={i} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#1a2c38', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16, cursor: 'pointer',
            border: `1px solid ${C.border}`,
          }}>{icon}</div>
        ))}
      </div>

      {/* USDT rate */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: '4px 12px',
          fontSize: 12, color: C.sub,
        }}>₮ 1 USDT = $1.00</span>
      </div>

      {/* Legal */}
      <div style={{ textAlign: 'center', fontSize: 11, color: '#4a6a7a', lineHeight: 1.7 }}>
        <div>{'© 2026 ROLLON Casino. Всі права захищені.'}</div>
        <div>Rollon N.V., реєстраційний номер 145353, Curaçao.</div>
        <div>Ліцензія на азартні ігри: GCB/2024/0001</div>
        <div style={{ marginTop: 8 }}>
          Азартні ігри можуть викликати залежність.<br />
          Грайте відповідально. GamblingTherapy.org
        </div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 800, color: C.sub, fontSize: 13 }}>ROLLON</span>
          <span style={{
            background: '#22c55e22', border: '1px solid #22c55e44',
            borderRadius: 20, padding: '2px 8px', fontSize: 10,
            color: C.green, fontWeight: 700,
          }}>✓ GCB CERT</span>
        </div>
      </div>
    </div>
  )
}

// ── Scroll to top ─────────────────────────────────────────────────────────────
function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
      position: 'fixed', bottom: 70, right: 14, zIndex: 30,
      width: 40, height: 40, borderRadius: '50%',
      background: '#213743', border: `1px solid ${C.border}`,
      color: C.sub, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0008',
    }}>↑</button>
  )
}

// ── Horizontal scroll wrapper ─────────────────────────────────────────────────
function HScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (ref.current?.offsetLeft || 0)
    scrollLeft.current = ref.current?.scrollLeft || 0
    if (ref.current) ref.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (ref.current) ref.current.style.cursor = 'grab'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return
    e.preventDefault()
    const x = e.pageX - (ref.current?.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    ref.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      style={{
        display: 'flex', gap: 10, overflowX: 'auto', padding: '0 14px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        cursor: 'grab', scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  )
}

// ── Main Home ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [catTab, setCatTab] = useState('casino')
  const nav = useNavigate()

  // BNG games — тільки ті що мають іконку в GDrive
  const bngSample = (bngGames as any[])
    .filter((g: any) => !!(gdriveImages as Record<string, string>)[g.id])
    .slice(0, 12)
    .map((g: any) => ({
      ...g,
      imgUrl: `https://drive.google.com/thumbnail?id=${(gdriveImages as Record<string, string>)[g.id]}&sz=w600-h600`
    }))

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <PromoBanner />
      <CategoryTabs active={catTab} onChange={setCatTab} />
      <BigCards />
      <SearchBar />

      {/* Rollon Originals */}
      <SectionHeader icon="⚡" title="Rollon Originals" count="11" onAll={() => nav('/games')} />
      <HScroll>
        {ORIG_GAMES.map(g => <OriginalCard key={g.id} game={g} />)}
      </HScroll>

      {/* BGaming */}
      <SectionHeader icon="🎰" title={'BGaming Слоти'} count="182" onAll={() => nav('/slots')} />
      <HScroll>
        {bngSample.map((g: any) => (
          <ProviderCard key={g.id} name={g.name} badge="BNG" color="#1475e1"
            imgUrl={g.imgUrl || null} players={null}
            onClick={() => nav(`/game/slot/${g.id}`)} />
        ))}
      </HScroll>

      {/* Providers */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🏢</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Провайдери</span>
        </div>
        <button style={{ background: 'none', border: 'none', color: C.accent, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Усі &gt;
        </button>
      </div>
      <HScroll>
        {PROVIDERS.map(p => (
          <div key={p.key} onClick={() => nav('/slots')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: '10px 16px', flexShrink: 0,
            cursor: 'pointer', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: p.color }}>{p.label}</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>{p.count}</div>
          </div>
        ))}
      </HScroll>

      {/* 🌞 Summer slots */}
      <SectionHeader icon="☀️" title="Літні слоти" count={`${SUMMER_SLOTS.length}`} onAll={() => nav('/slots')} />
      <HScroll>
        {SUMMER_SLOTS.map(g => (
          <ProviderCard key={g.id} name={g.name} badge="BNG" color="#f59e0b"
            imgUrl={g.imgUrl} players={null}
            onClick={() => nav(`/game/slot/${g.id}`)} />
        ))}
      </HScroll>

      {/* Recent Bets */}
      <LiveBetsSection />

      {/* Footer */}
      <Footer />

      <ScrollTop />
    </div>
  )
}
