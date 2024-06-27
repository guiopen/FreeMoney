import React, { Profiler } from 'react';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';
import UserProfile from './pages/Profile/UserProfile.js';
import './App.css';


const AppContent = () => {
  /*const { isLoggedIn } = useAuth();*/
  const isLoggedIn = true;
  return isLoggedIn ? <Navbar /> : <AuthPage />;
};

function App() {
  return (
    <div className="App bg-background-blue h-screen">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <Router>
        <Routes>
          <Route path="/simulacoes" element={<Simulations />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
