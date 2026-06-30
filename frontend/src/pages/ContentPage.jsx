import { useState } from 'react';
import { CONTENT_CATEGORIES, ARTICLES } from '../data/contentArticles.js';

const catLabel = (id) => CONTENT_CATEGORIES.find((c) => c.id === id)?.label ?? '';

export default function ContentPage() {
  const [cat, setCat] = useState('all');
  const items = cat === 'all' ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);
  const [feature, ...rest] = items;

  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">콘텐츠</h1>
          <p className="mt-1.5 text-slate-500">수의사 감수를 거친 믿을 수 있는 반려 정보 📚</p>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {CONTENT_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                cat === c.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 ring-1 ring-slate-100 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 피처드 */}
        {feature && (
          <article className="card mt-5 overflow-hidden sm:flex">
            <div className={`grid h-44 place-items-center bg-gradient-to-br text-6xl sm:h-auto sm:w-2/5 ${feature.grad}`}>
              {feature.emoji}
            </div>
            <div className="p-6 sm:w-3/5">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600">
                {catLabel(feature.cat)} · 추천
              </span>
              <h2 className="mt-3 text-xl font-bold text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.excerpt}</p>
              <p className="mt-4 text-xs text-slate-400">읽는 시간 {feature.read}</p>
            </div>
          </article>
        )}

        {/* 그리드 */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <article key={a.id} className="card overflow-hidden transition hover:shadow-md">
              <div className={`grid h-32 place-items-center bg-gradient-to-br text-4xl ${a.grad}`}>{a.emoji}</div>
              <div className="p-4">
                <span className="text-xs font-bold text-brand-500">{catLabel(a.cat)}</span>
                <h3 className="mt-1 font-bold text-slate-900">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">{a.excerpt}</p>
                <p className="mt-3 text-xs text-slate-400">읽는 시간 {a.read}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
