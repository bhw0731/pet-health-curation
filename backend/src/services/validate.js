import { getPetTypeIds, getConcernIds } from '../repositories/curationRepo.js';

/**
 * 서버 측 유효성 검사 (프론트 검사와 별개로 항상 서버에서 재검증)
 * 반환: { valid, errors, value }
 *  - value: 정제(sanitize)된 안전한 입력값
 */
export function validatePetInput(body = {}) {
  const errors = {};
  const value = {};

  const petTypeIds = getPetTypeIds();
  const concernIds = getConcernIds();

  // 1) 반려동물 종
  if (!body.petType || !petTypeIds.includes(body.petType)) {
    errors.petType = '반려동물 종류를 선택해 주세요.';
  } else {
    value.petType = body.petType;
  }

  // 2) 나이 (개월 수 기준, 0~360개월 = 30년)
  const age = Number(body.ageMonths);
  if (body.ageMonths === '' || body.ageMonths === undefined || Number.isNaN(age)) {
    errors.ageMonths = '나이를 숫자로 입력해 주세요.';
  } else if (age < 0 || age > 360) {
    errors.ageMonths = '나이는 0~360개월 사이로 입력해 주세요.';
  } else {
    value.ageMonths = Math.round(age);
  }

  // 3) 주요 고민 (1~3개)
  const concerns = Array.isArray(body.concerns) ? body.concerns : [];
  const cleaned = [...new Set(concerns)].filter((c) => concernIds.includes(c));
  if (cleaned.length === 0) {
    errors.concerns = '주요 고민을 1개 이상 선택해 주세요.';
  } else if (cleaned.length > 3) {
    errors.concerns = '주요 고민은 최대 3개까지 선택할 수 있어요.';
  } else {
    value.concerns = cleaned;
  }

  // 4) (선택) 반려동물 이름 - 표시용
  value.petName = typeof body.petName === 'string' ? body.petName.trim().slice(0, 20) : '';

  return { valid: Object.keys(errors).length === 0, errors, value };
}
