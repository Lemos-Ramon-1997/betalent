
# BeTalent Tech - Sistema Multi-Gateway (AdonisJS)

API RESTful para gerenciamento de pagamentos multi-gateway, clientes, produtos e usuários, com autenticação, roles, fallback de gateways e integração pronta para TDD e Docker Compose.

## 🚀 Requisitos
- Node.js >= 18
- Docker e Docker Compose
- MySQL

## 📦 Como rodar o projeto

1. **Clone o repositório:**
   ```powershell
   git clone <url-do-repositorio>
   cd <nome-da-pasta>
   ```

2. **Suba o ambiente Docker:**
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

## 🗄 Estrutura do Banco de Dados

- users: email, password, role
- gateways: name, is_active, priority
- clients: name, email
- products: name, amount
- transactions: client, gateway, external_id, status, amount, card_last_numbers
- transaction_products: transaction_id, product_id, quantity

## 🛣 Rotas do Sistema

### Rotas Públicas
- `POST /login` — Login de usuário
- `POST /transactions` — Realizar uma compra (multi-gateway)

### Rotas Privadas (JWT)
- `GET /users` — Listar usuários (ADMIN, MANAGER)
- `POST /users` — Criar usuário (ADMIN, MANAGER)
- `PUT /users/:id` — Atualizar usuário (ADMIN, MANAGER)
- `DELETE /users/:id` — Remover usuário (ADMIN)
- `GET /products` — Listar produtos (ADMIN, MANAGER, FINANCE)
- `POST /products` — Criar produto (ADMIN, MANAGER, FINANCE)
- `PUT /products/:id` — Atualizar produto (ADMIN, MANAGER, FINANCE)
- `DELETE /products/:id` — Remover produto (ADMIN, MANAGER)
- `GET /clients` — Listar clientes (ADMIN, MANAGER, FINANCE)
- `GET /clients/:id` — Detalhe do cliente + compras (ADMIN, MANAGER, FINANCE)
- `GET /transactions` — Listar todas as compras (ADMIN, MANAGER, FINANCE)
- `GET /transactions/:id` — Detalhes de uma compra (ADMIN, MANAGER, FINANCE)
- `POST /transactions/:id/refund` — Reembolso (FINANCE)
- `PATCH /gateways/:id/activate` — Ativar/desativar gateway (ADMIN)
- `PATCH /gateways/:id/priority` — Alterar prioridade do gateway (ADMIN)

> Todas as rotas privadas exigem autenticação e validação de role.

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

---

MIT
