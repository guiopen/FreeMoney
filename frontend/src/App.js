import React, { Profiler } from 'react';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';
import UserProfile from './pages/Profile/UserProfile.js';
import './App.css';
import Summary from './pages/UserSummary/Summary.js';


const AppContent = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return (
      <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/simulacoes" element={<Simulations />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Routes>
      </Router>
      </>
    )
  } else {
    return (
      <AuthPage />
    )
  }
};

function App() {
  return (
    <div className="App bg-background-blue h-screen">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
