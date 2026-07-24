export type Department =
  | 'Tecnología'
  | 'Recursos Humanos'
  | 'Finanzas'
  | 'Operaciones'
  | 'Ventas'

export type EmployeeStatus = 'Activo' | 'Permiso' | 'Inactivo'

export type EmployeeRole = 'Administrador' | 'Gerente' | 'Empleado'

export interface Employee {
  id: number
  name: string
  position: string
  department: Department
  status: EmployeeStatus
  role: EmployeeRole
  email: string
  hireDate: string // formato ISO: 'YYYY-MM-DD'
}
