const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  getEmail,
  loginUser,
  createUserBook,
} = require("./../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/email").get(getEmail);
router.route("/login").post(loginUser);
router.route("/:id/book").patch(createUserBook);
router.route("/:id").get(getUserById);


module.exports = router;
