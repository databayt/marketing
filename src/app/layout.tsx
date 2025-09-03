import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This should only be reached for the root path
  // All other paths should be handled by [locale] routes
  return children;
}
