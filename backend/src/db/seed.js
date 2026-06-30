// 정적 데이터 파일을 시드 소스로 사용해 DB를 채운다.
// (정적 파일은 "초기 데이터 정의"로 남기고, 런타임 조회는 DB에서 수행)
import {
  PET_TYPES,
  CONCERN_OPTIONS,
  CONCERN_CONTENT,
  STAGE_GUIDE,
} from '../data/curationRules.js';
import { COMMUNITY_REVIEWS } from '../data/communityReviews.js';

export function seedDatabase(db) {
  const insertPetType = db.prepare('INSERT INTO pet_types (id, label, sort) VALUES (?, ?, ?)');
  const insertConcern = db.prepare('INSERT INTO concerns (id, label, sort) VALUES (?, ?, ?)');
  const insertContent = db.prepare(
    'INSERT INTO concern_content (concern_id, title, summary, tips, community_stat) VALUES (?, ?, ?, ?, ?)'
  );
  const insertStage = db.prepare('INSERT INTO stage_guide (stage_id, guide) VALUES (?, ?)');
  const insertReview = db.prepare(
    `INSERT INTO reviews (id, concern, pet_type, author, pet_info, stage, helpful, content)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  // node:sqlite 트랜잭션으로 일괄 삽입
  db.exec('BEGIN');
  try {
    PET_TYPES.forEach((p, i) => insertPetType.run(p.id, p.label, i));
    CONCERN_OPTIONS.forEach((c, i) => insertConcern.run(c.id, c.label, i));

    for (const [concernId, content] of Object.entries(CONCERN_CONTENT)) {
      insertContent.run(
        concernId,
        content.title,
        content.summary,
        JSON.stringify(content.tips),
        content.communityStat ?? null
      );
    }

    for (const [stageId, guide] of Object.entries(STAGE_GUIDE)) {
      insertStage.run(stageId, guide);
    }

    for (const r of COMMUNITY_REVIEWS) {
      insertReview.run(
        r.id,
        r.concern,
        r.petType,
        r.author,
        r.petInfo ?? null,
        r.stage ?? null,
        r.helpful ?? 0,
        r.content
      );
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}
