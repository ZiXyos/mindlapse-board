import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from '@tanstack/react-router';

const getPageTitle = (pathname: string) => {
  const routes: Record<string, string> = {
    '/': 'Dashboard',
    '/products': 'Products',
    '/categories': 'Categories',
    '/orders': 'Orders'
  }
  return routes[pathname] || 'Dashboard'
}

export const AppHeader = () => {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-all duration-300 ease-in-out group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) backdrop-blur-sm">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-4">
        <SidebarTrigger className="-ml-1 hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 rounded-md" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 transition-opacity duration-200"
        />
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-foreground transition-all duration-200 text-lg font-medium hover:scale-105 transform">
                    <Link to="/" className="flex items-center gap-1">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="transition-opacity duration-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-xl font-semibold text-foreground transition-colors duration-200 animate-in fade-in-50 slide-in-from-right-1">
                    {pageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="hidden md:flex items-center gap-2">
          </div>
        </div>
      </div>
    </header>
  )
}
