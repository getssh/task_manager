import { Box } from '@mui/material'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getTasks, reset} from '../features/tasks/taskSlice'
import {toast} from 'react-toastify'

const AllTasks = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)
  const {user} = useSelector((state)=> state.user)

  useEffect(()=> {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/signin')
    }
    dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, user, navigate, isError, message])

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Box sx={{bgcolor:"lightblue"}} flex={4}>
            { tasks &&
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