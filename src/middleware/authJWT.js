var usersData = require("../../users");
var jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
      jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
        if (err)  {
          req.user = undefined;
          next();
        }
        let user = usersData.findUserWithEmail(decode.email);
        if (user) {
          req.user = user;
          next();
        }
        else {
          res.status(500).send({
              message: 'User not found'
          });
        }
      });
    }
  };

  
  module.exports = {verifyToken};

