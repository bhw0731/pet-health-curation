import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { seedDatabase } from './seed.js';

// DB 파일은 backend/data/app.db 에 저장 (gitignore 대상)
const DATA_DIR = join(import.meta.dirname, '..', '..', 'data');
mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = join(DATA_DIR, 'app.db');

export const db = new DatabaseSync(DB_PATH);

// 스키마 정의 (idempotent — 매 실행 시 안전하게 재적용)
const SCHEMA = `
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS pet_types (
    id    TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    sort  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS concerns (
    id    TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    sort  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS concern_content (
    concern_id     TEXT PRIMARY KEY REFERENCES concerns(id),
    title          TEXT NOT NULL,
    summary        TEXT NOT NULL,
    tips           TEXT NOT NULL,        -- JSON 배열 문자열
    community_stat TEXT
  );

  CREATE TABLE IF NOT EXISTS stage_guide (
    stage_id TEXT PRIMARY KEY,
    guide    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id       TEXT PRIMARY KEY,
    concern  TEXT NOT NULL,
    pet_type TEXT NOT NULL,              -- 'dog' | 'cat' | 'all'
    author   TEXT NOT NULL,
    pet_info TEXT,
    stage    TEXT,                       -- puppy | adult | senior
    helpful  INTEGER NOT NULL DEFAULT 0,
    content  TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_reviews_concern ON reviews(concern);
`;

db.exec(SCHEMA);

// 비어 있으면 정적 데이터로 시드 (최초 1회)
const { cnt } = db.prepare('SELECT COUNT(*) AS cnt FROM pet_types').get();
if (cnt === 0) {
  seedDatabase(db);
  console.log('🌱 Database seeded from static data');
}
