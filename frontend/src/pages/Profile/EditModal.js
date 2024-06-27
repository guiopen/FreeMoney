import React from 'react';
import { useFormik } from 'formik';

function EditModal({ closeModal }) {
  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      dataNascimento: '',
      senha: ''
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      closeModal();
    },
  });

  return (
    <div id="editModal" className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-bold mb-6">Editar Informações</h2>
        <form id="edit-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6 text-right">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="modal-nome"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-6 text-right">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              id="modal-dataNascimento"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.dataNascimento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-6 text-right">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="modal-email"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-6 text-right">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="modal-senha"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.senha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-project-blue text-white font-bold py-2 px-4 rounded">Salvar</button>
            <button type="button" className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
