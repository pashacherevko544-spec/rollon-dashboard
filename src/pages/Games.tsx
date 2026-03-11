import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/api'
import { useLang } from '../hooks/useLang'

const ORIGINALS = [
  { id: 'dice', name: 'Dice', emoji: '🎲', color: '#1475e1' },
  { id: 'mines', name: 'Mines', emoji: '💣', color: '#ed4163' },
  { id: 'plinko', name: 'Plinko', emoji: '📍', color: '#00d4aa' },
  { id: 'aviator', name: 'Aviator', emoji: '✈️', color: '#f59e0b' },
  { id: 'pump', name: 'Crash', emoji: '📈', color: '#e74c3c' },
  { id: 'limbo', name: 'Limbo', emoji: '🎯', color: '#9b59b6' },
  { id: 'wheel', name: 'Wheel', emoji: '🎡', color: '#00e701' },
  { id: 'flip', name: 'Flip', emoji: '🪙', color: '#ffd700' },
  { id: 'hilo', name: 'Hi-Lo', emoji: '🃏', color: '#1475e1' },
  { id: 'keno', name: 'Keno', emoji: '🔢', color: '#e056a0' },
  { id: 'dragon', name: 'Dragon Tower', emoji: '🐉', color: '#ff6b35' },
]

const SLOT_IDS = [
  'book_of_gold_multichance', 'wolf_power_megaways', 'buffalo_king_megaways',
  'gates_of_olympus', 'sweet_bonanza', 'big_bass_bonanza',
  'starlight_princess', 'sugar_rush', 'the_dog_house_megaways',
  'great_rhino_megaways', 'wild_west_gold', 'madame_destiny_megaways',
]

export default function Games() {
  const navigate = useNavigate()
  const { t } = useLang()
  const [cat, setCat] = useState('lobby')
  const [search, setSearch] = useState('')

  const CATEGORIES = [
    { key: 'lobby',     label: 'Lobby' },
    { key: 'originals', label: 'Rollon' },
    { key: 'new',       label: t('games_new') },
    { key: 'slots',     label: t('nav_slots') },
    { key: 'live',      label: 'Live' },
    { key: 'providers', label: t('providers_label') },
  ]

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #2d4a5a', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c.key} onClick={() => setCat(c.key)} style={{
            flexShrink: 0, padding: '12px 16px', background: 'none', border: 'none',
            borderBottom: cat === c.key ? '2px solid #00d4aa' : '2px solid transparent',
            color: cat === c.key ? '#fff' : '#557086',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{c.label}</button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '12px 16px' }}>
        <div className="search-bar">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="#557086" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="#557086" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t('search_games')}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 14, outline: 'none', flex: 1 }} />
        </div>
      </div>

      {/* Originals */}
      {(cat === 'lobby' || cat === 'originals') && (
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <h3 style={{ color: '#00d4aa' }}>{t('games_rollon')}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px' }}>
            {ORIGINALS.filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase())).map(g => (
              <div key={g.id} onClick={() => navigate(`/game/${g.id}`)} style={{
                background: '#213743', borderRadius: 12, overflow: 'hidden',
                border: '1px solid #2d4a5a', cursor: 'pointer',
              }}>
                <div style={{
                  height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${g.color}22, ${g.color}08)`,
                  fontSize: 28,
                }}>{g.emoji}</div>
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', textAlign: 'center' }}>{g.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slots grid */}
      {(cat === 'lobby' || cat === 'slots' || cat === 'new') && (
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <h3>🎰 {cat === 'new' ? t('games_new') : t('nav_slots')}</h3>
            {cat === 'lobby' && <button className="see-all" onClick={() => navigate('/slots')}>{t('home_all_games')} →</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px' }}>
            {SLOT_IDS.map(id => (
              <div key={id} onClick={() => navigate(`/slot/${id}`)} style={{ cursor: 'pointer' }}>
                <div style={{
                  width: '100%', aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden',
                  background: '#213743', border: '1px solid #2d4a5a',
                }}>
                  <img src={`${API}/img/bng/${id}`} alt={id}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#c4cdd6', marginTop: 4 }}>
                  {id.replace(/_/g, ' ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live */}
      {(cat === 'lobby' || cat === 'live') && (
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <h3>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ed4163', display: 'inline-block', marginRight: 6 }} />
              Live Casino
            </h3>
          </div>
          <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {['Live Blackjack', 'Live Roulette', 'Baccarat', 'Crazy Time', 'Game Shows', 'Monopoly Live'].map((name, i) => (
              <div key={i} style={{
                background: '#213743', borderRadius: 12, overflow: 'hidden',
                border: '1px solid #2d4a5a', padding: 16, textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{['🃏','🎰','💎','⏰','🎪','🎩'][i]}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00e701', display: 'inline-block' }} />
                  <span style={{ fontSize: 10, color: '#00e701' }}>{Math.floor(Math.random() * 200) + 50}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Providers */}
      {cat === 'providers' && (
        <div style={{ padding: '12px 16px' }}>
          {[
            { key: 'pp', name: 'Pragmatic Play', color: '#e74c3c', count: 120 },
            { key: 'bng', name: 'BGaming', color: '#00e676', count: 85 },
            { key: 'n2', name: 'Novomatic', color: '#ff6d00', count: 40 },
            { key: 'platipus', name: 'Platipus', color: '#ab47bc', count: 35 },
            { key: 'gamzix', name: 'Gamzix', color: '#00bcd4', count: 30 },
            { key: 'thunderspin', name: 'ThunderSpin', color: '#ffd700', count: 25 },
            { key: 'turbogames', name: 'TurboGames', color: '#ff4081', count: 20 },
            { key: 'aviatrix', name: 'Aviatrix', color: '#00e5ff', count: 10 },
          ].map(p => (
            <div key={p.key} onClick={() => navigate('/slots')} style={{
              background: '#213743', borderRadius: 10, padding: '14px 14px',
              border: '1px solid #2d4a5a', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: p.color + '18', border: `1px solid ${p.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 18, color: p.color,
              }}>{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#557086' }}>{p.count} {t('nav_games').toLowerCase()}</div>
              </div>
              <span style={{ color: '#557086', fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
