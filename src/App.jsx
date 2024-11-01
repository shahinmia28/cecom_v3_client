import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Ask from './pages/Ask';
import UserRoute from './context_reducer/router/UserRoute';
import Login from './pages/auth/Login';
import Profile from './pages/user/Profile';
import ForgetPassword from './pages/auth/ForgetPassword';
import Register from './pages/auth/Register';
import AdminProfile from './pages/admin/AdminProfile';
import AdminRoute from '../src/context_reducer/router/AdminRoute.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import CartPage from './pages/CartPage.jsx';
import { Toaster } from 'react-hot-toast';
import PaymentSuccess from './pages/user/PaymentSuccess.jsx';
import PaymentFail from './pages/PaymentFail.jsx';
import Products from './Products.jsx';
import Footer from './components/Footer.jsx';
import MyOrder from './pages/user/MyOrder.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ask' element={<Ask />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/my_order' element={<MyOrder />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='product_details/:slug' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        {/* payment */}
        <Route path='/payment/success/:trx_id' element={<PaymentSuccess />} />
        <Route path='/payment/fail/:trx_id' element={<PaymentFail />} />
        {/* Privet User Route */}
        <Route path='/dashboard' element={<UserRoute />}>
          <Route path='user/profile' element={<Profile />} />
        </Route>
        {/* privet Admin Route */}
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin/profile' element={<AdminProfile />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
