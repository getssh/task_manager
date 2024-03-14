import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { favTasks, getTasks } from '../features/tasks/taskSlice'

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
      { tasks.length ?
        <div>
          {
            tasks.map((task)=> {
              return <div key={task.id}>
                <p>{task.taskItem}</p>
              </div>
            })
          }
        </div> : <div>No Task</div>
      }
    </Box>
  )
}

export default Favorite