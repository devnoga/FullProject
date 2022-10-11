# MyStore

# Developer Section

# To Run the project

    1. install dependencies with the following command
        npm install
    2. Serve the app:
        ng serve --port 3000
    3. run the app from the browser
        http://localhost:3000/

        it should display the app in the product list page

# Project description

- Main Components nav component

       products Component
       product-item component
       product-details component

       cart component
       cart-item component
       user-form component

       order-confirmation component

* Parent-child component relationships

        Parentcomponent       Child component

            - products                product-item
            - cart                    cart-item
            - cart                    user-form

* Data Models

  - Product : it has the following data about the product id name price url
    description
  - UserData: it has the following data about the customer fullName address
    cardNumber

  - ShoppingItem: this model serve as a cart item while the product is still in
    the cart, and it is also used as an order item after the order has placed,
    it contains the following data - product: a reference to a product -
    quanitity: how many instances of the product the user would like to buy

- Services:

  - products service: retrieves all the products from a data.json file.
    /assets/data.json

  - cart service: maintain the cart status, a list of shoppingitems that are
    currently in the cart, it updates the cart with new item, update quantity of
    an item, and remove an item from the cart

  - user service: manage user data

  - orders service: manage the orderitems after the order has been placed
