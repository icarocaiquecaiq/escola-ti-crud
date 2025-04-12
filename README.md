# 🧙‍♂️ RPG Character & Magic Item API

API RESTful desenvolvida com **NestJS** e **Prisma** para gerenciar personagens e itens mágicos em um universo de RPG.

## 🚀 Instalação

```bash
npm install
npm run start:dev
```

> Certifique-se de ter um banco de dados configurado corretamente via Prisma.

---

## 📌 Funcionalidades

### ✅ Cadastrar Personagem

- **Rota:** `POST /character`
- **Body:**

```json
{
  "name": "Jonas",
  "adventurousName": "Cavaleiro de Prata",
  "class": "WARRIOR",
  "level": 3,
  "strength": 6,
  "defense": 3
}
```

---

### ✅ Cadastrar Item Mágico

- **Rota:** `POST /magic-item`
- **Body:**

```json
{
  "name": "Espada Flamejante",
  "itemType": "GUN",
  "strength": 2,
  "defense": 1
}
```

---

### 📋 Listar Personagens

- **Rota:** `GET /character`
- **Descrição:** Lista todos os personagens e seus respectivos itens mágicos, com os atributos totais calculados.

---

### 🔍 Buscar Personagem por ID

- **Rota:** `GET /character/:id`
- **Descrição:** Retorna os dados do personagem e os itens mágicos que ele possui.

---

### 📝 Atualizar Nome do Aventureiro

- **Rota:** `PUT /character/:id`
- **Body:**

```json
{
  "name": "Espadachim Fantasma"
}
```

---

### ❌ Remover Personagem

- **Rota:** `DELETE /character/:id`

---

### 📋 Listar Itens Mágicos

- **Rota:** `GET /magic-item`

---

### 🔍 Buscar Item Mágico por ID

- **Rota:** `GET /magic-item/:id`

---

### ➕ Adicionar Item Mágico ao Personagem

- **Rota:** `POST /magic-item/:magicItemId/add-to-character/:characterId`

---

### 📦 Listar Itens Mágicos por Personagem

- **Rota:** `GET /character/:id/magic-items`

---

### ➖ Remover Item Mágico do Personagem

- **Rota:** `DELETE /magic-item/:magicItemId/remove-to-character/:characterId`

---

### 💍 Buscar Amuleto do Personagem

- **Rota:** `GET /character/:id/amulet`

---
