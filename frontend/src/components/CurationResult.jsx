import HealthGauge from './dashboard/HealthGauge.jsx';
import HealthRadar from './dashboard/HealthRadar.jsx';

// 등급(color) → 정적 Tailwind 클래스 매핑 (동적 클래스명은 빌드에서 누락되므로 리터럴로 둠)
const GRADE_BADGE = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function CurationResult({ result, onReset }) {
  const { summary, healthProfile, recommendations, disclaimer } = result;
  const gradeBadge = GRADE_BADGE[healthProfile?.grade?.color] ?? GRADE_BADGE.emerald;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-8">
      {/* 헤더 */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-slate-100">
          {summary.petLabel} · {summary.ageText} · {summary.stage.label}
        </span>
        <h3 className="mt-4 text-2xl font-bold text-slate-900">{summary.headline}</h3>
        <p className="mt-2 text-slate-500">{summary.stageGuide}</p>
      </div>

      {/* ── 건강 지수 대시보드 (히어로) ── */}
      {healthProfile && (
        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {/* 종합 건강 지수 게이지 */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700">종합 건강 지수</h4>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${gradeBadge}`}
              >
                {healthProfile.grade.label}
              </span>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <HealthGauge score={healthProfile.overall} grade={healthProfile.grade} />
              {healthProfile.focusArea && (
                <p className="mt-3 text-center text-sm text-slate-500">
                  지금은 <b className="text-slate-800">{healthProfile.focusArea}</b> 영역의
                  관리가 가장 시급해요.
                </p>
              )}
            </div>
          </div>

          {/* 항목별 밸런스 레이더 */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700">항목별 건강 밸런스</h4>
            <p className="text-xs text-slate-400">6개 건강 영역의 균형을 분석했어요</p>
            <HealthRadar data={healthProfile.radar} />
          </div>
        </div>
      )}

      {/* ── 분석 메트릭 스트립 ── */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <MetricTile label="분석 항목" value={summary.concernCount} unit="개" />
        <MetricTile label="매칭된 보호자 후기" value={summary.reviewCount} unit="건" accent />
        <MetricTile label="생애주기" value={summary.stage.label} />
      </div>

      {/* ── 맞춤 추천 (중요도별 Card Grid) ── */}
      <div className="mt-8">
        <h4 className="mb-4 text-lg font-bold text-slate-900">맞춤 관리 가이드</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.concernId} rec={rec} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* 면책 문구 + 액션 */}
      <p className="mt-6 text-center text-xs text-slate-400">{disclaimer}</p>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onReset}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          다른 정보로 다시 받기
        </button>
      </div>
    </div>
  );
}

// ── 분석 메트릭 타일 ──
function MetricTile({ label, value, unit, accent }) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        accent ? 'border-brand-100 bg-brand-50/60' : 'border-slate-100 bg-white'
      }`}
    >
      <div className="text-xs font-medium text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-slate-900">
        {value}
        {unit && <span className="ml-0.5 text-sm font-semibold text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}

// ── 추천 카드 (중요도 priority>=3 이면 크게/강조) ──
function RecommendationCard({ rec, rank }) {
  const isFocus = rec.priority >= 3;
  return (
    <article
      className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        isFocus ? 'md:col-span-2 border-brand-200 ring-1 ring-brand-100' : 'border-slate-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
              {rank}
            </span>
            {isFocus && (
              <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-bold text-white">
                집중 관리 영역
              </span>
            )}
          </div>
          <h5 className="mt-2 text-lg font-bold text-slate-900">{rec.title}</h5>
          <p className="mt-1 text-sm text-slate-500">{rec.summary}</p>
        </div>
      </div>

      {/* 커뮤니티 수치 강조 */}
      <div className="mt-4 rounded-xl bg-brand-50 px-4 py-3">
        <div className="text-[11px] font-semibold text-brand-500">커뮤니티 데이터 예시</div>
        <StatHighlight text={rec.communityStat} />
      </div>

      <ul className="mt-4 space-y-2">
        {rec.tips.map((tip, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-0.5 text-brand-500">✓</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      {/* 보호자 후기 */}
      {rec.reviews?.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-semibold text-slate-500">
            👥 같은 고민을 가진 보호자 후기
          </p>
          <div className={`grid gap-3 ${isFocus ? 'sm:grid-cols-2' : ''}`}>
            {rec.reviews.map((rv) => (
              <ReviewItem key={rv.id} review={rv} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// ── 커뮤니티 수치를 큰 타이포로 강조 ──
function StatHighlight({ text }) {
  const match = text?.match(/\d+\s*%?/);
  if (!match) {
    return <p className="mt-0.5 text-sm leading-relaxed text-brand-900">{text}</p>;
  }
  const num = match[0];
  const [before, after] = text.split(num);
  return (
    <p className="mt-0.5 text-sm leading-relaxed text-brand-900">
      {before}
      <span className="mx-0.5 align-middle text-2xl font-extrabold text-brand-600">{num}</span>
      {after}
    </p>
  );
}

// ── 보호자 후기 1건 ──
function ReviewItem({ review }) {
  const initial = review.author?.[0] ?? '?';
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {initial}
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-700">{review.author}</p>
            <p className="text-[11px] text-slate-400">{review.petInfo}</p>
          </div>
        </div>
        <span className="text-xs text-slate-400">👍 {review.helpful}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.content}</p>
    </div>
  );
}
