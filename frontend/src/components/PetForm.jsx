import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchOptions } from '../lib/api.js';
import { PET_ICONS, CONCERN_EMOJI } from './icons/PetIcons.jsx';

// 단계 전환 슬라이드 애니메이션 (direction: 1=다음, -1=이전)
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
};

const MAX_CONCERNS = 3;
const STEPS = [
  { key: 'species', title: '어떤 반려동물인가요?', sub: '종류를 선택하고 이름을 알려주세요 (이름은 선택)' },
  { key: 'age', title: '나이가 어떻게 되나요?', sub: '아래에서 빠르게 고르거나 직접 입력해 주세요' },
  { key: 'concerns', title: '어떤 점이 가장 고민이세요?', sub: `최대 ${MAX_CONCERNS}개까지 선택할 수 있어요` },
];

// 나이 빠른 선택 (개월 수)
const AGE_PRESETS = [
  { label: '6개월', months: 6 },
  { label: '1살', months: 12 },
  { label: '3살', months: 36 },
  { label: '7살', months: 84 },
  { label: '10살', months: 120 },
];

const INITIAL = { petName: '', petType: '', ageMonths: '', concerns: [] };

// 단계별 유효성 검사 → 통과 시 다음 단계 이동 가능
function validateStep(stepKey, form) {
  if (stepKey === 'species') {
    if (!form.petType) return '반려동물 종류를 선택해 주세요.';
  }
  if (stepKey === 'age') {
    if (form.ageMonths === '') return '나이를 입력해 주세요.';
    const age = Number(form.ageMonths);
    if (Number.isNaN(age) || age < 0 || age > 360) return '0~360개월 사이로 입력해 주세요.';
  }
  if (stepKey === 'concerns') {
    if (form.concerns.length === 0) return '고민을 1개 이상 선택해 주세요.';
  }
  return null;
}

export default function PetForm({ onSubmit, loading, initialName }) {
  const [options, setOptions] = useState({ petTypes: [], concerns: [] });
  const [form, setForm] = useState(() => ({ ...INITIAL, petName: initialName ?? '' }));
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 슬라이드 방향
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOptions()
      .then(setOptions)
      .catch(() => setOptions({ petTypes: [], concerns: [] }));
  }, []);

  const stepKey = STEPS[step].key;
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  function update(patch) {
    setForm((f) => ({ ...f, ...patch }));
    setError(null);
  }

  function toggleConcern(id) {
    const has = form.concerns.includes(id);
    if (!has && form.concerns.length >= MAX_CONCERNS) return;
    update({ concerns: has ? form.concerns.filter((c) => c !== id) : [...form.concerns, id] });
  }

  function goNext() {
    const err = validateStep(stepKey, form);
    if (err) return setError(err);
    setError(null);
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goPrev() {
    setError(null);
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    const err = validateStep(stepKey, form);
    if (err) return setError(err);
    try {
      await onSubmit({ ...form, ageMonths: Number(form.ageMonths) });
    } catch (e) {
      // 서버 유효성 에러 → 해당 단계로 이동해 표시
      if (e.fields) {
        const order = ['species:petType', 'age:ageMonths', 'concerns:concerns'];
        const idx = order.findIndex((o) => e.fields[o.split(':')[1]]);
        if (idx >= 0) {
          setStep(idx);
          setError(Object.values(e.fields)[0]);
        }
      } else {
        setError(e.message || '잠시 후 다시 시도해 주세요.');
      }
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm">
      {/* 진행 바 */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
          <span className="text-brand-600">
            STEP {step + 1} <span className="text-slate-300">/ {STEPS.length}</span>
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 헤더 */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-slate-900">{STEPS[step].title}</h3>
        <p className="mt-2 text-sm text-slate-500">{STEPS[step].sub}</p>
      </div>

      {/* 단계별 본문 (framer-motion 슬라이드 전환) */}
      <div className="relative min-h-[220px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {stepKey === 'species' && (
              <SpeciesStep
                options={options.petTypes}
                form={form}
                onPick={(id) => update({ petType: id })}
                onName={(petName) => update({ petName })}
              />
            )}

            {stepKey === 'age' && (
              <AgeStep
                form={form}
                onChange={(ageMonths) => update({ ageMonths })}
                onEnter={goNext}
              />
            )}

            {stepKey === 'concerns' && (
              <ConcernStep options={options.concerns} form={form} onToggle={toggleConcern} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-red-500">{error}</p>
      )}

      {/* 내비게이션 */}
      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="rounded-xl border border-slate-200 px-6 py-3.5 font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            이전
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            onClick={goNext}
            className="flex-1 rounded-xl bg-brand-500 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-brand-500 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 disabled:opacity-60 transition"
          >
            {loading ? '분석 중...' : '맞춤 큐레이션 받기'}
          </button>
        )}
      </div>
    </div>
  );
}

// ── STEP 1: 종 선택 (SVG 아이콘) + 이름 ──
function SpeciesStep({ options, form, onPick, onName }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((p) => {
          const Icon = PET_ICONS[p.id];
          const active = form.petType === p.id;
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => onPick(p.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition ${
                active
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              {Icon ? <Icon className="h-16 w-16" /> : <span className="text-4xl">🐾</span>}
              <span
                className={`text-base font-bold ${active ? 'text-brand-700' : 'text-slate-700'}`}
              >
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          이름 <span className="text-xs font-normal text-slate-400">(선택)</span>
        </label>
        <input
          type="text"
          value={form.petName}
          onChange={(e) => onName(e.target.value)}
          placeholder="예: 콩이"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
      </div>
    </div>
  );
}

// ── STEP 2: 나이 (빠른 선택 + 직접 입력) ──
function AgeStep({ form, onChange, onEnter }) {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {AGE_PRESETS.map((a) => (
          <button
            type="button"
            key={a.months}
            onClick={() => onChange(String(a.months))}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              String(a.months) === String(form.ageMonths)
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="mb-3 text-sm text-slate-400">또는 직접 입력 (개월 수)</p>
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min="0"
            max="360"
            value={form.ageMonths}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onEnter()}
            placeholder="24"
            className="w-32 rounded-xl border border-slate-200 px-4 py-3 text-center text-lg font-bold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <span className="text-slate-500">개월</span>
        </div>
        <p className="mt-3 text-xs text-slate-400">예: 2살 → 24개월</p>
      </div>
    </div>
  );
}

// ── STEP 3: 주요 고민 (아이콘 칩, 최대 3개) ──
function ConcernStep({ options, form, onToggle }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((c) => {
          const active = form.concerns.includes(c.id);
          const disabled = !active && form.concerns.length >= MAX_CONCERNS;
          return (
            <button
              type="button"
              key={c.id}
              onClick={() => onToggle(c.id)}
              disabled={disabled}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
                active
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-slate-200 hover:border-slate-300'
              } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
            >
              <span className="text-3xl">{CONCERN_EMOJI[c.id] ?? '•'}</span>
              <span
                className={`text-sm font-semibold ${
                  active ? 'text-brand-700' : 'text-slate-600'
                }`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        선택됨 {form.concerns.length} / {MAX_CONCERNS}
      </p>
    </div>
  );
}
