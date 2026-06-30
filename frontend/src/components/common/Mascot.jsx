// 서비스 마스코트 (귀여운 강아지 캐릭터) — 빈 상태/에러/축하에 재사용
// mood: 'sleepy' | 'oops' | 'happy'
export default function Mascot({ mood = 'sleepy', className = 'h-28 w-28' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* 귀 */}
      <ellipse cx="34" cy="40" rx="13" ry="20" fill="#1f63d6" transform="rotate(-18 34 40)" />
      <ellipse cx="86" cy="40" rx="13" ry="20" fill="#1f63d6" transform="rotate(18 86 40)" />
      {/* 얼굴 */}
      <circle cx="60" cy="62" r="38" fill="#d9eaff" />
      <circle cx="60" cy="62" r="38" fill="none" stroke="#b9d8ff" strokeWidth="2" />
      {/* 볼터치 */}
      <circle cx="38" cy="70" r="6" fill="#ffb4c4" opacity="0.7" />
      <circle cx="82" cy="70" r="6" fill="#ffb4c4" opacity="0.7" />

      {/* 눈 — mood별 */}
      {mood === 'sleepy' && (
        <>
          <path d="M44 58 q6 6 12 0" fill="none" stroke="#1a4fae" strokeWidth="3" strokeLinecap="round" />
          <path d="M64 58 q6 6 12 0" fill="none" stroke="#1a4fae" strokeWidth="3" strokeLinecap="round" />
          <text x="86" y="42" fontSize="14" fill="#1f63d6">z</text>
          <text x="94" y="34" fontSize="10" fill="#5b9bf8">z</text>
        </>
      )}
      {mood === 'oops' && (
        <>
          <circle cx="50" cy="58" r="4" fill="#1a4fae" />
          <circle cx="70" cy="58" r="4" fill="#1a4fae" />
          <ellipse cx="60" cy="74" rx="5" ry="6" fill="#1a4fae" />
        </>
      )}
      {mood === 'happy' && (
        <>
          <path d="M44 60 q6 -7 12 0" fill="none" stroke="#1a4fae" strokeWidth="3" strokeLinecap="round" />
          <path d="M64 60 q6 -7 12 0" fill="none" stroke="#1a4fae" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 72 q8 8 16 0" fill="none" stroke="#1a4fae" strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* 코 */}
      {mood !== 'oops' && <ellipse cx="60" cy="68" rx="4" ry="3" fill="#1a4fae" />}
    </svg>
  );
}
