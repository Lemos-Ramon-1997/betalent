# Projeto AdonisJS - Autenticação com Docker

Este projeto é uma API de autenticação construída com AdonisJS, utilizando Docker para facilitar o ambiente de desenvolvimento.

## Funcionalidades
- Cadastro de usuário (register)
- Login de usuário (login)
- Logout
- Consulta de usuário autenticado (me)
- Validação de dados com VineJS

## Requisitos
- Node.js >= 18
- Docker e Docker Compose

## Como rodar o projeto

1. **Clone o repositório:**
   ```powershell
   git clone <url-do-repositorio>
   cd <nome-da-pasta>
   ```

2. **Suba os containers Docker:**
   ```powershell
   docker-compose up -d
   ```

3. **Instale as dependências:**
   ```powershell
   npm install
   ```

4. **Rode as migrations:**
   ```powershell
   node ace migration:run
   ```

5. **(Opcional) Rode os seeders:**
   ```powershell
   node ace db:seed
   ```

6. **Inicie o servidor:**
   ```powershell
   node ace serve --watch
   ```

## Rotas principais

- `POST /register` - Cadastro de usuário
- `POST /login` - Login de usuário
- `POST /logout` - Logout
- `GET /me` - Dados do usuário autenticado

## Observações
- Para criar usuários manualmente no banco, lembre-se de hashear a senha.
- O token de acesso é gerado no login ou cadastro.

## Licença
MIT
