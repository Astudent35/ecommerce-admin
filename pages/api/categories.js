import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        const categories = await Category.find();
        res.status(200).json(categories);
    }

    if (method === "POST") {
        const {name, parentCategory} = req.body;
        const categoryDoc = await Category.create({name, parent: parentCategory}); // This line is correct
        res.status(200).json(categoryDoc);
    }

}