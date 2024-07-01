import React from 'react';
import { FaEdit } from "react-icons/fa";

function ProfileInfo({ userData, openFieldEditModal }) {
  return (
    <div className="profile-info">
      <hr className="profile-info-divider" />
      <div className="flex items-center justify-between mb-2">
        <p><strong>Nome:</strong> {userData.name}</p>
        <FaEdit 
          className="ml-2 cursor-pointer" 
          size={20} 
          onClick={() => openFieldEditModal('name')} 
        />
      </div>
      <hr className="profile-info-divider" />
      <div className="flex items-center justify-between mb-2">
        <p><strong>Email:</strong> {userData.email}</p>
        <FaEdit 
          className="ml-2 cursor-pointer" 
          size={20} 
          onClick={() => openFieldEditModal('email')} 
        />
      </div>
      <hr className="profile-info-divider" />
      <div className="flex items-center justify-between mb-2">
        <p><strong>Senha:</strong> *********</p>
        <FaEdit 
          className="ml-2 cursor-pointer" 
          size={20} 
          onClick={() => openFieldEditModal('password')} 
        />
      </div>
      <hr className="profile-info-divider" />
      <p><strong>Código:</strong> {userData.code}</p>
    </div>
  );
}

export default ProfileInfo;
