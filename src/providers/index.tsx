'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { ReactNode } from 'react'
import { ReactQueryProvider } from './QueryProvider'
import { AuthProvider } from './AuthProvider'


export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider
      
      >
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  )
}