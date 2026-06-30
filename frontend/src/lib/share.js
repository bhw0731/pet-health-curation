import { toPng } from 'html-to-image';

// ── 카카오 공유 설정 ──
// 팀에서 https://developers.kakao.com 에서 발급한 JavaScript 키를 넣으면
// '공유하기'가 카카오톡 공유로 동작합니다. 비어 있으면 Web Share/복사로 폴백.
const KAKAO_JS_KEY = '';

// 결과 → 공유용 텍스트
export function buildShareText(result) {
  const { summary, healthProfile, recommendations } = result;
  const lines = [
    `🐾 [펫헬스 큐레이션] ${summary.displayName} 건강 리포트`,
    `· ${summary.petLabel} · ${summary.ageText} · ${summary.stage.label}`,
  ];
  if (healthProfile) {
    lines.push(`· 종합 건강 지수: ${healthProfile.overall}점 (${healthProfile.grade.label})`);
    if (healthProfile.focusArea) lines.push(`· 집중 관리 영역: ${healthProfile.focusArea}`);
  }
  lines.push(`· 추천 관리: ${recommendations.map((r) => r.title).join(' / ')}`);
  lines.push('— 우리 아이 맞춤 건강 큐레이션');
  return lines.join('\n');
}

// 텍스트 클립보드 복사
export async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

// 결과 DOM을 PNG 이미지로 저장 (다운로드)
export async function saveAsImage(node, filename = 'pet-health-report.png') {
  const dataUrl = await toPng(node, {
    backgroundColor: '#ffffff',
    pixelRatio: 2,
    cacheBust: true,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

// 카카오 SDK 동적 로드 + 초기화 (키가 있을 때만)
function ensureKakao() {
  return new Promise((resolve) => {
    if (!KAKAO_JS_KEY) return resolve(null);
    if (window.Kakao?.isInitialized?.()) return resolve(window.Kakao);
    if (window.Kakao) {
      window.Kakao.init(KAKAO_JS_KEY);
      return resolve(window.Kakao);
    }
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    s.onload = () => {
      window.Kakao.init(KAKAO_JS_KEY);
      resolve(window.Kakao);
    };
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
}

/**
 * 공유 실행 (우선순위):
 *  1) 카카오 키 설정됨 → 카카오톡 공유
 *  2) 모바일 Web Share API 지원 → 네이티브 공유 시트(카카오톡 등)
 *  3) 폴백 → 텍스트 클립보드 복사
 * @returns {'kakao'|'webshare'|'copied'}
 */
export async function shareResult(result) {
  const text = buildShareText(result);

  const kakao = await ensureKakao();
  if (kakao) {
    kakao.Share.sendDefault({
      objectType: 'text',
      text,
      link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
    });
    return 'kakao';
  }

  if (navigator.share) {
    await navigator.share({ title: '펫헬스 큐레이션 건강 리포트', text });
    return 'webshare';
  }

  await copyText(text);
  return 'copied';
}
