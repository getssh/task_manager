import { Edit, TaskSharp } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, MenuItem, Modal, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {updatedTask} from '../features/tasks/taskSlice'

const UpdateForm = ({ taskToUpdate }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    taskItem: "",
    priority: "",
  })

  useEffect(() => {
    if (taskToUpdate) {
      setFormData({
        taskItem: taskToUpdate.taskItem,
        priority: taskToUpdate.priority,
      })
    }
  }, [taskToUpdate])

  const { taskItem, priority } = formData

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = { taskItem, priority }

    dispatch(updatedTask({ taskId: taskToUpdate._id, taskData }))
    setFormData({
      taskItem: "",
      priority: "",
    })
    setOpen(false)
  }

  return (
    <>
      <IconButton aria-label="edit">
        <Edit onClick={() => setOpen(true)} />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form" sx={{ bgcolor: "lightcyan", display: "flex", gap: 5, flexDirection: "column", width: { xs: "90%", sm: "50%", md: "50%", lg: "30%" }, borderRadius: 5, }} p={5}>
          <Typography variant='h6' sx={{textAlign: 'center'}}>Update Tast</Typography>
          <FormControl variant="standard">
            <Input
              type='text'
              placeholder='Task Info'
              name='taskItem'
              value={taskItem}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <TaskSharp />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <Select
              name="priority"
              label="Priority"
              placeholder='Priority'
              value={priority}
              onChange={handleChange}
            >
              <MenuItem component="option" value="low">Low</MenuItem>
              <MenuItem component="option" value="high">High</MenuItem>
              <MenuItem component="option" value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Button variant="contained" type='submit'>Update Task</Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateForm