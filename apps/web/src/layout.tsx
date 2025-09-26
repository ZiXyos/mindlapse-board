import {SidebarInset, SidebarProvider} from "@shared/ui/components/ui/sidebar";
import {AppSidebar} from "./components/nav/app.nav.tsx";
import type React from "react";
import {AppHeader} from "@shared/ui/components/app.header";
import {Toaster} from "@shared/ui/components/ui/toast";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar variant="inset" className="transition-all duration-300 ease-in-out"/>
      <SidebarInset className="transition-all duration-300 ease-in-out">
        <div className="flex flex-1 flex-col min-h-screen">
          <AppHeader />
          <div className="@container/main flex flex-1 flex-col gap-2 p-2 sm:p-4 lg:px-6">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min transition-all duration-200 ease-in-out">
              <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6 animate-in fade-in-50 duration-500">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
