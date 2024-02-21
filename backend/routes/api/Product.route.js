const addProduct = require("../../controllers/product/addProduct");
const updateProduct = require("../../controllers/product/updateProduct");
const deleteProduct = require("../../controllers/product/deleteProduct");
const getProducts = require("../../controllers/product/getProducts");
const getSingleProducts = require("../../controllers/product/getSingleProducts");
const deleteImage = require("../../controllers/product/deleteImage");
const statusCount = require("../../controllers/product/productStats");
const validateAccessToken = require("../../middlewares/jwtValidation");
const statusChange = require("../../controllers/product/productStatus");

const router = require("express").Router();

router.post("/", validateAccessToken, addProduct);
router.put("/:id/status", validateAccessToken, statusChange);
router.get("/stats/count", validateAccessToken, statusCount);
router.put("/:id", validateAccessToken, updateProduct);
router.delete("/:id", validateAccessToken, deleteProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProducts);
router.delete("/:productId/:imageId", validateAccessToken, deleteImage);
module.exports = router;
