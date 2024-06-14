import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../components/Logo';

const LoginPage = () => {
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const users = [
        { email: 'user1@example.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' }
    ];

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Formato de e-mail inválido').required('Obrigatório'),
                password: Yup.string().required('Obrigatório')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    const user = users.find(user => user.email === values.email && user.password === values.password);
                    if (user) {
                        login();
                        setErrorMessage('');
                    } else {
                        setErrorMessage('E-mail ou senha incorretos');
                    }
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <div className="flex justify-between items-center h-screen bg-[#D8FDFF] ">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md ml-40">
                        <div className="flex justify-between mb-6 space-x-2 mx-8">
                            <button
                                type="button"
                                onClick={() => console.log('cadastro')}
                                className="text-lg font-bold hover:text-[#3298AB] transition-colors ml-20"
                            >
                                Registrar
                            </button>
                            <div className='mr-20'>
                                <button
                                    type="button"
                                    className="text-lg font-bold text-[#3298AB] border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors mr-20"
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                        <Form>
                            <div className="mb-4 relative">
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
                                    placeholder= 'email@email.com'
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
                    </div>
                    <Logo />
                </div>
            )}
        </Formik>
    );
};

export default LoginPage;
