import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
// import Home from './pages/Home';
// import Simulacoes from './pages/Simulacoes';
// import Perfil from './pages/Perfil';

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navbar /> : <AuthPage />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
       {/*<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulacoes" element={<Simulacoes />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
  </Router>*/}
    </div>
  );
}

export default App;
