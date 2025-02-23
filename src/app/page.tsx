"use client";

import { TextSkeleton } from "@/components/custom/text-skeleton";
import { Button } from "@/components/ui/button";
import { useText } from "@/hooks/useText";

export default function Home() {
  const { text, loading } = useText();

  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen p-8 bg-background">
      {loading ? (
        <TextSkeleton />
      ) : (
        <div>
          <h1 className="text-md">{text}</h1>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 max-w-md w-full mt-4">
        <Button variant="outline" className="mt-4">
          Random shit go! 🤯
        </Button>
      </div>
    </main>
  );
}
