const User = require('../models/user');

const {

    addPoints ,
    dettectPrize ,
    deletePointsOffer ,
    getPointsOffers ,

} = require('../helpers/pointsFunctions');


module.exports.pointsAdding = async(req , res , next)=>{
    try{
        const cost = req.params.cost
        const points = req.params.points;
        const success = await addPoints(cost , points);
        if(success){
            res.send('Points added successfully');
            next();
        }else{
            res.send('Failed to add points please check that the cost is not repeated');
            next();
        }
    }catch(err){
        console.log(err);
        res.send('Failed to add points');
        next(err);
    }
}


module.exports.dettectPoints = async(req , res , next)=>{
    try{
        const cost = req.params.cost;
        const userId = req.params.id;
        const offer =  await dettectPrize(cost)
        const user =  await User.findOne({id:userId});

        if(offer && user){
            const points = user.points + offer.points;
            await User.updateOne({id:userId} , {points});
            res.send(`points added successfully`);
            next();
        }else{
            res.send('No offer');
            next();
        }
    }catch(err){
        console.log(err);
        res.send('Failed to add points');
        next(err);
    }
}


module.exports.getPoints = async (req , res , next)=>{
    try{
        const offers = await getPointsOffers()
        res.json(offers);
        next();
    }catch(err){
        console.log(err);
        res.send('Failed to get points offers');
        next(err);
    }
}

module.exports.deletePoints = async (req , res , next)=>{
    try{
        const deletedOffer = deletePointsOffer(req.params.cost);
        if(deletedOffer){
            res.send('Offer deleted successfully');
            next();
        }else{
            res.send('Failed to delete the offer')
        }
    }catch(err){
        console.log(err);
        res.send('Failed to delete points offer')
    }
}