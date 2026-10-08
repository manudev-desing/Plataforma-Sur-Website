import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        Error 404
      </span>
      <h1 className="mt-4 font-outfit text-4xl font-extrabold text-foreground md:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        La sección a la que intentas acceder no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald/90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
