import { Box, Input, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {filterTask, getTasks, reset} from '../features/tasks/taskSlice'
import Task from './Task'
import { Cached } from '@mui/icons-material'

const AllTasks = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)
  const {user} = useSelector((state)=> state.user)

  useEffect(()=> {
    if (!user) {
      navigate('/signin')
    }
    dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, user, navigate, isError, message])

  const [filterItem, setFilterItem] = useState({
    taskText: '',
    isComplete: false,
    isFavorite: false,
    isToday: false,
    priorityFilter: '',
  })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    const updatedFilterItem = {
      ...filterItem,
      [name]: newValue
    };
    setFilterItem(updatedFilterItem);
    dispatch(filterTask(updatedFilterItem));
  };

  if (isLoading) {
    return (
      <Box flex={4} sx={{
        position: 'fixed', top: '50%', left: {xs: '40%', sm: '60%'},
        textAlign:'center', justifyContent:'center'}}>
        <Cached sx={{width: '5rem', height: '5rem'}}/>
      </Box>
    )
  }

  return (
    <>
      <Box flex={4}>
        <Box sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'lavender',
          width: {xs: '`100%', sm: '80%'}, marginLeft: {xs:'0%', sm:'5%', md: '10%'}, borderRadius: 2,
          boxShadow: '5px 5px 5px lightgrey'
        }} p={3} mb={2}>
          <Box component='form' sx={{width: {xs:'100%', sm: '80%'}, marginLeft: {xs:'5%', sm:'0%', md:'10%'}}}>
            <Input
              sx={{width: '80%', padding: '0 10px', backgroundColor: '#fff'}}
              type="text"
              name='taskText'
              placeholder='Search...'
              value={filterItem.taskText}
              onInput={handleChange}
            /><br/>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column', md:'row'}, justifyContent: 'center', gap: '2rem',
              padding: '1rem', marginRight: {xs:'0%', sm:'10%'}
            }}>
              <div>
                <input
                  type='checkBox'
                  name='isToday'
                  checked={filterItem.isToday}
                  onChange={handleChange}
                /> <lable>Today</lable>
                <input
                  style={{marginLeft: 10}}
                  type='checkBox'
                  name='isComplete'
                  checked={filterItem.isComplete}
                  onChange={handleChange}
                /> <lable>Completed</lable>
                <input
                  style={{marginLeft: 10}}
                  type='checkBox'
                  name='isFavorite'
                  checked={filterItem.isFavorite}
                  onChange={handleChange}
                /> Favorited
              </div>
              <select
                name="priorityFilter"
                value={filterItem.priorityFilter}
                onChange={handleChange}
              >
                <option value='all'>All priority</option>
                <option value='low'>Low</option>
                <option value='high'>High</option>
                <option value='urgent'>Urgent</option>
              </select>
            </Box>
          </Box>
        </Box>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap:7}}>
        {tasks && tasks.length > 0 ? (

            tasks.map((task) => (
                <Task key={task._id} task={task}/>
              ))
            ) : (
              <Box sx={{gridColumn: "1 / -1", display: 'flex', justifyContent:'center', alignItems: 'center', height: '50vh'}}>
                <Typography variant='h5' sx={{textAlign: 'center', width: '100%'}}>Tasks Not Found</Typography>
              </Box>
              )}
        </div>
      </Box>
    </>
  )
}

export default AllTasks