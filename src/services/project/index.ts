import { api } from "../api";

export async function fetchProjects() {
    const { data } = await api.get('/projects')
    return data
}
export async function createProject(data: { name: string }) {
    const { data: project } = await api.post('/project', data)
    return project
}

export async function updateProject(data: { id: string; name: string }) {
    const { data: project } = await api.put(`/project/${data.id}`, data)
    return project
}
export async function deleteProject(data: { id: string}) {
    const { data: project } = await api.delete(`/project/${data.id}`)
    return project
}