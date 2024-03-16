import { Box, List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { favTasks, getTasks } from '../features/tasks/taskSlice'
import ShowTask from '../components/ShowTask'

const TaskFilter = ({favFilter}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
      .then(() => {
        dispatch(favTasks())
      })
  }, [dispatch])

  const { tasks } = useSelector((state) => state.tasks)

  const filterdTasks = tasks && favFilter ? tasks.filter(task => task.favorite) :
   tasks && !favFilter ? tasks.filter(task => task.taskCompleted) : []

  return (
    <Box>
      {filterdTasks && filterdTasks.length ? (
        <>
          {filterdTasks.map((task) => (
            <List dense={true} key={task._id} sx={{backgroundColor: favFilter ? '#dff0ed' : '#d4bf90', margin: '5px 0'}}>
              <ListItem>
                <ListItemText
                  primary={task.taskItem}
                  secondary={null}
                />
              <ShowTask taskItem={task}/>
              </ListItem>
            </List>
          ))}
        </>
      ) : (
        <div>No {favFilter ? 'Favorite' : 'Completed'} Tasks</div>
      )}
    </Box>
  )
}

export default TaskFilter
