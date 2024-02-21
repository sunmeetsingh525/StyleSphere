const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;
const getProducts = async (req, res, next) => {
  try {
    const { keyword, status } = req.query;
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    let searchCriteria = {};

    if (keyword) {
      searchCriteria["$or"] = [
        {
          "category.name": { $regex: `${keyword}`, $options: "i" },
        },
        {
          name: { $regex: `${keyword}`, $options: "i" },
        },
      ];
    }
    if (status) {
      searchCriteria = {
        ...searchCriteria,
        isActive: status === "true" ? true : false,
      };
    }
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
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
        $lookup: {
          from: "wishLists",
          localField: "_id",
          foreignField: "productId",
          as: "wishlist",
        },
      },

      {
        $match: searchCriteria,
      },

      {
        $project: {
          isActive: 1,
          name: 1,
          description: 1,
          price: 1,
          inventory: 1,
          media: 1,
          buyCount: 1,
          categoryId: 1,
          category: 1,
          isAddedToCart: {
            $in: [ObjectId(req?.user?._id), "$cart.userId"],
          },
          isAddedToWishlist: {
            $in: [ObjectId(req?.user?._id), "$wishlist.userId"],
          },
        },
      },
      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $count: "total",
            },
          ],
          activeCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: true }],
              },
            },
            {
              $count: "active",
            },
          ],
          inactiveCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: false }],
              },
            },
            {
              $count: "inactive",
            },
          ],
        },
      },
    ]);
    res.json({
      success: true,
      status: 200,
      message: "Product fetched successfully",
      count: products?.[0]?.count?.[0]?.total,
      activeCount:
        !!products?.[0]?.activeCount?.[0]?.active === false
          ? 0
          : products?.[0]?.activeCount?.[0]?.active,
      inActiveCount:
        !!products?.[0]?.inactiveCount?.[0]?.inactive === false
          ? 0
          : products?.[0]?.inactiveCount?.[0]?.inactive,
      products: products?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
