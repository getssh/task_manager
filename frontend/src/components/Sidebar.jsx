import { Box, Typography } from '@mui/material'
import React from 'react'
import { CheckCircleOutline, FavoriteBorderRounded } from '@mui/icons-material'
import TaskFilter from './TaskFilter'

const Sidebar = () => {
  return (
    <Box flex={{sm:2, md:1}} px={2} sx={{display: {xs: 'none', sm: 'block'}}}>
      <Box sx={{position: 'fixed', overflow: 'hidden', maxWidth: {sm: '30%', md:'20%'}}}>
        <Box>
          <Typography variant='h5' sx={{position: 'sticky', top: 0}}>
            <FavoriteBorderRounded /> Favorite Tasks
          </Typography>
        </Box>
        <Box sx={{height: '40vh', overflowX: 'hidden', overflowY: 'scroll', '&::-webkit-scrollbar': {
          display: 'none'}}}>
          <TaskFilter favFilter={true} />
        </Box>
        <Box py={2}>
          <Typography variant='h5' sx={{position: 'sticky', top: 0}}>
            <CheckCircleOutline /> Completed Tasks
          </Typography>
        </Box>
        <Box sx={{height: '50vh', overflowX: 'hidden', overflowY: 'scroll', '&::-webkit-scrollbar': {
          display: 'none'}}}>          
          <TaskFilter favFilter={false}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar