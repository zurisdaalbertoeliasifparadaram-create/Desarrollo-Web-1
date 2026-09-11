// src/pages/EmployeeDetailPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployees';

const statusLabels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  on_leave: 'En permiso',
};

const roleLabels: Record<string, string> = {
  employee: 'Empleado',
  hr: 'Recursos Humanos',
  admin: 'Administrador',
};

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  on_leave: 'bg-yellow-100 text-yellow-800',
};

function formatSalary(salary: number) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    maximumFractionDigits: 0,
  }).format(salary);
}

function formatDate(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat('es-GT', { dateStyle: 'long' }).format(date);
}

function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? Number(id) : null;

  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/empleados')}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium
                   text-brand-800 hover:text-brand-700 transition-colors"
      >
        ← Volver
      </button>

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
          <span>Cargando empleado...</span>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">Error al cargar el empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'Error desconocido'}
          </p>
        </div>
      )}

      {!isLoading && !isError && employee && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center
                            justify-center overflow-hidden text-blue-700
                            font-semibold text-2xl flex-shrink-0">
              {employee.avatarUrl
                ? <img src={employee.avatarUrl} alt={`Avatar de ${employee.name}`} className="w-full h-full object-cover" />
                : employee.name.charAt(0).toUpperCase()
              }
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
              <p className="text-slate-500">{employee.position}</p>
            </div>
            <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[employee.status]}`}>
              {statusLabels[employee.status]}
            </span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Email</dt>
              <dd className="text-slate-900 mt-1">{employee.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Departamento</dt>
              <dd className="text-slate-900 mt-1">{employee.department}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Salario mensual</dt>
              <dd className="text-slate-900 mt-1">{formatSalary(employee.salary)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Fecha de ingreso</dt>
              <dd className="text-slate-900 mt-1">{formatDate(employee.hireDate)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Rol</dt>
              <dd className="text-slate-900 mt-1">{roleLabels[employee.role]}</dd>
            </div>
            {employee.phone && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Teléfono</dt>
                <dd className="text-slate-900 mt-1">{employee.phone}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetailPage;
