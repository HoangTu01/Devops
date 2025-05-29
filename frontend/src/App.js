import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/page/Navbar";
import Home from "./components/page/Home";
import ProductList from "./components/page/ProductList";
import Search from "./components/page/Search";
import Checkout from "./components/page/Checkout";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import ProductDetail from "./components/page/ProductDetail";
import Order from "./components/page/Order";
import NotFound from "./components/page/NotFound";
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order" element={<Order />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/product/:name" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;