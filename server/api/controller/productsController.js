const Product = require('../models/product');
const {v1} = require('uuid');
const multer = require('multer');
const fs = require('fs');

const publicPath = 'C:/Users/Tamer/Desktop/programmingProjects/foodmarket/server/public'
// Get all products from the database
module.exports.getAllProducts = async (req , res , next) => {
    try{
        const products = await Product.find({});
        res.json(products);
        next()
    }catch(err){
        console.log(err);
        next(err);
    }
};

// Get products by name from the database
module.exports.getProductsByName = async(req , res , next) => {
    try{
        const products = await Product.find({name:req.params.name});
        res.json(products);
        next()
    }catch(err){
        console.log(err);
        next(err);
    }
};

// Get product by ID from the database
module.exports.getProductById = async(req , res , next) => {
    try{
        const products = await Product.findOne({id:req.params.id});
        res.json(products);
        next()
    }catch(err){
        console.log(err);
        next(err);
    }
};

// Get products by category from the database
module.exports.getProductsByCategory = async(req , res , next) => {
    try{
        console.log(req.params);
        const products = await Product.find({catagory:req.params.category});
        console.log(products);
        res.json(products);
        next()
    }catch(err){
        console.log(err);
        next(err);
    }
};

// Delete a product from the database by ID
module.exports.deleteProduct = async(req , res , next) => {
    try{
        const deletedProduct = await Product.deleteOne({id:req.params.id});
        res.send('Deleted successfully');
        console.log(deletedProduct);

        if(fs.existsSync(`${publicPath}/image-${req.params.id}.jpeg`)){
            fs.unlinkSync(`${publicPath}/image-${req.params.id}.jpeg`);

        }else if(fs.existsSync(`${publicPath}/image-${req.params.id}.png`)){
            fs.unlinkSync(`${publicPath}/image-${req.params.id}.png`);

        }else if(fs.existsSync(`${publicPath}/image-${req.params.id}.jpg`)){
            fs.unlinkSync(`${publicPath}/image-${req.params.id}.jpg`);

        }
        next()
    }catch(err){
        console.log(err);
        next(err);
    }
};


const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
      callback(null, true);
    } else {
      callback(new Error('Only images are allowed'));
    }
  };


  

// Add a new product to the database
module.exports.addProduct = (req, res, next) => {
    try{
        //Define the id
        var id = v1();
        // Define multer storage configuration
        const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'public/');
        },
        filename: (req, file, callback) => {
            // Extract file extension from mimetype
            const ext = file.mimetype.split('/')[1];
            // Generate image name using the product ID from the request body
            const imageName = `image-${req.body.id}`;
            // Construct full image filename
            callback(null, `image-${id}.${ext}`);
        },
        });
    
        // Create multer upload middleware
        const upload = multer({
        storage: storage,
        fileFilter: isImage,
        }).single('image');
    
        // Call upload middleware and handle result
        upload(req, res, async (err) => {
        if (err) {
            // If upload failed, pass error to the error handling middleware
            next(err);
        } else {
            // If upload succeeded, create a new product instance with the request data
            const newProduct = new Product({
            id: id,
            name: req.body.name,
            catagory: req.body.category,
            price: req.body.price,
            description: req.body.description,
            image: {
                path: req.file.path,
                name: req.file.filename,
                contentType: req.file.mimetype,
            },
            discount: 0 ,
            });
            // Save the new product to the database
            await newProduct.save();
            // Send success response to the client
            res.send('Product added successfully');
            next();
        }
        });
    }catch(err){
        console.log(err);
        res.send('Failed to add the product')
        next(err)
    }
  };
  