import { useAuthUser, useIsAuthenticated, useAuthLoading } from '../store/auth.store'
import type { AuthUser } from '@mindboard/shared'

export interface UseCurrentUserReturn {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const user = useAuthUser()
  const isAuthenticated = useIsAuthenticated()
  const isLoading = useAuthLoading()

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}