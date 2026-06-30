import { getLifeStage } from '../data/curationRules.js';
import {
  getPetTypeLabel,
  getConcerns,
  getConcernContent,
  getStageGuide,
  getReviewsForConcern,
} from '../repositories/curationRepo.js';

/**
 * 정제된 입력값(value)을 받아 조건부 추천 결과를 생성한다.
 * 조건 분기 = (1) 나이 구간 + (2) 선택한 고민들
 *
 * @param {{petType:string, ageMonths:number, concerns:string[], petName:string}} value
 */
export function buildCuration(value) {
  const { petType, ageMonths, concerns, petName } = value;

  const stage = getLifeStage(ageMonths);
  const petLabel = getPetTypeLabel(petType);

  // 선택한 고민별 추천 카드 구성 (콘텐츠/후기는 DB에서 조회)
  const recommendations = concerns.map((concernId) => {
    const content = getConcernContent(concernId);
    return {
      concernId,
      title: content.title,
      summary: content.summary,
      tips: content.tips,
      communityStat: content.communityStat,
      vetTip: content.vetTip,
      // 같은 고민을 가진 보호자 후기 (종/생애주기 매칭)
      reviews: getReviewsForConcern(concernId, petType, stage.id),
      // 노령기 + 관절 같은 조합엔 우선순위 가중 (정렬에 활용)
      priority: getPriority(stage.id, concernId),
    };
  });

  // 우선순위 높은 순으로 정렬
  recommendations.sort((a, b) => b.priority - a.priority);

  // 추천에 포함된 후기 총개수 (요약 표시용)
  const totalReviews = recommendations.reduce((sum, r) => sum + r.reviews.length, 0);

  // 건강 지수 프로파일 (대시보드 시각화용: 종합 점수 + 항목별 레이더)
  const healthProfile = buildHealthProfile(concerns, stage.id);

  const displayName = petName || `우리 ${petLabel}`;
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  const ageText = years > 0 ? `${years}살 ${months}개월` : `${months}개월`;

  // 개인화 인사말 (LLM 없이 입력값 기반 결정적 템플릿)
  const focusArea = healthProfile.focusArea;
  const greeting = {
    text: `${displayName}는 현재 ${ageText} ${stage.label}, ${focusArea} 관리가 집중적으로 필요해요!`,
    highlight: focusArea, // 프론트에서 강조할 키워드
  };

  return {
    summary: {
      headline: `${displayName}를 위한 ${stage.label} 맞춤 가이드`,
      displayName,
      petType, // 종 id (아이콘 표시용)
      petLabel,
      ageText,
      stage: { id: stage.id, label: stage.label },
      stageGuide: getStageGuide(stage.id),
      concernCount: recommendations.length,
      reviewCount: totalReviews,
      greeting,
    },
    healthProfile,
    recommendations,
    disclaimer:
      '본 정보는 커뮤니티 데이터와 일반 가이드를 기반으로 한 참고용이며, 정확한 진단은 수의사 상담이 필요합니다.',
  };
}

// 나이 구간과 고민의 조합으로 가중치 부여 (간단한 규칙 기반 예시)
function getPriority(stageId, concernId) {
  let score = 1;
  if (stageId === 'senior' && ['joint', 'dental', 'eye'].includes(concernId)) score += 2;
  if (stageId === 'puppy' && ['digestion', 'skin'].includes(concernId)) score += 2;
  if (stageId === 'adult' && concernId === 'weight') score += 2;
  return score;
}

/**
 * 건강 지수 프로파일 산출 (0~100).
 * - 6개 건강 영역 전체에 대해 점수를 매겨 레이더 차트 데이터를 구성
 * - 사용자가 "고민"으로 선택한 영역 = 관리가 필요한 영역 → 점수 하향
 * - 생애주기(노령기 등)에 따라 전반적 baseline 조정
 * 규칙 기반의 결정적(deterministic) 계산이라 같은 입력엔 같은 결과.
 */
function buildHealthProfile(selectedConcerns, stageId) {
  const allConcerns = getConcerns(); // [{id,label}, ...] 6개
  const stagePenalty = stageId === 'senior' ? 14 : stageId === 'puppy' ? 6 : 4;

  const radar = allConcerns.map((c, idx) => {
    // baseline에 약간의 항목별 변주를 줘서 레이더가 평평하지 않게
    let score = 92 - (idx % 3) * 3 - stagePenalty;
    const flagged = selectedConcerns.includes(c.id);
    if (flagged) score -= 26; // 선택한 고민 = 집중 관리 필요 영역
    score = Math.max(38, Math.min(97, score));
    return { key: c.id, axis: c.label, score, flagged };
  });

  const overall = Math.round(radar.reduce((sum, r) => sum + r.score, 0) / radar.length);

  return {
    overall,
    grade: gradeOf(overall),
    radar,
    // 가장 점수가 낮은(관리가 시급한) 영역
    focusArea: [...radar].sort((a, b) => a.score - b.score)[0]?.axis ?? null,
  };
}

function gradeOf(score) {
  if (score >= 80) return { id: 'good', label: '양호', color: 'emerald' };
  if (score >= 65) return { id: 'caution', label: '주의', color: 'amber' };
  return { id: 'attention', label: '집중 관리', color: 'rose' };
}
