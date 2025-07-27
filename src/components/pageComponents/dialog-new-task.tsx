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


import { Plus } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { createTask } from "@/services/task"

interface Task {

    projectId: string;
    status: 'IN_PROGRESS' | 'COMPLETED';
    title: string;
}
interface Props {
   projectId:string
}

const createTaskSchema = z.object({
    title: z.string().min(1, "O nome é obrigatório"),
})

type CreateTaskInput = z.infer<typeof createTaskSchema>


export function DialogNewTask({ projectId }: Props) {
    const { user } = useAuthStore()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
    })




    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['useProjects'] })

        },
    })



    const onSubmit = async (data: CreateTaskInput) => {
        const payload: Task = {
            ...data,
            projectId: projectId,
            status: 'IN_PROGRESS',
        }
        await mutation.mutateAsync(payload)

        setOpen(false)
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            Nova tarefa
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 mt-8">
                        <Input
                            {...register("title")}
                            placeholder="Descrição da tarefa"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title.message}
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
