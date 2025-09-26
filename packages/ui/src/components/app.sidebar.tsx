import React from "react";
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarSeparator} from "@shared/ui/components/ui/sidebar";
import {Box, Home, Tag, Truck} from "lucide-react";
import {NavUser} from "@/components/nav.user";
import {AppHeader} from "@/components/app.header";
import {Separator} from "@/components/ui/separator";
import { Link, useLocation } from '@tanstack/react-router';

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

export const AppSidebar = ({ ...props }) => {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon" {...props} className="border-r bg-sidebar transition-all duration-300 ease-in-out">
        <SidebarHeader className="border-b bg-sidebar-header transition-colors duration-200">
          <div className="flex items-center gap-2 px-4 py-3 group">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground transition-transform duration-200 group-hover:scale-110">
              <Box className="size-4 transition-transform duration-200 group-hover:rotate-6" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
              <span className="truncate font-semibold transition-colors duration-200 group-hover:text-primary">MindBoard</span>
              <span className="truncate text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">Admin Panel</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-4 py-2">
            <SidebarGroup className="px-0 space-y-1">
              <SidebarMenu>
                { items.map((item) => {
                  const isActive = location.pathname === item.url || (item.url === '#' && location.pathname === '/')
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={`group hover:bg-accent hover:text-accent-foreground hover:shadow-sm transition-all duration-200 ease-in-out transform hover:translate-x-1 ${
                          isActive ? 'bg-accent text-accent-foreground border-r-2 border-primary shadow-sm translate-x-1' : ''
                        }`}
                      >
                        <Link
                          to={item.url === '#' ? '/' : item.url}
                          className="flex items-center gap-3 w-full px-2 py-1.5 rounded-md"
                        >
                          <item.icon className={`size-4 transition-all duration-200 ${
                            isActive ? 'text-primary' : 'group-hover:text-primary group-hover:scale-110'
                          }`} />
                          <span className="font-medium transition-colors duration-200">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.title === 'Products' && (
                        <SidebarMenuBadge className="bg-primary text-primary-foreground animate-pulse hover:animate-none transition-transform duration-200 hover:scale-105">
                          2
                        </SidebarMenuBadge>
                      )}
                      {item.title === 'Orders' && (
                        <SidebarMenuBadge className="bg-destructive text-destructive-foreground animate-pulse hover:animate-none transition-transform duration-200 hover:scale-105">
                          24
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                }) }
              </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-2 bg-sidebar-footer transition-colors duration-200">
          <div className="transition-transform duration-200 hover:scale-[1.02]">
            <NavUser user={ {name: "admin", email: "admin@mindboard.local", avatar: "" }}></NavUser>
          </div>
        </SidebarFooter>
    </Sidebar>
  )
}
