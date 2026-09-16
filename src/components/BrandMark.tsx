import Link from "next/link";

export function BrandMark({
  collapsed = false,
  title,
  subtitle,
}: {
  collapsed?: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={subtitle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo.svg"
        alt=""
        width={collapsed ? 36 : 48}
        height={collapsed ? 36 : 48}
        className="shrink-0 drop-shadow-sm transition-[width,height] duration-300"
      />
      <span className="leading-tight">
        <span className={`block font-display font-semibold tracking-tight text-ink ${collapsed ? "text-sm" : "text-base"}`}>
          {title}
        </span>
        {!collapsed ? (
          <span className="hidden max-w-[220px] text-[11px] font-medium text-muted sm:block">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
