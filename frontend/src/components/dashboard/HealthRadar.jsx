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
        <PolarGrid stroke="#ece6df" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: '#78716c' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #ece6df', fontSize: 12 }}
          formatter={(v, name) => [`${v}점`, name]}
        />
        {/* 권장 수준 기준선 */}
        <Radar
          name="권장 수준"
          dataKey="recommended"
          stroke="#d6cfc7"
          fill="#d6cfc7"
          fillOpacity={0.12}
          strokeDasharray="4 4"
          dot={false}
        />
        {/* 우리 아이 점수 */}
        <Radar
          name="우리 아이"
          dataKey="score"
          stroke="#f26b43"
          fill="#f26b43"
          fillOpacity={0.3}
          dot={{ r: 3, fill: '#f26b43' }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
      </RadarChart>
    </ResponsiveContainer>
  );
}
