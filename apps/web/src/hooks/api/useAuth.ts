import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginCredentials, AuthResponse } from "@mindboard/shared"
import { useAuthStore } from "../store/auth.store"
import { Client } from "@mindboard/sdk"

const client = new Client(
  import.meta.env.VITE_API_URL || 'http://localhost:3333'
)

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { login: setAuthUser, logout: clearAuthUser, setLoading } = useAuthStore()

  const loginMutation = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await client.auth.login(credentials)
      if (!response.success) {
        throw new Error(response.message || 'Login failed')
      }
      return response.data
    },
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      if (data?.user) {
        setAuthUser(data.user)
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      }
      setLoading(false)
    },
    onError: (error: Error) => {
      console.error('Login failed:', error)
      setLoading(false)
    }
  })

  const logoutMutation = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: async () => {
      const response = await client.auth.logout()
      if (!response.success) {
        throw new Error(response.message || 'Logout failed')
      }
      return response.data
    },
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: () => {
      clearAuthUser()
      queryClient.clear()
      setLoading(false)
    },
    onError: (error: Error) => {
      console.error('Logout failed:', error)
      clearAuthUser()
      setLoading(false)
    }
  })

  const authStatusQuery = useQuery({
    queryKey: ['auth', 'status'],
    queryFn: async () => {
      // This would require a /auth/me endpoint on your backend
      // For now, we'll rely on the persisted Zustand state
      return null
    },
    enabled: false,
  })

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    authStatus: authStatusQuery,
  }
}
