import { Table } from "antd";
import { useEffect, useState } from "react";
import AddProductField from "./AddProductField";
import DeleteProductField from "./DeleteProductField";
import axios from "axios";
import AddCatagoryField from "./AddCategoryField";
import DeleteCategoryField from "./DeleteCategoryField";
import Cookies from "js-cookie";
import DiscountField from "./DiscountsField";
import PointsPackages from "./PointsPackages";
import AddNewsField from "./AddNewsField";

function AdminDashboard(parms) {

  const [addVisibility , setAddVisibility] = useState(false);
  const [deleteVisibility , setDeleteVisibility] = useState(false);

  const [addCataVisibility , setAddCataVisibility] = useState(false);
  const [deleteCataVisibility , setDeleteCataVisibility] = useState(false);

  
  const [orders , setOrders] = useState([]);
  
  const [orderId , setOrderId] = useState('');
  const [orderFirstName , setOrderFirstName] = useState('');
  const [orderLastName , setOrderLastName] = useState('');

  const handleReceipt = async(text) => {
    const url = `/admin/receipt/${text}` ;
    window.open(url, "_blank");
  };

  const addProductHolder =(e)=>{
    if(addVisibility && !deleteVisibility){
      setAddVisibility(false);
    } else if(!addVisibility && deleteVisibility){
      setAddVisibility(true);
      setDeleteVisibility(false)
    }else{
      setAddVisibility(true);
    }
  }

  const deleteProductHolder =(e)=>{
    if(!addVisibility && deleteVisibility){
      setDeleteVisibility(false);
    } else if(addVisibility && !deleteVisibility){
      setAddVisibility(false);
      setDeleteVisibility(true)
    }else{
      setDeleteVisibility(true)
    }
  }

  const addCatagoryHolder =(e)=>{
    if(addCataVisibility && !deleteCataVisibility){
      setAddCataVisibility(false);
    } else if(!addCataVisibility && deleteCataVisibility){
      setAddCataVisibility(true);
      setDeleteCataVisibility(false)
    }else{
      setAddCataVisibility(true);
    }
  }

  const deleteCatagoryHolder =(e)=>{
    if(!addCataVisibility && deleteCataVisibility){
      setDeleteCataVisibility(false);
    } else if(addCataVisibility && !deleteCataVisibility){
      setAddCataVisibility(false);
      setDeleteCataVisibility(true)
    }else{
      setDeleteCataVisibility(true)
    }
  }
  
  const searchByIdHandler = async(e)=>{
    if(orderId){
      e.preventDefault()
      const id = orderId;
      const response = await axios.get(`${parms.url}orders/byId/${id}` , {
        headers:{
          "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
        }
      });
      const data = response.data;
      setOrders([data]);
    }else{
      const response = await axios.get(`${parms.url}orders/` , {
        headers: {
          "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
        }
      });
      const data = response.data
      setOrders(data);
    }

  }

  const searchByNameHandler = async(e)=>{
    if(orderFirstName && orderLastName){
      console.log(orderFirstName);
      e.preventDefault()
      const firstname = orderFirstName;
      const lastname = orderLastName;

      const response = await axios.get(`${parms.url}orders/byName/${firstname}/${lastname}` , {
        headers:{
          "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
        }
      });
      const data = response.data;
      setOrders(data);
    }else{
      const response = await axios.get(`${parms.url}orders/` , {
        headers: {
          "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
        }
      });
      const data = response.data
      setOrders(data);
    }

  }

useEffect(()=>{
    
  const getOrders = async()=>{
      const response = await axios.get(`${parms.url}orders/` , {
        headers: {
          "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
        }
      });
      const data = response.data
      setOrders(data);
  }
  getOrders()
} , [parms])


  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text)=><button onClick={e=>handleReceipt(text)} >{text}</button>
      
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Discounts",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const expandedRowRender = (record) => {
    const productColumns = [
      { title: "Product Name", dataIndex: "name", key: "name" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice" },
      { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    ];

    const data = record.products.map((product) => ({
      key: product.peoductId,
      name: product.productName,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.quantity * product.unitPrice,
    }));
      console.log(orders);
      return <Table columns={productColumns} dataSource={data} pagination={false} />;
    
  };

  return (
    <div>
<section className="flex flex-col">
    <h2 className="text-black text-center">Products</h2>
  <div className="flex justify-around items-center my-24">
    <button onClick={(e)=>addProductHolder(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Add Product</button>
    <button onClick={(e)=>deleteProductHolder(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Delete Product</button>
  </div>

  <div className={`w-[70vw] h-[80vh] ml-36 mb-24 mt-6 p-4 flex flex-col justify-center ${addVisibility ? '' : 'hidden'} items-center bg-indigo-500 rounded-lg text-white`}>
     <AddProductField pubkey={parms.pubkey} /> 
  </div>
  <div className={`w-[70vw] h-[80vh] ml-36 mb-24 mt-6 p-4 flex flex-col justify-center ${deleteVisibility ? '' : 'hidden'} items-center bg-indigo-500 rounded-lg text-white`}>
     <DeleteProductField pubkey={parms.pubkey} url={parms.url} /> 
  </div>

</section>
<section>
  <h2 className="text-black text-center">Catagories</h2>
  <div className="flex justify-around items-center my-24">
    <button onClick={(e)=>addCatagoryHolder(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Add Category</button>
    <button onClick={(e)=>deleteCatagoryHolder(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Delete Category</button>
  </div>

  <div className={`w-[70vw] h-[80vh] ml-36 mb-24 mt-6 p-4 flex flex-col justify-center ${addCataVisibility ? '' : 'hidden'} items-center bg-indigo-500 rounded-lg text-white`}>
     <AddCatagoryField pubkey={parms.pubkey} url={parms.url} /> 
  </div>
  <div className={`w-[70vw] h-[80vh] ml-36 mb-24 mt-6 p-4 flex flex-col justify-center ${deleteCataVisibility ? '' : 'hidden'} items-center bg-indigo-500 rounded-lg text-white`}>
     <DeleteCategoryField pubkey={parms.pubkey} url={parms.url} /> 
  </div>

</section>

<section>
  <h2 className="text-black text-center">Discounts</h2>
  <div className="w-full"><DiscountField pubkey={parms.pubkey} url={parms.url}/></div>
</section>

<section>
  <h2 className="text-black text-center">Points</h2>
  <div className="w-full"><PointsPackages pubkey={parms.pubkey} url={parms.url}/></div>
</section>

<section>
  <h2 className="text-black text-center">News</h2>
  <div className="w-full"><AddNewsField pubkey={parms.pubkey} url={parms.url}/></div>
</section>

<section>
  <h2 className="text-black text-center">Orders</h2>
  <div  className="flex justify-around items-center my-24">
      <div className="flex flex-col">
        <button onClick={(e)=>searchByIdHandler(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Search By Id</button>
        <input onChange={(e)=>setOrderId(e.target.value)} className="bg-gray-400 h-8 rounded-md p-3" type={'text'} name='id' />
      </div>

      <div className="flex flex-col">
        <button onClick={(e)=>searchByNameHandler(e)} className="m-5 w-36 h-12 bg-indigo-500 rounded-full text-white">Search By Name</button>
        <input onChange={(e)=>setOrderFirstName(e.target.value)} className="bg-gray-400 h-8 rounded-md p-3 mb-5" type={'text'} name='firstname' />
        <input onChange={(e)=>setOrderLastName(e.target.value)} className="bg-gray-400 h-8 rounded-md p-3" type={'text'} name='lastname' />

      </div>  
    </div>
</section>

  <section>
    <h2>Orders</h2>
    <Table
      columns={columns}
      dataSource={orders.reverse()}
      expandable={{ expandedRowRender }}
      rowKey="id"
    />
  </section>

<div className="text-center">
  <button onClick={(e)=>{Cookies.remove(parms.pubkey)
                          window.location.replace('/')}} className="m-5 w-36 h-12 bg-red-500 hover:bg-red-600 rounded-full text-white">Log Out</button>
</div>

</div>

);
}

export default AdminDashboard;
