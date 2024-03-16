import {useSelector} from 'react-redux'
import { Box, Typography } from '@mui/material'

const Profile = () => {

  const {user, isLoading} = useSelector((state)=>state.user)
  const {tasks} = useSelector((state) => state.tasks)

  console.log(user)
  if (isLoading) {
    <div>Loading...</div>
  }
  return (
    <div>
      {
        user ? <Box sx={{display: 'flex', flexDirection: 'column', 
          height: '80vh',
        justifyContent: 'center', alignItems: 'center', gap: 3}}>
          <Typography variant='h4'>
            Name: {user.name}
          </Typography>
          <Typography variant='h4'>
            Email: {user.email}
          </Typography>
          <Typography variant='h4'>
            Total Tasks: {tasks.length}
          </Typography>
          <Typography variant='h4'>
            Account Created: {new Date(user.createdAt).toLocaleString('en-us')}
          </Typography>
        </Box> : 
        <div>No user found</div>
      }
    </div>
  )
}

export default Profile