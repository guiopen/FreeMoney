import React from 'react';
import Summary from '../UserSummary/Summary.js';

function FriendSummaryModal({ closeModal }) {
  return (
    <div id="addFriendModal" className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto">
        <div className='flex justify-center'>
          <h2 className="text-lg font-bold mb-6 text-project-blue border-b-2 border-project-blue inline pb-1">Resumo do Usuário</h2>
        </div>
        <Summary />
        <div className="flex justify-center mt-4">
          <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600" onClick={closeModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default FriendSummaryModal;
