import React, { useState } from 'react';
import axios from 'axios';
import "./css/Register.css"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://backendshopphone-3.onrender.com/api/users', {
        username,
        email,
        password,
      });

      setMessage('✅ Đăng ký thành công!');
      console.log('User registered:', response.data);
    } catch (error) {
      setMessage('❌ Đăng ký thất bại! Hãy thử lại.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <section id="login" className="container mt-4">
      <h2 className="text-center">Đăng Ký</h2>

      {message && <p className="alert alert-info text-center">{message}</p>}

      <form onSubmit={handleRegister} className="p-4 border rounded shadow" style={{width:"400px",marginLeft:"420px"}}>
          <div  className="mb-3">
            <label>Tên người dùng:</label>
            <input id='name'  type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div  className="mb-3">
            <label>Email:</label>
            <input id='email' type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div  className="mb-3">
            <label>Mật khẩu:</label>
            <input id='password'  type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button  type="submit" className="btn btn-primary w-100">Đăng Ký</button>
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

export default Register;
