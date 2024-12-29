const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    images: String,
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    Description: {
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
    panelColour: {
      type: String,
      default: "",
    },
    textColor: {
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
