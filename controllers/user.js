const User = require("../models/index").User;
const bcrypt = require("bcrypt");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      console.log(users);
      res.render("user/list", {
        users: users,
        pageTitle: "Users",
        path: "/users",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addUser = (req, res, next) => {
  res.render("user/form", {
    pageTitle: "Add User",
    isEdit: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getEditUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then((user) => {
      res.render("user/form", {
        pageTitle: "Edit User",
        isEdit: true,
        user: user,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddUser = (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    postCode: req.body.postCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    username: req.body.username,
  };

  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPassword) =>
      User.create({ ...user, password: hashedPassword })
    )
    .then((result) => res.redirect("/"))
    .catch((err) => res.send(err));
};

exports.postUpdateUser = (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    postCode: req.body.postCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    username: req.body.username,
  };

  User.update(
    { ...user },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((result) => res.redirect("/"))
    .catch((err) => res.send(err));
};

exports.deleteUser = (req, res, next) => {
  const { ids } = req.body;

  User.destroy({
    where: {
      id: ids,
    },
  })
    .then((result) => res.redirect("/"))
    .catch((err) => res.send(err));
};
