
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import ContactUs from './components/ContactUs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryBar from './components/CategoryBar';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from "./context/CartContext";
import CartPage from './pages/CartPage';
import { AuthProvider } from "./context/AuthContext";
import Signup from './components/Signup';
import OtpVerification from './components/OtpVerification';
import CreateProfile from "./components/UserComponent/CreateProfile";
import Login from './components/Login';
import UserDashboard from './components/UserComponent/UserDashBoard';
import ViewProfile from './components/UserComponent/ViewProfile';
import EditProfile from './components/UserComponent/EditProfile';
import MedicineDetails from './components/UserComponent/MedicineDetails';

function App() {
  return (
    <>
     <AuthProvider>    <CartProvider>
    <Header />
    
    <Routes>
                <Route path= "/signup" element={<Signup />} />
                <Route path= "/otp-verification" element={<OtpVerification />} />
                <Route path= "/login" element={<Login />} />
                <Route path= "/" element={<CategoryBar/>} />
                <Route path= "/contact" element={<ContactUs />} />
                <Route path= "/product/:id" element={<ProductDetails />} />
                <Route path= "/cart" element={<CartPage />} />
                <Route path= "/create-profile" element={<CreateProfile />} />
                <Route path= "/view-profile" element={<ViewProfile />} />
                <Route path= "/edit-profile" element={<EditProfile />} />
                <Route path= "/user-dashboard" element={<UserDashboard />} />
                <Route path="/medicine/:id" element={<MedicineDetails />} />
    </Routes>
    </CartProvider>
    </AuthProvider>

    
    </>
  );
}

export default App;
