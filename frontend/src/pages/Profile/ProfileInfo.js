import React from 'react';
import { FaEdit } from "react-icons/fa";

function ProfileInfo({ user, openEditModal }) {
  return (
    <>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Senha:</strong> {user.senha}</p>
      <button className="btn" onClick={openEditModal}>
        <FaEdit size={20}/>
      </button>
    </>
  );
}

export default ProfileInfo;
