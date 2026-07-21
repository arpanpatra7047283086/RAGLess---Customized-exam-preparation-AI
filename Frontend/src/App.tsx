import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages'
import { StudyPage } from './pages/study'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { AdminPage } from './pages/admin'

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
