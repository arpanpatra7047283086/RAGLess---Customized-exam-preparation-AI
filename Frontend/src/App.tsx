import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { HomePage } from './pages/Index'
import { StudyPage } from './pages/Study'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { AdminPage } from './pages/Admin'
import { useUserContext } from './context/userContext'

function App() {
  const { userId } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to login if not authenticated, otherwise show HomePage */}
        <Route
          path='/'
          element={userId ? <HomePage /> : <Navigate to="/login" replace />}
        />

        {/* Protected Study route */}
        <Route
          path='/study'
          element={userId ? <StudyPage /> : <Navigate to="/login" replace />}
        />

        {/* Public routes */}
        <Route path='/login' element={!userId ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!userId ? <SignupPage /> : <Navigate to="/" replace />} />

        {/* Admin route - could also be protected if needed */}
        <Route path='/admin' element={<AdminPage />} />

        {/* Fallback for unknown routes */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
