import globalApi from "@/lib/axios"
import type { Task } from "@/features/task/task.type"

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await globalApi.get("/api/task")
  return res.data.data
}

export const createTask = async (name: string) => {
  const res = await globalApi.post("/api/task", {
    name,
    description: "",
  })

  return res.data
}

export const deleteTask = async (id: string) => {
  const res = await globalApi.delete(`/api/task/${id}`)

  return res.data
}

export const editTask = async ({ id, name }: { id: string; name: string }) => {
  console.log(name)
  const res = await globalApi.patch(`/api/task/${id}`, { name })

  console.log(res.data)
  return res.data
}
