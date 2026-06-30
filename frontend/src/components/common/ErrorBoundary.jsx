import { Component } from 'react';
import ErrorState from './ErrorState.jsx';

// 전역 에러 바운더리 — 렌더 중 예외 발생 시 친근한 폴백 화면
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-stone-50 p-6">
          <div className="w-full max-w-md">
            <ErrorState
              title="일시적인 오류가 발생했어요"
              description="페이지를 새로고침하면 대부분 해결돼요."
              onRetry={this.handleReset}
            />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
