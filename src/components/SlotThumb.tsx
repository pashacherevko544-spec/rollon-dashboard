// Slot thumbnail — Stake-style game cards with themed SVG artwork

function nameToSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000
  return h
}

// Detect game theme from name keywords
function detectTheme(name: string): ThemeKey {
  const n = name.toLowerCase()
  if (/book|egypt|pharaoh|cleopatra|anubis|pyramid|scarab/.test(n)) return 'egypt'
  if (/dragon|tiger|panda|pearl|jade|lucky|fortune|china|asian/.test(n)) return 'asian'
  if (/gold|treasure|pirate|coin|rich|king|crown|royal|empire/.test(n)) return 'gold'
  if (/fruit|cherry|melon|lemon|orange|joker|classic|777|sizzl/.test(n)) return 'classic'
  if (/wolf|bear|lion|tiger|wild|safari|jungle|africa|drum/.test(n)) return 'wild'
  if (/thunder|zeus|olympus|god|myth|aztec|temple|ancient/.test(n)) return 'myth'
  if (/star|galaxy|space|planet|cosmic|moon|sky|nebula/.test(n)) return 'space'
  if (/candy|sugar|sweet|cake|bonanza|sweet/.test(n)) return 'candy'
  if (/fire|volcano|inferno|blazing|burning|hot|chilli/.test(n)) return 'fire'
  if (/ice|winter|snow|freeze|crystal|diamond|gem/.test(n)) return 'ice'
  if (/magic|witch|wizard|spell|mystic|mystery|dark/.test(n)) return 'magic'
  if (/fish|ocean|sea|mermaid|coral|aqua|water/.test(n)) return 'ocean'
  return 'default'
}

type ThemeKey = 'egypt'|'asian'|'gold'|'classic'|'wild'|'myth'|'space'|'candy'|'fire'|'ice'|'magic'|'ocean'|'default'

interface Theme {
  bg: [string, string]
  accent: string
  symbol: string
  art: (s: number) => string
}

const THEMES: Record<ThemeKey, Theme> = {
  egypt: {
    bg: ['#c8960c', '#5c3a0a'],
    accent: '#FFD700',
    symbol: '𓂀',
    art: (s) => `
      <ellipse cx="50%" cy="30%" rx="22%" ry="28%" fill="rgba(255,215,0,0.18)" stroke="rgba(255,215,0,0.4)" stroke-width="1"/>
      <polygon points="50%,8% 70%,52% 30%,52%" fill="none" stroke="rgba(255,215,0,0.5)" stroke-width="1.5"/>
      <circle cx="50%" cy="${30+s%10}%" r="8%" fill="rgba(255,200,0,0.25)"/>
      <line x1="20%" y1="65%" x2="80%" y2="65%" stroke="rgba(255,215,0,0.2)" stroke-width="1"/>
    `,
  },
  asian: {
    bg: ['#c0392b', '#4a0404'],
    accent: '#FFD700',
    symbol: '龍',
    art: (s) => `
      <circle cx="75%" cy="25%" r="20%" fill="rgba(255,215,0,0.12)"/>
      <circle cx="75%" cy="25%" r="14%" fill="rgba(255,215,0,0.1)"/>
      <path d="M20%,70% Q50%,30% 80%,70%" fill="none" stroke="rgba(255,215,0,0.3)" stroke-width="2"/>
      <circle cx="${40+s%20}%" cy="${50+s%15}%" r="5%" fill="rgba(255,100,0,0.2)"/>
    `,
  },
  gold: {
    bg: ['#b8860b', '#2c1810'],
    accent: '#FFE082',
    symbol: '♛',
    art: (s) => `
      <circle cx="50%" cy="35%" r="25%" fill="none" stroke="rgba(255,215,0,0.3)" stroke-width="2"/>
      <circle cx="50%" cy="35%" r="18%" fill="rgba(255,215,0,0.08)"/>
      <polygon points="50%,15% 56%,30% 72%,30% 60%,40% 64%,56% 50%,46% 36%,56% 40%,40% 28%,30% 44%,30%" fill="rgba(255,200,0,0.25)" stroke="rgba(255,215,0,0.4)" stroke-width="1"/>
    `,
  },
  classic: {
    bg: ['#1a237e', '#0d0d2b'],
    accent: '#FF5252',
    symbol: '7',
    art: (s) => `
      <circle cx="50%" cy="38%" r="28%" fill="rgba(255,82,82,0.1)" stroke="rgba(255,82,82,0.2)" stroke-width="1.5"/>
      <text x="30%" y="48%" font-size="28" fill="rgba(255,82,82,0.5)" font-weight="900">7</text>
      <text x="52%" y="42%" font-size="20" fill="rgba(255,215,0,0.4)" font-weight="900">★</text>
      <circle cx="${70+s%15}%" cy="70%" r="10%" fill="rgba(255,82,82,0.08)"/>
    `,
  },
  wild: {
    bg: ['#2e7d32', '#1b0000'],
    accent: '#76FF03',
    symbol: '🦁',
    art: (s) => `
      <ellipse cx="50%" cy="40%" rx="35%" ry="28%" fill="rgba(118,255,3,0.08)" stroke="rgba(118,255,3,0.2)" stroke-width="1"/>
      <circle cx="${30+s%20}%" cy="60%" r="12%" fill="rgba(0,0,0,0.2)"/>
      <circle cx="${60+s%15}%" cy="65%" r="10%" fill="rgba(0,0,0,0.15)"/>
      <path d="M15%,80% Q50%,50% 85%,80%" fill="none" stroke="rgba(118,255,3,0.2)" stroke-width="1.5"/>
    `,
  },
  myth: {
    bg: ['#1565c0', '#0d0221'],
    accent: '#E040FB',
    symbol: '⚡',
    art: (s) => `
      <circle cx="50%" cy="30%" r="30%" fill="rgba(224,64,251,0.08)" stroke="rgba(224,64,251,0.2)" stroke-width="1"/>
      <path d="M50%,5% L62%,32% L75%,28% L50%,65% L38%,38% L25%,42% Z" fill="rgba(224,64,251,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <circle cx="50%" cy="30%" r="8%" fill="rgba(255,255,255,0.1)"/>
    `,
  },
  space: {
    bg: ['#0d1b4b', '#000510'],
    accent: '#40C4FF',
    symbol: '✦',
    art: (s) => `
      <circle cx="50%" cy="35%" r="22%" fill="rgba(64,196,255,0.1)" stroke="rgba(64,196,255,0.3)" stroke-width="1"/>
      <circle cx="50%" cy="35%" r="15%" fill="rgba(64,196,255,0.07)" stroke="rgba(64,196,255,0.2)" stroke-width="1"/>
      <circle cx="${20+s%10}%" cy="${20+s%15}%" r="2%" fill="rgba(255,255,255,0.6)"/>
      <circle cx="${70+s%15}%" cy="${30+s%10}%" r="1.5%" fill="rgba(255,255,255,0.5)"/>
      <circle cx="${40+s%20}%" cy="${70+s%10}%" r="1%" fill="rgba(255,255,255,0.4)"/>
    `,
  },
  candy: {
    bg: ['#e91e8c', '#4a0030'],
    accent: '#FF80AB',
    symbol: '★',
    art: (s) => `
      <circle cx="30%" cy="30%" r="15%" fill="rgba(255,128,171,0.2)" stroke="rgba(255,128,171,0.3)" stroke-width="1"/>
      <circle cx="70%" cy="25%" r="12%" fill="rgba(255,214,0,0.2)" stroke="rgba(255,214,0,0.3)" stroke-width="1"/>
      <circle cx="55%" cy="60%" r="18%" fill="rgba(255,128,171,0.12)"/>
      <path d="M20%,75% Q50%,40% 80%,75%" fill="none" stroke="rgba(255,128,171,0.25)" stroke-width="2"/>
    `,
  },
  fire: {
    bg: ['#e64a19', '#1a0000'],
    accent: '#FF6D00',
    symbol: '🔥',
    art: (s) => `
      <ellipse cx="50%" cy="60%" rx="30%" ry="38%" fill="rgba(255,109,0,0.15)"/>
      <ellipse cx="50%" cy="55%" rx="20%" ry="30%" fill="rgba(255,82,0,0.12)"/>
      <ellipse cx="50%" cy="50%" rx="12%" ry="22%" fill="rgba(255,200,0,0.15)"/>
      <circle cx="${35+s%15}%" cy="30%" r="4%" fill="rgba(255,109,0,0.2)"/>
    `,
  },
  ice: {
    bg: ['#0288d1', '#001a33'],
    accent: '#80DEEA',
    symbol: '❄',
    art: (s) => `
      <circle cx="50%" cy="35%" r="28%" fill="rgba(128,222,234,0.08)" stroke="rgba(128,222,234,0.25)" stroke-width="1"/>
      <line x1="50%" y1="10%" x2="50%" y2="60%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <line x1="26%" y1="23%" x2="74%" y2="47%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <line x1="74%" y1="23%" x2="26%" y2="47%" stroke="rgba(128,222,234,0.3)" stroke-width="1.5"/>
      <circle cx="50%" cy="35%" r="6%" fill="rgba(128,222,234,0.2)"/>
    `,
  },
  magic: {
    bg: ['#6a1b9a', '#0d001a'],
    accent: '#CE93D8',
    symbol: '✧',
    art: (s) => `
      <circle cx="50%" cy="35%" r="26%" fill="rgba(206,147,216,0.08)" stroke="rgba(206,147,216,0.25)" stroke-width="1"/>
      <polygon points="50%,12% 58%,32% 78%,32% 63%,45% 68%,65% 50%,53% 32%,65% 37%,45% 22%,32% 42%,32%" fill="rgba(206,147,216,0.2)" stroke="rgba(206,147,216,0.3)" stroke-width="1"/>
    `,
  },
  ocean: {
    bg: ['#006064', '#001a1f'],
    accent: '#00E5FF',
    symbol: '◈',
    art: (s) => `
      <path d="M0%,55% Q25%,45% 50%,55% Q75%,65% 100%,55%" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.2)" stroke-width="1.5"/>
      <path d="M0%,65% Q25%,55% 50%,65% Q75%,75% 100%,65%" fill="rgba(0,229,255,0.07)" stroke="rgba(0,229,255,0.15)" stroke-width="1"/>
      <circle cx="50%" cy="35%" r="22%" fill="rgba(0,229,255,0.07)" stroke="rgba(0,229,255,0.2)" stroke-width="1"/>
    `,
  },
  default: {
    bg: ['#1565c0', '#0a1628'],
    accent: '#2F7BED',
    symbol: '◆',
    art: (s) => `
      <circle cx="50%" cy="35%" r="25%" fill="rgba(47,123,237,0.1)" stroke="rgba(47,123,237,0.25)" stroke-width="1.5"/>
      <circle cx="50%" cy="35%" r="16%" fill="rgba(47,123,237,0.08)" stroke="rgba(47,123,237,0.2)" stroke-width="1"/>
      <circle cx="${30+s%20}%" cy="${60+s%15}%" r="8%" fill="rgba(47,123,237,0.07)"/>
    `,
  },
}

interface Props {
  name: string
  provider?: string
  vol?: string
}

const VOL_COLORS: Record<string, string> = {
  low: '#00E676', medium: '#17C4BB', 'medium-high': '#FFD700',
  high: '#FF9800', 'very-high': '#F44336',
}

export default function SlotThumb({ name, provider = 'BNG', vol }: Props) {
  const seed = nameToSeed(name)
  const themeKey = detectTheme(name)
  const theme = THEMES[themeKey]
  const volColor = VOL_COLORS[vol ?? ''] || null

  // Subtle noise pattern to add texture
  const patternId = `p${seed}`

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* SVG background artwork */}
      <svg
        viewBox="0 0 100 130"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bg${seed}`} x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor={theme.bg[0]}/>
            <stop offset="100%" stopColor={theme.bg[1]}/>
          </linearGradient>
          <radialGradient id={`glow${seed}`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Base gradient */}
        <rect width="100" height="130" fill={`url(#bg${seed})`}/>

        {/* Glow overlay */}
        <rect width="100" height="130" fill={`url(#glow${seed})`}/>

        {/* Theme art */}
        <g dangerouslySetInnerHTML={{ __html: theme.art(seed) }}/>

        {/* Bottom dark overlay for text readability */}
        <defs>
          <linearGradient id={`text${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.8)"/>
          </linearGradient>
        </defs>
        <rect width="100" height="130" fill={`url(#text${seed})`}/>

        {/* Center symbol */}
        <text
          x="50" y="65"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          fill={theme.accent}
          opacity="0.7"
          style={{ fontFamily: 'system-ui', fontWeight: 900 }}
        >{theme.symbol}</text>

        {/* Vol dot top-right */}
        {volColor && (
          <circle cx="92" cy="8" r="3.5" fill={volColor} opacity="0.9"/>
        )}
      </svg>

      {/* Game name overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '18px 7px 7px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85) 50%)',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1.25,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0,
        }}>{name}</p>
      </div>
    </div>
  )
}
