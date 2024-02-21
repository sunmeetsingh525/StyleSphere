const User = require("../../models/User.model");
const createError = require("http-errors");

const getAllUsers = async (req, res, next) => {
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
    const allUsers = await User.aggregate([
      { $match: searchCriteria },
      {
        $facet: {
          data: [{ $skip: startIndex }, { $limit: parseInt(viewSize) }],
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
      count: allUsers?.[0]?.count?.[0]?.total,
      data: allUsers?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUsers;
