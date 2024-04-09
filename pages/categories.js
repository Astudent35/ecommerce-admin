import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get("/api/categories").then((res) => setCategories(res.data));
    }

    async function saveCategory(e) {
        e.preventDefault();
        await axios.post("/api/categories", {name, parentCategory})
        setName("");
        fetchCategories();
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>Add category</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input value={name} onChange={(e) => setName(e.target.value)} className="mb-0" type="text" placeholder={"category name"}/>
                <select className="mb-0" onChange={e => setParentCategory(e.target.value)} value={parentCategory}>
                    <option value="">Select category</option>
                    {categories.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary py-1">Save</button>
            </form>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Category name</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}