const express = require("express");

const {
  createSeller,
  loginSeller,
  currentSeller,
} = require("../controllers/sellerController");
const validateToken = require("../middleware/tokenValidationHandler");

const router = express.Router();

router.post("/createSeller", createSeller);
router.post("/loginSeller", loginSeller);
router.get("/sellerProfile", validateToken, currentSeller);

module.exports = router;
