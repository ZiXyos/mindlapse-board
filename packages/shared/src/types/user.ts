import type { BaseEntity, UserRole } from './common'
import { Identifer } from './identifier'

export interface User extends BaseEntity {
  email: string
  fullName: string | null
  role: UserRole
}

export interface CreateUserPayload {
  email: string
  password: string
  fullName?: string | null
  role?: UserRole
}

export interface UpdateUserPayload {
  email?: string
  fullName?: string | null
  role?: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: Identifer
  email: string
  fullName: string | null
  role: UserRole
}

export interface AuthResponse {
  user: AuthUser
  token?: string
}
