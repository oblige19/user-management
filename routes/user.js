const path = require("path");

const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, userController.getUsers);
router.get("/add", isAuth, userController.addUser);
router.post("/add", isAuth, userController.postAddUser);
router.get("/edit/:id", isAuth, userController.getEditUser);
router.post("/update", isAuth, userController.postUpdateUser);
router.post("/delete", isAuth, userController.deleteUser);

module.exports = router;
