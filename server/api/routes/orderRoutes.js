const expree = require('express'); // import express framework
const router = expree.Router(); // create a router object using the express framework
const authMiddleWare = require('../auth/authorizationMiddleware')

const {
    getOrders, // import a function to handle GET requests to retrieve all orders
    getOrdersById, // import a function to handle GET requests to retrieve orders by ID
    getOrdersByName, // import a function to handle GET requests to retrieve orders by name
    addOrder // import a function to handle POST requests to add a new order
} = require('../controller/ordersController'); // import functions from the ordersController module


router
    .get('/', authMiddleWare , getOrders) // handle GET requests to retrieve all orders
    .get('/byId/:id', authMiddleWare, getOrdersById) // handle GET requests to retrieve orders by ID
    .get('/byName/:firstName/:lastName' , authMiddleWare , getOrdersByName) // handle GET requests to retrieve orders by name
    .post('/addOrder', addOrder); // handle POST requests to add a new order
    
module.exports = router; // export the router object to be used in other modules
    
