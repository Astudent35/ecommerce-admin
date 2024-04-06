import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");

    useEffect(() => {
        setTitle(existingTitle || "");
      }, [existingTitle]);
      
      useEffect(() => {
        setDescription(existingDescription || "");
      }, [existingDescription]);
      
      useEffect(() => {
        setPrice(existingPrice || "");
      }, [existingPrice]);

    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(e) {
      e.preventDefault();
      const data = {title,description,price}
      console.log(_id)
      if (_id) {
        // Update product
        await axios.put('/api/products', {...data,_id});
      } else {
        // Create or add product
        await axios.post("/api/products", data);
      }
      setGoToProducts(true);
    }
    if (goToProducts) {
      router.push("/products");
    }
    return (
        <form onSubmit={saveProduct}>
          <label>Product name</label>
          <input type="text" placeholder="Product name" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Product description</label>
          <textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <label>Product price</label>
          <input type="number" placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" className="btn-primary">Save</button>
        </form>
    );
}