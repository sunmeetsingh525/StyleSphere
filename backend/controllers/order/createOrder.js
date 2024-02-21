const OrderModel = require("../../models/Order.model");
const ProductModel = require("../../models/Product.model");
const CartModel = require("../../models/Cart.model");
const { ObjectId } = require("mongoose").Types;

const createOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    const { _id: userId } = req.user;

    const productIds = products.map((p) => ObjectId(p.productId));
    const productsList = await ProductModel.find({
      _id: { $in: productIds },
    });

    const total = productsList.reduce((acc, product) => {
      const selectedProduct = products.find(
        (p) => p?.productId?.toString() == product._id?.toString()
      );

      return acc + product.price * selectedProduct.quantity;
    }, 0);

    await OrderModel.create({ products, userId, totalAmount: total });
    await CartModel.deleteMany({ userId: ObjectId(userId) });

    res.status(200).json({
      success: true,
      message: "Order Us created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrder;
