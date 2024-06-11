import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home';
// import Simulacoes from './pages/Simulacoes';
// import Perfil from './pages/Perfil';

function App() {
  return (
    <div className="App">
      <Navbar />
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
