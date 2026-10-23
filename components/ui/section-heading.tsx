import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center flex flex-col items-center",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 dark:bg-navy-dark dark:border-slate-800 px-3.5 py-1 text-xs font-medium tracking-wide text-navy/90 dark:text-cream/90 shadow-2xs select-none w-fit mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-[-0.025em] leading-[1.22] text-navy dark:text-cream">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate dark:text-slate-light font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
