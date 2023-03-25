const User = require('../models/user');
const {v1} = require('uuid');

//Get all users
module.exports.getUsers = async(req , res , next)=>{
    try{
        const users = await User.find({});
        res.json(users);
        next()
    }catch(err){
        console.log();
        next(err);
    }
}

//Get a user with a specific id
module.exports.getUserById = async(req , res , next)=>{
    try{
        const id = req.params.id ;
        const user = await User.findOne({id});
        res.json(user);
        next()
    }catch(err){
        console.log(err);
        next(err)
    }
}

//Get a user with a his name

module.exports.getUserByName = async(req , res , next)=>{
    try{
        const name = req.params.name;
        const user = await User.find({name});
        res.json(user);
        next()
    }catch(err){
        console.log(err);
        next(err)
    }
}

module.exports.getUserByPhoneNumber = async(req , res , next)=>{
    try{
        const phoneNumber = req.params.phoneNumber;
        const user = await User.findOne({phoneNumber});
        res.json(user);
        next();
    }catch(err){
        console.log(err);
        next(err);
    }
}

//Add new user 
module.exports.addUser = async(req , res , next)=>{
    try{
        const {name , phoneNumber , password} = req.body ;
        const user = await User.find({phoneNumber}) ;
        if(name.length != 0 && phoneNumber.length != 0 && password.length != 0){
            if(user[0]){
                res.send('هذا الرقم مستخدم بالفعل');
                next();
            }else{
                const user = new User({
                    id:`USER${v1()}` , 
                    name ,
                    phoneNumber ,
                    password ,
                    points: 0 ,
                    offers: [] ,
                });

                user.save();
                res.send('تمت اضافة المستخدم بنجاح')
                next();
            }
        }else{
            res.send('كل الحقول مطلوبة') ;
            next()
        }
    }catch(err){
        console.log(err);
        res.send('فشل اضافة المستخدم')
        next(err);
    }
}

//Delete user by it's Id
module.exports.deleteUserById = async (req , res , next)=>{
    try{
        const id = req.params.id;
        const deletedUser = await User.deleteOne({id});
        res.send('تم الحذف بنجاح');
        next();
    }catch(err){
        console.log(err);
        res.send('فشل حذف المستخدم');
        next(err);
    }
}

//Delete user by it's Phone number
module.exports.deleteUserByPhone = async (req , res , next)=>{
    try{
        const phoneNumber = req.params.phoneNumber;
        const deletedUser = await User.deleteOne({phoneNumber});
        res.send('تم الحذف بنجاح');
        next();
    }catch(err){
        res.send('فشل حذف المستخدم');
        next(err);
    }
}


module.exports.loginUser = async (req , res , next)=>{
    try{
        const phoneNumber = req.body.phoneNumber ;
        const password = req.body.password ;
        const user = await User.findOne({phoneNumber , password}) ;
        if(user){
            res.json({user , msg: "success"});
            next();
        }else{
            res.json({msg: 'failed'});
            next();
        }
    }catch(err){
        res.send('فشل تسجيل الدخول');
        next(err);
    }
}