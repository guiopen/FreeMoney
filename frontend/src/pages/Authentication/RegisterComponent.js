import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendRegisterCommand } from './utils/registerUtils';

const RegisterComponent = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Formato de e-mail inválido').required('Obrigatório'),
        password: Yup.string().required('Obrigatório'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais')
          .required('Confirmação de senha obrigatória'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        sendRegisterCommand(values, setSubmitting)
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
          <div className="mb-4 relative">
            <Field
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
              placeholder='Confirmar Senha'
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-1 p-2 w-full border rounded-md text-white hover:bg-blue-600"
              style={{ backgroundColor: '#3298AB' }}
              disabled={formik.isSubmitting}
            >
              Cadastro
            </button>
          </div>
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterComponent;