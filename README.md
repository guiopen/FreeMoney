# FreeMoney

## Descrição

FreeMoney é uma aplicação web para controle financeiro pessoal que permite aos usuários gerenciar suas receitas e despesas de forma intuitiva e eficiente. Com recursos como visualização avançada do histórico financeiro, simulação de empréstimos e investimentos e a opção de compartilhar dados com amigos ou familiares, o Free Money oferece uma solução completa para organizar suas finanças. Feita para a disciplina de Programação WEB da ufsc, inspirado pelo aplicativo android OinKoin: https://f-droid.org/pt/packages/com.github.emavgl.piggybankpro

![Captura de tela de 2024-07-01 02-21-37](https://github.com/guiopen/FreeMoney/assets/94094527/ab7b20dc-f610-457f-b310-f55cdfe50b86)
![Captura de tela de 2024-07-01 03-04-20](https://github.com/guiopen/FreeMoney/assets/94094527/31d010f4-5aaf-496c-8f08-f61374e04af2)
![Captura de tela de 2024-07-01 02-21-00](https://github.com/guiopen/FreeMoney/assets/94094527/625adfa5-982b-42fc-9555-b6664dc015e4)
![Captura de tela de 2024-07-01 02-21-23](https://github.com/guiopen/FreeMoney/assets/94094527/6d3ee67e-a9b7-4148-9be8-fedabf08ad91)

## Funcionalidades

- **Cadastro de rendas e despesas:** Registre facilmente suas transações financeiras, categorizando-as como receita ou despesa.
- **Visualização avançada do histórico:** Tenha uma visão clara e detalhada de suas movimentações financeiras, permitindo uma análise precisa de seus gastos e ganhos.
- **Simulação de empréstimo ou investimento:** Planeje seus investimentos ou empréstimos com a ajuda de simuladores que fornecem projeções realistas.
- **Compartilhamento de histórico financeiro:** Compartilhe seu histórico com amigos, familiares ou consultores financeiros, facilitando o acompanhamento e planejamento em conjunto.

## Fluxo do Usuário

1. **Tela de Cadastro/Login:** Ao acessar o site, o usuário pode se cadastrar informando nome, email e senha, ou realizar o login caso já possua uma conta.
2. **Autenticação:** Após o login, uma sessão segura com JWT é criada, garantindo a segurança dos dados do usuário por um período de 3 horas.
3. **Tela Principal (Resumo):** A tela principal exibe um resumo das transações financeiras do usuário, permitindo a visualização e cadastro de novas movimentações.
4. **Simulações:** Acesse a seção de simulações para realizar projeções de investimentos ou empréstimos, auxiliando na tomada de decisões financeiras.
5. **Perfil:** Gerencie seus dados pessoais, como nome, email e senha. É possível também visualizar o histórico de um amigo informando o email e um código de 4 dígitos.
6. **Logout:** Encerre sua sessão a qualquer momento clicando no botão de logout.

## Instruções para Execução

Siga os passos abaixo para executar a aplicação localmente:

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/free-money.git
   ```
2. **Instalar Dependências:**
   Executar o comando abaixo tanto na pasta frontend quanto na pasta backend:
   ```bash
   npm install
   ```
4. **Configurar Variáveis de Ambiente (Backend):**
   - Crie um arquivo `.env` na raiz da pasta `backend`.
   - Adicione as seguintes variáveis:
     ```
     SECRET=chave_secreta_para_autenticacao
     MONGO_URL=url_para_o_banco_mongo
     ```
5. **Executar o Backend:**
   ```bash
   cd backend
   node .
   ```
6. **(opcional) Executar o Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   - A interface estará disponível em `http://localhost:3001` em uma build estática entregue pelo backend, ou opcionalmente em `http://localhost:3000` em modo debug caso a etapa 6 tenha sido executada.

## Roadmap

- Separação de transações por mês.
- Edição e exclusão de transações.
- Exclusão de conta do usuário.
- Adição de mais simulações financeiras.
- Implementação de um sistema de histórico compartilhado (ideal para casais ou famílias).

## Como Contribuir

Sinta-se à vontade para contribuir com sugestões, correções de bugs ou implementação de novas funcionalidades. Você pode:

- Abrir uma _issue_ descrevendo sua sugestão ou problema.
- Fazer um _fork_ do repositório, implementar sua solução e abrir um _pull request_.

--- 

Equipe: Alexandre Conte (21203399), Guilherme do Amaral Alves (23100746), Jiliard Mai Peifer (23103129), Olavo Ançay (21102220) e Marina Benvenuti Cardeal (23103131).
