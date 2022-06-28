# Storefront Backend Project

## About :
This Repo contains storefront REstful Api for storefront  project which is build using Node,Express,TypeScript and other pakages.

## Important Step Before starting  :
### run in in the root folder of the project 
`` npm install ``

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. by running 

``db-migrate up``

to create migrations  

## API end Points:
### users:
The full endpoint will be: 
/users/[unlisted_item below]
it is important to implement create the users first to be able to use other api endpoints 

- create : to create user, and it will create token, which will be provided in the response header.
- index : to get all the users of the store without token.
- show/id : to get specific user and you have to provide user's token in the request header as token and then proivde that user's token .
- delete/id : to delete that user with the id, and the user have to provide that user's token to delete it .
- update/id : to update that user and token must be provided too , it is important to mention that the user can update whatever he wants, so it is flexiable.
-completeOrders/id : it return all completed orders by that user, and token must be provided as well.

### product : 
The full endpoint will be: 
/products/[unlisted_item below]
it is important to implement create the users first to be able to use other api endpoints 
- create :  to create a product with the price, category and name, and it must be provided in the requst body. you can just provide any token for any user, so it tokenVerifiy middleware is to maje sure that this user is exisit in the data base.
- index : to retrive all the products of the store .
- show/id : to get the specific product and the user must provide a token.
- category/cat : to get all the same type of the items in the store. 
- popularProducts : to retrive the top 5 most common items in the store, depends on the quantity sold in the store .
- update/id : to update that product and the the admin can edit whatever he wants like proce ,name or all of them in once.
- delete/id : to delete that item from the data base and provide id of that item.

### orders : 
The full endpoint will be: 
/orders/[unlisted_item below]
- currentOrder/id: you have to provide the user id as params and it will his current orders with it status.
 - createOrder/id : this I have implement it to be able to make order for that user and to creare it.
 - / : this to return all orders in the store.


 ## Technolgies used to implement this Project:
 - Node.js
 - Express : as a frame work for node framework 
 - PostgreSQL : as a database for the store
 - JWT : for tokens
 - bcrypt for hashing passwords and (authentication & authorization).
  


