import { useState, useCallback } from 'react'
import { useUser } from './useUser'
import { api } from '../utils/api'

const DEMO_BAL_KEY = 'rollon_demo_balance'
const DEMO_MODE_KEY = 'rollon_demo_mode'

function getDemoBalance(): number {
  const v = localStorage.getItem(DEMO_BAL_KEY)
  return v !== null ? parseFloat(v) : 1000
}
function saveDemoBalance(bal: number) {
  localStorage.setItem(DEMO_BAL_KEY, String(Math.max(0, Math.round(bal * 100) / 100)))
}

// Client-side simulation for demo mode (one-shot games)
function simulateOnce(gameType: string, bet: number, cfg: Record<string, unknown>) {
  switch (gameType) {
    case 'dice': {
      const target = Number(cfg.target ?? 50)
      const over = Boolean(cfg.over ?? true)
      const roll = parseFloat((Math.random() * 100).toFixed(2))
      const winChance = over ? 100 - target : target
      const mult = parseFloat((99 / winChance).toFixed(4))
      const won = over ? roll > target : roll < target
      return { won, roll, multiplier: won ? mult : 0, payout: won ? parseFloat((bet * mult).toFixed(2)) : 0, new_balance: 0 }
    }
    case 'flip': {
      const choice = String(cfg.choice ?? 'heads')
      const outcome = Math.random() > 0.5 ? 'heads' : 'tails'
      const won = choice === outcome
      return { won, outcome, multiplier: won ? 1.98 : 0, payout: won ? parseFloat((bet * 1.98).toFixed(2)) : 0 }
    }
    case 'limbo': {
      const target = Number(cfg.target ?? 2.0)
      const r = Math.random()
      const actual = r < 0.01 ? 1.0 : parseFloat(Math.max(1.0, 0.99 / r).toFixed(2))
      const won = actual >= target
      return { won, actual, multiplier: won ? target : 0, payout: won ? parseFloat((bet * target).toFixed(2)) : 0 }
    }
    case 'wheel': {
      const risk = String(cfg.risk ?? 'medium')
      const segsMap: Record<string, number[]> = {
        low:    [1.5, 1.2, 1.0, 0.0, 1.2, 1.5, 1.0, 0.5, 2.0, 1.2],
        medium: [2.0, 0.0, 3.0, 0.0, 5.0, 0.0, 2.0, 0.0, 0.0, 10.0],
        high:   [0.0, 0.0, 0.0, 5.0, 0.0, 0.0, 0.0, 20.0, 0.0, 50.0],
      }
      const segs = segsMap[risk] ?? segsMap.medium
      const idx = Math.floor(Math.random() * segs.length)
      const mult = segs[idx]
      return { won: mult > 0, segment: idx, multiplier: mult, payout: parseFloat((bet * mult).toFixed(2)) }
    }
    case 'keno': {
      const picks = (cfg.picks as number[]) ?? []
      const pool = Array.from({ length: 40 }, (_, i) => i + 1)
      const drawn: number[] = []
      for (let i = 0; i < 20; i++) {
        const ri = Math.floor(Math.random() * pool.length)
        drawn.push(pool.splice(ri, 1)[0])
      }
      const matches = picks.filter(p => drawn.includes(p)).length
      const table: Record<number, number> = { 0: 0, 1: 0, 2: 0.5, 3: 1, 4: 2, 5: 5, 6: 15, 7: 40, 8: 100, 9: 300, 10: 1000 }
      const mult = table[matches] ?? 0
      return { won: mult > 0, drawn, matches, multiplier: mult, payout: parseFloat((bet * mult).toFixed(2)) }
    }
    case 'roulette': {
      const type = String(cfg.type ?? 'red')
      const spin = Math.floor(Math.random() * 37)
      const RED = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
      const color = spin === 0 ? 'green' : (RED.has(spin) ? 'red' : 'black')
      let won = false, mult = 0
      if (type === 'number' && spin === Number(cfg.number)) { won = true; mult = 35 }
      else if (type === 'red' && color === 'red') { won = true; mult = 2 }
      else if (type === 'black' && color === 'black') { won = true; mult = 2 }
      else if (type === 'green' && color === 'green') { won = true; mult = 14 }
      else if (type === 'odd' && spin > 0 && spin % 2 === 1) { won = true; mult = 2 }
      else if (type === 'even' && spin > 0 && spin % 2 === 0) { won = true; mult = 2 }
      else if (type === 'low' && spin >= 1 && spin <= 18) { won = true; mult = 2 }
      else if (type === 'high' && spin >= 19) { won = true; mult = 2 }
      else if (type === 'dozen1' && spin >= 1 && spin <= 12) { won = true; mult = 3 }
      else if (type === 'dozen2' && spin >= 13 && spin <= 24) { won = true; mult = 3 }
      else if (type === 'dozen3' && spin >= 25 && spin <= 36) { won = true; mult = 3 }
      return { won, spin, color, multiplier: mult, payout: parseFloat((bet * mult).toFixed(2)) }
    }
    default:
      return { won: false, payout: 0, multiplier: 0 }
  }
}

export interface UseGameReturn {
  isDemoMode: boolean
  toggleDemo: () => void
  resetDemoBalance: () => void
  balance: number
  isLoggedIn: boolean
  /** For multi-step games: deducts bet upfront */
  startBet: (amount: number) => Promise<{ ok: boolean; newBalance: number }>
  /** For multi-step games: settle at end. multiplier=0 for loss */
  settleBet: (multiplier: number) => Promise<{ winAmount: number; newBalance: number }>
  /** For one-shot games: single round */
  playOnce: (config: Record<string, unknown>, bet: number) => Promise<Record<string, unknown> | null>
  isLoading: boolean
  error: string | null
}

export function useGame(gameType: string): UseGameReturn {
  const { user, refreshUser } = useUser()

  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    // If not logged in, always demo
    if (!user) return true
    return localStorage.getItem(DEMO_MODE_KEY) === 'true'
  })
  const [demoBalance, setDemoBalance] = useState<number>(getDemoBalance)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [lastBet, setLastBet] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const balance = isDemoMode ? demoBalance : (user?.balance ?? 0)
  const isLoggedIn = !!user

  const toggleDemo = useCallback(() => {
    const next = !isDemoMode
    setIsDemoMode(next)
    localStorage.setItem(DEMO_MODE_KEY, String(next))
  }, [isDemoMode])

  const resetDemoBalance = useCallback(() => {
    setDemoBalance(1000)
    saveDemoBalance(1000)
  }, [])

  const startBet = useCallback(async (amount: number): Promise<{ ok: boolean; newBalance: number }> => {
    if (amount <= 0 || amount > balance) return { ok: false, newBalance: balance }
    setLastBet(amount)
    setError(null)

    if (isDemoMode || !user) {
      const nb = Math.max(0, demoBalance - amount)
      setDemoBalance(nb)
      saveDemoBalance(nb)
      setSessionId(null)
      return { ok: true, newBalance: nb }
    }

    try {
      setIsLoading(true)
      const res = await api.startSession(gameType, amount)
      setSessionId(res.session_id)
      await refreshUser()
      return { ok: true, newBalance: res.new_balance }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error'
      setError(msg)
      return { ok: false, newBalance: balance }
    } finally {
      setIsLoading(false)
    }
  }, [balance, demoBalance, isDemoMode, user, gameType, refreshUser])

  const settleBet = useCallback(async (multiplier: number): Promise<{ winAmount: number; newBalance: number }> => {
    if (isDemoMode || !user) {
      const winAmount = multiplier > 0 ? parseFloat((lastBet * multiplier).toFixed(2)) : 0
      const nb = Math.max(0, demoBalance + winAmount)
      setDemoBalance(nb)
      saveDemoBalance(nb)
      return { winAmount, newBalance: nb }
    }

    if (!sessionId) return { winAmount: 0, newBalance: user?.balance ?? 0 }
    try {
      setIsLoading(true)
      const res = await api.settleSession(sessionId, multiplier)
      setSessionId(null)
      await refreshUser()
      return { winAmount: res.win_amount, newBalance: res.new_balance }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error'
      setError(msg)
      return { winAmount: 0, newBalance: user?.balance ?? 0 }
    } finally {
      setIsLoading(false)
    }
  }, [isDemoMode, user, sessionId, lastBet, demoBalance, refreshUser])

  const playOnce = useCallback(async (
    config: Record<string, unknown>,
    bet: number
  ): Promise<Record<string, unknown> | null> => {
    if (bet <= 0 || bet > balance) return null
    setError(null)
    setLastBet(bet)

    if (isDemoMode || !user) {
      const res = simulateOnce(gameType, bet, config)
      // Update demo balance
      const nb = Math.max(0, demoBalance - bet + (res.payout as number ?? 0))
      setDemoBalance(nb)
      saveDemoBalance(nb)
      return res
    }

    try {
      setIsLoading(true)
      const res = await api.play(gameType, bet, config)
      await refreshUser()
      return res
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error'
      setError(msg)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [balance, demoBalance, isDemoMode, user, gameType, refreshUser])

  return {
    isDemoMode, toggleDemo, resetDemoBalance,
    balance, isLoggedIn,
    startBet, settleBet, playOnce,
    isLoading, error,
  }
}
