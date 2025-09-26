import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/components/ui/card";
import { LoginForm } from "../components/auth/auth.form.tsx";
import { useCurrentUser } from "../hooks/api/useCurrentUser";

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className={'w-full max-w-sm shadow-xl border-0 bg-white/80 backdrop-blur-sm'}>
        <CardHeader>
          <CardTitle>Welcome to mindboard admin panel</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
