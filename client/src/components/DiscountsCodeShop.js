import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const DiscountCodeShop = (parms) => {
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [response , setResponse] = useState('');

  const discountCodes = parms.discounts

  const handleSelectDiscount = (discount) => {
    setSelectedDiscount(discount);
  };

  const handleBuyDiscountCode = async() => {
    if (selectedDiscount) {
      // Generate discount code
      const discountId = selectedDiscount.id;
      const userId = Cookies.get(parms.id);
      const data = {discountId , userId}
      await axios.post(`${parms.url}discount/buyGeneralDiscount` , data , {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded' ,
          "Authorization":`Bearer ${userId}`
        }
      }).then((val)=>{
        if(val.data === 'Discount added successfully.'){
          setResponse('تمت اضافة الخصم بنجاح');
        }else{
          setResponse('فشلت عملية اضافة الخصم');
        }
        console.log(val.data);
      })
      // Update state
      setDiscountCode("");
      setSelectedDiscount("");
      setShowConfirmation(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">متجر الخصومات</h1>
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">نقاطي</h2>
          <p className="text-gray-500 mb-4">{parms.user.points} نقاطي</p>
          <h2 className="text-lg font-bold mb-2">الخصومات المتاحة</h2>
          <ul>
            {discountCodes.map((discount) => (
              <li
                key={discount.id}
                className="flex items-center justify-between p-2 my-3 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectDiscount(discount)}
              >
                <span>{discount.id}</span>
                <span className="text-gray-500">{discount.value * 100} %</span>
                <span className="text-gray-500">مرة {discount.usingTimes}</span>
                <span className="text-gray-500">{discount.cost} نقطة</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button
              className={`bg-blue-500 text-white rounded-md px-4 py-2 ${
                selectedDiscount ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!selectedDiscount}
              onClick={() => setShowConfirmation(true)}
            >
              اشتر الخصم
            </button>
          </div>
        </div>
      </div>
      <div>{response}</div>
      {showConfirmation && (
        <div className="bg-white rounded-md shadow-md overflow-hidden mt-4">
          <div className="p-4">
            <h2 className="text-lg text-black font-bold mb-2">
               هل انت متأكد من انك تريد شراء الخصم {selectedDiscount.id}
            </h2>
            <div className="flex justify-end">
              <button
                className="text-gray-500 mr-4"
                onClick={() => setShowConfirmation(false)}
                >
                الغاء
                </button>
                <button
                             className="bg-blue-500 text-white rounded-md px-4 py-2"
                             onClick={handleBuyDiscountCode}
                           >
                تأكيد
                </button>
                </div>
                </div>
                </div>
                )}
                {discountCode && (
                <div className="bg-white rounded-md shadow-md overflow-hidden mt-4">
                <div className="p-4">
                <h2 className="text-lg font-bold mb-2">Discount Code Purchased!</h2>
                <p className="text-gray-500 mb-4">
                Your new discount code is <strong>{discountCode}</strong>
                </p>
                <button
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={() => setDiscountCode("")}
                >
                Close
                </button>
                </div>
                </div>
                )}
                </div>
                );
                };
                
export default DiscountCodeShop;
