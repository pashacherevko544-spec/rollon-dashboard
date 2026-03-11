export const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let token = localStorage.getItem('rollon_token') || ''

export function setToken(t: string) {
  token = t
  localStorage.setItem('rollon_token', t)
}

async function req(method: string, path: string, body?: object) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Error' }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export const api = {
  auth: (init_data: string) => req('POST', '/auth/telegram', { init_data }),
  me: () => req('GET', '/user/me'),
  play: (game: string, bet: number, config: object) => req('POST', '/game/play', { game, bet, config }),
  startSession: (game_type: string, bet: number) => req('POST', '/game/session/start', { game_type, bet }),
  settleSession: (session_id: number, multiplier: number) => req('POST', '/game/session/settle', { session_id, multiplier }),
  allBets: () => req('GET', '/bets/all'),
  myBets: (limit = 20, offset = 0) => req('GET', `/bets/mine?limit=${limit}&offset=${offset}`),
  deposit: (amount: number, currency = 'USDT') => req('POST', '/wallet/deposit', { amount, currency }),
  checkDeposit: (invoice_id: string, amount: number) => req('POST', '/wallet/deposit/check', { invoice_id, amount }),
  withdraw: (amount: number) => req('POST', '/wallet/withdraw', { amount }),
  // Provider (Transfer Wallet — real money slots)
  providerLaunch: (game_code: string, demo = false, lang = 'uk') =>
    req('POST', '/provider/launch', { game_code, demo, lang }),
  providerDemo: (game_code: string, lang = 'uk') =>
    req('POST', '/provider/demo', { game_code, lang }),
  providerCashout: () => req('POST', '/provider/cashout', {}),
  providerGames: () => req('GET', '/provider/games'),
}

// Telegram WebApp helper
export const tg = (window as any).Telegram?.WebApp
export const tgUser = tg?.initDataUnsafe?.user
