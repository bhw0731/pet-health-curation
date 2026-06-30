import { motion } from 'framer-motion';

// 종합 건강 지수 게이지 (의존성 없는 SVG 도넛 차트)
const COLOR = {
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
};

export default function HealthGauge({ score = 0, grade }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const dash = (pct / 100) * circumference;
  const color = COLOR[grade?.color] ?? '#2f7df6';

  return (
    <div className="relative grid place-items-center">
      <svg width="168" height="168" viewBox="0 0 160 160" className="-rotate-90">
        {/* 배경 트랙 */}
        <circle cx="80" cy="80" r={r} fill="none" stroke="#eef2f7" strokeWidth="14" />
        {/* 점수 진행 */}
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.9s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.div
          key={score}
          initial={{ scale: 0.7, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
          className="text-5xl font-extrabold leading-none text-slate-900"
        >
          {score}
        </motion.div>
        <div className="mt-1 text-xs font-medium text-slate-400">/ 100 점</div>
      </div>
    </div>
  );
}
