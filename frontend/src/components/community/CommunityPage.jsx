import { useState } from 'react';
import {
  CATEGORIES,
  CATEGORY_STYLE,
  THUMBS,
  SEED_POSTS,
} from '../../data/communityPosts.js';

const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? '';

export default function CommunityPage() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [active, setActive] = useState('all');
  const [draft, setDraft] = useState('');
  const [draftCat, setDraftCat] = useState('qna');

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  function submit() {
    const text = draft.trim();
    if (!text) return;
    const [title, ...rest] = text.split('\n');
    setPosts([
      {
        id: `me-${posts.length}-${title.length}`,
        category: draftCat,
        author: '나',
        avatar: '🐾',
        title: title.slice(0, 60),
        excerpt: rest.join(' ').slice(0, 120) || '방금 올린 이야기예요.',
        thumb: null,
        likes: 0,
        comments: 0,
        time: '방금',
      },
      ...posts,
    ]);
    setDraft('');
  }

  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">반려생활 커뮤니티</h1>
          <p className="mt-1.5 text-slate-500">
            같은 고민을 가진 보호자들과 경험을 나눠보세요 🐾
          </p>
        </header>

        {/* 글쓰기 박스 */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-lg">
              🐾
            </div>
            <div className="flex-1">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={draft ? 3 : 1}
                placeholder="우리 아이 이야기나 궁금한 점을 들려주세요"
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
              {draft && (
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setDraftCat(c.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          draftCat === c.id
                            ? CATEGORY_STYLE[c.id]
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={submit} className="btn-primary px-5 py-2">
                    등록
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-500 ring-1 ring-slate-100 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 글 피드 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <article className="card overflow-hidden p-5 transition hover:shadow-md">
      {/* 작성자 */}
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-base">
          {post.avatar}
        </div>
        <span className="text-sm font-semibold text-slate-700">{post.author}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${CATEGORY_STYLE[post.category]}`}
        >
          {catLabel(post.category)}
        </span>
        <span className="ml-auto text-xs text-slate-300">{post.time}</span>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {post.excerpt}
          </p>
        </div>
        {post.thumb && (
          <div
            className={`grid h-16 w-16 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br text-2xl ${
              THUMBS[post.thumb.key] ?? 'from-slate-100 to-slate-200'
            }`}
          >
            {post.thumb.emoji}
          </div>
        )}
      </div>

      {/* 반응 */}
      <div className="mt-4 flex items-center gap-4 border-t border-slate-50 pt-3 text-sm text-slate-400">
        <button
          onClick={() => setLiked((v) => !v)}
          className={`flex items-center gap-1 font-medium ${liked ? 'text-rose-500' : 'hover:text-slate-600'}`}
        >
          {liked ? '❤️' : '🤍'} {likeCount}
        </button>
        <span className="flex items-center gap-1">💬 {post.comments}</span>
      </div>
    </article>
  );
}
