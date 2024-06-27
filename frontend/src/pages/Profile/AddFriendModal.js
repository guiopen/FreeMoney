import React from 'react';
import { useFormik } from 'formik';

function AddFriendModal({ closeModal }) {
  const formik = useFormik({
    initialValues: {
      friendName: '',
      friendEmail: ''
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      closeModal();
    },
  });

  return (
    <div id="addFriendModal" className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-bold mb-6">Adicionar Amigo</h2>
        <form id="add-friend-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6 text-right">
            <label htmlFor="friendName">Nome do Amigo</label>
            <input
              type="text"
              name="friendName"
              id="modal-friendName"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.friendName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-6 text-right">
            <label htmlFor="friendEmail">Email do Amigo</label>
            <input
              type="email"
              name="friendEmail"
              id="modal-friendEmail"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.friendEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-project-blue text-white font-bold py-2 px-4 rounded">Adicionar</button>
            <button type="button" className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFriendModal;
