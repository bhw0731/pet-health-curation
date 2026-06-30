// 쇼핑 카탈로그 (자체 작성 · 외부 이미지 미사용 · 가상 브랜드)
export const SHOP_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'food', label: '사료' },
  { id: 'supplement', label: '영양제' },
  { id: 'snack', label: '간식' },
  { id: 'care', label: '위생·케어' },
  { id: 'goods', label: '용품' },
];

export const SHOP_PRODUCTS = [
  { id: 's1', cat: 'food', name: '연령별 맞춤 균형 사료 2kg', brand: '뉴트리밸런스', price: 28900, emoji: '🥣', grad: 'from-amber-100 to-orange-200', tag: '베스트' },
  { id: 's2', cat: 'food', name: '체중관리 처방 다이어트 사료', brand: '슬림펫', price: 31900, emoji: '🥗', grad: 'from-lime-100 to-emerald-200', tag: null },
  { id: 's3', cat: 'supplement', name: '글루코사민 관절케어 정', brand: '조인트랩', price: 32000, emoji: '🦴', grad: 'from-sky-100 to-blue-200', tag: '베스트' },
  { id: 's4', cat: 'supplement', name: '오메가3 피부·모질 영양제', brand: '펫웰', price: 24900, emoji: '🧴', grad: 'from-rose-100 to-pink-200', tag: null },
  { id: 's5', cat: 'supplement', name: '프로바이오틱스 유산균', brand: '바이오펫', price: 21000, emoji: '🌿', grad: 'from-emerald-100 to-teal-200', tag: null },
  { id: 's6', cat: 'snack', name: '저칼로리 트레이닝 트릿', brand: '슬림펫', price: 9900, emoji: '🍪', grad: 'from-yellow-100 to-amber-200', tag: null },
  { id: 's7', cat: 'snack', name: '치석케어 덴탈껌 30개입', brand: '치카봉', price: 12500, emoji: '🦷', grad: 'from-violet-100 to-purple-200', tag: '베스트' },
  { id: 's8', cat: 'care', name: '저자극 약산성 케어 샴푸', brand: '닥터바스', price: 18500, emoji: '🛁', grad: 'from-cyan-100 to-sky-200', tag: null },
  { id: 's9', cat: 'care', name: '눈물자국 케어 전용 티슈', brand: '클리어아이', price: 8900, emoji: '👁️', grad: 'from-blue-100 to-cyan-200', tag: null },
  { id: 's10', cat: 'goods', name: '미끄럼 방지 관절보호 매트', brand: '컴포펫', price: 45000, emoji: '🟫', grad: 'from-stone-100 to-amber-200', tag: null },
  { id: 's11', cat: 'goods', name: '자동급식기 타이머형', brand: '데일리펫', price: 39000, emoji: '⏰', grad: 'from-indigo-100 to-blue-200', tag: '신상' },
  { id: 's12', cat: 'goods', name: '노즈워크 코담요 장난감', brand: '플레이펫', price: 15900, emoji: '🧩', grad: 'from-pink-100 to-rose-200', tag: null },
];
