import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendRegisterCommand } from './utils/registerUtils';

const RegisterComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
        sendRegisterCommand(values)
        .then(response => {
          console.log(response)
          if (response.ok) {
            setErrorMessage('')
            response.json().then(success => setSuccessMessage(success.message));
          } else {
            setSuccessMessage('')
            response.json()
            .then(error => setErrorMessage(error.message))
            .catch(jsonError => {setErrorMessage("Erro no servidor"); console.log(jsonError)});
          }
        })
        .catch(error => {
          console.log(error)
          setSuccessMessage('')
          setErrorMessage("Erro ao cadastrar usuário");
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
          {errorMessage && <div className="text-red-500 text-lg mt-2">{errorMessage}</div>}
          {successMessage && <div className="text-green-700 text-lg mt-2">{successMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterComponent;