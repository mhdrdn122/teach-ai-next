// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// اللغات المدعومة (نفسها يلي بـ middleware.ts)
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // بنتحقق إنو اللغة المدخلة مدعومة، وإذا لأ، بنعرض صفحة 404
  if (!locales.includes(locale)) notFound();

  return {
    // هون منحدد المسار لملفات الترجمة تبعنا
    // انتبه للمسار النسبي: إذا ملف i18n.ts بـ root المشروع،
    // ومجلد messages بـ src/messages/، فالمسار بيكون:
    messages: (await import(`./Lang/en.json`)).default
    // إذا مجلد messages بـ root المشروع، بكون المسار:
    // messages: (await import(`./messages/${locale}.json`)).default
  };
});