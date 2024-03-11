import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { favTasks, getTasks } from '../features/tasks/taskSlice'
import { reset } from '../features/users/userSlice'

const Favorite = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
      .then(() => {
        dispatch(favTasks())
      })
  }, [dispatch])

  const {tasks} = useSelector((state)=>state.tasks)


  return (
    <Box>
      { tasks &&
        tasks.map((task)=> {
          return <div key={task.id}>
            <div>
              <p>{task.taskItem}</p>
            </div>
          </div>
        })
      }
      <p>faoriate</p>
    </Box>
  )
}

export default Favorite