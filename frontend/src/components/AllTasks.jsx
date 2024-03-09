import { Box } from '@mui/material'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTasks, reset} from '../features/tasks/taskSlice'

const AllTasks = () => {
  const dispatch = useDispatch()

  const {tasks} = useSelector((state) => state.tasks)

  //TO-DO fix the infinity call for getTasks
  useEffect(()=> {
    dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, tasks])

  return (
    <Box sx={{bgcolor:"lightblue"}} flex={4}>
            {
        tasks.map((task)=> {
          return <div key={task.id}>
            <p>{task.taskItem}</p>
          </div>
        })
      }
    </Box>
  )
}

export default AllTasks