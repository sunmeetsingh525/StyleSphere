const Category = require("../../models/Category.model");

const { ObjectId } = require("mongoose").Types;
const updateCategory = async (req, res, next) => {
  try {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await Category.findOneAndUpdate(
        { _id: ObjectId(id) },
        { name },
        { new: true }
      );
      await category.save();
      res.json({
        success: true,
        status: 200,
        message: "Category updated successfully",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateCategory;
