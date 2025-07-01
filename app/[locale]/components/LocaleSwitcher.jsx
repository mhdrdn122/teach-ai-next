// components/LocaleSwitcher.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // بما إنو الزر صار تبديل، ما في داعي لـ selectedLocale
  // بنستخدم currentLocale مباشرة للعرض وتحديد اللغة التالية
  // const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  useEffect(() => {
    // إذا كنت بدك تعمل أي شي بناءً على تغيير اللغة بالـ URL
    // بس لزر التبديل، هي الـ useEffect ما الها داعي كتير
    // setSelectedLocale(currentLocale);
  }, [currentLocale]);

  // تحديد اللغة التالية للتبديل
  const getNextLocale = (current) => {
    // افترض إنو اللغات المدعومة هي 'en' و 'ar'
    return current === 'ar' ? 'en' : 'ar';
  };

  // الفانكشن اللي بتغير اللغة لما بتكبس على الزر
  const handleLocaleToggle = () => {
    const newLocale = getNextLocale(currentLocale); // تحديد اللغة الجديدة
    
    const segments = pathname.split('/');
    segments[1] = newLocale; // تغيير الـ locale بالمسار
    const newPath = segments.join('/');

    router.push(newPath);
  };

  // تحديد نص الزر أو الأيقونة بناءً على اللغة الحالية
  const buttonText = currentLocale === 'ar' ? 'EN' : 'عربي'; // رمز بسيط أو أول حرفين من اللغة المعاكسة
  const buttonIcon = currentLocale === 'ar' ? '🇬🇧' : '🇸🇦'; // مثال على أيقونات أعلام بسيطة (اختياري)

  return (
    <div style={{
      margin: '20px',
      display: 'flex',
      justifyContent: 'center', // توسيط الزر إذا كان لحاله
      alignItems: 'center',
      // تصميم الزر الكلي
      backgroundColor: '#f0f0f0',
      borderRadius: '25px', // حواف دائرية للزر التبديل
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      overflow: 'hidden', // لمنع أي شيء يخرج عن الحواف الدائرية
    }}>
      <button
        onClick={handleLocaleToggle}
        style={{
          padding: '5px 10px',
          borderRadius: '25px', // حواف دائرية على الزر الداخلي كمان
          border: 'none', // إزالة الحدود الافتراضية
          cursor: 'pointer',
          backgroundColor: '#0070f3', // لون مميز للزر
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px', // مسافة بين النص والأيقونة
          transition: 'background-color 0.3s ease, transform 0.2s ease', // تأثيرات عند التحويم والضغط
          outline: 'none', // إزالة خط التركيز الافتراضي
        }}
        // تأثير عند التحويم والضغط
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* فيك تستخدم أيقونة مباشرة أو نص الأيقونة */}
        <span style={{ fontSize: '20px' }}>{buttonIcon}</span> {/* أيقونة العلم */}
        <span>{buttonText}</span> {/* نص الزر (اللغة اللي رح ينتقل عليها) */}
      </button>
    </div>
  );
}