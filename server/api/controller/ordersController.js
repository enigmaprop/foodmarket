const Orders = require('../models/order');
const Discount = require('../models/discount');
const User = require('../models/user');
const { v1 } = require('uuid');

// Get all orders
module.exports.getOrders = async (req, res, next) => {
  try {
    // Find all orders in the database
    const orders = await Orders.find({});
    console.log(orders);

    // Send response with orders data
    res.json(orders);

    // Call next middleware function
    next();
  } catch (err) {
    console.log(err);

    // Call error handling middleware
    next(err);
  }
};

// Get order by ID
module.exports.getOrdersById = async (req, res, next) => {
  try {
    // Find order with given ID in the database
    const order = await Orders.findOne({ id: req.params.id });

    // Send response with order data
    res.json(order);

    // Call next middleware function
    next();
  } catch (err) {
    console.log(err);

    // Call error handling middleware
    next(err);
  }
};

// Get orders by name
module.exports.getOrdersByName = async (req, res, next) => {
  try {
    // Find orders with given first and last name in the database
    const orders = await Orders.find({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
    });

    // Send response with orders data
    res.json(orders);

    // Call next middleware function
    next();
  } catch (err) {
    console.log(err);

    // Call error handling middleware
    next(err);
  }
};

// Add new order
module.exports.addOrder = async (req, res, next) => {
  try {
    // Get data from request body
    const data = req.body;
    console.log(req.body);

    const discount = await Discount.findOne({id:data.discount});
    const user = await User.findOne({id:data.userId});

    if(discount){
      var discountValue = discount.value;

      if(!user){
        res.send('لا يمكن ان تستعمل رمز الخصم الا ان كنت مسجل حسابا لدينا');
        next()
        return;
      }else if(user.offers.indexOf(discount.id) === -1){
        res.send('هذا الخصم ليس لديك');
        next()
        return;
      }

    }else if (data.discount.length === 0){
      var discountValue = 0;
    }else{
      if(user.offers.indexOf(data.discount) !== -1){
          const updatedUser = user;
          const newOffers = updatedUser.offers.filter((val , i)=>{
            return val !== data.discount
          })
          await User.updateOne({offers: user.offers} , {offers:newOffers})
          console.log(newOffers);
      }
      res.send('هذا الخصم غير موجود')
      next()
      return
    }


    // Create new order object
    const order = new Orders({
      id: `ORR${v1()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      address: data.address,
      phoneNumber: data.phoneNumber,
      products: data.products,
      date: data.date,
      discount: discountValue
    });
    
    // Deleting the discount code from the user account
    if(user){
        const offers = user.offers;
        const newOffers = offers.filter((val , i)=>{
          return val != data.discount
        })
        await User.updateOne({id:data.userId} , {offers:newOffers});
    }
    // Save new order to the database
    await order.save();

    console.log('success');

    // Send response with success message
    res.send('Order added sucessfully');

    // Call next middleware function
    next();
  } catch (err) {
    console.log(err);

    // Call error handling middleware
    next(err);
  }
};
