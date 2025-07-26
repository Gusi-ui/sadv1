'use client';

const mockUsers = [
  { id: 1, nombre: 'Ana', apellidos: 'García Pérez', email: 'ana.garcia@example.com' },
  { id: 2, nombre: 'Luis', apellidos: 'Martínez López', email: 'luis.martinez@example.com' },
  { id: 3, nombre: 'María', apellidos: 'Sánchez Ruiz', email: 'maria.sanchez@example.com' },
];

export default function UsersPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">Listado de usuarios</h1>
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-background bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-background text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Apellidos</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-background hover:bg-primary/5 transition"
              >
                <td className="px-4 py-3 font-medium text-dark">{user.nombre}</td>
                <td className="px-4 py-3 text-dark">{user.apellidos}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
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
