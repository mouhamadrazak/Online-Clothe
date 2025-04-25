import mongoose from "mongoose";
// we import the product data from frontend to store it in the data base
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});
// this or operatior  when the product models is already available than that model will be used the(mongoose.models.product) and if its not available it will create a new model using this schema( mongoose.model("product",productSchema))
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema); // we store the product schema in the product model whenever we will
// run this projuct then the model will be created multiples times and we can create the model only once

export default productModel;
