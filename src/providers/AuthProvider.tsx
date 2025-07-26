
'use client'

import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function AuthProvider({ children }: { children: ReactNode }) {
  const login = useAuthStore((s) => s.login)

  useEffect(() => {

    const stored = localStorage.getItem('auth:user')

    if (stored) {
      try {
       
        const user = JSON.parse(stored)
        
        login(user)
      } catch (err) {
        console.error('Erro ao recuperar auth do localStorage', err)
      }
    }
  }, [])

  return <>{children}</>
}
