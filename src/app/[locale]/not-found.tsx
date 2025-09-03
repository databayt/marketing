import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServerDictionary } from '@/lib/use-dictionary';
import type { Locale } from '@/lib/locales';

export default async function NotFound() {
  // For not-found pages, we can't reliably get locale from params
  // so we'll default to English and handle this gracefully
  const dict = await getServerDictionary('en');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-bold">{dict.errors.notFound}</h2>
        </div>
        <Button asChild>
          <Link href="/en">
            {dict.common.home}
          </Link>
        </Button>
      </div>
    </div>
  );
}