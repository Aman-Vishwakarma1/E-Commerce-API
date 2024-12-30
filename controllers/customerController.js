const customerModel = require("../models/customer-model");
const productModel = require("../models/product-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const allProducts = async (req, res) => {
  const allProducts = await productModel.find();
  if (allProducts.Length === 0) {
    return res
      .status(404)
      .json({ message: "No Products Found, Shop is Closed" });
  }
  res.status(200).json({ allProducts });
};

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const availableUser = await customerModel.findOne({ email, phone });
  console.log(availableUser);

  if (availableUser) {
    return res.status(400).json({ message: "Email or Phone already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await customerModel.create({
    name,
    email,
    phone,
    password: hashPassword,
  });

  if (!newUser) {
    return res.status(400).json({ message: "User not created, Try again" });
  } else {
    return res.status(201).json({ newUser });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await customerModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "New User ? Sign Up First !" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (isPasswordMatch) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ Token: accessToken });
  }
};

const customerProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const product = await productModel.findById(productId);
  console.log(userId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await customerModel.findByIdAndUpdate(
    userId,
    { $push: { cart: product } },
    { new: true }
  );
  return res.status(200).json({ message: "Product added to cart", product });
};

const deleteFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const user = await customerModel.findById(userId);
  const prevCart = [...user.cart];
  let newCart = prevCart;
  // console.log("before : ", newCart);

  if (!userId) {
    return res.status(404).json({ message: "User not found or Login First" });
  }

  const removeProductIndex = newCart.findIndex(
    (obj) => obj._id.toString() === productId
  );

  if (removeProductIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const deleteProduct = newCart.splice(removeProductIndex, 1);
  console.log(deleteProduct);

  await customerModel.findByIdAndUpdate(
    userId,
    { cart: newCart },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Product deleted from cart", deleteProduct });
};

module.exports = {
  allProducts,
  signup,
  signin,
  customerProfile,
  addToCart,
  deleteFromCart,
};
