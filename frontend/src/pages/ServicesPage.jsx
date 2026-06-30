// 서비스 허브 — 전체 기능을 한 곳에서 (자체 아이콘=이모지)
const SERVICES = [
  { view: 'home', emoji: '🩺', label: '건강 큐레이션', desc: '맞춤 건강 분석', live: true, accent: 'from-brand-50 to-brand-100' },
  { view: 'tools', emoji: '🔢', label: '건강 계산기', desc: '칼로리·나이·비만도', live: true, accent: 'from-sky-50 to-sky-100' },
  { view: 'content', emoji: '📚', label: '콘텐츠', desc: '믿을 수 있는 정보', live: true, accent: 'from-amber-50 to-amber-100' },
  { view: 'shop', emoji: '🛍️', label: '쇼핑', desc: '맞춤 제품 추천', live: true, accent: 'from-rose-50 to-rose-100' },
  { view: 'community', emoji: '💬', label: '커뮤니티', desc: '보호자 소통', live: true, accent: 'from-emerald-50 to-emerald-100' },
  { view: 'hospital', emoji: '🏥', label: '동물병원 찾기', desc: '우리 동네 병원', live: true, accent: 'from-violet-50 to-violet-100' },
  { view: null, emoji: '🐾', label: '유기동물 입양', desc: '준비 중', live: false, accent: 'from-stone-50 to-stone-100' },
  { view: null, emoji: '🛡️', label: '펫보험 비교', desc: '준비 중', live: false, accent: 'from-stone-50 to-stone-100' },
];

export default function ServicesPage({ onNavigate }) {
  return (
    <div className="bg-stone-50 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">서비스</h1>
          <p className="mt-1.5 text-stone-500">반려생활에 필요한 모든 것을 한 곳에서 🐾</p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <button
              key={s.label}
              disabled={!s.live}
              onClick={() => s.view && onNavigate?.(s.view)}
              className={`flex flex-col items-start gap-3 rounded-2xl border border-stone-100 bg-white p-5 text-left transition ${
                s.live ? 'hover:-translate-y-0.5 hover:shadow-md' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-2xl ${s.accent}`}>
                {s.emoji}
              </span>
              <div>
                <p className="font-bold text-stone-900">{s.label}</p>
                <p className="mt-0.5 text-xs text-stone-400">{s.desc}</p>
              </div>
              {!s.live && (
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-400">
                  COMING SOON
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
