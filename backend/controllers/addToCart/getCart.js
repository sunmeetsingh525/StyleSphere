const createError = require("http-errors");
const Cart = require("../../models/Cart.model");
const { cartValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const getCart = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const getCart = await Cart.aggregate([
      {
        $match: {
          userId: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          let: { id: "$productId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$id"] }],
                },
              },
            },

            {
              $lookup: {
                from: "cart",
                localField: "_id",
                foreignField: "productId",
                as: "cart",
              },
            },
            {
              $addFields: {
                isAddedToCart: {
                  $in: ["$_id", "$cart.productId"],
                },
              },
            },
            {
              $lookup: {
                from: "wishLists",
                localField: "_id",
                foreignField: "productId",
                as: "wishlist",
              },
            },

            {
              $addFields: {
                isAddedToWishList: {
                  $in: ["$_id", "$wishlist.productId"],
                },
              },
            },
          ],

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

    const totalQuantity = getCart?.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    );

    res.status(200).json({
      message: "success",
      quantity: totalQuantity,
      data: getCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCart;
