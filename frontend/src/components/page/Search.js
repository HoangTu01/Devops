import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://api-ktpm-jfi8.onrender.com/api/products?name=${query}`);
        const filteredResults = response.data.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
        setError(filteredResults.length === 0 ? "❌ Không tìm thấy sản phẩm nào!" : "");
      } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm:", error);
        setError("❌ Đã xảy ra lỗi khi tải dữ liệu!");
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container">
      <h2 className="text-center">Kết Quả Tìm Kiếm</h2>

      {error && <p className="mt-3 text-danger">{error}</p>}

      {results.length > 0 && (
        <div className="mt-4">
          <div className="row">
            {results.map((product) => (
              <div className="col-md-3 mb-4" key={product._id}>
                <div className="card">
                  {/* Bọc ảnh trong Link để khi bấm vào, nó điều hướng đến trang xem chi tiết */}
                  <Link to={`/product/${product.name}`}>
                    <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Giá: {product.price.toLocaleString()} VNĐ</p>
                    <Link to={`/product/${product.name}`} className="btn btn-secondary mb-2"> Xem Chi Tiết</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default Search;