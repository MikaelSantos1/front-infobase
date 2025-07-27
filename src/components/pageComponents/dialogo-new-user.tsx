"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { RoleSelect } from "./role-select"
import { UserStatusSelect } from "./status-select"
import { createUser, updateUser } from "@/services/users"

const userSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido"),
})

type UserFormInput = z.infer<typeof userSchema>

interface DialogUserFormProps {
    userToEdit?: {
        id: string
        name: string
        email: string
        role: "COLLABORATOR" | "ADMIN" | "MANAGER"
        is_active: boolean
    }
}

export function DialogUserForm({ userToEdit }: DialogUserFormProps) {
    const [open, setOpen] = useState(false)
    const [role, setRole] = useState<"COLLABORATOR" | "ADMIN" | "MANAGER">("COLLABORATOR")
    const [status, setStatus] = useState("1")

    const isEditMode = !!userToEdit

    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormInput>({
        resolver: zodResolver(userSchema),
    })

    const createMutation = useMutation({ mutationFn: createUser })
    const updateMutation = useMutation({ mutationFn: updateUser })

    useEffect(() => {

        if (userToEdit) {
            reset({
                name: userToEdit.name,
                email: userToEdit.email,
            })

        } else {
            reset({ name: "", email: "" })

        }

    }, [userToEdit, reset,])

    const onSubmit = async (data: UserFormInput) => {
        const payload = {
            ...data,
            role,
            is_active: status === "1",
        }

        try {
            if (isEditMode && userToEdit?.id) {
                await updateMutation.mutateAsync(payload)
            } else {
                await createMutation.mutateAsync(payload)
            }

            queryClient.invalidateQueries({ queryKey: ['useUsers'] })
            setOpen(false)
        } catch (err) {
            console.error("Erro ao salvar:", err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={isEditMode ? "ghost" : "outline"} size="sm" className="h-8 px-2">
                    {isEditMode ? "Editar" : "Criar novo usuário"}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? "Editar usuário" : "Novo usuário"}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 mt-8">
                        <Input
                            {...register("name")}
                            placeholder="Nome"
                            error={errors.name?.message}
                        />
                        <Input
                            {...register("email")}
                            placeholder="Email"
                            error={errors.email?.message}
                        />
                        <RoleSelect value={role} onChange={setRole} />
                        <UserStatusSelect value={status} onChange={setStatus} />
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
