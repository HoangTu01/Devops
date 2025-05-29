import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orderData, setOrderData] = useState(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (!storedOrder || !storedOrder.items?.length) {
      setMessage("Không có đơn hàng để xử lý.");
    } else {
      setOrderData(storedOrder);
    }
  }, [navigate]);

  const handleOrder = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      setMessage("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("✅ Đơn hàng đã xác nhận:", { ...orderData, address });
      setMessage("🎉 Đặt hàng thành công!");
      localStorage.removeItem("pendingOrder");
      setOrderData(null);
      setAddress("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center">Xác nhận đơn hàng</h2>

      {message && (
        <p className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"}`}>
          {message}
        </p>
      )}

      {!orderData ? (
        <p>⏳ Đang tải thông tin đơn hàng...</p>
      ) : (
        <form onSubmit={handleOrder} className="p-4 border rounded shadow">
          <ul className="list-group mb-3">
            {orderData.items.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <img src={item.imageUrl} alt={item.name} className="img-thumbnail me-3" style={{ width: "60px", height: "60px" }} />
                <div>
                  <strong>{item.name}</strong> <br />
                  Giá: {item.price.toLocaleString()} VNĐ <br />
                  Số lượng: {item.quantity} <br />
                  Dung tích: {item.size}
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-3">
            <label className="form-label">Địa chỉ giao hàng:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Xác nhận & Đặt hàng"}
          </button>
        </form>
      )}
    </section>
  );
};

export default Order;
