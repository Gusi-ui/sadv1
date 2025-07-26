import Link from 'next/link';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-primary font-extrabold text-2xl tracking-tight drop-shadow-sm">
            SAD
          </span>
        </div>
        <Link
          href="/login"
          className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <span className="font-bold">Acceso</span>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 gap-8 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] h-[40vw] bg-gradient-to-tr from-primary/20 via-accent/10 to-background rounded-b-full blur-2xl opacity-80" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark leading-tight mb-2 drop-shadow-md">
            Soluciones SAD <span className="text-primary">modernas</span> y{' '}
            <span className="text-accent">humanas</span>
          </h1>
        </div>
        <p className="text-gray text-lg sm:text-xl max-w-xl mx-auto mb-4 font-medium">
          Atención domiciliaria de calidad, cercana y profesional. Descubre cómo podemos ayudarte a
          mejorar la vida en el hogar.
        </p>
        <Link
          href="/login"
          className="inline-block bg-primary hover:bg-accent text-white px-10 py-3 rounded-full font-bold text-lg shadow-xl transition-all duration-200 animate-bounce focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="font-bold">Acceder al área privada</span>
        </Link>
      </main>

      {/* Features */}
      <section className="py-10 px-4 flex flex-col gap-8 sm:gap-12 bg-gradient-to-t from-white via-background to-accent/10 rounded-t-3xl shadow-inner">
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-6 border border-background hover:scale-105 transition-transform duration-200">
            <span className="inline-block bg-accent/20 text-accent rounded-full p-4 mb-3 animate-pulse">
              <svg
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 20l9-5-9-5-9 5 9 5z" />
                <path d="M12 12V4" />
              </svg>
            </span>
            <h3 className="font-bold text-dark text-lg mb-1">Atención personalizada</h3>
            <p className="text-gray text-base">Soluciones adaptadas a cada persona y familia.</p>
          </div>
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-6 border border-background hover:scale-105 transition-transform duration-200">
            <span className="inline-block bg-primary/20 text-primary rounded-full p-4 mb-3 animate-pulse">
              <svg
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </span>
            <h3 className="font-bold text-dark text-lg mb-1">Profesionalidad</h3>
            <p className="text-gray text-base">Equipo acreditado y con experiencia en el sector.</p>
          </div>
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-6 border border-background hover:scale-105 transition-transform duration-200">
            <span className="inline-block bg-accent/20 text-accent rounded-full p-4 mb-3 animate-pulse">
              <svg
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            <h3 className="font-bold text-dark text-lg mb-1">Tecnología y cercanía</h3>
            <p className="text-gray text-base">
              Seguimiento y comunicación directa, siempre disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray py-6 bg-gradient-to-t from-background to-white/80 mt-auto">
        <div className="mb-2 font-semibold text-primary">
          ¿Tienes dudas?{' '}
          <a href="mailto:info@tuempresa.com" className="underline hover:text-accent">
            Contáctanos
          </a>
        </div>
        © {new Date().getFullYear()} SAD. Todos los derechos reservados.
      </footer>
    </div>
  );
}
