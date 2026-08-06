import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "crimson";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "crimson"
          ? "border border-crimson-700/50 bg-crimson-900/30 text-crimson-400"
          : "border border-white/10 bg-white/5 text-white/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
