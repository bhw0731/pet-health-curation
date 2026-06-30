import Mascot from './Mascot.jsx';

// 전역 빈 상태 — 텅 빈 화면 대신 마스코트 + 안내 메시지
export default function EmptyState({
  title = '아직 데이터가 없어요',
  description,
  action,
  mood = 'sleepy',
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
      <Mascot mood={mood} className="h-24 w-24" />
      <p className="mt-3 text-base font-bold text-slate-700">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
