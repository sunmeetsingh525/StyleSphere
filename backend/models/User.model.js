const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      enum: ["admin", "customer"],
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema, "users");
