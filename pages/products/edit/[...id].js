import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get('/api/products?id='+id).then((res) => {
          setProductInfo({
              _id: res.data._id,
              title: res.data.title,
              description: res.data.description,
              price: res.data.price,
              images: res.data.images,  
              category: res.data.category
          });
      });
    }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && (<ProductForm {...productInfo} />)}
    </Layout>
  )
}