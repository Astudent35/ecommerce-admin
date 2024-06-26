import mongoose, {Schema, model, models} from 'mongoose';

const CategorySchema = new Schema({
  name: {type: String, required: true},
  parent: {type: mongoose.Types.ObjectId, required: false, ref:'Category'},
  properties: [{type: Object, required: false}]
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;