import { useState } from 'react';
import { REGIONS, HOSPITALS } from '../data/hospitals.js';

export default function HospitalPage() {
  const [region, setRegion] = useState('전체');
  const [q, setQ] = useState('');

  const list = HOSPITALS.filter(
    (h) =>
      (region === '전체' || h.region === region) &&
      (q === '' || h.name.includes(q) || h.district.includes(q) || h.tags.some((t) => t.includes(q)))
  );

  return (
    <div className="bg-stone-50 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">동물병원 찾기</h1>
          <p className="mt-1.5 text-stone-500">우리 동네 가까운 병원을 찾아보세요 🏥</p>
        </header>

        {/* 검색 */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-300">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="병원명·지역·진료과목 검색"
            className="w-full rounded-xl border border-stone-200 py-3 pl-11 pr-4 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
        </div>

        {/* 지역 필터 */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                region === r ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 ring-1 ring-stone-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* 목록 */}
        <p className="mt-5 text-sm text-stone-400">총 {list.length}곳</p>
        <div className="mt-2 space-y-3">
          {list.map((h) => (
            <article key={h.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-stone-900">{h.name}</h3>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {h.region} {h.district}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-bold text-amber-500">★ {h.rating}</p>
                  <p className="text-xs text-stone-400">후기 {h.reviews}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-stone-500">🕒 {h.hours}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {h.tags.map((t) => (
                  <span key={t} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
          {list.length === 0 && (
            <div className="rounded-xl border border-dashed border-stone-200 bg-white p-8 text-center text-sm text-stone-400">
              조건에 맞는 병원이 없어요.
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-stone-400">표시된 병원은 데모용 예시 데이터입니다.</p>
      </div>
    </div>
  );
}
