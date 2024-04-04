import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true}
});

const Product = model("Product", ProductSchema);

export default Product;