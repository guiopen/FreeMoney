import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Loans = ({ onSimulate }) => {
    const validationSchema = yup.object({
        taxaJuros: yup.number().typeError('O valor inserido deve ser um número').required('Campo obrigatório').min(0, 'Valor não pode ser negativo'),
        valorEmprestado: yup.number().typeError('O valor inserido deve ser um número').required('Campo obrigatório').min(0, 'Valor não pode ser negativo'),
        prazoPagamento: yup.number().typeError('O valor inserido deve ser um número').required('Campo obrigatório').min(1, 'Prazo mínimo é 1 mês').integer('O prazo deve ser um número inteiro'),
    });

    const formik = useFormik({
        initialValues: {
            taxaJuros: '',
            valorEmprestado: '',
            prazoPagamento: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const { taxaJuros, valorEmprestado, prazoPagamento } = values;
            const resultado = calcularParcelaMensal(taxaJuros, valorEmprestado, prazoPagamento);
            onSimulate(resultado);
        },
    });

    const calcularParcelaMensal = (taxaJuros, valorEmprestado, prazoPagamento) => {
        // Cálculo da parcela mensal do empréstimo
        const taxaMensal = taxaJuros / 100 / 12;
        const parcela = valorEmprestado * taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazoPagamento));
        return `O valor da parcela mensal do empréstimo será de R$${parcela.toFixed(2)}.`;
    };

    const placeholders = [
        { name: "taxaJuros", label: "Taxa de Juros (% ao mês)" },
        { name: "valorEmprestado", label: "Valor Emprestado" },
        { name: "prazoPagamento", label: "Prazo de Pagamento (meses)" }
    ];

    return (
        <form onSubmit={formik.handleSubmit}>
            {placeholders.map((field, index) => (
                <div key={index} className="mb-6 text-right">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                        <input
                            type="text"
                            name={field.name}
                            id={field.name}
                            autoComplete="off"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-xs sm:text-sm sm:leading-6 w-full"
                            placeholder={field.label}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched[field.name] && formik.errors[field.name] && (
                        <div className="mt-1 text-red-500 text-xs absolute">
                            {formik.errors[field.name]}
                        </div>
                    )}
                </div>
            ))}
            <button type="submit" className="bg-project-blue text-white font-bold py-1.5 px-4 rounded-md w-full">
                Simular
            </button>
        </form>
    );
};

export default Loans;
