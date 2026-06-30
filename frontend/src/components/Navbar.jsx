export default function Navbar({ onCtaClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-500 text-white">
            🐾
          </span>
          펫헬스 큐레이션
        </a>

        <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-600">
          <a href="#features" className="hover:text-brand-600 transition">
            서비스 소개
          </a>
          <a href="#curation" className="hover:text-brand-600 transition">
            큐레이션 받기
          </a>
        </nav>

        <button
          onClick={onCtaClick}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition"
        >
          시작하기
        </button>
      </div>
    </header>
  );
}
