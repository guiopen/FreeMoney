# FreeMoney
FreeMoney é um projeto para a matéria de Programação Web com o objetivo de ajudar o usuário a controlar e monitorar seus gastos. Inspirado por OinKoin: https://f-droid.org/pt/packages/com.github.emavgl.piggybankpro

![freemoney-small](https://github.com/guiopen/FreeMoney/assets/94094527/52724a27-d1c2-413f-bc86-13c9a39b090f)

fluxo do backend:
Tudo começa no server.js, que é o nosso executável. Lá ele importa o arquivo routes, que define todos os pontos de comunicação do front com o servidor. Nesse arquivo route, cada ponto de comunicação é também um controlador responsável pelo fluxo da aplicação, onde vai ser analisada a requisição e chamar um serviço adequado. Os serviços são a parte principal do código, são eles que vão conter as informações de como autenticar o usuário, como tratar os dados recebidos, etc... E são eles que vão acessar os modelos, que acessam o banco de dados. Os modelos além de acessarem o banco de dados também definem uma estrutura própria do mongodb sobre a formatação desses dados.


Equipe: Alexandre Conte, Guilherme Amaral, Jiliard Peifer, Olavo Ançai e Marina Benvenuti.
