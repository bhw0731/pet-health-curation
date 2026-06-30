import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getChecklistState, saveChecklistState } from '../lib/storage.js';

// 오늘의 건강 실천 체크리스트 (3개) — 모두 완료 시 축하 애니메이션
export default function DailyChecklist({ items = [], onProgress }) {
  const [checked, setChecked] = useState({});

  const countDone = (state) => items.filter((_, i) => state[i]).length;

  useEffect(() => {
    const saved = getChecklistState();
    setChecked(saved);
    onProgress?.(countDone(saved));
    // items가 바뀌면(다른 결과 보기) 진행도 재계산
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const doneCount = countDone(checked);
  const allDone = items.length > 0 && doneCount === items.length;

  function toggle(i) {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    saveChecklistState(next);
    onProgress?.(countDone(next));
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900">✅ 오늘의 건강 실천</h4>
          <p className="text-xs text-slate-400">작은 실천이 모여 큰 변화를 만들어요</p>
        </div>
        <span className="text-sm font-bold text-brand-600">
          {doneCount} / {items.length}
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {items.map((item, i) => {
          const on = !!checked[i];
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  on ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span
                  className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border-2 transition ${
                    on ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300'
                  }`}
                >
                  {on && '✓'}
                </span>
                <span
                  className={`text-sm ${on ? 'text-slate-400 line-through' : 'text-slate-700'}`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* 전체 완료 축하 */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 p-5 text-center text-white"
          >
            {/* 떠오르는 이모지 */}
            {['🎉', '🐾', '✨', '💙', '🎊'].map((e, idx) => (
              <motion.span
                key={idx}
                className="absolute text-lg"
                style={{ left: `${12 + idx * 19}%`, bottom: 8 }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -40, opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: idx * 0.18 }}
              >
                {e}
              </motion.span>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 }}
              className="text-3xl"
            >
              🎉
            </motion.div>
            <p className="mt-1 text-lg font-extrabold">오늘의 실천 완료!</p>
            <p className="text-sm text-brand-100">
              꾸준함이 최고의 보약이에요. 내일도 함께해요! 💪
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
