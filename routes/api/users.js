const express = require("express");

const router = express.Router();

const { users: usersController } = require("../../controllers");

const { authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { validateBody } = require("../../utils");


// signup
router.post("/register", validateBody(schemas.userRegisterSchema), usersController.register);

// // signin
router.post("/login", validateBody(schemas.userLoginSchema), usersController.login);

// router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, usersController.logout);

module.exports = router;