# Rollon Casino — Design Export для Gemini

Це всі ключові файли фронтенду. Переглянь і запропонуй покращення дизайну.

Кольорова палітра: фон `#0F212E`, акцент `#2F7BED`, текст `#B1BAD3`.


## CSS

**File:** `src/index.css`


```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg:       #0F212E;
  --bg2:      #1A2C38;
  --bg3:      #213743;
  --blue:     #2F7BED;
  --green:    #00E676;
  --teal:     #17C4BB;
  --red:      #F44336;
  --gold:     #FFD700;
  --text:     #FFFFFF;
  --text2:    #B1BAD3;
  --muted:    #7F8C9B;
  --border:   #2A3D4D;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; }

input:focus { outline: none; }
button { font-family: inherit; }

/* ── Glassmorphism utility ── */
.glass {
  background: rgba(15, 33, 46, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.glass-card {
  background: rgba(26, 44, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
}

/* ── Horizontal scroll fade ── */
.scroll-row {
  display: flex;
  gap: 10px;
  padding: 0 16px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 32px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 32px), transparent 100%);
}
.scroll-row > * {
  scroll-snap-align: start;
}

/* ── Subtle hero card animations ── */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-5px); }
}
@keyframes spin-lazy {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes shimmer {
  0%, 100% { opacity: 0.15; }
  50%       { opacity: 0.35; }
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,230,118,.5); }
  50%       { box-shadow: 0 0 0 5px rgba(0,230,118,0); }
}
@keyframes card-hover-scale {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.01); }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.hero-card-casino .hero-dice   { animation: float-slow 4s ease-in-out infinite; }
.hero-card-casino .hero-card   { animation: float-slow 5s ease-in-out infinite 0.8s; }
.hero-card-casino .hero-shine  { animation: shimmer 4s ease-in-out infinite; }
.hero-card-sports .hero-ball   { animation: float-slow 4.5s ease-in-out infinite 0.5s; }
.hero-card-sports .hero-bball  { animation: float-slow 5s ease-in-out infinite 1s; }
.hero-card-sports .hero-shine  { animation: shimmer 5s ease-in-out infinite; }
.live-dot { animation: pulse-dot 2s ease-in-out infinite; }

@keyframes slide-in-bet {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Bottom nav glow ── */
.nav-active-glow {
  position: relative;
}
.nav-active-glow::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 3px;
  background: #2F7BED;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 12px rgba(47, 123, 237, 0.5);
}

/* ── Section header accent ── */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 12px;
}
.section-header h3 {
  font-weight: 800;
  font-size: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-header .see-all {
  background: none;
  border: none;
  color: #7F8C9B;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}
.section-header .see-all:active {
  color: #2F7BED;
}

/* ── Premium slot card overlay ── */
.slot-card-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 3/4;
  transition: transform 0.15s ease;
}
.slot-card-wrap:active {
  transform: scale(0.96);
}
.slot-card-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}
.slot-card-wrap:hover::after {
  opacity: 1;
}

/* ── Search bar glow ── */
.search-bar {
  background: #213743;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-bar:focus-within {
  border-color: rgba(47, 123, 237, 0.4);
  box-shadow: 0 0 0 3px rgba(47, 123, 237, 0.1);
}

/* ── Filter pill animations ── */
.filter-pill {
  flex-shrink: 0;
  padding: 7px 14px;
  border-radius: 20px;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}
.filter-pill:active {
  transform: scale(0.95);
}
.filter-pill--active {
  background: #2F7BED;
  box-shadow: 0 2px 12px rgba(47, 123, 237, 0.3);
}
.filter-pill--inactive {
  background: #213743;
}

/* ── Game tile hover glow ── */
.game-tile {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.game-tile:active {
  transform: scale(0.97);
}

/* ── Live bet row ── */
.bet-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 9px 14px;
  align-items: center;
  transition: background 0.4s ease;
  border-bottom: 1px solid rgba(33, 55, 67, 0.5);
}
.bet-row:last-child {
  border-bottom: none;
}

/* ── Notification badge ── */
.badge-hot {
  background: linear-gradient(135deg, #e74c3c, #ff6b35);
  border-radius: 4px;
  font-size: 8px;
  font-weight: 800;
  color: #fff;
  padding: 2px 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-new {
  background: linear-gradient(135deg, #2F7BED, #00E676);
  border-radius: 4px;
  font-size: 8px;
  font-weight: 800;
  color: #fff;
  padding: 2px 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

```


## Home Page

**File:** `src/pages/Home.tsx`


```tsx
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GameTile, { Game, THUMBS } from '../components/GameTile'
import GameIcon from '../components/GameIcon'
import ProviderCard, { PROVIDERS } from '../components/ProviderCard'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import Footer from '../components/Footer'
import { useUser } from '../hooks/useUser'
import { API } from '../utils/api'
import liveGamesData from '../data/live_games.json'
import ppGamesData from '../data/pp_games.json'
import SlotThumb from '../components/SlotThumb'

// Top BGaming slots for home preview — all confirmed to have real images
const HOME_SLOTS = [
  { id: 'book_of_gold_multichance', name: 'Book of Gold',         rtp: '95.40', vol: 'very-high' },
  { id: 'goddess_of_egypt',         name: 'Goddess of Egypt',     rtp: '95.78', vol: 'very-high' },
  { id: 'candy_boom',               name: 'Candy Boom',           rtp: '95.64', vol: 'very-high' },
  { id: 'buffalo_megaways',         name: 'Buffalo Megaways',     rtp: '96.00', vol: 'very-high' },
  { id: 'dragon_pearls',            name: 'Dragon Pearls',        rtp: '95.02', vol: 'high' },
  { id: 'coin_express',             name: 'Coin Express',         rtp: '96.00', vol: 'medium' },
  { id: 'sun_of_egypt',             name: 'Sun of Egypt',         rtp: '95.62', vol: 'high' },
  { id: 'aztec_fire',               name: 'Aztec Fire',           rtp: '96.00', vol: 'high' },
]

function PPHomeCard({ game }: { game: typeof ppGamesData[0] }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/slot/${game.id}`)} style={{ width: '100%', cursor: 'pointer' }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1/1',
        borderRadius: 10, overflow: 'hidden', background: '#1A2C38',
      }}>
        <SlotThumb name={game.name} rtp={game.rtp} vol={game.vol} provider="PP" buy={game.buy} maxWin={game.max_win} />
        <div style={{
          position: 'absolute', top: 5, left: 5,
          background: 'rgba(231,76,60,0.92)', borderRadius: 4,
          padding: '2px 5px', fontSize: 9, fontWeight: 800, color: '#fff',
        }}>PP</div>
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: '#C4CDD6', marginTop: 6,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden', wordBreak: 'break-word', lineHeight: 1.3 }}>{game.name}</p>
    </div>
  )
}

function HomeSlotCard({ slot }: { slot: typeof HOME_SLOTS[0] }) {
  const navigate = useNavigate()
  const [stage, setStage] = useState(0)
  const SRCS = [
    `${API}/img/bng/${slot.id}`,
    `https://cdn.bgaming-network.com/games/${slot.id}/en/default_300x300.jpg`,
  ]
  return (
    <div onClick={() => navigate(`/slot/${slot.id}`)} style={{ flexShrink: 0, width: 108, cursor: 'pointer' }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1/1',
        borderRadius: 10, overflow: 'hidden', background: '#1A2C38',
      }}>
        {stage < SRCS.length ? (
          <img src={SRCS[stage]} alt={slot.name}
            onError={() => setStage(s => s + 1)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <SlotThumb name={slot.name} rtp={slot.rtp} vol={slot.vol} provider="BNG" />
        )}
        <div style={{
          position: 'absolute', top: 5, left: 5,
          background: 'rgba(0,200,100,0.92)', borderRadius: 4,
          padding: '2px 5px', fontSize: 9, fontWeight: 800, color: '#fff',
        }}>BNG</div>
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: '#C4CDD6', marginTop: 6,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden', wordBreak: 'break-word', lineHeight: 1.3 }}>{slot.name}</p>
    </div>
  )
}

const ORIGINALS: Game[] = [
  { id: 'mines',    name: 'Mines',        players: 3241, original: true, thumb: THUMBS.mines },
  { id: 'aviator',  name: 'Aviator',      players: 5832, original: true, thumb: THUMBS.aviator },
  { id: 'plinko',   name: 'Plinko',       players: 2109, original: true, thumb: THUMBS.plinko },
  { id: 'chicken',  name: 'Chicken',      players: 1874, original: true, thumb: THUMBS.chicken },
  { id: 'dice',     name: 'Dice',         players: 4211, original: true, thumb: THUMBS.dice },
  { id: 'limbo',    name: 'Limbo',        players: 1880, original: true, thumb: THUMBS.limbo },
  { id: 'wheel',    name: 'Wheel',        players: 987,  original: true, thumb: THUMBS.wheel },
  { id: 'keno',     name: 'Keno',         players: 1284, original: true, thumb: THUMBS.keno },
  { id: 'hilo',     name: 'Hi-Lo',        players: 1563, original: true, thumb: THUMBS.hilo },
  { id: 'flip',     name: 'Flip',         players: 743,  original: true, thumb: THUMBS.flip },
  { id: 'dragon',   name: 'Dragon Tower', players: 468,  original: true, thumb: THUMBS.dragon },
  { id: 'pump',     name: 'Pump',         players: 212,  original: true, thumb: THUMBS.pump },
  { id: 'roulette', name: 'Roulette',     players: 314,  original: true, thumb: THUMBS.roulette },
]

const LIVE_GAMES: Game[] = [
  { id: 'roulette', name: 'Live Roulette', players: 2841, thumb: THUMBS.roulette },
  { id: 'dragon',   name: 'Dragon Tower',  players: 1923, thumb: THUMBS.dragon },
  { id: 'pump',     name: 'Pump',          players: 744,  thumb: THUMBS.pump },
  { id: 'keno',     name: 'Keno',          players: 1284, thumb: THUMBS.keno },
  { id: 'flip',     name: 'Flip',          players: 631,  thumb: THUMBS.flip },
]

function Section({ title, icon, games, onAll }: { title: string; icon?: string; games: Game[]; onAll?: () => void }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="section-header">
        <h3>
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        {onAll && <button onClick={onAll} className="see-all">Усі <span style={{ fontSize: 14 }}>›</span></button>}
      </div>
      <div className="scroll-row">
        {games.map(g => <GameTile key={g.id + g.name} game={g} />)}
      </div>
    </div>
  )
}

const GAMES_POOL = [
  { emoji: '💣', name: 'Mines' },   { emoji: '✈️', name: 'Aviator' },
  { emoji: '🎯', name: 'Plinko' },  { emoji: '🐔', name: 'Chicken' },
  { emoji: '🎲', name: 'Dice' },    { emoji: '🚀', name: 'Limbo' },
  { emoji: '🎡', name: 'Wheel' },   { emoji: '🔢', name: 'Keno' },
  { emoji: '🃏', name: 'Hi-Lo' },   { emoji: '🪙', name: 'Flip' },
  { emoji: '🐉', name: 'Dragon' },  { emoji: '🎈', name: 'Pump' },
  { emoji: '🎰', name: 'Roulette' },
]
const PREFIXES = ['lucky','cool','fast','ace','pro','ninja','alpha','dark','hot','wild']
const SUFFIXES = ['***12','***47','***88','***03','***55','***71','***29','***66','***44','***91']
function rndUser() {
  return PREFIXES[Math.floor(Math.random()*PREFIXES.length)] + '_' + SUFFIXES[Math.floor(Math.random()*SUFFIXES.length)]
}
function rndBet() {
  const r = Math.random()
  let base: number
  if (r < 0.70) base = 0.1 + Math.random() * 4.9
  else if (r < 0.90) base = 5 + Math.random() * 20
  else base = 25 + Math.random() * 175
  return Math.round(base * 100) / 100
}
function rndMult(won: boolean) {
  if (!won) return 0
  const m = [1.2,1.5,1.89,2,2.5,3.5,4.9,7.3,10.5,25,50,100,500][Math.floor(Math.random()*13)]
  return m
}
function makeBet(id: number) {
  const g = GAMES_POOL[Math.floor(Math.random()*GAMES_POOL.length)]
  const won = Math.random() > 0.42
  const bet = rndBet()
  const mult = rndMult(won)
  return { id, game: `${g.emoji} ${g.name}`, user: rndUser(), won, bet, mult, win: +(bet*mult).toFixed(2) }
}
let _betId = 100
const INITIAL_BETS = Array.from({length:6}, () => makeBet(_betId++))

type Bet = ReturnType<typeof makeBet>

function LiveBets() {
  const [bets, setBets] = useState<Bet[]>(INITIAL_BETS)
  const [newId, setNewId] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const delay = 800 + Math.random() * 2200
      const t = setTimeout(() => {
        const b = makeBet(_betId++)
        setBets(prev => [b, ...prev.slice(0, 5)])
        setNewId(b.id)
        setTimeout(() => setNewId(null), 600)
        tick()
      }, delay)
      return t
    }
    const t = tick()
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: 'rgba(26,44,56,0.5)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '11px 14px', borderBottom: '1px solid rgba(33, 55, 67, 0.6)' }}>
        {['Гра','Ставка','Множник','Виграш'].map(h => (
          <p key={h} style={{ fontSize: 10, color: '#7F8C9B', fontWeight: 700, textAlign: h==='Гра'?'left':'right', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</p>
        ))}
      </div>
      {bets.map((bet) => (
        <div key={bet.id} className="bet-row"
          style={{
            background: bet.id === newId ? (bet.won ? 'rgba(0,230,118,.06)' : 'rgba(244,67,54,.04)') : 'transparent',
            animation: bet.id === newId ? 'slide-in-bet .35s ease-out' : 'none',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GameIcon name={bet.game.replace(/^[^\w]*/, '').trim()} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{bet.game.replace(/^[^\w\s]*\s/, '')}</p>
              <p style={{ fontSize: 10, color: '#556B7C' }}>{bet.user}</p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#B1BAD3', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${bet.bet.toFixed(2)}</p>
          <p style={{ fontSize: 12, color: bet.won ? '#00E676' : '#556B7C', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {bet.won ? `×${bet.mult}` : '×0'}
          </p>
          <p style={{ fontSize: 12, fontWeight: 700, color: bet.won ? '#00E676' : '#F44336', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {bet.won ? `+$${bet.win}` : `-$${bet.bet}`}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { user } = useUser()
  const balance = user?.balance ?? 0
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'casino'|'slots'|'live'|'sport'>('casino')

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} balance={balance} username="Павло" wagered={0} />

      {/* ── Header ── */}
      <div style={{
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #1A2C38',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(15,33,46,0.95)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ display: 'block', width: 20, height: 2, background: '#B1BAD3', borderRadius: 2 }}/>
            <span style={{ display: 'block', width: 14, height: 2, background: '#B1BAD3', borderRadius: 2 }}/>
            <span style={{ display: 'block', width: 20, height: 2, background: '#B1BAD3', borderRadius: 2 }}/>
          </button>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>
            R<span style={{ color: '#2F7BED' }}>◆</span>LLON
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1A2C38', borderRadius: 10, padding: '8px 14px', border: '1px solid #2A3F50' }}>
            <span style={{ color: '#17C4BB', fontSize: 13, fontWeight: 700 }}>₮</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{balance.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/deposit')}
            style={{ background: 'linear-gradient(135deg,#2F7BED,#1a5fd4)', border: 'none', borderRadius: 10, padding: '9px 16px', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            + Поповнити
          </button>
        </div>
      </div>

      {/* ── Hero Banner Carousel ── */}
      <HeroBanner />

      {/* ── Category Tabs ── */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #1A2C38', scrollbarWidth: 'none' }}>
        {([
          { label: 'Казино', icon: '🎰', key: 'casino' },
          { label: 'Слоти',  icon: '🎲', key: 'slots'  },
          { label: 'Live',   icon: '📺', key: 'live'   },
          { label: 'Спорт',  icon: '⚽', key: 'sport'  },
        ] as const).map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex: '0 0 auto',
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === key ? '2px solid #2F7BED' : '2px solid transparent',
              color: activeTab === key ? '#fff' : '#7F8FA4',
              fontSize: 13,
              fontWeight: activeTab === key ? 700 : 500,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
            }}
          >
            <span>{icon}</span>
            {label}
            {key === 'sport' && (
              <span style={{ fontSize: 9, background: '#2F7BED', color: '#fff', borderRadius: 4, padding: '2px 5px', fontWeight: 700 }}>SOON</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'slots' && (() => { navigate('/slots'); return null })()}
      {activeTab === 'live'  && (() => { navigate('/games'); return null })()}
      {activeTab === 'sport' && (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚽</div>
          <p style={{ color: '#7F8FA4', fontSize: 16 }}>Спортивні ставки — незабаром!</p>
        </div>
      )}
      {(activeTab === 'casino') && <>

      {/* ── Hero categories ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 16px 0' }}>
        {/* Casino card */}
        <div onClick={() => navigate('/games')} style={{
          borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
          position: 'relative', height: 128,
          background: 'linear-gradient(135deg, #1a3a6e 0%, #0d2151 100%)',
          border: '1px solid rgba(47,123,237,0.15)',
          transition: 'transform 0.15s',
        }}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(.97)')}
          onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,123,237,.3) 0%, transparent 70%)', pointerEvents: 'none', animation: 'glow-pulse 3s ease-in-out infinite' }}/>
          <div style={{ position: 'absolute', right: 8, bottom: 4, fontSize: 56, lineHeight: 1, opacity: .85, filter: 'drop-shadow(0 4px 16px rgba(47,123,237,.4))' }}>🎰</div>
          <div style={{ position: 'relative', padding: '18px 14px' }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>Казино</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 3 }}>13 ігор</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 18 }}>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: '#00E676', fontWeight: 600 }}>18 432 грають</span>
            </div>
          </div>
        </div>

        {/* Sports card */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', cursor: 'default',
          position: 'relative', height: 128,
          background: 'linear-gradient(135deg, #1a4d1a 0%, #0d3010 100%)',
          border: '1px solid rgba(0, 230, 118, 0.1)',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,230,118,.2) 0%, transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', right: 8, bottom: 4, fontSize: 56, lineHeight: 1, opacity: .8, filter: 'drop-shadow(0 4px 16px rgba(0,200,80,.3))' }}>⚽</div>
          <div style={{ position: 'relative', padding: '18px 14px' }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>Спорт</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 3 }}>Ставки</p>
            <div style={{ marginTop: 18 }}>
              <span style={{ fontSize: 10, color: '#FFD700', fontWeight: 700, background: 'rgba(0,0,0,.35)', padding: '3px 10px', borderRadius: 10, border: '1px solid rgba(255,215,0,0.15)' }}>⏳ Скоро</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div style={{ padding: '14px 16px' }}>
        <div className="search-bar" onClick={() => navigate('/slots')}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7F8C9B" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#7F8C9B" strokeWidth="2" strokeLinecap="round"/></svg>
          <input
            placeholder="Знайди свою гру..."
            onFocus={() => navigate('/slots')}
            readOnly
            style={{ background: 'none', border: 'none', color: '#556B7C', fontSize: 14, outline: 'none', flex: 1, cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* ── Game Sections ── */}
      <Section title="Rollon Originals" icon="⚡" games={ORIGINALS} onAll={() => navigate('/games')} />
      <Section title="Live зараз" icon="🔴" games={LIVE_GAMES} onAll={() => navigate('/games?tab=live')} />

      {/* ── Pragmatic Play Featured ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <h3>
            <span style={{ background: '#E74C3C', borderRadius: 6, padding: '2px 8px', fontSize: 10, color: '#fff', fontWeight: 800, letterSpacing: 0.5 }}>PP</span>
            Pragmatic Play
          </h3>
          <button onClick={() => navigate('/slots')} className="see-all">Всі {ppGamesData.length} <span style={{ fontSize: 14 }}>›</span></button>
        </div>
        <div className="scroll-row">
          {ppGamesData.slice(0, 8).map(g => (
            <div key={g.id} onClick={() => navigate(`/slot/pp_${g.id}`)} style={{ flexShrink: 0, width: 105, cursor: 'pointer' }}>
              <PPHomeCard game={g} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Popular BGaming Slots ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <h3>
            <span style={{ background: '#00E676', borderRadius: 6, padding: '2px 8px', fontSize: 10, color: '#0F212E', fontWeight: 800, letterSpacing: 0.5 }}>BNG</span>
            BGaming Слоти
          </h3>
          <button onClick={() => navigate('/slots')} className="see-all">Усі 182 <span style={{ fontSize: 14 }}>›</span></button>
        </div>
        <div className="scroll-row">
          {HOME_SLOTS.map(s => <HomeSlotCard key={s.id} slot={s} />)}
        </div>
      </div>

      {/* ── Live Casino preview ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <h3>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676', display: 'inline-block', boxShadow: '0 0 8px #00E676' }} />
            🎥 Live Казино
          </h3>
          <button onClick={() => navigate('/games?tab=live')} className="see-all">Всі {liveGamesData.length} <span style={{ fontSize: 14 }}>›</span></button>
        </div>
        <div className="scroll-row">
          {liveGamesData.slice(0, 5).map(g => (
            <div key={g.id} onClick={() => navigate('/games?tab=live')}
              style={{
                flexShrink: 0, width: 140, cursor: 'pointer',
                borderRadius: 14, overflow: 'hidden',
                background: g.bg,
                border: `1px solid ${g.color}20`,
                padding: '16px 12px',
                display: 'flex', flexDirection: 'column', gap: 8,
                transition: 'transform 0.15s',
              }}
              onTouchStart={e => (e.currentTarget.style.transform = 'scale(.97)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ fontSize: 30, textAlign: 'center' }}>{g.emoji}</div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>{g.name}</p>
              <p style={{ fontSize: 10, color: g.color, textAlign: 'center', fontWeight: 600 }}>🟢 {g.players.toLocaleString()}</p>
              {g.hot && <span className="badge-hot" style={{ textAlign: 'center' }}>HOT</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Providers ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <h3><span>🏢</span> Провайдери</h3>
          <button className="see-all">Всі <span style={{ fontSize: 14 }}>›</span></button>
        </div>
        <div className="scroll-row">
          {PROVIDERS.map(p => <ProviderCard key={p.id} provider={p} />)}
        </div>
      </div>

      {/* ── Recent Bets ── */}
      <div style={{ padding: '0 16px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
          <p style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>Останні ставки</p>
          <span style={{
            marginLeft: 'auto', fontSize: 10, color: '#00E676', fontWeight: 700,
            background: 'rgba(0,230,118,0.1)', padding: '3px 10px', borderRadius: 10,
            border: '1px solid rgba(0,230,118,0.15)',
            letterSpacing: 1,
          }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['Всі', 'Великі виграші'].map((t, i) => (
            <button key={t} className={`filter-pill ${i === 0 ? 'filter-pill--active' : 'filter-pill--inactive'}`}>{t}</button>
          ))}
        </div>
        <LiveBets />
      </div>

      </> /* end activeTab === 'casino' */}

      <Footer />
    </div>
  )
}

```


## Slots Page

**File:** `src/pages/Slots.tsx`


```tsx
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import bngGames from '../data/bng_games.json'
import ppGames from '../data/pp_games.json'
import n2Games from '../data/n2_games.json'
import platipusGames from '../data/platipus_games.json'
import gamzixGames from '../data/gamzix_games.json'
import thunderspinGames from '../data/thunderspin_games.json'
import turbogamesGames from '../data/turbogames_games.json'
import aviatrixGames from '../data/aviatrix_games.json'
import SlotThumb from '../components/SlotThumb'
import { API } from '../utils/api'

type Game = { id: string; name: string; genre?: string; rtp?: string; vol_range?: string; buy_feature?: boolean; provider: string; provider_name?: string }
type PpGame = { id: string; name: string; rtp: string; vol: string; buy: boolean; max_win: string }

// Normalize all games into a common format
function normPP(g: PpGame): Game {
  return { id: g.id, name: g.name, rtp: g.rtp, vol_range: g.vol, buy_feature: g.buy, provider: 'pp', provider_name: 'Pragmatic Play' }
}

const bng = (bngGames as Game[])
const pp = (ppGames as PpGame[]).map(normPP)
const n2 = (n2Games as Game[])
const platipus = (platipusGames as Game[])
const gamzix = (gamzixGames as Game[])
const thunderspin = (thunderspinGames as Game[])
const turbogames = (turbogamesGames as Game[])
const aviatrix = (aviatrixGames as Game[])

const VOL_COLORS: Record<string, string> = {
  low: '#00E676', medium: '#17C4BB', 'medium-high': '#FFD700', high: '#FF9800', 'very-high': '#F44336',
}
const VOL_LABELS: Record<string, string> = {
  low: 'Низька', medium: 'Середня', 'medium-high': 'Сер/Висока', high: 'Висока', 'very-high': 'Дуже висока',
}

function imgSrcs(provider: 'pp' | 'bng', id: string): string[] {
  // Primary: Vercel Edge proxy (bypasses CDN geo-blocks)
  if (provider === 'pp') return [
    `/api/img?p=pp&id=${id}`,
    `https://demogamesfree.pragmaticplay.net/gs2c/common/images/games/${id}.png`,
    `https://cdn.pragmaticplay.net/game_pic/square/200/${id}.png`,
  ]
  return [
    `/api/img?p=bng&id=${id}`,
    `https://static.bgaming-network.com/games/${id}/en_US/web/desktop/preview.png`,
    `https://bgaming-network.com/games/${id}/en_US/web/desktop/preview.png`,
  ]
}

function SlotCard({
  srcs, name, rtp, vol, provider, buy, maxWin, onClick,
}: {
  srcs: string[]; name: string; rtp: string; vol: string; provider: 'PP' | 'BNG';
  buy: boolean; maxWin?: string; onClick: () => void;
}) {
  const [stage, setStage] = useState(0)

  return (
    <div onClick={onClick} style={{ cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Image box — square aspect ratio, fills column width */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#1A2C38',
      }}>
        {stage < srcs.length ? (
          <img src={srcs[stage]} alt={name} referrerPolicy="origin"
            onError={() => setStage(s => s + 1)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <SlotThumb name={name} rtp={rtp} vol={vol} provider={provider} buy={buy} maxWin={maxWin} />
        )}
        {/* Provider badge */}
        <div style={{
          position: 'absolute', top: 5, left: 5,
          background: provider === 'PP' ? 'rgba(231,76,60,0.92)' : 'rgba(0,200,100,0.92)',
          borderRadius: 4, padding: '2px 5px',
          fontSize: 9, fontWeight: 800, color: '#fff',
          letterSpacing: 0.3,
        }}>
          {provider}
        </div>
      </div>
      {/* Game name */}
      <p style={{
        fontSize: 12,
        fontWeight: 600,
        color: '#C4CDD6',
        margin: 0,
        lineHeight: 1.3,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
        wordBreak: 'break-word',
      }}>{name}</p>
    </div>
  )
}

const PROVIDER_COLORS: Record<string, string> = {
  bng: '#00E676', pp: '#E74C3C', n2: '#FF6D00', platipus: '#AB47BC',
  gamzix: '#00BCD4', thunderspin: '#FFD700', turbogames: '#FF4081',
  aviatrix: '#00E5FF', bgaming: '#2F7BED',
}

function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate()
  const srcs = game.provider === 'pp'
    ? imgSrcs('pp', game.id)
    : [`${API}/img/bng/${game.id}`, `https://cdn.bgaming-network.com/games/${game.id}/en/default_300x300.jpg`]

  return (
    <SlotCard
      srcs={srcs}
      name={game.name}
      rtp={game.rtp || ''}
      vol={game.vol_range || ''}
      provider={game.provider === 'pp' ? 'PP' : 'BNG'}
      buy={game.buy_feature || false}
      onClick={() => navigate(`/slot/${game.id}`)}
    />
  )
}

// All games merged
const ALL_GAMES: Game[] = [
  ...bng,
  ...pp,
  ...n2,
  ...platipus,
  ...gamzix,
  ...thunderspin,
  ...turbogames,
  ...aviatrix,
]

type ProviderKey = 'all' | 'bng' | 'pp' | 'n2' | 'platipus' | 'gamzix' | 'thunderspin' | 'turbogames' | 'aviatrix'
const PROVIDER_TABS: { key: ProviderKey; label: string; color: string; games: Game[] }[] = [
  { key: 'all',         label: 'Всі',           color: '#2F7BED', games: ALL_GAMES },
  { key: 'bng',         label: 'BGaming',        color: '#00E676', games: bng },
  { key: 'pp',          label: 'Pragmatic',      color: '#E74C3C', games: pp },
  { key: 'n2',          label: 'Novomatic',      color: '#FF6D00', games: n2 },
  { key: 'platipus',    label: 'Platipus',       color: '#AB47BC', games: platipus },
  { key: 'gamzix',      label: 'Gamzix',         color: '#00BCD4', games: gamzix },
  { key: 'thunderspin', label: 'ThunderSpin',    color: '#FFD700', games: thunderspin },
  { key: 'turbogames',  label: 'TurboGames',     color: '#FF4081', games: turbogames },
  { key: 'aviatrix',    label: 'Aviatrix',       color: '#00E5FF', games: aviatrix },
]

const FILTERS = [
  { key: 'all',      label: '🎮 Всі' },
  { key: 'top',      label: '🔥 Топ' },
  { key: 'buy',      label: '💰 Buy Feature' },
  { key: 'highvol',  label: '🚀 Висока вол.' },
  { key: 'megaways', label: '⚡ Megaways' },
]

export default function Slots() {
  const [activeProvider, setActiveProvider] = useState<ProviderKey>('all')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const providerGames = useMemo(() =>
    PROVIDER_TABS.find(t => t.key === activeProvider)?.games ?? ALL_GAMES,
    [activeProvider]
  )

  const filtered = useMemo(() => {
    let list = [...providerGames]
    if (search) list = list.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
    if (filter === 'buy') list = list.filter(g => g.buy_feature)
    if (filter === 'highvol') list = list.filter(g => ['high','very-high'].includes(g.vol_range || ''))
    if (filter === 'megaways') list = list.filter(g => g.name.toLowerCase().includes('megaways'))
    if (filter === 'top') list = list.slice(0, 30)
    return list
  }, [providerGames, search, filter])

  const activeTab = PROVIDER_TABS.find(t => t.key === activeProvider)!

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh' }}>
      {/* Header */}
      <div className="glass" style={{
        borderBottom: '1px solid rgba(47,123,237,0.08)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => window.history.back()} style={{
          background: 'rgba(33,55,67,0.6)', border: 'none', color: '#B1BAD3', fontSize: 18,
          cursor: 'pointer', width: 36, height: 36, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 900, fontSize: 17, color: '#fff' }}>🎰 Слоти</p>
          <p style={{ fontSize: 11, color: '#7F8C9B', marginTop: 1 }}>
            {filtered.length} ігор · {PROVIDER_TABS.length - 1} провайдери
          </p>
        </div>
        {activeProvider !== 'all' && (
          <span style={{
            background: activeTab.color + '22', border: `1px solid ${activeTab.color}40`,
            borderRadius: 8, padding: '4px 10px', fontSize: 10, color: activeTab.color, fontWeight: 700,
          }}>{activeTab.label}</span>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: '14px 16px 0' }}>
        <div className="search-bar">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7F8C9B" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#7F8C9B" strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Пошук серед 964 ігор..."
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 14, outline: 'none', flex: 1 }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#7F8C9B', cursor: 'pointer', fontSize: 16 }}>✕</button>}
        </div>
      </div>

      {/* Provider tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #1A2C38', marginTop: 12, scrollbarWidth: 'none' }}>
        {PROVIDER_TABS.map(t => {
          const active = activeProvider === t.key
          return (
            <button key={t.key} onClick={() => { setActiveProvider(t.key); setFilter('all'); setSearch('') }}
              style={{
                flexShrink: 0, padding: '10px 14px', border: 'none',
                borderBottom: `2px solid ${active ? t.color : 'transparent'}`,
                background: 'transparent', color: active ? '#fff' : '#7F8C9B',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'color 0.2s',
                display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
              }}>
              {t.key !== 'all' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.color, flexShrink: 0 }} />}
              {t.label}
              <span style={{ color: '#556B7C', fontWeight: 400 }}>({t.games.length})</span>
            </button>
          )
        })}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`filter-pill ${filter === f.key ? 'filter-pill--active' : 'filter-pill--inactive'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Games grid */}
      <div style={{ padding: '8px 12px 100px' }}>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 8px' }}>
            {filtered.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 48, color: '#7F8C9B' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Нічого не знайдено</p>
            <p style={{ fontSize: 12, marginTop: 4, color: '#556B7C' }}>Спробуй інший пошук</p>
          </div>
        )}
      </div>
    </div>
  )
}

```


## Layout / Bottom Nav

**File:** `src/components/Layout.tsx`


```tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ACTIVE = '#2F7BED'
const INACTIVE = '#557086'

const NAV = [
  { path: '/', label: 'Казино', icon: (a: boolean) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
    </svg>
  )},
  { path: '/slots', label: 'Слоти', icon: (a: boolean) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
      <rect x="6" y="9" width="3" height="6" rx="1" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.5"/>
      <rect x="10.5" y="9" width="3" height="6" rx="1" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.5"/>
      <rect x="15" y="9" width="3" height="6" rx="1" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.5"/>
    </svg>
  )},
  { path: '/bets', label: 'Ставки', icon: (a: boolean) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path d="M9 17H5a2 2 0 00-2 2v0a2 2 0 002 2h14a2 2 0 002-2v0a2 2 0 00-2-2h-4M9 17V5a2 2 0 012-2h2a2 2 0 012 2v12M9 17h6"
        stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { path: '/profile', label: 'Профіль', icon: (a: boolean) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { path: '__chat__', label: 'Чат', icon: (a: boolean) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke={a ? ACTIVE : INACTIVE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
]

function ChatDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState([
    { id: 1, user: 'Artem_UA', text: 'хто виграв сьогодні?', time: '06:11' },
    { id: 2, user: 'crypto_max', text: 'я тільки що +$240 на mines 🔥', time: '06:12' },
    { id: 3, user: 'lucky777', text: 'gj! я вчора злив все 😅', time: '06:13' },
    { id: 4, user: 'Yaroslav', text: 'яка мінімальна ставка на roulette?', time: '06:14' },
  ])

  const send = () => {
    if (!msg.trim()) return
    setMsgs(m => [...m, { id: Date.now(), user: 'Ти', text: msg, time: new Date().toLocaleTimeString('uk', {hour:'2-digit',minute:'2-digit'}) }])
    setMsg('')
  }

  if (!open) return null
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 200 }} />
      <div style={{
        position: 'fixed', bottom: 76, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480, height: '60vh',
        background: '#0E1F2B', borderRadius: '16px 16px 0 0',
        border: '1px solid #1A2C38', zIndex: 201,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #1A2C38', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>Чат</span>
            <span style={{ fontSize: 11, color: '#557086' }}>1 284 онлайн</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#557086', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1A3448', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: ACTIVE, fontWeight: 700 }}>
                {m.user[0].toUpperCase()}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ACTIVE }}>{m.user}</span>
                  <span style={{ fontSize: 10, color: '#557086' }}>{m.time}</span>
                </div>
                <p style={{ fontSize: 13, color: '#B1BAD3', lineHeight: 1.4 }}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid #1A2C38', display: 'flex', gap: 8 }}>
          <input
            value={msg} onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Написати повідомлення..."
            style={{ flex: 1, background: '#1A2C38', border: '1px solid #253647', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 13, outline: 'none' }}
          />
          <button onClick={send} style={{ background: ACTIVE, border: 'none', borderRadius: 10, padding: '0 16px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 18 }}>↑</button>
        </div>
      </div>
    </>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div style={{ background: '#0F212E', minHeight: '100vh', paddingBottom: 76 }}>
      {children}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />

      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: 'rgba(10,20,28,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #1A2C38',
        display: 'flex',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
        {NAV.map(({ path, label, icon }) => {
          const isChat = path === '__chat__'
          const active = isChat ? chatOpen : (location.pathname === path || (path === '/slots' && location.pathname.startsWith('/slot')))
          return (
            <button key={path}
              onClick={() => isChat ? setChatOpen(o => !o) : navigate(path)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '10px 0 12px',
                fontSize: 10, fontWeight: active ? 700 : 500,
                color: active ? '#fff' : INACTIVE,
                background: 'none', border: 'none', cursor: 'pointer',
                position: 'relative',
              }}>
              {active && (
                <div style={{
                  position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
                  background: ACTIVE, borderRadius: '0 0 3px 3px',
                  boxShadow: `0 0 8px ${ACTIVE}80`,
                }} />
              )}
              <div style={{ transform: active ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }}>
                {icon(active)}
              </div>
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

```


## Hero Banner

**File:** `src/components/HeroBanner.tsx`


```tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SLIDES = [
  {
    id: 1,
    title: 'Ласкаво просимо до Rollon',
    sub: 'Грай у найкращі слоти від BGaming',
    cta: '🎰 Грати зараз',
    ctaPath: '/slots',
    bg: 'linear-gradient(135deg, #0d2151 0%, #1a3a6e 50%, #0d2151 100%)',
    accent: '#2F7BED',
    emoji: '🎰',
    badge: 'NEW',
    badgeColor: '#2F7BED',
  },
  {
    id: 2,
    title: 'Bonus BGaming',
    sub: '182 слоти · Висока волатильність · Великі виграші',
    cta: '🟢 Відкрити слоти',
    ctaPath: '/slots',
    bg: 'linear-gradient(135deg, #0a2a1a 0%, #0d3d20 50%, #0a2a1a 100%)',
    accent: '#00E676',
    emoji: '💎',
    badge: 'HOT',
    badgeColor: '#00E676',
  },
  {
    id: 3,
    title: 'Mines · Aviator · Plinko',
    sub: 'Власні ігри Rollon — грай без обмежень',
    cta: '⚡ Грати',
    ctaPath: '/games',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1060 50%, #1a0a2e 100%)',
    accent: '#9B59B6',
    emoji: '⚡',
    badge: 'ORIGINAL',
    badgeColor: '#9B59B6',
  },
  {
    id: 4,
    title: 'Live Казино',
    sub: 'Evolution · Рулетка · Баккара · Блекджек',
    cta: '🎥 Дивитись',
    ctaPath: '/games',
    bg: 'linear-gradient(135deg, #2a0a0a 0%, #4a1010 50%, #2a0a0a 100%)',
    accent: '#E74C3C',
    emoji: '🎥',
    badge: 'LIVE',
    badgeColor: '#E74C3C',
  },
]

export default function HeroBanner() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) setCurrent(c => (c + 1) % SLIDES.length)
      else setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
    }
  }

  const slide = SLIDES[current]

  return (
    <div style={{ padding: '12px 16px 0', userSelect: 'none' }}>
      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !dragging && navigate(slide.ctaPath)}
        style={{
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          height: 148,
          background: slide.bg,
          cursor: 'pointer',
          transition: 'background 0.5s ease',
          border: `1px solid ${slide.accent}25`,
          boxShadow: `0 4px 24px ${slide.accent}15`,
        }}>

        {/* Glow blob */}
        <div style={{
          position: 'absolute', right: -30, top: -30,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 65%)`,
          pointerEvents: 'none',
          transition: 'background 0.5s',
        }} />

        {/* Big emoji */}
        <div style={{
          position: 'absolute', right: 16, bottom: 0,
          fontSize: 80, lineHeight: 1, opacity: 0.85,
          filter: `drop-shadow(0 4px 20px ${slide.accent}60)`,
          transition: 'all 0.3s',
        }}>
          {slide.emoji}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', padding: '18px 16px', zIndex: 2, maxWidth: '65%' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: `${slide.accent}25`,
            border: `1px solid ${slide.accent}50`,
            borderRadius: 6, padding: '2px 8px',
            fontSize: 10, fontWeight: 800, color: slide.accent,
            letterSpacing: 0.8, marginBottom: 8,
          }}>
            {slide.badge}
          </div>

          <p style={{ fontSize: 17, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>
            {slide.title}
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, marginBottom: 14 }}>
            {slide.sub}
          </p>

          {/* CTA button */}
          <button
            onClick={e => { e.stopPropagation(); navigate(slide.ctaPath) }}
            style={{
              background: slide.accent,
              border: 'none', borderRadius: 8,
              padding: '7px 14px',
              fontSize: 12, fontWeight: 700, color: '#fff',
              cursor: 'pointer',
              boxShadow: `0 2px 12px ${slide.accent}40`,
            }}>
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 6,
              height: 6, borderRadius: 3,
              background: i === current ? slide.accent : '#2A3F50',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: i === current ? `0 0 6px ${slide.accent}80` : 'none',
            }} />
        ))}
      </div>
    </div>
  )
}

```


## Slot Thumbnail SVG

**File:** `src/components/SlotThumb.tsx`


```tsx
// Slot thumbnail — Stake-style game cards with themed SVG artwork

function nameToSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000
  return h
}

// Detect game theme from name keywords
function detectTheme(name: string): ThemeKey {
  const n = name.toLowerCase()
  if (/book|egypt|pharaoh|cleopatra|anubis|pyramid|scarab/.test(n)) return 'egypt'
  if (/dragon|tiger|panda|pearl|jade|lucky|fortune|china|asian/.test(n)) return 'asian'
  if (/gold|treasure|pirate|coin|rich|king|crown|royal|empire/.test(n)) return 'gold'
  if (/fruit|cherry|melon|lemon|orange|joker|classic|777|sizzl/.test(n)) return 'classic'
  if (/wolf|bear|lion|tiger|wild|safari|jungle|africa|drum/.test(n)) return 'wild'
  if (/thunder|zeus|olympus|god|myth|aztec|temple|ancient/.test(n)) return 'myth'
  if (/star|galaxy|space|planet|cosmic|moon|sky|nebula/.test(n)) return 'space'
  if (/candy|sugar|sweet|cake|bonanza|sweet/.test(n)) return 'candy'
  if (/fire|volcano|inferno|blazing|burning|hot|chilli/.test(n)) return 'fire'
  if (/ice|winter|snow|freeze|crystal|diamond|gem/.test(n)) return 'ice'
  if (/magic|witch|wizard|spell|mystic|mystery|dark/.test(n)) return 'magic'
  if (/fish|ocean|sea|mermaid|coral|aqua|water/.test(n)) return 'ocean'
  return 'default'
}

type ThemeKey = 'egypt'|'asian'|'gold'|'classic'|'wild'|'myth'|'space'|'candy'|'fire'|'ice'|'magic'|'ocean'|'default'

interface Theme {
  bg: [string, string]
  accent: string
  symbol: string
  art: (s: number) => string
}

const THEMES: Record<ThemeKey, Theme> = {
  egypt: {
    bg: ['#c8960c', '#5c3a0a'],
    accent: '#FFD700',
    symbol: '𓂀',
    art: (s) => `
      <ellipse cx="50%" cy="30%" rx="22%" ry="28%" fill="rgba(255,215,0,0.18)" stroke="rgba(255,215,0,0.4)" stroke-width="1"/>
      <polygon points="50%,8% 70%,52% 30%,52%" fill="none" stroke="rgba(255,215,0,0.5)" stroke-width="1.5"/>
      <circle cx="50%" cy="${30+s%10}%" r="8%" fill="rgba(255,200,0,0.25)"/>
      <line x1="20%" y1="65%" x2="80%" y2="65%" stroke="rgba(255,215,0,0.2)" stroke-width="1"/>
    `,
  },
  asian: {
    bg: ['#c0392b', '#4a0404'],
    accent: '#FFD700',
    symbol: '龍',
    art: (s) => `
      <circle cx="75%" cy="25%" r="20%" fill="rgba(255,215,0,0.12)"/>
      <circle cx="75%" cy="25%" r="14%" fill="rgba(255,215,0,0.1)"/>
      <path d="M20%,70% Q50%,30% 80%,70%" fill="none" stroke="rgba(255,215,0,0.3)" stroke-width="2"/>
      <circle cx="${40+s%20}%" cy="${50+s%15}%" r="5%" fill="rgba(255,100,0,0.2)"/>
    `,
  },
  gold: {
    bg: ['#b8860b', '#2c1810'],
    accent: '#FFE082',
    symbol: '♛',
    art: (s) => `
      <circle cx="50%" cy="35%" r="25%" fill="none" stroke="rgba(255,215,0,0.3)" stroke-width="2"/>
      <circle cx="50%" cy="35%" r="18%" fill="rgba(255,215,0,0.08)"/>
      <polygon points="50%,15% 56%,30% 72%,30% 60%,40% 64%,56% 50%,46% 36%,56% 40%,40% 28%,30% 44%,30%" fill="rgba(255,200,0,0.25)" stroke="rgba(255,215,0,0.4)" stroke-width="1"/>
    `,
  },
  classic: {
    bg: ['#1a237e', '#0d0d2b'],
    accent: '#FF5252',
    symbol: '7',
    art: (s) => `
      <circle cx="50%" cy="38%" r="28%" fill="rgba(255,82,82,0.1)" stroke="rgba(255,82,82,0.2)" stroke-width="1.5"/>
      <text x="30%" y="48%" font-size="28" fill="rgba(255,82,82,0.5)" font-weight="900">7</text>
      <text x="52%" y="42%" font-size="20" fill="rgba(255,215,0,0.4)" font-weight="900">★</text>
      <circle cx="${70+s%15}%" cy="70%" r="10%" fill="rgba(255,82,82,0.08)"/>
    `,
  },
  wild: {
    bg: ['#2e7d32', '#1b0000'],
    accent: '#76FF03',
    symbol: '🦁',
    art: (s) => `
      <ellipse cx="50%" cy="40%" rx="35%" ry="28%" fill="rgba(118,255,3,0.08)" stroke="rgba(118,255,3,0.2)" stroke-width="1"/>
      <circle cx="${30+s%20}%" cy="60%" r="12%" fill="rgba(0,0,0,0.2)"/>
      <circle cx="${60+s%15}%" cy="65%" r="10%" fill="rgba(0,0,0,0.15)"/>
      <path d="M15%,80% Q50%,50% 85%,80%" fill="none" stroke="rgba(118,255,3,0.2)" stroke-width="1.5"/>
    `,
  },
  myth: {
    bg: ['#1565c0', '#0d0221'],
    accent: '#E040FB',
    symbol: '⚡',
    art: (s) => `
      <circle cx="50%" cy="30%" r="30%" fill="rgba(224,64,251,0.08)" stroke="rgba(224,64,251,0.2)" stroke-width="1"/>
      <path d="M50%,5% L62%,32% L75%,28% L50%,65% L38%,38% L25%,42% Z" fill="rgba(224,64,251,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <circle cx="50%" cy="30%" r="8%" fill="rgba(255,255,255,0.1)"/>
    `,
  },
  space: {
    bg: ['#0d1b4b', '#000510'],
    accent: '#40C4FF',
    symbol: '✦',
    art: (s) => `
      <circle cx="50%" cy="35%" r="22%" fill="rgba(64,196,255,0.1)" stroke="rgba(64,196,255,0.3)" stroke-width="1"/>
      <circle cx="50%" cy="35%" r="15%" fill="rgba(64,196,255,0.07)" stroke="rgba(64,196,255,0.2)" stroke-width="1"/>
      <circle cx="${20+s%10}%" cy="${20+s%15}%" r="2%" fill="rgba(255,255,255,0.6)"/>
      <circle cx="${70+s%15}%" cy="${30+s%10}%" r="1.5%" fill="rgba(255,255,255,0.5)"/>
      <circle cx="${40+s%20}%" cy="${70+s%10}%" r="1%" fill="rgba(255,255,255,0.4)"/>
    `,
  },
  candy: {
    bg: ['#e91e8c', '#4a0030'],
    accent: '#FF80AB',
    symbol: '★',
    art: (s) => `
      <circle cx="30%" cy="30%" r="15%" fill="rgba(255,128,171,0.2)" stroke="rgba(255,128,171,0.3)" stroke-width="1"/>
      <circle cx="70%" cy="25%" r="12%" fill="rgba(255,214,0,0.2)" stroke="rgba(255,214,0,0.3)" stroke-width="1"/>
      <circle cx="55%" cy="60%" r="18%" fill="rgba(255,128,171,0.12)"/>
      <path d="M20%,75% Q50%,40% 80%,75%" fill="none" stroke="rgba(255,128,171,0.25)" stroke-width="2"/>
    `,
  },
  fire: {
    bg: ['#e64a19', '#1a0000'],
    accent: '#FF6D00',
    symbol: '🔥',
    art: (s) => `
      <ellipse cx="50%" cy="60%" rx="30%" ry="38%" fill="rgba(255,109,0,0.15)"/>
      <ellipse cx="50%" cy="55%" rx="20%" ry="30%" fill="rgba(255,82,0,0.12)"/>
      <ellipse cx="50%" cy="50%" rx="12%" ry="22%" fill="rgba(255,200,0,0.15)"/>
      <circle cx="${35+s%15}%" cy="30%" r="4%" fill="rgba(255,109,0,0.2)"/>
    `,
  },
  ice: {
    bg: ['#0288d1', '#001a33'],
    accent: '#80DEEA',
    symbol: '❄',
    art: (s) => `
      <circle cx="50%" cy="35%" r="28%" fill="rgba(128,222,234,0.08)" stroke="rgba(128,222,234,0.25)" stroke-width="1"/>
      <line x1="50%" y1="10%" x2="50%" y2="60%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <line x1="26%" y1="23%" x2="74%" y2="47%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <line x1="74%" y1="23%" x2="26%" y2="47%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <circle cx="50%" cy="35%" r="6%" fill="rgba(128,222,234,0.2)"/>
    `,
  },
  magic: {
    bg: ['#6a1b9a', '#0d001a'],
    accent: '#CE93D8',
    symbol: '✧',
    art: (s) => `
      <circle cx="50%" cy="35%" r="26%" fill="rgba(206,147,216,0.08)" stroke="rgba(206,147,216,0.25)" stroke-width="1"/>
      <polygon points="50%,12% 58%,32% 78%,32% 63%,45% 68%,65% 50%,53% 32%,65% 37%,45% 22%,32% 42%,32%" fill="rgba(206,147,216,0.2)" stroke="rgba(206,147,216,0.3)" stroke-width="1"/>
    `,
  },
  ocean: {
    bg: ['#006064', '#001a1f'],
    accent: '#00E5FF',
    symbol: '◈',
    art: (s) => `
      <path d="M0%,55% Q25%,45% 50%,55% Q75%,65% 100%,55%" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.2)" stroke-width="1.5"/>
      <path d="M0%,65% Q25%,55% 50%,65% Q75%,75% 100%,65%" fill="rgba(0,229,255,0.07)" stroke="rgba(0,229,255,0.15)" stroke-width="1"/>
      <circle cx="50%" cy="35%" r="22%" fill="rgba(0,229,255,0.07)" stroke="rgba(0,229,255,0.2)" stroke-width="1"/>
    `,
  },
  default: {
    bg: ['#1565c0', '#0a1628'],
    accent: '#2F7BED',
    symbol: '◆',
    art: (s) => `
      <circle cx="50%" cy="35%" r="25%" fill="rgba(47,123,237,0.1)" stroke="rgba(47,123,237,0.25)" stroke-width="1.5"/>
      <circle cx="50%" cy="35%" r="16%" fill="rgba(47,123,237,0.08)" stroke="rgba(47,123,237,0.2)" stroke-width="1"/>
      <circle cx="${30+s%20}%" cy="${60+s%15}%" r="8%" fill="rgba(47,123,237,0.07)"/>
    `,
  },
}

interface Props {
  name: string
  provider?: string
  vol?: string
}

const VOL_COLORS: Record<string, string> = {
  low: '#00E676', medium: '#17C4BB', 'medium-high': '#FFD700',
  high: '#FF9800', 'very-high': '#F44336',
}

export default function SlotThumb({ name, provider = 'BNG', vol }: Props) {
  const seed = nameToSeed(name)
  const themeKey = detectTheme(name)
  const theme = THEMES[themeKey]
  const volColor = VOL_COLORS[vol ?? ''] || null

  // Subtle noise pattern to add texture
  const patternId = `p${seed}`

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* SVG background artwork */}
      <svg
        viewBox="0 0 100 130"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bg${seed}`} x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor={theme.bg[0]}/>
            <stop offset="100%" stopColor={theme.bg[1]}/>
          </linearGradient>
          <radialGradient id={`glow${seed}`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Base gradient */}
        <rect width="100" height="130" fill={`url(#bg${seed})`}/>

        {/* Glow overlay */}
        <rect width="100" height="130" fill={`url(#glow${seed})`}/>

        {/* Theme art */}
        <g dangerouslySetInnerHTML={{ __html: theme.art(seed) }}/>

        {/* Bottom dark overlay for text readability */}
        <defs>
          <linearGradient id={`text${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.8)"/>
          </linearGradient>
        </defs>
        <rect width="100" height="130" fill={`url(#text${seed})`}/>

        {/* Center symbol */}
        <text
          x="50" y="65"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          fill={theme.accent}
          opacity="0.7"
          style={{ fontFamily: 'system-ui', fontWeight: 900 }}
        >{theme.symbol}</text>

        {/* Provider badge top-left */}
        <rect x="5" y="5" width="18" height="10" rx="3" fill="rgba(0,0,0,0.5)"/>
        <text x="14" y="12" textAnchor="middle" dominantBaseline="middle"
          fontSize="5.5" fill="rgba(255,255,255,0.9)" fontWeight="700"
          style={{ fontFamily: 'system-ui' }}>
          {provider === 'PP' ? 'PP' : 'BNG'}
        </text>

        {/* Vol dot top-right */}
        {volColor && (
          <circle cx="92" cy="8" r="3.5" fill={volColor} opacity="0.9"/>
        )}
      </svg>

      {/* Game name overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '18px 7px 7px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85) 50%)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1.25,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0,
        }}>{name}</p>
      </div>
    </div>
  )
}

```


## Footer

**File:** `src/components/Footer.tsx`


```tsx
import { useState } from 'react'

const SECTIONS = [
  { title: 'Казино', items: ['Оригінальні ігри', 'Слоти', 'Live Casino', 'Провайдери', 'VIP клуб'] },
  { title: 'Спорт', items: ['Лінія', 'Live ставки', 'Кіберспорт', 'Результати'] },
  { title: 'Допомога', items: ['FAQ', 'Служба підтримки', 'Чесна гра', 'Верифікація'] },
  { title: 'Про нас', items: ['Про ROLLON', 'Партнерська програма', 'Блог', 'Кар\'єра'] },
  { title: 'Платежі', items: ['Способи поповнення', 'Виведення коштів', 'Ліміти', 'Крипто'] },
]

const SOCIALS = [
  { icon: '✉️', label: 'Email', href: 'mailto:support@rollon.casino' },
  { icon: '💬', label: 'Telegram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
]

export default function Footer() {
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
          © 2026 ROLLON Casino. Всі права захищені.<br />
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

```

