import { useState } from 'react';
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from '../data/shopProducts.js';
import { trackProductClick } from '../lib/track.js';

const won = (n) => n.toLocaleString('ko-KR') + '원';

export default function ShopPage() {
  const [cat, setCat] = useState('all');
  const [toast, setToast] = useState('');
  const items = cat === 'all' ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter((p) => p.cat === cat);

  function buy(p) {
    trackProductClick(p);
    setToast(`‘${p.name}’ 담았어요 (데모)`);
    setTimeout(() => setToast(''), 2000);
  }

  return (
    <div className="bg-stone-50 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">쇼핑</h1>
            <p className="mt-1.5 text-stone-500">우리 아이 고민에 맞는 제품을 만나보세요 🛍️</p>
          </div>
          <span className="rounded-md bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-400">AD · 제휴</span>
        </header>

        {/* 카테고리 */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SHOP_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                cat === c.id ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 ring-1 ring-stone-100 hover:bg-stone-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 상품 그리드 */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <article key={p.id} className="card overflow-hidden transition hover:shadow-md">
              <div className={`relative grid h-32 place-items-center bg-gradient-to-br text-4xl ${p.grad}`}>
                {p.emoji}
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[11px] text-stone-400">{p.brand}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-stone-800">{p.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-stone-900">{won(p.price)}</span>
                  <button onClick={() => buy(p)} className="rounded-lg bg-brand-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-brand-600">
                    담기
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        )}
        <p className="mt-6 text-center text-[11px] text-stone-300">제휴 링크를 통해 구매 시 일정 수수료가 발생할 수 있어요.</p>
      </div>
    </div>
  );
}
