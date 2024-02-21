const { Schema, model } = require("mongoose");

const WishList = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

WishList.index({ userId: 1, productId: 1 }, { unique: true });
module.exports = model("WishList", WishList, "wishLists");
