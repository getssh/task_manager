import { Box, Typography } from '@mui/material'
import React from 'react'
import Favorite from '../pages/Favorite'

const Sidebar = () => {
  return (
    <Box flex={1}>
      <Box sx={{position: 'fixed'}}>
        <Typography variant='h5'>
          Favorite Tasks
        </Typography>
        <Favorite />
      </Box>
    </Box>
  )
}

export default Sidebar