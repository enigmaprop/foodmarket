const jwt = require('jsonwebtoken');

module.exports.signToken = (load , secret)=>{
    try{
        const token = jwt.sign(load , secret);
        return token
    }catch(err){
        console.log(err);
    }
}

module.exports.verifyToken = (token , secret)=>{
    try{
        const verified = jwt.verify(token , secret);
        return verified
    }catch(err){
        console.log(err);
    }
}
