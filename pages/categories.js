import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function CategoriesPage({swal}) {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get("/api/categories").then((res) => setCategories(res.data));
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = {
            name,
            parentCategory,
            properties:properties.map(p => ({
              name:p.name,
              value:p.value.split(','),
            })),
          };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }
        setName("");
        setParentCategory("");
        setProperties([]);
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

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(
          category.properties.map(({name,value}) => ({
          name,
          value:value.join(',')
        }))
        );
      }

    function addProperty() {
        setProperties(prev => {
          return [...prev, {name:'',value:''}];
        });
      }

    function removeProperty(index) {
        setProperties(prev => {
            const newProperties = [...prev];
            newProperties.splice(index, 1);
            return newProperties;
        });
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const newProperties = [...prev];
            newProperties[index].name = newName;
            return newProperties;
        });
    }

    function handlePropertyValueChange(index, property, newValue) {
        setProperties(prev => {
            const newProperties = [...prev];
            newProperties[index].value = newValue;
            return newProperties;
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit category: ${editedCategory.name}` : "Add category"}</label>
            <form onSubmit={saveCategory} >
                <div className="flex gap-1">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={"category name"}/>
                    <select onChange={e => setParentCategory(e.target.value)} value={parentCategory}>
                        <option value="">Select category</option>
                        {categories.length > 0 && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">Add property</button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1 mb-2" >
                            <input className="mb-0" value={property.name} onChange={e => handlePropertyNameChange(index, property, e.target.value)} type="text" placeholder={"property name"}/>
                            <input className="mb-0" value={property.value} onChange={e => handlePropertyValueChange(index, property, e.target.value)} type="text" placeholder={"property value"}/>
                            <button onClick={() => removeProperty(index)} type="button" className="btn-red text-sm">Remove</button>
                        </div>
                    ))} 
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button type="button" className="btn-default" onClick={() => {setEditedCategory(null), setName(""), setParentCategory(""), setProperties([])}}>Cancel</button>
                    )}
                    <button type="submit" className="btn-primary py-1">Save</button>
                </div>
                
            </form>
            {!editedCategory && (
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
                                        <button onClick={() => editCategory(category)} className="btn-default mr-1">Edit</button>
                                        <button onClick={() => deleteCategory(category)} className="btn-red">Delete</button>
                                    </td>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}

export default withSwal(({swal}) => {
    return <CategoriesPage swal={swal} />;
});