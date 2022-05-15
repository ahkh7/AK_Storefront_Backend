# Storefront Backend Project

This repo contains a basic Node and Express app to get you started in constructing an API. ( project 2 of advanced Web Development Nanodegree from Udacity - EGFWD )

## Required Technologies

Your application must make use of the following libraries:

-  Typescript
-  Postgres database.
-  Node/Express.
-  dotenv .
-  jasmine/supertest.
-  bcrypt for hashing.

## URLS

```sh
localhost:7000
```

```sh
localhost:7000/api/users
```

```sh
localhost:7000/api/product
```

```sh
localhost:7000/api/orders
```

## Data Shapes

#### User Table

-  user_id
-  email
-  user_name
-  first_name
-  last_name
-  password

#### Product Table

-  product_id
-  product_name
-  category
-  price

#### Orders Table

-  order_id
-  userId
-  status

#### Order-products Table

-  order_products_id
-  orderId
-  productId
-  quantity

## DB Creation and Migrations

```sh
psql -U postgres
```

```sh
CREATE DATABASE POSTGRES_DB;
CREATE DATABASE POSTGRES_DB_TEST;
```

#### Create .env file and use this variables:

-  POSTGRES_HOST
-  POSTGRES_PORT
-  POSTGRES_DB
-  POSTGRES_DB_TEST
-  POSTGRES_USER
-  POSTGRES_PASSWORD

-  NODE_ENV=dev
-  BCRYPT_PASSWORD= pass0000
-  SALT_ROUNDS=10
-  TOKEN_SECERT=secret_token

#### Install Migrations

```sh
db-migrate up
```

## Models Create

#### User

Create User

```sh
INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5)
RETURNING user_id, email, user_name, first_name, last_name
```

#### Product

Create Product

```sh
INSERT INTO products (product_name, category, price) VALUES ($1, $2, $3) RETURNING *
```

#### Order

Create Order

```sh
INSERT INTO orders (status,userId) VALUES($1, $2) RETURNING *
```

## Build and Run Project

```sh
npm run build
```

```sh
npm run start
```

#### Command for Testing

```sh
npm run test:pro
```

## By

Ahmed Khairy - github.com/ahkh7

## Version

-  0.1

## License

Udacity project
