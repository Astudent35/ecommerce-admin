import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === "GET") {
    const products = await Product.find();
    res.json({products});
  }

  if (method === "POST") {
    const {title, description, price} = req.body;
    const productDoc = await Product.create(
        {title, description, price}
    )
    res.status(200).json({message: productDoc});
  }
}

