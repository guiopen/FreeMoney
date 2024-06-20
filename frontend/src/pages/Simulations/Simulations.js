import React, { useState } from 'react';
import Investments from './Investments';
import Loans from './Loans';

const SIMULATION_COMPONENT = {
    INVESTMENTS: 'investments',
    LOANS: 'loans'
};

function Simulations() {
    const [currentSimulationComponent, setCurrentSimulationComponent] = useState(SIMULATION_COMPONENT.INVESTMENTS);
    const [resultado, setResultado] = useState('');

    const handleSimulate = (resultadoSimulacao) => {
        setResultado(resultadoSimulacao);
    };

    return (
        <div className='flex justify-center items-center h-screen bg-[#D8FDFF]'>
            <div className='bg-white w-4/5 md:w-3/5 shadow-md rounded-lg flex justify-between mx-auto mt-20 max-w-3xl flex flex-col lg:flex-row'>
                <div className='p-4 md:p-8 w-full lg:w-1/2'>
                    <div className="flex justify-center mb-6 space-x-6 mx-8">
                        <button
                            type="button"
                            onClick={() => setCurrentSimulationComponent(SIMULATION_COMPONENT.INVESTMENTS)}
                            className={
                                currentSimulationComponent === SIMULATION_COMPONENT.INVESTMENTS ?
                                    "text-sm md:text-lg font-bold text-project-blue border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors" :
                                    "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
                            }
                        >
                            Investimentos
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentSimulationComponent(SIMULATION_COMPONENT.LOANS)}
                            className={
                                currentSimulationComponent === SIMULATION_COMPONENT.LOANS ?
                                    "text-sm md:text-lg font-bold text-project-blue border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors" :
                                    "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
                            }
                        >
                            Empréstimos
                        </button>
                    </div>
                    {
                        currentSimulationComponent === SIMULATION_COMPONENT.INVESTMENTS
                            ? <Investments onSimulate={handleSimulate} />
                            : <Loans onSimulate={handleSimulate} />
                    }
                </div>
                <div className="relative flex items-center">
                    <div className="hidden lg:block w-0.5 h-2/3 bg-project-blue mx-4"></div> 
                </div>
                <div className='p-8 w-full lg:w-1/2 flex items-center justify-center text-center'>
                    {resultado 
                        ? <div className="text-project-blue">{resultado}</div>
                        : <div className="text-project-blue">Aqui aparecerá o resultado da sua simulação</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Simulations;
