import React from 'react';
import { FaEdit } from "react-icons/fa";

function ProfileInfo({ user, openEditModal }) {
  return (
    <div className="profile-info">
      <p><strong>Nome:</strong> {user.nome}</p>
      <hr className="profile-info-divider" />
      <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
      <hr className="profile-info-divider" />
      <p><strong>Email:</strong> {user.email}</p>
      <hr className="profile-info-divider" />
      <p><strong>Senha:</strong> {user.senha}</p>
      <hr className="profile-info-divider" />
      <button className="btn" onClick={openEditModal}>
        <FaEdit size={20}/>
      </button>
    </div>
  );
}

export default ProfileInfo;
