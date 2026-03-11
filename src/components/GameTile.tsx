import { useNavigate } from 'react-router-dom'

export interface Game {
  id: string
  name: string
  players?: number
  original?: boolean
  thumb: React.ReactNode
  color?: string
  emoji?: string
}

export default function GameTile({ game }: { game: Game }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/game/${game.id}`)}
      style={{ flexShrink: 0, width: 120, cursor: 'pointer' }}>
      <div style={{
        width: 120, height: 160, borderRadius: 12, overflow: 'hidden',
        position: 'relative', background: game.color || '#1A2C38',
        transition: 'transform .15s ease, box-shadow .15s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
        onTouchStart={e => { e.currentTarget.style.transform = 'scale(.97)' }}
        onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)' }}>
        {game.thumb}
        {game.original && (
          <div style={{
            position: 'absolute', bottom: 7, left: 7,
            background: 'rgba(47,123,237,0.95)',
            borderRadius: 5, fontSize: 8, fontWeight: 800, color: '#fff',
            padding: '3px 7px', textTransform: 'uppercase', letterSpacing: 0.5,
          }}>
            Original
          </div>
        )}
        {/* Bottom gradient for text readability */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}/>
      </div>
      <div style={{ marginTop: 7 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</p>
        {game.players !== undefined && (
          <p style={{ fontSize: 10, color: '#7F8C9B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
            {game.players.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

const T = { w: 120, h: 160 }

// ── Game thumbnails: rich SVG art ──
export const THUMBS: Record<string, React.ReactNode> = {

  mines: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a1628"/><stop offset="1" stopColor="#0d2847"/>
        </linearGradient>
        <radialGradient id="mglow" cx="60" cy="70" r="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F7BED" stopOpacity=".15"/><stop offset="1" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="120" height="160" fill="url(#mg)"/>
      <rect width="120" height="160" fill="url(#mglow)"/>
      {/* 3×3 grid of gems/mines */}
      {[0,1,2].map(r => [0,1,2].map(c => {
        const x=14+c*32, y=22+r*32, isMine=r===1&&c===1
        return (
          <g key={`${r}${c}`}>
            <rect x={x} y={y} width="26" height="26" rx="6"
              fill={isMine ? 'rgba(231,76,60,0.15)' : 'rgba(47,123,237,0.12)'}
              stroke={isMine ? '#e74c3c' : '#2F7BED'} strokeWidth="1.5"/>
            {!isMine && (
              <>
                <polygon points={`${x+13},${y+4} ${x+22},${y+10} ${x+22},${y+20} ${x+13},${y+24} ${x+4},${y+20} ${x+4},${y+10}`} fill="#2F7BED" opacity=".8"/>
                <polygon points={`${x+13},${y+4} ${x+22},${y+10} ${x+13},${y+13}`} fill="#fff" opacity=".3"/>
              </>
            )}
            {isMine && (
              <>
                <circle cx={x+13} cy={y+13} r="7" fill="#e74c3c"/>
                {[0,45,90,135,180,225,270,315].map((a,i) => (
                  <line key={i} x1={x+13+Math.cos(a*Math.PI/180)*7} y1={y+13+Math.sin(a*Math.PI/180)*7}
                    x2={x+13+Math.cos(a*Math.PI/180)*11} y2={y+13+Math.sin(a*Math.PI/180)*11}
                    stroke="#e74c3c" strokeWidth="1.5"/>
                ))}
                <circle cx={x+13} cy={y+13} r="3" fill="#fff" opacity=".5"/>
              </>
            )}
          </g>
        )
      }))}
      <text x="60" y="128" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" letterSpacing="2" fontFamily="system-ui">MINES</text>
      <text x="60" y="143" textAnchor="middle" fill="#2F7BED" fontSize="10" opacity=".9" fontFamily="system-ui">Знайди діаманти</text>
    </svg>
  ),

  aviator: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="av" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a0508"/><stop offset="1" stopColor="#3d0a12"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#av)"/>
      {[[10,15],[25,40],[95,18],[82,58],[40,78],[68,28]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" opacity={0.2+i*0.06}/>
      ))}
      <path d="M8,118 Q35,102 56,82 Q75,62 98,36" stroke="#e74c3c" strokeWidth="2" strokeDasharray="4 3" opacity=".7"/>
      <g transform="translate(74,34) rotate(-32)">
        <path d="M0,0 L28,0 C33,-2 33,2 28,0Z" fill="#fff"/>
        <path d="M7,-7 L17,0 L7,7Z" fill="#e0e0e0"/>
        <path d="M3,-3 L-2,-9 L-5,-3Z" fill="#e0e0e0"/>
        <path d="M3,3 L-2,9 L-5,3Z" fill="#e0e0e0"/>
        <circle cx="20" cy="0" r="3.5" fill="#e74c3c"/>
      </g>
      <rect x="16" y="92" width="88" height="32" rx="8" fill="rgba(231,76,60,0.1)" stroke="#e74c3c" strokeWidth="1"/>
      <text x="60" y="105" textAnchor="middle" fill="#e74c3c" fontSize="9" fontWeight="700" fontFamily="system-ui">МНОЖНИК</text>
      <text x="60" y="118" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900" fontFamily="system-ui">×3.24</text>
      <text x="60" y="143" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900" letterSpacing="1" fontFamily="system-ui">AVIATOR</text>
    </svg>
  ),

  plinko: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="pl" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#080018"/><stop offset="1" stopColor="#180040"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#pl)"/>
      {[[60],[48,72],[36,60,84],[24,48,72,96],[12,36,60,84,108]].map((row,r) =>
        row.map((x,c) => <circle key={`${r}${c}`} cx={x} cy={16+r*16} r="4" fill="#a29bfe" opacity=".85"/>)
      )}
      <circle cx="60" cy="9" r="5" fill="#FFD700"/>
      {[{x:4,c:'#00E676',l:'13x'},{x:26,c:'#2F7BED',l:'3x'},{x:48,c:'#FFD700',l:'1x'},{x:70,c:'#2F7BED',l:'3x'},{x:92,c:'#00E676',l:'13x'}].map(({x,c,l},i) => (
        <g key={i}>
          <rect x={x} y="104" width="20" height="22" rx="4" fill={c} opacity=".15" stroke={c} strokeWidth="1.2"/>
          <text x={x+10} y="119" textAnchor="middle" fill={c} fontSize="9" fontWeight="800" fontFamily="system-ui">{l}</text>
        </g>
      ))}
      <text x="60" y="144" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" letterSpacing="1" fontFamily="system-ui">PLINKO</text>
    </svg>
  ),

  dice: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="di" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#001433"/><stop offset="1" stopColor="#001a50"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#di)"/>
      <rect x="10" y="22" width="50" height="50" rx="10" fill="#fff" opacity=".95"/>
      {[[23,35],[23,47],[23,59],[47,35],[47,47],[47,59]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="4" fill="#0F212E"/>)}
      <rect x="60" y="42" width="50" height="50" rx="10" fill="#2F7BED" opacity=".9"/>
      {[[73,55],[97,55],[73,68],[97,68]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="4" fill="#fff"/>)}
      <rect x="16" y="104" width="88" height="8" rx="4" fill="#213743"/>
      <rect x="16" y="104" width="58" height="8" rx="4" fill="#2F7BED"/>
      <circle cx="74" cy="108" r="8" fill="#fff" stroke="#2F7BED" strokeWidth="2"/>
      <text x="60" y="134" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900" letterSpacing="2" fontFamily="system-ui">DICE</text>
      <text x="60" y="148" textAnchor="middle" fill="#2F7BED" fontSize="10" fontFamily="system-ui">RTP 99%</text>
    </svg>
  ),

  limbo: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="lb" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#001200"/><stop offset="1" stopColor="#002800"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#lb)"/>
      <g transform="translate(48,8)">
        <path d="M12,60 L12,22 Q12,0 22,0 Q32,0 32,22 L32,60Z" fill="#fff" opacity=".9"/>
        <path d="M12,46 L2,62 L12,54Z" fill="#ddd"/>
        <path d="M32,46 L42,62 L32,54Z" fill="#ddd"/>
        <ellipse cx="22" cy="16" rx="9" ry="11" fill="#2F7BED"/>
        <circle cx="22" cy="16" r="4" fill="#fff" opacity=".3"/>
        <path d="M15,60 Q17,74 22,68 Q27,74 29,60Z" fill="#FFD700"/>
        <path d="M17,60 Q19,68 22,64 Q25,68 27,60Z" fill="#e74c3c"/>
      </g>
      <rect x="16" y="96" width="88" height="28" rx="8" fill="rgba(0,230,118,0.08)" stroke="#00E676" strokeWidth="1"/>
      <text x="60" y="107" textAnchor="middle" fill="#00E676" fontSize="9" fontWeight="700" fontFamily="system-ui">ЦІЛЬ</text>
      <text x="60" y="120" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="system-ui">×900.00</text>
      <text x="60" y="145" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" letterSpacing="1" fontFamily="system-ui">LIMBO</text>
    </svg>
  ),

  wheel: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="wh" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#001200"/><stop offset="1" stopColor="#002200"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#wh)"/>
      {['#E74C3C','#2F7BED','#00E676','#FFD700','#9B59B6','#17C4BB','#E74C3C','#2F7BED','#00E676','#FFD700'].map((c,i) => {
        const a1=(i*36-90)*Math.PI/180, a2=((i+1)*36-90)*Math.PI/180, r=46, cx=60, cy=68
        return <path key={i} d={`M${cx},${cy} L${cx+r*Math.cos(a1)},${cy+r*Math.sin(a1)} A${r},${r} 0 0,1 ${cx+r*Math.cos(a2)},${cy+r*Math.sin(a2)}Z`} fill={c} opacity=".88" stroke="#0F212E" strokeWidth=".8"/>
      })}
      <circle cx="60" cy="68" r="10" fill="#0F212E" stroke="#FFD700" strokeWidth="1.5"/>
      <circle cx="60" cy="68" r="4" fill="#FFD700"/>
      <polygon points="60,20 56,30 64,30" fill="#FFD700"/>
      <text x="60" y="130" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900" letterSpacing="1" fontFamily="system-ui">WHEEL</text>
      <text x="60" y="144" textAnchor="middle" fill="#FFD700" fontSize="10" fontFamily="system-ui">Spin & Win</text>
    </svg>
  ),

  keno: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="ke" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08082a"/><stop offset="1" stopColor="#181860"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#ke)"/>
      {[
        [20,22,'7',true],[42,22,'14',false],[64,22,'23',true],[86,22,'3',false],[108,22,'18',false],
        [20,44,'42',false],[42,44,'9',true],[64,44,'31',false],[86,44,'5',false],[108,44,'27',false],
        [20,66,'11',false],[42,66,'6',false],[64,66,'33',true],[86,66,'16',false],[108,66,'8',false],
        [20,88,'2',false],[42,88,'19',false],[64,88,'40',false],[86,88,'25',true],[108,88,'13',true],
      ].map(([x,y,n,hit],i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="9" fill={hit?'#2F7BED':'rgba(255,255,255,0.05)'} stroke={hit?'#FFD700':'#2A3D4D'} strokeWidth={hit?1.5:1}/>
          <text x={x as number} y={+(y as number)+3.5} textAnchor="middle" fill={hit?'#fff':'#556B7C'} fontSize="8" fontWeight={hit?'800':'400'} fontFamily="system-ui">{n}</text>
        </g>
      ))}
      <text x="60" y="112" textAnchor="middle" fill="#FFD700" fontSize="10" fontWeight="700" fontFamily="system-ui">5 ЗБІГІВ · ×500</text>
      <text x="60" y="134" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900" letterSpacing="2" fontFamily="system-ui">KENO</text>
    </svg>
  ),

  hilo: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="hl" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e0010"/><stop offset="1" stopColor="#3a0028"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#hl)"/>
      <rect x="12" y="20" width="32" height="46" rx="5" fill="#fff" opacity=".45"/>
      <rect x="26" y="28" width="32" height="46" rx="5" fill="#fff" opacity=".65"/>
      <rect x="42" y="18" width="36" height="52" rx="6" fill="#fff" stroke="#FFD700" strokeWidth="2"/>
      <text x="47" y="36" fill="#c62828" fontSize="10" fontWeight="900" fontFamily="system-ui">K</text>
      <text x="47" y="48" fill="#c62828" fontSize="10" fontFamily="system-ui">♥</text>
      <text x="60" y="58" textAnchor="middle" fill="#c62828" fontSize="22" fontWeight="900" fontFamily="system-ui">♥</text>
      <rect x="8" y="86" width="48" height="24" rx="8" fill="#00E676"/>
      <text x="32" y="102" textAnchor="middle" fill="#0F212E" fontSize="12" fontWeight="900" fontFamily="system-ui">↑ HIGH</text>
      <rect x="64" y="86" width="48" height="24" rx="8" fill="#e74c3c"/>
      <text x="88" y="102" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" fontFamily="system-ui">↓ LOW</text>
      <text x="60" y="130" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900" letterSpacing="1" fontFamily="system-ui">HI-LO</text>
      <text x="60" y="145" textAnchor="middle" fill="#e74c3c" fontSize="10" fontFamily="system-ui">Вище чи нижче?</text>
    </svg>
  ),

  flip: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="fp" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a1200"/><stop offset="1" stopColor="#1a2a00"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#fp)"/>
      <circle cx="60" cy="66" r="38" fill="#FFD700" opacity=".12"/>
      <circle cx="60" cy="66" r="34" fill="#FFD700" opacity=".9" stroke="#B8860B" strokeWidth="2"/>
      <circle cx="60" cy="66" r="28" fill="none" stroke="#B8860B" strokeWidth="1" opacity=".4"/>
      <path d="M44,60 L44,72 L76,72 L76,60 L69,65 L60,54 L51,65Z" fill="#B8860B"/>
      <text x="28" y="116" textAnchor="middle" fill="#00E676" fontSize="13" fontWeight="900" fontFamily="system-ui">50%</text>
      <text x="60" y="116" textAnchor="middle" fill="#556B7C" fontSize="13" fontFamily="system-ui">|</text>
      <text x="92" y="116" textAnchor="middle" fill="#00E676" fontSize="13" fontWeight="900" fontFamily="system-ui">50%</text>
      <text x="60" y="140" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" letterSpacing="2" fontFamily="system-ui">FLIP</text>
      <text x="60" y="154" textAnchor="middle" fill="#FFD700" fontSize="10" fontFamily="system-ui">×1.98</text>
    </svg>
  ),

  chicken: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="ck" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#160400"/><stop offset="1" stopColor="#300e00"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#ck)"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={8+i*22} y="96" width="17" height="13" rx="3"
          fill={i===2?'rgba(231,76,60,0.15)':'rgba(0,230,118,0.08)'}
          stroke={i===2?'#e74c3c':'#00E676'} strokeWidth="1.2"/>
      ))}
      <text x="19" y="107" textAnchor="middle" fontSize="8" fontFamily="system-ui">🔥</text>
      <ellipse cx="60" cy="64" rx="18" ry="15" fill="#F5D76E"/>
      <circle cx="60" cy="42" r="12" fill="#F5D76E"/>
      <path d="M55,32 Q58,24 60,32 Q62,24 65,32" fill="#e74c3c"/>
      <circle cx="63" cy="40" r="2.5" fill="#fff"/>
      <circle cx="64" cy="40" r="1.2" fill="#1a1a2e"/>
      <path d="M60,44 L65,46 L60,48Z" fill="#F39C12"/>
      <line x1="54" y1="79" x2="48" y2="93" stroke="#F39C12" strokeWidth="2"/>
      <line x1="66" y1="79" x2="72" y2="93" stroke="#F39C12" strokeWidth="2"/>
      <text x="60" y="126" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900" letterSpacing="1" fontFamily="system-ui">CHICKEN</text>
      <text x="60" y="140" textAnchor="middle" fill="#F39C12" fontSize="9" fontFamily="system-ui">Не потрапляй у вогонь!</text>
    </svg>
  ),

  dragon: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="dt" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#160500"/><stop offset="1" stopColor="#2e0e00"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#dt)"/>
      {[0,1,2,3,4,5,6,7].map(lvl => {
        const y=88-lvl*10
        return [0,1,2].map(c => {
          const x=16+c*30, isActive=lvl===3
          return <rect key={`${lvl}${c}`} x={x} y={y} width="24" height="8" rx="3"
            fill={isActive?'rgba(255,215,0,0.18)':lvl<3?'rgba(0,230,118,0.08)':'rgba(255,255,255,0.03)'}
            stroke={isActive?'#FFD700':lvl<3?'#00E676':'#2A3D4D'} strokeWidth={isActive?1.5:1} opacity={lvl>3?0.3:1}/>
        })
      })}
      <text x="60" y="112" textAnchor="middle" fontSize="30" fontFamily="system-ui">🐉</text>
      <text x="60" y="140" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" letterSpacing="0.5" fontFamily="system-ui">DRAGON TOWER</text>
      <text x="60" y="153" textAnchor="middle" fill="#FFD700" fontSize="9" fontFamily="system-ui">Лізь вище!</text>
    </svg>
  ),

  pump: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="pm" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e001e"/><stop offset="1" stopColor="#240040"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#pm)"/>
      <circle cx="60" cy="62" r="38" fill="#2F7BED" opacity=".1"/>
      <ellipse cx="60" cy="60" rx="30" ry="34" fill="#2F7BED" opacity=".85"/>
      <ellipse cx="49" cy="44" rx="9" ry="7" fill="#fff" opacity=".15"/>
      <text x="60" y="54" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="system-ui">×2.40</text>
      <line x1="60" y1="94" x2="60" y2="110" stroke="#B1BAD3" strokeWidth="1.5"/>
      <rect x="46" y="112" width="28" height="12" rx="4" fill="#1A2C38" stroke="#2A3D4D" strokeWidth="1"/>
      <text x="60" y="142" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900" letterSpacing="2" fontFamily="system-ui">PUMP</text>
      <text x="60" y="156" textAnchor="middle" fill="#2F7BED" fontSize="9" fontFamily="system-ui">Накачай або забирай!</text>
    </svg>
  ),

  roulette: (
    <svg width={T.w} height={T.h} viewBox="0 0 120 160">
      <defs>
        <linearGradient id="rl" x1="0" y1="0" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#001500"/><stop offset="1" stopColor="#002800"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="url(#rl)"/>
      {Array(18).fill(0).map((_,i) => {
        const a1=(i*20-90)*Math.PI/180, a2=((i+1)*20-90)*Math.PI/180, r=46, cx=60, cy=68
        const c=i===0?'#00875A':i%2===0?'#E74C3C':'#1a1a2e'
        return <path key={i} d={`M${cx},${cy} L${cx+r*Math.cos(a1)},${cy+r*Math.sin(a1)} A${r},${r} 0 0,1 ${cx+r*Math.cos(a2)},${cy+r*Math.sin(a2)}Z`} fill={c} stroke="#001500" strokeWidth=".5"/>
      })}
      <circle cx="60" cy="68" r="13" fill="#0F212E" stroke="#FFD700" strokeWidth="1.5"/>
      <circle cx="60" cy="68" r="5" fill="#FFD700"/>
      <polygon points="60,20 56,30 64,30" fill="#FFD700"/>
      <circle cx="60" cy="22" r="4" fill="#fff" stroke="#FFD700" strokeWidth="1"/>
      <text x="60" y="130" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900" letterSpacing="1" fontFamily="system-ui">ROULETTE</text>
      <text x="60" y="144" textAnchor="middle" fill="#00E676" fontSize="9" fontFamily="system-ui">До 35× на число</text>
    </svg>
  ),
}
