export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2 animate-pulse">
        <div className="space-y-3">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="h-3 w-40 bg-muted rounded" />
          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
          </div>
        </div>
        <div className="h-72 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
