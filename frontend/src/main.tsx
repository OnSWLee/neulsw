import React, { Component, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import "./index.css";

// 서브경로 배포(예: /neulsw)일 때만 사용. 루트 배포 시 비워두면 홈이 정상 표시됨
const rawBase = (import.meta.env.VITE_BASE_PATH ?? "").toString().trim().replace(/\/+$/, "");
const basename = rawBase && rawBase !== "/" ? rawBase : "";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError = () => ({ hasError: true });
  render() {
    if (this.state.hasError)
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream-white p-6">
          <p className="text-slate-600">일시적인 오류가 발생했습니다. 페이지를 새로고침해 주세요.</p>
        </div>
      );
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);





