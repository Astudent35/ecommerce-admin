import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  async function createProduct(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      price
    }
    await axios.post("/api/products", data);
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
      <h1>Add product</h1>
        <label>Product name</label>
        <input type="text" placeholder="Product name" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Product description</label>
        <textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Product price</label>
        <input type="number" placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}

