import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://api-ktpm-jfi8.onrender.com/api/users/login', {
        email: loginEmail,
        password: loginPassword,
      });

      // Lưu thông tin user vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      setMessage('✅ Đăng nhập thành công!');
      setTimeout(() => navigate('/'), 1500); // Chuyển hướng về trang chủ sau 1.5s
    } catch (error) {
      setMessage('❌ Đăng nhập thất bại! Kiểm tra lại email & mật khẩu.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <section id="login" className="container mt-4">
      <h2  className="text-center">Đăng Nhập</h2>

      {message && <p className="alert alert-info text-center">{message}</p>}

      <form onSubmit={handleLogin} className="p-4 border rounded shadow" style={{width:"400px",marginLeft:"420px"}}>
        <div  className="mb-3">
          <label>Email:</label>
          <input id='email' type="email" className="form-control" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
        </div>

        <div  className="mb-3">
          <label>Mật khẩu:</label>
          <input id='password' type="password" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
        </div>

        <button id='loginn' type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
      </form>
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
    </section>
  );
};

export default Login;
