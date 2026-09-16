import type { Metadata } from "next";
import { sans, serif } from "@/lib/fonts";
import { Providers } from "@/components/Providers";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Agrupamento de Escolas de Castro Marim | AECTM",
    template: "%s | AECTM",
  },
  description: "Página do Agrupamento de Escolas de Castro Marim",
  icons: {
    icon: "/brand/logo.svg",
    apple: "/brand/logo-180.png",
  },
};

const themeBoot = `
try {
  var t = localStorage.getItem('aectm-theme');
  if (t === 'dark' || t === 'light') {
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
  } else {
    document.documentElement.dataset.theme = 'light';
  }
  var l = localStorage.getItem('aectm-lang');
  document.documentElement.lang = l === 'en' ? 'en' : 'pt-PT';
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="min-h-dvh antialiased font-sans">
        <Providers>
          <Loader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
