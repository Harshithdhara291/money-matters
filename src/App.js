import {Route, Routes} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Transactions from './components/Transactions' 
import Profile from './components/Profile'
import './App.css'

const App = () => (
  <>
    <Routes>
      <Route exact path="/" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route exact path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route exact path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
      <Route exact path="/login" element={ <LoginForm/> } />
    </Routes>
  </>
)

export default App