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

// الـ RootLayout لازم يكون Async Component لاستقبال الـ `params`
export default async function RootLayout({ children, params }) {
  // الـ `locale` بتجي من الـ URL (مثلاً /ar/صفحتي) بسبب المسار الديناميكي [locale]
  const { locale } = params;

  // التحقق من صحة اللغة
  // إذا كانت اللغة اللي بالـ URL مو موجودة بمصفوفة اللغات المدعومة،
  // بنعرض صفحة 404 (Not Found).
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ملاحظة مهمة: للحصول على الترجمات بالـ Client Components،
  // يفضل تمرير الـ `messages` للـ `NextIntlClientProvider`.
  // لازم تحمل ملف الترجمة المناسب للغة الحالية هون.
  // مثال (فك التعليق إذا احتجتها):
  // let messages;
  // try {
  //   messages = (await import(`../../messages/${locale}.json`)).default;
  // } catch (error) {
  //   // إذا الملف ما كان موجود، فيك تعرض 404 أو تستخدم رسائل افتراضية
  //   console.error(`Could not load messages for locale ${locale}:`, error);
  //   notFound();
  // }
const direction = locale === 'ar' ? 'rtl' : 'ltr';
console.log(direction);
  return (
    // تمرير الـ `locale` للـ `NextIntlClientProvider` ضروري
    // ولو حملت الـ `messages` (كما هو موضح بالتعليق)، بتمررها كمان: `messages={messages}`
    <NextIntlClientProvider locale={locale}>
      <ChapterContext>
        {/* تعيين سمة `lang` على عنصر الـ `<html>` للغة الحالية */}
        <html lang={locale} dir={direction} className={`${geistSans.variable} ${geistMono.variable}`}>
          <body>
            {children}
          </body>
        </html>
      </ChapterContext>
    </NextIntlClientProvider>
  );
}