import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice,
    images:existingImages,
    category:assignedCategory,
    properties:assignedProperties}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || [])
    const [isUploading, setIsUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(assignedCategory || "")
    const [productProperties, setProductProperties] = useState(assignedProperties || {})

    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setCategories(res.data)
        })
    }, []);

    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(e) {
      e.preventDefault();
      const data = {title,description,price, images, category, properties: productProperties}
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

    async function uploadImages(e){
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {return [...oldImages, ...res.data.links]})
        }
        setIsUploading(false)
    }

    function updateImagesOrder(images){
        setImages(images)
    }

    function setProductProperty(name, value){
        setProductProperties(prev => {
            const newProps = {...prev};
            newProps[name] = value;
            return newProps;
        })
    }

    const propertiesToFill = [];
    if (category.length > 0 && category) {
        let categoryInfo = categories.find(({_id}) => _id === category);
        if (categoryInfo) { // Ensure categoryInfo is not undefined
            propertiesToFill.push(...categoryInfo.properties);
        }
        while (categoryInfo?.parent?.id) {
            const parentCat = categories.find(({_id}) => _id === categoryInfo.parent.id);
            if (parentCat) {
                propertiesToFill.push(...parentCat.properties);
                categoryInfo = parentCat;
            }
        }
    }

    return (
        <form onSubmit={saveProduct}>
          <label>Product name</label>
          <input type="text" placeholder="Product name" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Uncategorized</option>
            {categories.length > 0 && categories.map(category => (
                <option value={category._id}>{category.name}</option>
            ))}
          </select>
          {propertiesToFill.length > 0 && propertiesToFill.map(property => (
            <div className="flex gap-1">
                <div>{property.name}</div>
                <select value={productProperties[property.name]} onChange={e => setProductProperty(property.name, e.target.value)}>
                    {property.value.map(value => (
                        <option value={value}>{value}</option>
                    ))}
                </select>
            </div>
          ))}
          <label>Photos</label>
          <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable 
            list={images} 
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}>
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
            </ReactSortable>
            {isUploading && (
                <div className="h-24 flex items-center ">
                    <Spinner />
                </div>
            )}
            <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                <div>
                    Upload
                </div>
                <input type="file" className="hidden" onChange={uploadImages} />
            </label>
          </div>
          <label>Product description</label>
          <textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <label>Product price</label>
          <input type="number" placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" className="btn-primary">Save</button>
        </form>
    );
}