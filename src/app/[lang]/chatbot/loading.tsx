export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <div className="h-5 w-5 bg-muted rounded animate-pulse" />
        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4 animate-pulse">
          <div className="h-4 w-2/3 mx-auto bg-muted rounded" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
