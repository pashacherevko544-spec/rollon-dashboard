import { useState, useMemo } from 'react'
import { useLang } from '../hooks/useLang'
import { useNavigate } from 'react-router-dom'
import bngGames from '../data/bng_games.json'
import gdriveImages from '../data/gdrive_images.json'
import SlotThumb from '../components/SlotThumb'
import { API } from '../utils/api'

const GDRIVE = gdriveImages as Record<string, string>

// Google Drive thumbnail URL
function gdriveUrl(gameId: string): string {
  const id = GDRIVE[gameId]
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w600-h600` : ''
}

function hasImage(gameId: string): boolean {
  return !!GDRIVE[gameId]
}

type Game = { id: string; name: string; genre?: string; rtp?: string; vol_range?: string; buy_feature?: boolean; provider: string; provider_name?: string }

// Сортуємо: спочатку з картинками, потім без
function sortWithImages(games: Game[]): Game[] {
  return [...games].sort((a, b) => (hasImage(b.id) ? 1 : 0) - (hasImage(a.id) ? 1 : 0))
}

const bng = sortWithImages(bngGames as Game[])

function SlotCard({
  srcs, name, rtp, vol, provider, buy, maxWin, onClick,
}: {
  srcs: string[]; name: string; rtp: string; vol: string; provider: 'PP' | 'BNG';
  buy: boolean; maxWin?: string; onClick: () => void;
}) {
  const [stage, setStage] = useState(0)

  return (
    <div onClick={onClick} style={{ cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1 / 1',
        borderRadius: 10, overflow: 'hidden', background: '#213743',
        border: '1px solid #2d4a5a',
      }}>
        {stage < srcs.length ? (
          <img src={srcs[stage]} alt={name} referrerPolicy="origin"
            onError={() => setStage(s => s + 1)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <SlotThumb name={name} rtp={rtp} vol={vol} provider={provider} buy={buy} maxWin={maxWin} />
        )}
      </div>
      <p style={{
        fontSize: 11, fontWeight: 600, color: '#c4cdd6', margin: 0,
        lineHeight: 1.3, display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden', wordBreak: 'break-word',
      }}>{name}</p>
    </div>
  )
}

function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate()
  const gdrive = gdriveUrl(game.id)
  const srcs = gdrive
    ? [gdrive, `${API}/img/${game.provider}/${game.id}`]
    : [`${API}/img/${game.provider}/${game.id}`]

  return (
    <SlotCard
      srcs={srcs}
      name={game.name}
      rtp={game.rtp || ''}
      vol={game.vol_range || ''}
      provider='BNG'
      buy={game.buy_feature || false}
      onClick={() => navigate(`/game/slot/${game.id}`)}
    />
  )
}

const ALL_GAMES: Game[] = sortWithImages(bng)

type ProviderKey = 'all' | 'bng'

export default function Slots() {
  const [activeProvider, setActiveProvider] = useState<ProviderKey>('all')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const { t } = useLang()

  const PROVIDER_TABS: { key: ProviderKey; label: string; color: string; games: Game[] }[] = [
    { key: 'all', label: t('slots_all'), color: '#00d4aa', games: ALL_GAMES },
    { key: 'bng', label: 'BGaming',     color: '#00E676', games: bng },
  ]

  const FILTERS = [
    { key: 'all',      label: `🎮 ${t('slots_all')}` },
    { key: 'top',      label: '🔥 Top' },
    { key: 'buy',      label: '💰 Buy Feature' },
    { key: 'highvol',  label: '🚀 High Vol.' },
    { key: 'megaways', label: '⚡ Megaways' },
  ]

  const providerGames = useMemo(() =>
    PROVIDER_TABS.find(tab => tab.key === activeProvider)?.games ?? ALL_GAMES,
    [activeProvider, t]
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

  const activeTab = PROVIDER_TABS.find(tab => tab.key === activeProvider)!

  return (
    <div style={{ background: '#0f212e', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: '#1a2c38', borderBottom: '1px solid #2d4a5a',
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => window.history.back()} style={{
          background: '#213743', border: '1px solid #2d4a5a', color: '#8a9bb0', fontSize: 18,
          cursor: 'pointer', width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>🎰 {t('slots_title')}</p>
          <p style={{ fontSize: 11, color: '#557086', marginTop: 1 }}>
            {filtered.length} · {PROVIDER_TABS.length - 1} {t('providers_label').toLowerCase()}
          </p>
        </div>
        {activeProvider !== 'all' && (
          <span style={{
            background: activeTab.color + '18', border: `1px solid ${activeTab.color}33`,
            borderRadius: 8, padding: '4px 10px', fontSize: 10, color: activeTab.color, fontWeight: 700,
          }}>{activeTab.label}</span>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: '12px 16px 0' }}>
        <div className="search-bar">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="#557086" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="#557086" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`${t('search_games').replace('...', '')} (${ALL_GAMES.length})...`}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 14, outline: 'none', flex: 1 }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#557086', cursor: 'pointer', fontSize: 16 }}>✕</button>}
        </div>
      </div>

      {/* Provider tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #2d4a5a', marginTop: 12, scrollbarWidth: 'none' }}>
        {PROVIDER_TABS.map(tab => {
          const active = activeProvider === tab.key
          return (
            <button key={tab.key} onClick={() => { setActiveProvider(tab.key); setFilter('all'); setSearch('') }}
              style={{
                flexShrink: 0, padding: '10px 14px', border: 'none',
                borderBottom: `2px solid ${active ? tab.color : 'transparent'}`,
                background: 'transparent', color: active ? '#fff' : '#557086',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
              }}>
              {tab.key !== 'all' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: tab.color, flexShrink: 0 }} />}
              {tab.label}
              <span style={{ color: '#3a5469', fontWeight: 400 }}>({tab.games.length})</span>
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
          <div className="slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 8px' }}>
            {filtered.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 48, color: '#557086' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Нічого не знайдено</p>
            <p style={{ fontSize: 12, marginTop: 4, color: '#3a5469' }}>Спробуй інший пошук</p>
          </div>
        )}
      </div>
    </div>
  )
}
