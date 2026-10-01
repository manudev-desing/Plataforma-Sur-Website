"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-midnight-green/10 py-10 md:py-12">
      <div className="container-custom flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          href="/"
          className="text-midnight-green font-outfit-bold text-sm"
        >
          Plataforma Sur
        </Link>
        <p className="text-midnight-green/30 text-xs font-outfit-regular">
          © {new Date().getFullYear()} — Buenos Aires, Argentina
        </p>
      </div>
    </footer>
  );
}
