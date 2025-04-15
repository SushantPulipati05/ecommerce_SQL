import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DashboardPage from "./pages/home/dashboard"
import ProtectedRoute from './components/protectedRoute';
import CategoryPage from './pages/home/categoryPage';
import ProductPage from './pages/home/productPage';
import ProfilePage from './pages/home/profilePage';
import SingleCheckout from './pages/checkout/singleCheckout';


function App() {
 

  return (
    <div id="root">
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />    
        <Route path="/auth/signup" element={<SignupPage />} />   
        <Route path ="/dashboard" element={<ProtectedRoute element= {<DashboardPage />} />} />  
        <Route path = "/product/category/:categoryName" element={<ProtectedRoute element= {<CategoryPage />} />} />
        <Route path="/product/:productId" element={<ProtectedRoute element={<ProductPage />} />} />
        <Route path="/account" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/checkout" element={<ProtectedRoute element={<SingleCheckout />} />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;