import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";
import EditTaskManager from "./components/EditTaskManager";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/:id' element={<EditTaskManager />} />
        <Route path='/add-task' element={<CreateTask />} />
        {/* <Route path='/edit-task/:id' element={<EditTaskManager />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
