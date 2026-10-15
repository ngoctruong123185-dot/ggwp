import type { Metadata, Viewport } from "next";
// Fonts are bundled locally (Vietnamese glyphs included) so the app keeps working offline.
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/barlow-condensed/800-italic.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "HiHSK Local - Nền tảng tự học tiếng Trung HSK 1-6",
  description:
    "Học tiếng Trung HSK 1-6 chạy hoàn toàn local với 11 dạng bài tập tương tác, luyện viết chữ Hán, chép chính tả video và thi thử.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A1022" },
    { media: "(prefers-color-scheme: light)", color: "#F3F5FA" },
  ],
};

// Applies the saved theme before first paint (dark by default) to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('hihsk-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
