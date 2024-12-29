const express = require("express");

const {
  createSeller,
  loginSeller,
  currentSeller,
} = require("../controllers/sellerController");

const {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validateToken = require("../middleware/tokenValidationHandler");

const router = express.Router();

router.post("/createSeller", createSeller);
router.post("/loginSeller", loginSeller);
router.get("/sellerProfile", validateToken, currentSeller);
router.get("/allProducts", validateToken, allProducts);
router.post("/addProduct", validateToken, addProduct);
router.put("/updateProduct/:id", validateToken, updateProduct);
router.delete("/deleteProduct/:id", validateToken, deleteProduct);

module.exports = router;
