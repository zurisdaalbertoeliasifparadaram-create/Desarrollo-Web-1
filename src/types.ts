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

export interface User {
  id: number
  name: string
  email: string
  role: EmployeeRole
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// DTOs usados por employeeStore, employeeService y los hooks de React Query
export type CreateEmployeeDto = Omit<Employee, 'id'>
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
