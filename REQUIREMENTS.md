## API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

-  Create

   -  Method - POST
   -  Authorization (not) required
   -  create new User
   -  http://localhost:7000/api/users/

-  Index

   -  Method - GET
   -  Authorization required
   -  view all users
   -  http://localhost:7000/api/users/

-  Show

   -  Method - GET
   -  Authorization required
   -  view one user
   -  http://localhost:7000/api/users/:id

-  Update

   -  Method - PATCH
   -  Authorization required
   -  edit User info
   -  http://localhost:7000/api/users/:id

-  Delete
   -  Method - DELETE
   -  Authorization required
   -  Delete User
   -  http://localhost:7000/api/users/:id

### Products

-  Create

   -  Method - POST
   -  Authorization required
   -  create product
   -  http://localhost:7000/api/products/

-  Index

   -  Method - GET
   -  Authorization (not) required
   -  view all products
   -  http://localhost:7000/api/products/

-  Show

   -  Method - GET
   -  Authorization (not) required
   -  view one product
   -  http://localhost:7000/api/products/:id

### Orders

-  Create

   -  Method - POST
   -  Authorization required
   -  create order
   -  http://localhost:7000/api/orders/

-  Index

   -  Method - GET
   -  Authorization required
   -  view all orders
   -  http://localhost:7000/api/orders/

-  Show

   -  Method - GET
   -  Authorization required
   -  view one order
   -  http://localhost:7000/api/orders/:id

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

## Database Schema

#### Product

    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INT NOT NULL

#### User

    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL

#### Order

    order_id SERIAL PRIMARY KEY,
    status VARCHAR(20),

#### Order-products

    order_products_id SERIAL PRIMARY KEY,
    orderId bigint REFERENCES orders (order_id),
    productId bigint REFERENCES products (product_id),
    quantity INT
