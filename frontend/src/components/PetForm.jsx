import { useEffect, useState } from 'react';
import { fetchOptions } from '../lib/api.js';

const MAX_CONCERNS = 3;

// 클라이언트 측 유효성 검사 (1차 방어선 — 서버에서 한 번 더 검증함)
function validate(form) {
  const errors = {};
  if (!form.petType) errors.petType = '반려동물 종류를 선택해 주세요.';

  if (form.ageMonths === '') {
    errors.ageMonths = '나이를 입력해 주세요.';
  } else {
    const age = Number(form.ageMonths);
    if (Number.isNaN(age) || age < 0 || age > 360)
      errors.ageMonths = '0~360개월 사이로 입력해 주세요.';
  }

  if (form.concerns.length === 0) errors.concerns = '고민을 1개 이상 선택해 주세요.';
  return errors;
}

const INITIAL = { petName: '', petType: '', ageMonths: '', concerns: [] };

export default function PetForm({ onSubmit, loading }) {
  const [options, setOptions] = useState({ petTypes: [], concerns: [] });
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    fetchOptions()
      .then(setOptions)
      .catch(() => setOptions({ petTypes: [], concerns: [] }));
  }, []);

  function update(patch) {
    const next = { ...form, ...patch };
    setForm(next);
    if (touched) setErrors(validate(next)); // 제출 시도 후엔 실시간 검증
  }

  function toggleConcern(id) {
    const has = form.concerns.includes(id);
    if (!has && form.concerns.length >= MAX_CONCERNS) return; // 최대 3개 제한
    update({ concerns: has ? form.concerns.filter((c) => c !== id) : [...form.concerns, id] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    const localErrors = validate(form);
    setErrors(localErrors);
    if (Object.keys(localErrors).length > 0) return;

    try {
      await onSubmit({ ...form, ageMonths: Number(form.ageMonths) });
    } catch (err) {
      // 서버 유효성 에러를 폼에 반영
      if (err.fields) setErrors(err.fields);
      else alert(err.message || '잠시 후 다시 시도해 주세요.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm"
    >
      {/* 1. 이름 (선택) */}
      <Field label="반려동물 이름" optional>
        <input
          type="text"
          value={form.petName}
          onChange={(e) => update({ petName: e.target.value })}
          placeholder="예: 콩이"
          className="input"
        />
      </Field>

      {/* 2. 종 선택 */}
      <Field label="반려동물 종류" error={errors.petType} required>
        <div className="grid grid-cols-2 gap-3">
          {options.petTypes.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => update({ petType: p.id })}
              className={`rounded-xl border px-4 py-3 font-medium transition ${
                form.petType === p.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Field>

      {/* 3. 나이 */}
      <Field
        label="나이 (개월 수)"
        error={errors.ageMonths}
        required
        hint="만 나이를 개월로 환산해 입력해 주세요. 예: 2살 → 24"
      >
        <input
          type="number"
          inputMode="numeric"
          min="0"
          max="360"
          value={form.ageMonths}
          onChange={(e) => update({ ageMonths: e.target.value })}
          placeholder="예: 24"
          className="input"
        />
      </Field>

      {/* 4. 주요 고민 (다중 선택) */}
      <Field
        label="주요 고민"
        error={errors.concerns}
        required
        hint={`최대 ${MAX_CONCERNS}개까지 선택할 수 있어요. (${form.concerns.length}/${MAX_CONCERNS})`}
      >
        <div className="flex flex-wrap gap-2">
          {options.concerns.map((c) => {
            const active = form.concerns.includes(c.id);
            const disabled = !active && form.concerns.length >= MAX_CONCERNS;
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => toggleConcern(c.id)}
                disabled={disabled}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-brand-500 py-4 font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 disabled:opacity-60 transition"
      >
        {loading ? '분석 중...' : '맞춤 큐레이션 받기'}
      </button>

      {/* 입력 컴포넌트 공통 스타일 */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: var(--color-brand-500);
          box-shadow: 0 0 0 3px var(--color-brand-100);
        }
      `}</style>
    </form>
  );
}

// 라벨 + 에러 메시지 + 힌트를 묶는 재사용 필드 래퍼
function Field({ label, children, error, hint, required, optional }) {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-brand-500">*</span>}
        {optional && <span className="text-xs font-normal text-slate-400">(선택)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
