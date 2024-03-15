import { Box } from '@mui/material'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getTasks, reset} from '../features/tasks/taskSlice'
import {toast} from 'react-toastify'
import Task from './Task'

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
    return <Box flex={4} sx={{height: '100vh', textAlign:'center'}}>Loading</Box>
  }

  return (
    <>
      <Box flex={4}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap:2}}>
        {tasks && tasks.length > 0 ? (

            tasks.map((task) => (
                <Task key={task._id} task={task}/>
              ))
            ) : (
              <div>No Task</div>
              )}
        </div>
      </Box>
    </>
  )
}

export default AllTasks