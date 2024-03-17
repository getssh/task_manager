import {useSelector} from 'react-redux'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'

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
              <Button size="small" variant='contained' color='error'>Delete Account</Button>
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