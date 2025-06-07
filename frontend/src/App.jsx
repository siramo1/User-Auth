import './App.css';
import {  Routes , Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import VerifyEmail from './pages/VerifyEmail';
import UserProfile from './pages/UserProfile';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

  // Protecting Routes
  const ProtectedRoutes = ({ children }) => { 
    const { isAuthenticated, user} = useAuthStore();

    if(!isAuthenticated) {
      return <Navigate to='/login' replace />
    }
    if (!user.isVerified) {
      return <Navigate to='/verify-email' replace />
    }
    return children;
  }

  // redirecting user if it authenticated
  const RedirectAuthenticatedUser = ({children}) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user?.isVerified) {
      return <Navigate to='/user-profile' replace />
    }
    return children;
  }


function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    console.log('uset is not authorized')
  }

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  if (isCheckingAuth) return <h1>it is checking the auth</h1>

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<RedirectAuthenticatedUser> <SignupPage /> </RedirectAuthenticatedUser>} />
      <Route path='/verify-email' element={<RedirectAuthenticatedUser><VerifyEmail /> </RedirectAuthenticatedUser>} />
      <Route path='/login' element={<RedirectAuthenticatedUser> <LoginPage /> </RedirectAuthenticatedUser>} />

      <Route path='/forget-password' element={<RedirectAuthenticatedUser> <ForgetPassword /> </RedirectAuthenticatedUser>} />
      <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser> <ResetPassword /> </RedirectAuthenticatedUser>} />

      <Route path='*' element={<Navigate to='/' replace />} />

      <Route path='/user-profile' element={<ProtectedRoutes><UserProfile /> </ProtectedRoutes> }/>
    </Routes>
  )
}

export default App