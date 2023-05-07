var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var usersData = require("../../users");
var validator = require("../validator/validator");

var signup = (req, res) => {

  if (
    req.body.fullName &&
    req.body.email &&
    req.body.password &&
    req.body.preference
  ) {
    if (validator.validateEmail(req.body.email)) {
     
    }
    else {
      res.status(500).send({
        status: "false",
        message: "Please provide correct email address",
      });
      return;
    }

    if (validator.isEmailRegistered(req.body.email, usersData.getUsers())) {
      res.status(500).send({
        status: "false",
        message: "Email address is already registered. Please try again",
      });
      return;
    }

    let user = {
      fullName: req.body.fullName,
      email: req.body.email,
      preference: req.body.preference,
      completedArticles: [],
      favorites: [],
      password: bcrypt.hashSync(req.body.password, 8),
    };

    usersData.addUsers(user);

    res.status(200).send({
      message: "User Registered successfully",
    });
  } else {
    res.status(500).send({
      status: "false",
      message:
        "Please provide all required fields (fullName, email, password, preferences, completedArticles, favorites)",
    });
  }
};

var signin = (req, res) => {
  let user = usersData.findUserWithEmail(req.body.email);

  if (user) {
  } else {
    res.status(404).send("there's no user with email " + req.body.email);
  }

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  var token = jwt.sign(
    {
      email: user.email,
    },
    process.env.API_SECRET,
    {
      expiresIn: 86400,
    }
  );

  res.status(200).send({
    user: {
      email: user.email,
      fullName: user.fullName,
    },
    message: "Login successfull",
    accessToken: token,
  });
};


const updatePreference = (preference, email) => {
  let user = usersData.findUserWithEmail(email);

  user.preference = preference;
}

const getUsers = () => {
  return users;
}

module.exports = { signin, signup, updatePreference, getUsers };
