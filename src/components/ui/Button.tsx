import { cn } from "@/lib/utils";

type Variant = "solid" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-medium transition-colors duration-300";

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg hover:bg-fg/85",
  outline: "border border-fg/25 text-fg hover:border-fg",
};

/** Anchor styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "solid",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
