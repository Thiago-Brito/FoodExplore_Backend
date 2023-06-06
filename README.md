
# Backend do projeto FoodExplore

conclusão do curso do explore


## Documentação da API

#### Create User

```http
  GET /https://foodexplore-api.onrender.com/users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `VARCHAR` | **Obrigatório**. Nome do usuário |
| `email` | `VARCHAR` | **Obrigatório**. Email do usuário |
| `password` | `VARCHAR` | **Obrigatório**. Senha do usuário |


Não retorna nada


#### Login

```http
  POST /https://foodexplore-api.onrender.com/session
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `VARCHAR` | **Obrigatório**. Email do usuário |
| `password` | `VARCHAR` | **Obrigatório**. Senha do usuário |

Retorna o User e o Token


#### Create Food

```http
  POST /https://foodexplore-api.onrender.com/foods
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title` | `text` | **Obrigatório**. Nome do prato |
| `category` | `text` | **Obrigatório**. Categoria do prato |
| `description` | `text` | **Obrigatório**. Descrição do prato |
| `price` | `decimal` | **Obrigatório**. Preço do prato |
| `user_id` | `integer` | **Obrigatório**. id do usuario |


Retorna o id do prato

#### Create Food Image

```http
  POST /https://foodexplore-api.onrender.com/foods/avatar/:food_id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `avatar` | `file` | **Obrigatório**. Imagem do prato |

Retorna o prato


#### Index Food

```http
  GET /https://foodexplore-api.onrender.com/foods
```

Retorna todos o pratos criados


#### Show Food 

```http
  GET /https://foodexplore-api.onrender.com/foods/:food_id
```
Retorna o prato com o id que você mandou no params


#### Update Food

```http
  PUT /https://foodexplore-api.onrender.com/foods/:food_id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title` | `text` | **Obrigatório**. Nome do prato |
| `category` | `text` | **Obrigatório**. Categoria do prato |
| `description` | `text` | **Obrigatório**. Descrição do prato |
| `price` | `decimal` | **Obrigatório**. Preço do prato |
| `user_id` | `integer` | **Obrigatório**. id do usuario |


Retorna nada

#### Delete Food

```http
  DELETE /https://foodexplore-api.onrender.com/foods/:food_id
```
Retorna nada



#### Create Favorite Food

```http
  POST /https://foodexplore-api.onrender.com/foods/favorite/:food_id
```

Retorna nada


#### Delete Favorite Food

```http
  DELETE /https://foodexplore-api.onrender.com/foods/favorite/:food_id
```

Retorna o nada


#### Index Favorite Food

```http
  GET /https://foodexplore-api.onrender.com/favorite
```

Retorna todos o pratos favoritos do cliente

#### Create Request

```http
  POST /https://foodexplore-api.onrender.com/request
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `food_id` | `integer` | **Obrigatório**. id do prato |
| `quantity` | `text` | **Obrigatório**. Quantidade de pratos |

Retorna nada

#### Delete Request

```http
  DELETE /https://foodexplore-api.onrender.com/foods/request
```

Retorna o nada

#### Delete One Request

```http
  DELETE /https://foodexplore-api.onrender.com/foods/request/:food_id
```

Retorna o nada

#### Index Request

```http
  GET /https://foodexplore-api.onrender.com/request
```

Retorna todos os pedidos daquele cliente
## Deploy

Deploy feito https://foodexplore-api.onrender.com

