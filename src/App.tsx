import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangContext, useLangProvider } from './hooks/useLang'
import Layout from './components/Layout'
import Home from './pages/Home'
import Slots from './pages/Slots'
import Bets from './pages/Bets'
import Profile from './pages/Profile'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Statistics from './pages/Statistics'
import Transactions from './pages/Transactions'
import Games from './pages/Games'
import GameMines from './pages/GameMines'
import GamePlinko from './pages/GamePlinko'
import GameAviator from './pages/GameAviator'
import GameDice from './pages/GameDice'
import GameFlip from './pages/GameFlip'
import GameHilo from './pages/GameHilo'
import GameLimbo from './pages/GameLimbo'
import GameRoulette from './pages/GameRoulette'
import GameWheel from './pages/GameWheel'
import GameSlot from './pages/GameSlot'
import GameKeno from './pages/GameKeno'
import GameChicken from './pages/GameChicken'
import GameDragonTower from './pages/GameDragonTower'
import GamePump from './pages/GamePump'
import Sports from './pages/Sports'
import SupportChat from './pages/SupportChat'

export default function App() {
  const langCtx = useLangProvider()

  return (
    <LangContext.Provider value={langCtx}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Slots /></Layout>} path="/slots" />
        <Route element={<Layout><Bets /></Layout>} path="/bets" />
        <Route element={<Layout><Profile /></Layout>} path="/profile" />
        <Route element={<Layout><Deposit /></Layout>} path="/deposit" />
        <Route element={<Layout><Withdraw /></Layout>} path="/withdraw" />
        <Route element={<Layout><Statistics /></Layout>} path="/statistics" />
        <Route element={<Layout><Transactions /></Layout>} path="/transactions" />
        <Route element={<Layout><Games /></Layout>} path="/games" />
        <Route element={<Layout><Sports /></Layout>} path="/sports" />
        <Route element={<Layout><SupportChat /></Layout>} path="/support" />
        <Route element={<GameMines />} path="/game/mines" />
        <Route element={<GamePlinko />} path="/game/plinko" />
        <Route element={<GameAviator />} path="/game/aviator" />
        <Route element={<GameDice />} path="/game/dice" />
        <Route element={<GameFlip />} path="/game/flip" />
        <Route element={<GameHilo />} path="/game/hilo" />
        <Route element={<GameLimbo />} path="/game/limbo" />
        <Route element={<GameRoulette />} path="/game/roulette" />
        <Route element={<GameWheel />} path="/game/wheel" />
        <Route element={<GameSlot />} path="/game/slot/:id" />
        <Route element={<GameKeno />} path="/game/keno" />
        <Route element={<GameChicken />} path="/game/chicken" />
        <Route element={<GameDragonTower />} path="/game/dragon-tower" />
        <Route element={<GamePump />} path="/game/pump" />
      </Routes>
    </BrowserRouter>
    </LangContext.Provider>
  )
}
