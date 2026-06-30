import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HealthGauge from './dashboard/HealthGauge.jsx';
import HealthRadar from './dashboard/HealthRadar.jsx';
import StatusSummaryCard from './dashboard/StatusSummaryCard.jsx';
import DailyChecklist from './DailyChecklist.jsx';
import RecentLogTabs from './RecentLogTabs.jsx';
import ProductRecommendations from './ProductRecommendations.jsx';
import { saveAsImage, copyText, buildShareText, shareResult } from '../lib/share.js';
import { gradeOf } from '../lib/grade.js';

// 등급(color) → 정적 Tailwind 클래스 매핑 (동적 클래스명은 빌드에서 누락되므로 리터럴로 둠)
const GRADE_BADGE = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
};

// 추천 tip들에서 '오늘의 실천' 3가지를 추출
function deriveChecklist(recommendations) {
  const items = [];
  for (const r of recommendations) if (r.tips?.[0]) items.push(r.tips[0]);
  if (items.length < 3) {
    for (const r of recommendations) {
      for (const t of (r.tips ?? []).slice(1)) {
        if (items.length >= 3) break;
        if (!items.includes(t)) items.push(t);
      }
      if (items.length >= 3) break;
    }
  }
  return items.slice(0, 3);
}

export default function CurationResult({
  result,
  onReset,
  onSave,
  saved,
  profile,
  history = [],
  onView,
}) {
  const { summary, healthProfile, recommendations, disclaimer } = result;
  const reportRef = useRef(null);
  const checklistItems = deriveChecklist(recommendations);

  // ── 데이터 연동: 체크리스트 실천만큼 건강 지수가 실시간 소폭 상승 ──
  const [completed, setCompleted] = useState(0);
  const bonus = completed; // 실천 1건당 +1점 (최대 +3)
  const liveHealth = healthProfile
    ? {
        ...healthProfile,
        overall: Math.min(100, healthProfile.overall + bonus),
        grade: gradeOf(Math.min(100, healthProfile.overall + bonus)),
        // 집중 관리 영역 점수도 함께 상승 → 레이더가 차오름
        radar: healthProfile.radar.map((r) =>
          r.axis === healthProfile.focusArea
            ? { ...r, score: Math.min(100, r.score + bonus * 3) }
            : r
        ),
      }
    : null;

  const gradeBadge = GRADE_BADGE[liveHealth?.grade?.color] ?? GRADE_BADGE.emerald;

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5 sm:p-8">
      {/* 이미지로 캡처할 리포트 영역 (액션 버튼은 제외) */}
      <div ref={reportRef} className="rounded-xl">
        {/* ── 상태 요약 카드 (블루/화이트) ── */}
        <StatusSummaryCard summary={summary} healthProfile={liveHealth} avatar={profile?.avatar} />

        {/* ── 건강 지수 대시보드 (히어로) ── */}
      {liveHealth && (
        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {/* 종합 건강 지수 게이지 */}
          <div className="lg:col-span-2 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-stone-700">종합 건강 지수</h4>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${gradeBadge}`}
              >
                {liveHealth.grade.label}
              </span>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <HealthGauge score={liveHealth.overall} grade={liveHealth.grade} />
              {bonus > 0 && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600"
                >
                  ↑ 실천 반영 +{bonus}점
                </motion.span>
              )}
              {liveHealth.focusArea && (
                <p className="mt-3 text-center text-sm text-stone-500">
                  지금은 <b className="text-stone-800">{liveHealth.focusArea}</b> 영역의
                  관리가 가장 시급해요.
                </p>
              )}
            </div>
          </div>

          {/* 항목별 밸런스 레이더 */}
          <div className="lg:col-span-3 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-stone-700">항목별 건강 밸런스</h4>
            <p className="text-xs text-stone-400">6개 건강 영역의 균형을 분석했어요</p>
            <HealthRadar data={liveHealth.radar} />
          </div>
        </div>
      )}

      {/* ── 분석 메트릭 스트립 ── */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <MetricTile label="분석 항목" value={summary.concernCount} unit="개" />
        <MetricTile label="매칭된 보호자 후기" value={summary.reviewCount} unit="건" accent />
        <MetricTile label="생애주기" value={summary.stage.label} />
      </div>

      {/* ── 맞춤 추천 (중요도별 Card Grid) ── */}
      <div className="mt-8">
        <h4 className="mb-4 text-lg font-bold text-stone-900">맞춤 관리 가이드</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.concernId} rec={rec} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* ── 오늘의 건강 실천 체크리스트 (점수 실시간 연동) ── */}
      {checklistItems.length > 0 && (
        <div className="mt-6">
          <DailyChecklist items={checklistItems} onProgress={setCompleted} />
        </div>
      )}

        {/* 면책 문구 */}
        <p className="mt-6 text-center text-xs text-stone-400">{disclaimer}</p>
      </div>
      {/* /리포트 캡처 영역 끝 */}

      {/* ── 제휴 상품 추천 (수익 전환 동선) ── */}
      <ProductRecommendations recommendations={recommendations} petName={summary.displayName} />

      {/* ── 액션 바 (저장 / 공유) ── */}
      <ActionBar result={result} reportRef={reportRef} onSave={onSave} saved={saved} />

      <div className="mt-4 flex justify-center">
        <button
          onClick={onReset}
          className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition"
        >
          다른 정보로 다시 받기
        </button>
      </div>

      {/* ── 최근 분석한 결과 (탭 로그) ── */}
      <RecentLogTabs history={history} onView={onView} />
    </div>
  );
}

// ── 저장 / 공유 액션 바 ──
function ActionBar({ result, reportRef, onSave, saved }) {
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState(false);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  async function handleCopy() {
    try {
      await copyText(buildShareText(result));
      flash('결과가 텍스트로 복사되었어요');
    } catch {
      flash('복사에 실패했어요');
    }
  }

  async function handleImage() {
    if (!reportRef.current) return;
    setBusy(true);
    try {
      await saveAsImage(reportRef.current, `${result.summary.displayName}-건강리포트.png`);
      flash('이미지를 저장했어요');
    } catch {
      flash('이미지 저장에 실패했어요');
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    try {
      const mode = await shareResult(result);
      if (mode === 'copied') flash('공유 텍스트가 복사되었어요');
    } catch {
      /* 사용자가 공유 취소 시 무시 */
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          onClick={() => onSave?.(result)}
          disabled={saved}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            saved
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-brand-500 text-white hover:bg-brand-600'
          }`}
        >
          {saved ? '✓ 저장됨' : '＋ 내 프로필에 저장'}
        </button>
        <button
          onClick={handleCopy}
          className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
        >
          📋 텍스트 복사
        </button>
        <button
          onClick={handleImage}
          disabled={busy}
          className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-60"
        >
          {busy ? '저장 중…' : '🖼 이미지 저장'}
        </button>
        <button
          onClick={handleShare}
          className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
        >
          🔗 공유하기
        </button>
      </div>
      {toast && (
        <p className="mt-3 text-center text-sm font-medium text-brand-600">{toast}</p>
      )}
    </div>
  );
}

// ── 분석 메트릭 타일 ──
function MetricTile({ label, value, unit, accent }) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        accent ? 'border-brand-100 bg-brand-50/60' : 'border-stone-100 bg-white'
      }`}
    >
      <div className="text-xs font-medium text-stone-400">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-stone-900">
        {value}
        {unit && <span className="ml-0.5 text-sm font-semibold text-stone-400">{unit}</span>}
      </div>
    </div>
  );
}

// ── 추천 카드 (중요도 priority>=3 이면 크게/강조) ──
function RecommendationCard({ rec, rank }) {
  const isFocus = rec.priority >= 3;
  return (
    <article
      className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        isFocus ? 'md:col-span-2 border-brand-200 ring-1 ring-brand-100' : 'border-stone-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-stone-900 text-[11px] font-bold text-white">
              {rank}
            </span>
            {isFocus && (
              <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-bold text-white">
                집중 관리 영역
              </span>
            )}
          </div>
          <h5 className="mt-2 text-lg font-bold text-stone-900">{rec.title}</h5>
          <p className="mt-1 text-sm text-stone-500">{rec.summary}</p>
        </div>
      </div>

      {/* 커뮤니티 수치 강조 */}
      <div className="mt-4 rounded-xl bg-brand-50 px-4 py-3">
        <div className="text-[11px] font-semibold text-brand-500">커뮤니티 데이터 예시</div>
        <StatHighlight text={rec.communityStat} />
      </div>

      <ul className="mt-4 space-y-2">
        {rec.tips.map((tip, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-stone-700">
            <span className="mt-0.5 text-brand-500">✓</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      {/* 수의사 팁 (전문가 자문 UI) */}
      {rec.vetTip && (
        <div className="mt-4 flex gap-3 rounded-xl border border-teal-100 bg-teal-50/70 p-4">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-teal-500 text-lg text-white">
            🩺
          </div>
          <div>
            <p className="text-xs font-bold text-teal-700">
              수의사 팁 <span className="font-normal text-teal-500">· 전문가 자문</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-stone-700">“{rec.vetTip}”</p>
          </div>
        </div>
      )}

      {/* 보호자 후기 */}
      {rec.reviews?.length > 0 && (
        <div className="mt-5 border-t border-stone-100 pt-4">
          <p className="mb-3 text-xs font-semibold text-stone-500">
            👥 같은 고민을 가진 보호자 후기
          </p>
          <div className={`grid gap-3 ${isFocus ? 'sm:grid-cols-2' : ''}`}>
            {rec.reviews.map((rv) => (
              <ReviewItem key={rv.id} review={rv} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// ── 커뮤니티 수치를 큰 타이포로 강조 ──
function StatHighlight({ text }) {
  const match = text?.match(/\d+\s*%?/);
  if (!match) {
    return <p className="mt-0.5 text-sm leading-relaxed text-brand-900">{text}</p>;
  }
  const num = match[0];
  const [before, after] = text.split(num);
  return (
    <p className="mt-0.5 text-sm leading-relaxed text-brand-900">
      {before}
      <span className="mx-0.5 align-middle text-2xl font-extrabold text-brand-600">{num}</span>
      {after}
    </p>
  );
}

// ── 보호자 후기 1건 ──
function ReviewItem({ review }) {
  const initial = review.author?.[0] ?? '?';
  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {initial}
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-stone-700">{review.author}</p>
            <p className="text-[11px] text-stone-400">{review.petInfo}</p>
          </div>
        </div>
        <span className="text-xs text-stone-400">👍 {review.helpful}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{review.content}</p>
    </div>
  );
}
