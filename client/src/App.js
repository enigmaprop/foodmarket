import MainPage from "./pages/Mainpage";
import CatagoriesPage from "./pages/CatagoriesPage";
import { Route, Routes } from 'react-router-dom';
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import CatagoryPage from "./pages/CatagoryPage";
import PurchasePage from "./pages/PurchasePage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ReceiptPage from "./pages/ReceiptPage";
import Handle404Page from "./pages/Handle404Page";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";

function App() {
  
  const url = 'http://localhost:4000/'
  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage url={url} />} />
        <Route path="/catagories" element={<CatagoriesPage url={url} />} />
        <Route path="/products/:id" element={<ProductPage cartName={'mallCartItems'} url={url} />} />
        <Route path="/order" element={<OrderPage formOrder={"mallOrder"} cartName={'mallCartItems'} />} />
        <Route path="/cart" element={<CartPage url={url} cartName={'mallCartItems'} />} />
        <Route path="/catagories/:cataName" element={<CatagoryPage url={url} />} />    
        <Route path="/purchase" element={<PurchasePage id={'id'} url={url} cartName={'mallCartItems'} formOrder={'mallOrder'} />} />        
        <Route path="/signup" element={<SignUpPage url={url}/>} />  
        <Route path="/login" element={<LoginPage url={url}/>} />  

        <Route path="/profile" element={<UserPage id='id' url={url}/>} />  
        <Route path="/admin/receipt/:id" element={<ReceiptPage pubkey='key' url={url}/>} />        

        <Route path="/admin" element={<AdminPage pubkey='key' url={url}/>} />        
        <Route path="/admin/login" element={<AdminLoginPage pubkey='key' url={url}/>} />

        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="refund-policy" element={<RefundPolicyPage />} />

        <Route path="*" element={<Handle404Page/>} />
      </Routes>
    </div>
  );
}

export default App;
