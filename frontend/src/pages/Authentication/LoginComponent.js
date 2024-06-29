import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendLoginCommand } from '../../endpoint';

const LoginComponent = () => {
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Formato de e-mail inválido').required('Obrigatório'),
                password: Yup.string().required('Obrigatório')
            })}
            onSubmit={(values, { setSubmitting }) => {
                sendLoginCommand(values)
                    .then(response => {
                        const isJson = response.headers.get('Content-Type')?.includes('application/json');
                        if (response.ok && isJson) {
                            return response.json();
                        } else {
                            setErrorMessage('Erro ao realizar login');
                            setSubmitting(false);
                            return null;
                        }
                    })
                    .then(data => {
                        if (data && data.token) {
                            login(data.token);
                            setErrorMessage('');
                        } else if (data) {
                            setErrorMessage(data.message || 'Erro ao realizar login');
                        }
                    })
                    .catch(error => {
                        setErrorMessage('Erro ao realizar login');
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {formik => (
                <Form>
                    <div className="mb-4 relative">
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
                            placeholder='Email'
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4 relative">
                        <Field
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
                            placeholder='Senha'
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </span>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="mt-1 p-2 w-full border rounded-md text-white hover:bg-blue-600"
                            style={{ backgroundColor: '#3298AB' }}
                            disabled={formik.isSubmitting}
                        >
                            Login
                        </button>
                    </div>
                    {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
                </Form>
            )}
        </Formik>
    );
};

export default LoginComponent;
