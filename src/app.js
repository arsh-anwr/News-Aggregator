const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const {signin, signup, verifyToken } = require("./controllers/loginController.js");
const preferences = require("./routes/preferences.js");

require("dotenv")
  .config();


const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({ extended: false}));
routes.use(bodyParser.json());


const PORT = 3000;

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to New Aggregator app");
});

routes.use('/news',verifyToken, news);

routes.post('/login', signin);

routes.post('/register', signup);

routes.use('/preferences', verifyToken, preferences);

app.listen(process.env.PORT || PORT, (error) => {
    if (!error) {
        console.log("Server has successfully started and app is listening on port " + PORT);
    }
    else {
        console.log("Error occured, server can't start",error);
    }
});