import React, { useEffect, useState } from 'react';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';
import UserProfile from './pages/Profile/UserProfile.js';
import './App.css';
import Summary from './pages/UserSummary/Summary.js';
import { fetchUserData } from './endpoint.js';



const AppContent = () => {
  const { token, isLoggedIn } = useAuth()
  const [userHistory, setUserHistory] = useState([])

  const handleFetchUserData = async () => {
    try {
      const data = await fetchUserData(token);
      console.log('Dados do usuário:', data);
      setUserHistory(data.history)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {setUserHistory([]); handleFetchUserData()}, [token, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Summary userHistory={userHistory} setUserHistory={setUserHistory} />} />
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
