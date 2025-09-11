export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-64"></div>
        <div className="h-4 bg-muted rounded w-48"></div>
        <div className="h-4 bg-muted rounded w-56"></div>
      </div>
    </div>
  );
}