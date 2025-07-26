'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="40"
    height="40"
    className="inline-block align-middle"
  >
    <defs>
      <linearGradient id="homeLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#homeLogoGradient)" />
    <path
      d="M32 50C32 50 12 36.36 12 24.5C12 17.6 17.6 12 24.5 12C28.09 12 31.36 13.94 32 16.35C32.64 13.94 35.91 12 39.5 12C46.4 12 52 17.6 52 24.5C52 36.36 32 50 32 50Z"
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const menuItems = [
  { label: 'Usuarios', href: '/dashboard/users' },
  { label: 'Trabajadoras', href: '/dashboard/trabajadoras' },
  { label: 'Asignaciones', href: '/dashboard/asignaciones' },
  { label: 'Planning', href: '/dashboard/planning' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Elimina el token y redirige al login
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="focus:outline-none">
            <Logo />
          </Link>
          <span className="text-primary font-extrabold text-xl tracking-tight drop-shadow-sm">
            SAD Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="ml-2 bg-error-500 hover:bg-error-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-error-400"
          >
            Cerrar sesión
          </button>
        </div>
        {/* Menú lateral en desktop */}
        <nav className="hidden sm:flex gap-4 ml-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-dark hover:text-primary font-medium px-2 py-1 rounded transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {/* Menú lateral mobile */}
      {menuOpen && (
        <nav className="sm:hidden bg-white border-b border-background shadow-md px-4 py-2 flex flex-col gap-2 animate-fade-in-down">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-dark hover:text-primary font-medium px-2 py-2 rounded transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
      {/* Contenido principal */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 py-8 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
}
