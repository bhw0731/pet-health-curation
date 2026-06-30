import { useState } from 'react';

const TOOLS = [
  { id: 'calorie', label: '권장 칼로리', emoji: '🔥' },
  { id: 'feed', label: '사료 급여량', emoji: '🥣' },
  { id: 'age', label: '나이 계산', emoji: '🎂' },
  { id: 'bcs', label: '비만도 체크', emoji: '⚖️' },
];

// RER(휴식기 에너지요구량) = 70 × 체중(kg)^0.75
const rer = (kg) => 70 * Math.pow(kg, 0.75);

export default function HealthToolsPage() {
  const [tool, setTool] = useState('calorie');

  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">건강 계산기</h1>
          <p className="mt-1.5 text-slate-500">우리 아이 정보로 바로 계산해 보세요. 모두 참고용이에요 🐾</p>
        </header>

        {/* 도구 탭 */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`flex items-center justify-center gap-1.5 rounded-xl border-2 py-3 text-sm font-bold transition ${
                tool === t.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tool === 'calorie' && <CalorieCalc />}
          {tool === 'feed' && <FeedCalc />}
          {tool === 'age' && <AgeCalc />}
          {tool === 'bcs' && <BcsCalc />}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          본 계산 결과는 일반 가이드를 기반으로 한 참고용이며, 정확한 진단은 수의사 상담이 필요합니다.
        </p>
      </div>
    </div>
  );
}

// ── 공통 UI ──
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}
const inputCls =
  'w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100';

function ResultBox({ children }) {
  return (
    <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-6 text-center text-white">
      {children}
    </div>
  );
}

function Card({ children }) {
  return <div className="card p-5 sm:p-6">{children}</div>;
}

// ── 1. 권장 칼로리 (MER) ──
const ACTIVITY = {
  dog: [
    { id: 'neutered', label: '중성화 성견', f: 1.6 },
    { id: 'intact', label: '미중성화 성견', f: 1.8 },
    { id: 'loss', label: '체중 감량 필요', f: 1.0 },
    { id: 'puppy', label: '성장기 강아지', f: 2.0 },
    { id: 'senior', label: '노령견', f: 1.4 },
  ],
  cat: [
    { id: 'neutered', label: '중성화 성묘', f: 1.2 },
    { id: 'intact', label: '미중성화 성묘', f: 1.4 },
    { id: 'loss', label: '체중 감량 필요', f: 0.8 },
    { id: 'kitten', label: '성장기 고양이', f: 2.5 },
    { id: 'senior', label: '노령묘', f: 1.4 },
  ],
};

function CalorieCalc() {
  const [species, setSpecies] = useState('dog');
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('neutered');

  const w = Number(weight);
  const factor = ACTIVITY[species].find((a) => a.id === status)?.f ?? 1.6;
  const mer = w > 0 ? Math.round(rer(w) * factor) : null;

  return (
    <Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="종류">
          <div className="grid grid-cols-2 gap-2">
            {['dog', 'cat'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSpecies(s);
                  setStatus('neutered');
                }}
                className={`rounded-xl border-2 py-2.5 text-sm font-semibold ${
                  species === s ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-500'
                }`}
              >
                {s === 'dog' ? '강아지' : '고양이'}
              </button>
            ))}
          </div>
        </Field>
        <Field label="체중 (kg)">
          <input type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="예: 5.2" className={inputCls} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="상태">
          <div className="flex flex-wrap gap-2">
            {ACTIVITY[species].map((a) => (
              <button
                key={a.id}
                onClick={() => setStatus(a.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                  status === a.id ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-200 text-slate-600'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {mer ? (
        <ResultBox>
          <p className="text-sm text-brand-100">하루 권장 섭취 칼로리</p>
          <p className="mt-1 text-4xl font-extrabold">
            {mer.toLocaleString()} <span className="text-xl">kcal</span>
          </p>
          <p className="mt-2 text-xs text-brand-100">RER {Math.round(rer(w))} × 활동계수 {factor}</p>
        </ResultBox>
      ) : (
        <p className="mt-5 text-center text-sm text-slate-400">체중을 입력하면 결과가 표시돼요.</p>
      )}
    </Card>
  );
}

// ── 2. 사료 급여량 ──
function FeedCalc() {
  const [weight, setWeight] = useState('');
  const [factor, setFactor] = useState('1.6');
  const [kcal100, setKcal100] = useState('');

  const w = Number(weight);
  const k = Number(kcal100);
  const mer = w > 0 ? rer(w) * Number(factor) : 0;
  const grams = mer > 0 && k > 0 ? Math.round((mer / k) * 100) : null;

  return (
    <Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="체중 (kg)">
          <input type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="예: 5.2" className={inputCls} />
        </Field>
        <Field label="활동계수">
          <select value={factor} onChange={(e) => setFactor(e.target.value)} className={inputCls}>
            <option value="1.0">체중 감량 (1.0)</option>
            <option value="1.4">노령 (1.4)</option>
            <option value="1.6">중성화 성견 (1.6)</option>
            <option value="1.8">미중성화/활동량 많음 (1.8)</option>
            <option value="2.0">성장기 (2.0)</option>
          </select>
        </Field>
      </div>
      <div className="mt-4">
        <Field label="사료 열량 (100g당 kcal · 포장지 표기)">
          <input type="number" inputMode="numeric" value={kcal100} onChange={(e) => setKcal100(e.target.value)} placeholder="예: 360" className={inputCls} />
        </Field>
      </div>

      {grams ? (
        <ResultBox>
          <p className="text-sm text-brand-100">하루 권장 급여량</p>
          <p className="mt-1 text-4xl font-extrabold">
            {grams} <span className="text-xl">g</span>
          </p>
          <p className="mt-2 text-xs text-brand-100">하루 2끼 기준 약 {Math.round(grams / 2)}g씩</p>
        </ResultBox>
      ) : (
        <p className="mt-5 text-center text-sm text-slate-400">체중과 사료 열량을 입력해 주세요.</p>
      )}
    </Card>
  );
}

// ── 3. 나이 계산 ──
function dogHumanAge(age, size) {
  if (age <= 0) return null;
  // 1년=15, 2년=24, 이후 크기별 가산
  const perYear = { small: 4, medium: 5, large: 6 }[size];
  if (age <= 1) return Math.round(age * 15);
  if (age <= 2) return Math.round(15 + (age - 1) * 9);
  return Math.round(24 + (age - 2) * perYear);
}
function catHumanAge(age) {
  if (age <= 0) return null;
  if (age <= 1) return Math.round(age * 15);
  if (age <= 2) return Math.round(15 + (age - 1) * 9);
  return Math.round(24 + (age - 2) * 4);
}

function AgeCalc() {
  const [species, setSpecies] = useState('dog');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('medium');
  const a = Number(age);
  const human = species === 'dog' ? dogHumanAge(a, size) : catHumanAge(a);

  return (
    <Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="종류">
          <div className="grid grid-cols-2 gap-2">
            {['dog', 'cat'].map((s) => (
              <button key={s} onClick={() => setSpecies(s)} className={`rounded-xl border-2 py-2.5 text-sm font-semibold ${species === s ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-500'}`}>
                {s === 'dog' ? '강아지' : '고양이'}
              </button>
            ))}
          </div>
        </Field>
        <Field label="나이 (살)">
          <input type="number" inputMode="decimal" value={age} onChange={(e) => setAge(e.target.value)} placeholder="예: 3" className={inputCls} />
        </Field>
      </div>
      {species === 'dog' && (
        <div className="mt-4">
          <Field label="크기">
            <div className="flex gap-2">
              {[{ id: 'small', l: '소형견' }, { id: 'medium', l: '중형견' }, { id: 'large', l: '대형견' }].map((s) => (
                <button key={s.id} onClick={() => setSize(s.id)} className={`flex-1 rounded-full border px-3 py-1.5 text-sm font-medium ${size === s.id ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-200 text-slate-600'}`}>
                  {s.l}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}
      {human ? (
        <ResultBox>
          <p className="text-sm text-brand-100">사람 나이로 환산하면</p>
          <p className="mt-1 text-4xl font-extrabold">약 {human}세</p>
        </ResultBox>
      ) : (
        <p className="mt-5 text-center text-sm text-slate-400">나이를 입력하면 결과가 표시돼요.</p>
      )}
    </Card>
  );
}

// ── 4. 비만도 (BCS) 체크 ──
const BCS_OPTIONS = [
  { id: 1, label: '갈비뼈가 눈에 보이고 허리가 매우 잘록함', result: '저체중', color: 'amber', advice: '영양 보충과 수의사 상담이 필요해요.' },
  { id: 2, label: '갈비뼈가 쉽게 만져지고 허리선이 뚜렷함', result: '이상적', color: 'emerald', advice: '좋은 상태예요! 지금처럼 유지해 주세요.' },
  { id: 3, label: '갈비뼈가 약간 눌러야 만져지고 허리선이 보통', result: '약간 과체중', color: 'amber', advice: '간식을 줄이고 활동량을 조금 늘려 보세요.' },
  { id: 4, label: '갈비뼈가 잘 안 만져지고 허리선이 거의 없음', result: '과체중', color: 'rose', advice: '식이 조절과 체중 관리 계획이 필요해요.' },
  { id: 5, label: '갈비뼈가 두꺼운 지방에 덮여 만져지지 않음', result: '비만', color: 'rose', advice: '수의사와 함께 다이어트 계획을 세우는 걸 권장해요.' },
];
const BCS_BADGE = { emerald: 'bg-emerald-100 text-emerald-700', amber: 'bg-amber-100 text-amber-700', rose: 'bg-rose-100 text-rose-700' };

function BcsCalc() {
  const [sel, setSel] = useState(null);
  const chosen = BCS_OPTIONS.find((o) => o.id === sel);
  return (
    <Card>
      <p className="text-sm font-semibold text-slate-700">갈비뼈를 만졌을 때 가장 가까운 상태는?</p>
      <div className="mt-3 space-y-2">
        {BCS_OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => setSel(o.id)}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition ${
              sel === o.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-xs font-bold ${sel === o.id ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {o.id}
            </span>
            <span className="text-slate-700">{o.label}</span>
          </button>
        ))}
      </div>
      {chosen && (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${BCS_BADGE[chosen.color]}`}>
            {chosen.result}
          </span>
          <p className="mt-3 text-sm text-slate-600">{chosen.advice}</p>
        </div>
      )}
    </Card>
  );
}
