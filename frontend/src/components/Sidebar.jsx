import { Box, Typography } from '@mui/material'
import React from 'react'
import Favorite from '../pages/Favorite'
import { CheckCircle, CheckCircleOutline, FavoriteBorderRounded } from '@mui/icons-material'

const Sidebar = () => {
  return (
    <Box flex={{sm:2, md:1}} pl={2}>
      <Box sx={{position: 'fixed', overflow: 'hidden', maxWidth: {sm: '30%', md:'20%'}}}>
        <Box sx={{height: '50vh', overflowX: 'hidden', overflowY: 'scroll', '&::-webkit-scrollbar': {
          display: 'none'}}}>
          <Typography variant='h5' position='sticky' sx={{textAlign: 'center'}}>
            <FavoriteBorderRounded /> Favorite Tasks
          </Typography>
          <Favorite favFilter={true} />
        </Box>
        <Box sx={{height: '50vh', overflowX: 'hidden', overflowY: 'scroll', '&::-webkit-scrollbar': {
          display: 'none'}}}>          
          <Typography variant='h5'>
            <CheckCircleOutline /> Completed Tasks
          </Typography>
          <Favorite favFilter={false}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar