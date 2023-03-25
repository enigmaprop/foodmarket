const Discount = require('../models/discount');
const Product = require('../models/product');
const User = require('../models/user');

module.exports.addGeneralDiscount = async (req, res, next) => {
  try {
    if (req.body.id && req.body.value && req.body.cost) {
      const discountData = {
        id: req.body.id,
        value: req.body.value,
        cost: req.body.cost ,
      };
      const discount = await Discount.findOne({ id: discountData.id });
      if (discount) {
        res.send('The discount already exists. Please choose another ID.');
      } else {
        const newDiscount = new Discount(discountData);
        await newDiscount.save();
        res.send('Discount added successfully.');
      }
    } else {
      res.send('All fields are required.');
    }
  } catch (err) {
    console.log(err);
    res.send('Failed to add discount')
    next(err);
  }
  next();
};

module.exports.getGeneralDiscounts = async (req, res, next) => {
  try {
    const discounts = await Discount.find({});
    res.json(discounts);
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports.deleteGeneralDiscountById = async (req, res, next) => {
  try {
    const { deletedCount } = await Discount.deleteOne({ id: req.params.id });
    if (deletedCount === 1) {
      res.send('Discount deleted successfully.');
    } else {
      res.send('Discount not found.');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports.buyDiscount = async (req, res, next) => {
  try {
    const {discountId, userId } = req.body;
    const user = await User.findOne({ id: userId });
    const discount = await Discount.findOne({id:discountId});
    const cost = discount.cost ;
    
    if (!user) {
      res.send('User not found.');
      return;
    }
    if (user.points < cost) {
      res.send(`You don't have enough points.`);
      return;
    }
    if(user.offers.indexOf(discount.id) !== -1){
      res.send(`You already have this discount`);
      return;
    }
    const newPoints = user.points - cost;
    const newOffers = user.offers.concat(discountId);
    await User.updateOne({ id: userId }, { points: newPoints, offers: newOffers });
    res.send('Discount added successfully.');
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};


module.exports.addProductDiscount = async(req , res , next)=>{
  try{
    const id = req.params.id;
    const discount = req.params.discount;
    const product = await Product.findOne({id})
    if(product && discount){
      await Product.updateOne({id} , {discount});
      res.send('Discount added successfully');
      next();
      return;
    }
    res.send('Failed to add discount , check the id or the discount fields')
    next();
  }catch(err){
    console.log(err);
    next(err);
  }
}

module.exports.deleteProductDiscount = async(req , res , next)=>{
  try{
    const id = req.params.id;
    const product = await Product.findOne({id});
    if(product){
      if(product.discount > 0){
        await Product.updateOne({id} , {discount:0});
        res.send('Product discount deleted successfully');
        next();
        return
      }
      res.send('There is no discount on this product');
      next();
      return
    }
    res.send('There is no product with this ID');
    next();
  }catch(err){
    console.log(err);
    next(err);
  }
}