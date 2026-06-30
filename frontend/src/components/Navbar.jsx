import Logo from './common/Logo.jsx';

export default function Navbar({ view = 'home', onNavigate, onCtaClick }) {
  const navCls = (active) =>
    `transition hover:text-brand-600 ${active ? 'font-bold text-brand-600' : 'text-slate-600'}`;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate?.('home')} aria-label="홈으로">
          <Logo />
        </button>

        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <button onClick={() => onNavigate?.('home')} className={navCls(view === 'home')}>
            홈
          </button>
          <button
            onClick={() => onNavigate?.('community')}
            className={navCls(view === 'community')}
          >
            커뮤니티
          </button>
        </nav>

        <button
          onClick={onCtaClick}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition"
        >
          큐레이션 받기
        </button>
      </div>
    </header>
  );
}
