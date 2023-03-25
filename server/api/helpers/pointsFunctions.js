const Point = require('../models/point');


const compare = (a , b)=>{
    return a.offer.cost - b.offer.cost
}

module.exports.dettectPrize = async(cost)=>{
    try{
        const points = await Point.find({});
        points.sort(compare)
        const result = await points.filter((point , i)=>{
            if (cost >= point.offer.cost && (!points[i + 1] || cost < points[i + 1].offer.cost)) {
                return true;
              } else {
                return false;
              }
        })
        if (result[0]) {
            return result[0].offer;
          } else {
            return false;
          }
    }catch(err){
        console.log(err);
    }
}


module.exports.addPoints = async(cost , points)=>{
    try{
        const offer = await Point.findOne({
            "offer.cost": cost,
        });
        if(cost && points && !offer){
            const newPointsOffer = new Point({
                offer:{
                    cost ,
                    points ,
                }
            })
            newPointsOffer.save();
            return true;
        }
        return false;
                
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.getPointsOffers = async () => {
    try {
      const offers = await Point.find({});
      return offers;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  module.exports.deletePointsOffer = async (cost) => {
    try {
      const offer = await Point.findOne({ 'offer.cost': cost });
      if (offer) {
        await Point.deleteOne({ 'offer.cost': cost })
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  