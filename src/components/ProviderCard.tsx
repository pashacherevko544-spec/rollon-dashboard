import { useNavigate } from 'react-router-dom'

interface Provider {
  id: string
  name: string
  games: number
  color: string
  logo: React.ReactNode
}

function mkLogo(label: string, color: string, fontSize = 9) {
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none">
      <rect width="72" height="32" rx="6" fill={color} opacity=".12"/>
      <rect x=".5" y=".5" width="71" height="31" rx="5.5" stroke={color} strokeOpacity=".2"/>
      <text x="36" y="21" textAnchor="middle" fill={color} fontSize={fontSize} fontWeight="900" letterSpacing=".3"
        style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</text>
    </svg>
  )
}

export const PROVIDERS: Provider[] = [
  { id: 'bgaming',      name: 'BGaming',        games: 182, color: '#2F7BED', logo: mkLogo('BGAMING', '#2F7BED') },
  { id: 'pragmatic',    name: 'Pragmatic Play',  games: 300, color: '#E74C3C', logo: mkLogo('PRAGMATIC', '#E74C3C', 8) },
  { id: 'evolution',    name: 'Evolution',       games: 120, color: '#FFD700', logo: mkLogo('EVOLUTION', '#FFD700', 8) },
  { id: 'netent',       name: 'NetEnt',          games: 200, color: '#00C853', logo: mkLogo('NETENT', '#00C853') },
  { id: 'novomatic',    name: 'Novomatic',       games: 350, color: '#FF6D00', logo: mkLogo('NOVOMATIC', '#FF6D00', 8) },
  { id: 'playtech',     name: 'Playtech',        games: 250, color: '#9B59B6', logo: mkLogo('PLAYTECH', '#9B59B6', 8) },
  { id: 'microgaming',  name: 'Microgaming',     games: 500, color: '#17C4BB', logo: mkLogo('MICRO\nGAMING', '#17C4BB', 8) },
  { id: 'nolimit',      name: 'No Limit City',   games: 80,  color: '#F39C12', logo: mkLogo('NOLIMIT', '#F39C12') },
  { id: 'playngo',      name: "Play'n GO",        games: 270, color: '#FF4081', logo: mkLogo("PLAY'N GO", '#FF4081', 8) },
  { id: 'yggdrasil',   name: 'Yggdrasil',        games: 100, color: '#7C4DFF', logo: mkLogo('YGGDRASIL', '#7C4DFF', 8) },
  { id: 'redtiger',     name: 'Red Tiger',        games: 130, color: '#F44336', logo: mkLogo('RED TIGER', '#F44336', 8) },
  { id: 'hacksaw',      name: 'Hacksaw Gaming',   games: 90,  color: '#00BCD4', logo: mkLogo('HACKSAW', '#00BCD4') },
  { id: 'push',         name: 'Push Gaming',      games: 60,  color: '#8BC34A', logo: mkLogo('PUSH', '#8BC34A') },
  { id: 'quickspin',    name: 'Quickspin',        games: 75,  color: '#FF5252', logo: mkLogo('QUICKSPIN', '#FF5252', 8) },
  { id: 'relax',        name: 'Relax Gaming',     games: 85,  color: '#26C6DA', logo: mkLogo('RELAX', '#26C6DA') },
  { id: 'elk',          name: 'ELK Studios',      games: 55,  color: '#AB47BC', logo: mkLogo('ELK', '#AB47BC') },
  { id: 'betsoft',      name: 'Betsoft',          games: 140, color: '#FF7043', logo: mkLogo('BETSOFT', '#FF7043', 8) },
  { id: 'habanero',     name: 'Habanero',         games: 100, color: '#FFA726', logo: mkLogo('HABANERO', '#FFA726', 8) },
  { id: 'thunderkick',  name: 'Thunderkick',      games: 45,  color: '#EC407A', logo: mkLogo('THUNDER\nKICK', '#EC407A', 8) },
  { id: 'blueprint',    name: 'Blueprint',        games: 80,  color: '#42A5F5', logo: mkLogo('BLUEPRINT', '#42A5F5', 8) },
]

export default function ProviderCard({ provider }: { provider: Provider }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/games?provider=${provider.id}`)}
      style={{ flexShrink: 0, width: 110, cursor: 'pointer' }}>
      <div style={{
        width: 110, height: 72, borderRadius: 10,
        background: '#1A2C38', border: `1px solid #2A3D4D`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6,
        transition: 'border-color .15s',
      }}>
        {provider.logo}
        <p style={{ fontSize: 10, color: '#7F8C9B', fontWeight: 500 }}>
          {provider.games}+ ігор
        </p>
      </div>
    </div>
  )
}
