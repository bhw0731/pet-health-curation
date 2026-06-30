// 콘텐츠(아티클) 피드 — 제목·요약 모두 자체 작성, 외부 이미지 미사용
export const CONTENT_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'health', label: '건강' },
  { id: 'food', label: '식이' },
  { id: 'behavior', label: '행동·교육' },
  { id: 'life', label: '라이프' },
];

export const ARTICLES = [
  { id: 'a1', cat: 'health', title: '노령견 건강검진, 무엇을 봐야 할까?', excerpt: '7세 이후 반려견은 6개월마다 검진이 권장돼요. 혈액·심장·관절 핵심 체크 항목을 정리했습니다.', emoji: '🩺', grad: 'from-sky-100 to-blue-200', read: '5분' },
  { id: 'a2', cat: 'food', title: '강아지 사료 바꿀 때 지켜야 할 7일 법칙', excerpt: '급격한 사료 교체는 소화 문제를 부릅니다. 일주일에 걸쳐 비율을 조절하는 방법을 알려드려요.', emoji: '🥣', grad: 'from-amber-100 to-orange-200', read: '4분' },
  { id: 'a3', cat: 'behavior', title: '분리불안, 외출 전 5분 루틴으로 줄이기', excerpt: '보호자가 나갈 때마다 불안해한다면, 작별 인사를 줄이고 차분한 출발 루틴을 만들어 보세요.', emoji: '🚪', grad: 'from-violet-100 to-purple-200', read: '6분' },
  { id: 'a4', cat: 'health', title: '고양이 신장 건강, 물 많이 먹이는 법', excerpt: '고양이는 만성 신장질환에 취약해요. 음수량을 자연스럽게 늘리는 환경 팁을 모았습니다.', emoji: '💧', grad: 'from-cyan-100 to-sky-200', read: '5분' },
  { id: 'a5', cat: 'life', title: '겨울철 산책, 발 시림과 빙판 대비법', excerpt: '추운 날 산책은 시간을 짧게, 발 패드 보호에 신경 쓰세요. 실내 운동 대안도 함께 소개해요.', emoji: '❄️', grad: 'from-blue-100 to-indigo-200', read: '3분' },
  { id: 'a6', cat: 'food', title: '사람 음식 중 강아지에게 위험한 것들', excerpt: '초콜릿, 양파, 포도는 소량도 위험해요. 응급 상황별 대처와 예방법을 정리했습니다.', emoji: '⚠️', grad: 'from-rose-100 to-red-200', read: '4분' },
  { id: 'a7', cat: 'behavior', title: '양치 거부하는 아이, 단계별 적응 가이드', excerpt: '손가락 칫솔부터 시작해 천천히 적응시키는 4단계. 치약 선택 팁까지 담았어요.', emoji: '🪥', grad: 'from-emerald-100 to-teal-200', read: '5분' },
  { id: 'a8', cat: 'life', title: '반려동물과 함께 가는 여행 체크리스트', excerpt: '이동장 적응부터 멀미 예방, 동반 가능 숙소 확인까지. 첫 여행 준비물을 정리했습니다.', emoji: '🧳', grad: 'from-yellow-100 to-amber-200', read: '6분' },
];
