import React from 'react';
import { useFormik } from 'formik';

function AddFriend({openFriendSummaryModal}) {
  const formik = useFormik({
    initialValues: {
      friendName: '',
      friendEmail: ''
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="add-friend-form">
        <form id="add-friend-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6 text-left">
            <label htmlFor="friendName">Email do amigo:</label>
            <input
              type="text"
              name="friendName"
              id="friendName"
              autoComplete="off"
              className="block w-full border border-gray-300 rounded py-2 px-3"
              value={formik.values.friendName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="friendEmail">Código</label>
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
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="bg-project-blue text-white px-4 py-2 rounded-md hover:bg-project-hover-blue focus:outline-none focus:bg-blue-600 mr-2" onClick={openFriendSummaryModal}>Visualizar Histórico do Amigo</button>
          </div>
        </form>
      </div>
  
    </>
  );
}

export default AddFriend;
