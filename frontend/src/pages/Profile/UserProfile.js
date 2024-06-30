import React, { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import AddFriend from './AddFriend';
import EditModal from './EditModal';
import FriendSummaryModal from './FriendSummaryModal';
import { fetchUserData } from "../../endpoint";
import { useAuth } from "../Authentication/AuthContext";

function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFriendSummaryModalOpen, setIsFriendSummaryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');
  const { token } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', code: '' });
  const [friendHistory, setFriendHistory] = useState([]);

  const handleFetchUserData = async () => {
    try {
      const data = await fetchUserData(token);
      console.log('Dados do usuário:', data);
      setUserData({ name: data.name, email: data.email, code: data.code });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    handleFetchUserData();
  }, [token]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openFriendSummaryModal = () => {
    setIsFriendSummaryModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsFriendSummaryModalOpen(false);
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
                activeTab === 'perfil'
                  ? "text-sm md:text-lg font-bold text-project-blue border-b-2 border-project-blue hover:border-black hover:text-black transition-colors"
                  : "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
              }
            >
              Seu Perfil
            </button>
            <button
              type="button"
              onClick={switchToFriends}
              className={
                activeTab === 'amigos'
                  ? "text-sm md:text-lg font-bold text-project-blue border-b-2 border-project-blue hover:border-black hover:text-black transition-colors"
                  : "text-sm md:text-lg font-bold hover:text-project-blue transition-colors"
              }
            >
              Amigos
            </button>
          </div>
          {activeTab === 'perfil' ? (
            <ProfileInfo userData={userData} openEditModal={openEditModal} />
          ) : (
            <AddFriend userData={userData} openFriendSummaryModal={openFriendSummaryModal} setFriendHistory={setFriendHistory} />
          )}
        </div>
      </div>

      {isEditModalOpen && <EditModal userData={userData} closeModal={closeModal} updateUser={updateUser} />}
      {isFriendSummaryModalOpen && <FriendSummaryModal closeModal={closeModal} history={friendHistory} />}
    </div>
  );
}

export default UserProfile;