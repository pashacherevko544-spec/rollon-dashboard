import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../hooks/useLang'
import { LANGS } from '../i18n/translations'

export default function Profile() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { lang, setLang, t } = useLang()

  return (
    <div>
      {/* User card */}
      <div style={{ padding: '20px 16px' }}>
        <div style={{
          background: '#213743', borderRadius: 16, padding: 20,
          border: '1px solid #2d4a5a', textAlign: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
            border: '3px solid #2F7BED', overflow: 'hidden', background: '#0f212e',
          }}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.first_name || 'Player')}&backgroundColor=0f212e`}
              alt="avatar"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>{user?.first_name || t('profile_player')}</div>
          <div style={{ fontSize: 13, color: '#8a9bb0', marginTop: 2 }}>@{user?.username || 'anonymous'}</div>

          <div style={{
            display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center',
          }}>
            <div style={{ background: '#0f212e', borderRadius: 10, padding: '10px 16px', flex: 1 }}>
              <div style={{ fontSize: 10, color: '#557086' }}>{t('balance')}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#00d4aa' }}>${(user?.balance ?? 0).toFixed(2)}</div>
            </div>
            <div style={{ background: '#0f212e', borderRadius: 10, padding: '10px 16px', flex: 1 }}>
              <div style={{ fontSize: 10, color: '#557086' }}>{t('profile_games_played')}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{user?.games_played ?? 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div style={{ padding: '0 16px' }}>
        {[
          { icon: '📊', label: t('profile_stats'), path: '/statistics' },
          { icon: '📋', label: t('profile_transactions'), path: '/transactions' },
          { icon: '🎲', label: t('profile_my_bets'), path: '/bets' },
          { icon: '📥', label: t('profile_deposit'), path: '/deposit' },
          { icon: '📤', label: t('profile_withdraw_btn'), path: '/withdraw' },
          { icon: '🎧', label: t('profile_support'), path: '/support' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 12px', background: '#213743', border: '1px solid #2d4a5a',
            borderRadius: 10, marginBottom: 8, cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ color: '#c4cdd6', fontWeight: 600, fontSize: 14, flex: 1 }}>{item.label}</span>
            <span style={{ color: '#557086' }}>›</span>
          </button>
        ))}
      </div>

      {/* Language */}
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10 }}>🌐 {t('profile_language')}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              padding: '8px 14px', borderRadius: 8, border: 'none',
              background: lang === l.code ? '#00d4aa' : '#213743',
              color: lang === l.code ? '#0f212e' : '#8a9bb0',
              fontWeight: 600, fontSize: 12, cursor: 'pointer',
            }}>{l.flag} {l.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
