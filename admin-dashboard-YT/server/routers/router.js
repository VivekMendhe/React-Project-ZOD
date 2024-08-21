const { Router } = require("express");
const { registerUser, userLogin } = require("../controllers/user.controller");

const router = Router();

/** user routers */
router.route("/register/user").post(registerUser);
router.route("/login/user").post(userLogin);

/** channel routers */
// router.route("/create-channel").post();

/** post routers */
// router.route("/create-post").post();

module.exports = router;
