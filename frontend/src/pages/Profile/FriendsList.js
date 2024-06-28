import React from 'react';
import { FaPlus } from "react-icons/fa";

function FriendsList({ user, openAddFriendModal }) {
  return (
    <>
      <button className="btn" onClick={openAddFriendModal}>
        <FaPlus size={20} />
      </button>
      <div className="friends-list">
        {user.amigos.map((amigo, index) => (
          <div key={index} className="friend-item">
            <p><strong>Nome do Amigo:</strong> {amigo.nome}</p>
            <p><strong>Email do Amigo:</strong> {amigo.email}</p>
            <hr className="friend-info-divider" />
          </div>
        ))}
      </div>
    </>
  );
}

export default FriendsList;
