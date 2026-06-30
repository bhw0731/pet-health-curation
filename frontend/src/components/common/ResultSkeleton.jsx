// 분석 결과 로딩 스켈레톤 — 실제 결과 레이아웃을 흉내내 체감 속도 개선
const Bar = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/70 ${className}`} />
);

export default function ResultSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-8">
      {/* 상태 카드 */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
        <div className="grid md:grid-cols-5">
          <div className="space-y-3 bg-slate-100 p-6 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200" />
              <div className="flex-1 space-y-2">
                <Bar className="h-3 w-20" />
                <Bar className="h-5 w-24" />
              </div>
            </div>
            <div className="flex gap-2">
              <Bar className="h-7 w-16 rounded-full" />
              <Bar className="h-7 w-16 rounded-full" />
            </div>
          </div>
          <div className="space-y-3 p-6 md:col-span-3">
            <Bar className="h-3 w-24" />
            <Bar className="h-10 w-32" />
            <Bar className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* 게이지 + 레이더 자리 */}
      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 lg:col-span-2">
          <div className="h-40 w-40 animate-pulse rounded-full bg-slate-200" />
          <Bar className="h-4 w-40" />
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-6 lg:col-span-3">
          <Bar className="h-4 w-32" />
          <div className="mx-auto h-48 w-48 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>

      {/* 카드 자리 */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-slate-100 bg-white p-6">
            <Bar className="h-5 w-32" />
            <Bar className="h-3 w-full" />
            <Bar className="h-16 w-full rounded-xl" />
            <Bar className="h-3 w-5/6" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-medium text-brand-500">
        <span className="animate-pulse">우리 아이 맞춤 가이드를 분석하고 있어요…</span>
      </p>
    </div>
  );
}
