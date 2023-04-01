const Catagory = require('../models/catagory');
const multer = require('multer');

//add catagory route handler

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
      callback(null, true);
    } else {
      callback(new Error('Only images are allowed'));
    }
  };

  
module.exports.addCatagory = async (req , res , next)=>{
    try{
        // Define multer storage configuration
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, 'public/');
            },
            filename: (req, file, callback) => {
                // Extract file extension from mimetype
                const ext = file.mimetype.split('/')[1];

                // Construct full image filename
                callback(null, `image-${req.body.name}.${ext}`);
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
                const catagory = new Catagory({
                name:req.body.name ,
                image: {
                    path: req.file.path,
                    name: req.file.filename,
                    contentType: req.file.mimetype,
                },
                });
                // Save the new catagory to the database
                await catagory.save();
                // Send success response to the client
                res.send('Catagory added successfully');
                next();
            }
            });
    }catch(err){
        console.log(err);
        res.send('Filed to add catagory');
        next(err)
    }
}

module.exports.deleteCatagory = async (req , res , next)=>{
    try{
        const name = req.params.name;
        //console.log(name);
        const deletedCatagory = await Catagory.deleteOne({name});
        res.send('Catagory deleted successfully');
        next();
    }catch(err){
        console.log(err);
        res.send('Filed to add catagory');
        next(err);
    }
}

module.exports.getCatagories = async (req , res , next)=>{
    try{
        const catagories = await Catagory.find({});
        res.json(catagories);
        next();
    }catch(err){
        console.log(err);
        res.send('Failed to get products');
        next(err);
    }
}