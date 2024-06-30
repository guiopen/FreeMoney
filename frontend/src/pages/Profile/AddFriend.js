import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchFriendHistory } from '../../endpoint';

function AddFriend({ openFriendSummaryModal, setFriendHistory }) {
  const [errorMessage, setErrorMessage] = useState('');

  const testFriendHistory = async (friendEmail, friendCode) => {
    setErrorMessage('');

    try {
      const response = await fetchFriendHistory(friendEmail, friendCode);
      if (response.ok) {
        const data = await response.json();
        setFriendHistory(data.history);
        openFriendSummaryModal();
        console.log('Histórico do amigo:', data.history);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao buscar histórico');
        console.error('Erro ao buscar histórico:', errorData.message);
      }
    } catch (error) {
      setErrorMessage('Erro na requisição');
      console.error('Erro na requisição:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      friendEmail: '',
      friendCode: ''
    },
    validationSchema: Yup.object({
      friendEmail: Yup.string().email('Formato de e-mail inválido').required('Obrigatório'),
      friendCode: Yup.string().required('Obrigatório')
    }),
    onSubmit: (values) => {
      console.log(values);
      testFriendHistory(values.friendEmail, values.friendCode);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="add-friend-form">
        <form id="add-friend-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6 text-left">
            <label htmlFor="friendEmail">Email do amigo:</label>
            <input
              type="email"
              name="friendEmail"
              id="friendEmail"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.friendEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.friendEmail && formik.errors.friendEmail ? (
              <div className="text-red-500 text-sm">{formik.errors.friendEmail}</div>
            ) : null}
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="friendCode">Código</label>
            <input
              type="text"
              name="friendCode"
              id="friendCode"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.friendCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.friendCode && formik.errors.friendCode ? (
              <div className="text-red-500 text-sm">{formik.errors.friendCode}</div>
            ) : null}
          </div>
          {errorMessage && <div className="text-red-500 text-sm my-4 text-center">{errorMessage}</div>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-project-blue text-white px-4 py-2 rounded-md hover:bg-project-hover-blue focus:outline-none focus:bg-blue-600 mr-2"
            >
              Visualizar Histórico do Amigo
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddFriend;
