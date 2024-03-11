import { EmailRounded, Key, Visibility } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddForm = () => {
  const [open, setOpen] = useState(false)

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
        <Box component="form" sx={{bgcolor: "lightcyan", display:"flex", gap:5,
          flexDirection: "column", width: {xs:"90%", sm:"50%", md:"50%", lg:"30%"},
          borderRadius: 5,
        }} p={5}>
          <FormControl variant="standard">
            <Input
              type='email'
              placeholder='Email Address'
              name='email'
              startAdornment={
                <InputAdornment position="start">
                  <EmailRounded />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <Input
              type='password'
              placeholder='Password'
              name='password'
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  >
                  <Visibility />
                </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" type='submit'>LogIn</Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  )
}

export default AddForm