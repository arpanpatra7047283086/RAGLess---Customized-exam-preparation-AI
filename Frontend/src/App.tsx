import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/Index'
import { StudyPage } from './pages/Study'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { AdminPage } from './pages/Admin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/study' element={<StudyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
