import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from "@shared/ui/components/ui/sidebar";
import { AppSidebar } from "../components/nav/app.nav.tsx";
import { AppHeader } from "@shared/ui/components/app.header";
import { Toaster } from "@shared/ui/components/ui/toast";
import { useCurrentUser } from "../hooks/api/useCurrentUser.ts";
import { useEffect } from "react";

function AuthenticatedLayout() {
  const { isAuthenticated, isLoading } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate({ to: '/auth' })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar variant="inset" className="transition-all duration-300 ease-in-out"/>
      <SidebarInset className="transition-all duration-300 ease-in-out">
        <div className="flex flex-1 flex-col min-h-screen">
          <AppHeader />
          <div className="@container/main flex flex-1 flex-col gap-2 p-2 sm:p-4 lg:px-6">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min transition-all duration-200 ease-in-out">
              <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6 animate-in fade-in-50 duration-500">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})