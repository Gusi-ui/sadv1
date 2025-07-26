'use client';

const mockTrabajadoras = [
  {
    id: 1,
    nombre: 'Carmen',
    apellidos: 'López Díaz',
    email: 'carmen.lopez@example.com',
    telefono: '612345678',
  },
  {
    id: 2,
    nombre: 'Sofía',
    apellidos: 'Martín Torres',
    email: 'sofia.martin@example.com',
    telefono: '698765432',
  },
  {
    id: 3,
    nombre: 'Lucía',
    apellidos: 'Gómez Pérez',
    email: 'lucia.gomez@example.com',
    telefono: '677889900',
  },
];

export default function TrabajadorasPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">
        Listado de trabajadoras
      </h1>
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-background bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-background text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Apellidos</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockTrabajadoras.map((trabajadora) => (
              <tr
                key={trabajadora.id}
                className="border-t border-background hover:bg-accent/5 transition"
              >
                <td className="px-4 py-3 font-medium text-dark">{trabajadora.nombre}</td>
                <td className="px-4 py-3 text-dark">{trabajadora.apellidos}</td>
                <td className="px-4 py-3 text-gray-600">{trabajadora.email}</td>
                <td className="px-4 py-3 text-gray-600">{trabajadora.telefono}</td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button className="bg-accent hover:bg-primary text-white px-3 py-1 rounded-lg text-xs font-semibold transition">
                    Editar
                  </button>
                  <button className="bg-error-500 hover:bg-error-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
