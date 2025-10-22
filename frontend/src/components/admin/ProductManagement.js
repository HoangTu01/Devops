import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');

  // ✅ Lấy thông tin người dùng hiện tại từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.isAdmin === true;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backendshopphone-3.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('❌ Lỗi khi tải sản phẩm:', error);
        setMessage('Không thể tải danh sách sản phẩm. Vui lòng thử lại!');
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const productWithId = {
      ...newProduct,
      id: `sp${Date.now()}` // 🛠️ Tạo id tự động
    };

    try {
      const response = await axios.post(
        'https://backendshopphone-3.onrender.com/api/products',
        productWithId
      );
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: 0, imageUrl: '' });
      setMessage('✅ Tạo sản phẩm thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi tạo sản phẩm:', error.response?.data || error.message);
      setMessage('❌ Tạo sản phẩm thất bại. Vui lòng thử lại!');
    }
  };

  const handleEditProduct = (product) => {
    if (!isAdmin) return;
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const response = await axios.put(
        `https://backendshopphone-3.onrender.com/api/products/${editingProduct._id}`,
        newProduct
      );
      const updatedProducts = products.map((p) =>
        p._id === response.data._id ? response.data : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setMessage('✅ Cập nhật sản phẩm thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật sản phẩm:', error);
      setMessage('❌ Cập nhật sản phẩm thất bại. Vui lòng thử lại!');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!isAdmin) return;

    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      try {
        await axios.delete(`https://backendshopphone-3.onrender.com/api/products/${productId}`);
        setProducts(products.filter((p) => p._id !== productId));
        setMessage('✅ Xóa sản phẩm thành công!');
      } catch (error) {
        console.error('❌ Lỗi khi xóa sản phẩm:', error);
        setMessage('❌ Xóa sản phẩm thất bại. Vui lòng thử lại!');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quản Lý Sản Phẩm</h2>
      <Link to="/user-management" className="btn btn-secondary mb-3">Quản Lý Người Dùng</Link>

      {message && <p className="alert alert-info">{message}</p>}

      {/* ✅ Form thêm/sửa sản phẩm (chỉ admin mới thấy) */}
      {isAdmin ? (
        <>
          <h3>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
            <div className="mb-3">
              <label className="form-label">Tên Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mô Tả</label>
              <textarea
                className="form-control"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ảnh</label>
              <input
                type="url"
                className="form-control"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
            </button>
          </form>
        </>
      ) : (
        <p className="text-danger">🚫 Bạn không có quyền thêm/sửa sản phẩm.</p>
      )}

      {/* Danh sách sản phẩm */}
      <h3 className="mt-4">Danh Sách Sản Phẩm</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Ảnh</th>
            {isAdmin && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{Number(product.price).toLocaleString()} VNĐ</td>
              <td>
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px' }} />
              </td>
              {isAdmin && (
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditProduct(product)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>
                    Xóa
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
