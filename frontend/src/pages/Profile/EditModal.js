import React, { useEffect } from 'react';
import { useFormik } from 'formik';

const EditModal = ({ userData, closeModal, updateUser }) => {
  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
      code: userData.code
    },
    onSubmit: async (values) => {
      const dadosAtualizados = { ...values };

      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar usuário');
        }

        updateUser(dadosAtualizados);
        closeModal(); // Fechar o modal após o envio do formulário
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: userData.name,
      email: userData.email,
      code: userData.code
    });
  }, [userData]);

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-blue-600 border-b-2 border-blue-600 inline pb-1">Editar Informações</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nome}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.nome && formik.errors.nome ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.nome}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formik.values.code}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
