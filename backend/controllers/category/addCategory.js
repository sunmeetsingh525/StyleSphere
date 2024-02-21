const Category = require("../../models/Category.model");

const addCategory = async (req, res, next) => {
  try {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.json({
        success: true,
        status: 200,
        message: "Category created successfully",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = addCategory;
