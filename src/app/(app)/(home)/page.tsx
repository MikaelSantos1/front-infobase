'use client'

import { DialogNewProject } from "@/components/shared/dialog-new-project";
import { ProjectCard } from "@/components/shared/project-card";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";

export default function Page() {
  const { data, isLoading } = useProjects();

  return (
    <div className="mb-8 p-4 w-full">
      <div className="flex w-full justify-between items-center mb-4">
         <h1 className="text-4xl font-bold text-foreground mb-2">Projetos</h1>
       <DialogNewProject/>
      </div>
     
      <p className="text-muted-foreground text-lg">Gerencie seus projetos e acompanhe o progresso das tarefas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          isLoading ? [1, 2, 3, 4, 5, 6].map((_, index) => (
            <SkeletonCard key={index} />
          )) : data?.projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        }

      </div>
    </div>
  );
}
