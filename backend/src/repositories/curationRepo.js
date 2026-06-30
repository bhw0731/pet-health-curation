// 데이터 접근 계층(repository) — 서비스/라우트는 이 함수들만 사용하고
// SQL 세부사항은 여기 캡슐화한다. (DB 교체 시 이 파일만 수정)
import { db } from '../db/database.js';

export function getPetTypes() {
  return db.prepare('SELECT id, label FROM pet_types ORDER BY sort').all();
}

export function getConcerns() {
  return db.prepare('SELECT id, label FROM concerns ORDER BY sort').all();
}

export function getPetTypeIds() {
  return getPetTypes().map((p) => p.id);
}

export function getConcernIds() {
  return getConcerns().map((c) => c.id);
}

export function getPetTypeLabel(petType) {
  const row = db.prepare('SELECT label FROM pet_types WHERE id = ?').get(petType);
  return row?.label ?? '반려동물';
}

export function getConcernContent(concernId) {
  const row = db
    .prepare(
      'SELECT title, summary, tips, community_stat, vet_tip FROM concern_content WHERE concern_id = ?'
    )
    .get(concernId);
  if (!row) return null;
  return {
    title: row.title,
    summary: row.summary,
    tips: JSON.parse(row.tips),
    communityStat: row.community_stat,
    vetTip: row.vet_tip,
  };
}

export function getStageGuide(stageId) {
  const row = db.prepare('SELECT guide FROM stage_guide WHERE stage_id = ?').get(stageId);
  return row?.guide ?? '';
}

/**
 * 고민별 후기 매칭. 점수 = 공감수 + 종 일치(+1000) + 생애주기 일치(+500)
 * (정렬·가중치를 SQL에서 처리)
 */
export function getReviewsForConcern(concern, petType, stageId, limit = 2) {
  return db
    .prepare(
      `SELECT id, author, pet_info AS petInfo, helpful, content,
              (helpful
                + CASE WHEN pet_type = ? THEN 1000 ELSE 0 END
                + CASE WHEN stage = ?    THEN 500  ELSE 0 END) AS score
       FROM reviews
       WHERE concern = ? AND (pet_type = ? OR pet_type = 'all')
       ORDER BY score DESC, helpful DESC
       LIMIT ?`
    )
    .all(petType, stageId, concern, petType, limit)
    .map(({ score, ...rest }) => rest); // 내부 점수 필드 제거
}
