const productModel = require("../models/product-model");

const allProducts = async (req, res) => {
  const allProducts = await productModel.find({ seller_id: req.user.id });

  if (allProducts.length === 0) {
    return res
      .status(404)
      .json({ message: "No Products Found, Add products First" });
  }
  res.status(200).json({ allProducts });
};

//create a new product
const addProduct = async (req, res) => {
  const { name, price, description, discount, bgcolor, textcolor, panelcolor } =
    req.body;

  // console.log(req.body);

  // console.log(name, price);

  if (!name || !price) {
    return res
      .status(400)
      .json({ message: "Name and Price fields are required" });
  }

  const newProduct = await productModel.create({
    seller_id: req.user.id,
    name: name,
    price: price,
    description: description,
    discount: discount,
    bgcolor: bgcolor,
    textcolor: textcolor,
    panelcolor: panelcolor,
  });
  if (!newProduct) {
    return res.status(400).json({ message: "Product not created, Try again" });
  } else {
    return res.status(201).json({ newProduct });
  }
};

const updateProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.seller_id.toString() !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return res.status(400).json({ message: "Product not updated, Try again" });
  }
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.seller_id.toString() !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const deleteProduct = await productModel.findByIdAndDelete(req.params.id);
  return res.status(200).json(deleteProduct);
};

module.exports = { allProducts, addProduct, updateProduct, deleteProduct };
