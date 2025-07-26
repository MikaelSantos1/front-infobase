"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface Project {
  id: string
  title: string
  description: string
  tasks: Task[]
  color: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project: initialProject }: ProjectCardProps) {
  const [project, setProject] = useState(initialProject)

  const toggleTask = (taskId: string) => {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    }))
  }

  const completedTasks = project.tasks.filter((task) => task.completed).length
  const totalTasks = project.tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          <Badge variant="secondary" className={`${project.color}`}>
            {completedTasks}/{totalTasks}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
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
          <h4 className="font-medium text-sm">Tarefas:</h4>
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3">
                <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <label
                  htmlFor={task.id}
                  className={`text-sm cursor-pointer flex-1 ${
                    task.completed ? "line-through text-muted-foreground" : "text-foreground"
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
  )
}
