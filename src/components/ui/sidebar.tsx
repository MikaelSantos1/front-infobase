"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
    Home,
    User,
    Settings,
   
    LogOut,

} from "lucide-react"

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-background border-r border-border p-4 flex flex-col">
          
            <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Menu</h2>
                <p className="text-sm text-muted-foreground">Navegação principal</p>
            </div>
            <nav className="flex-1 space-y-4">
                <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                </Button>

                <Button variant="ghost" className="w-full justify-start gap-3 h-12" >
                    <User className="h-5 w-5" />
                    <span>Perfil</span>
                </Button>

                <Button variant="ghost" className="w-full justify-start gap-3 h-12" >
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                </Button>
            </nav>
            <div className="space-y-2 pt-4 border-t border-border">


                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"

                >
                    <LogOut className="h-5 w-5" />
                    <span>Sair</span>
                </Button>
            </div>
        </aside>
    )
}
