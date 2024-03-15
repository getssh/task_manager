import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'
import AllTasks from '../components/AllTasks'
import AddForm from '../components/AddForm'

const home = () => {
  return (
    <Box p={2}>
      <Stack direction="row" spacing={2}>
        <Sidebar />
        <AllTasks />
      </Stack>
      <AddForm />
    </Box>
  )
}

export default home