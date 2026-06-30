// 분석 결과를 브라우저 localStorage에 저장/관리 (로그인 없이 개인 기록 유지)
const KEY = 'pet:history';
const MAX = 20; // 최근 20건까지 보관

export function getHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(result) {
  const history = getHistory();
  const entry = {
    id: `h-${Date.now()}`,
    savedAt: new Date().toISOString(),
    // 목록 표시에 필요한 요약 정보
    label: result.summary.displayName,
    petLabel: result.summary.petLabel,
    ageText: result.summary.ageText,
    stageLabel: result.summary.stage.label,
    score: result.healthProfile?.overall ?? null,
    grade: result.healthProfile?.grade?.label ?? null,
    // 다시 보기를 위해 전체 결과도 저장
    result,
  };
  const next = [entry, ...history].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
  return entry;
}

export function removeFromHistory(id) {
  const next = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

// ── 나의 반려동물 프로필 ──
const PROFILE_KEY = 'pet:profile';

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

// ── 오늘의 건강 실천 체크 상태 (날짜별로 저장 → 매일 초기화) ──
function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `pet:checklist:${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function getChecklistState() {
  try {
    const raw = localStorage.getItem(todayKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveChecklistState(state) {
  localStorage.setItem(todayKey(), JSON.stringify(state));
}
