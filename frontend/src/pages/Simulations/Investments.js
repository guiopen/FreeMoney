import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object({
    idadeAtual: yup.number().typeError('O valor inserido deve ser um número inteiro').required('Campo obrigatório').min(0, 'Valor não pode ser negativo'),
    idadeAposentadoria: yup.number().typeError('O valor inserido deve ser um número inteiro').required('Campo obrigatório').min(yup.ref('idadeAtual'), 'Idade de aposentadoria deve ser maior que a idade atual'),
    patrimonioAtual: yup.number().typeError('O valor inserido deve ser um número inteiro').required('Campo obrigatório').min(0, 'Valor não pode ser negativo'),
    patrimonioDesejado: yup.number().typeError('O valor inserido deve ser um número inteiro').required('Campo obrigatório').min(0, 'Valor não pode ser negativo'),
    rendimentoDesejado: yup.number().typeError('O valor inserido deve ser um número inteiro').required('Campo obrigatório').min(0, 'Valor não pode ser negativo').max(100, 'Valor deve ser em porcentagem'),
});

const calcularAporteNecessario = (idadeAtual, idadeAposentadoria, patrimonioAtual, patrimonioDesejado, taxaRendimentoMensal) => {
    const t = (idadeAposentadoria - idadeAtual) * 12;

    if (patrimonioAtual * Math.pow((1 + taxaRendimentoMensal), t) >= patrimonioDesejado) {
        return 'Seu patrimônio atual já é suficiente para alcançar o patrimônio desejado com os juros compostos.';
    }

    const numerador = patrimonioDesejado - patrimonioAtual * Math.pow((1 + taxaRendimentoMensal), t);
    const denominador = (Math.pow((1 + taxaRendimentoMensal), t) - 1) / taxaRendimentoMensal;

    const aporteMensal = numerador / denominador;
    return `Você precisará fazer aportes mensais de R$${aporteMensal.toFixed(2)} para alcançar o patrimônio desejado.`;
};

const Investments = ({ onSimulate }) => {
    const formik = useFormik({
        initialValues: {
            idadeAtual: '',
            idadeAposentadoria: '',
            patrimonioAtual: '',
            patrimonioDesejado: '',
            rendimentoDesejado: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const { idadeAtual, idadeAposentadoria, patrimonioAtual, patrimonioDesejado, rendimentoDesejado } = values;

            const idadeAtualNum = parseInt(idadeAtual);
            const idadeAposentadoriaNum = parseInt(idadeAposentadoria);
            const patrimonioAtualNum = parseFloat(patrimonioAtual);
            const patrimonioDesejadoNum = parseFloat(patrimonioDesejado);
            const rendimentoDesejadoNum = parseFloat(rendimentoDesejado) / 100;

            const resultado = calcularAporteNecessario(
                idadeAtualNum,
                idadeAposentadoriaNum,
                patrimonioAtualNum,
                patrimonioDesejadoNum,
                rendimentoDesejadoNum
            );

            onSimulate(resultado);
        },
    });

    const placeholders = [
        { name: "idadeAtual", label: "Idade Atual" },
        { name: "idadeAposentadoria", label: "Idade de Aposentadoria" },
        { name: "patrimonioAtual", label: "Patrimônio Atual" },
        { name: "patrimonioDesejado", label: "Patrimônio Desejado" },
        { name: "rendimentoDesejado", label: "Rendimento Desejado (% ao ano)" },
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

export default Investments;
