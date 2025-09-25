import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem} from "@shared/ui/components/ui/sidebar";
import {Box, Home, Tag, Truck} from "lucide-react";
import {NavUser} from "@/components/nav.user";

type SideBarItemProps = {
    title: string,
    url: string,
    icon: any
}

const items: Array<SideBarItemProps> = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
    {
        title: 'Products',
        url: '/products/',
        icon: Box
    },
    {
        title: 'Categories',
        url: '/categories',
        icon: Tag
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: Truck
    }
]

export const AppSidebar = () => (
    <Sidebar>
        <SidebarHeader/>
        <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                { items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.title === 'Products' && <SidebarMenuBadge>2</SidebarMenuBadge>}
                  {item.title === 'Orders' && <SidebarMenuBadge>24</SidebarMenuBadge>}
                  </SidebarMenuItem>
                )) }
              </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={ {name: "admin", email: "admin@mindboard.local", avatar: "" }}></NavUser>
        </SidebarFooter>
    </Sidebar>
)
