import React from 'react';
import { FaEdit } from "react-icons/fa";

function ProfileInfo({ userData, openEditModal }) {
  return (
    <div className="profile-info">
      <hr className="profile-info-divider" />
      <p><strong>Nome:</strong> {userData.name}</p>
      <hr className="profile-info-divider" />
      <p><strong>Email:</strong> {userData.email}</p>
      <hr className="profile-info-divider" />
      <p><strong>Código:</strong> {userData.code}</p>
      <hr className="profile-info-divider" />
      <button className="btn" onClick={openEditModal}>
        <FaEdit size={20}/>
      </button>
    </div>
  );
}

export default ProfileInfo;
