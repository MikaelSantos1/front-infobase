
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'COLLABORATOR'
  token: string

}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
   isLoading: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user) => {
    set({ user, isAuthenticated: true, isLoading: false })
  
    localStorage.setItem('auth:user', JSON.stringify(user))
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false, })
    localStorage.removeItem('auth:user')
  },
}))
