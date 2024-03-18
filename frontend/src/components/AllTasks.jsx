import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {filterTask, getTasks, reset} from '../features/tasks/taskSlice'
import {toast} from 'react-toastify'
import Task from './Task'
import { Cached } from '@mui/icons-material'

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

  const [filterItem, setFilterItem] = useState({
    taskText: '',
    isComplete: false,
    isFavorite: false,
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
        position: 'fixed', top: '50%', left: '50%',
        textAlign:'center', justifyContent:'center'}}>
        <Cached sx={{width: '5rem', height: '5rem'}}/>
      </Box>
    )
  }

  return (
    <>
      <Box flex={4}>
        <Box>
          <input
            type="text"
            name='taskText'
            value={filterItem.taskText}
            onInput={handleChange}
          />
          <input
            type='checkBox'
            name='isComplete'
            checked={filterItem.isComplete}
            onChange={handleChange}
          /> Completed
          <input
            type='checkBox'
            name='isFavorite'
            checked={filterItem.isFavorite}
            onChange={handleChange}
          /> Favorited
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap:2}}>
        {tasks && tasks.length > 0 ? (

            tasks.map((task) => (
                <Task key={task._id} task={task}/>
              ))
            ) : (
              <div>No Task</div>
              )}
        </div>
      </Box>
    </>
  )
}

export default AllTasks