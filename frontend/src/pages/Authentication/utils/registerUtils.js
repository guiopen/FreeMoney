export const sendRegisterCommand = (values) => {
  return fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: values.email, password: values.password })
  });
};