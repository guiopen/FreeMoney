import React from 'react';
import { useFormik } from 'formik';

const placeholders = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'senha', label: 'Senha', type: 'password' },
];

const EditModal = ({ user, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      nome: user.nome,
      dataNascimento: user.dataNascimento,
      email: user.email,
      senha: user.senha
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          console.log('Dados atualizados com sucesso!');
          formik.resetForm();
          closeModal();
          // Aqui poderíamos atualizar os dados no frontend, se necessário
        } else {
          console.error('Falha ao atualizar os dados');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    },
  });

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-blue-600 border-b-2 border-blue-600 inline pb-1">Editar Informações</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {placeholders.map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                autoComplete="off"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors[field.name]}</div>
              ) : null}
            </div>
          ))}
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
