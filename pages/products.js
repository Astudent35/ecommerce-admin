import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProducts(response.data.products);
            console.log(response.data.products);
        })
    }, [])
    return (
        <Layout>
            <Link className="bg-blue-900 rounded-md text-white py-1 px-2" href={'/products/add'}>
                Add new product
            </Link>
            <table>
                <thead>
                    <tr>
                        <td>Product name</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr>
                            <td>{product.title}</td>
                            <td>buttons</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}