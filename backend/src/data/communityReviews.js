// ─────────────────────────────────────────────────────────────
// 커뮤니티 후기 시드 데이터 (MVP: 정적 데이터 → 추후 DB + 실제 작성 기능)
// 각 후기는 concern(고민)으로 태깅되고, petType은 'all'이면 종 무관 노출
//   - helpful: 공감 수 (정렬 기준)
//   - stage: 작성자 반려동물의 생애주기 (puppy/adult/senior) — 매칭 가산점
// ─────────────────────────────────────────────────────────────

export const COMMUNITY_REVIEWS = [
  // 피부 / 털
  { id: 'r-skin-1', concern: 'skin', petType: 'dog', author: '몽이아빠', petInfo: '말티즈 · 3살', stage: 'adult', helpful: 142, content: '연어 오일을 사료에 섞어준 지 한 달째인데 털 빠짐이 확실히 줄었어요. 브러싱도 같이 하니 윤기가 달라요.' },
  { id: 'r-skin-2', concern: 'skin', petType: 'dog', author: '초코맘', petInfo: '푸들 · 5살', stage: 'adult', helpful: 88, content: '가려워서 긁길래 알레르기 검사 받았더니 닭고기 알레르기더라고요. 사료 바꾸고 진정됐어요. 원인부터 찾으세요!' },
  { id: 'r-skin-3', concern: 'skin', petType: 'cat', author: '나비집사', petInfo: '코숏 · 2살', stage: 'adult', helpful: 67, content: '건조한 겨울에 비듬이 생겼는데 가습기랑 오메가3로 좋아졌어요. 고양이도 피부 관리 필요하더라고요.' },

  // 관절 / 뼈
  { id: 'r-joint-1', concern: 'joint', petType: 'dog', author: '하루보호자', petInfo: '웰시코기 · 9살', stage: 'senior', helpful: 211, content: '노견이라 계단을 힘들어해서 집에 미끄럼 방지 매트 깔고 슬개골 보조제 먹였어요. 산책할 때 확실히 덜 절뚝여요.' },
  { id: 'r-joint-2', concern: 'joint', petType: 'dog', author: '봄이네', petInfo: '포메라니안 · 7살', stage: 'senior', helpful: 134, content: '소파에서 뛰어내리다 다친 뒤로 점프대 설치했어요. 관절은 예방이 최고인 것 같아요.' },
  { id: 'r-joint-3', concern: 'joint', petType: 'cat', author: '치즈집사', petInfo: '먼치킨 · 6살', stage: 'adult', helpful: 95, content: '먼치킨이라 관절이 걱정돼서 캣타워 단차를 낮췄어요. 글루코사민도 수의사 상담 후 챙겨주는 중이에요.' },

  // 체중 / 비만
  { id: 'r-weight-1', concern: 'weight', petType: 'dog', author: '뚱이탈출', petInfo: '비글 · 4살', stage: 'adult', helpful: 178, content: '간식을 삶은 닭가슴살로 바꾸고 계량컵으로 사료 정량 급여했더니 두 달 만에 1kg 감량 성공했어요!' },
  { id: 'r-weight-2', concern: 'weight', petType: 'cat', author: '코코집사', petInfo: '브리티시숏헤어 · 5살', stage: 'adult', helpful: 120, content: '자동급식기로 소량씩 나눠주니 폭식이 줄었어요. 노즈워크 매트로 운동량도 늘렸습니다.' },
  { id: 'r-weight-3', concern: 'weight', petType: 'all', author: '다이어터', petInfo: '반려인 5년차', stage: 'adult', helpful: 73, content: '체중을 매주 같은 요일에 기록하니까 변화가 눈에 보여서 동기부여가 됐어요. 기록이 진짜 중요해요.' },

  // 치아 / 구강
  { id: 'r-dental-1', concern: 'dental', petType: 'dog', author: '양치성공', petInfo: '시츄 · 6살', stage: 'adult', helpful: 156, content: '어릴 때부터 양치 습관 들였더니 스케일링 안 해도 된대요. 전용 치약으로 천천히 적응시키는 게 핵심!' },
  { id: 'r-dental-2', concern: 'dental', petType: 'all', author: '입냄새고민', petInfo: '반려인 3년차', stage: 'senior', helpful: 98, content: '입냄새가 심해져서 병원 갔더니 치주염이었어요. 덴탈츄만 믿지 말고 정기 검진 꼭 받으세요.' },
  { id: 'r-dental-3', concern: 'dental', petType: 'cat', author: '까칠냥', petInfo: '러시안블루 · 4살', stage: 'adult', helpful: 61, content: '고양이는 양치 싫어해서 덴탈 워터랑 가글 보조제 병행 중이에요. 조금씩이라도 하는 게 안 하는 것보단 나아요.' },

  // 소화 / 장
  { id: 'r-digestion-1', concern: 'digestion', petType: 'dog', author: '튼튼장', petInfo: '리트리버 · 2살', stage: 'adult', helpful: 109, content: '사료 바꿀 때 일주일에 걸쳐 천천히 섞었더니 무른 변 없이 잘 적응했어요. 급하게 바꾸면 꼭 탈나더라고요.' },
  { id: 'r-digestion-2', concern: 'digestion', petType: 'all', author: '유산균신봉자', petInfo: '반려인 4년차', stage: 'adult', helpful: 82, content: '프로바이오틱스 꾸준히 먹이니 배변 상태가 안정됐어요. 다만 2일 이상 설사면 바로 병원 가는 게 맞아요.' },
  { id: 'r-digestion-3', concern: 'digestion', petType: 'cat', author: '헤어볼관리', petInfo: '페르시안 · 7살', stage: 'senior', helpful: 54, content: '장모종이라 헤어볼 때문에 토를 자주 했는데 헤어볼 케어 사료로 바꾸고 빈도가 줄었어요.' },

  // 눈 / 시력
  { id: 'r-eye-1', concern: 'eye', petType: 'dog', author: '눈물자국', petInfo: '말티즈 · 3살', stage: 'adult', helpful: 124, content: '눈물 자국 때문에 고생했는데 전용 티슈로 매일 닦고 정수된 물 급여하니 많이 옅어졌어요.' },
  { id: 'r-eye-2', concern: 'eye', petType: 'dog', author: '시니어케어', petInfo: '코커스패니얼 · 11살', stage: 'senior', helpful: 76, content: '노령이라 눈이 뿌예져서 안과 갔더니 초기 백내장이래요. 정기 안과 검진 정말 중요합니다.' },
  { id: 'r-eye-3', concern: 'eye', petType: 'cat', author: '맑은눈', petInfo: '스코티시폴드 · 2살', stage: 'adult', helpful: 48, content: '눈곱이 노랗게 끼길래 병원 갔더니 결막염이었어요. 색이 변하면 빨리 진료받는 게 좋아요.' },
];

/**
 * 특정 고민(concern)에 맞는 후기를 반환.
 * 정렬: (1) 종 일치 + (2) 생애주기 일치에 가산점 → (3) 공감 수 순
 */
export function getReviewsForConcern(concern, petType, stageId, limit = 2) {
  return COMMUNITY_REVIEWS.filter(
    (r) => r.concern === concern && (r.petType === petType || r.petType === 'all')
  )
    .map((r) => {
      let score = r.helpful;
      if (r.petType === petType) score += 1000; // 종 일치 우선
      if (r.stage === stageId) score += 500; // 생애주기 일치 가산
      return { ...r, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
    .map(({ _score, concern: _c, ...rest }) => rest); // 내부 필드 제거
}
