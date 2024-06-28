// components/UserProfile/UserProfile.js
import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import FriendsList from './FriendsList';
import EditModal from './EditModal';
import AddFriendModal from './AddFriendModal';

function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  const [userData, setUserData] = useState({
    nome: 'João Silva',
    dataNascimento: '1990-01-01',
    email: 'joao.silva@example.com',
    senha: '********',
    amigos: [
      { nome: 'Amigo 1', email: 'amigo1@example.com' },
      { nome: 'Amigo 2', email: 'amigo2@example.com' },
      { nome: 'Amigo 3', email: 'amigo3@example.com' },
    ]
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

  const switchToProfile = () => {
    setActiveTab('perfil');
  };

  const switchToFriends = () => {
    setActiveTab('amigos');
  };

  const updateUser = (updatedData) => {
    setUserData(updatedData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-4/5 md:w-2/5 shadow-md rounded-lg flex justify-between mx-auto mt-20 max-w-3xl flex flex-col relative">
        <div className='p-4 md:p-8 w-full'>
          <div className="flex justify-center mb-6 space-x-6 mx-8">
            <button
              type="button"
              onClick={switchToProfile}
              className={
                activeTab === 'perfil' ?
                  "text-sm md:text-lg font-bold text-blue-600 border-b-2 border-blue-600 hover:border-black hover:text-black transition-colors" :
                  "text-sm md:text-lg font-bold hover:text-blue-600 transition-colors"
              }
            >
              Seu Perfil
            </button>
            <button
              type="button"
              onClick={switchToFriends}
              className={
                activeTab === 'amigos' ?
                  "text-sm md:text-lg font-bold text-blue-600 border-b-2 border-blue-600 hover:border-black hover:text-black transition-colors" :
                  "text-sm md:text-lg font-bold hover:text-blue-600 transition-colors"
              }
            >
              Amigos
            </button>
          </div>
          {
            activeTab === 'perfil'
              ? <ProfileInfo user={userData} openEditModal={openEditModal} />
              : <FriendsList user={userData} openAddFriendModal={openAddFriendModal} />
          }
        </div>
      </div>

      {isEditModalOpen && <EditModal user={userData} closeModal={closeModal} updateUser={updateUser} />}
      {isAddFriendModalOpen && <AddFriendModal closeModal={closeModal} />}
    </div>
  );
}

export default UserProfile;
