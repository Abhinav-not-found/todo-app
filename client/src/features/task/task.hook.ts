import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTask, editTask } from "./task.api"

const useTask = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTasks"],
      })
    },
  })

  const { mutate } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTasks"],
      })
    },
  })

  const handleDeleteTask = (id: string) => {
    mutate(id)
  }

  const editMutation = useMutation({
    mutationKey: ["editTask"],
    mutationFn: editTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTasks"],
      })
    },
  })

  const handleEditTask = (id: string, name: string) => {
    editMutation.mutate({ id, name })
  }

  return {
    handleDeleteTask,
    handleEditTask,
    editMutation,
    createMutation,
  }
}

export default useTask
