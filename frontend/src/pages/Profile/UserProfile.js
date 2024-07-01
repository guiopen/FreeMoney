import React, { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import AddFriend from './AddFriend';
import FieldEditModal from './FieldEditModal';
import FriendSummaryModal from './FriendSummaryModal';
import { fetchUserData } from "../../endpoint";
import { useAuth } from "../Authentication/AuthContext";

function UserProfile() {
  const [isFieldEditModalOpen, setIsFieldEditModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [activeTab, setActiveTab] = useState('perfil');
  const { token } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [friendHistory, setFriendHistory] = useState([]);

  const handleFetchUserData = async () => {
    try {
      const data = await fetchUserData(token);
      console.log('Dados do usuário:', data);
      setUserData({ name: data.name, email: data.email, password: data.password });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    handleFetchUserData();
  }, [token]);

  const openFieldEditModal = (field) => {
    setActiveField(field);
    setIsFieldEditModalOpen(true);
  };

  const closeModal = () => {
    setIsFieldEditModalOpen(false);
    setActiveField(null);
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
            <ProfileInfo userData={userData} openFieldEditModal={openFieldEditModal} />
          ) : (
            <AddFriend userData={userData} openFriendSummaryModal={FriendSummaryModal} setFriendHistory={setFriendHistory} />
          )}
        </div>
      </div>

      {isFieldEditModalOpen && (
        <FieldEditModal 
          field={activeField}
          userData={userData}
          closeModal={closeModal}
          updateUser={updateUser}
        />
      )}
    </div>
  );
}

export default UserProfile;
