'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Logo reutilizado de la home
const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="56"
    height="56"
    className="mx-auto mb-4"
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Credenciales incorrectas');
      }
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error de autenticación');
      } else {
        setError('Error de autenticación');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 border border-background shadow-xl rounded-2xl w-full max-w-sm flex flex-col gap-5 p-8 backdrop-blur-md"
      >
        <Logo />
        <h1 className="text-2xl font-extrabold text-dark text-center mb-2 tracking-tight drop-shadow-sm">
          Acceso al área privada
        </h1>
        <p className="text-gray-500 text-center text-sm mb-2">
          Introduce tus credenciales para acceder al panel de administración.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 p-3 rounded-lg outline-none transition placeholder-gray-400 text-dark bg-background"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 p-3 rounded-lg outline-none transition placeholder-gray-400 text-dark bg-background"
          required
        />
        {error && <div className="text-error-500 text-sm text-center font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-primary hover:bg-accent text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 w-full"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
