export const sendLoginCommand = (values) => {
  return fetch('/login_user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
  });
};


export const sendRegisterCommand = (values) => {
    return fetch('/register_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
    });
};

export const fetchUserData = async (token) => {

  if (!token) {
    console.error('Usuário não autenticado!');
    return Promise.reject('Usuário não autenticado'); 
  }

  try {
    const response = await fetch('/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      const errorData = await response.json();
      console.error('Erro ao buscar dados do usuário:', errorData.message);
      return Promise.reject(errorData.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return Promise.reject('Erro na requisição');
  }
};

export const fetchFriendHistory = (email, code) => {
    return fetch(`/friend_history?email=${email}&code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
};


export const addTransaction = async (transactionData, token) => {
  return fetch('/add_transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assuming you are using Bearer token for authentication
    },
    body: JSON.stringify(transactionData)
  });
};
  export const updateUser = async (userData, token) => {
    return fetch('/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };
