'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Toggle between supported locales (ar/en)
  const toggleLocale = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const buttonText = currentLocale === 'ar' ? 'EN' : 'عربي';
  const buttonIcon = currentLocale === 'ar' ? '🇬🇧' : '🇸🇦';

  return (
    <Box className="flex justify-center items-center mx-5">
      <Button
        onClick={toggleLocale}
        variant="contained"
        className="normal-case font-bold rounded-full px-4 py-2"
        sx={{
          backgroundColor: 'rgba(76,176,179,1)',
          '&:hover': {
            backgroundColor: 'rgba(56,156,159,1)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <span className="text-xl mr-2">{buttonIcon}</span>
        {buttonText}
      </Button>
    </Box>
  );
}