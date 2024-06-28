import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const EditModal = ({ user, closeModal }) => {
  // Verifica se user está definido
  if (!user) {
    return null; // Retorna null ou uma mensagem de erro, dependendo do comportamento desejado
  }

  const formik = useFormik({
    initialValues: {
      nome: user.nome,
      dataNascimento: user.dataNascimento,
      email: user.email,
      senha: user.senha,
    },
    onSubmit: async (values) => {
      try {
        // Faz a requisição para atualizar os dados do usuário
        const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, values);
        
        // Atualiza os dados do usuário localmente (opcional, se a API já retornar os dados atualizados)
        // setUser(response.data);

        console.log('Dados atualizados:', response.data);

        formik.resetForm();
        closeModal(); // Fecha o modal após a atualização
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
      }
    },
  });

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-project-blue border-b-2 border-project-blue inline pb-1">Editar Informações</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
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
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dataNascimento}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.dataNascimento && formik.errors.dataNascimento ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.dataNascimento}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.senha}
              autoComplete="new-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.senha && formik.errors.senha ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.senha}</div>
            ) : null}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-project-blue text-white px-4 py-2 rounded-md hover:bg-project-hover-blue focus:outline-none focus:bg-blue-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
