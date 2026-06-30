// 결과 상단 상태 요약 카드 (블루/화이트 톤)
import { PET_ICONS } from '../icons/PetIcons.jsx';

const GRADE_BADGE = {
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
};

function Chip({ children }) {
  return (
    <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium ring-1 ring-white/25">
      {children}
    </span>
  );
}

export default function StatusSummaryCard({ summary, healthProfile, avatar }) {
  const Icon = PET_ICONS[summary.petType];
  const grade = healthProfile?.grade;
  const badge = GRADE_BADGE[grade?.color] ?? GRADE_BADGE.emerald;

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm">
      <div className="grid md:grid-cols-5">
        {/* 좌측: 블루 그라데이션 프로필 패널 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-500 p-6 text-white md:col-span-2">
          {/* 장식 원 */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10" />

          <div className="relative flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30">
              {avatar ? (
                <span className="text-3xl">{avatar}</span>
              ) : Icon ? (
                <Icon className="h-9 w-9 text-white" />
              ) : (
                <span className="text-3xl">🐾</span>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-brand-100">반려동물 프로필</p>
              <h3 className="text-2xl font-extrabold leading-tight">{summary.displayName}</h3>
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-2">
            <Chip>{summary.petLabel}</Chip>
            <Chip>{summary.ageText}</Chip>
            <Chip>{summary.stage.label}</Chip>
          </div>
        </div>

        {/* 우측: 건강 상태 요약 */}
        <div className="p-6 md:col-span-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-400">종합 건강 지수</p>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-4xl font-extrabold text-stone-900">
                  {healthProfile?.overall ?? '–'}
                </span>
                <span className="mb-1 text-sm font-semibold text-stone-400">/ 100점</span>
              </div>
            </div>
            {grade && (
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${badge}`}>
                {grade.label}
              </span>
            )}
          </div>

          {healthProfile?.focusArea && (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-500 text-white">
                ⚑
              </span>
              <div>
                <p className="text-[11px] font-semibold text-brand-500">집중 관리 영역</p>
                <p className="text-sm font-bold text-brand-800">{healthProfile.focusArea}</p>
              </div>
            </div>
          )}

          {summary.greeting && (
            <p className="mt-4 text-sm leading-relaxed text-stone-600">{summary.greeting.text}</p>
          )}
        </div>
      </div>
    </div>
  );
}
