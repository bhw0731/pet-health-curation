// 종 선택용 SVG 아이콘 (currentColor로 색상 상속 → 선택 시 브랜드 컬러)

export function DogIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 늘어진 귀 */}
      <path d="M18 16 C9 19 9 33 17 37" />
      <path d="M46 16 C55 19 55 33 47 37" />
      {/* 얼굴 */}
      <path d="M18 16 C18 11 46 11 46 16 C51 25 48 41 32 47 C16 41 13 25 18 16 Z" />
      {/* 눈 */}
      <circle cx="25" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle cx="39" cy="28" r="2" fill="currentColor" stroke="none" />
      {/* 코 + 입 */}
      <circle cx="32" cy="34" r="2.4" fill="currentColor" stroke="none" />
      <path d="M32 36 v2.5" />
      <path d="M27 41 C29 43 35 43 37 41" />
    </svg>
  );
}

export function CatIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 뾰족한 귀 + 얼굴 윤곽 */}
      <path d="M16 13 L21 25 C24 23 40 23 43 25 L48 13 C52 27 50 42 32 48 C14 42 12 27 16 13 Z" />
      {/* 눈 */}
      <circle cx="25" cy="31" r="2" fill="currentColor" stroke="none" />
      <circle cx="39" cy="31" r="2" fill="currentColor" stroke="none" />
      {/* 코 */}
      <path d="M30 37 L32 39 L34 37 Z" fill="currentColor" stroke="none" />
      {/* 수염 */}
      <path d="M12 34 L21 35 M12 39 L21 37 M52 34 L43 35 M52 39 L43 37" />
    </svg>
  );
}

export const PET_ICONS = { dog: DogIcon, cat: CatIcon };

// 고민 항목 아이콘 (이모지)
export const CONCERN_EMOJI = {
  skin: '🧴',
  joint: '🦴',
  weight: '⚖️',
  dental: '🦷',
  digestion: '🌿',
  eye: '👁️',
};
