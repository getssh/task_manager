import {useSelector} from 'react-redux'
import { Typography } from '@mui/material'

const Profile = () => {

  const {user, isLoading} = useSelector((state)=>state.user)

  if (isLoading) {
    <div>Loading...</div>
  }
  return (
    <div>
      {
        user ? <div>
          <Typography variant='h4'>
            {user.name}
          </Typography>
          <Typography variant='h4'>
            {user.email}
          </Typography>
        </div> : 
        <div>No user found</div>
      }
    </div>
  )
}

export default Profile