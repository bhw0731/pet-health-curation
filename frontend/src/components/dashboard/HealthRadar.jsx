// 항목별 건강 밸런스 레이더 차트 (recharts)
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export default function HealthRadar({ data = [] }) {
  // data: [{ axis, score, flagged }, ...]
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data} outerRadius="70%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: '#64748b' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="건강 지수"
          dataKey="score"
          stroke="#2f7df6"
          fill="#2f7df6"
          fillOpacity={0.25}
          dot={{ r: 3, fill: '#2f7df6' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
