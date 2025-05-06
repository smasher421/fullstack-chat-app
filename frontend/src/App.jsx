import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const  {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });


  React.useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  console.log('authUser:', authUser);

  if(isCheckingAuth && !authUser) return
  {
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
    </div>
  }

  return (
    <div data-theme={theme}>

  <Navbar />
  <Routes>  
    <Route path="/" element={<Navigate to="/homepage" />} />
    <Route path="/homepage" element={authUser ? <Homepage />: <Navigate to = "/login"/>} />
    <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to = "/homepage" /> } />
    <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to = "/homepage" /> } />
    <Route path="/settings" element={<SettingsPage /> } />
    <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to = "/login"/> } />
  </Routes>

  <Toaster  />
    </div>
  );
};

export default App;