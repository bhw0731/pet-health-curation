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
