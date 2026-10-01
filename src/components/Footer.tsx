'use client'

import Link from 'next/link'

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/historia' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Productos', href: '/productos' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-midnight-green py-16 md:py-20">
      <div className="container-custom px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-0 mb-16">
          <div>
            <h2 className="text-white font-outfit-bold text-2xl mb-2">Plataforma Sur</h2>
            <p className="text-gray-400 text-sm font-outfit-regular">
              Conectando América Latina con los mercados globales.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white text-sm font-outfit-regular transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-outfit-regular">
            © {new Date().getFullYear()} Plataforma Sur
          </p>
          <p className="text-gray-500 text-xs font-outfit-regular">
            Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
