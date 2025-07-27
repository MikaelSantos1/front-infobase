'use client'

import { DialogDeleteUser } from "@/components/pageComponents/dialog-disable-user";
import { DialogUserForm } from "@/components/pageComponents/dialogo-new-user";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ROLES } from "@/constants/roles";
import { useUsers } from "@/hooks/useUsers";
import { useAuthStore } from "@/store/auth-store";




const roleColors = {
  ADMIN: "bg-red-100 text-red-800",

  COLLABORATOR: "bg-gray-100 text-gray-800",
  MANAGER: "bg-green-100 text-green-800",
}
export default function Page() {

  const { user: currentUser } = useAuthStore()
  const { data } = useUsers(currentUser?.id)
  return (
    <div>

      <Card>
        <CardHeader>
          <div className="flex flex-1 justify-between">
            <CardTitle>Lista de Usuários</CardTitle>
            {
              currentUser?.role === 'ADMIN' && <DialogUserForm />
            }

          </div>
          <CardDescription>Gerencie todos os usuários do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">

                    <span className="font-medium">{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>{ROLES[user.role]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_active ? "default" : "secondary"} >
                      {user.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    {
                      currentUser?.role === 'ADMIN' && <DialogUserForm userToEdit={user} />
                    }

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}