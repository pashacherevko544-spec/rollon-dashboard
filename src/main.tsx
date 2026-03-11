import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready(): void
        expand(): void
        close(): void
        MainButton: { show(): void; hide(): void; setText(t: string): void; onClick(fn: () => void): void }
        initDataUnsafe: { user?: { id: number; first_name: string; username?: string } }
        colorScheme: 'light' | 'dark'
        themeParams: Record<string, string>
        setHeaderColor(color: string): void
        setBackgroundColor(color: string): void
      }
    }
  }
}

const tg = window.Telegram?.WebApp
if (tg) {
  tg.ready()
  tg.expand()
  tg.setHeaderColor('#0f212e')
  tg.setBackgroundColor('#0f212e')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
