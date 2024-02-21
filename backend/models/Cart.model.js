const { Schema, model } = require("mongoose");

const Cart = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
Cart.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = model("Cart", Cart, "cart");
