import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from './features/task/task.api'
import CreateTask from './features/task/components/create-task'
import TaskElement from './features/task/components/task-element'
import { ModeToggle } from './components/mode-toggle'

export function App() {

  const { data, isLoading } = useQuery({
    queryKey: ['allTasks'],
    queryFn: getAllTasks
  })

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className='h-dvh overflow-hidden'>
      {/* Desktop view */}
      <div className="h-full hidden md:flex flex-col items-center justify-center">
        <div className='w-sm flex items-center justify-between'>
          <h1 className='text-xl'>Todo List</h1>
          <div className='flex items-center gap-2'>
            <ModeToggle />
            <CreateTask />
          </div>

        </div>
        <div className='w-sm mt-2 space-y-1'>
          {data?.length === 0 ?
            <p>no tasks</p>
            :
            data?.map((i) => {
              return <TaskElement key={i._id} data={i} />
            })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="h-full p-4 md:hidden flex flex-col">
        <div className='flex items-center justify-between'>
          <h1 className='text-xl'>Todo List</h1>
          <div className='flex items-center gap-2'>
            <ModeToggle />
          </div>
        </div>
        <CreateTask />

        <div className="flex-1 min-h-0 w-full space-y-1 overflow-y-auto mt-2">
          {data?.length === 0 ? (
            <p>no tasks</p>
          ) : (
            data?.map((i) => (
              <TaskElement key={i._id} data={i} />
            ))
          )}
        </div>
      </div>

    </div>

  )
}

export default App
