import { Box, List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../features/tasks/taskSlice'
import ShowTask from '../components/ShowTask'

const TaskFilter = ({favFilter}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  const { tasks } = useSelector((state) => state.tasks)

  const filterdTasks = tasks && tasks.length && favFilter ? tasks.filter(task => task.favorite) :
   tasks && tasks.length && !favFilter ? tasks.filter(task => task.taskCompleted) : []

  return (
    <Box>
      {filterdTasks && filterdTasks.length ? (
        filterdTasks.map((task) => (
          <List dense={true} key={task._id} sx={{backgroundColor: favFilter ? '#dff0ed' : '#d4bf90', margin: '5px 0'}}>
            <ListItem>
              <ListItemText
                primary={task.taskItem}
                secondary={null}
              />
            <ShowTask taskItem={task}/>
            </ListItem>
          </List>
        ))
      ) : (
        <div>No {favFilter ? 'Favorite' : 'Completed'} Tasks</div>
      )}
    </Box>
  )
}

export default TaskFilter
