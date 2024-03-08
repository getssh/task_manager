import {useSelector } from "react-redux/es/hooks/useSelector";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Box} from '@mui/material'
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'

function App() {
  const {tasks} = useSelector((state)=>state.tasks)

  return (
    <Box>
      <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/liked" element={<Favorite />}/>
            <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
