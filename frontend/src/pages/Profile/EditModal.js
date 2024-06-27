import React from 'react';
import { useFormik } from 'formik';

const placeholders = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'senha', label: 'Senha', type: 'password' },
];

const EditModal = ({ closeModal }) => {
  const formik = useFormik({
    initialValues: {
      nome: '',
      dataNascimento: '',
      email: '',
      senha: ''
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      closeModal(); // Fechar o modal após o envio do formulário
    },
  });

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-project-blue border-b-2 border-project-blue inline pb-1">Editar Informações</h2>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="bg-project-blue text-white px-4 py-2 rounded-md hover:bg-project-hover-blue focus:outline-none focus:bg-blue-600 mr-2"
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
