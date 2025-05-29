import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_URL = "https://api-ktpm-jfi8.onrender.com/api/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState("");

  // 👤 Lấy thông tin người dùng từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.isAdmin === true;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải người dùng:", error);
      setMessage("Không thể tải danh sách người dùng. Vui lòng thử lại!");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const response = await axios.post(API_URL, newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: "", email: "", password: "" });
      setMessage("✅ Tạo người dùng thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi tạo người dùng:", error);
      setMessage("❌ Tạo người dùng thất bại. Vui lòng thử lại!");
    }
  };

  const handleEditUser = (user) => {
    if (!isAdmin) return;
    setEditingUser(user);
    setNewUser({ username: user.username, email: user.email, password: "" });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const response = await axios.put(`${API_URL}/${editingUser._id}`, newUser);
      setUsers(users.map((u) => (u._id === response.data._id ? response.data : u)));
      setEditingUser(null);
      setNewUser({ username: "", email: "", password: "" });
      setMessage("✅ Cập nhật người dùng thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật người dùng:", error);
      setMessage("❌ Cập nhật người dùng thất bại. Vui lòng thử lại!");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!isAdmin) return;
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
        setMessage("✅ Xóa người dùng thành công!");
      } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        setMessage("❌ Xóa người dùng thất bại. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quản Lý Người Dùng</h2>
      <Link to="/product-management" className="btn btn-secondary mb-3">Quản Lý Sản Phẩm</Link>
{message && <p className="alert alert-info">{message}</p>}

      {isAdmin ? (
        <>
          <h3>{editingUser ? "Sửa Người Dùng" : "Thêm Người Dùng Mới"}</h3>
          <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
            <div className="mb-3">
              <label className="form-label">Tên Người Dùng</label>
              <input
                type="text"
                className="form-control"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật Khẩu</label>
              <input
                type="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className={`btn ${editingUser ? "btn-warning" : "btn-success"}`}>
              {editingUser ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
            </button>
          </form>
        </>
      ) : (
        <p className="text-danger">🚫 Bạn không có quyền chỉnh sửa thông tin người dùng.</p>
      )}

      <h3 className="mt-4">Danh Sách Người Dùng</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {isAdmin && (
                  <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditUser(user)}>
                      Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;