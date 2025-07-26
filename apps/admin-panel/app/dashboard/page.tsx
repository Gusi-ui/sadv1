'use client';

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-2">
        ¡Bienvenido/a al panel administrativo!
      </h1>
      <p className="text-gray-500 mb-4 max-w-xl">
        Gestiona usuarios, consulta reportes y configura la plataforma desde un solo lugar. Todo
        adaptado a dispositivos móviles y con la nueva imagen de marca.
      </p>
      {/* Cards/resúmenes de ejemplo */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-background flex flex-col gap-2">
          <span className="text-primary text-3xl font-bold">128</span>
          <span className="text-gray-500">Usuarios activos</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-background flex flex-col gap-2">
          <span className="text-accent text-3xl font-bold">5</span>
          <span className="text-gray-500">Reportes nuevos</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-background flex flex-col gap-2">
          <span className="text-dark text-3xl font-bold">3</span>
          <span className="text-gray-500">Solicitudes pendientes</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-background flex flex-col gap-2">
          <span className="text-primary text-3xl font-bold">98%</span>
          <span className="text-gray-500">Satisfacción</span>
        </div>
      </section>
    </>
  );
}
