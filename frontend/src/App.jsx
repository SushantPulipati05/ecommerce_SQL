import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DashboardPage from "./pages/home/dashboard"
import ProtectedRoute from './components/protectedRoute';
import CategoryPage from './pages/home/categoryPage';


function App() {
 

  return (
    <div id="root">
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />    
        <Route path="/auth/signup" element={<SignupPage />} />   
        <Route path ="/dashboard" element={<ProtectedRoute element= {<DashboardPage />} />} />  
        <Route path = "/product/category/:categoryName" element={<ProtectedRoute element= {<CategoryPage />} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;