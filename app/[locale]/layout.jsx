// app/[locale]/layout.js
// تأكد إنو الـ layout تبعك موجود بمسار ديناميكي مثل `app/[locale]/layout.js`
// هيك Next.js بيقدر يستخلص الـ `locale` من الـ URL.

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChapterContext } from "./Context/ChapterContext"; // تأكد من صحة المسار
import { NextIntlClientProvider } from "next-intl";

// لاستخدام hasLocale و notFound، لازم يكونوا موجودين
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

// نفترض إنو عندك ملف i18n/routing.js بيحتوي على مصفوفة اللغات المدعومة
// رح أقدملك مثال لهذا الملف بالأسفل.
import { routing } from '@/i18n/routing';
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Teach Ai Next App",
  description: "Teach Ai Next App",
};

export default async function RootLayout({ children, params }) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <NextIntlClientProvider locale={locale}>
      <ChapterContext>
        <html lang={locale} dir={direction} className={`${geistSans.variable} ${geistMono.variable}`}>
          <body>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </body>
        </html>
      </ChapterContext>
    </NextIntlClientProvider>
  );
}