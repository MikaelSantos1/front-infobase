import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCard } from './project-card'
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest'


import { useAuthStore } from '@/store/auth-store'

// Mocks necessários
vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}))

vi.mock('@/services/task', () => ({
  changeTaskStatus: vi.fn(),
}))

vi.mock('./dialog-new-task', () => ({
  DialogNewTask: () => <div data-testid="new-task-dialog" />,
}))

vi.mock('./dialog-delete-project', () => ({
  DialogDeleteProject: () => <div data-testid="delete-project-dialog" />,
}))

vi.mock('./dialog-new-project', () => ({
  DialogNewProject: () => <div data-testid="edit-project-dialog" />,
}))

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
    '@tanstack/react-query'
  );

  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
    }),
    useMutation: () => ({
      mutate: vi.fn(),
    }),
  };
});

describe('ProjectCard', () => {
  const projectMock = {
    id: '1',
    name: 'Projeto Teste',
    created_at: '',
    updated_at: '',
    tasks: [
      {
        id: 't1',
        title: 'Tarefa 1',
        status: 'IN_PROGRESS' as const,
        created_at: '',
        updated_at: '',
        projectId: '1',
      },
      {
        id: 't2',
        title: 'Tarefa 2',
        status: 'COMPLETED' as const,
        created_at: '',
        updated_at: '',
        projectId: '1',
      },
    ],
  }

  beforeEach(() => {

    const useAuthStoreMock = useAuthStore as unknown as Mock

    useAuthStoreMock.mockReturnValue({
      user: { role: 'ADMIN' },
    })
  })

  it('deve renderizar corretamente o título do projeto e tarefas', () => {
    render(<ProjectCard project={projectMock} />)

    expect(screen.getByText('Projeto Teste')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
  })
  it('deve mostrar botões de editar e deletar projeto para ADMIN', () => {
    render(<ProjectCard project={projectMock} />)

    expect(screen.getByTestId('edit-project-dialog')).toBeInTheDocument()
    expect(screen.getByTestId('delete-project-dialog')).toBeInTheDocument()
    expect(screen.getByTestId('new-task-dialog')).toBeInTheDocument()
  })
  it('não deve mostrar botões de admin se for COLLABORATOR', () => {
    const useAuthStoreMock = useAuthStore as any
    useAuthStoreMock.mockReturnValue({
      user: { role: 'COLLABORATOR' },
    })

    render(<ProjectCard project={projectMock} />)

    expect(screen.queryByTestId('edit-project-dialog')).not.toBeInTheDocument()
    expect(screen.queryByTestId('delete-project-dialog')).not.toBeInTheDocument()
    expect(screen.queryByTestId('new-task-dialog')).not.toBeInTheDocument()
  })

})
