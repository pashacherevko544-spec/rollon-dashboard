// Mini 32×32 game icons for bets table

const S = 32

const icons: Record<string, JSX.Element> = {
  Mines: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#0d1b4a"/>
      <circle cx="16" cy="16" r="7" fill="#e74c3c"/>
      {[0,90,180,270].map((a,i) => (
        <line key={i}
          x1={16+Math.cos(a*Math.PI/180)*7} y1={16+Math.sin(a*Math.PI/180)*7}
          x2={16+Math.cos(a*Math.PI/180)*10} y2={16+Math.sin(a*Math.PI/180)*10}
          stroke="#e74c3c" strokeWidth="1.5"/>
      ))}
      <circle cx="16" cy="16" r="3" fill="#fff" opacity=".7"/>
    </svg>
  ),
  Aviator: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#3d0505"/>
      <path d="M6,22 Q12,18 16,14 Q20,10 26,6" stroke="#e74c3c" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7"/>
      <g transform="translate(17,10) rotate(-30)">
        <path d="M0,0 L14,0 C16,-1 16,1 14,0Z" fill="#fff"/>
        <path d="M5,-4 L10,0 L5,4Z" fill="#ccc"/>
        <path d="M2,-2 L0,-5 L-2,-2Z" fill="#ccc"/>
        <path d="M2,2 L0,5 L-2,2Z" fill="#ccc"/>
      </g>
    </svg>
  ),
  Plinko: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#0a0020"/>
      {[[16,5],[10,11],[22,11],[4,17],[16,17],[28,17]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#a29bfe"/>
      ))}
      <circle cx="16" cy="5" r="3.5" fill="#FFD700" opacity=".9"/>
      {[
        {x:3,c:'#00E676'},{x:11,c:'#2F7BED'},{x:19,c:'#FFD700'},{x:27,c:'#00E676'}
      ].map(({x,c},i) => (
        <rect key={i} x={x} y="24" width="6" height="6" rx="2" fill={c} opacity=".7"/>
      ))}
    </svg>
  ),
  Chicken: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#1a0500"/>
      <ellipse cx="16" cy="18" rx="8" ry="7" fill="#F5D76E"/>
      <circle cx="16" cy="10" r="6" fill="#F5D76E"/>
      <path d="M14,5 Q15.5,1 16,5 Q16.5,1 18,5" fill="#e74c3c"/>
      <circle cx="18" cy="9" r="1.5" fill="#1a1a2e"/>
      <path d="M16,12 L19,13 L16,14Z" fill="#F39C12"/>
    </svg>
  ),
  Dice: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#001433"/>
      <rect x="3" y="5" width="16" height="16" rx="4" fill="#fff" opacity=".95"/>
      {[[7,9],[13,9],[10,13],[7,17],[13,17]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#1a1a2e"/>
      ))}
      <rect x="13" y="11" width="16" height="16" rx="4" fill="#2F7BED" opacity=".9"/>
      {[[17,15],[25,15],[17,23],[25,23]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#fff"/>
      ))}
    </svg>
  ),
  Limbo: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#001400"/>
      <g transform="translate(10,3)">
        <path d="M5,20 L5,8 Q5,0 10,0 Q15,0 15,8 L15,20Z" fill="#fff"/>
        <path d="M5,15 L1,20 L5,18Z" fill="#ccc"/>
        <path d="M15,15 L19,20 L15,18Z" fill="#ccc"/>
        <ellipse cx="10" cy="7" rx="4" ry="5" fill="#2F7BED"/>
        <path d="M6,20 Q8,26 10,24 Q12,26 14,20Z" fill="#FFD700"/>
        <path d="M7,20 Q9,23 10,22 Q11,23 13,20Z" fill="#e74c3c"/>
      </g>
    </svg>
  ),
  Wheel: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#001a00"/>
      {['#E74C3C','#2F7BED','#00E676','#FFD700','#9B59B6','#17C4BB','#E74C3C','#2F7BED','#00E676','#FFD700'].map((c,i) => {
        const a1=(i*36-90)*Math.PI/180, a2=((i+1)*36-90)*Math.PI/180, r=13, cx=16, cy=16
        return <path key={i} d={`M${cx},${cy} L${cx+r*Math.cos(a1)},${cy+r*Math.sin(a1)} A${r},${r} 0 0,1 ${cx+r*Math.cos(a2)},${cy+r*Math.sin(a2)}Z`} fill={c} stroke="#001a00" strokeWidth=".5"/>
      })}
      <circle cx="16" cy="16" r="4" fill="#0F212E" stroke="#FFD700" strokeWidth="1"/>
      <polygon points="16,1 14,6 18,6" fill="#FFD700"/>
    </svg>
  ),
  Keno: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#0a0a20"/>
      {[
        [8,8,true],[16,8,false],[24,8,true],
        [8,16,false],[16,16,true],[24,16,false],
        [8,24,true],[16,24,false],[24,24,true],
      ].map(([x,y,hit],i) => (
        <circle key={i} cx={x as number} cy={y as number} r="5"
          fill={hit ? '#2F7BED' : '#1A2C38'}
          stroke={hit ? '#FFD700' : '#2A3D4D'} strokeWidth="1"/>
      ))}
    </svg>
  ),
  'Hi-Lo': (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#200010"/>
      <rect x="4" y="5" width="16" height="22" rx="3" fill="#fff" stroke="#e0e0e0" strokeWidth=".5"/>
      <text x="7" y="16" fill="#c62828" fontSize="8" fontWeight="900">A</text>
      <text x="7" y="24" fill="#c62828" fontSize="10">♥</text>
      <rect x="12" y="9" width="16" height="22" rx="3" fill="#fff" stroke="#FFD700" strokeWidth="1.5"/>
      <text x="15" y="20" fill="#c62828" fontSize="8" fontWeight="900">K</text>
      <text x="15" y="28" fill="#c62828" fontSize="8">♦</text>
    </svg>
  ),
  Flip: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#0a1400"/>
      <circle cx="16" cy="16" r="12" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="9" fill="none" stroke="#B8860B" strokeWidth="1" opacity=".4"/>
      <path d="M10,13 L10,19 L22,19 L22,13 L18,16 L16,11 L14,16Z" fill="#B8860B"/>
    </svg>
  ),
  Dragon: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#1a0500"/>
      {[0,1,2,3].map(lvl => (
        [0,1].map(c => (
          <rect key={`${lvl}${c}`} x={6+c*12} y={8+lvl*6} width="10" height="4" rx="2"
            fill={lvl===0 ? '#FFD70030' : '#1A2C38'}
            stroke={lvl===0 ? '#FFD700' : lvl<2 ? '#00E676' : '#2A3D4D'} strokeWidth="1" opacity={lvl>1 ? 0.5 : 1}/>
        ))
      ))}
      <text x="16" y="30" textAnchor="middle" fontSize="8">🐉</text>
    </svg>
  ),
  Pump: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#120020"/>
      <ellipse cx="16" cy="14" rx="10" ry="11" fill="#2F7BED" opacity=".85"/>
      <ellipse cx="12" cy="10" rx="4" ry="3" fill="#fff" opacity=".2"/>
      <line x1="16" y1="25" x2="16" y2="30" stroke="#B1BAD3" strokeWidth="1.5"/>
      <rect x="11" y="29" width="10" height="3" rx="1.5" fill="#213743" stroke="#2A3D4D" strokeWidth=".5"/>
    </svg>
  ),
  Roulette: (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#001a00"/>
      {Array(12).fill(0).map((_,i) => {
        const a1=(i*30-90)*Math.PI/180, a2=((i+1)*30-90)*Math.PI/180, r=13, cx=16, cy=16
        const c = i===0 ? '#00875A' : i%2===0 ? '#E74C3C' : '#1a1a2e'
        return <path key={i} d={`M${cx},${cy} L${cx+r*Math.cos(a1)},${cy+r*Math.sin(a1)} A${r},${r} 0 0,1 ${cx+r*Math.cos(a2)},${cy+r*Math.sin(a2)}Z`} fill={c} stroke="#001a00" strokeWidth=".5"/>
      })}
      <circle cx="16" cy="16" r="4" fill="#0F212E" stroke="#FFD700" strokeWidth="1"/>
      <circle cx="16" cy="16" r="2" fill="#FFD700"/>
    </svg>
  ),
}

export default function GameIcon({ name }: { name: string }) {
  const clean = name.replace(/^[^\w]+/, '').trim().split(' ')[0]
  // Try exact match first, then first word
  const icon = icons[name] || icons[clean] ||
    Object.entries(icons).find(([k]) => name.includes(k))?.[1]

  if (!icon) return (
    <div style={{ width: S, height: S, borderRadius: 7, background: '#1A2C38', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
      🎮
    </div>
  )
  return <div style={{ width: S, height: S, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}>{icon}</div>
}
