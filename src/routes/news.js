const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
const {getUsers} = require('../controllers/loginController');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.post('/',async(req,res)=>{
    
   let users = getUsers();

   let user = users.find((user) => user.email === req.user.email);

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