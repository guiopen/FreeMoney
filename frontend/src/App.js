import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Simulations from './pages/Simulations/Simulations.js';

function App() {
  return (
    <div className="App bg-background-blue h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/simulacoes" element={<Simulations />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
