import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function CategoriesPage({swal}) {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get("/api/categories").then((res) => setCategories(res.data));
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = {name, parentCategory};
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }
        setName("");
        fetchCategories();
    }

    function deleteCategory(category) {
        swal.fire({
            title: `Are you sure you want to delete ${category.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async result => {
            if (result.isConfirmed) {
              const {_id} = category;
              await axios.delete('/api/categories?_id='+_id);
              fetchCategories();
            }
          });
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit category: ${editedCategory.name}` : "Add category"}</label>
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
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <div>
                                <td>
                                    <button onClick={() => editCategory(category)} className="btn-primary mr-1">Edit</button>
                                    <button onClick={() => deleteCategory(category)} className="btn-primary">Delete</button>
                                </td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal}) => {
    return <CategoriesPage swal={swal} />;
});

