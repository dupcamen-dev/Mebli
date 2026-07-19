import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SplashLoader } from "@/components/layout/SplashLoader";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AuthProvider } from "@/components/layout/AuthProvider";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mebli Chortkiv — меблі за вашим характером",
    template: "%s | Mebli Chortkiv",
  },
  description:
    "Виготовлення преміальних меблів за індивідуальним проектом у Чорткові. Сучасний мінімалізм, натуральне дерево, бездоганна якість.",
  keywords: [
    "меблі на замовлення",
    "Чортків",
    "меблі Чортків",
    "кухні на замовлення",
    "меблі для вітальні",
    "індивідуальні меблі",
    "деревяні меблі",
    "преміум меблі",
  ],
  openGraph: {
    title: "Mebli Chortkiv — меблі за вашим характером",
    description:
      "Виготовлення преміальних меблів за індивідуальним проектом. Мінімалізм та якість.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
        <SplashLoader />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
