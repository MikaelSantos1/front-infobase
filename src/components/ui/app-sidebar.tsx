"use client"

import * as React from "react"




import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav"
import { Home, LogOut } from "lucide-react"
import { Button } from "./button"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const items = [
        { title: 'Home', url: '/', icon: Home },
        { title: 'Usuarios', url: '/usuarios', icon: Home },

    ]
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavSecondary items={items} />

            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"

                >
                    <LogOut className="h-5 w-5" />
                    <span>Sair</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
