import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap py-20">
      <div className="glass rounded-[28px] p-8">
        <p className="chrome-label">AECTM</p>
        <h1 className="font-display mt-2 text-3xl font-semibold">404</h1>
        <p className="mt-2 text-sm text-muted">
          Página não encontrada / Page not found
        </p>
        <Link href="/" className="btn-3d btn-primary mt-6 inline-flex">
          Início
        </Link>
      </div>
    </div>
  );
}
