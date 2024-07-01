import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateUser } from '../../endpoint';

const FieldEditModal = ({ field, userData, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const formik = useFormik({
    initialValues: {
      value: userData[field] || '',
      currentPassword: '',
    },
    validationSchema: Yup.object().shape({
      value: field !== 'password' ? Yup.string().required('Campo obrigatório') : Yup.string(),
      currentPassword: Yup.string().required('Campo obrigatório para verificação de senha'),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        const updatedData = { ...userData };
    
        if (field === 'password') {
          updatedData.newPassword = values.value;  
          updatedData.currentPassword = values.currentPassword;
        } else {
          updatedData[field] = values.value;
        }
    
        try {
          const token = localStorage.getItem('token');
          const response = await updateUser(updatedData, token);
          console.log(updatedData)
          if (response.ok) {
            console.log('Dados do usuário atualizados com sucesso!');
          } else {
            const errorData = await response.json();
            console.error('Erro ao atualizar dados do usuário:', errorData.message);
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    },    
  });

  useEffect(() => {
    formik.setValues({ value: userData[field], currentPassword: '' });
  }, [userData, field]);

  const fieldLabels = {
    name: 'Nome',
    email: 'Email',
    password: 'Senha Nova',
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-center'>
          <h2 className="text-lg font-bold mb-6 text-blue-600 border-b-2 border-blue-600 inline pb-1">Editar {fieldLabels[field]}</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">{fieldLabels[field]}</label>
            <div className="flex items-center">
              {field !== 'password' ? (
                <input
                  type="text"
                  id="value"
                  name="value"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.value}
                  autoComplete="off"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="value"
                    name="value"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.value}
                    autoComplete="off"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>
              )}
            </div>
            {formik.touched.value && formik.errors.value ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.value}</div>
            ) : null}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Senha Atual</label>
            <div className="flex items-center">
              <div className="relative w-full">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  autoComplete="off"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {showCurrentPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              </div>
            </div>
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.currentPassword}</div>
            ) : null}
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
              onClick={closeModal}
            >
              Fechar
            </button>
            <button
              type="submit"
              disabled={!formik.isValid}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600 ${!formik.isValid && 'opacity-50 cursor-not-allowed'}`}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldEditModal;
