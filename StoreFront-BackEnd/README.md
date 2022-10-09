// My Updates on how to run my projecy

- Port number for db and server.

  - db port: from the docker container ports: - '8003:5432'

  - server port: 3000

* Environment variables.

        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: password123
        POSTGRES_DB: store_front_db
        POSTGRES_DB_TEST: store_front_test_db
        DB_HOST=localhost
        DB_PORT:8003
        ENV = dev
        BCRYPT_PASSWORD = my_secret_password
        SALT_ROUND = 12
        TOKEN_SECRET = my_token_secret

- Package installation instructions. install npm dependencies
  - npm install

* Setup db and server instructions.

  - Step 1: Create the docker container --> docker-compose up -d  
     This step will create the database for the project, database name is "store_front_db",
    it will also create the user "postgres" with password "password123"

  - Step 2: Create the test database using postgres user "postgres":

    CREATE DATABASE store_front_test_db;

- Step 3: run migrations

  db-migrate up

- Database schema with column name and type.


    - TABLE: users (id:bigint , firstname:varchar, lastname:varchar,
    username:varchar password:varchar);

    - TABLE: products (id:bigint , name:varchar, price: integer, category:varchar);

    - TABLE: orders (id:bigint , user_id:bigint, order_status: varchar);

    - TABLE: order_products (id:bigint , order_id:bigint, product_id:bigint,
    quantity: integer);

- Endpoints:

  - GET /users
  - GET /users/:id
  - POST /users  
     Request body = { "firstname": "firstname12", "lastname": "lastname12", "username":
    "username12", "password": "password12" }


    - POST /users/authonticate
                    Request body = {  "username": "username12",
                                "password": "password12"
                    }


    - GET /products
    - GET /products/:id
    - POST /products
                Request body = {
                        "name": "Table",
                        "price": "300",
                        "category": "Furniture"
                    }
    - DELETE /products/:id



    - GET /orders/:userId
    - POST /orders
                Request body =  {
                        "userId":2,
                        "status":"active"
                    }

    - POST /orders/:orderId/prodcuts

            Request body =   {
                    "productId":9,
                    "quantity":2
                }

    - GET /popular_product
    - GET /products_by_category

- To run the project: npm run start

- To test the project npm run test
