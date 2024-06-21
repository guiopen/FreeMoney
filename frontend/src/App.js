import React from 'react';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';


const AppContent = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navbar /> : <AuthPage />;
};

function App() {
  return (
    <div className="App bg-background-blue h-screen">
      <AuthProvider>
      <Router>
      <AppContent />
        <Routes>
          <Route path="/simulacoes" element={<Simulations />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
