import { EmailRounded, Key, TaskAlt, TaskSharp, Visibility } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddForm = () => {
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    taskItem: "",
    priority: "low",
  })

  const {taskItem, priority} = formData

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <Button onClick={()=>setOpen(true)}>Add Task</Button>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: 'flex', justifyContent:"center", alignItems:"center"}}
      >
        <Box
          onSubmit={handleSubmit}
          component="form" sx={{bgcolor: "lightcyan", display:"flex", gap:5,
          flexDirection: "column", width: {xs:"90%", sm:"50%", md:"50%", lg:"30%"},
          borderRadius: 5,
        }} p={5}>
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
              onChange={handleChange}
            >
              <MenuItem component="option" value="low">Low</MenuItem>
              <MenuItem component="option" value="high">High</MenuItem>
              <MenuItem component="option" value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Button variant="contained" type='submit'>Add Task</Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  )
}

export default AddForm