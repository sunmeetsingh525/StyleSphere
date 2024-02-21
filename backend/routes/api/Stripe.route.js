const createClientSecret = require("../../controllers/stripe/createClientSecret");

const router = require("express").Router();

router.post("/", createClientSecret);

module.exports = router;
