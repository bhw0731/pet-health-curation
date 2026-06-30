import EmptyState from './common/EmptyState.jsx';

// 저장된 분석 기록(localStorage) 목록 — 다시 보기 / 삭제
const GRADE_COLOR = {
  양호: 'text-emerald-600',
  주의: 'text-amber-600',
  '집중 관리': 'text-rose-600',
};

function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function HistoryPanel({ history, onView, onDelete, onClear }) {
  if (history.length === 0) {
    return (
      <EmptyState
        title="아직 저장된 분석 기록이 없어요"
        description="결과 화면에서 ‘내 프로필에 저장’을 누르면 여기에 모여요."
      />
    );
  }

  return (
    <div className="rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-stone-700">
          내 분석 기록 <span className="text-stone-400">({history.length})</span>
        </h4>
        <button onClick={onClear} className="text-xs text-stone-400 hover:text-rose-500">
          전체 삭제
        </button>
      </div>

      <ul className="space-y-2">
        {history.map((h) => (
          <li
            key={h.id}
            className="flex items-center gap-3 rounded-lg border border-stone-100 p-3 hover:bg-stone-50"
          >
            {h.score != null && (
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-stone-100">
                <span className="text-sm font-extrabold text-stone-800">{h.score}</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-stone-800">
                {h.label}
                <span className="ml-1 font-normal text-stone-400">
                  · {h.petLabel} · {h.ageText}
                </span>
              </p>
              <p className="text-xs text-stone-400">
                {formatDate(h.savedAt)}
                {h.grade && (
                  <span className={`ml-2 font-semibold ${GRADE_COLOR[h.grade] ?? ''}`}>
                    {h.grade}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => onView(h)}
              className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"
            >
              다시 보기
            </button>
            <button
              onClick={() => onDelete(h.id)}
              className="rounded-lg px-2 py-1.5 text-xs text-stone-300 hover:text-rose-500"
              aria-label="삭제"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
