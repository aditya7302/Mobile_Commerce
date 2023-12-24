import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Conditions from './pages/Conditions';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path='/aboutus' element={<AboutUs/>} />
      <Route path='/register' element={<Register/>} />
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
        </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/contactus' element={<ContactUs/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='/conditions' element={<Conditions/>} />
      <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
