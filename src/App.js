
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
import OrderSummary from './pages/OrderSummary'
import AddressPage from './pages/AddressPage';
import Payment from './pages/Payment';
import Homepage from './pages/Homepage';
import Subcategory from './pages/Subcategory';
import Medicines from './pages/Medicines';
/*BrowserRouter is one of the most important components in a React application that uses React Router.
 Its primary job is to enable client-side routing.
<Routes> and <Route> depend on a router context that BrowserRouter provides.
Normally, the browser would:
Send a request to the server.
Reload the entire page.
With BrowserRouter, instead:
The URL changes:
/cart
The page does not reload.
React compares the URL with your routes.
It renders:
BrowserRouter uses the browser's History API.
history.pushState()
Adds a new URL to the browser history without refreshing.
Why Use BrowserRouter Instead of Reloading Pages?

Without React Router:

Click Login
      ↓
Browser sends request
      ↓
Server responds
      ↓
Entire page reloads

With BrowserRouter:

Click Login
      ↓
URL changes
      ↓
React renders Login component
      ↓
No page reload

This leads to a smoother user experience and preserves application state where appropriate.
-----------------------------------------------
By wrapping the entire app:

<BrowserRouter>
      <App />
</BrowserRouter>
every component inside App automatically has access to routing.
BrowserRouter provides routing information

Internally, BrowserRouter creates and shares information such as:

Current URL
Browser history
Navigation functions
Route matching

This information is made available to every component inside it.

Think of it like this:

BrowserRouter
     │
     ├── Current URL
     ├── History
     ├── Navigate Function
     └── Route Matching

Every child component can access this information.
-------------------------------------------
<Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<Login />} />
</Routes>
When React reaches <Routes>, it asks:
"What is the current URL?"
Routes gets the answer from BrowserRouter.
------------------------------------------------
BrowserRouter
      │
 ┌────┼──────────────┐
 │    │      │       │
Routes Link useNavigate useParams

All routing-related components receive their routing information from BrowserRouter.
*/
function App() {
  return (
    <>
     <AuthProvider>    <CartProvider>
    <Header />
    
    <Routes>
                <Route path= "/signup" element={<Signup />} />
                <Route path= "/otp-verification" element={<OtpVerification />} />
                <Route path= "/login" element={<Login />} />
                <Route path= "/" element={<Homepage/>} />
                <Route path= "/contact" element={<ContactUs />} />
                <Route path= "/product/:id" element={<ProductDetails />} />
                <Route path= "/cart" element={<CartPage />} />
                <Route path= "/create-profile" element={<CreateProfile />} />
                <Route path= "/view-profile" element={<ViewProfile />} />
                <Route path= "/edit-profile" element={<EditProfile />} />
                <Route path= "/user-dashboard" element={<UserDashboard />} />
                <Route path="/medicine/:id" element={<MedicineDetails />} />
                <Route path="/cart-summary" element={<OrderSummary />} />
                <Route path="/address" element={<AddressPage />} />
                <Route path="/order-summary" element={<OrderSummary />} />
                <Route path="/subcategories/:categoryCode" element={<Subcategory />} />
                <Route path="/medicines/:subcategoryCode" element={<Medicines />} />
                 <Route path="/payment" element={<Payment />} />
    </Routes>
    </CartProvider>
    </AuthProvider>

    
    </>
  );
}

export default App;
