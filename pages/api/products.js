import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req, res)

  if (method === "GET") {
    const products = await Product.find();
    if (req.query?.id) {
      const product = await Product.findById(req.query.id);
      res.json(product);
    } else {
      res.json(products);
    }
  }
  if (method === "POST") {
    const {title, description, price, images, category, properties} = req.body;
    const productDoc = await Product.create(
        {title, description, price, images, category, properties}
    )
    res.status(200).json({message: productDoc});
  }
  if (method === "PUT") {
    const {title, description, price, images, _id, category, properties} = req.body;
    await Product.updateOne({_id}, {title, description, price, images, category, properties});
    res.json(true);
  }
  if (method === "DELETE") {
    if(req.query.id){
        await Product.deleteOne({_id: req.query.id});
    }
    res.json(true);
  }
}

