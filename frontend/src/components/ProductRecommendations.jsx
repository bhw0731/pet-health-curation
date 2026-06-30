import { useState } from 'react';
import { trackProductClick } from '../lib/track.js';

const won = (n) => n.toLocaleString('ko-KR') + '원';

// 큐레이션 결과 → 제휴 상품 추천 (수익 전환 동선)
export default function ProductRecommendations({ recommendations = [], petName = '우리 아이' }) {
  const [toast, setToast] = useState('');

  // 추천 항목들의 제품을 모아 최대 4개 노출
  const products = recommendations
    .flatMap((r) => (r.products ?? []).map((p) => ({ ...p, context: r.title })))
    .slice(0, 4);

  if (products.length === 0) return null;

  function handleClick(p) {
    trackProductClick(p);
    setToast(`‘${p.name}’ 구매 페이지로 이동해요 (데모)`);
    setTimeout(() => setToast(''), 2200);
  }

  return (
    <section className="mt-8 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-stone-900">🛒 {petName}에게 딱 맞는 추천 제품</h4>
          <p className="text-xs text-stone-400">분석된 고민에 맞춰 큐레이션했어요</p>
        </div>
        <span className="rounded-md bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-400">
          AD · 제휴
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {products.map((p, i) => (
          <article
            key={i}
            className="flex items-center gap-3 rounded-xl border border-stone-100 p-3 transition hover:border-brand-200 hover:shadow-sm"
          >
            {/* 상품 썸네일 (플레이스홀더) */}
            <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 text-xl font-extrabold text-brand-400">
              {p.brand?.[0] ?? '🛍'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                {p.tag && (
                  <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">
                    {p.tag}
                  </span>
                )}
                <span className="truncate text-[11px] text-stone-400">{p.brand}</span>
              </div>
              <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">{p.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-base font-extrabold text-stone-900">{won(p.price)}</span>
                <button
                  onClick={() => handleClick(p)}
                  className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-600"
                >
                  구매하러 가기
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {toast && (
        <p className="mt-3 text-center text-sm font-medium text-brand-600">{toast}</p>
      )}
      <p className="mt-3 text-center text-[11px] text-stone-300">
        제휴 링크를 통해 구매 시 일정 수수료가 발생할 수 있어요.
      </p>
    </section>
  );
}
