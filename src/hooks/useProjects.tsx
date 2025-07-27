

import { fetchProjects } from "@/services/project";
import { useQuery, } from "@tanstack/react-query";
export interface TaskDTO {
  id: string;
  title: string;
  status: 'IN_PROGRESS' | 'COMPLETED'; 
  created_at: string;
  updated_at: string;
  projectId: string;
}

export interface ProjectDTO {
projects:{
      id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tasks: TaskDTO[];
}[]
}


export function useProjects() {
    return useQuery<ProjectDTO, Error>({
        queryKey: ['useProjects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 10
    })
}