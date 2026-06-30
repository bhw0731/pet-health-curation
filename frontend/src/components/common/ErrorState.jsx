import Mascot from './Mascot.jsx';

// 전역 에러 상태 — 마스코트 + 재시도
export default function ErrorState({
  title = '앗, 문제가 생겼어요',
  description = '잠시 후 다시 시도해 주세요.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/40 px-6 py-10 text-center">
      <Mascot mood="oops" className="h-24 w-24" />
      <p className="mt-3 text-base font-bold text-stone-700">{title}</p>
      <p className="mt-1 text-sm text-stone-400">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-4">
          다시 시도하기
        </button>
      )}
    </div>
  );
}
