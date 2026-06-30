// API 호출을 한 곳에 모아 관리 (vite proxy 덕분에 상대경로 사용)

export async function fetchOptions() {
  const res = await fetch('/api/curation/options');
  if (!res.ok) throw new Error('옵션을 불러오지 못했습니다.');
  return res.json();
}

export async function requestCuration(payload) {
  const res = await fetch('/api/curation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (res.status === 422) {
    // 서버 유효성 실패 → 필드별 에러를 그대로 폼에 전달
    const err = new Error('ValidationError');
    err.fields = data.fields;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || '요청에 실패했습니다.');

  return data;
}
