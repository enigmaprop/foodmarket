require('dotenv').config({path:'../.env'})

const Admin = require('../models/admin');
const {v1} = require('uuid');

const {signToken , verifyToken} = require('../auth/auth')
const secret = process.env.SECRET;


module.exports.loginAdmin = async(req , res , next)=>{
    try{
        const {name , password} = req.body;
        const admin = await Admin.findOne({name:name})

        if(admin && admin.name && admin.password===password){
            const key =  signToken(admin.key , secret) ;
            res.json({success:true , key});
            next()
        }else{
            res.json({success: false})
            next();
        }
        
    }catch(err){
        console.log(err);
        res.json({sucess: false , msg: 'there is an error'})
        next(err);
    }
}

module.exports.adminAuth = async (req , res , next)=>{
    try{
        if(req.body.key){
            const key =  await verifyToken(req.body.key , secret);
            const admin =  await Admin.findOne({key})
            console.log(admin);
            if(admin && admin.name && key === admin.key){
                  res.json({success:true});
                  next()
            }else{
                res.json({sucess: false , msg: 'the key is incorrect'})
                next();
            }
        }else{
            res.json({sucess: false , msg: 'the key is incorrect'})
            next()
        }
        }catch(err){
        console.log(err);
        res.json({sucess: false , msg: 'there is an error'})
        next(err);
    }
}


module.exports.signAdmin = async(req , res , next)=>{
    try{
       const {name , password} = req.body ;
       const key = `ADDK${v1()}`;
        if(name && password){
            const newAdmin = new Admin({
                name ,
                password ,
                key ,
           })
           await newAdmin.save();
           await res.json({success: true})
           next()
        }
        res.json({sucess: false , msg: 'password and name are require'})
        next()

    }catch(err){
        console.log(err);
        res.json({sucess: false , msg: 'there is an error'})
        next(err);
    }
}
