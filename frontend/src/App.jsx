import { useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import PetForm from './components/PetForm.jsx';
import CurationResult from './components/CurationResult.jsx';
import Footer from './components/Footer.jsx';
import { requestCuration } from './lib/api.js';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 폼 제출 → API 호출 → 결과 표시 (User Flow의 핵심 연결부)
  async function handleSubmit(payload) {
    setLoading(true);
    try {
      const data = await requestCuration(payload);
      setResult(data);
      // 결과 영역으로 부드럽게 스크롤
      setTimeout(
        () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        80
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
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

            <PetForm onSubmit={handleSubmit} loading={loading} />

            {result && (
              <div ref={resultRef} className="mt-16 scroll-mt-16">
                <CurationResult result={result} onReset={handleReset} />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
