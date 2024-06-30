import React, { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../pages/Authentication/AuthContext';
import { addTransaction } from '../../endpoint';

const TransactionForms = ({closeModal, transactions, setTransactions}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuth()

    const incomeCategories = [
        { value: 'salary', label: 'Salário' },
        { value: 'benefits', label: 'Benefícios' },
        { value: 'investments', label: 'Investimentos' },
        { value: 'others', label: 'Outros' },
    ];

    const expenseCategories = [
        { value: 'rent', label: 'Aluguel' },
        { value: 'bills', label: 'Contas' },
        { value: 'groceries', label: 'Mercado' },
        { value: 'others', label: 'Outros' },
    ];

    return (
        <Formik
            initialValues={{ title: '', value: '', type: '', category: '' }}
            validationSchema={Yup.object({
                title: Yup.string().required('Obrigatório'),
                value: Yup.string().required('Obrigatório'),
                type: Yup.string().oneOf(['income', 'expense']).required('Selecione o tipo'),
                category: Yup.string().when('type', {
                    is: (type) => type !== '',
                    then: (schema) => schema.required('Selecione a categoria'),
                    otherwise: (schema) => schema, // No validation if type is empty
                }),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log("SUBMITED", values)
                const newTransaction = {
                    title: values.title,
                    date: new Date(),
                    category: values.category,
                    value: values.value,
                    expense: (values.type == "expense") ? true : false
                }
                try {
                  const response = await addTransaction(newTransaction, token);

                  if (response.ok) {
                    resetForm(); // Clear the form
                    setTransactions([...transactions, newTransaction])
                    closeModal()
                  } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Erro ao adicionar transação');
                  }
                } catch (error) {
                  console.error('Erro na requisição:', error);
                  setErrorMessage('Erro na requisição');
                } finally {
                  setSubmitting(false);
                }
            }}
      >
        {formik => (
            <Form>
                <div className="mb-4 relative">
                    <Field
                        type="title"
                        id="title"
                        name="title"
                        className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
                        placeholder='Título'
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4 relative">
                    <Field
                        type={'number'}
                        id="value"
                        name="value"
                        className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
                        placeholder='Valor'
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Tipo:
                    </label>
                    <div className="mt-1 flex items-center">
                    <Field
                        type="radio"
                        id="income"
                        name="type"
                        value="income"
                        className="mr-2"
                    />
                    <label htmlFor="income" className="mr-4">
                        Receita
                    </label>
                    <Field
                        type="radio"
                        id="expense"
                        name="type"
                        value="expense"
                        className="mr-2"
                    />
                    <label htmlFor="expense">
                        Despesa
                    </label>
                    </div>
                    <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria:
                    </label>
                    <div className="mt-1">
                    {formik.values.type === 'income' && (
                        <Field as="select" id="category" name="category" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
                        <option value="">Selecione uma categoria</option>
                        {incomeCategories.map((category) => (
                            <option key={category.value} value={category.label}>
                            {category.label}
                            </option>
                        ))}
                        </Field>
                    )}

                    {formik.values.type === 'expense' && (
                        <Field as="select" id="category" name="category" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
                        <option value="">Selecione uma categoria</option>
                        {expenseCategories.map((category) => (
                            <option key={category.value} value={category.label}>
                            {category.label}
                            </option>
                        ))}
                        </Field>
                    )}
                    </div>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="mt-1 p-2 w-full border rounded-md text-white text-lg hover:bg-blue-600"
                        style={{ backgroundColor: '#3298AB' }}
                        disabled={formik.isSubmitting}
                    >
                        Adicionar
                    </button>
                </div>
                {errorMessage && <div className="text-red-500 text-m mt-2">{errorMessage}</div>}
            </Form>
        )}
        </Formik>
    );
}

export const TransactionModal = ({ closeModal, transactions, setTransactions }) => {
    const { windowWidth, windowHeight } = useWindowSize();

    return (
        <div id="TransactionModal" className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className={`modal-content bg-white p-8 rounded-lg shadow-lg h-5/6 flex flex-col ${windowWidth > 900 ? 'w-1/2' : 'w-4/5'}`}> 
            <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-project-blue border-b-2 border-project-blue inline pb-1">Transação</h2>
            </div>
            <TransactionForms closeModal={closeModal} transactions={transactions} setTransactions={setTransactions} />
            <div className="flex-grow"></div>
            <div className="flex justify-center mt-4">
            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600" onClick={closeModal}>Fechar</button>
            </div>
        </div>
        </div>
    );
}


export default TransactionModal;
