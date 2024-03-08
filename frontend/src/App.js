import {useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const {tasks} = useSelector((state)=>state.tasks)

  return (
    <>
      <p>{tasks[0]}</p>
    </>
  );
}

export default App;
