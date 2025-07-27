


import { fetchUsers } from "@/services/users";
import { useQuery, } from "@tanstack/react-query";

export interface UserDTO {
    users: {
        id: string;
        email: string;
        role: "ADMIN" | "COLLABORATOR" | "MANAGER"
        created_at: string;
        is_active:boolean;
        name:string
    }[]
}


export function useUsers(userId:string | undefined) {
    return useQuery<UserDTO, Error>({
        queryKey: ['useUsers',userId],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 10
    })
}