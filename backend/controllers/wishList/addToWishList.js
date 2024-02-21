const WishList = require("../../models/Wishlist.model");
const { ObjectId } = require("mongoose").Types;

const addToWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const { _id: userId } = req.user;

    const isExist = await WishList.findOne({ productId, userId });
    if (isExist) {
      await WishList.findOneAndDelete({ productId, userId });
      return res.json({
        success: true,
        message: "Product removed from wishlist sucessfully",
        data: isExist,
      });
    }
    const wishlist = new WishList({
      productId,
      userId,
    });
    await wishlist.save();
    res.json({
      success: true,
      message: "Product added To wishlist sucessfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addToWishList;
