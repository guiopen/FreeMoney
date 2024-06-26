import React, { useState } from 'react';
import { useFormik } from 'formik';
import '../App.css';
import { FaEdit } from "react-icons/fa";

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    nome: 'João Silva',
    dataNascimento: '01/01/1990',
    email: 'joao.silva@example.com',
    senha: '********'
  };

  const formik = useFormik({
    initialValues: {
      nome: user.nome,
      dataNascimento: user.dataNascimento,
      email: user.email,
      senha: user.senha,
    },
    onSubmit: (values) => {
      console.log(values);
      closeModal();
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D8FDFF]">
      <div className="bg-white w-4/5 md:w-3/5 shadow-md rounded-lg flex justify-between mx-auto mt-20 max-w-3xl flex flex-col">
        <div className="p-4 md:p-8 w-full">
          <h1 className="text-center text-xl font-bold mb-6">Seu Perfil</h1>
          <div className="profile-info">
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Senha:</strong> {user.senha}</p>
            <button className="btn btn-edit mt-4" onClick={openModal}>
              <FaEdit size={20}/>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
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
      )}
    </div>
  );
}

export default UserProfile;
