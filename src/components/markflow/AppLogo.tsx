import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
        MF
      </div>
      <h1 className="font-headline text-lg font-semibold text-foreground">
        MarkFlow
      </h1>
    </div>
  );
}
