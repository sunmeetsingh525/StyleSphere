const Category = require("../../models/Category.model");
const createError = require("http-errors");

const getAllCategory = async (req, res, next) => {
  try {
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    let searchCriteria = {};

    const { keyword } = req.query;
    if (keyword) {
      searchCriteria = {
        ...searchCriteria,
        name: { $regex: `^${keyword}`, $options: "i" },
      };
    }
    const allCategory = await Category.aggregate([
      { $match: searchCriteria },
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
        },
      },
    ]);
    res.status(200).json({
      success: true,
      count: allCategory?.[0]?.count?.[0]?.total,
      data: allCategory?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategory;
