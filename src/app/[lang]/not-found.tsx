import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { getDictionary } from '@/components/internationalization/dictionaries';
import { i18n, type Locale } from '@/components/internationalization/config';

export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: Locale = (i18n.locales as readonly string[]).includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-bold">{dict.errors.notFound}</h2>
        </div>
        <Button asChild>
          <Link href={`/${locale}`}>{dict.common.home}</Link>
        </Button>
      </div>
    </div>
  );
}
