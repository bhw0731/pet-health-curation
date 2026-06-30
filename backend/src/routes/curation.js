import { Router } from 'express';
import { validatePetInput } from '../services/validate.js';
import { buildCuration } from '../services/curationService.js';
import { getPetTypes, getConcerns } from '../repositories/curationRepo.js';

const router = Router();

// 폼에서 사용할 선택지(종/고민 목록)를 프론트에 내려줌 → 옵션을 DB에서 조회
router.get('/options', (req, res) => {
  res.json({ petTypes: getPetTypes(), concerns: getConcerns() });
});

// 핵심: 사용자 입력 → 맞춤 큐레이션 결과
router.post('/', (req, res) => {
  const { valid, errors, value } = validatePetInput(req.body);

  if (!valid) {
    // 422: 유효성 실패. 프론트는 errors를 필드별 메시지로 표시
    return res.status(422).json({ error: 'ValidationError', fields: errors });
  }

  const result = buildCuration(value);
  res.json(result);
});

export default router;
