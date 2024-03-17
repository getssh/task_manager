import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Box} from '@mui/material'
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <Box>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/liked" element={<Favorite />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/Signin" element={<Signin />}/>
            <Route path="/Signup" element={<Signup />}/>
        </Routes>
      </Router>
      <ToastContainer />
    </Box>
  );
}

export default App;
