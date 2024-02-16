import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";
import EditTaskManager from "./components/EditTaskManager";
import ShowAlert from "./components/ShowAlert";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ShowAlert />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/:id' element={<EditTaskManager />} />
        <Route path='/add-task' element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
