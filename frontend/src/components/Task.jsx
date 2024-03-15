import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, Checkbox, IconButton, Typography } from '@mui/material'
import { removeTask, updatedTask } from '../features/tasks/taskSlice'
import UpdateForm from './UpdateForm'
import {useDispatch} from 'react-redux'

const Task = ({task}) => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ minWidth: 275 }}>
    <Card variant="outlined" sx={{boxShadow: '1px 1px 2px gray',
      backgroundColor: task.taskCompleted ? 'lightgrey' : task.priority === 'high' && !task.taskCompleted ? 'lightyellow' :
      task.priority === 'urgent' && !task.taskCompleted ? 'lightpink' : 'white'
    }}
    >
    <CardContent>
    <Checkbox sx={{ml: -2}}
      checked={task.taskCompleted ? 'checked' : ''}
      onClick={() => dispatch(updatedTask({ taskId: task._id, taskData: { taskCompleted: !task.taskCompleted } }))}
    /> Mark as complete
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Task Details
      </Typography>
      <Typography variant="p" component={task.taskCompleted ? 'del' : 'div'}>
        {task.taskItem}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {task.taskCompleted ? 'Completed' : 'Not completed'}
      </Typography>
      </CardContent>
      <CardActions>
        <Checkbox icon={task.favorite ? <Favorite sx={{color: 'red'}}/> : <FavoriteBorder />} 
        checkedIcon={task.favorite ? <Favorite sx={{color: 'red'}}/> : <FavoriteBorder />}
          onClick={() => dispatch(updatedTask({ taskId: task._id, taskData: { favorite: !task.favorite } }))}
        />
        <UpdateForm taskToUpdate={task}/>
        <IconButton aria-label="delete"
          onClick={()=>{dispatch(removeTask(task._id))}}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  </Box>
  )
}

export default Task