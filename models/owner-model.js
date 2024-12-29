const mongoose = require("mongoose");
const ownerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    phone: {
      type: Number,
      required: [true, "Number is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    products: {
      type: Array,
      default: [],
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const owner = mongoose.model("owner", ownerSchema);

module.exports = owner;
