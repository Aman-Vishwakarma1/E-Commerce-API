const express = require("express");
const routes = express.Router();

const {
  allProducts,
  signup,
  signin,
  addToCart,
  deleteFromCart,
  customerProfile,
} = require("../controllers/customerController");
const validateToken = require("../middleware/tokenValidationHandler");
// const { allProducts } = require("../controllers/productController");

routes.get("/", validateToken, allProducts);
routes.post("/signup", signup);
routes.post("/signin", signin);
routes.get("/customerProfile", validateToken, customerProfile);
routes.post("/addToCart/:id", validateToken, addToCart);
routes.delete("/deleteFromCart/:id", validateToken, deleteFromCart);

module.exports = routes;
