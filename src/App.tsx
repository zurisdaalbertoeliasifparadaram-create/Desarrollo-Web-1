import { employees } from './data/mockData'
import StatsBadge from './components/StatsBadge'
import EmployeeCard from './components/EmployeeCard'

function App() {
  const total = employees.length
  const activos = employees.filter((e) => e.status === 'Activo').length
  const enPermiso = employees.filter((e) => e.status === 'Permiso').length
  const inactivos = employees.filter((e) => e.status === 'Inactivo').length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">👥 Mini RRHH</h1>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Empleados ({total})
        </h2>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatsBadge label="Total de empleados" value={total} color="blue" />
          <StatsBadge label="Empleados activos" value={activos} color="green" />
          <StatsBadge label="Empleados en permiso" value={enPermiso} color="yellow" />
          <StatsBadge label="Empleados inactivos" value={inactivos} color="red" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
