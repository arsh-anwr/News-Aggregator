const preferencesRoutes = require('express').Router();
const bodyParser = require('body-parser');
var usersData = require("../../users");
const { updatePreference} = require('../controllers/loginController');

preferencesRoutes.use(bodyParser.urlencoded({ extended: false }));
preferencesRoutes.use(bodyParser.json());

preferencesRoutes.get('/', (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
          message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message
      });
    }

    res.status(200);
    res.send(req.user.preference);
  });


  preferencesRoutes.put('/', (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
          message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message
      });
    }

    if (!req.preference == null) {
        res.status(500).send({
            message: "please send preference in body"
          });
          return;
      }
      else {
        updatePreference(preference, req.user.email);
      }

    res.status(200);
    res.send(req.user.preference);
  });

  module.exports = preferencesRoutes;