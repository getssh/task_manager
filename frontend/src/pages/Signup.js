import { AccountCircle } from '@mui/icons-material'
import { Box, FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import React from 'react'

const Signup = () => {
  return (
    <Box>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          With a start adornment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  )
}

export default Signup