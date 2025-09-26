import React from 'react'
import { Navigate } from '@tanstack/react-router'
import { useCurrentUser } from '../../hooks/api/useCurrentUser'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback = null, 
  redirectTo = '/auth' 
}) => {
  const { isAuthenticated, isLoading } = useCurrentUser()

  if (isLoading) {
    return fallback || <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

interface RequireAuthProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useCurrentUser()

  if (isLoading) {
    return fallback || <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return fallback || <div>Please log in to access this content.</div>
  }

  return <>{children}</>
}