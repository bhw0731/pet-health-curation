// 항목별 건강 밸런스 레이더 차트 (recharts)
// '권장 수준' 기준선과 '우리 아이' 점수를 겹쳐 비교 → 분석적 인상 강화
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RECOMMENDED = 80; // 권장 건강 수준 기준선

export default function HealthRadar({ data = [] }) {
  // data: [{ axis, score, flagged }, ...] → 비교용 baseline 추가
  const chartData = data.map((d) => ({ ...d, recommended: RECOMMENDED }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={chartData} outerRadius="68%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: '#64748b' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
          formatter={(v, name) => [`${v}점`, name]}
        />
        {/* 권장 수준 기준선 */}
        <Radar
          name="권장 수준"
          dataKey="recommended"
          stroke="#cbd5e1"
          fill="#cbd5e1"
          fillOpacity={0.12}
          strokeDasharray="4 4"
          dot={false}
        />
        {/* 우리 아이 점수 */}
        <Radar
          name="우리 아이"
          dataKey="score"
          stroke="#2f7df6"
          fill="#2f7df6"
          fillOpacity={0.3}
          dot={{ r: 3, fill: '#2f7df6' }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
      </RadarChart>
    </ResponsiveContainer>
  );
}
