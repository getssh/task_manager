import { OpenInNew } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import Task from './Task'

const ShowTask = ({taskItem}) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Tooltip
        onClick={(e)=>setOpen(true)}
        title="showtask">
        <IconButton aria-label="delete">
          <OpenInNew />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: 'flex', justifyContent:"center", alignItems:"center"}}
      >
      <Box p={3} sx={{backgroundColor: 'white', borderRadius: 3}}>
        <Task task={taskItem}/>
      </Box>
      </Modal>
    </div>
  )
}

export default ShowTask