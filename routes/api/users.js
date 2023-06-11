const express = require("express");

const router = express.Router();

const { users: usersControllers } = require("../../controllers");

const { authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { validateBody } = require("../../utils");


// signup
router.post("/register", validateBody(schemas.userRegisterSchema), usersControllers.register);

router.get("/verify/:verificationCode", usersControllers.verify);

router.post("/verify", validateBody(schemas.userEmailSchema), usersControllers.resendVerifyEmail)

// // signin
router.post("/login", validateBody(schemas.userLoginSchema), usersControllers.login);

router.get("/current", authenticate, usersControllers.getCurrent);

router.post("/logout", authenticate, usersControllers.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), usersControllers.updateAvatar);

module.exports = router;