import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api-ktpm-jfi8.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm chuyển hướng đến trang chi tiết sản phẩm
  const goToDetailPage = (productName) => {
    navigate(`/product/${productName}`);
  };

  // Hàm thêm sản phẩm vào giỏ hàng (không yêu cầu đăng nhập)
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`✅ ${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="container">
      <h2 className="text-center">Danh Sách Sản Phẩm</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              {/* Khi nhấn vào ảnh sẽ chuyển sang trang chi tiết */}
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                onClick={() => goToDetailPage(product.name)}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Giá: {product.price.toLocaleString()} VNĐ</p>
                <div>
                  <Link id="detail" to={`/product/${product.name}`} className="btn btn-secondary mb-2">
                    Xem Chi Tiết
                  </Link>
                  <button className="addtocart" onClick={() => addToCart(product)}>
                    ➕ Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
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
                <li><p >Facebook</p></li>
                <li><p >Instagram</p></li>
                <li><p >YouTube</p></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Đăng Ký Nhận Tin</h5>
              <form>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Nhập email của bạn" aria-label="Email" aria-describedby="button-addon2" />
                </div>
                <button className="btn btn-primary" type="button" id="button-addon2">Gửi</button>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2013-2025 SHOP MÁY TÍNH. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
