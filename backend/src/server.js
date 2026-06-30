import express from 'express';
import cors from 'cors';
import curationRouter from './routes/curation.js';

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어
app.use(cors()); // MVP 단계: 모든 출처 허용 (배포 시 origin 화이트리스트로 제한)
app.use(express.json());

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'pet-curation', time: new Date().toISOString() });
});

// 큐레이션 라우터
app.use('/api/curation', curationRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 공통 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`✅ Curation API running on http://localhost:${PORT}`);
});
