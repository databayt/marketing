export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm animate-pulse space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-32 bg-muted rounded" />
          <div className="mx-auto h-4 w-48 bg-muted rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-11 bg-muted rounded" />
          <div className="h-11 bg-muted rounded" />
          <div className="h-11 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
