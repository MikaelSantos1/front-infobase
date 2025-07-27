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


import { Trash } from "lucide-react"
import { disableUser } from "@/services/users"




interface DialogUserFormProps {
    userId: string
}

export function DialogDeleteUser({ userId }: DialogUserFormProps) {

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: disableUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['useUsers'] })

        },
    })



    const handleDelete = async ({ userId }: DialogUserFormProps) => {
        await mutation.mutateAsync({ userId })
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
                       Inativar usuário
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2 mt-8">
                    <p>Tem certeza que deseja inativar esse usuário?</p>
                </div>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button disabled={mutation.isPending} onClick={() => handleDelete({ userId })}>
                        {mutation.isPending ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
