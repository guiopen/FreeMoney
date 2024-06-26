// Importe necessário para o componente UserProfile
import React, { useState } from 'react';
import { useFormik } from 'formik';
import '../App.css'; // Certifique-se de ter um arquivo App.css com os estilos necessários
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil'); // Estado para controlar a aba ativa

  const user = {
    nome: 'João Silva',
    dataNascimento: '01/01/1990',
    email: 'joao.silva@example.com',
    senha: '********',
    amigos: [
      { nome: 'Amigo 1', email: 'amigo1@example.com' },
      { nome: 'Amigo 2', email: 'amigo2@example.com' },
      { nome: 'Amigo 3', email: 'amigo3@example.com' },
    ]
  };

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: ''
    },
    onSubmit: (values) => {
      console.log(values); // Aqui você pode enviar os dados para a API ou fazer o que for necessário com eles
      resetForm();
      closeModal();
    },
  });

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openAddFriendModal = () => {
    setIsAddFriendModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsAddFriendModalOpen(false);
  };

  const resetForm = () => {
    formik.resetForm();
  };

  const switchToProfile = () => {
    setActiveTab('perfil');
  };

  const switchToFriends = () => {
    setActiveTab('amigos');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D8FDFF]">
      <div className="bg-white w-4/5 md:w-3/5 shadow-md rounded-lg flex justify-between mx-auto mt-20 max-w-3xl flex flex-col relative">
        <div className="p-4 md:p-8 w-full">
          <h1 className="text-center text-xl font-bold mb-6">
            <span
              className={`cursor-pointer transition-colors ${activeTab === 'perfil' ? 'text-project-blue border-b-2 border-[#3298AB]' : 'text-black hover:text-project-blue'}`}
              onClick={switchToProfile}
            >
              Seu Perfil
            </span>
            <span className="mx-4">|</span>
            <span
              className={`cursor-pointer transition-colors ${activeTab === 'amigos' ? 'text-project-blue border-b-2 border-[#3298AB]' : 'text-black hover:text-project-blue'}`}
              onClick={switchToFriends}
            >
              Amigos
            </span>
          </h1>
          <div className="profile-info">
            {activeTab === 'perfil' && (
              <>
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Senha:</strong> {user.senha}</p>
                <button className="btn" onClick={openEditModal}>
                  <FaEdit size={20}/>
                </button>
              </>
            )}
            {activeTab === 'amigos' && (
              <>
                <button className="btn" onClick={openAddFriendModal}>
                  <FaPlus size={20} />
                </button>
                <div>
                  {user.amigos.map((amigo, index) => (
                    <div key={index} className="border-b border-gray-300 py-2">
                      <p><strong>Nome do Amigo:</strong> {amigo.nome}</p>
                      <p><strong>Email do Amigo:</strong> {amigo.email}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Edição de Perfil */}
      {isEditModalOpen && (
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

      {/* Modal de Adicionar Amigo */}
      {isAddFriendModalOpen && (
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
                <button type="submit" className="bg-project-blue text-white font-bold py-2 px-4 rounded">Enviar Pedido</button>
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
