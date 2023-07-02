# Stock API
Este projeto é uma API REST simples construída com Node.js e Express, para gerenciar produtos. Ele permite que os clientes realizem operações CRUD (Criar, Ler, Atualizar, Excluir) em produtos. Embora este projeto não possua um banco de dados, por se tratar de um propósito educacional, os dados são persistidos em um arquivo JSON. Isso permite que você interaja com a API de uma maneira que simule a criação, leitura, atualização e exclusão de dados. No entanto, tenha em mente que em um ambiente de produção real, seria apropriado utilizar um banco de dados para gerenciar os dados de forma mais eficiente e segura.

## Funcionalidades
- Listar todos os produtos
- Recuperar lista paginada de produtos
- Recuperar um único produto por ID
- Criar um novo produto
- Atualizar um produto por ID
- Excluir um produto por ID

## Primeiros passos
### Pré-requisitos
- [Node.js](https://nodejs.org/pt-br/download) (v14 ou superior)

### Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/pedruino/study-node-stock-api.git
    ```
1. Mude o diretório para o repositório clonado:
    ```bash
    cd study-node-stock-api
    ```
1. Instale as dependências:
    ```bash
    npm install
    ```
1. Execute o servidor:
    ```bash
    npm start
    ```
1. O servidor deve estar rodando em http://localhost:3000

### Iniciar a aplicação com o Docker Compose:
1. Na raiz do projeto, executar o comando:
    ```bash
    docker-compose up --build
    ```
1. A API estará disponível em `http://localhost:3000`.
    
## Como utilizar
Aqui estão alguns exemplos de requisições que você pode realizar contra a API:

### Listar todos os produtos
```http
GET /products
```
### Recuperar lista paginada de produtos
```http
GET /products-paginated?page=1&limit=10
```
ou
```http
GET /products/pagination/1?limit=10
```
### Recuperar um único produto por ID
```http
GET /products/:id
```
### Criar um novo produto
```http
POST /products
Content-Type: application/json

{
    "name": "Product name",
    "salePrice": 24.90,
    "reference": "PROD01",
    "unitOfMeasure": "KG",
    "manufacturer": "Manufacturer name",
    "stock": 10,
    "productImage": "image-url"
}
```
### Atualizar um produto por ID
```http
PATCH /products/:id
Content-Type: application/json

{
    "name": "Updated product"
}
```
### Excluir um produto por ID
```http
DELETE /products/:id
```

## Documentação
Você pode visualizar a documentação da API executando o servidor e visitando [swagger/api-docs](http://localhost:3000/api-docs).