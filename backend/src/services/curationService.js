import { getLifeStage } from '../data/curationRules.js';
import {
  getPetTypeLabel,
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

  const displayName = petName || `우리 ${petLabel}`;
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  const ageText = years > 0 ? `${years}살 ${months}개월` : `${months}개월`;

  return {
    summary: {
      headline: `${displayName}를 위한 ${stage.label} 맞춤 가이드`,
      petLabel,
      ageText,
      stage: { id: stage.id, label: stage.label },
      stageGuide: getStageGuide(stage.id),
      concernCount: recommendations.length,
      reviewCount: totalReviews,
    },
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
