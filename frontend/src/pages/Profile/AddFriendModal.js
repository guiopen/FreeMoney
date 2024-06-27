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
        <div className='flex justify-center'>
            <h2 className="text-lg font-bold mb-6 text-project-blue border-b-2 border-project-blue inline pb-1">Adicionar amigo</h2>
        </div>
        <form id="add-friend-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6 text-left">
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
          <div className="mb-6 text-left">
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
          <div className="flex justify-center gap-4">
            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="bg-project-blue text-white px-4 py-2 rounded-md hover:bg-project-hover-blue focus:outline-none focus:bg-blue-600 mr-2">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFriendModal;
