const router = require("express").Router();

const addCategory = require("../../controllers/category/addCategory");
const getAllCategory = require("../../controllers/category/getAllCategory");
const updateCategory = require("../../controllers/category/updateCategory");
const deleteCategory = require("../../controllers/category/deleteCategory");

router.post("/", addCategory);
router.get("/", getAllCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
