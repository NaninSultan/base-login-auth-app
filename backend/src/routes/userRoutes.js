const { signup, signin, getProfileInformation } = require('../controllers/userControllers');
const auth = require('../middleware/auth');
const express = require("express");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getProfileInformation", auth, getProfileInformation);

module.exports = router;