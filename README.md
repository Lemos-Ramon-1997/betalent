
# BeTalent Tech - Sistema Multi-Gateway (AdonisJS)

API RESTful para gerenciamento de pagamentos multi-gateway, clientes, produtos e usuários, com autenticação, roles, fallback de gateways e integração pronta para TDD e Docker Compose.

## 🚀 Requisitos
- Docker e Docker Compose

## 📦 Como rodar o projeto



1. **Suba o ambiente Docker:**
   ```powershell
   docker-compose up --build -d
   ```

2. **Rode as migrations:**
   ```powershell
   docker exec -it adonis_app node ace migration:run
   ```

3. **(Opcional) Rode os seeders:**
   > Este comando irá adicionar os gateways, dois produtos e um cliente de exemplo.
   ```powershell
   docker exec -it adonis_app node ace db:seed
   ```
4. **Rode os testes:**
   ```powershell
   docker exec -it adonis_app npm run test
   ```



## 🗄 Estrutura do Banco de Dados

- users: email, password, role
- gateways: name, is_active, priority
- clients: name, email
- products: name, amount
- transactions: client, gateway, external_id, status, amount, card_last_numbers
- transaction_products: transaction_id, product_id, quantity

## 🛣 Rotas do Sistema



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


## 📚 Observações

- Todas as validações são feitas com VineJS.
- Mensagens de erro são retornadas em português.
- O sistema está pronto para adicionar novos gateways de forma modular.
- O fallback entre gateways segue a ordem de prioridade configurada.

## 📝 Cadastro do ADMIN

O seeder de usuário ADMIN está apresentando erro de hash, utilize a rota abaixo para cadastrar manualmente:

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
> A coleção JSON de rotas está incluída no projeto. Importe o arquivo no Postman ou Insomnia para facilitar os testes dos endpoints.
---

MIT
