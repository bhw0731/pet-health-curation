import { useState } from 'react';

const GRADE_COLOR = {
  양호: 'text-emerald-600 bg-emerald-50',
  주의: 'text-amber-600 bg-amber-50',
  '집중 관리': 'text-rose-600 bg-rose-50',
};

function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

// 결과 페이지 하단 '최근 분석한 결과' 탭 로그
export default function RecentLogTabs({ history = [], onView }) {
  const [active, setActive] = useState(0);
  if (history.length === 0) return null;

  const tabs = history.slice(0, 6);
  const entry = tabs[Math.min(active, tabs.length - 1)];
  const res = entry.result;
  const focus = res?.healthProfile?.focusArea;
  const recs = res?.recommendations ?? [];

  return (
    <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h4 className="text-base font-bold text-slate-900">📊 최근 분석한 결과</h4>
      <p className="text-xs text-slate-400">저장한 기록을 탭으로 모아봤어요</p>

      {/* 탭 */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((h, i) => (
          <button
            key={h.id}
            onClick={() => setActive(i)}
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              active === i
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{h.label}</span>
            {h.score != null && (
              <span
                className={`rounded-full px-1.5 text-xs ${
                  active === i ? 'bg-white/20' : 'bg-white'
                }`}
              >
                {h.score}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 선택된 기록 요약 */}
      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {entry.label}
              <span className="ml-2 text-sm font-normal text-slate-400">
                {entry.petLabel} · {entry.ageText}
              </span>
            </p>
            <p className="text-xs text-slate-400">{formatDate(entry.savedAt)} 분석</p>
          </div>
          {entry.grade && (
            <div className="text-right">
              <div className="text-2xl font-extrabold text-slate-900">{entry.score}점</div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  GRADE_COLOR[entry.grade] ?? ''
                }`}
              >
                {entry.grade}
              </span>
            </div>
          )}
        </div>

        {focus && (
          <p className="mt-3 text-sm text-slate-600">
            집중 관리 영역: <b className="text-brand-700">{focus}</b>
          </p>
        )}
        {recs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {recs.map((r) => (
              <span
                key={r.concernId}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-100"
              >
                {r.title}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => onView(entry)}
          className="mt-4 w-full rounded-xl border border-brand-200 bg-white py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          이 결과 자세히 보기
        </button>
      </div>
    </div>
  );
}
