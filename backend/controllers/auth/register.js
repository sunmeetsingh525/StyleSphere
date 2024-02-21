const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({
      email,
    });

    if (isExist) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      message: " User created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
