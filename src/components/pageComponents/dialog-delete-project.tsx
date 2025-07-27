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



import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteProject, } from "@/services/project"

import { Trash } from "lucide-react"




interface DialogProjectFormProps {
    projectId: string
}

export function DialogDeleteProject({ projectId }: DialogProjectFormProps) {

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['useProjects'] })

        },
    })



    const handleDelete = async ({ projectId }: DialogProjectFormProps) => {
        await mutation.mutateAsync({ id: projectId })
        setOpen(false)

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <Trash  size={16} color="red "/>
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Excluir projeto
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2 mt-8">
                    <p>Tem certeza que deseja excluir o projeto?</p>
                </div>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button disabled={mutation.isPending} onClick={() => handleDelete({ projectId })}>
                        {mutation.isPending ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
