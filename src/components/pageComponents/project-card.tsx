'use client';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import { useAuthStore } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeTaskStatus } from '@/services/task';
import { DialogNewProject } from './dialog-new-project';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogNewTask } from './dialog-new-task';
import { DialogDeleteProject } from './dialog-delete-project';

type TaskStatus =  'IN_PROGRESS' | 'COMPLETED';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  projectId: string;
}

interface Project {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tasks: Task[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { user } = useAuthStore();
  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: Task) => changeTaskStatus(data.id, data.status),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['useProjects'] });
    },
  });

  const toggleTask = (task: Task) => {
    const newStatus = task.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    mutate({ ...task, status: newStatus });
  };

  const completedTasks = project.tasks.filter((task) => task.status === 'COMPLETED').length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="w-full">
      {
        user?.role !== "COLLABORATOR" &&
        <div className='flex w-full px-4' data-testid="project-admin-actions">
          <DialogNewProject initialData={{ id: project.id, projectName: project.name }} />
          <DialogDeleteProject projectId={project.id} />
        </div>
      }

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold" data-testid="project-name">{project.name}</CardTitle>
          <Badge variant="secondary" data-testid="project-badge">
            {completedTasks}/{totalTasks}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className='flex items-center justify-between'>
            <h4 className="font-medium text-sm ">Tarefas:</h4>
            {
              user?.role !== 'COLLABORATOR' &&
              <div data-testid="new-task-button">
                <DialogNewTask projectId={project.id} />
              </div>
            }
          </div>

          <div className="space-y-2" data-testid="task-list">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3" data-testid={`task-${task.id}`}>
                <Checkbox
                  id={task.id}
                  checked={task.status === 'COMPLETED'}
                  onCheckedChange={() => toggleTask(task)}
                  data-testid={`checkbox-${task.id}`}
                />
                <label
                  htmlFor={task.id}
                  data-testid={`label-${task.id}`}
                  className={`text-sm cursor-pointer flex-1 ${
                    task.status === 'COMPLETED'
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {task.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
