const { Schema, model } = require("mongoose");

const ProductMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const ProductSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    media: [
      {
        type: ProductMedia,
        required: false,
      },
    ],
    buyCount: {
      type: Number,
      default: 0,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema, "products");
