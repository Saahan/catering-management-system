# Catering Management System

The catering management system connects buyers and sellers of food items, including fully cooked dishes as well as raw materials. Products are sold in bulk by weight, while the seller takes care of packaging and delivery. It is our mission to provide an excellent platform for caterers to showcase their products and sell them remotely to clients located all around the country. Happy buying and selling!

The project is hosted live on: https://catering-management-system.onrender.com

Note: Please wait for a minute or so for the site to load for the first time. Because they are hosted on a free account, the backend services dial down after 15 minutes of inactivity.

## Features

Users can create two types of accounts: "Buyer" and "Seller" which provide their respective priveleges in the functionality that the app offers. The "Dashboard" is rendered as per the priveleges set by the type of account, and is split into different views.

Basically, buyers can buy food products which the sellers are selling.

### Buyer Priveleges

Buyers can:

- View their profile, where they can check out their personal details like name, email and contact details. They can also upload or change their profile picture, which is hosted on Firebase Storage.

- Browse products that the vendors have listed for sale. They can check the details, price, and a photo of the product. They can also add products to their cart.

- Check the products that they have added to their cart. In this view, they can modify the quantity (in Kg) of the product and also remove the product from the cart before proceeding to place their order.

- View the orders that they have placed. They can check the date that the order was placed, vendor details, final price and the status of the order. In this view, order history is maintained which cannot be erased by the end-user.

### Seller Priveleges

Vendors can:

- View their profile, where they can check out their personal details like name, email and contact details. They can also upload or change their profile picture, which is hosted on Firebase Storage.

- View the orders they have received from customers. They can check order details in this view, such as buyer name, contact, date of order, order ID, price and quantity. They can also mark the product as "order fulfilled" if they have received payment and delivered the product to the customer. This action will also let the buyer know that the order has been fulfilled.

- Add products to the marketplace via the "My Products" view. They can enter details of the new product, such as name, price, description and photo (hosted on Firebase Storage), with the click of a button. In the same view, they can also check the products they have listed on the marketplace and remove them if they wish.

## Back-End Stuff

The details of the buyer and seller, of the products, and orders received as well as placed, are recorded in a MongoDB free tier database. The order placed and received history cannot be erased by the end-users, and it requires them to be erased from the database altogether, in order to remove them. This feature can be expanded in the future where they are simply moved to a different database to be kept in the records.

This app uses Firebase for authentication as well as for storage of product and profile photos.

This app used ExpressJS for API calls and the API is hosted on Render on the link: https://catering-management-system-api.onrender.com. This service dials down after 15 minutes of inacitivity because it is hosted on a free tier. So please be patient while loading the app for the first time (it takes a minute or so).

* Advisory: Do not use real emails and phone numbers to register when checking out the demo of the project. The "Forgot Password" link works perfectly with real emails, but you will have to trust me on it. Feel free to modify the products as you wish, but try not to overload the database with useless data. Thanks!
