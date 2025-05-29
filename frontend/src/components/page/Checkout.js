import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } catch {
      setCart([]);
    }
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    if (loading) return;
    if (cart.length === 0) {
      setMessage("❌ Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user._id,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
    };

    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    localStorage.removeItem("cart");
    setCart([]);
    setMessage("✅ Đặt hàng thành công! Đang chuyển hướng...");
    setTimeout(() => navigate("/order"), 1000); // delay nhẹ cho UX
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="container mt-4">
      <h2>🛒 Giỏ hàng của bạn</h2>

      {message && (
        <p className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"}`}>
          {message}
        </p>
      )}

      {cart.length === 0 ? (
        <p>🛍️ Giỏ hàng trống!</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="img-thumbnail me-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">Giá: {item.price.toLocaleString()} VNĐ</p>
                  <p className="mb-1">Dung tích: {item.size}</p>
                  <p className="mb-0">Số lượng: {item.quantity}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(index)}
                >
                  🗑️ Xóa
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-3 fw-bold">Tổng tiền: {totalAmount.toLocaleString()} VNĐ</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/products")}
            >
              🛍️ Tiếp tục mua hàng
            </button>
            <button
              className="btn btn-success"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "⏳ Đang xử lý..." : "✅ Thanh toán"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Checkout;
