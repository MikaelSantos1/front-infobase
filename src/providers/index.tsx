'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { ReactNode } from 'react'
import { ReactQueryProvider } from './QueryProvider'
import { AuthProvider } from './AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'


export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
          <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AuthProvider
      >
      
        {children}
          <Toaster />
      </AuthProvider>
      </SidebarProvider>
    </ReactQueryProvider>
  )
}