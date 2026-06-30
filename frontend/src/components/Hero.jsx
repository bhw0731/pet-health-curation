import Mascot from './common/Mascot.jsx';

export default function Hero({ onCtaClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 text-center">
        <Mascot mood="happy" className="mx-auto mb-6 h-24 w-24 drop-shadow-sm" />
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
          커뮤니티 데이터 기반 맞춤 건강 추천
        </span>

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          우리 아이에게 꼭 맞는
          <br />
          <span className="text-brand-600">건강 정보</span>를 30초 만에
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-500">
          나이, 종, 주요 고민만 입력하세요. 수많은 보호자들의 커뮤니티 데이터를 바탕으로
          우리 아이에게 맞는 건강 가이드를 큐레이션해 드립니다.
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            onClick={onCtaClick}
            className="rounded-xl bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition"
          >
            무료로 큐레이션 받기
          </button>
          <a
            href="#features"
            className="rounded-xl px-7 py-3.5 font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            어떻게 작동하나요?
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-400">회원가입 없이 바로 체험 가능</p>
      </div>
    </section>
  );
}
