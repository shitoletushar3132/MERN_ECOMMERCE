const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const useDetailsController = require("../controller/userDetail");
const authToken = require("../middleware/authToken");
const test = require("../controller/tes");
const userLogOutController = require("../controller/userLogOut");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, useDetailsController);
router.get("/user-logout", userLogOutController);
router.get("/signup", test);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

module.exports = router;
