
// função inicial para testes, deve ser convertida para uma promise e resolvida no RegisterComponent
export const sendRegisterCommand = async (values, setSubmitting) => {
    console.log(values)
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: values.email, password: values.password})
      });

      if (!response.ok) {
        const errorData = await response.json(); // Tentar obter dados de erro da resposta
        throw new Error(`Erro ao registrar usuário: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('Usuário registrado com sucesso:', data);
      // Faça algo com a resposta do servidor, como redirecionar o usuário
    } catch (error) {
      console.error('Erro na requisição:', error);
      // Lidar com o erro, como exibir uma mensagem de erro ao usuário
    }
  };