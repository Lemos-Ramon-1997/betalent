
# BeTalent Tech - Sistema Multi-Gateway (AdonisJS)

API RESTful para gerenciamento de pagamentos multi-gateway, clientes, produtos e usuários, com autenticação, roles, fallback de gateways e integração pronta para TDD e Docker Compose.

## 🚀 Requisitos
- Node.js >= 18
- Docker e Docker Compose
- MySQL

## 📦 Como rodar o projeto


1. **Suba o ambiente Docker:**
   ```powershell
   docker-compose up -d
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```

3. **Rode as migrations:**
   ```powershell
   node ace migration:run
   ```

4. **(Opcional) Rode os seeders:**
   ```powershell
   node ace db:seed
   ```

5. **Inicie o servidor:**
   ```powershell
   node ace serve --watch
   ```

## 🗄 Estrutura do Banco de Dados

- users: email, password, role
- gateways: name, is_active, priority
- clients: name, email
- products: name, amount
- transactions: client, gateway, external_id, status, amount, card_last_numbers
- transaction_products: transaction_id, product_id, quantity


## 🛡️ Roles

- **ADMIN**: acesso total
- **MANAGER**: gerencia produtos e usuários
- **FINANCE**: gerencia produtos e realiza reembolso
- **USER**: acesso restrito ao próprio uso

## 🧪 Testes

```powershell
npm run test
```

## 🐳 Docker Compose

O projeto já inclui um `docker-compose.yml` com:
- MySQL
- Aplicação Node.js
- Mocks dos gateways (ajuste as portas/endpoints conforme necessário)

## 🛠️ Comandos Úteis

```powershell
# Rodar migrations
node ace migration:run

# Reverter migrations
node ace migration:rollback

# Rodar seeders
node ace db:seed

# Iniciar servidor em modo dev
node ace serve --watch
```


## 📚 Observações

- Todas as validações são feitas com VineJS.
- Mensagens de erro são retornadas em português.
- O sistema está pronto para adicionar novos gateways de forma modular.
- O fallback entre gateways segue a ordem de prioridade configurada.


## 📝 Coleção Postman

Incluí a coleção Postman no repositório para facilitar os testes das rotas e integrações. Basta importar o arquivo `betalent.postman_collection.json` no Postman e utilizar os exemplos prontos para cada endpoint.

---

## 📝 Cadastro do ADMIN

O seeder de usuário ADMIN apresente erro de hash, utilize a rota abaixo para cadastrar manualmente:

- `POST /auth/register` — Cadastro de usuário ADMIN

Exemplo de payload:
```json
{
  "name": "Novo",
  "surname": "Usuário",
  "email": "email@email.com",
  "password": "12345678",
  "role": "ADMIN"
}
```

---

MIT
