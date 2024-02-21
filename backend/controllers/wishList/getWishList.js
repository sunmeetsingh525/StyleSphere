// const createError = require("http.createError");
const WishList = require("../../models/Wishlist.model");
const { ObjectId } = require("mongoose").Types;
const { wishlistValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");

const getWishList = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const getWishList = await WishList.aggregate([
      {
        $match: {
          userId: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",

          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.status(200).json({
      message: "success",
      data: getWishList,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getWishList;
