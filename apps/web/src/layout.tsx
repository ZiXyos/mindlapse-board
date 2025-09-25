import {SidebarProvider, SidebarTrigger} from "@shared/ui/components/ui/sidebar";
import {AppSidebar} from "@shared/ui/components/app.sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}