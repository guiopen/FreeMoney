// src/pages/Simulations/Simulations.js
import React, { useState } from 'react';

function Simulations() {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [patrimonioAtual, setPatrimonioAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [rendimentoDesejado, setRendimentoDesejado] = useState('');
  const [resultado, setResultado] = useState('');

  const handleSimulate = () => {
    if (idadeAtual && patrimonioAtual && idadeAposentadoria && rendimentoDesejado) {
      setResultado('Resultado da simulação');
    } else {
      setResultado('Por favor, preencha todos os campos corretamente');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-1/2 p-4">
        <div className="mb-4">
          <label htmlFor="idadeAtual" className="block text-sm font-medium text-gray-700">Idade atual</label>
          <input type="number" id="idadeAtual" value={idadeAtual} onChange={(e) => setIdadeAtual(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="patrimonioAtual" className="block text-sm font-medium text-gray-700">Patrimônio investido atualmente</label>
          <input type="number" id="patrimonioAtual" value={patrimonioAtual} onChange={(e) => setPatrimonioAtual(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="idadeAposentadoria" className="block text-sm font-medium text-gray-700">Idade que deseja se aposentar</label>
          <input type="number" id="idadeAposentadoria" value={idadeAposentadoria} onChange={(e) => setIdadeAposentadoria(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="rendimentoDesejado" className="block text-sm font-medium text-gray-700">Rendimento mensal desejado</label>
          <input type="number" id="rendimentoDesejado" value={rendimentoDesejado} onChange={(e) => setRendimentoDesejado(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <button onClick={handleSimulate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Simular</button>
        <div className="mt-4 text-gray-700">{resultado}</div>
      </div>
    </div>
  );
}

export default Simulations;
