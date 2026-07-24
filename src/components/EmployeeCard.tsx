import { Employee } from '../types'

const statusClasses: Record<Employee['status'], string> = {
  Activo: 'bg-green-50 text-green-600',
  Permiso: 'bg-yellow-50 text-yellow-700',
  Inactivo: 'bg-red-50 text-red-500',
}

interface EmployeeCardProps {
  employee: Employee
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const initial = employee.name.charAt(0).toUpperCase()

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-500">
          {initial}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{employee.name}</p>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
          {employee.department}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${statusClasses[employee.status]}`}
        >
          {employee.status}
        </span>
      </div>
    </div>
  )
}
