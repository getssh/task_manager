import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { favTasks, getTasks } from '../features/tasks/taskSlice'
import { FavoriteBorder, FavoriteSharp, Inbox } from '@mui/icons-material'

const Favorite = ({favFilter}) => {
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
            <List dense={true} key={task._id}>
              <ListItem>
                <ListItemText
                  primary={task.taskItem}
                  secondary={null}
                />
              </ListItem>
            </List>
          ))}
        </>
      ) : (
        <div>No Favorite Tasks</div>
      )}
    </Box>
  )
}

export default Favorite
