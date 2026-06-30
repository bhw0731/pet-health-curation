// 브랜드 로고 — 발자국 마크 + 워드마크
export function PawMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="11" cy="8.5" rx="3" ry="4" />
      <ellipse cx="21" cy="8.5" rx="3" ry="4" />
      <ellipse cx="5" cy="15" rx="2.6" ry="3.4" />
      <ellipse cx="27" cy="15" rx="2.6" ry="3.4" />
      <path d="M16 13.5c4.2 0 7.5 3 7.5 6.6 0 3.1-2.7 4.9-7.5 4.9s-7.5-1.8-7.5-4.9c0-3.6 3.3-6.6 7.5-6.6z" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-2 font-bold text-slate-900 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500 text-white">
        <PawMark className="h-4 w-4" />
      </span>
      펫헬스 큐레이션
    </span>
  );
}
