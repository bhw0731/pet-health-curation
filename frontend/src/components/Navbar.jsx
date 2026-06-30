import Logo, { PawMark } from './common/Logo.jsx';

const NAV = [
  { id: 'content', label: '콘텐츠' },
  { id: 'shop', label: '쇼핑' },
  { id: 'community', label: '커뮤니티' },
  { id: 'hospital', label: '동물병원' },
  { id: 'tools', label: '건강도구' },
  { id: 'services', label: '서비스' },
];

export default function Navbar({ view = 'home', onNavigate, onCtaClick }) {
  const navCls = (active) =>
    `whitespace-nowrap transition hover:text-brand-600 ${
      active ? 'font-bold text-brand-600' : 'text-stone-600'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-stone-100">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <button onClick={() => onNavigate?.('home')} aria-label="홈으로" className="flex-shrink-0">
          {/* 데스크톱: 풀 로고 / 모바일: 마크만 */}
          <span className="hidden sm:block">
            <Logo />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500 text-white sm:hidden">
            <PawMark className="h-4 w-4" />
          </span>
        </button>

        <nav className="flex flex-1 items-center gap-4 overflow-x-auto text-sm sm:gap-6">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => onNavigate?.(n.id)} className={navCls(view === n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onCtaClick}
          className="flex-shrink-0 rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition sm:px-4"
        >
          큐레이션
        </button>
      </div>
    </header>
  );
}
