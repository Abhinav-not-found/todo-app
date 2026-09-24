import { Button } from "@/components/ui/button"
import type { Task } from "../task.type"
import { Trash } from "lucide-react"
import useTask from "../task.hook"
import EditTask from "./edit-task"

const TaskElement = ({ data }: { data: Task }) => {

  const { handleDeleteTask } = useTask()

  return (
    <div className="flex items-center justify-between">
      <p className="first-letter:uppercase">{data.name}</p>
      <div className="flex items-center gap-1">
        <EditTask id={data._id} name={data.name} />
        <Button onClick={() => handleDeleteTask(data._id)} size={'icon'} variant={'destructive'}>
          <Trash className="size-4" />
        </Button>

      </div>
    </div>
  )
}

export default TaskElement