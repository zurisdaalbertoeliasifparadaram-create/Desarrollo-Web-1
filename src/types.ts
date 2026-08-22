export type Department =
  | 'Tecnología'
  | 'Recursos Humanos'
  | 'Finanzas'
  | 'Operaciones'
  | 'Ventas'

export type EmployeeStatus = 'active' | 'inactive' | 'on_leave'

export type EmployeeRole = 'employee' | 'hr' | 'admin'

export interface Employee {
  id: number
  name: string
  email: string
  position: string
  department: Department
  salary: number
  hireDate: string // formato ISO: 'YYYY-MM-DD'
  status: EmployeeStatus
  role: EmployeeRole
  phone?: string
  avatarUrl?: string
}
