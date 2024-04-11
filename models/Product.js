import mongoose, {Schema, model, models} from 'mongoose';

const ProductSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  images: {type: [String], required: false},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false},
  properties: {type: Object, required: false}
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;