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
import { useState } from "react"
import { createProject, updateProject } from "@/services/project"
import { is } from "zod/v4/locales"
import { Pencil } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"


const createProjectSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
})

type CreateProjectInput = z.infer<typeof createProjectSchema>

interface DialogProjectFormProps {
    initialData?: {
        id: string
        projectName: string
    }
}

export function DialogNewProject({ initialData }: DialogProjectFormProps) {
    const { user } = useAuthStore()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
    })

    const isEdit = !!initialData


    const mutationCreate = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['useProjects'] })

        },
    })
    const mutationUpdate = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['useProjects'] })
            setOpen(false)
            reset()
        },
    })


    const onSubmit = async (data: CreateProjectInput) => {
        if (isEdit && initialData?.id) {
            await mutationUpdate.mutateAsync({ id: initialData.id, name: data.name })
        } else {
            await mutationCreate.mutateAsync(data)
        }

        setOpen(false)
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit && user?.role!=='COLABORATOR'? (<div className="flex flex-1 align-items-end justify-end px-4">
                    <Pencil size={14} />
                </div>) : <Button>Criar novo projeto</Button>}
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Editar projeto" : "Criar novo projeto"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 mt-8">
                        <Input
                            {...register("name")}
                            placeholder="Nome do projeto"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
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
