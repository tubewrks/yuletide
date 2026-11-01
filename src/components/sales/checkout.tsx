export const CHECKOUT_URL = "https://twpub.gumroad.com/l/christmasplanner";

export const PRICE = "$12.99";

export function PrimaryCta({
  label = `Get the planner — ${PRICE}`,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-berry/30 transition-all hover:-translate-y-0.5 hover:bg-berry-deep hover:shadow-xl hover:shadow-berry/40 ${className}`}
    >
      {label}
    </a>
  );
}

export function SoftCta({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center font-body text-sm font-semibold tracking-wide underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-gold-deep ${className}`}
    >
      {label}
    </a>
  );
}
