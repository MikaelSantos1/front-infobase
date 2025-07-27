"use client"
import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: any
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
         <SidebarMenu>
          {items.map((item) => (
             <Link href={item.url} key={item.title}>
            <SidebarMenuItem >
              <SidebarMenuButton tooltip={item.title}>
              
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              
              </SidebarMenuButton>
            </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}