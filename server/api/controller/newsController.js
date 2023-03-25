var news = '! اهلا وسهلا بمتجرنا , نتمنى لكم يوما سعيد'

;

module.exports.addNews = (req , res , next)=>{
    try{
        const text = req.params.news;
        if(text){
            news = text;
            res.send('News added successfully');
            next();
        }else{
            res.send('Text field is required');
            next();
        }
    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.getNews = (req , res , next)=>{
    try{
        res.send(news);
        next();
    }catch(err){
        console.log(err);
    }
}