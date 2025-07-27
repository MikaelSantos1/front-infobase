import { api } from "../api";

interface CreateTaskDTO{
  title: string;
  projectId: string;
  status:  'IN_PROGRESS' | 'COMPLETED';
}

export function changeTaskStatus(taskId: string, status: string) {
  return api.put(`/task/${taskId}`, { status });
}
export function createTask(data: CreateTaskDTO) {
  return api.post('/task', data);
}