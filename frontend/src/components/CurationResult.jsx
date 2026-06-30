export default function CurationResult({ result, onReset }) {
  const { summary, recommendations, disclaimer } = result;

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-6 sm:p-10">
      {/* 요약 헤더 */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
          {summary.petLabel} · {summary.ageText} · {summary.stage.label}
        </span>
        <h3 className="mt-4 text-2xl font-bold text-slate-900">{summary.headline}</h3>
        <p className="mt-2 text-slate-500">{summary.stageGuide}</p>
        {summary.reviewCount > 0 && (
          <p className="mt-3 text-sm font-medium text-brand-600">
            👥 같은 고민을 가진 보호자 후기 {summary.reviewCount}건을 함께 모았어요
          </p>
        )}
      </div>

      {/* 추천 카드 목록 */}
      <div className="mt-8 grid gap-5">
        {recommendations.map((rec, i) => (
          <article
            key={rec.concernId}
            className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-brand-500">
                  추천 {i + 1}
                </span>
                <h4 className="mt-1 text-lg font-bold text-slate-900">{rec.title}</h4>
                <p className="mt-1 text-sm text-slate-500">{rec.summary}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {rec.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-brand-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
              <span className="mr-1.5 rounded bg-brand-100 px-1.5 py-0.5 text-[11px] font-semibold">
                커뮤니티 데이터 예시
              </span>
              {rec.communityStat}
            </div>

            {/* 같은 고민을 가진 보호자 후기 */}
            {rec.reviews?.length > 0 && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-3 text-xs font-semibold text-slate-500">
                  같은 고민을 가진 보호자 후기
                </p>
                <div className="space-y-3">
                  {rec.reviews.map((rv) => (
                    <ReviewItem key={rv.id} review={rv} />
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* 면책 문구 */}
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

// 보호자 후기 1건
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
