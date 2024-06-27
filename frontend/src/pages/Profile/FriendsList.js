import React from 'react';
import { FaPlus } from "react-icons/fa6";

function FriendsList({ user, openAddFriendModal }) {
  return (
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
  );
}

export default FriendsList;
