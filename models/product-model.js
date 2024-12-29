const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    images: String,
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    discount: {
      type: String,
      default: 0,
    },
    bgcolor: {
      type: String,
      default: "",
    },
    panelcolour: {
      type: String,
      default: "",
    },
    textcolor: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const products = mongoose.model("product", productSchema);
module.exports = products;
