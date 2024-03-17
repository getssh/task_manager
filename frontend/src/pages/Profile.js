import {useDispatch, useSelector} from 'react-redux'
import { Box, Button, Card, CardActions, CardContent, Modal, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getTasks } from '../features/tasks/taskSlice'
import { deleteUser } from '../features/users/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const WarnningModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    dispatch(deleteUser())
    navigate('/signin')
  }

  return (
    <div>
    <Tooltip
      onClick={(e)=>setOpen(true)}
      title="showtask">
      <Button size="small" variant='contained' color='error'>Delete Account</Button>
    </Tooltip>
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display: 'flex', justifyContent:"center", alignItems:"center"}}
    >
    <Box p={5} sx={{backgroundColor: 'white', textAlign: 'center', display: 'flex',
      flexDirection: 'column', gap: 2, borderRadius:3
      }}>
      <Typography>
        Are you sure you want to delete your account?<br/>
        All associated tasks will be deleted<br/>
        <i>This action can not be undo</i>
      </Typography>
      <div style={{display: 'flex', justifyContent: 'center', gap:'2rem'}}>
        <Button variant='contained'
          onClick={()=> setOpen(false)}
        >Cancel</Button>
        <Button variant='contained' color='error'
          onClick={handleDelete}
        >Delete Acc</Button>
      </div>
    </Box>
    </Modal>
  </div>
  )
}
const Profile = () => {
  const dispatch = useDispatch()

  const {user, isLoading, isError, message} = useSelector((state)=>state.user)
  const {tasks} = useSelector((state) => state.tasks)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTasks())
  }, [dispatch, isError, message])

  if (isLoading) {
    <div>Loading...</div>
  }
  return (
    <div>
      {
        user ? <Box sx={{display: 'flex', 
        height: '80vh', justifyContent: 'center', alignItems: 'center'}}>
          <Card sx={{display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', gap: 2, padding: '3rem'}}>
            <CardContent>
              <Typography p={1} variant='h5'>
                <b>Name:</b> {user.name}
              </Typography>
              <Typography p={1} variant='h5'>
                <b>Email:</b> {user.email}
              </Typography>
              <Typography p={1} variant='h5'>
                <b>Total Tasks:</b> {tasks.length}
              </Typography>
              <Typography p={1} variant='h5'>
              <b>Account Created:</b> {
                  new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                }
              </Typography>
            </CardContent>
            <CardActions>
                <WarnningModal />
            </CardActions>
          </Card> 
        </Box>
        : 
        <div>No user found</div>
      }
    </div>
  )
}

export default Profile