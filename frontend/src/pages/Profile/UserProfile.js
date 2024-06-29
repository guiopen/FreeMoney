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
    senha: 'senha1234'
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
    <div className="flex justify-center items-center h-screen bg-[#D8FDFF]">
      <div className="bg-white w-4/5 md:w-2/5 shadow-md rounded-lg flex justify-between mx-auto mt-20 max-w-3xl flex flex-col relative">
        <div className='p-4 md:p-8 w-full'>
          <div className="flex justify-center mb-6 space-x-6 mx-8">
            <button
              type="button"
              onClick={switchToProfile}
              className={
                activeTab === 'perfil' ?
                  "text-sm md:text-lg font-bold text-project-blue border-b-2 border-project-blue hover:border-black hover:text-black transition-colors" :
                  "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
              }
            >
              Seu Perfil
            </button>
            <button
              type="button"
              onClick={switchToFriends}
              className={
                activeTab === 'amigos' ?
                  "text-sm md:text-lg font-bold text-project-blue border-b-2 border-project-blue hover:border-black hover:text-black transition-colors" :
                  "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
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
