import type { AppProps } from "next/app";
import "../src/index.css";
import NextNavBar from "../components/NextNavBar";
import NextFooter from "../components/NextFooter";
import PageTransition from "../components/PageTransition";
import { AuthProvider } from "../src/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-cream-white">
        <NextNavBar />
        <main className="flex-1">
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </main>
        <NextFooter />
      </div>
    </AuthProvider>
  );
}
