import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'
import AllTasks from '../components/AllTasks'

const home = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Sidebar />
        <AllTasks />
      </Stack>
    </Box>
  )
}

export default home