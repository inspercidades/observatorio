export function CardSkeleton() {
  return (
    <div className="bg-background-2 p-6">
      {/* Title */}
      <div className="h-7 bg-foreground/10 w-full mb-3 animate-pulse" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-5 bg-foreground/10 w-full animate-pulse" />
        <div className="h-5 bg-foreground/10 w-full animate-pulse" />
        <div className="h-5 bg-foreground/10 w-3/4 animate-pulse" />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <div className="h-7 bg-foreground/6 w-28 animate-pulse" />
          <div className="h-7 bg-foreground/6 w-20 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-7 bg-foreground/6 w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
