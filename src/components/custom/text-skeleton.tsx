import { Skeleton } from "@/components/ui/skeleton";

export function TextSkeleton() {
  return (
    <>
      <div className="flex items-center justify-start mb-5 max-w-md w-full">
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="space-y-2 max-w-md w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </>
  );
}
