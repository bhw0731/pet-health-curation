const FEATURES = [
  {
    icon: '📝',
    title: '간편한 정보 입력',
    desc: '나이, 종, 주요 고민만 선택하면 끝. 복잡한 회원가입 없이 30초면 충분해요.',
  },
  {
    icon: '🧭',
    title: '맞춤 큐레이션',
    desc: '나이 구간과 고민을 조합한 규칙 기반 추천으로 우리 아이에게 맞는 정보만 골라드려요.',
  },
  {
    icon: '👥',
    title: '커뮤니티 데이터',
    desc: '같은 고민을 가진 보호자들의 경험과 통계를 함께 보여드려 신뢰도를 높였어요.',
  },
];

const STEPS = [
  { step: '01', title: '정보 입력', desc: '나이 · 종 · 주요 고민 선택' },
  { step: '02', title: '데이터 분석', desc: '입력값에 맞는 큐레이션 규칙 적용' },
  { step: '03', title: '맞춤 결과', desc: '우선순위별 건강 가이드 확인' },
];

export default function Features() {
  return (
    <section id="features" className="py-20 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900">왜 펫헬스 큐레이션일까요?</h2>
          <p className="mt-3 text-slate-500">
            검색에 지친 보호자를 위한, 가장 빠르고 신뢰할 수 있는 건강 가이드
          </p>
        </header>

        {/* 핵심 가치 3가지 */}
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-2xl">
                {f.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 3단계 흐름 */}
        <div className="mt-16 rounded-2xl bg-slate-900 px-6 py-12 sm:px-12">
          <h3 className="text-center text-xl font-semibold text-white">이렇게 진행돼요</h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-brand-500 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h4 className="mt-4 font-semibold text-white">{s.title}</h4>
                <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
