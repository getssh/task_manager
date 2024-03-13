import { Box, Button, Card, CardActions, CardContent, Checkbox, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getTasks, reset} from '../features/tasks/taskSlice'
import {toast} from 'react-toastify'
import AddForm from './AddForm'
import { Delete, Edit, Favorite, FavoriteBorder, Share } from '@mui/icons-material'

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
    <>
      <Box sx={{bgcolor:"lightblue"}} flex={4}>
        { tasks ?
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>
            {
              tasks.map((task)=> {
                return <div key={task.id}>
                    <Box sx={{ minWidth: 275 }}>
                      <Card variant="outlined">
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Task Details
                        </Typography>
                        <Typography variant="h5" component="div">
                          {task.taskItem}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Not completed
                        </Typography>
                        </CardContent>
                        <CardActions>
                          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                          <IconButton aria-label="edit">
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="edit">
                            <Delete />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Box>
                </div>
              })
            }
          </div> : <div>No Task</div>
        }
      </Box>
    </>
  )
}

export default AllTasks