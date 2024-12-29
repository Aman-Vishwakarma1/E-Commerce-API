const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/seller-model");

//POST : /seller/createSeller
//DESC: Create Seller
//ACCESS: Public
const createSeller = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!email || !password || !name || !phone) {
    res.status(400).json({ message: "All fields are required" });
  }
  const availableUser = await sellerModel.findeOne({ email, phone });
  if (availableUser) {
    res.status(400).json({ message: "Email or Phone already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newSeller = await sellerModel.create({
    name,
    email,
    phone,
    password: hashPassword,
  });
  if (!newSeller) {
    res.status(400);
    throw new Error("Seller not created, Try again");
  } else {
    res.status(201).json({ seller });
  }
};

//POST : /seller/loginSeller
//Desc: Login Seller
//Access: Public
const loginSeller = async (req, res) => {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone) {
    res.status(400).json({ message: "All fields are required" });
  }
  const seller = await sellerModel.findOne({ email, phone });
  console.log(seller);
  if (!seller) {
    res.status(400).json({ message: "New User ? Sign Up First !" });
  }
  const isPasswordMatch = await bcrypt.compare(password, seller.password);
  if (isPasswordMatch) {
    const accessToken = jwt.sign(
      {
        id: seller.id,
        email: seller.email,
        password: seller.password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ Token: accessToken });
    // res.redirect("/seller/SellerProfile");
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

const currentSeller = async (req, res) => {
  res.status(200).json({ seller: req.user });
};

module.exports = { createSeller, loginSeller, currentSeller };
