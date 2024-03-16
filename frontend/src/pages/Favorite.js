import { Box } from "@mui/material"
import TaskFilter from "../components/TaskFilter"

const Favorite = () => {
  return (
    <Box>
      <TaskFilter favFilter={true}/>
    </Box>
  )
}

export default Favorite
