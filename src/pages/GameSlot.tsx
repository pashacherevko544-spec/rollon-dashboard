import { useEffect, useState } from 'react'
import { useLang } from '../hooks/useLang'
import { useParams, useNavigate } from 'react-router-dom'
import { api, tg } from '../utils/api'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getGameCode(gameId: string): string {
  // pp_vs20fruitsw → vs20fruitsw (Pragmatic Play code, but PP not activated on stage)
  if (gameId.startsWith('pp_')) return gameId.replace('pp_', '')
  // live games — not supported
  if (gameId.startsWith('live_')) return ''
  // BNG: game id = game code as-is
  return gameId
}

function getProvider(gameId: string): string {
  if (gameId.startsWith('live_')) return 'Evolution'
  if (gameId.startsWith('pp_')) return 'Pragmatic Play'
  return 'BGaming'
}

function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function getGameName(gameId: string): string {
  if (gameId.startsWith('live_')) return toTitleCase(gameId.replace('live_', '').replace(/([A-Z])/g, ' $1').trim())
  if (gameId.startsWith('pp_')) return toTitleCase(gameId.replace('pp_', '').replace(/_/g, ' ').replace(/vs\d+/i, '').trim())
  return toTitleCase(gameId.replace(/_/g, ' '))
}

// Demo через backend API

// ── Component ─────────────────────────────────────────────────────────────────

export default function GameSlot() {
  const { id: gameId } = useParams<{ id: string }>()
  const { t } = useLang()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'choose' | 'real' | 'demo'>('choose')
  const [iframeUrl, setIframeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLive = gameId?.startsWith('live_') ?? false
  const provider = gameId ? getProvider(gameId) : ''
  const gameName = gameId ? getGameName(gameId) : ''
  const gameCode = gameId ? getGameCode(gameId) : ''
  const hasDemo = !isLive && Boolean(gameCode)
  const isLoggedIn = Boolean(localStorage.getItem('rollon_token'))

  // If no choice needed (live = dead end), redirect immediately
  useEffect(() => {
    if (isLive) setMode('choose') // will show "coming soon" card
  }, [isLive])

  async function launchReal() {
    if (!gameCode) { setError('Невідомий код гри'); return }
    setLoading(true)
    setError('')
    try {
      const data = await api.providerLaunch(gameCode, false, 'uk')
      setIframeUrl(data.url)
      setMode('real')
    } catch (e: any) {
      setError(e.message || t('game_error_launch'))
    } finally {
      setLoading(false)
    }
  }

  async function launchDemo() {
    if (!gameCode) { setError(t('game_demo_unavail')); return }
    setLoading(true)
    setError('')
    try {
      const data = await api.providerDemo(gameCode, 'uk')
      setIframeUrl(data.url)
      setMode('demo')
    } catch (e: any) {
      setError(e.message || t('game_error_demo'))
    } finally {
      setLoading(false)
    }
  }

  // ── LIVE — coming soon ──────────────────────────────────────────────────────
  if (isLive) {
    return (
      <div style={{ background: '#0F212E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0a1520', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>🎥 {gameName}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#7F8C9B', background: '#213743', padding: '3px 10px', borderRadius: 12 }}>Evolution</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24 }}>
          <div style={{ fontSize: 64 }}>🎥</div>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{gameName}</p>
          <div style={{ background: '#FFD70015', border: '1px solid #FFD70040', borderRadius: 12, padding: 16, maxWidth: 320, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#FFD700', fontWeight: 700, marginBottom: 6 }}>⏳ Підключення в процесі</p>
            <p style={{ fontSize: 12, color: '#B1BAD3' }}>Evolution потребує окремий контракт і API credentials.</p>
          </div>
          <button onClick={() => navigate(-1)} style={{ padding: '12px 32px', background: '#2F7BED', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {t('btn_back')}
          </button>
        </div>
      </div>
    )
  }

  // ── IFRAME MODE (real or demo) ──────────────────────────────────────────────
  if ((mode === 'real' || mode === 'demo') && iframeUrl) {
    return (
      <div style={{ background: '#0F212E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0a1520', borderBottom: '1px solid #1A2C38', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button onClick={() => { setMode('choose'); setIframeUrl('') }} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer', flexShrink: 0 }}>←</button>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            🎰 {gameName || gameId}
          </span>
          <span style={{ fontSize: 10, color: '#7F8C9B', background: '#213743', padding: '3px 8px', borderRadius: 10, flexShrink: 0 }}>
            {provider}
          </span>
          {mode === 'demo' ? (
            <span style={{ fontSize: 10, background: '#FFD70020', color: '#FFD700', border: '1px solid #FFD70040', padding: '3px 8px', borderRadius: 10, fontWeight: 700, flexShrink: 0 }}>
              🎮 DEMO
            </span>
          ) : (
            <span style={{ fontSize: 10, background: '#00E67620', color: '#00E676', border: '1px solid #00E67640', padding: '3px 8px', borderRadius: 10, fontWeight: 700, flexShrink: 0 }}>
              💰 REAL
            </span>
          )}
        </div>
        <iframe
          src={iframeUrl}
          style={{ flex: 1, border: 'none', width: '100%', minHeight: 'calc(100vh - 52px)', display: 'block' }}
          allow="fullscreen; autoplay; payment"
          allowFullScreen
          title={gameName}
        />
        <div style={{ position: 'fixed', bottom: 14, right: 14 }}>
          <a href={iframeUrl} target="_blank" rel="noreferrer"
            style={{ display: 'block', padding: '8px 14px', background: 'rgba(47,123,237,0.92)', borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
            ↗ Відкрити окремо
          </a>
        </div>
      </div>
    )
  }

  // ── CHOICE SCREEN ───────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#0F212E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#0a1520', borderBottom: '1px solid #1A2C38', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#B1BAD3', fontSize: 22, cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>🎰 {gameName || gameId}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#7F8C9B', background: '#213743', padding: '3px 8px', borderRadius: 10 }}>{provider}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 28 }}>
        <div style={{ fontSize: 72 }}>🎰</div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 6 }}>{gameName}</p>
          <p style={{ fontSize: 13, color: '#7F8C9B' }}>{provider}</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#F44336' + '20', border: '1px solid #F44336' + '50', borderRadius: 12, padding: '10px 18px', maxWidth: 320, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#F44336' }}>{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 320 }}>
          {/* Real money button */}
          {isLoggedIn ? (
            <button
              onClick={launchReal}
              disabled={loading}
              style={{
                padding: '16px 0', borderRadius: 14, border: 'none', width: '100%',
                background: loading ? '#1A2C38' : 'linear-gradient(135deg, #2F7BED, #1a5cb8)',
                color: '#fff', fontSize: 16, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 4px 20px rgba(47,123,237,0.35)',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 20, height: 20, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Запускаємо...
                </>
              ) : (
                <>{t('game_play_real')}</>
              )}
            </button>
          ) : (
            <div style={{ background: '#2F7BED' + '15', border: '1px solid #2F7BED' + '40', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#B1BAD3', marginBottom: 4 }}>💰 Реальна гра</p>
              <p style={{ fontSize: 12, color: '#7F8C9B' }}>Відкрий через Telegram щоб грати на гроші</p>
            </div>
          )}

          {/* Demo button */}
          {hasDemo && (
            <button
              onClick={launchDemo}
              style={{
                padding: '14px 0', borderRadius: 14, border: '1px solid #FFD700' + '40', width: '100%',
                background: '#FFD700' + '10',
                color: '#FFD700', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
            >
              🎮 Спробувати демо
            </button>
          )}
        </div>

        {/* Game code badge */}
        <p style={{ fontSize: 10, color: '#3A5068', marginTop: 4 }}>

        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
