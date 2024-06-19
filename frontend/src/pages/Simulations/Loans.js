import React, { useState } from 'react';

const Loans = ({ onSimulate }) => {
    const [inputValues, setInputValues] = useState({
        taxaJuros: '',
        valorEmprestado: '',
        prazoPagamento: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });
    };

    const handleSimulate = () => {
        const { taxaJuros, valorEmprestado, prazoPagamento } = inputValues;
        if (taxaJuros && valorEmprestado && prazoPagamento) {
            onSimulate('Resultado da simulação de empréstimos');
        } else {
            onSimulate('Por favor, preencha todos os campos corretamente');
        }
    };

    const placeholders = [
        { name: "taxaJuros", placeholder: "Taxa de Juros" },
        { name: "valorEmprestado", placeholder: "Valor Emprestado" },
        { name: "prazoPagamento", placeholder: "Prazo de Pagamento" }
    ];

    return (
        <>
            {placeholders.map((field, index) => (
                <div key={index} className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full mb-4">
                    <input
                        type="text"
                        name={field.name}
                        id={field.name}
                        autoComplete="off"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder={field.placeholder}
                        value={inputValues[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button onClick={handleSimulate} className="bg-project-blue text-white font-bold py-1.5 px-4 rounded-md w-full">Simular</button>
        </>
    );
};

export default Loans;
