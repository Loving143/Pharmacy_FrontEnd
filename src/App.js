
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Signup from './components/Signup';
import ContactUs from './components/ContactUs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryBar from './components/CategoryBar';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from "./context/CartContext";
import CartPage from './pages/CartPage';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
     <AuthProvider>    <CartProvider>
    <Header />
    
    <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<CategoryBar/>} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
    </Routes>
    </CartProvider>
    </AuthProvider>

    
    </>
  );
}

export default App;
