import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import CommunityPage from './components/community/CommunityPage.jsx';
import HealthToolsPage from './pages/HealthToolsPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import HospitalPage from './pages/HospitalPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PetForm from './components/PetForm.jsx';
import CurationResult from './components/CurationResult.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import ErrorState from './components/common/ErrorState.jsx';
import ResultSkeleton from './components/common/ResultSkeleton.jsx';
import Footer from './components/Footer.jsx';
import { requestCuration } from './lib/api.js';
import {
  getHistory,
  saveToHistory,
  removeFromHistory,
  clearHistory,
  getProfile,
  saveProfile,
  clearProfile,
} from './lib/storage.js';

export default function App() {
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false); // 현재 결과가 저장되었는지
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [profile, setProfile] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  // 'home' | 'community' | 'tools' | 'shop' | 'content' | 'hospital' | 'services'
  const [view, setView] = useState('home');
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const VIEWS = ['home', 'community', 'tools', 'shop', 'content', 'hospital', 'services'];

  // 해시 기반 라우팅 (딥링크 가능: /#tools 등)
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace('#', '');
      if (VIEWS.includes(h)) setView(h);
      else if (h === '' ) setView('home');
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigate(next) {
    setView(next);
    window.location.hash = next === 'home' ? '' : next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 최초 진입 시 저장된 기록/프로필 로드
  useEffect(() => {
    setHistory(getHistory());
    setProfile(getProfile());
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
    setSubmitError(false);
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

  // 프로필 저장/삭제
  function handleProfileSave(p) {
    saveProfile(p);
    setProfile(p);
  }

  function handleProfileClear() {
    clearProfile();
    setProfile(null);
  }

  const goToForm = () => {
    setView('home');
    setTimeout(scrollToForm, 60);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={navigate} onCtaClick={goToForm} />

      {view !== 'home' ? (
        <main className="flex-1">
          {view === 'community' && <CommunityPage />}
          {view === 'tools' && <HealthToolsPage />}
          {view === 'shop' && <ShopPage />}
          {view === 'content' && <ContentPage />}
          {view === 'hospital' && <HospitalPage />}
          {view === 'services' && <ServicesPage onNavigate={navigate} />}
        </main>
      ) : (
        <main className="flex-1">
          <Hero onCtaClick={scrollToForm} />
          <Features />

        <section ref={formRef} id="curation" className="bg-white py-20 scroll-mt-16">
          <div className="mx-auto max-w-5xl px-4">
            <header className="text-center mb-10">
              <h2 className="text-3xl font-bold text-stone-900">
                우리 아이 맞춤 건강 큐레이션
              </h2>
              <p className="mt-3 text-stone-500">
                30초면 충분해요. 아래 정보를 입력하면 맞춤 가이드를 보여드릴게요.
              </p>
            </header>

            {/* 나의 반려동물 프로필 */}
            <div className="mb-6">
              <ProfileCard
                profile={profile}
                onSave={handleProfileSave}
                onClear={handleProfileClear}
              />
            </div>

            {/* 분석 기록 토글 */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowHistory((v) => !v)}
                className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
              >
                🗂 내 분석 기록 {history.length > 0 && `(${history.length})`}
                <span className="ml-1 text-stone-400">{showHistory ? '▲' : '▼'}</span>
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

            <PetForm
              onSubmit={handleSubmit}
              loading={loading}
              initialName={profile?.name}
              onError={() => setSubmitError(true)}
            />

            {submitError && (
              <div className="mt-6">
                <ErrorState
                  title="결과를 불러오지 못했어요"
                  description="네트워크 상태를 확인하고 다시 시도해 주세요."
                  onRetry={() => setSubmitError(false)}
                />
              </div>
            )}

            {loading && (
              <div className="mt-16">
                <ResultSkeleton />
              </div>
            )}

            {!loading && result && (
              <div ref={resultRef} className="mt-16 scroll-mt-16">
                <CurationResult
                  result={result}
                  onReset={handleReset}
                  onSave={handleSave}
                  saved={saved}
                  profile={profile}
                  history={history}
                  onView={handleView}
                />
              </div>
            )}
          </div>
        </section>
        </main>
      )}

      <Footer />
    </div>
  );
}
