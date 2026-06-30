// 건강 점수 → 등급 (백엔드 gradeOf와 동일 기준, 클라이언트 실시간 반영용)
export function gradeOf(score) {
  if (score >= 80) return { id: 'good', label: '양호', color: 'emerald' };
  if (score >= 65) return { id: 'caution', label: '주의', color: 'amber' };
  return { id: 'attention', label: '집중 관리', color: 'rose' };
}
