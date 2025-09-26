import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useCurrentUser } from '../api/useCurrentUser'

export const useAuthGuard = (redirectTo: string = '/auth') => {
  const { isAuthenticated, isLoading } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.navigate({ to: redirectTo, replace: true })
    }
  }, [isAuthenticated, isLoading, redirectTo, router])

  return { isAuthenticated, isLoading }
}

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useCurrentUser()

  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading && isAuthenticated,
  }
}