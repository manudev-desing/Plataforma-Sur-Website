'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/historia' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Productos', href: '/productos' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    // Set initial state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20 px-6">
          <Link
            href="/"
            className={`font-outfit-bold tracking-wide text-sm transition-colors duration-500 ${
              isScrolled ? 'text-midnight-green' : 'text-white'
            }`}
          >
            PLATAFORMA SUR
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item, index) => {
              const isLast = index === navItems.length - 1
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-outfit-regular text-sm transition-colors duration-500 ${
                    isLast
                      ? `px-5 py-2 border rounded-full ${
                          isScrolled
                            ? 'border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-white'
                            : 'border-white text-white hover:bg-white hover:text-midnight-green'
                        }`
                      : `${isScrolled ? 'text-midnight-green hover:text-emerald' : 'text-white hover:text-white/80'}`
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-500 ${
              isScrolled ? 'text-midnight-green' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-midnight-green transition-transform duration-500 flex flex-col ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-2xl font-outfit-regular hover:text-emerald transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
