const createOrder = require("../../controllers/order/createOrder");

const router = require("express").Router();
const validateAccessToken = require("../../middlewares/jwtValidation");

router.post("/", validateAccessToken, createOrder);

module.exports = router;
