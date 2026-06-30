// 제휴 상품 클릭 추적 (MVP 목업 — 실제론 서버 이벤트/제휴사 SDK로 전송)
const KEY = 'pet:affiliate:clicks';

export function trackProductClick(product) {
  try {
    const log = JSON.parse(localStorage.getItem(KEY) || '[]');
    log.push({
      name: product.name,
      brand: product.brand,
      price: product.price,
      at: new Date().toISOString(),
    });
    localStorage.setItem(KEY, JSON.stringify(log.slice(-100)));
  } catch {
    /* noop */
  }
  // 실제 서비스에서는 여기서 제휴 추적 링크로 이동 + 전환 이벤트 전송
  console.log('[affiliate] product click tracked:', product.name);
}

export function getAffiliateClickCount() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]').length;
  } catch {
    return 0;
  }
}
