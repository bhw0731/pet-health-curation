// 커뮤니티 시드 데이터 (전부 자체 작성 — 외부 콘텐츠/이미지 미사용)
// thumb: 외부 이미지 대신 그라데이션 키 + 이모지로 표현

export const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'qna', label: 'Q&A', color: 'blue' },
  { id: 'health', label: '건강', color: 'green' },
  { id: 'daily', label: '일상', color: 'amber' },
  { id: 'review', label: '후기', color: 'purple' },
];

// 카테고리 색상 (정적 클래스 — 빌드 누락 방지용 리터럴)
export const CATEGORY_STYLE = {
  qna: 'bg-blue-50 text-blue-600',
  health: 'bg-emerald-50 text-emerald-600',
  daily: 'bg-amber-50 text-amber-600',
  review: 'bg-purple-50 text-purple-600',
};

// 썸네일 그라데이션 (이모지와 함께 사용)
export const THUMBS = {
  joint: 'from-sky-100 to-blue-200',
  food: 'from-amber-100 to-orange-200',
  skin: 'from-rose-100 to-pink-200',
  walk: 'from-emerald-100 to-teal-200',
  dental: 'from-violet-100 to-purple-200',
  eye: 'from-cyan-100 to-sky-200',
};

export const SEED_POSTS = [
  {
    id: 'p1', category: 'qna', author: '초코보호자', avatar: '🐩',
    title: '노령견 산책, 하루에 얼마나 시켜야 할까요?',
    excerpt: '13살 푸들이에요. 예전보다 금방 지치는데 산책량을 어떻게 조절하는 게 좋을까요? 무리하면 관절에 안 좋다고 해서요.',
    thumb: { key: 'walk', emoji: '🐾' }, likes: 24, comments: 12, time: '10분 전',
  },
  {
    id: 'p2', category: 'health', author: '하루누나', avatar: '🐕',
    title: '환절기 피부 가려움, 이렇게 잡았어요',
    excerpt: '가을마다 긁어서 고생했는데 오메가3 보충하고 실내 습도 맞춰주니 확실히 덜 긁어요. 같은 고민 있는 분들 참고하세요!',
    thumb: { key: 'skin', emoji: '🧴' }, likes: 58, comments: 9, time: '32분 전',
  },
  {
    id: 'p3', category: 'review', author: '뚱냥집사', avatar: '🐈',
    title: '다이어트 사료 8주 후기 (사진 비교)',
    excerpt: '정량 급여 + 자동급식기 조합으로 우리 코코 0.8kg 감량 성공! 처음엔 야옹거려서 힘들었는데 적응하니 괜찮아요.',
    thumb: { key: 'food', emoji: '⚖️' }, likes: 102, comments: 27, time: '1시간 전',
  },
  {
    id: 'p4', category: 'qna', author: '몽실맘', avatar: '🐰',
    title: '강아지 양치 거부 심해요… 팁 있나요?',
    excerpt: '칫솔만 보면 도망가요. 손가락 칫솔부터 시작하는 게 맞을까요? 치약 맛도 중요한지 궁금합니다.',
    thumb: null, likes: 17, comments: 21, time: '2시간 전',
  },
  {
    id: 'p5', category: 'daily', author: '봄이아빠', avatar: '🐶',
    title: '오늘 첫 눈 본 우리 봄이 반응ㅋㅋ',
    excerpt: '눈 위에서 방방 뛰는데 너무 귀엽네요. 발 시릴까봐 금방 들어왔어요. 다들 겨울 산책 어떻게 하세요?',
    thumb: { key: 'walk', emoji: '❄️' }, likes: 76, comments: 8, time: '3시간 전',
  },
  {
    id: 'p6', category: 'health', author: '치즈관리중', avatar: '🐱',
    title: '노묘 눈곱 색이 변하면 병원 가야 하나요?',
    excerpt: '맑은 눈물은 괜찮다는데 노랗게 끼기 시작하면 결막염일 수 있다고 들었어요. 경험 있으신 분 조언 부탁드려요.',
    thumb: { key: 'eye', emoji: '👁️' }, likes: 33, comments: 15, time: '5시간 전',
  },
  {
    id: 'p7', category: 'review', author: '관절케어', avatar: '🦮',
    title: '미끄럼방지 매트 깔고 달라진 점',
    excerpt: '노견이 거실에서 자꾸 미끄러져서 매트 깔았는데 확실히 안정적으로 걸어요. 관절 걱정되는 집은 강추!',
    thumb: { key: 'joint', emoji: '🦴' }, likes: 49, comments: 6, time: '8시간 전',
  },
  {
    id: 'p8', category: 'daily', author: '두부엄마', avatar: '🐕‍🦺',
    title: '우리 두부 10번째 생일 🎂',
    excerpt: '벌써 10살이라니 믿기지 않네요. 건강검진 받고 왔는데 다 정상이래요. 오래오래 같이 살자 두부야!',
    thumb: { key: 'dental', emoji: '🎂' }, likes: 134, comments: 33, time: '1일 전',
  },
];
