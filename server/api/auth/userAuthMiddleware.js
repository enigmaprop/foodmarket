const User = require('../models/user');

 const userAuth = async(req , res , next)=>{
    const id = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    try{
        const users = await User.findOne({id})
        if(users){
            next();
        }else{
            res.status(403).send('Forbidden');
        }
    }catch(err){
        console.log(err);
        res.status(401).send('Unauthorized');
    }
}

module.exports = userAuth;