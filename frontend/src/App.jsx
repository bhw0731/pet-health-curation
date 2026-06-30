import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import PetForm from './components/PetForm.jsx';
import CurationResult from './components/CurationResult.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import Footer from './components/Footer.jsx';
import { requestCuration } from './lib/api.js';
import { getHistory, saveToHistory, removeFromHistory, clearHistory } from './lib/storage.js';

export default function App() {
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false); // 현재 결과가 저장되었는지
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  // 최초 진입 시 저장된 기록 로드
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const scrollToResult = () =>
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      80
    );

  // 폼 제출 → API 호출 → 결과 표시 (User Flow의 핵심 연결부)
  async function handleSubmit(payload) {
    setLoading(true);
    try {
      const data = await requestCuration(payload);
      setResult(data);
      setSaved(false); // 새 결과는 아직 미저장
      scrollToResult();
    } finally {
      setLoading(false);
    }
  }

  // 결과를 localStorage 기록에 저장
  function handleSave(res) {
    saveToHistory(res);
    setHistory(getHistory());
    setSaved(true);
  }

  // 기록에서 다시 보기
  function handleView(entry) {
    setResult(entry.result);
    setSaved(true); // 이미 저장된 기록
    scrollToResult();
  }

  function handleDelete(id) {
    setHistory(removeFromHistory(id));
  }

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

  function handleReset() {
    setResult(null);
    setSaved(false);
    scrollToForm();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCtaClick={scrollToForm} />

      <main className="flex-1">
        <Hero onCtaClick={scrollToForm} />
        <Features />

        <section ref={formRef} id="curation" className="bg-white py-20 scroll-mt-16">
          <div className="mx-auto max-w-5xl px-4">
            <header className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">
                우리 아이 맞춤 건강 큐레이션
              </h2>
              <p className="mt-3 text-slate-500">
                30초면 충분해요. 아래 정보를 입력하면 맞춤 가이드를 보여드릴게요.
              </p>
            </header>

            {/* 분석 기록 토글 */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowHistory((v) => !v)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                🗂 내 분석 기록 {history.length > 0 && `(${history.length})`}
                <span className="ml-1 text-slate-400">{showHistory ? '▲' : '▼'}</span>
              </button>
            </div>

            {showHistory && (
              <div className="mb-8">
                <HistoryPanel
                  history={history}
                  onView={handleView}
                  onDelete={handleDelete}
                  onClear={handleClear}
                />
              </div>
            )}

            <PetForm onSubmit={handleSubmit} loading={loading} />

            {result && (
              <div ref={resultRef} className="mt-16 scroll-mt-16">
                <CurationResult
                  result={result}
                  onReset={handleReset}
                  onSave={handleSave}
                  saved={saved}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
