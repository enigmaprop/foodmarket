import React, { useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie";

const AddCatagoryField = (parms) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');

    const [response, setResponse] = useState('')

    const addCatagoryUrl = `${parms.url}categories/addCategory`


    const sendingCategory = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', selectedImage);

        console.log(formData);
        try {
            const { data } = await axios.post(addCatagoryUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' ,
                    "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
            });
            setResponse('تم اضافة الصنف بنجاح');
        } catch (error) {
            setResponse('فشلت عملية الصنف المنتج');
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
            
                <div className="flex flex-col">
                    <input
                        onClick={sendingCategory}
                        className="bg-blue-700 w-[6rem] h-[2rem] rounded-xl hover:bg-blue-400"
                        type='submit'
                    />
                    <label className="mt-3">{response}</label>
                </div>
            </div>
        </div>
    )
}

export default AddCatagoryField ;