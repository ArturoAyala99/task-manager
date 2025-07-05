import './App.css'
import TaskList from './components/TaskList'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasklist" element={ <ProtectedRoute> <TaskList /> </ProtectedRoute> } />
      </Routes>
    </>
  )
}

export default App
