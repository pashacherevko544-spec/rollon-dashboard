import { useState, useEffect, createContext, useContext } from 'react'
import { api, setToken, tg } from '../utils/api'

export interface User {
  id: number
  tg_id: number
  username: string
  first_name: string
  balance: number
  total_won: number
  total_lost: number
  total_deposited: number
  total_withdrawn: number
  games_played: number
}

interface UserCtx {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
}

export const UserContext = createContext<UserCtx>({
  user: null,
  loading: true,
  refreshUser: async () => {},
})

export function useUser() {
  return useContext(UserContext)
}

export function useUserProvider() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function login() {
    try {
      // Try real Telegram WebApp initData first
      let initData = tg?.initData || ''

      if (!initData) {
        // Dev/browser fallback: use stored token if available
        const stored = localStorage.getItem('rollon_token')
        if (stored) {
          setToken(stored)
          try {
            const u = await api.me()
            setUser(u)
            setLoading(false)
            return
          } catch {
            localStorage.removeItem('rollon_token')
          }
        }

        // No token, use dev initData
        const devUser = { id: 722755021, username: 'pavlo', first_name: 'Павло' }
        initData = `user=${encodeURIComponent(JSON.stringify(devUser))}&hash=devmode`
      }

      const res = await api.auth(initData)
      setToken(res.token)
      setUser(res.user)
    } catch (e) {
      console.error('Auth failed:', e)
      // Auth failed — user stays null (demo mode)
    } finally {
      setLoading(false)
    }
  }

  async function refreshUser() {
    try {
      const u = await api.me()
      setUser(u)
    } catch {
      // Ignore, keep stale data
    }
  }

  useEffect(() => {
    login()
    // Auto-refresh balance every 30s
    const iv = setInterval(refreshUser, 30_000)
    return () => clearInterval(iv)
  }, [])

  return { user, loading, refreshUser }
}
