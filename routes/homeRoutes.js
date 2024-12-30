const express = require("express");
const routes = express.Router();

const productModel = require("../models/product-model");

routes.get("/", async (req, res) => {
  const allProducts = await productModel.find();
  if (allProducts.Length === 0) {
    return res
      .status(404)
      .json({ message: "No Products Found, Shop is Closed" });
  }
  res.status(200).json({ allProducts });
});

module.exports = routes;
