import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductDetail.css";

const ProductDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const response = await axios.get("https://api-ktpm-jfi8.onrender.com/api/products");
        const filteredProduct = response.data.find((p) => p.name.toLowerCase() === name.toLowerCase());
        setProduct(filteredProduct || null);
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductByName();
  }, [name]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const addToCart = () => {
    if (!product) {
      alert("❌ Không tìm thấy sản phẩm!");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`✅ ${product.name} đã được thêm vào giỏ hàng!`);
  };

  const buyNow = () => {
    if (!product) {
      alert("❌ Không tìm thấy sản phẩm!");
      return;
    }

    const cartItem = { ...product, quantity };
    localStorage.setItem("cart", JSON.stringify([cartItem]));
    navigate("/checkout");
  };

  if (loading) return <div>⏳ Đang tải...</div>;
  if (!product) return <div>❌ Không tìm thấy sản phẩm!</div>;

  return (
    <section id="product-detail" className="container mt-4">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          
          <p className="product-price">{product.price.toLocaleString()} VND</p>
          <p className="product-description">{product.description}</p>
          <div className="product-quantity">
            <span>Số lượng:</span>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="product-actions">
            <button className="btn-add-to-cart" onClick={addToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className="btn-buy-now" onClick={buyNow}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Về Chúng Tôi</h5>
              <p>là cửa hàng chuyên cung cấp các sản phẩm máy tính chính hãng với chất lượng cao.</p>
            </div>
            <div className="col-md-3">
              <h5>Liên Hệ</h5>
              <ul className="list-unstyled">
                <li>123 Nguyễn Văn Linh, Đà Nẵng, Việt Nam</li>
                <li>456 Lê Duẩn, Đà Nẵng, Việt Nam</li>
                <li>GỌI ĐẶT MUA: 1900 0129 (9:00 - 21:00)</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Theo Dõi Chúng Tôi</h5>
              <ul className="list-unstyled">
                <li><p>Facebook</p></li>
                <li><p>Instagram</p></li>
                <li><p>YouTube</p></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Đăng Ký Nhận Tin</h5>
              <form>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Nhập email của bạn" />
                </div>
                <button className="btn btn-primary" type="button">Gửi</button>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2013-2025 SHOP MÁY TÍNH. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ProductDetail;
