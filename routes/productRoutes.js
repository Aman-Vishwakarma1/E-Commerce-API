const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationHandler");
const { addProduct } = require("../controllers/productController");
router.use(validateToken);

module.exports = router;
