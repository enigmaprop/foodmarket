import React, { useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie";

const AddProductField = (parms) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('')

    const addProductUrl = 'http://localhost:4000/products/addProduct'

    const sendingProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', selectedImage);
        formData.append('description', description);

        console.log(typeof(price));
        console.log(formData);
        try {
            const { data } = await axios.post(addProductUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' ,
                    "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
            });
            if(data === "Product added successfully"){
                setResponse('تم اضافة المنتج بنجاح');
            }else{
                setResponse('فشلت عملية اضافة المنتج');
            }
        } catch (error) {
            setResponse('فشلت عملية اضافة المنتج');
        }
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        console.log(e.target.files[0])
    }

    return (
        <div className="w-full">
            <div className="overflow-y-scroll h-1/2 mt-60">
                <input
                    className="m-5"
                    onChange={handleImageChange}
                    type="file"
                />
                {selectedImage && (
                    <img
                        className="w-[400px] h-[200px]"
                        src={URL.createObjectURL(selectedImage)}
                    />
                )}
                <div className="my-5">
                    <label>الاسم</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        className="m-1 text-black"
                        type="text"
                    />
                </div>
                <div className="my-5">
                    <label>الفئة</label>
                    <input
                        onChange={(e) => setCategory(e.target.value)}
                        name="category"
                        className="m-1 text-black"
                        type="text"
                    />
                </div>
                <div className="my-5">
                    <label>السعر</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        name="price"
                        className="m-1 text-black"
                        type='number'
                    />
                </div>
                <div className="my-5 flex items-top">
                    <label>وصف المنتج</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        className="m-1 text-black w-[70%]"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <input
                        onClick={sendingProduct}
                        className="bg-blue-700 w-[6rem] h-[2rem] rounded-xl hover:bg-blue-400"
                        type='submit'
                    />
                    <label className="mt-3">{response}</label>
                </div>
            </div>
        </div>
    )
}

export default AddProductField;
