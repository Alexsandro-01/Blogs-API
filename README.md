# Blogs API

Esse projeto foi desenvolvido como avaliação de aprendizado do ORM `Sequelize`, usado para comunicação com Banco de Dados.
Blogs API foi criada para gerenciamento de conteúdo de um Blog. Podendo assim criar, ler, atualizar e deletar Posts e usuários.

### Tecnologias utlizadas:
* NodeJs
* Express
* JWT token
* Sequelize
* MySQL

## Utilizando o projeto

### Requisitos para rodar a API

Para que a API funcione como o esperado precisamos ter o Banco de dados MySQL instalado ou rodando em um Container Docker.
A API usa variáveis de ambiente para algumas configurações. Na raiz do repositório clonado na sua máquina crie um arquivo chamdo `.env` com o conteúdo a seguir.
> Troque o conteúdo das variáveis MYSQL para as cconfiguradas no Banco de Dados da sua máquina.

~~~
#### SERVER VARS
NODE_ENV=development
API_PORT=3000

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs-api
MYSQL_USER=root
MYSQL_PASSWORD=root

#### SECRECT VARS
JWT_SECRET=ChaveSecretaParaOJWT
~~~

1. Primeiro precisamos clonar o repositório.
~~~bash
git clone git@github.com:Alexsandro-01/Blogs-API.git
~~~

2. Depois do repositório clonado e já no diretório do repositório, vamos instalar as dependências.

~~~bash
npm install
~~~

3. Agora para o `Sequelize`  criar o Banco de dados e as tabelas usadas pela API.

~~~bash
npm prestart
~~~

4. Finalmente para subir os serviços da API.
~~~bash
npm start
~~~

5. A API foi documentada usando o `Swagger` (estou aprendendo a usar), para ter acesso a quais as rotas disponivéis na API, acesse a rota `http://localhost:3000/doc/` no seu navegador e verá uma página semelhante a essa:

# video here

6. Ao fazer o login na API é devolvido um `token` e muitas rotas usam esse token para validar se o usuário é valido. O token é esperado no Header da requisição na chave `Authorization: token aqui`. Todas as rotas validam os dados esperados, caso algum não seja passado ou estaje em um formato inválido, a aplicação avisará.

Obrigado pela atenção e fico aberto a contato e feedbacks :)