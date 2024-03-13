import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { getUser } from '../features/users/userSlice'
import {useNavigate} from 'react-router-dom'
import { Typography } from '@mui/material'
import { getTasks } from '../features/tasks/taskSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.user)

  console.log(user)

  useEffect(()=> {
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