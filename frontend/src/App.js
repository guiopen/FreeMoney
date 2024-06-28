import React from 'react';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';
import Summary from './pages/UserSummary/Summary.js';
import PrivateRoute from './pages/Authentication/PrivateRoute.js';



const AppContent = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return (
      <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/resumo" element={<PrivateRoute element={Summary} />} />
          <Route path="/simulacoes" element={<PrivateRoute element={Simulations} />} />
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
