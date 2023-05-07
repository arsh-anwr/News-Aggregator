const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
var usersData = require("../../users");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get('/',async(req,res)=>{
    
   let user = usersData.findUserWithEmail(req.user.email);

    try {
        var url = `http://newsapi.org/v2/everything?q=${user.preference}&apiKey=${process.env.API_SECRET_KEY}`

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})

module.exports=newsRoutes